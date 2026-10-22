// Ban Menh - KB Worker. Generates reports from private KV data.

import {
  buildSynthesizedReport,
  generateReport,
  tarotComboLookupRequestSchema,
  tarotComboLookupResponseSchema,
  type NarrativeKb,
  type TarotComboCard,
  type TarotMatchedCombo,
} from "@banmenh/shared";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { verifyFirebaseToken } from "./lib/auth";
import { loadKb, loadNarrative } from "./lib/kb-loader";
import { checkRateLimit, getClientIp } from "./lib/rate-limit";
import tarotComboLibraryRoutes from "./routes/tarot-combo-library";
import {
  findTarotCombo,
  findMatchedCombos,
  getTarotAspectMeaning,
  loadTarotCards,
  loadTarotClarifyQuestions,
  loadTarotComboDetail,
  loadTarotComboIndex,
  normalizeTarotCardName,
} from "./lib/tarot-kb-loader";

type Env = {
  BANMENH_KB_DEV: KVNamespace;
  TAROT_KB_R2: R2Bucket;
  FIREBASE_PROJECT_ID: string;
  FIREBASE_CLIENT_EMAIL: string;
  FIREBASE_PRIVATE_KEY: string;
  CORS_ALLOWED_ORIGINS?: string;
  TAROT_COMBO_TEST_MODE?: string;
};

type ReportBody = {
  fullName: string;
  dob: string;
  includeSections?: boolean;
};

const app = new Hono<{ Bindings: Env }>();
app.use("*", logger());

const DEFAULT_ALLOWED_ORIGINS = new Set([
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "https://dev.banmenh.online",
  "https://banmenh.online",
]);

function getAllowedOrigins(env: Env): Set<string> {
  const origins = new Set(DEFAULT_ALLOWED_ORIGINS);
  for (const origin of env.CORS_ALLOWED_ORIGINS?.split(",") ?? []) {
    const trimmed = origin.trim();
    if (trimmed) origins.add(trimmed);
  }
  return origins;
}

app.use("*", async (c, next) => {
  const origin = c.req.header("Origin");
  const allowedOrigin = origin && getAllowedOrigins(c.env).has(origin) ? origin : null;
  const corsHeaders = {
    Vary: "Origin",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Authorization,Content-Type",
  };

  if (c.req.method === "OPTIONS") {
    if (!allowedOrigin) return c.body(null, 403);
    return new Response(null, {
      status: 204,
      headers: {
        ...corsHeaders,
        "Access-Control-Allow-Origin": allowedOrigin,
      },
    });
  }

  await next();

  c.header("Vary", "Origin");
  if (allowedOrigin) c.header("Access-Control-Allow-Origin", allowedOrigin);
});

function error(code: string, message: string, status: 400 | 401 | 500) {
  return { body: { error: { code, message } }, status };
}

function getBearerToken(header: string | undefined): string | null {
  if (!header?.startsWith("Bearer ")) return null;
  const token = header.slice("Bearer ".length).trim();
  return token.length > 0 ? token : null;
}

function validateBody(body: unknown): ReportBody | null {
  if (!body || typeof body !== "object") return null;
  const record = body as Record<string, unknown>;
  const fullName = typeof record.fullName === "string" ? record.fullName.trim() : "";
  const dob = typeof record.dob === "string" ? record.dob.trim() : "";
  if (!fullName || fullName.length > 200) return null;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dob)) return null;
  return { fullName, dob, includeSections: record.includeSections === true };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function mergeNarrative(html: string, vars: Record<string, string | number>): string {
  let out = html;
  for (const [k, v] of Object.entries(vars)) {
    out = out.replaceAll(`{{${k}}}`, escapeHtml(String(v)));
  }
  return out;
}

function getNarrative(
  narrative: NarrativeKb,
  group: keyof NarrativeKb,
  number: number,
  vars: Record<string, string | number>,
): string | null {
  const entry = narrative[group]?.[String(number)];
  return entry ? mergeNarrative(entry.html, vars) : null;
}

function attachNarrative<T extends { number: number }>(
  item: T,
  narrative: NarrativeKb,
  group: keyof NarrativeKb,
  vars: Record<string, string | number>,
  lookupNumber = item.number,
): T & { narrative: string | null } {
  return { ...item, narrative: getNarrative(narrative, group, lookupNumber, vars) };
}

app.get("/", (c) => c.text("Bản Mệnh - KB Worker"));

app.get("/health", (c) =>
  c.json({ ok: true, service: "kb-worker", timestamp: new Date().toISOString() }),
);

app.route("/tarot/combos", tarotComboLibraryRoutes);

app.post("/numerology/report", async (c) => {
  const rateLimit = checkRateLimit(`numerology:report:${getClientIp(c.req.raw.headers)}`, 60);
  if (!rateLimit.allowed) {
    return c.json(
      { error: { code: "RATE_LIMITED", message: "Bạn đang thao tác quá nhanh, vui lòng đợi một chút." } },
      429,
      { "Retry-After": String(rateLimit.retryAfterSeconds) },
    );
  }

  let json: unknown;
  try {
    json = await c.req.json();
  } catch {
    const res = error("VALIDATION_INVALID_INPUT", "Body JSON không hợp lệ.", 400);
    return c.json(res.body, res.status);
  }

  const body = validateBody(json);
  if (!body) {
    const res = error("VALIDATION_INVALID_INPUT", "fullName hoặc dob không hợp lệ.", 400);
    return c.json(res.body, res.status);
  }

  try {
    const [kb, narrative] = await Promise.all([
      loadKb(c.env.BANMENH_KB_DEV),
      loadNarrative(c.env.BANMENH_KB_DEV),
    ]);
    const report = await generateReport(body, kb);
    const synthesized = body.includeSections ? buildSynthesizedReport({ report, narrative, kb }) : undefined;
    const nameVars = { name: body.fullName };
    const personalYearVars = {
      ...nameVars,
      year: report.personalYear.year,
      age: report.personalYear.year - report.input.dobParts.year,
    };

    return c.json({
      ok: true,
      report: {
        ...report,
        lifePath: attachNarrative(
          report.lifePath,
          narrative,
          "lifePath",
          nameVars,
          report.lifePath.displayNumber ?? report.lifePath.number,
        ),
        soul: attachNarrative(report.soul, narrative, "soul", nameVars),
        destiny: attachNarrative(report.destiny, narrative, "destiny", nameVars),
        personality: attachNarrative(report.personality, narrative, "personality", nameVars),
        maturity: attachNarrative(report.maturity, narrative, "maturity", nameVars),
        tensionNumber: attachNarrative(report.tensionNumber, narrative, "tensionNumber", nameVars),
        attitude: attachNarrative(report.attitude, narrative, "attitude", nameVars),
        birthday: attachNarrative(report.birthday, narrative, "birthday", nameVars),
        soulChallenge: attachNarrative(report.soulChallenge, narrative, "soulChallenge", nameVars),
        destinyChallenge: attachNarrative(report.destinyChallenge, narrative, "destinyChallenge", nameVars),
        personalityChallenge: attachNarrative(
          report.personalityChallenge,
          narrative,
          "personalityChallenge",
          nameVars,
        ),
        cognitiveAbility: attachNarrative(report.cognitiveAbility, narrative, "cognitiveAbility", nameVars),
        approachMotivation: attachNarrative(
          report.approachMotivation,
          narrative,
          "approachMotivation",
          nameVars,
        ),
        approachAbility: attachNarrative(report.approachAbility, narrative, "approachAbility", nameVars),
        approachAttitude: attachNarrative(report.approachAttitude, narrative, "approachAttitude", nameVars),
        personalYear: attachNarrative(report.personalYear, narrative, "personalYearDomains", personalYearVars),
        pyramidPeaks: report.pyramidPeaks.map((item, index) =>
          attachNarrative(item, narrative, "pyramidPeak", {
            ...nameVars,
            period: item.period,
            peakIndex: index + 1,
          }),
        ),
        pyramidChallenges: report.pyramidChallenges.map((item) =>
          attachNarrative(item, narrative, "pyramidChallenge", { ...nameVars, period: item.period }),
        ),
        ...(synthesized ? { profileHeader: synthesized.profileHeader, phases: synthesized.phases } : {}),
      },
      ...(synthesized ? { profileHeader: synthesized.profileHeader, phases: synthesized.phases } : {}),
    });
  } catch (err) {
    console.error("[kb-worker] report generation failed:", err);
    const res = error("SERVER_ERROR", "Không thể tạo báo cáo.", 500);
    return c.json(res.body, res.status);
  }
});

app.get("/tarot/card/:cardId", async (c) => {
  const rateLimit = checkRateLimit(`tarot:card:${getClientIp(c.req.raw.headers)}`, 120);
  if (!rateLimit.allowed) {
    return c.json(
      { error: { code: "RATE_LIMITED", message: "Bạn đang mở lá bài quá nhanh, vui lòng đợi một chút." } },
      429,
      { "Retry-After": String(rateLimit.retryAfterSeconds) },
    );
  }

  const token = getBearerToken(c.req.header("Authorization"));
  if (!token) {
    return c.json({ error: { code: "AUTH_REQUIRED", message: "Thiếu Bearer token." } }, 401);
  }

  try {
    await verifyFirebaseToken(token, c.env.FIREBASE_PROJECT_ID);
  } catch {
    return c.json({ error: { code: "AUTH_INVALID_TOKEN", message: "Token không hợp lệ." } }, 401);
  }

  const cardId = Number(c.req.param("cardId"));
  const niche = c.req.query("niche") ?? "general";
  const reversed = c.req.query("reversed") === "true";

  if (!Number.isInteger(cardId) || cardId < 0 || cardId > 77 || !/^[a-z0-9_]{1,64}$/.test(niche)) {
    return c.json({ error: { code: "VALIDATION", message: "cardId không hợp lệ." } }, 400);
  }

  try {
    const cards = await loadTarotCards(c.env.BANMENH_KB_DEV);
    const card = cards.find((item) => item.id === cardId);
    if (!card) {
      return c.json({ error: { code: "NOT_FOUND", message: "Không tìm thấy lá bài." } }, 404);
    }

    const meaning = reversed ? card.reversed : card.upright;
    const aspectMeaning = getTarotAspectMeaning(card, niche, reversed) || meaning;
    const keywords = reversed && card.keywordsRev?.length > 0 ? card.keywordsRev : card.keywords;

    return c.json({
      ok: true,
      card: {
        id: card.id,
        nameEn: card.name,
        nameVi: card.nameVi,
        number: card.number ?? "",
        orientation: reversed ? "reversed" : "upright",
        element: card.element ?? "",
        planet: card.planet ?? "",
        zodiac: card.zodiac ?? "",
        numerology: card.numerology ?? "",
        keywords,
        meaning,
        aspectMeaning,
      },
      text: aspectMeaning,
    });
  } catch (err) {
    console.error("[tarot] card lookup failed:", err);
    return c.json({ error: { code: "SERVER_ERROR", message: "Lỗi server." } }, 500);
  }
});

app.get("/tarot/clarify", async (c) => {
  const rateLimit = checkRateLimit(`tarot:clarify:${getClientIp(c.req.raw.headers)}`, 60);
  if (!rateLimit.allowed) {
    return c.json(
      { error: { code: "RATE_LIMITED", message: "Bạn đang mở câu hỏi quá nhanh, vui lòng đợi một chút." } },
      429,
      { "Retry-After": String(rateLimit.retryAfterSeconds) },
    );
  }

  const token = getBearerToken(c.req.header("Authorization"));
  if (!token) return c.json({ error: { code: "AUTH_REQUIRED", message: "Thiếu Bearer token." } }, 401);
  try {
    await verifyFirebaseToken(token, c.env.FIREBASE_PROJECT_ID);
  } catch {
    return c.json({ error: { code: "AUTH_INVALID_TOKEN", message: "Token không hợp lệ." } }, 401);
  }

  const nicheKey = c.req.query("niche") ?? "general";
  if (!/^[a-z0-9_]{1,64}$/.test(nicheKey)) {
    return c.json({ error: { code: "VALIDATION", message: "Niche không hợp lệ." } }, 400);
  }

  try {
    const clarify = await loadTarotClarifyQuestions(c.env.BANMENH_KB_DEV);
    const source = clarify.groups[nicheKey];
    if (!Array.isArray(source) || source.length < 3) {
      return c.json({ error: { code: "NOT_FOUND", message: "Chưa có câu hỏi cho niche này." } }, 404);
    }
    const pool = source.filter((question) => typeof question === "string" && question.trim().length > 0);
    for (let index = pool.length - 1; index > 0; index -= 1) {
      const random = new Uint32Array(1);
      crypto.getRandomValues(random);
      const swapIndex = random[0] % (index + 1);
      [pool[index], pool[swapIndex]] = [pool[swapIndex], pool[index]];
    }
    return c.json({ ok: true, nicheKey, questions: pool.slice(0, 3) });
  } catch {
    console.error("[tarot] clarify lookup failed");
    return c.json({ error: { code: "SERVER_ERROR", message: "Không thể tải câu hỏi tâm thức." } }, 500);
  }
});

app.post("/tarot/combo", async (c) => {
  const rateLimit = checkRateLimit(`tarot:combo:${getClientIp(c.req.raw.headers)}`, 60);
  if (!rateLimit.allowed) {
    return c.json(
      { error: { code: "RATE_LIMITED", message: "Bạn đang tra cứu cộng hưởng quá nhanh, vui lòng đợi một chút." } },
      429,
      { "Retry-After": String(rateLimit.retryAfterSeconds) },
    );
  }

  const token = getBearerToken(c.req.header("Authorization"));
  if (!token) return c.json({ error: { code: "AUTH_REQUIRED", message: "Thiếu Bearer token." } }, 401);
  try {
    await verifyFirebaseToken(token, c.env.FIREBASE_PROJECT_ID);
  } catch {
    return c.json({ error: { code: "AUTH_INVALID_TOKEN", message: "Token không hợp lệ." } }, 401);
  }

  let body: unknown;
  try {
    body = await c.req.json();
  } catch {
    return c.json({ error: { code: "VALIDATION", message: "Body JSON không hợp lệ." } }, 400);
  }
  const parsed = tarotComboLookupRequestSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: { code: "VALIDATION", message: "Dữ liệu dò combo không hợp lệ." } }, 400);
  }

  try {
    const comboIndex = await loadTarotComboIndex(c.env.BANMENH_KB_DEV);
    const testMode = parsed.data.testMode && c.env.TAROT_COMBO_TEST_MODE === "true";
    let matches = findMatchedCombos(comboIndex.combos, parsed.data.cards);

    if (testMode) {
      const kbCards = await loadTarotCards(c.env.BANMENH_KB_DEV);
      const maxForcedSize = Math.max(2, Math.min(5, parsed.data.cards.length));
      const candidates = comboIndex.combos.filter((entry) => entry.size <= maxForcedSize);
      if (candidates.length > 0) {
        const random = new Uint32Array(1);
        crypto.getRandomValues(random);
        const entry = candidates[random[0] % candidates.length];
        const forcedCards = entry.keys.map((key, index) => {
          const kbCard = kbCards.find((card) => normalizeTarotCardName(card.name) === normalizeTarotCardName(key));
          if (!kbCard) return null;
          return {
            id: kbCard.id,
            nameEn: kbCard.name,
            nameVi: kbCard.nameVi,
            orientation: parsed.data.cards[index]?.orientation ?? parsed.data.cards[0]?.orientation ?? "upright",
          } satisfies TarotComboCard;
        });
        if (forcedCards.every((card): card is TarotComboCard => card !== null)) {
          matches = [{
            entry,
            cards: forcedCards,
            orientationVariant: forcedCards
              .map((card) => card.orientation === "reversed" ? "Rev" : "Up")
              .join("_"),
          }];
        }
      }
    }

    const resolved: TarotMatchedCombo[] = [];
    for (const match of matches) {
      if (resolved.length >= 3) break;
      const detail = await loadTarotComboDetail(c.env.TAROT_KB_R2, match.entry);
      const text = detail?.[parsed.data.nicheKey]?.[match.orientationVariant]
        ?? detail?.general?.[match.orientationVariant]
        ?? "";
      if (!text.trim()) continue;
      resolved.push({
        id: match.entry.id,
        size: match.entry.size,
        title: match.entry.title,
        description: match.entry.desc,
        text,
        orientationVariant: match.orientationVariant,
        cards: match.cards,
      });
    }

    return c.json(tarotComboLookupResponseSchema.parse({ ok: true, combos: resolved, testMode }));
  } catch {
    console.error("[tarot] combo lookup failed");
    return c.json({ error: { code: "SERVER_ERROR", message: "Không thể dò cộng hưởng Tarot." } }, 500);
  }
});

app.get("/tarot/combo", async (c) => {
  const token = getBearerToken(c.req.header("Authorization"));
  if (!token) {
    return c.json({ error: { code: "AUTH_REQUIRED", message: "Thiếu Bearer token." } }, 401);
  }

  try {
    await verifyFirebaseToken(token, c.env.FIREBASE_PROJECT_ID);
  } catch {
    return c.json({ error: { code: "AUTH_INVALID_TOKEN", message: "Token không hợp lệ." } }, 401);
  }

  const cards = c.req.query("cards");
  const niche = c.req.query("niche") ?? "general";
  const variant = c.req.query("variant") ?? "Up_Up";

  if (!cards) {
    return c.json({ error: { code: "VALIDATION", message: "Thiếu param cards." } }, 400);
  }

  try {
    const cardNames = cards.split(",").map((value) => value.trim()).filter(Boolean);
    if (cardNames.length < 2) {
      return c.json({ error: { code: "VALIDATION", message: "Cần ít nhất 2 lá bài." } }, 400);
    }

    const comboIndex = await loadTarotComboIndex(c.env.BANMENH_KB_DEV);
    const entry = findTarotCombo(comboIndex.combos, cardNames);

    if (!entry) {
      return c.json({ ok: true, found: false, text: "" });
    }

    const detail = await loadTarotComboDetail(c.env.TAROT_KB_R2, entry);
    const text =
      detail?.[niche]?.[variant] ??
      detail?.general?.[variant] ??
      detail?.love?.[variant] ??
      "";

    return c.json({ ok: true, found: true, combo: { id: entry.id, title: entry.title }, text });
  } catch (err) {
    console.error("[tarot] combo lookup failed:", err);
    return c.json({ error: { code: "SERVER_ERROR", message: "Lỗi server." } }, 500);
  }
});

app.post("/tarot/reading", async (c) => {
  const token = getBearerToken(c.req.header("Authorization"));
  if (!token) {
    return c.json({ error: { code: "AUTH_REQUIRED", message: "Thiếu Bearer token." } }, 401);
  }

  try {
    await verifyFirebaseToken(token, c.env.FIREBASE_PROJECT_ID);
  } catch {
    return c.json({ error: { code: "AUTH_INVALID_TOKEN", message: "Token không hợp lệ." } }, 401);
  }

  let body: unknown;
  try {
    body = await c.req.json();
  } catch {
    return c.json({ error: { code: "VALIDATION", message: "Body JSON không hợp lệ." } }, 400);
  }

  const record = body && typeof body === "object" ? body as Record<string, unknown> : null;
  const rawCards = Array.isArray(record?.cards) ? record.cards : [];
  if (rawCards.length < 1) {
    return c.json({ error: { code: "VALIDATION", message: "Thiếu danh sách lá bài." } }, 400);
  }

  const drawnCards = rawCards
    .map((item) => {
      const card = item && typeof item === "object" ? item as Record<string, unknown> : {};
      const name = typeof card.name === "string" ? card.name.trim() : "";
      const orientation = card.orientation === "reversed" ? "reversed" : "upright";
      const position = typeof card.position === "string" && card.position.trim() ? card.position.trim() : "Lá bài";
      return name ? { name, orientation, position } : null;
    })
    .filter((item): item is { name: string; orientation: "upright" | "reversed"; position: string } => item !== null);

  if (drawnCards.length < 1) {
    return c.json({ error: { code: "VALIDATION", message: "Danh sách lá bài không hợp lệ." } }, 400);
  }

  const niche = typeof record?.niche === "string" && record.niche.trim() ? record.niche.trim() : "general";
  const question = typeof record?.question === "string" ? record.question.trim() : "";

  try {
    const kbCards = await loadTarotCards(c.env.BANMENH_KB_DEV);
    const cardSections: Array<{ title: string; body: string }> = [];

    for (const drawn of drawnCards) {
      const kbCard = kbCards.find((card) => card.name.toLowerCase() === drawn.name.toLowerCase());
      if (!kbCard) continue;

      const text = getTarotAspectMeaning(kbCard, niche, drawn.orientation === "reversed")
        || (drawn.orientation === "reversed" ? kbCard.reversed : kbCard.upright);

      cardSections.push({
        title: `${drawn.position} · ${kbCard.nameVi}`,
        body: text,
      });
    }

    const sections = [
      ...(question ? [{ title: "Câu hỏi của bạn", body: question }] : []),
      ...cardSections,
      {
        title: "Lời khuyên",
        body: "Hãy để thông điệp thấm vào. Tarot không ép kết luận — nó chỉ soi sáng điều bạn đã biết.",
      },
    ];

    return c.json({
      ok: true,
      sections,
      meta: { niche, cardCount: cardSections.length, source: "Mystery Tarot" },
    });
  } catch (err) {
    console.error("[tarot] reading lookup failed:", err);
    return c.json({ ok: false, error: "KB_NOT_LOADED" }, 503);
  }
});

export default app;
