// Firestore REST API helper — Cloudflare Workers context.
// KHÔNG dùng firebase-admin (không chạy ở Workers runtime).
// Auth: JWT RS256 qua Web Crypto crypto.subtle.

const FIRESTORE_BASE = "https://firestore.googleapis.com/v1";
const TOKEN_URL = "https://oauth2.googleapis.com/token";

type ServiceAccount = {
  projectId: string;
  clientEmail: string;
  privateKey: string;
};

// In-memory token cache
let cachedToken: { value: string; expiresAt: number } | null = null;

/** Base64url encode (Web Crypto compatible). */
function base64url(data: ArrayBuffer | string): string {
  const bytes =
    typeof data === "string"
      ? new TextEncoder().encode(data)
      : new Uint8Array(data);
  let str = "";
  for (const b of bytes) str += String.fromCharCode(b);
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

/** Sign RS256 JWT để lấy Google OAuth access token. */
async function signServiceAccountJwt(sa: ServiceAccount): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const payload = base64url(
    JSON.stringify({
      iss: sa.clientEmail,
      sub: sa.clientEmail,
      aud: TOKEN_URL,
      scope: "https://www.googleapis.com/auth/datastore",
      iat: now,
      exp: now + 3600,
    }),
  );

  const signingInput = `${header}.${payload}`;

  // Parse PEM private key
  const pemBody = sa.privateKey
    .replace(/-----BEGIN PRIVATE KEY-----/, "")
    .replace(/-----END PRIVATE KEY-----/, "")
    .replace(/\s/g, "");
  const keyBytes = Uint8Array.from(atob(pemBody), (c) => c.charCodeAt(0));

  const cryptoKey = await crypto.subtle.importKey(
    "pkcs8",
    keyBytes,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"],
  );

  const sigBuffer = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    cryptoKey,
    new TextEncoder().encode(signingInput),
  );

  return `${signingInput}.${base64url(sigBuffer)}`;
}

/** Lấy Google OAuth access token, cache tới expiry. */
export async function getAccessToken(sa: ServiceAccount): Promise<string> {
  const now = Date.now();
  if (cachedToken && cachedToken.expiresAt > now + 60000) {
    return cachedToken.value;
  }

  const jwt = await signServiceAccountJwt(sa);
  const resp = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`,
  });

  if (!resp.ok) {
    throw new Error(`getAccessToken failed: ${resp.status} ${await resp.text()}`);
  }

  const json = (await resp.json()) as { access_token: string; expires_in: number };
  cachedToken = { value: json.access_token, expiresAt: now + json.expires_in * 1000 };
  return cachedToken.value;
}

/** Convert JS value → Firestore JSON field value. */
export function serializeFirestoreValue(value: unknown): Record<string, unknown> | null {
  if (value === undefined || value === null) return null;
  if (typeof value === "string") return { stringValue: value };
  if (typeof value === "boolean") return { booleanValue: value };
  if (typeof value === "number") {
    return Number.isInteger(value)
      ? { integerValue: String(value) }
      : { doubleValue: value };
  }
  if (Array.isArray(value)) {
    return {
      arrayValue: {
        values: value.map(serializeFirestoreValue).filter(Boolean),
      },
    };
  }
  if (typeof value === "object") {
    const fields: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      const serialized = serializeFirestoreValue(v);
      if (serialized !== null) fields[k] = serialized;
    }
    return { mapValue: { fields } };
  }
  return null;
}

/** Convert Firestore JSON field value → JS value. */
export function parseFirestoreValue(field: Record<string, unknown>): unknown {
  if ("stringValue" in field) return field.stringValue;
  if ("booleanValue" in field) return field.booleanValue;
  if ("integerValue" in field) return Number(field.integerValue);
  if ("doubleValue" in field) return field.doubleValue;
  if ("nullValue" in field) return null;
  if ("arrayValue" in field) {
    const arr = (field.arrayValue as { values?: unknown[] }).values ?? [];
    return arr.map((v) => parseFirestoreValue(v as Record<string, unknown>));
  }
  if ("mapValue" in field) {
    const mapFields = (field.mapValue as { fields?: Record<string, unknown> }).fields ?? {};
    const result: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(mapFields)) {
      result[k] = parseFirestoreValue(v as Record<string, unknown>);
    }
    return result;
  }
  return undefined;
}

function docUrl(projectId: string, collection: string, docId: string): string {
  return `${FIRESTORE_BASE}/projects/${projectId}/databases/(default)/documents/${collection}/${docId}`;
}

/** GET Firestore document → flat object hoặc null nếu không tồn tại. */
export async function firestoreGet(
  projectId: string,
  accessToken: string,
  collection: string,
  docId: string,
): Promise<Record<string, unknown> | null> {
  const resp = await fetch(docUrl(projectId, collection, docId), {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (resp.status === 404) return null;
  if (!resp.ok) throw new Error(`firestoreGet ${collection}/${docId}: ${resp.status}`);

  const doc = (await resp.json()) as { fields?: Record<string, unknown> };
  if (!doc.fields) return {};

  const result: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(doc.fields)) {
    result[k] = parseFirestoreValue(v as Record<string, unknown>);
  }
  return result;
}

/** PATCH Firestore document — chỉ update các field trong updateMaskFields. */
export async function firestorePatch(
  projectId: string,
  accessToken: string,
  collection: string,
  docId: string,
  data: Record<string, unknown>,
  updateMaskFields: string[],
): Promise<void> {
  const fields: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(data)) {
    const serialized = serializeFirestoreValue(v);
    if (serialized !== null) fields[k] = serialized;
  }

  const mask = updateMaskFields.map((f) => `updateMask.fieldPaths=${encodeURIComponent(f)}`).join("&");
  const resp = await fetch(`${docUrl(projectId, collection, docId)}?${mask}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fields }),
  });

  if (!resp.ok) throw new Error(`firestorePatch ${collection}/${docId}: ${resp.status}`);
}

/** CREATE Firestore document với deterministic id. Idempotent: bỏ qua nếu đã tồn tại. */
export async function firestoreCreate(
  projectId: string,
  accessToken: string,
  collection: string,
  docId: string,
  data: Record<string, unknown>,
): Promise<void> {
  const existing = await firestoreGet(projectId, accessToken, collection, docId);
  if (existing !== null) return; // idempotent

  const fields: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(data)) {
    const serialized = serializeFirestoreValue(v);
    if (serialized !== null) fields[k] = serialized;
  }

  // POST với documentId query param để set deterministic id
  const url = `${FIRESTORE_BASE}/projects/${projectId}/databases/(default)/documents/${collection}?documentId=${encodeURIComponent(docId)}`;
  const resp = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fields }),
  });

  if (!resp.ok) throw new Error(`firestoreCreate ${collection}/${docId}: ${resp.status}`);
}
