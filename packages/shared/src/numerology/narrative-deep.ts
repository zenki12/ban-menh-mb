import type { IndicatorResult, PeriodIndicatorResult } from "./report";

export type NarrativeContext = {
  lifePath: number;
  soul: number;
  destiny: number;
  personality: number;
  maturity: number;
  birthday: number;
  attitude: number;
};

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function asRecord(data: unknown): Record<string, unknown> {
  return data && typeof data === "object" ? (data as Record<string, unknown>) : {};
}

export function readString(data: unknown, keys: string[]): string {
  const record = asRecord(data);
  for (const key of keys) {
    const value = record[key];
    if (typeof value === "string" && value.trim()) return value.trim();
    if (Array.isArray(value)) {
      const items = value.filter((item): item is string => typeof item === "string" && item.trim().length > 0);
      if (items.length) return items.join(", ");
    }
  }
  return "";
}

export function generic(label: string, num: number | string, name: string, kbData: unknown): string {
  const title = readString(kbData, ["title", "theme"]) || `${label} ${num}`;
  const parts = [
    readString(kbData, ["description", "meaning", "dynamic", "core", "traits", "theme"]),
    readString(kbData, ["lesson", "core_lesson", "life_lesson", "mission", "desire"]),
    readString(kbData, ["strengths", "strength", "positive", "gift", "career", "career_fit"]),
    readString(kbData, ["weaknesses", "negative", "blind_spot", "warning", "trap", "challenge"]),
    readString(kbData, ["advice", "growth_path", "how_to_develop", "how_to_overcome", "resolution"]),
  ].filter(Boolean);

  if (!parts.length) return `<p class="nar"><em>Dữ liệu ${escapeHtml(label)} đang được cập nhật.</em></p>`;

  return [
    `<p class="nar"><strong>${escapeHtml(name)}</strong> mang <strong>${escapeHtml(label)} ${escapeHtml(String(num))}</strong> — ${escapeHtml(title)}.</p>`,
    ...parts.map((part) => `<p class="nar">${escapeHtml(part)}</p>`),
  ].join("");
}

export function personalPeriod(
  label: string,
  num: number,
  yearOrMonth: string | number,
  name: string,
  kbData: unknown,
): string {
  const title = readString(kbData, ["title", "theme"]) || `${label} cá nhân ${num}`;
  const fields = [
    ["Chủ đề chính", readString(kbData, ["theme", "focus"])],
    ["Sự nghiệp", readString(kbData, ["career", "action"])],
    ["Tài chính", readString(kbData, ["finance"])],
    ["Tình yêu & quan hệ", readString(kbData, ["love", "relationship"])],
    ["Sức khỏe & năng lượng", readString(kbData, ["health"])],
    ["Lời khuyên", readString(kbData, ["advice", "warning", "avoid"])],
  ].filter((item): item is [string, string] => Boolean(item[1]));

  return [
    `<p class="nar"><strong>${escapeHtml(label)} ${escapeHtml(String(yearOrMonth))}</strong> của <strong>${escapeHtml(name)}</strong> mang vận số <strong>${num}</strong> — ${escapeHtml(title)}.</p>`,
    `<div class="lc-advice-grid">${fields
      .map(
        ([field, text]) =>
          `<div class="lc-advice-item"><div class="lc-advice-label">${escapeHtml(field)}</div><div class="lc-advice-text">${escapeHtml(text)}</div></div>`,
      )
      .join("")}</div>`,
  ].join("");
}

export function buildYearDomainBlock(num: number, year: number, age: number, name: string, kbData?: unknown): string {
  const title = readString(kbData, ["title", "theme"]) || `Vận số ${num}`;
  const fields = [
    ["💞 Tình yêu", readString(kbData, ["love"])],
    ["💼 Sự nghiệp", readString(kbData, ["career"])],
    ["💰 Tài chính", readString(kbData, ["finance"])],
    ["🤝 Giao tiếp xã hội", readString(kbData, ["relationship", "social"])],
    ["📚 Học tập", readString(kbData, ["study"])],
    ["🌿 Sức khỏe", readString(kbData, ["health"])],
  ].filter((item): item is [string, string] => Boolean(item[1]));

  return `<article class="year-card-deep">
    <div class="year-card-deep-head"><span>NĂM ${year}</span><strong>VẬN SỐ ${num}</strong><em>${age} tuổi</em></div>
    <p class="nar"><strong>${escapeHtml(name)}</strong> bước vào năm ${year} với năng lượng <strong>${num}</strong> — ${escapeHtml(title)}.</p>
    <div class="lc-advice-grid">${fields
      .map(([label, text]) => `<div class="lc-advice-item"><div class="lc-advice-label">${label}</div><div class="lc-advice-text">${escapeHtml(text)}</div></div>`)
      .join("")}</div>
  </article>`;
}

export function personalYearDeep(item: IndicatorResult & { year: number; age?: number }, name: string): string {
  return buildYearDomainBlock(item.number, item.year, item.age ?? 0, name, item.data);
}

export function personalMonthDeep(item: IndicatorResult & { year: number; month: number }, name: string): string {
  return `<article class="year-card-deep">
    <div class="year-card-deep-head"><span>THÁNG ${item.month}/${item.year}</span><strong>VẬN SỐ ${item.number}</strong></div>
    ${personalPeriod(`Tháng ${item.month}`, item.number, `${item.month}/${item.year}`, name, item.data)}
  </article>`;
}

export function lifeCycleNarrative(
  cycleNum: number,
  num: number,
  period: string,
  name: string,
  kbData: unknown,
): string {
  const labels = ["", "GIEO HẠT", "CHÍN", "THU HOẠCH"];
  return `<div class="cycle-block">
    <div class="cycle-header"><span class="cycle-badge">${cycleNum}</span><strong>${labels[cycleNum] ?? `CHU KỲ ${cycleNum}`}</strong><em>${escapeHtml(period)}</em></div>
    ${generic(`Chu kỳ đường đời ${cycleNum}`, num, name, kbData)}
  </div>`;
}

export function pyramidPeakAnalysis(
  peakIndex: number,
  peakNum: number,
  period: string,
  challengeNum: number | null,
  name: string,
  peakData?: unknown,
  challengeData?: unknown,
): string {
  return `<article class="pyramid-period">
    <h4 class="pyramid-period-heading">ĐỈNH THỨ ${peakIndex + 1} — Vận số ${peakNum}</h4>
    <p class="pyramid-note"><strong>Giai đoạn:</strong> ${escapeHtml(period)}</p>
    ${generic("Đỉnh kim tự tháp", peakNum, name, peakData)}
    ${
      challengeNum === null
        ? ""
        : `<div class="pyramid-advice"><strong>🌟 Thử thách song hành ${challengeNum}:</strong>${generic("Thử thách kim tự tháp", challengeNum, name, challengeData)}</div>`
    }
  </article>`;
}

function sameEnergy(a: number, b: number): boolean {
  const active = [1, 3, 5, 9];
  const stable = [2, 4, 6, 8];
  return (active.includes(a) && active.includes(b)) || (stable.includes(a) && stable.includes(b));
}

export function lifePathCtxBlock(num: number, ctx: NarrativeContext, name: string): string {
  const relation =
    num === ctx.soul
      ? "Đường đời và Linh hồn đồng nhất, khiến điều bạn khao khát sâu bên trong cũng chính là hướng bạn được mời gọi bước đi."
      : sameEnergy(num, ctx.soul)
        ? "Đường đời và Linh hồn cộng hưởng, giúp hành trình bên ngoài dễ nhận được lực đẩy từ mong muốn bên trong."
        : "Đường đời và Linh hồn tạo ra hai lực kéo khác nhau; khi hiểu cả hai, bạn sẽ bớt tự mâu thuẫn và chọn hướng đi tỉnh táo hơn.";
  return `<div class="insight-box cross-context-box">🔗 <strong>Giao điểm Đường đời ↔ Linh hồn (${ctx.soul}) & Ngày sinh (${ctx.birthday}):</strong> ${relation} Ngày sinh ${ctx.birthday} là cách <strong>${escapeHtml(name)}</strong> biểu hiện bài học này trong đời sống thường ngày.</div>`;
}

export function soulCtxBlock(num: number, ctx: NarrativeContext, name: string): string {
  return `<div class="insight-box cross-context-box">🔗 <strong>Linh hồn ${num} trong tổng thể biểu đồ:</strong> Khi đặt cạnh Đường đời ${ctx.lifePath} và Sứ mệnh ${ctx.destiny}, mong muốn sâu thẳm của <strong>${escapeHtml(name)}</strong> cho thấy điều cần được nuôi dưỡng để hành động bên ngoài không bị rỗng năng lượng.</div>`;
}

export function destinyCtxBlock(num: number, ctx: NarrativeContext, name: string): string {
  return `<div class="insight-box cross-context-box">🔗 <strong>Sứ mệnh ${num} trong tổng thể biểu đồ:</strong> Đường đời ${ctx.lifePath} chỉ hướng đi, còn Sứ mệnh ${num} mô tả cách <strong>${escapeHtml(name)}</strong> đóng góp. Khi hai chỉ số này được đọc cùng nhau, bức tranh hành động trở nên rõ hơn.</div>`;
}

export function personalityCtxBlock(num: number, ctx: NarrativeContext, name: string): string {
  return `<div class="insight-box cross-context-box">🔗 <strong>Nhân cách ${num} trong tương quan với Linh hồn ${ctx.soul}:</strong> Đây là lớp người khác nhìn thấy trước khi chạm tới nội tâm của <strong>${escapeHtml(name)}</strong>. Hiểu khoảng cách này giúp bạn giao tiếp thật hơn.</div>`;
}

export function maturityCtxBlock(num: number, ctx: NarrativeContext, name: string): string {
  return `<div class="insight-box cross-context-box">🔗 <strong>Trưởng thành ${num} trong tổng thể biểu đồ:</strong> Con số này được hình thành từ Đường đời ${ctx.lifePath} và Sứ mệnh ${ctx.destiny}; nó mô tả phiên bản chín muồi hơn mà <strong>${escapeHtml(name)}</strong> sẽ dần bước vào.</div>`;
}

export function indicatorHtml(
  label: string,
  indicator: IndicatorResult | PeriodIndicatorResult,
  name: string,
  ctx?: NarrativeContext,
): string {
  return generic(label, indicator.number, name, indicator.data) + (ctx ? lifePathCtxBlock(indicator.number, ctx, name) : "");
}
