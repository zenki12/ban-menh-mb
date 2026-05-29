import type { NarrativeKb, NumerologyKb } from "../schemas/numerology-kb";
import type { IndicatorResult, KarmicLessonsResult, NumerologyReport, PeriodIndicatorResult } from "./report";

export type SynthesizerInput = {
  report: NumerologyReport;
  narrative: NarrativeKb;
  kb: NumerologyKb;
};

export type IndicatorBlock = {
  key: string;
  label: string;
  number: number | string;
  html: string;
};

export type SectionBlock = {
  id: string;
  title: string;
  intro?: string;
  indicators: IndicatorBlock[];
};

type NarrativeGroup = keyof NarrativeKb;
type Context = {
  lifePath: number;
  soul: number;
  destiny: number;
  personality: number;
  maturity: number;
  birthday: number;
  attitude: number;
};

const DEFAULT_NAME = "Bạn";

const OVERVIEW_DEFS = [
  ["lifePath", "Số đường đời"],
  ["destiny", "Số sứ mệnh"],
  ["soul", "Số linh hồn"],
  ["personality", "Số cá tính"],
  ["birthday", "Số ngày sinh"],
  ["attitude", "Số thái độ"],
  ["maturity", "Số trưởng thành"],
  ["personalYear", "Năm cá nhân"],
  ["personalMonth", "Tháng cá nhân"],
  ["personalDay", "Ngày cá nhân"],
  ["cornerstone", "Chữ cái mở đầu"],
  ["capstone", "Chữ cái đóng"],
] as const;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function replaceVars(html: string, vars: Record<string, string | number>): string {
  let out = html;
  for (const [key, value] of Object.entries(vars)) {
    out = out.replaceAll(`{{${key}}}`, escapeHtml(String(value)));
  }
  return out;
}

function asRecord(data: unknown): Record<string, unknown> {
  return data && typeof data === "object" ? (data as Record<string, unknown>) : {};
}

function readString(data: Record<string, unknown>, keys: string[]): string {
  for (const key of keys) {
    const value = data[key];
    if (typeof value === "string" && value.trim()) return value.trim();
    if (Array.isArray(value)) {
      const items = value.filter((item): item is string => typeof item === "string" && item.trim().length > 0);
      if (items.length) return items.join(", ");
    }
  }
  return "";
}

function titleOf(data: unknown, fallback: string): string {
  return readString(asRecord(data), ["title"]) || fallback;
}

function numLabel(indicator: IndicatorResult | PeriodIndicatorResult): string {
  const chips: string[] = [];
  if (indicator.isMaster) chips.push("Master");
  if (indicator.karmicDebt) chips.push(`Nợ nghiệp ${indicator.karmicDebt}`);
  return chips.length ? chips.join(" · ") : "";
}

function generic(label: string, num: number | string, name: string, data: unknown): string {
  const d = asRecord(data);
  const title = titleOf(d, `${label} ${num}`);
  const fields = [
    readString(d, ["description", "meaning", "dynamic", "theme"]),
    readString(d, ["lesson", "core_lesson", "life_lesson"]),
    readString(d, ["strengths", "strength", "positive", "gift"]),
    readString(d, ["weaknesses", "blind_spot", "warning", "trap", "challenge"]),
    readString(d, ["advice", "growth_path", "how_to_develop", "how_to_overcome"]),
  ].filter(Boolean);

  if (!fields.length) return noData(label);
  return [
    `<p class="nar"><strong>${escapeHtml(name)}</strong> mang <strong>${escapeHtml(label)} ${escapeHtml(String(num))}</strong> - ${escapeHtml(title)}.</p>`,
    ...fields.map((text) => `<p class="nar">${escapeHtml(text)}</p>`),
  ].join("");
}

function noData(label: string): string {
  return `<p class="synthetic-text" style="color:#94a3b8;font-style:italic;">Dữ liệu chỉ số ${escapeHtml(label)} đang được cập nhật.</p>`;
}

function fromNarrative(
  narrative: NarrativeKb,
  group: NarrativeGroup,
  number: number | string,
  vars: Record<string, string | number>,
): string | null {
  const entry = narrative[group]?.[String(number)];
  return entry ? replaceVars(entry.html, vars) : null;
}

function energyMatch(a: number, b: number): boolean {
  const extro = [1, 3, 5, 9];
  const stable = [2, 4, 6, 8];
  return (extro.includes(a) && extro.includes(b)) || (stable.includes(a) && stable.includes(b));
}

function lifePathCtxBlock(num: number, ctx: Context, name: string): string {
  const insight =
    num === ctx.soul
      ? `Linh hồn số <strong>${ctx.soul}</strong> hoàn toàn đồng nhất với Đường đời. Điều bạn khao khát sâu nhất cũng chính là con đường bạn được mời gọi sống.`
      : energyMatch(num, ctx.soul)
        ? `Linh hồn số <strong>${ctx.soul}</strong> cộng hưởng hài hòa với Đường đời số <strong>${num}</strong>, giúp bên trong và bên ngoài dễ đi cùng một hướng.`
        : `Linh hồn số <strong>${ctx.soul}</strong> tạo một chiều sâu khác với Đường đời số <strong>${num}</strong>; hiểu được độ chênh này giúp ${escapeHtml(name)} sống trọn vẹn hơn.`;
  return `<div class="insight-box" style="margin-top:1rem;border-color:#7c3aed;">🔗 <strong>Giao điểm Đường đời → Linh hồn (${ctx.soul}) &amp; Ngày sinh (${ctx.birthday}):</strong> ${insight} Ngày sinh số <strong>${ctx.birthday}</strong> bổ sung năng lượng tự nhiên để Đường đời ${num} phát triển theo cách riêng.</div>`;
}

function soulCtxBlock(num: number, ctx: Context, name: string): string {
  const text =
    num === ctx.lifePath
      ? `Điều ${escapeHtml(name)} khao khát sâu nhất hoàn toàn khớp với Đường đời số <strong>${ctx.lifePath}</strong>.`
      : energyMatch(num, ctx.lifePath)
        ? `Linh hồn số <strong>${num}</strong> cộng hưởng với Đường đời số <strong>${ctx.lifePath}</strong>, nên hành động từ trái tim thường cũng là hành động đúng hướng.`
        : `Linh hồn số <strong>${num}</strong> và Đường đời số <strong>${ctx.lifePath}</strong> tạo hai lực kéo khác nhau, cần được lắng nghe đồng thời.`;
  return `<p class="nar" style="border-left:3px solid #7c3aed;padding-left:1rem;margin-top:1rem;"><strong>✓ Linh hồn trong tổng thể biểu đồ của ${escapeHtml(name)}:</strong> ${text}</p>`;
}

function destinyCtxBlock(num: number, ctx: Context, name: string): string {
  const text =
    num === ctx.lifePath
      ? `Sứ mệnh số <strong>${num}</strong> trùng với Đường đời số <strong>${ctx.lifePath}</strong>, làm cho con đường sống và cách đóng góp có sự thống nhất mạnh.`
      : energyMatch(num, ctx.lifePath)
        ? `Sứ mệnh số <strong>${num}</strong> cùng hướng với Đường đời số <strong>${ctx.lifePath}</strong>, giúp năng lượng đóng góp được bộc lộ tự nhiên.`
        : `Sứ mệnh số <strong>${num}</strong> và Đường đời số <strong>${ctx.lifePath}</strong> bổ trợ nhau; một bên định hình hành trình, một bên mở ra cách đóng góp.`;
  return `<p class="nar" style="border-left:3px solid #2563eb;padding-left:1rem;margin-top:1rem;"><strong>✓ Sứ mệnh trong tổng thể biểu đồ của ${escapeHtml(name)}:</strong> ${text} Ngày sinh số <strong>${ctx.birthday}</strong> là công cụ tự nhiên để hiện thực hóa sứ mệnh này.</p>`;
}

function personalityCtxBlock(num: number, ctx: Context, name: string): string {
  const text =
    num === ctx.soul
      ? `Cá tính số <strong>${num}</strong> khớp với Linh hồn số <strong>${ctx.soul}</strong>, nên hình ảnh bên ngoài phản ánh khá trung thực nội tâm.`
      : energyMatch(num, ctx.soul)
        ? `Cá tính số <strong>${num}</strong> hòa với Linh hồn số <strong>${ctx.soul}</strong>, giúp người khác dễ cảm nhận đúng con người thật.`
        : `Cá tính số <strong>${num}</strong> khác Linh hồn số <strong>${ctx.soul}</strong>, tạo chiều sâu giữa điều người khác thấy và điều ${escapeHtml(name)} thật sự cần.`;
  return `<p class="nar" style="border-left:3px solid #d97706;padding-left:1rem;margin-top:1rem;"><strong>✓ Cá tính trong tổng thể biểu đồ:</strong> ${text}</p>`;
}

function maturityCtxBlock(num: number, ctx: Context, name: string): string {
  return `<p class="nar" style="border-left:3px solid #059669;padding-left:1rem;margin-top:1rem;"><strong>✓ Số Trưởng thành ${num} trong tổng thể biểu đồ của ${escapeHtml(name)}:</strong> Con số này được hình thành từ Đường đời số <strong>${ctx.lifePath}</strong> và Sứ mệnh số <strong>${ctx.destiny}</strong>. Đây là điểm tích hợp khi kinh nghiệm sống làm rõ phiên bản đầy đủ hơn của chính mình.</p>`;
}

function synthIndicator(
  narrative: NarrativeKb,
  group: NarrativeGroup | null,
  key: string,
  label: string,
  indicator: IndicatorResult | PeriodIndicatorResult,
  name: string,
  ctx?: Context,
  periodVars: Record<string, string | number> = {},
): IndicatorBlock {
  const vars = { name, number: indicator.number, ...periodVars };
  let html = group ? fromNarrative(narrative, group, indicator.number, vars) : null;
  if (!html) html = indicator.data ? generic(label, indicator.number, name, indicator.data) : noData(label);

  if (ctx) {
    if (key === "lifePath") html += lifePathCtxBlock(indicator.number, ctx, name);
    if (key === "soul") html += soulCtxBlock(indicator.number, ctx, name);
    if (key === "destiny") html += destinyCtxBlock(indicator.number, ctx, name);
    if (key === "personality") html += personalityCtxBlock(indicator.number, ctx, name);
    if (key === "maturity") html += maturityCtxBlock(indicator.number, ctx, name);
  }

  const badge = numLabel(indicator);
  return { key, label, number: badge ? `${indicator.number} · ${badge}` : indicator.number, html };
}

function overview(report: NumerologyReport, name: string): IndicatorBlock {
  const record = report as unknown as Record<string, IndicatorResult & { letter?: string }>;
  const cards = OVERVIEW_DEFS.map(([key, label]) => {
    const item = record[key];
    const value = key === "cornerstone" || key === "capstone" ? item?.letter : item?.number;
    return `<span class="pn-item"><span class="pn-label">${label}</span><span class="pn-val">${escapeHtml(String(value ?? ""))}</span></span>`;
  }).join("");

  return {
    key: "overview",
    label: "Tổng hợp các chỉ số thần số học",
    number: "",
    html: `<div class="profile-card"><div class="profile-avatar"><span class="avatar-number">${report.lifePath.number}</span><span class="avatar-label">Chủ đạo</span></div><div class="profile-info"><div class="profile-name">${escapeHtml(name)}</div><div class="profile-dob">Ngày sinh: ${escapeHtml(report.input.dob)}</div><div class="profile-nums">${cards}</div></div></div><p class="nar">Bản báo cáo này được xây dựng riêng cho <strong>${escapeHtml(name)}</strong>, phân tích đầy đủ các chỉ số dựa trên họ tên khai sinh và ngày sinh theo hệ Pythagoras.</p><p class="nar">Hãy đọc từng phần với tâm thế cởi mở. Thần số học không phải lời tiên tri; đây là tấm gương phản chiếu những lớp năng lượng, khuynh hướng và bài học để bạn quan sát chính mình rõ hơn.</p>`,
  };
}

function karmicLessons(report: NumerologyReport, narrative: NarrativeKb, name: string): IndicatorBlock {
  const lessons = report.karmicLessons as KarmicLessonsResult;
  const html = lessons.missingNumbers.length
    ? lessons.data
        .map((item) => {
          const tmpl = fromNarrative(narrative, "karmicLesson", item.number, { name, number: item.number });
          return tmpl ?? generic("Bài học karmic", item.number, name, item.info);
        })
        .join("")
    : `<p class="nar">Không phát hiện số thiếu nổi bật trong biểu đồ tên. Điều này không có nghĩa là hành trình không có bài học, mà là các bài học karmic không hiện lên theo dạng thiếu số rõ rệt.</p>`;
  return { key: "karmicLessons", label: "Bài học karmic", number: lessons.missingNumbers.join(", ") || "Không thiếu số", html };
}

function letterBlock(key: "cornerstone" | "capstone", label: string, letter: string | undefined, name: string): IndicatorBlock {
  const value = letter || "?";
  return {
    key,
    label,
    number: value,
    html: `<p class="nar"><strong>${label} ${escapeHtml(value)}</strong> là dấu ấn chữ cái trong tên gọi của ${escapeHtml(name)}.</p><p class="nar">Trong V1, phần này được dùng như một chỉ báo biểu tượng: chữ cái mở đầu nói về ấn tượng ban đầu và cách bắt đầu hành động; chữ cái đóng nói về cách hoàn tất, kết luận và để lại dư âm.</p>`,
  };
}

export function buildSynthesizedReport(input: SynthesizerInput): SectionBlock[] {
  const { report, narrative } = input;
  const name = report.input.fullName || DEFAULT_NAME;
  const ctx: Context = {
    lifePath: report.lifePath.number,
    soul: report.soul.number,
    destiny: report.destiny.number,
    personality: report.personality.number,
    maturity: report.maturity.number,
    birthday: report.input.dobParts.day,
    attitude: report.attitude.number,
  };

  return [
    {
      id: "overview",
      title: "PHẦN A. TỔNG QUAN & BIỂU ĐỒ VẬN SỐ",
      intro: "Tổng hợp 12 chỉ số nền trước khi đi vào luận giải chi tiết.",
      indicators: [overview(report, name)],
    },
    {
      id: "core",
      title: "PHẦN B. PHÂN TÍCH ĐƯỜNG ĐỜI",
      intro: "Các chỉ số cốt lõi mô tả hướng phát triển, bản ngã và nguồn năng lượng nền.",
      indicators: [
        synthIndicator(narrative, "lifePath", "lifePath", "Số Đường đời", report.lifePath, name, ctx),
        synthIndicator(narrative, "destiny", "destiny", "Số Sứ mệnh", report.destiny, name, ctx),
        synthIndicator(narrative, "soul", "soul", "Số Linh hồn", report.soul, name, ctx),
        synthIndicator(narrative, "personality", "personality", "Số Cá tính", report.personality, name, ctx),
        synthIndicator(narrative, "birthday", "birthday", "Số Ngày sinh", report.birthday, name, undefined, {
          rawDay: report.input.dobParts.day,
        }),
      ],
    },
    {
      id: "personality-attitude",
      title: "PHẦN C. CÁ TÍNH & THÁI ĐỘ TIẾP CẬN",
      intro: "Nhóm này cho thấy cách bạn bước vào tình huống, phản ứng và tiếp cận cuộc sống.",
      indicators: [
        synthIndicator(narrative, "attitude", "attitude", "Số Thái độ", report.attitude, name),
        synthIndicator(narrative, "approachMotivation", "approachMotivation", "Động lực tiếp cận", report.approachMotivation, name),
        synthIndicator(narrative, "approachAbility", "approachAbility", "Năng lực tiếp cận", report.approachAbility, name),
        synthIndicator(narrative, "approachAttitude", "approachAttitude", "Thái độ tiếp cận", report.approachAttitude, name),
      ],
    },
    {
      id: "lessons",
      title: "PHẦN D. BÀI HỌC & HÀNH TRÌNH",
      intro: "Các chỉ số trong nhóm này nói về bài học dài hạn, thử thách nội tâm và hướng trưởng thành.",
      indicators: [
        synthIndicator(narrative, "maturity", "maturity", "Số Trưởng thành", report.maturity, name, ctx),
        synthIndicator(narrative, null, "maturityAbility", "Năng lực trưởng thành", report.maturityAbility, name),
        synthIndicator(narrative, "cognitiveAbility", "cognitiveAbility", "Năng lực nhận thức", report.cognitiveAbility, name),
        synthIndicator(narrative, null, "overrideDifficulty", "Khó khăn vượt qua", report.overrideDifficulty, name),
        synthIndicator(narrative, "soulChallenge", "soulChallenge", "Thử thách Linh hồn", report.soulChallenge, name),
        synthIndicator(narrative, "destinyChallenge", "destinyChallenge", "Thử thách Sứ mệnh", report.destinyChallenge, name),
        synthIndicator(narrative, "personalityChallenge", "personalityChallenge", "Thử thách Cá tính", report.personalityChallenge, name),
        karmicLessons(report, narrative, name),
      ],
    },
    {
      id: "time-cycles",
      title: "PHẦN E. CHU KỲ THỜI GIAN",
      intro: "Chu kỳ cá nhân, chu kỳ đời và kim tự tháp cho thấy nhịp phát triển theo thời gian.",
      indicators: [
        synthIndicator(narrative, "personalYearDomains", "personalYear", `Năm cá nhân ${report.personalYear.year}`, report.personalYear, name, undefined, {
          year: report.personalYear.year,
          age: report.personalYear.year - report.input.dobParts.year,
        }),
        synthIndicator(narrative, null, "personalMonth", `Tháng cá nhân ${report.personalMonth.month}`, report.personalMonth, name),
        synthIndicator(narrative, null, "personalDay", `Ngày cá nhân ${report.personalDay.date}`, report.personalDay, name),
        ...report.lifeCycles.map((item, index) =>
          synthIndicator(narrative, null, `lifeCycle${index + 1}`, `Chu kỳ đời ${index + 1}`, item, name, undefined, {
            period: item.period,
          }),
        ),
        ...report.pyramidPeaks.map((item, index) =>
          synthIndicator(narrative, "pyramidPeak", `pyramidPeak${index + 1}`, `Đỉnh kim tự tháp ${index + 1}`, item, name, undefined, {
            period: item.period,
            peakIndex: index + 1,
          }),
        ),
        ...report.pyramidChallenges.map((item, index) =>
          synthIndicator(narrative, "pyramidChallenge", `pyramidChallenge${index + 1}`, `Thử thách kim tự tháp ${index + 1}`, item, name, undefined, {
            period: item.period,
          }),
        ),
      ],
    },
    {
      id: "special",
      title: "PHẦN F. DẤU ẤN ĐẶC BIỆT",
      intro: "Các dấu ấn chữ cái giúp bổ sung góc nhìn về cách bắt đầu và kết thúc năng lượng tên gọi.",
      indicators: [
        letterBlock("cornerstone", "Chữ cái mở đầu", report.cornerstone.letter, name),
        letterBlock("capstone", "Chữ cái đóng", report.capstone.letter, name),
      ],
    },
  ];
}
