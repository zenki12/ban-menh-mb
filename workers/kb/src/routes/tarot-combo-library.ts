import {
  tarotComboLibraryDetailResponseSchema,
  tarotComboLibraryQuerySchema,
  tarotComboLibraryResponseSchema,
} from "@banmenh/shared";
import { Hono, type Context } from "hono";
import { verifyFirebaseToken } from "../lib/auth";
import { checkRateLimit, getClientIp } from "../lib/rate-limit";
import {
  buildTarotComboDomainReadings,
  buildTarotComboLibraryItem,
  loadTarotCards,
  loadTarotComboDetail,
  loadTarotComboIndex,
  normalizeTarotComboSearch,
} from "../lib/tarot-kb-loader";

type Env = {
  BANMENH_KB_DEV: KVNamespace;
  TAROT_KB_R2: R2Bucket;
  FIREBASE_PROJECT_ID: string;
};

const router = new Hono<{ Bindings: Env }>();

function bearerToken(header: string | undefined): string | null {
  if (!header?.startsWith("Bearer ")) return null;
  return header.slice(7).trim() || null;
}

async function authorize(c: Context<{ Bindings: Env }>) {
  const token = bearerToken(c.req.header("Authorization"));
  if (!token) return { response: c.json({ error: { code: "AUTH_REQUIRED", message: "Thiếu Bearer token." } }, 401) };
  try {
    await verifyFirebaseToken(token, c.env.FIREBASE_PROJECT_ID);
    return { token };
  } catch {
    return { response: c.json({ error: { code: "AUTH_INVALID_TOKEN", message: "Token không hợp lệ." } }, 401) };
  }
}

router.get("/", async (c) => {
  const rateLimit = checkRateLimit(`tarot:combo-library:${getClientIp(c.req.raw.headers)}`, 120);
  if (!rateLimit.allowed) {
    return c.json({ error: { code: "RATE_LIMITED", message: "Bạn đang tra cứu quá nhanh." } }, 429, {
      "Retry-After": String(rateLimit.retryAfterSeconds),
    });
  }
  const auth = await authorize(c);
  if ("response" in auth) return auth.response;

  const parsed = tarotComboLibraryQuerySchema.safeParse({
    page: c.req.query("page") ?? undefined,
    pageSize: c.req.query("pageSize") ?? undefined,
    size: c.req.query("size") ?? undefined,
    q: c.req.query("q") ?? undefined,
  });
  if (!parsed.success) return c.json({ error: { code: "VALIDATION", message: "Bộ lọc không hợp lệ." } }, 400);

  try {
    const [index, kbCards] = await Promise.all([
      loadTarotComboIndex(c.env.BANMENH_KB_DEV),
      loadTarotCards(c.env.BANMENH_KB_DEV),
    ]);
    const query = normalizeTarotComboSearch(parsed.data.q);
    const filtered = index.combos.filter((entry) => {
      const sizeMatch = parsed.data.size === "all" || entry.size === Number(parsed.data.size);
      const searchMatch = !query || normalizeTarotComboSearch(`${entry.title} ${entry.keys.join(" ")}`).includes(query);
      return sizeMatch && searchMatch;
    });
    const totalPages = Math.ceil(filtered.length / parsed.data.pageSize);
    const page = totalPages === 0 ? 1 : Math.min(parsed.data.page, totalPages);
    const offset = (page - 1) * parsed.data.pageSize;
    const items = filtered.slice(offset, offset + parsed.data.pageSize)
      .map((entry) => buildTarotComboLibraryItem(entry, kbCards))
      .filter((item): item is NonNullable<typeof item> => item !== null);
    return c.json(tarotComboLibraryResponseSchema.parse({
      ok: true,
      items,
      total: filtered.length,
      page,
      pageSize: 15,
      totalPages,
    }));
  } catch {
    console.error("[tarot] combo library lookup failed");
    return c.json({ error: { code: "SERVER_ERROR", message: "Không thể tải thư viện cộng hưởng." } }, 500);
  }
});

router.get("/:comboId", async (c) => {
  const rateLimit = checkRateLimit(`tarot:combo-detail:${getClientIp(c.req.raw.headers)}`, 120);
  if (!rateLimit.allowed) {
    return c.json({ error: { code: "RATE_LIMITED", message: "Bạn đang mở nội dung quá nhanh." } }, 429, {
      "Retry-After": String(rateLimit.retryAfterSeconds),
    });
  }
  const auth = await authorize(c);
  if ("response" in auth) return auth.response;

  const comboId = c.req.param("comboId").trim().toLowerCase();
  if (!/^[a-z0-9_ ]{1,100}$/.test(comboId)) {
    return c.json({ error: { code: "VALIDATION", message: "Mã combo không hợp lệ." } }, 400);
  }

  try {
    const [index, kbCards] = await Promise.all([
      loadTarotComboIndex(c.env.BANMENH_KB_DEV),
      loadTarotCards(c.env.BANMENH_KB_DEV),
    ]);
    const entry = index.combos.find((candidate) => candidate.id.toLowerCase() === comboId);
    if (!entry) return c.json({ error: { code: "NOT_FOUND", message: "Không tìm thấy combo." } }, 404);
    const [combo, detail] = await Promise.all([
      Promise.resolve(buildTarotComboLibraryItem(entry, kbCards)),
      loadTarotComboDetail(c.env.TAROT_KB_R2, entry),
    ]);
    if (!combo || !detail) return c.json({ error: { code: "NOT_FOUND", message: "Nội dung combo chưa sẵn sàng." } }, 404);
    return c.json(tarotComboLibraryDetailResponseSchema.parse({
      ok: true,
      combo,
      domains: buildTarotComboDomainReadings(detail, entry.size),
    }));
  } catch {
    console.error("[tarot] combo library detail failed");
    return c.json({ error: { code: "SERVER_ERROR", message: "Không thể tải nội dung cộng hưởng." } }, 500);
  }
});

export default router;
