import { NarrativeKbSchema, NumerologyKbSchema, type NarrativeKb, type NumerologyKb } from "@banmenh/shared";

const NUMEROLOGY_KEY = "kb-numerology";
const NARRATIVE_KEY = "kb-narrative";

let cachedKb: NumerologyKb | null = null;
let cachedNarrative: NarrativeKb | null = null;

async function readJsonFromKv(kv: KVNamespace | undefined | null, key: string): Promise<unknown> {
  if (!kv) {
    throw new Error(
      "KV binding BANMENH_KB_DEV không được load. Kiểm tra wrangler.toml env config.",
    );
  }

  const raw = await kv.get(key);
  if (!raw) {
    throw new Error(`KV key '${key}' không tìm thấy. Chạy npm run kb:upload-kv để upload.`);
  }

  return JSON.parse(raw) as unknown;
}

export async function loadKb(kv: KVNamespace): Promise<NumerologyKb> {
  if (cachedKb) return cachedKb;
  const parsed = NumerologyKbSchema.safeParse(await readJsonFromKv(kv, NUMEROLOGY_KEY));
  if (!parsed.success) throw new Error(`Invalid numerology KB: ${parsed.error.message}`);
  cachedKb = parsed.data;
  return cachedKb;
}

export async function loadNarrative(kv: KVNamespace): Promise<NarrativeKb> {
  if (cachedNarrative) return cachedNarrative;
  const parsed = NarrativeKbSchema.safeParse(await readJsonFromKv(kv, NARRATIVE_KEY));
  if (!parsed.success) throw new Error(`Invalid narrative KB: ${parsed.error.message}`);
  cachedNarrative = parsed.data;
  return cachedNarrative;
}
