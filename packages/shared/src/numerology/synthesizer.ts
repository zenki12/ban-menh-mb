import type { NarrativeKb, NumerologyKb } from "../schemas/numerology-kb";
import {
  buildLifeCyclesSection,
  buildPersonalYearFullBlock,
  buildPyramidSection,
  buildYearDomainBlock,
  destinyCtxBlock,
  escapeHtml,
  generic,
  LIFE_PATH_EXTRA,
  lifePathCtxBlock,
  maturityCtxBlock,
  personalMonthDeep,
  personalPeriod,
  personalityCtxBlock,
  readString,
  renderLifePathExtra,
  soulCtxBlock,
  type NarrativeContext,
} from "./narrative-deep";
import type { IndicatorResult, KarmicLessonsResult, NumerologyReport } from "./report";

export type SynthesizerInput = {
  report: NumerologyReport;
  narrative: NarrativeKb;
  kb: NumerologyKb;
};

export type SectionBlock = {
  id: string;
  number: string;
  title: string;
  intro?: string;
  html: string;
  chartSlot?: "pyramid" | "birth-grid" | "combined-grid" | "career-bars";
};

export type Phase = {
  letter: "A" | "B" | "C" | "D";
  title: string;
  sections: SectionBlock[];
};

export type SynthesizedReport = {
  profileHeader: {
    name: string;
    dob: string;
    lifePathNumber: number;
    chips8: Array<{ label: string; num: number }>;
  };
  phases: Phase[];
};

type NarrativeGroup = keyof NarrativeKb;

function replaceVars(html: string, vars: Record<string, string | number>): string {
  let out = html;
  for (const [key, value] of Object.entries(vars)) {
    out = out.replaceAll(`{{${key}}}`, escapeHtml(String(value)));
  }
  return out;
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

function renderIndicator(
  narrative: NarrativeKb,
  group: NarrativeGroup | null,
  label: string,
  indicator: IndicatorResult,
  name: string,
  vars: Record<string, string | number> = {},
): string {
  const html = group ? fromNarrative(narrative, group, indicator.number, { name, number: indicator.number, ...vars }) : null;
  return html ?? generic(label, indicator.number, name, indicator.data);
}

function section(
  number: string,
  title: string,
  html: string,
  options: Pick<SectionBlock, "intro" | "chartSlot"> = {},
): SectionBlock {
  return {
    id: `section-${number.replace(/[^\dA-Za-z]+/g, "-").replace(/^-|-$/g, "")}`,
    number,
    title,
    html,
    ...options,
  };
}

function buildProfileHeader(report: NumerologyReport): SynthesizedReport["profileHeader"] {
  return {
    name: report.input.fullName,
    dob: report.input.dob,
    lifePathNumber: report.lifePath.number,
    chips8: [
      { label: "Đường Đời", num: report.lifePath.number },
      { label: "Sứ Mệnh", num: report.destiny.number },
      { label: "Linh Hồn", num: report.soul.number },
      { label: "Nhân Cách", num: report.personality.number },
      { label: "Trưởng Thành", num: report.maturity.number },
      { label: "Thái Độ", num: report.attitude.number },
      { label: "Năm cá nhân", num: report.personalYear.number },
      { label: "Tháng cá nhân", num: report.personalMonth.number },
    ],
  };
}

function overviewHtml(report: NumerologyReport, name: string): string {
  const chips = buildProfileHeader(report).chips8
    .map(
      (chip) =>
        `<span class="pn-item"><span class="pn-label">${escapeHtml(chip.label)}</span><span class="pn-val">${chip.num}</span></span>`,
    )
    .join("");
  return `<div class="profile-card"><div class="profile-avatar"><span class="avatar-number">${report.lifePath.number}</span><span class="avatar-label">Chủ Đạo</span></div><div class="profile-info"><div class="profile-name">${escapeHtml(name)}</div><div class="profile-dob">Ngày sinh: ${escapeHtml(report.input.dob)}</div><div class="profile-nums">${chips}</div></div></div>
  <p class="nar">Bản báo cáo này được xây dựng riêng cho <strong>${escapeHtml(name)}</strong> — phân tích đầy đủ các chỉ số dựa trên <strong>họ tên khai sinh</strong> và <strong>ngày/tháng/năm sinh</strong> theo hệ Pythagoras.</p>
  <p class="nar">Hãy đọc từng phần với tâm thái cởi mở và suy ngẫm. Thần số học không phải lời tiên tri — đó là tấm gương phản chiếu bản chất sâu xa nhất của bạn, để bạn hiểu rõ hơn về chính mình và đưa ra những lựa chọn có ý thức hơn.</p>`;
}

function careerCard(label: string, text: string): string {
  if (!text) return "";
  return `<div class="career-card"><div class="career-card-label">${escapeHtml(label)}</div><div class="career-card-text">${escapeHtml(text)}</div></div>`;
}

function careerHtml(report: NumerologyReport, name: string): string {
  const lpCareer = readString(report.lifePath.data, ["career", "career_fit", "mission"]);
  const destCareer = readString(report.destiny.data, ["career", "career_fit", "mission"]);
  const bdayCareer = readString(report.birthday.data, ["career_fit", "career", "mission"]);
  const cards = [
    careerCard("ĐƯỜNG ĐỜI", lpCareer),
    careerCard("SỨ MỆNH", destCareer),
    careerCard("NGÀY SINH", bdayCareer),
  ]
    .filter(Boolean)
    .join("");
  const lpExtra = LIFE_PATH_EXTRA[report.lifePath.number];
  const detail = lpExtra?.ngheNghiep
    ? `<div class="lp-extra-section">
        <div class="lp-extra-heading">💼 Định Hướng Nghề Nghiệp Chi Tiết</div>
        <div class="lp-extra-body">${lpExtra.ngheNghiep}</div>
      </div>`
    : "";

  return `<p class="nar">Nhóm ngành nghề phù hợp của <strong>${escapeHtml(name)}</strong> được tổng hợp từ các chỉ số cốt lõi, đặc biệt là Đường đời, Sứ mệnh và Ngày sinh.</p><div class="career-cards-grid">${cards}</div><!-- CHART:career-bars -->${detail}`;
}

function relationshipHtml(titleText: string, first: number, second: number, name: string): string {
  const harmony = first === second ? "hoàn toàn đồng nhất" : Math.abs(first - second) <= 2 ? "có độ cộng hưởng tốt" : "tạo ra hai lực kéo khác nhau cần được dung hòa";
  return `<p class="nar">${titleText} của <strong>${escapeHtml(name)}</strong> là cặp số <strong>${first}</strong> và <strong>${second}</strong>. Hai năng lượng này ${harmony}, vì vậy nên đọc cùng nhau thay vì tách rời.</p><div class="insight-box">📌 <strong>Lời khuyên:</strong> Khi hai chỉ số bổ trợ, hãy dùng chúng như lực đẩy. Khi chúng căng nhau, hãy xem đó là tín hiệu cần cân bằng giữa điều bạn muốn, cách bạn hành động và vai trò bạn đang sống.</div>`;
}

export function buildLifePathDestinyCorrelation(report: NumerologyReport, name: string): string {
  const lpNum = report.lifePath.number;
  const destNum = report.destiny.number;
  const lp_dest_same = lpNum === destNum;
  const reducedLp = lpNum % 9 || 9;
  const reducedDest = destNum % 9 || 9;
  const lp_dest_harmony = ([1, 3, 5, 9].includes(reducedLp) && [1, 3, 5, 9].includes(reducedDest))
    || ([2, 4, 6, 8].includes(reducedLp) && [2, 4, 6, 8].includes(reducedDest));
  const compat = lp_dest_same
    ? `hoàn toàn tương đồng — cực kỳ hiếm gặp và đặc biệt. Con đường bạn đi chính là bản sắc bạn mang, giúp bạn tập trung vào mục tiêu gần như không có mâu thuẫn nội tâm`
    : (lp_dest_harmony
      ? `tương hợp tốt. Những điểm mạnh trong tính cách của bạn được thúc đẩy và thể hiện rõ ràng hơn, giúp bạn phát triển mạnh mẽ hơn`
      : `có những điểm đối đầu nhau. Tuy nhiên bạn vẫn có thể hóa giải nếu nỗ lực học hỏi và phát triển bản thân`);
  const lpTitle = readString(report.lifePath.data, ["title"]) || `năng lượng số ${lpNum}`;
  const safeName = escapeHtml(name);
  return `<p class="nar">Trong thần số học, Chỉ số Đường Đời và Chỉ số Sứ Mệnh là hai yếu tố có mối quan hệ chặt chẽ với nhau, cùng tồn tại trong một người. Chỉ số đường đời cho biết mục đích tổng thể của một người trong cuộc sống, còn chỉ số sứ mệnh cho biết cách thức một người thực hiện mục đích đó.</p>
<p class="nar">Cặp số <strong>Đường Đời ${lpNum} — Sứ Mệnh ${destNum}</strong> của <strong>${safeName}</strong> ${compat}. Khi chỉ số đường đời và sứ mệnh bổ sung hoặc cộng hưởng với nhau, những điểm mạnh trong tính cách của bạn được thúc đẩy và thể hiện rõ ràng hơn. Ngược lại, nếu đối đầu hoặc mâu thuẫn, một số năng lượng tích cực có thể bị mờ nhạt và bạn có thể cảm thấy bối rối, khó khăn trong việc đưa ra quyết định.</p>
<p class="nar">Số đường đời <strong>${lpNum}</strong> gắn liền với ${escapeHtml(lpTitle)}. Bạn luôn giữ vững lập trường khi đã xác định một vấn đề là đúng. Bên cạnh đó, số sứ mệnh <strong>${destNum}</strong> định hình cách bạn tính toán, phân tích và thực hiện mục tiêu. Khi cả hai bổ sung cho nhau sẽ giúp bạn ngày càng chắc chắn hơn trong các quyết định và giảm thiểu rủi ro trong cuộc sống.</p>
<div class="insight-box">📌 <strong>Lưu ý:</strong> Hãy đọc kỹ luận giải về cả hai chỉ số này và kết hợp chúng lại để có bức tranh toàn diện nhất về hành trình của mình.</div>`;
}

function karmicLessonsHtml(report: NumerologyReport, narrative: NarrativeKb, name: string): string {
  const lessons = report.karmicLessons as KarmicLessonsResult;
  if (!lessons.missingNumbers.length) {
    return `<div class="insight-box">✅ <strong>Biểu đồ tên không thiếu số nổi bật.</strong> Điều này không có nghĩa là không có bài học, mà là các bài học nghiệp không hiện lên theo dạng thiếu số rõ rệt.</div>`;
  }
  return `<p class="nar">Các số <strong>${lessons.missingNumbers.join(", ")}</strong> vắng mặt trong biểu đồ tên. Mỗi số thiếu tương ứng với một bài học nghiệp cần được nhận diện và rèn luyện.</p>${lessons.data
    .map((item) => renderIndicator(narrative, "karmicLesson", "Bài học nghiệp", { number: item.number, raw: item.number, isMaster: false, data: item.info }, name))
    .join("")}`;
}

function karmicDebtHtml(report: NumerologyReport, kb: NumerologyKb, name: string): string {
  const numbers = [
    report.lifePath.karmicDebt,
    report.destiny.karmicDebt,
    report.soul.karmicDebt,
    report.personality.karmicDebt,
    report.maturity.karmicDebt,
  ].filter((value, index, list): value is NonNullable<typeof value> => Boolean(value) && list.indexOf(value) === index);
  if (!numbers.length) return `<div class="insight-box">✅ <strong>Không phát hiện nợ nghiệp 13/14/16/19 trong các chỉ số chính.</strong></div>`;
  return numbers
    .map((num) => {
      const data = (kb.karmic_debt as Record<string, unknown>)[String(num)];
      return `<div class="karmic-debt-box">${generic(`Nợ nghiệp ${num}`, num, name, data)}</div>`;
    })
    .join("");
}

function lifePathHtml(report: NumerologyReport, narrative: NarrativeKb, ctx: NarrativeContext, name: string): string {
  const lpNum = report.lifePath.number;
  const narrativeHtml = fromNarrative(narrative, "lifePath", lpNum, { name, number: lpNum }) ?? "";
  return [narrativeHtml, lifePathCtxBlock(lpNum, ctx, name), renderLifePathExtra(lpNum, name)].join("");
}

function challengeHtml(
  narrative: NarrativeKb,
  group: NarrativeGroup,
  label: string,
  indicator: IndicatorResult,
  name: string,
): string {
  return renderIndicator(narrative, group, label, indicator, name);
}

export function buildSynthesizedReport(input: SynthesizerInput): SynthesizedReport {
  const { report, narrative, kb } = input;
  const name = report.input.fullName;
  const ctx: NarrativeContext = {
    lifePath: report.lifePath.number,
    soul: report.soul.number,
    destiny: report.destiny.number,
    personality: report.personality.number,
    maturity: report.maturity.number,
    birthday: report.birthday.number,
    attitude: report.attitude.number,
  };

  const phases: Phase[] = [
    {
      letter: "A",
      title: "TỔNG QUAN & BIỂU ĐỒ VẬN SỐ",
      sections: [
        section("1", "Tổng hợp các chỉ số thần số học", overviewHtml(report, name)),
        section(
          "2",
          "Phân tích chi tiết 3 năm tới",
          `<p class="nar">Biểu đồ vận số cá nhân cho thấy dòng năng lượng của các năm gần hiện tại. Phần dưới đây mở rộng 3 năm tới để bạn dễ định hướng.</p>${report.personalYearsRange
            .map((item) => buildYearDomainBlock(item.number, item.year, item.age, name))
            .join("")}`,
        ),
        section("3", "Nhóm ngành nghề phù hợp", careerHtml(report, name), { chartSlot: "career-bars" }),
      ],
    },
    {
      letter: "B",
      title: "PHÂN TÍCH ĐƯỜNG ĐỜI",
      sections: [
        section("5", "Chỉ số Đường Đời (Số Chủ Đạo)", lifePathHtml(report, narrative, ctx, name), {
          intro: readString(report.lifePath.data, ["title"]) ? `${report.lifePath.number} · ${readString(report.lifePath.data, ["title"])}` : String(report.lifePath.number),
        }),
        section("6", "Chu Kỳ Đường Đời", buildLifeCyclesSection(report, name)),
        section(
          "7",
          "Biểu đồ Kim Tự Tháp — Đỉnh cao & Thử thách",
          buildPyramidSection(report, name, narrative),
          { chartSlot: "pyramid" },
        ),
        section(
          "8",
          "Chỉ số Năm Cá Nhân",
          `<p class="nar"><strong>Năm Cá Nhân ${report.personalYear.number}</strong> — ${escapeHtml(readString(report.personalYear.data, ["title"]))} (${report.personalYear.year})</p>` +
            personalPeriod("Năm", report.personalYear.number, report.personalYear.year, name, report.personalYear.data),
        ),
        section(
          "8.1",
          "Chu Kỳ Vận Số — Phân Tích Chi Tiết 3 Năm",
          `<p class="nar" style="font-style:italic;">Mỗi năm trong cuộc đời bạn mang một con số cá nhân riêng biệt, lặp lại theo vòng 9 năm. Những con số này cho biết luồng năng lượng chủ đạo của năm đó — ảnh hưởng toàn diện đến sự nghiệp, tài chính, tình yêu, sức khỏe và các mối quan hệ xã hội. Hiểu và đi theo luồng năng lượng này giúp bạn hành động đúng thời điểm và tránh đi ngược lại dòng chảy tự nhiên.</p>` +
            `<div class="year-cards-grid">` +
            report.personalYearsRange
              .map(
                (item) =>
                  `<div class="year-card-tab"><div class="year-card-label">NĂM ${item.year}</div><div class="year-card-num">${item.number}</div><div class="year-card-age">${item.year - report.input.dobParts.year} tuổi</div></div>`,
              )
              .join("") +
            `</div>` +
            report.personalYearsRange
              .map((item, idx) => buildPersonalYearFullBlock(item.number, item.year, item.year - report.input.dobParts.year, name, idx + 1))
              .join(""),
        ),
        section("9", "Chỉ số Tháng Cá Nhân", personalPeriod(`Tháng ${report.personalMonth.month}`, report.personalMonth.number, `${report.personalMonth.month}/${report.personalYear.year}`, name, report.personalMonth.data)),
        section(
          "9.1",
          "Chỉ Số Các Tháng — Phân Tích 3 Tháng",
          `<p class="nar" style="font-style:italic;">Những con số này cho biết ở mỗi tháng sẽ có những điều gì có khả năng xảy ra và bạn nên tập trung làm việc theo con số nào, theo con số này nào sẽ ở mức độ sâu hơn so với chỉ số năm.</p>` +
            `<div class="year-cards-grid">` +
            report.personalMonthsRange
              .map(
                (item) =>
                  `<div class="year-card-tab"><div class="year-card-label">THÁNG ${item.month}/${item.year}</div><div class="year-card-num">${item.number}</div></div>`,
              )
              .join("") +
            `</div>` +
            report.personalMonthsRange.map((item) => personalMonthDeep(item, name)).join(""),
        ),
      ],
    },
    {
      letter: "C",
      title: "PHÂN TÍCH SỨ MỆNH & NỘI TÂM",
      sections: [
        section(
          "10",
          "Chỉ số Sứ Mệnh (Vận Mệnh)",
          `<p class="nar"><strong>Sứ Mệnh số ${report.destiny.number}</strong> — ${escapeHtml(readString(report.destiny.data, ["title"]))}. Đây là chỉ số thể hiện cách bạn đạt được mục tiêu và đóng góp cho thế giới.</p>` +
            renderIndicator(narrative, "destiny", "Sứ mệnh", report.destiny, name) +
            destinyCtxBlock(report.destiny.number, ctx, name),
        ),
        section("11", "Tương quan Đường đời & Sứ mệnh", buildLifePathDestinyCorrelation(report, name)),
        section("12", "Thử thách Sứ Mệnh", challengeHtml(narrative, "destinyChallenge", "Thử thách Sứ mệnh", report.destinyChallenge, name)),
        section("13", "Chỉ số Trưởng Thành", renderIndicator(narrative, "maturity", "Trưởng thành", report.maturity, name) + maturityCtxBlock(report.maturity.number, ctx, name)),
        section("14", "Năng lực trong giai đoạn Trưởng Thành", generic("Năng lực trưởng thành", report.maturityAbility.number, name, report.maturityAbility.data)),
        section("15", "Chỉ số Linh Hồn (Mong ước sâu thẳm)", renderIndicator(narrative, "soul", "Linh hồn", report.soul, name) + soulCtxBlock(report.soul.number, ctx, name)),
        section("16", "Tương quan Đường đời & Linh hồn", relationshipHtml("Tương quan Đường đời và Linh hồn", report.lifePath.number, report.soul.number, name)),
        section("17", "Thử thách Linh Hồn", challengeHtml(narrative, "soulChallenge", "Thử thách Linh hồn", report.soulChallenge, name)),
        section("18", "Chỉ số Nhân Cách", renderIndicator(narrative, "personality", "Nhân cách", report.personality, name) + personalityCtxBlock(report.personality.number, ctx, name)),
        section("19", "Thử thách Nhân Cách", challengeHtml(narrative, "personalityChallenge", "Thử thách Nhân cách", report.personalityChallenge, name)),
        section("20", "Các bài học nghiệp (Karmic Lessons)", karmicLessonsHtml(report, narrative, name)),
        section("21", "Các chỉ số Nợ Nghiệp (Karmic Debt)", karmicDebtHtml(report, kb, name)),
      ],
    },
    {
      letter: "D",
      title: "PHÂN TÍCH NĂNG LỰC & BIỂU ĐỒ SỨC MẠNH",
      sections: [
        section("22", "Biểu đồ Sức Mạnh — Lưới Ngày Sinh (Pythagoras)", `<p class="nar">Ma trận 3×3 của Pythagoras đặt từng chữ số trong ngày sinh vào ô tương ứng. Các ô đầy là điểm mạnh năng lượng bẩm sinh; ô trống là những bài học cần được bổ sung.</p>`, { chartSlot: "birth-grid" }),
        section("23", "Biểu đồ Tên & Biểu đồ Tổng Hợp", `<p class="nar">Biểu đồ tên cho thấy nguồn năng lượng được kích hoạt qua họ tên. Biểu đồ tổng hợp kết hợp ngày sinh và tên để nhận diện mũi tên sức mạnh, số lẻ loi và số được bù.</p>`, { chartSlot: "combined-grid" }),
        section("24", "Chỉ số Thái Độ", renderIndicator(narrative, "attitude", "Thái độ", report.attitude, name)),
        section("25", "Chỉ số Ngày Sinh (Tài năng Tự nhiên)", renderIndicator(narrative, "birthday", "Ngày sinh", report.birthday, name)),
        section("26", "Chỉ số Vượt Khó (Tension Number)", renderIndicator(narrative, "tensionNumber", "Vượt khó", report.tensionNumber, name)),
        section("27", "Chỉ số Năng Lực Tư Duy", renderIndicator(narrative, "cognitiveAbility", "Năng lực tư duy", report.cognitiveAbility, name)),
        section("28", "Chỉ số Động Lực Tiếp Cận", renderIndicator(narrative, "approachMotivation", "Động lực tiếp cận", report.approachMotivation, name)),
        section("29", "Chỉ số Năng Lực Tiếp Cận", renderIndicator(narrative, "approachAbility", "Năng lực tiếp cận", report.approachAbility, name)),
        section("30", "Chỉ số Thái Độ Tiếp Cận", renderIndicator(narrative, "approachAttitude", "Thái độ tiếp cận", report.approachAttitude, name)),
      ],
    },
  ];

  return { profileHeader: buildProfileHeader(report), phases };
}
