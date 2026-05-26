const FIREBASE_CERT_URL =
  "https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com";

type CertCache = { expiresAt: number; keys: Record<string, string> };
let certCache: CertCache | null = null;

function base64urlDecode(value: string): Uint8Array {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(value.length / 4) * 4, "=");
  return Uint8Array.from(atob(padded), (char) => char.charCodeAt(0));
}

function parseJsonPart<T>(part: string): T {
  return JSON.parse(new TextDecoder().decode(base64urlDecode(part))) as T;
}

function pemToBytes(pem: string): Uint8Array {
  const body = pem.replace(/-----BEGIN CERTIFICATE-----/, "").replace(/-----END CERTIFICATE-----/, "").replace(/\s/g, "");
  return Uint8Array.from(atob(body), (char) => char.charCodeAt(0));
}

function readLength(bytes: Uint8Array, offset: number): { length: number; bytesRead: number } {
  const first = bytes[offset];
  if (first < 0x80) return { length: first, bytesRead: 1 };
  const count = first & 0x7f;
  let length = 0;
  for (let i = 0; i < count; i += 1) length = length * 256 + bytes[offset + 1 + i];
  return { length, bytesRead: 1 + count };
}

function readElement(bytes: Uint8Array, offset: number) {
  const tag = bytes[offset];
  const { length, bytesRead } = readLength(bytes, offset + 1);
  const headerEnd = offset + 1 + bytesRead;
  return { tag, start: offset, contentStart: headerEnd, end: headerEnd + length };
}

function extractSpki(certBytes: Uint8Array): Uint8Array {
  const cert = readElement(certBytes, 0);
  const tbs = readElement(certBytes, cert.contentStart);
  let offset = tbs.contentStart;
  if (certBytes[offset] === 0xa0) offset = readElement(certBytes, offset).end;
  for (let i = 0; i < 5; i += 1) offset = readElement(certBytes, offset).end;
  const spki = readElement(certBytes, offset);
  return certBytes.slice(spki.start, spki.end);
}

async function loadCerts(): Promise<Record<string, string>> {
  const now = Date.now();
  if (certCache && certCache.expiresAt > now) return certCache.keys;

  const resp = await fetch(FIREBASE_CERT_URL);
  if (!resp.ok) throw new Error(`Cannot fetch Firebase public keys: ${resp.status}`);

  const keys = (await resp.json()) as Record<string, string>;
  certCache = { keys, expiresAt: now + 60 * 60 * 1000 };
  return keys;
}

async function verifySignature(token: string, kid: string): Promise<boolean> {
  const certs = await loadCerts();
  const cert = certs[kid];
  if (!cert) throw new Error("Unknown Firebase token key id");

  const [header, payload, signature] = token.split(".");
  const spki = extractSpki(pemToBytes(cert));
  const cryptoKey = await crypto.subtle.importKey(
    "spki",
    spki,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["verify"],
  );

  return crypto.subtle.verify(
    "RSASSA-PKCS1-v1_5",
    cryptoKey,
    base64urlDecode(signature),
    new TextEncoder().encode(`${header}.${payload}`),
  );
}

export async function verifyFirebaseToken(
  idToken: string,
  projectId: string,
): Promise<{ uid: string }> {
  const parts = idToken.split(".");
  if (parts.length !== 3) throw new Error("Invalid Firebase token format");

  const header = parseJsonPart<{ alg?: string; kid?: string }>(parts[0]);
  const payload = parseJsonPart<{
    aud?: string;
    iss?: string;
    exp?: number;
    sub?: string;
    user_id?: string;
  }>(parts[1]);

  if (header.alg !== "RS256" || !header.kid) throw new Error("Invalid Firebase token header");
  if (!(await verifySignature(idToken, header.kid))) throw new Error("Invalid Firebase token signature");
  if (payload.aud !== projectId) throw new Error("Invalid Firebase token audience");
  if (payload.iss !== `https://securetoken.google.com/${projectId}`) {
    throw new Error("Invalid Firebase token issuer");
  }
  if (!payload.exp || payload.exp <= Math.floor(Date.now() / 1000)) {
    throw new Error("Firebase token expired");
  }

  const uid = payload.user_id ?? payload.sub;
  if (!uid) throw new Error("Firebase token missing uid");
  return { uid };
}
