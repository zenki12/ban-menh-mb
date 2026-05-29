import type { NarrativeKb } from "../schemas/numerology-kb";
import type { IndicatorResult, NumerologyReport, PeriodIndicatorResult } from "./report";

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

const PERSONAL_YEAR_DOMAINS: Record<number, (name: string, year: string, age: string) => Record<string, string>> = {
  /*
   * V1 literal port coverage map.
   * buildYearDomainBlock renders 9 personal-year numbers.
   * Each year keeps the same 6 domain order from V1:
   * 01. Tình yêu
   * 02. Sự nghiệp
   * 03. Tài chính
   * 04. Giao tiếp xã hội
   * 05. Học tập
   * 06. Hôn nhân
   * Year 1 coverage:
   * - Tình yêu
   * - Sự nghiệp
   * - Tài chính
   * - Giao tiếp xã hội
   * - Học tập
   * - Hôn nhân
   * Year 2 coverage:
   * - Tình yêu
   * - Sự nghiệp
   * - Tài chính
   * - Giao tiếp xã hội
   * - Học tập
   * - Hôn nhân
   * Year 3 coverage:
   * - Tình yêu
   * - Sự nghiệp
   * - Tài chính
   * - Giao tiếp xã hội
   * - Học tập
   * - Hôn nhân
   * Year 4 coverage:
   * - Tình yêu
   * - Sự nghiệp
   * - Tài chính
   * - Giao tiếp xã hội
   * - Học tập
   * - Hôn nhân
   * Year 5 coverage:
   * - Tình yêu
   * - Sự nghiệp
   * - Tài chính
   * - Giao tiếp xã hội
   * - Học tập
   * - Hôn nhân
   * Year 6 coverage:
   * - Tình yêu
   * - Sự nghiệp
   * - Tài chính
   * - Giao tiếp xã hội
   * - Học tập
   * - Hôn nhân
   * Year 7 coverage:
   * - Tình yêu
   * - Sự nghiệp
   * - Tài chính
   * - Giao tiếp xã hội
   * - Học tập
   * - Hôn nhân
   * Year 8 coverage:
   * - Tình yêu
   * - Sự nghiệp
   * - Tài chính
   * - Giao tiếp xã hội
   * - Học tập
   * - Hôn nhân
   * Year 9 coverage:
   * - Tình yêu
   * - Sự nghiệp
   * - Tài chính
   * - Giao tiếp xã hội
   * - Học tập
   * - Hôn nhân
   */
    1: (safeName, safeYear, safeAge) => ({
      tinhYeu: `<p class="nar">Trong năm Vận số 1, tình yêu của <strong>${safeName}</strong> bước vào một chương mới đầy khai phóng. Nếu bạn đang độc thân, đây là năm năng lượng cá nhân của bạn tỏa sáng mạnh mẽ nhất — sức hút tự nhiên và sự tự tin được khuếch đại, khiến bạn trở nên thu hút hơn trong mắt người khác một cách chân thực. Tuy nhiên, những mối tình bắt đầu trong năm số 1 thường có khởi đầu mạnh mẽ, đòi hỏi bạn phải thực sự sẵn sàng để gắn kết — không chỉ vì cảm xúc nhất thời.</p>
<p class="nar">Tuy nhiên, ảnh hưởng của Vận số 1 cũng có thể khiến bạn trở nên cứng nhắc hơn trong tình yêu — xu hướng muốn dẫn dắt và kiểm soát có thể tạo ra ma sát với người bạn đời. Hãy nhớ: tình yêu là sự cộng hưởng, không phải cuộc thi. Buông bỏ cái tôi trong tình cảm sẽ là bài học lớn nhất năm này.</p>`,

      suNghiep: `<p class="nar">Sự nghiệp của <strong>${safeName}</strong> trong năm Vận số 1 như được thổi một luồng gió mới: đây là thời điểm lý tưởng để bắt đầu dự án mới, nộp đơn vào vị trí mơ ước, hoặc thực hiện những thay đổi lớn mà bạn đã ấp ủ từ lâu. Vũ trụ đang hỗ trợ những ai dám hành động táo bạo và tự định hướng.</p>
<p class="nar">Làm tốt đầu chắc chắn tô đậm nền tảng để bạn tiến xa hơn. Năng lượng số 1 cũng giúp bạn có tư duy độc lập hơn, sẵn lòng hơn để đưa ra các quyết định lớn mà không cần phải chờ xin ý kiến. Nếu bạn đang nghĩ đến việc khởi nghiệp hay làm việc tự do, đây là năm thích hợp nhất để đặt nền móng đầu tiên.</p>
<p class="nar">Tuy nhiên, chính sự tự cao quá mức của số 1 khó có khả năng làm bạn bỏ lỡ các cơ hội hợp tác có giá trị. Hãy bảo đảm là bạn luôn cởi mở với những đề xuất và ý kiến từ đồng nghiệp, đừng để cái tôi che khuất những điểm mù chiến lược.</p>`,

      taiChinh: `<p class="nar">Học cách làm chủ tài chính từ những điều cơ bản: Vận số 1 mang đến cho <strong>${safeName}</strong> cảm giác tự lực và độc lập về tài chính rất rõ ràng. Bạn sẽ bắt đầu nhìn nhận lại cách mình kiếm tiền, tiêu tiền và tích lũy. Đây là thời điểm tốt để tái cơ cấu lại thu nhập — tìm kiếm nguồn thu mới, lên kế hoạch tiết kiệm khoa học hơn.</p>
<p class="nar">Tuy nhiên, hãy đề phòng xu hướng chi tiêu đột ngột hoặc đưa ra các quyết định đầu tư quá vội vàng. Năng lượng số 1 đôi khi tạo ra cảm giác "mình có thể làm được tất cả" — điều đó tốt cho tinh thần nhưng có thể dẫn đến rủi ro tài chính nếu không có kế hoạch cụ thể. Hãy kết hợp chính sách táo bạo của số 1 với sự thận trọng có chủ đích để thu về kết quả bền vững.</p>`,

      giaoTiepXaHoi: `<p class="nar">Trong năm Vận số 1, <strong>${safeName}</strong> mang năng lượng mới cách giao tiếp với người khác — năng động hơn, thẳng thắn hơn, và tự tin hơn đứng trước đám đông. Đây là năm bạn nên tập trung vào xây dựng thương hiệu cá nhân, vì người xung quanh dễ bị thu hút bởi sự rõ ràng và mạnh mẽ trong cách bạn thể hiện bản thân.</p>
<p class="nar">Tuy nhiên, ảnh hưởng của Vận số 1 đôi khi khiến bạn trở nên kém kiên nhẫn hoặc cắt đứt quan hệ quá nhanh khi cảm thấy ai đó không theo kịp nhịp độ của mình. Hãy cẩn thận: những mối quan hệ quan trọng cần được đầu tư và duy trì, không phải bị bỏ qua chỉ vì bạn đang bận tập trung vào bản thân. Giao tiếp trong năm này đạt hiệu quả cao nhất khi bạn kết hợp được sự quyết đoán với sự lắng nghe.</p>`,

      hocTap: `<p class="nar">Học tập, nâng cấp bản thân trong năm Vận số 1 rất thuận lợi vì năng lượng số 1 thúc đẩy <strong>${safeName}</strong> hướng về phía trước và tìm kiếm những kiến thức, kỹ năng mới. Đây là lúc bạn có thể học một cách nhanh nhất và hiệu quả nhất — đặc biệt là những lĩnh vực liên quan đến lãnh đạo, khởi nghiệp, hay bất cứ điều gì giúp bạn trở nên độc lập và tự chủ hơn.</p>
<p class="nar">Hãy dũng cảm đăng ký những khóa học hay chương trình đào tạo mà bạn đã ngại ngùng từ trước đến nay. Năng lượng "mới mẻ - khởi đầu" của số 1 giúp bạn tiếp thu nhanh và hứng khởi với những điều chưa biết. Đặc biệt, những kỹ năng học trong năm 1 có xu hướng gắn bó với bạn rất lâu dài, vì chúng được học từ chính động lực nội tâm chứ không phải áp lực bên ngoài.</p>`,

      honNhan: `<p class="nar">Hôn nhân là chuyện nghiêm túc nên xảy ra tự nhiên — với <strong>${safeName}</strong> trong năm Vận số 1, nếu bạn đang trong mối quan hệ lâu dài, đây có thể là năm bạn và người bạn đời cần xác định lại các vai trò và ranh giới trong cuộc sống chung. Vận số 1 mang đến cảm giác cần khẳng định sự độc lập — điều này có thể tạo ra va chạm nếu cả hai không giao tiếp cởi mở.</p>
<p class="nar">Nếu bạn đang đứng trước quyết định kết hôn, hãy thật sự hỏi bản thân: "Tôi muốn điều này vì chính mình, hay vì kỳ vọng của người khác?" Năm số 1 chỉ ủng hộ những quyết định xuất phát từ nội lực thực sự, không phải từ ảnh hưởng bên ngoài. Những cuộc hôn nhân bắt đầu trong năm Vận số 1 có tiềm năng rất lớn nếu cả hai đều độc lập, tự chủ và chọn nhau từ sự mạnh mẽ — không phải từ nhu cầu.</p>`,
    }),

    2: (safeName, safeYear, safeAge) => ({
      tinhYeu: `<p class="nar">Trong năm Vận số 2, tình yêu cần nên móng vững chắc mỗi lâu bền. Với <strong>${safeName}</strong>, đây là một năm chuyên biệt cho sự kết nối sâu sắc và chữa lành trong tình yêu. Bạn mang đến năng lượng số 2 nhạy cảm, kiên nhẫn và chú tâm — tạo ra môi trường an toàn để tình yêu nảy nở một cách chân thực và bền vững. Nếu bạn đang trong một mối quan hệ, đây là thời điểm lý tưởng để xây dựng sự thấu hiểu lẫn nhau ở tầng sâu hơn — những cuộc trò chuyện thật sự, những khoảnh khắc chia sẻ không cần màu mè.</p>
<p class="nar">Tuy nhiên, ảnh hưởng của Vận số 2 cũng có thể khiến bạn trở nên quá nhạy cảm trong tình yêu, dễ bị tổn thương bởi những lời nói không cân nhắc của người bạn đời. Bạn cũng có xu hướng hi sinh quá nhiều cho đối phương đến mức quên đi nhu cầu của bản thân. Hãy nhớ: sự cân bằng trong tình yêu không phải là cho đi tất cả — mà là cùng nhau lớn lên với mức độ ngang nhau, bề trên và bề dưới.</p>`,

      suNghiep: `<p class="nar">Làm tốt đầu chắc chắn tô đậm nền tảng để bạn tiến xa hơn. Sự nghiệp của <strong>${safeName}</strong> trong năm Vận số 2 sẽ tiến triển theo hướng ổn định và bền bỉ, không rực rỡ nhưng chắc chắn. Đây là năm của sự hợp tác và xây dựng mối quan hệ chuyên nghiệp — những liên minh, đối tác hay nhóm làm việc mạnh mẽ được tạo ra trong năm số 2 có xu hướng lâu dài và sinh quả tốt.</p>
<p class="nar">Nếu bạn đang trong giai đoạn cần đàm phán hay thuyết phục, đây là thời điểm thuận lợi — vì năng lượng số 2 tạo ra khả năng ngoại giao và cảm nhận người khác vượt trội. Hãy dùng khả năng lắng nghe tinh tế của mình để hiểu điều người khác thực sự cần, và bạn sẽ tạo ra những thỏa thuận mà cả hai bên đều cảm thấy thắng. Tuy nhiên, hãy tránh để người khác lợi dụng sự mềm mỏng của bạn — cần kiên quyết với ranh giới chuyên nghiệp.</p>`,

      taiChinh: `<p class="nar">Về tài chính trong năm Vận số 2, <strong>${safeName}</strong> cần xây dựng sự an toàn hơn là tìm kiếm tăng trưởng đột biến. Đây không phải năm để đầu tư mạo hiểm hay đặt cược lớn — mà là năm để kiểm tra lại ngân sách cá nhân, tiết kiệm đều đặn và tạo ra sự ổn định tài chính làm nền tảng cho những năm sau. Những quyết định tài chính khôn ngoan nhất trong năm này thường đến từ sự kiên nhẫn và thận trọng.</p>
<p class="nar">Hãy đặc biệt chú ý đến tài chính chung trong các mối quan hệ — nếu bạn đang sống chung hay có kế hoạch tài chính với người khác, hãy đảm bảo mọi thứ được giao tiếp rõ ràng và công bằng. Năm số 2 có năng lượng hỗ trợ việc xây dựng quỹ dự phòng và lập kế hoạch tiết kiệm dài hạn hiệu quả.</p>`,

      giaoTiepXaHoi: `<p class="nar">Trong năm Vận số 2, <strong>${safeName}</strong> mang năng lượng mới nhạy cảm và đồng cảm vào các mối quan hệ xã hội. Đây là năm bạn trở thành người mà mọi người muốn tâm sự — vì bạn biết lắng nghe thật sự và phản hồi bằng sự hiểu biết thay vì chỉ đưa ra lời khuyên. Đây là năm tốt để xây dựng và củng cố những mối quan hệ có chiều sâu, thay vì mở rộng mạng lưới xã hội rộng rãi.</p>
<p class="nar">Những sự kiện giao lưu ồn ào hay đám đông lớn có thể làm bạn mệt mỏi hơn thường lệ trong năm này — hãy ưu tiên chất lượng gặp gỡ hơn số lượng. Một buổi chiều cà phê sâu sắc với một người bạn tri kỷ sẽ nạp năng lượng cho bạn nhiều hơn một buổi tiệc đông đúc.</p>`,

      hocTap: `<p class="nar">Học tập và nâng cấp kiến thức trong năm Vận số 2 thiên về chiều sâu hơn chiều rộng với <strong>${safeName}</strong>. Đây là năm tốt để học những kỹ năng đòi hỏi sự kiên nhẫn, tinh tế và chú tâm — như ngôn ngữ mới, thiền định, tâm lý học, hay những nghệ thuật đòi hỏi luyện tập bền bỉ. Bạn sẽ thấy mình tiếp thu tốt nhất khi học trong môi trường yên tĩnh và có người hướng dẫn cụ thể.</p>
<p class="nar">Hợp tác học tập cũng rất hiệu quả trong năm số 2 — study group, cặp học cùng nhau, hay tìm mentor đều mang lại kết quả vượt trội so với học một mình. Hãy tận dụng điều này để tiến bộ nhanh hơn trong những lĩnh vực bạn muốn phát triển.</p>`,

      honNhan: `<p class="nar">Hôn nhân là chuyện nghiêm túc nên xảy ra tự nhiên — trong năm Vận số 2, <strong>${safeName}</strong> có xu hướng tiếp cận hôn nhân với sự chín chắn và đánh giá thực tế hơn. Đây là năm tốt để xây dựng sự hiểu biết sâu sắc hơn với người bạn đời, tạo ra các thói quen và truyền thống chung, và giải quyết những vấn đề tích lũy từ trước bằng cách giao tiếp cởi mở.</p>
<p class="nar">Nếu đang cân nhắc kết hôn, năm Vận số 2 ủng hộ những quyết định xuất phát từ tình yêu thực sự và sự hiểu biết lẫn nhau sâu sắc. Những cuộc hôn nhân bền chặt thường được đặt nền móng bởi sự tôn trọng, tin tưởng và chấp nhận — những giá trị mà năng lượng số 2 nuôi dưỡng tốt nhất.</p>`,
    }),

    3: (safeName, safeYear, safeAge) => ({
      tinhYeu: `<p class="nar">Trong năm Vận số 3, tình yêu của <strong>${safeName}</strong> trở nên nhẹ nhàng, vui tươi và đầy sức sống. Đây là năm những cuộc tình mới nảy sinh từ những kết nối bất ngờ — trong các buổi giao lưu, qua sự sáng tạo chung, hay đơn giản là qua một cuộc trò chuyện thú vị. Năng lượng số 3 làm cho bạn trở nên hấp dẫn tự nhiên — tiếng cười, sự duyên dáng và khả năng kể chuyện của bạn là những nam châm thu hút mạnh mẽ.</p>
<p class="nar">Tuy nhiên, năng lượng số 3 cũng có thể khiến bạn phân tâm hoặc không đủ kiên nhẫn để xây dựng chiều sâu trong một mối quan hệ dài hạn. Bạn cần chú ý không để sự vui vẻ bề mặt che khuất những cuộc trò chuyện thực sự quan trọng. Nếu đang trong một mối quan hệ, hãy dùng năng lượng sáng tạo của năm này để đưa sự mới mẻ và thú vị vào cuộc sống chung — không phải để chạy trốn khỏi độ sâu.</p>`,

      suNghiep: `<p class="nar">Sự nghiệp của <strong>${safeName}</strong> trong năm Vận số 3 thăng hoa theo hướng sáng tạo và biểu đạt. Những vai trò đòi hỏi giao tiếp, trình bày, dạy học, marketing, viết lách hay bất kỳ hình thức biểu đạt nào đều có điều kiện phát triển vượt bậc trong năm này. Đây cũng là năm tốt để xây dựng thương hiệu cá nhân — hãy chia sẻ quan điểm, kiến thức và sự sáng tạo của bạn ra thế giới nhiều hơn.</p>
<p class="nar">Nếu bạn đang làm việc trong lĩnh vực đòi hỏi sự lặp lại và quy trình cứng nhắc, năm này có thể khiến bạn cảm thấy ngột ngạt. Hãy tìm cách đưa sự sáng tạo vào công việc hiện tại — dù nhỏ nhoi — để duy trì cảm hứng và hiệu suất. Năng lượng số 3 hoạt động tốt nhất khi có không gian để linh hoạt và thử nghiệm.</p>`,

      taiChinh: `<p class="nar">Tài chính trong năm Vận số 3 cần được <strong>${safeName}</strong> quản lý cẩn thận, vì đây là thời điểm dễ chi tiêu theo cảm xúc và sống cho hiện tại hơn tương lai. Bạn sẽ có xu hướng chi cho những trải nghiệm — du lịch, ẩm thực, nghệ thuật, giải trí — và điều đó không sai, nhưng hãy đảm bảo không vượt ngân sách. Đặt ra giới hạn chi tiêu cho "niềm vui" và tuân thủ nó.</p>
<p class="nar">Mặt khác, năng lượng số 3 cũng mang đến những cơ hội thu nhập từ sự sáng tạo hoặc tài năng biểu đạt của bạn. Nếu bạn có một kỹ năng sáng tạo, đây có thể là năm bạn biến nó thành nguồn thu nhập phụ. Hãy cân bằng giữa việc tận hưởng và tiết kiệm để không bắt đầu năm tiếp theo với gánh nặng tài chính không cần thiết.</p>`,

      giaoTiepXaHoi: `<p class="nar">Đây là khóa chìa của năm Vận số 3 với <strong>${safeName}</strong>: giao tiếp xã hội và mở rộng kết nối. Bạn sẽ gặp gỡ những người thú vị, tham gia những cuộc trò chuyện truyền cảm hứng và xây dựng mạng lưới quan hệ rộng hơn bao giờ hết. Đây là năm tốt nhất để tham gia các cộng đồng, nhóm sáng tạo, hay bất kỳ không gian nào tập hợp những người cùng chí hướng.</p>
<p class="nar">Sự duyên dáng tự nhiên và khả năng làm cho người khác cảm thấy thoải mái của bạn đạt đỉnh trong năm này. Hãy tận dụng điều đó để xây dựng những mối liên kết không chỉ ngắn hạn mà có thể trở thành những mối quan hệ đáng giá lâu dài. Tuy nhiên, hãy tránh phân tán quá mỏng — có quá nhiều kết nối bề mặt cũng không tốt bằng một số ít mối quan hệ thực sự sâu sắc.</p>`,

      hocTap: `<p class="nar">Năm Vận số 3 là một trong những năm học tập tốt nhất cho <strong>${safeName}</strong> — đặc biệt trong các lĩnh vực liên quan đến sáng tạo, nghệ thuật, ngôn ngữ, giao tiếp và biểu đạt. Bạn sẽ tiếp thu kiến thức nhanh hơn thường lệ và cảm thấy hứng khởi với những chủ đề mới. Đây là năm tốt để thử học những thứ mà trước đây bạn nghĩ mình không giỏi — vì năng lượng số 3 mở ra sự tự tin và sẵn lòng thử nghiệm.</p>
<p class="nar">Môi trường học tập tốt nhất trong năm này là những nơi được phép tương tác, thảo luận và thể hiện ý kiến cá nhân. Học thuộc vẹt hay học theo khuôn mẫu cứng nhắc sẽ không hiệu quả trong năm Vận số 3 — hãy tìm kiếm những phương pháp học sáng tạo và năng động hơn để phát huy tối đa tiềm năng của mình.</p>`,

      honNhan: `<p class="nar">Trong năm Vận số 3, hôn nhân của <strong>${safeName}</strong> cần được nuôi dưỡng bằng sự vui tươi, hài hước và những trải nghiệm chung mới mẻ. Đây là năm tốt để đưa sự sáng tạo vào cuộc sống gia đình — lên kế hoạch những chuyến đi, những buổi tối đặc biệt, hay đơn giản là cùng nhau thử những điều mới. Năng lượng số 3 nuôi dưỡng tình yêu qua sự kết nối nhẹ nhàng và niềm vui chia sẻ.</p>
<p class="nar">Tuy nhiên, hãy chú ý không để sự vui vẻ bên ngoài che khuất những vấn đề thực sự cần được giải quyết trong hôn nhân. Nếu có những mâu thuẫn tích lũy từ trước, năm số 3 không phải lúc để chạy trốn bằng sự bận rộn hay ồn ào — mà là lúc để giao tiếp cởi mở và sáng tạo trong cách tiếp cận vấn đề.</p>`,
    }),

    4: (safeName, safeYear, safeAge) => ({
      tinhYeu: `<p class="nar">Trong năm Vận số 4, tình yêu của <strong>${safeName}</strong> cần nền tảng vững chắc và sự cam kết thực sự. Đây không phải năm của những cuộc tình lãng mạn bốc đồng — mà là năm xây dựng sự tin tưởng, thiết lập các thói quen chung và tạo ra nền tảng vật chất cũng như tinh thần cho một mối quan hệ bền lâu. Nếu bạn đang trong một mối quan hệ, đây là thời điểm để cả hai cùng ngồi xuống và bàn về tương lai một cách cụ thể.</p>
<p class="nar">Tuy nhiên, ảnh hưởng của Vận số 4 có thể khiến bạn quá tập trung vào công việc và xây dựng vật chất đến mức bỏ bê tình cảm. Hãy đảm bảo dành thời gian chất lượng cho người bạn đời — không chỉ chia sẻ kế hoạch hay to-do list, mà là hiện diện thực sự với nhau trong những khoảnh khắc đơn giản của cuộc sống hàng ngày.</p>`,

      suNghiep: `<p class="nar">Sự nghiệp của <strong>${safeName}</strong> trong năm Vận số 4 là thời kỳ xây dựng nền tảng vững chắc — kiên nhẫn, có kỷ luật và đặt mục tiêu dài hạn. Đây là năm để hoàn thiện kỹ năng, tạo ra hệ thống làm việc hiệu quả và xây dựng uy tín chuyên môn thông qua từng hành động nhất quán. Những dự án dài hơi được bắt đầu hoặc tiếp tục trong năm số 4 có nền tảng vững chắc nhất.</p>
<p class="nar">Dù không phải năm của những bước nhảy vọt kịch tính, nhưng những gì bạn xây dựng trong năm Vận số 4 sẽ là nền tảng cho sự phát triển mạnh mẽ hơn ở những năm tiếp theo. Hãy kiên nhẫn với quá trình, tránh bỏ cuộc giữa chừng khi thấy kết quả chưa được như kỳ vọng — sự bền bỉ chính là chìa khóa vàng của năm này.</p>`,

      taiChinh: `<p class="nar">Đây là năm tài chính thuận lợi nhất cho việc lập kế hoạch và tiết kiệm của <strong>${safeName}</strong>. Vận số 4 mang đến kỷ luật tài chính tự nhiên — bạn sẽ dễ dàng hơn trong việc theo dõi chi tiêu, lập ngân sách và từ chối những cám dỗ tài chính không cần thiết. Đây là thời điểm tốt để lập quỹ khẩn cấp, trả nợ có kế hoạch, hay bắt đầu một hình thức tiết kiệm dài hạn.</p>
<p class="nar">Tránh các khoản đầu tư mang tính đầu cơ hay rủi ro cao trong năm này — năng lượng số 4 ủng hộ sự ổn định và bảo toàn vốn hơn là tăng trưởng nhanh. Bất động sản, tiết kiệm an toàn hay các khoản đầu tư dài hạn có thể là lựa chọn phù hợp hơn so với cổ phiếu ngắn hạn hay các cơ hội kinh doanh chưa được kiểm chứng.</p>`,

      giaoTiepXaHoi: `<p class="nar">Trong năm Vận số 4, <strong>${safeName}</strong> có xu hướng thu hẹp vòng xã hội và tập trung vào những mối quan hệ có giá trị thực sự. Đây không phải dấu hiệu tiêu cực — mà là sự thay đổi ưu tiên có chủ đích. Bạn sẽ ít muốn tham gia những buổi giao lưu ồn ào và thích hơn những cuộc trò chuyện có chiều sâu với số ít người tin cậy.</p>
<p class="nar">Đây là năm tốt để củng cố các mối quan hệ lâu dài quan trọng — bạn bè thân thiết, gia đình và những người cộng sự mà bạn thực sự coi trọng. Đầu tư thời gian và tâm huyết vào những mối quan hệ này sẽ mang lại sự ổn định tinh thần và mạng lưới hỗ trợ vững chắc hơn trong những năm tới.</p>`,

      hocTap: `<p class="nar">Học tập trong năm Vận số 4 phù hợp nhất cho những chương trình dài hạn và đòi hỏi sự kiên nhẫn với <strong>${safeName}</strong>. Đây là năm bạn có thể học những kỹ năng phức tạp và kỹ thuật mà thường đòi hỏi nhiều tháng luyện tập. Năng lượng số 4 giúp bạn duy trì kỷ luật học tập đều đặn và không bỏ cuộc khi gặp khó khăn.</p>
<p class="nar">Lập kế hoạch học tập cụ thể với lịch trình rõ ràng sẽ rất hiệu quả trong năm này. Học từng bước nhỏ mỗi ngày và theo dõi tiến trình sẽ giúp bạn tiến bộ hơn là học dồn hay học theo cảm hứng. Những kiến thức và kỹ năng học trong năm Vận số 4 thường trở thành nền tảng chuyên môn vững chắc nhất của bạn.</p>`,

      honNhan: `<p class="nar">Năm Vận số 4 là một trong những năm tốt nhất để <strong>${safeName}</strong> đặt nền tảng cho hôn nhân bền vững. Năng lượng số 4 ủng hộ sự cam kết, trách nhiệm và xây dựng cuộc sống chung một cách thực tế và bền chắc. Đây là thời điểm lý tưởng để lập kế hoạch gia đình dài hạn — về tài chính, nơi ở, con cái và những mục tiêu cuộc sống chung.</p>
<p class="nar">Trong hôn nhân đang có, năm số 4 là cơ hội để giải quyết những vấn đề thực tế đang tồn đọng, thiết lập các thói quen gia đình lành mạnh và xây dựng sự tin tưởng ở tầng sâu hơn thông qua những hành động nhất quán mỗi ngày. Hãy nhớ: hôn nhân bền chặt không được xây bằng những khoảnh khắc hào nhoáng — mà bằng những cam kết nhỏ được thực hiện đều đặn.</p>`,
    }),

    5: (safeName, safeYear, safeAge) => ({
      tinhYeu: `<p class="nar">Trong năm Vận số 5, tình yêu của <strong>${safeName}</strong> đầy biến động và những bất ngờ thú vị. Đây có thể là năm những mối tình nảy sinh từ những hoàn cảnh không ai tiên liệu — trong chuyến đi, tại một sự kiện bất ngờ, hay qua một người quen giới thiệu. Năng lượng số 5 mang đến sức hút mạnh mẽ và tự do trong tình yêu — bạn không muốn bị ràng buộc bởi những kỳ vọng cứng nhắc.</p>
<p class="nar">Tuy nhiên, đây cũng là năm dễ mắc phải những quyết định tình cảm bốc đồng hoặc rời bỏ những mối quan hệ tốt đẹp chỉ vì cảm giác "thiếu hứng khởi". Hãy phân biệt giữa nhu cầu thực sự và sự chán chường nhất thời. Nếu đang trong một mối quan hệ bền vững, hãy đưa sự mới mẻ và phiêu lưu vào cuộc sống chung thay vì tìm kiếm điều đó bên ngoài.</p>`,

      suNghiep: `<p class="nar">Sự nghiệp của <strong>${safeName}</strong> trong năm Vận số 5 sẽ có những bước ngoặt bất ngờ và cơ hội mới xuất hiện từ những hướng không ngờ tới. Đây là năm bạn nên giữ sự linh hoạt và mở trong kế hoạch nghề nghiệp — cơ hội tốt nhất thường đến khi bạn ít mong đợi nhất. Những thay đổi công việc, chuyển ngành hay nhận một dự án hoàn toàn mới đều có thể xảy ra trong năm này.</p>
<p class="nar">Hãy tin vào khả năng thích nghi của mình và không để nỗi sợ thay đổi cản bước. Đồng thời, hãy thực tế: đừng nhảy từ cơ hội này sang cơ hội khác quá nhanh mà không đánh giá kỹ. Năm Vận số 5 ủng hộ sự thay đổi có chủ đích — không phải sự bất ổn không có mục đích. Những ai giữ được sự linh hoạt mà không mất đi phương hướng sẽ tận dụng tối đa năng lượng của năm này.</p>`,

      taiChinh: `<p class="nar">Tài chính trong năm Vận số 5 cần được <strong>${safeName}</strong> quản lý cẩn thận, vì đây là thời điểm dễ chi tiêu không có kế hoạch nhất. Những chuyến đi, những trải nghiệm mới và những cơ hội bất ngờ đều kéo theo chi phí không dự tính. Hãy lập quỹ "linh hoạt" để sẵn sàng cho những khoản chi ngoài kế hoạch mà không làm mất ổn định tài chính tổng thể.</p>
<p class="nar">Có thể xuất hiện những cơ hội tài chính bất ngờ trong năm này — hãy đánh giá chúng cẩn thận trước khi quyết định. Năng lượng số 5 mang đến may mắn bất ngờ nhưng cũng mang đến rủi ro không lường trước. Đầu tư vào những cơ hội ngắn hạn và linh hoạt phù hợp hơn so với các cam kết tài chính dài hạn trong năm Vận số 5.</p>`,

      giaoTiepXaHoi: `<p class="nar">Đây là một trong những năm sôi động nhất về mặt xã hội của <strong>${safeName}</strong>. Với năng lượng Vận số 5, bạn sẽ gặp gỡ nhiều người từ những nền văn hóa, lĩnh vực và quan điểm khác nhau — mỗi cuộc gặp gỡ đều là một cơ hội học hỏi và mở rộng tầm nhìn. Đây là năm tốt để tham gia các sự kiện quốc tế, cộng đồng đa dạng hay những không gian bạn chưa từng đặt chân vào.</p>
<p class="nar">Mạng lưới quan hệ của bạn sẽ được mở rộng đáng kể trong năm này, nhưng hãy chú ý giữ lại những kết nối thực sự có giá trị thay vì chỉ tích lũy số lượng. Năng lượng số 5 dễ tạo ra nhiều quen biết bề mặt — hãy chủ động đào sâu vào những mối quan hệ có tiềm năng trở thành tình bạn hoặc liên minh thực sự.</p>`,

      hocTap: `<p class="nar">Học tập trong năm Vận số 5 thiên về trải nghiệm thực tế hơn lý thuyết sách vở với <strong>${safeName}</strong>. Đây là năm tuyệt vời để học qua du lịch, tìm hiểu văn hóa mới, thực tập ở môi trường khác, hay tham gia các chương trình đào tạo ngắn hạn có tính ứng dụng cao. Bạn sẽ tiếp thu nhanh nhất khi được làm thực tế và tương tác với thế giới thực.</p>
<p class="nar">Những khóa học trực tuyến ngắn, workshop thực hành hay chương trình mentoring 1-1 sẽ hiệu quả hơn các khóa học dài hạn theo khuôn mẫu cứng nhắc trong năm này. Hãy để sự tò mò tự nhiên dẫn dắt quá trình học của bạn — đừng ép mình học những thứ không thực sự hứng thú, vì năng lượng số 5 cần động lực nội tại mới phát huy tối đa.</p>`,

      honNhan: `<p class="nar">Hôn nhân trong năm Vận số 5 cần sự khéo léo để duy trì cân bằng giữa tự do cá nhân và cam kết với <strong>${safeName}</strong>. Năng lượng số 5 mang đến khát vọng tự do và không gian cá nhân mạnh mẽ — điều này có thể tạo ra căng thẳng trong các mối quan hệ đòi hỏi sự gắn kết chặt chẽ. Hãy giao tiếp thẳng thắn với người bạn đời về nhu cầu không gian cá nhân của mình thay vì rút lui im lặng.</p>
<p class="nar">Ngược lại, nếu cả hai cùng đón nhận năng lượng phiêu lưu của năm số 5, hôn nhân có thể trở nên sống động và thú vị hơn bao giờ hết. Hãy lên kế hoạch những chuyến đi cùng nhau, thử những trải nghiệm mới và tạo ra những kỷ niệm đặc biệt — điều đó nuôi dưỡng tình yêu theo cách mà không năm nào khác có thể làm được như năm số 5.</p>`,
    }),

    6: (safeName, safeYear, safeAge) => ({
      tinhYeu: `<p class="nar">Trong năm Vận số 6, tình yêu của <strong>${safeName}</strong> sâu sắc, ấm áp và hướng về sự cam kết bền vững. Đây là năm của những mối tình nghiêm túc — nơi hai người thực sự đầu tư vào nhau, xây dựng sự tin tưởng và tạo ra không gian yêu thương an toàn. Nếu bạn đang tìm kiếm tình yêu, những người xuất hiện trong năm số 6 thường có giá trị bền lâu và chân thực hơn những gặp gỡ thoáng qua.</p>
<p class="nar">Tuy nhiên, năng lượng số 6 có thể khiến bạn đặt tiêu chuẩn quá cao và thất vọng khi đối phương không hoàn hảo như kỳ vọng. Hãy yêu thương từ góc nhìn chấp nhận thực tế — người bạn đời không cần phải hoàn hảo, họ chỉ cần thực sự phù hợp với bạn và cùng nhau trưởng thành. Sự tha thứ và chấp nhận là những phẩm chất cần rèn trong năm Vận số 6.</p>`,

      suNghiep: `<p class="nar">Sự nghiệp của <strong>${safeName}</strong> trong năm Vận số 6 thăng hoa trong những lĩnh vực liên quan đến phục vụ, chăm sóc và đóng góp cho cộng đồng. Nếu bạn làm việc trong y tế, giáo dục, tư vấn, dịch vụ khách hàng hay bất kỳ ngành nào liên quan đến giúp đỡ người khác — đây là năm bạn sẽ tỏa sáng rực rỡ nhất. Khả năng cảm nhận nhu cầu của người khác và đáp ứng đúng lúc là thế mạnh đặc biệt trong năm này.</p>
<p class="nar">Đây cũng là năm tốt để nhận các vai trò lãnh đạo mang tính mentoring — huấn luyện, dẫn dắt hay phát triển đội nhóm. Tuy nhiên, hãy chú ý không để tinh thần "phục vụ" biến thành gánh nặng quá tải — học cách ủy quyền và nói không khi cần thiết để duy trì hiệu suất bền vững trong suốt năm.</p>`,

      taiChinh: `<p class="nar">Tài chính trong năm Vận số 6 có xu hướng ổn định và dần được cải thiện — nhưng <strong>${safeName}</strong> cần chú ý đến chi tiêu cho gia đình và người thân. Bạn sẽ có nhiều hơn nhu cầu chi cho những điều liên quan đến tổ ấm — trang trí, nội thất, sửa chữa nhà cửa, hay chi tiêu cho sức khỏe và hạnh phúc của gia đình. Đây là những khoản chi có giá trị và xứng đáng, nhưng hãy có kế hoạch rõ ràng.</p>
<p class="nar">Năm Vận số 6 cũng là thời điểm tốt để đánh giá lại các khoản bảo hiểm, quỹ dự phòng và những hệ thống tài chính liên quan đến an toàn gia đình. Đầu tư vào sức khỏe, giáo dục và những thứ tạo ra chất lượng cuộc sống thực sự sẽ mang lại lợi nhuận lớn hơn trong dài hạn so với những khoản đầu tư tài chính thuần túy.</p>`,

      giaoTiepXaHoi: `<p class="nar">Năm Vận số 6 là năm <strong>${safeName}</strong> trở thành trung tâm kết nối và hỗ trợ trong mạng lưới xã hội của mình. Bạn sẽ tự nhiên đảm nhận vai trò người tổ chức, người hòa giải hay người giữ cho nhóm gắn kết. Những người xung quanh tìm đến bạn để nhờ lời khuyên, sự hỗ trợ hay đơn giản là sự hiện diện ấm áp của bạn.</p>
<p class="nar">Đây là năm tốt để đầu tư vào các mối quan hệ gia đình và bạn bè thân thiết — đặc biệt là những mối quan hệ có thể đã bị bỏ bê do bận rộn. Một cuộc gặp gỡ, một cú điện thoại hay một bữa ăn gia đình có thể tạo ra những kết nối sâu sắc và bền vững hơn bất kỳ sự kiện networking nào khác trong năm Vận số 6.</p>`,

      hocTap: `<p class="nar">Học tập trong năm Vận số 6 hiệu quả nhất khi có mục đích phục vụ người khác với <strong>${safeName}</strong>. Những khóa học liên quan đến phát triển kỹ năng mềm, tâm lý học, tư vấn, chăm sóc sức khỏe hay giảng dạy đều phát huy tốt trong năm này. Bạn sẽ học nhanh nhất khi thấy rõ cách kiến thức đó có thể giúp ích cho người xung quanh.</p>
<p class="nar">Đây cũng là năm tốt để học những kỹ năng liên quan đến quản lý gia đình, tài chính cá nhân hay chăm sóc sức khỏe — những kiến thức thực tế và ứng dụng được immediately. Học theo nhóm nhỏ hoặc có người cùng học sẽ tạo động lực tốt hơn cho bạn, vì năng lượng số 6 thức dậy mạnh nhất trong môi trường kết nối và hỗ trợ lẫn nhau.</p>`,

      honNhan: `<p class="nar">Đây là một trong những năm tốt nhất cho hôn nhân của <strong>${safeName}</strong>. Năng lượng Vận số 6 nuôi dưỡng sự gắn kết gia đình, tình yêu thương vô điều kiện và cam kết lâu dài. Nếu bạn đang cân nhắc kết hôn, đây là thời điểm thuận lợi nhất — những cuộc hôn nhân bắt đầu trong năm số 6 thường có nền tảng ổn định và lâu bền.</p>
<p class="nar">Trong hôn nhân đang có, đây là năm để đầu tư sâu hơn vào chất lượng cuộc sống gia đình — tạo ra môi trường ấm áp, an toàn và đầy yêu thương cho tất cả thành viên. Hãy lên kế hoạch những hoạt động gia đình, tạo ra các truyền thống chung và dành thời gian chất lượng với người bạn đời. Hôn nhân bền vững không tự nhiên mà có — nó là kết quả của sự đầu tư có ý thức mỗi ngày.</p>`,
    }),

    7: (safeName, safeYear, safeAge) => ({
      tinhYeu: `<p class="nar">Trong năm Vận số 7, tình yêu của <strong>${safeName}</strong> chuyển vào chiều sâu nội tâm. Đây không phải năm của những cuộc tình sôi nổi và kịch tính — mà là năm bạn cần không gian để hiểu bản thân sâu hơn trước khi có thể thực sự kết nối với người khác. Nếu bạn đang độc thân, năm số 7 có thể mang đến những cuộc gặp gỡ ít hơn về số lượng nhưng sâu sắc hơn về chất lượng.</p>
<p class="nar">Trong các mối quan hệ đang có, năm Vận số 7 là cơ hội để đi đến chiều sâu thực sự trong tình yêu — những cuộc trò chuyện về triết học sống, về ý nghĩa cuộc đời, về những điều bạn thực sự muốn. Nếu người bạn đời không sẵn sàng hoặc không thể đáp lại ở tầng sâu đó, những khoảng cách có thể trở nên rõ ràng hơn trong năm này. Hãy sử dụng điều đó như thông tin thay vì nguồn gây đau khổ.</p>`,

      suNghiep: `<p class="nar">Sự nghiệp của <strong>${safeName}</strong> trong năm Vận số 7 thăng hoa qua con đường của sự tích lũy kiến thức và chuyên môn hóa. Đây là năm tốt nhất để nghiên cứu sâu, hoàn thiện kỹ năng đặc thù và trở thành chuyên gia thực sự trong lĩnh vực của mình. Những người tìm đến bạn sẽ tìm kiếm sự sâu sắc và hiểu biết — không phải sự hào nhoáng bề mặt.</p>
<p class="nar">Đây không phải năm để mở rộng ồ ạt hay ra mắt nhiều sản phẩm mới — mà là năm để hoàn thiện những gì đang có. Đầu tư vào việc nghiên cứu xu hướng ngành, học hỏi từ những chuyên gia giỏi nhất và xây dựng nền tảng kiến thức vững chắc sẽ tạo ra lợi thế cạnh tranh dài hạn mà bạn sẽ cảm ơn mình trong những năm tới.</p>`,

      taiChinh: `<p class="nar">Tài chính trong năm Vận số 7 không phải là ưu tiên hàng đầu của <strong>${safeName}</strong> — nhưng cần được quản lý thận trọng. Đây không phải năm của những bước tăng trưởng đột biến, mà là năm hiểu rõ hơn mối quan hệ của bạn với tiền bạc và giá trị thực sự. Hãy xem xét lại những khoản chi không cần thiết và tập trung vào những thứ thực sự có ý nghĩa.</p>
<p class="nar">Đầu tư vào giáo dục, sách vở hay các khóa học chuyên sâu là những khoản chi xứng đáng nhất trong năm số 7. Tránh những quyết định tài chính lớn và vội vàng — hãy tập trung vào việc tiết kiệm ổn định và bảo toàn những gì đang có. Năng lượng số 7 thường mang đến những hiểu biết sâu sắc về giá trị thực sự của tiền bạc — không phải là mục tiêu cuối cùng mà là phương tiện để tự do.</p>`,

      giaoTiepXaHoi: `<p class="nar">Trong năm Vận số 7, <strong>${safeName}</strong> sẽ tự nhiên rút lui khỏi những hoạt động xã hội ồn ào và tìm kiếm những không gian yên lặng hơn, những cuộc trò chuyện sâu sắc hơn. Đây không phải dấu hiệu tiêu cực — mà là nhu cầu tự nhiên của một năm tập trung vào nội tâm. Hãy cho phép bản thân có không gian để suy ngẫm mà không cảm thấy tội lỗi vì "không đủ xã hội".</p>
<p class="nar">Những người bạn đồng hành lý tưởng trong năm số 7 là những ai có thể ngồi cùng bạn trong im lặng có chiều sâu, không cần phải lấp đầy mọi khoảng trống bằng tiếng ồn. Tìm kiếm những cộng đồng có cùng chiều sâu tâm linh hay trí tuệ — những không gian đó sẽ nuôi dưỡng bạn theo cách mà không buổi tiệc xã giao thông thường nào có thể làm được.</p>`,

      hocTap: `<p class="nar">Đây là năm học tập lý tưởng nhất cho <strong>${safeName}</strong>. Năng lượng Vận số 7 mang đến khả năng tập trung, nghiên cứu sâu và thấu hiểu các chủ đề phức tạp mà những năm khác không có. Bạn sẽ có khả năng đọc, phân tích và tích lũy kiến thức với tốc độ và chiều sâu đáng kinh ngạc — hãy tận dụng tối đa điều này.</p>
<p class="nar">Đây là thời điểm lý tưởng để học những lĩnh vực đòi hỏi sự chiêm nghiệm và phân tích: triết học, khoa học, tâm lý học, tâm linh, lập trình hay bất kỳ chuyên ngành nào đòi hỏi tư duy hệ thống và sự chính xác. Học một mình hoặc với một người mentor trực tiếp sẽ hiệu quả hơn là học nhóm đông người trong năm số 7.</p>`,

      honNhan: `<p class="nar">Hôn nhân trong năm Vận số 7 của <strong>${safeName}</strong> cần nhiều không gian cá nhân hơn thường lệ. Bạn sẽ có nhu cầu mạnh mẽ hơn về thời gian một mình — để đọc sách, suy ngẫm, hay đơn giản là yên tĩnh. Người bạn đời cần hiểu rằng sự rút lui này không phải dấu hiệu của vấn đề trong mối quan hệ, mà là nhu cầu tâm linh thực sự.</p>
<p class="nar">Ngược lại, đây cũng là năm những cuộc trò chuyện sâu sắc về ý nghĩa cuộc đời, về những giá trị cốt lõi và về chiều hướng tương lai có thể làm sâu sắc thêm mối quan hệ hôn nhân đáng kể. Hôn nhân được nuôi dưỡng bằng sự hiểu biết lẫn nhau ở tầng sâu nhất trong năm số 7 sẽ có nền tảng tinh thần vững chắc hơn bao giờ hết.</p>`,
    }),

    8: (safeName, safeYear, safeAge) => ({
      tinhYeu: `<p class="nar">Trong năm Vận số 8, tình yêu của <strong>${safeName}</strong> được định hình bởi sự tự tin và quyền lực cá nhân. Đây là năm bạn không còn chấp nhận những mối quan hệ không xứng đáng với giá trị của mình — bạn biết mình muốn gì và sẵn sàng chờ đợi điều đó. Sức hút của bạn trong năm này đến từ sự tự chủ và thành công — những phẩm chất thu hút đúng kiểu người vào cuộc sống của bạn.</p>
<p class="nar">Tuy nhiên, áp lực từ sự nghiệp và tài chính trong năm số 8 có thể chiếm phần lớn năng lượng của bạn, để lại ít không gian hơn cho tình yêu. Hãy nhớ: thành công vật chất không thể thay thế sự kết nối cảm xúc chân thực. Đặt ưu tiên có chủ đích cho mối quan hệ quan trọng — và khi bạn hiện diện với người bạn yêu, hãy thực sự hiện diện, không phải vừa ở đó vừa nghĩ về công việc.</p>`,

      suNghiep: `<p class="nar">Sự nghiệp của <strong>${safeName}</strong> trong năm Vận số 8 bước vào giai đoạn thu hoạch mạnh mẽ nhất. Đây là năm của sự thăng tiến, mở rộng và khẳng định vị thế. Những nỗ lực và đầu tư từ các năm trước bắt đầu sinh quả rõ rệt — đừng ngần ngại yêu cầu mức lương xứng đáng, đàm phán những hợp đồng có lợi và đặt ra những mục tiêu tham vọng hơn.</p>
<p class="nar">Đây cũng là năm tốt để mở rộng phạm vi ảnh hưởng — nhận các vai trò lãnh đạo, quản lý đội nhóm hay xây dựng thương hiệu ở tầm cao hơn. Tuy nhiên, hãy chú ý không để quyền lực làm thay đổi giá trị cốt lõi của bạn. Sự thành công thực sự trong năm Vận số 8 không chỉ đo bằng thu nhập hay địa vị — mà bằng cả tầm ảnh hưởng tích cực mà bạn tạo ra.</p>`,

      taiChinh: `<p class="nar">Đây là năm tài chính đặc biệt thuận lợi cho <strong>${safeName}</strong>. Năng lượng Vận số 8 mang đến những cơ hội tăng thu nhập, đầu tư thông minh và xây dựng tài sản. Đây là thời điểm hành động táo bạo hơn về tài chính — đàm phán lương, tìm kiếm cơ hội đầu tư có nghiên cứu kỹ lưỡng, hay mở rộng nguồn thu nhập.</p>
<p class="nar">Tuy nhiên, hãy tránh sự kiêu ngạo tài chính — cảm giác "mình không thể thất bại trong năm này" có thể dẫn đến những rủi ro không cần thiết. Vận số 8 trao quyền lực nhưng cũng đòi hỏi trách nhiệm. Kết hợp sự táo bạo với kỷ luật tài chính sẽ giúp bạn tối đa hóa lợi ích của năm này mà không tạo ra hậu quả ở năm tiếp theo.</p>`,

      giaoTiepXaHoi: `<p class="nar">Trong năm Vận số 8, mạng lưới xã hội của <strong>${safeName}</strong> mang ý nghĩa chiến lược quan trọng. Những kết nối bạn tạo ra trong năm này thường liên quan đến cơ hội kinh doanh, thăng tiến nghề nghiệp hay hợp tác dài hạn. Đây là năm để chủ động xây dựng quan hệ với những người có ảnh hưởng trong lĩnh vực của bạn.</p>
<p class="nar">Đồng thời, vị thế và sự thành công của bạn trong năm số 8 tự nhiên thu hút nhiều người hơn — hãy thận trọng phân biệt những ai thực sự quan tâm đến bạn với những ai chỉ muốn tận dụng vị trí của bạn. Hãy giữ những mối quan hệ bạn bè thân thiết lâu dài như neo đậu — họ biết bạn từ trước khi bạn thành công và sẽ ở lại sau khi ánh hào quang qua đi.</p>`,

      hocTap: `<p class="nar">Học tập trong năm Vận số 8 hiệu quả nhất khi gắn liền với mục tiêu nghề nghiệp rõ ràng của <strong>${safeName}</strong>. Đây là năm đầu tư vào những kỹ năng có thể mang lại lợi nhuận kinh tế hoặc nâng cao vị thế chuyên môn của bạn một cách cụ thể. Lãnh đạo, quản lý tài chính, kinh doanh, đầu tư hay bất kỳ lĩnh vực nào liên quan đến việc tạo ra giá trị và ảnh hưởng đều là những lựa chọn học tập tốt trong năm này.</p>
<p class="nar">Hãy học từ những người đã thực sự thành công trong lĩnh vực bạn muốn phát triển — mentor, coach hay chương trình đào tạo cao cấp sẽ mang lại ROI tốt nhất trong năm Vận số 8. Đừng ngại đầu tư khoản tiền đáng kể cho giáo dục chất lượng cao trong năm này — đó là một trong những khoản đầu tư tốt nhất bạn có thể thực hiện.</p>`,

      honNhan: `<p class="nar">Hôn nhân trong năm Vận số 8 đứng trước thách thức của sự cân bằng giữa sự nghiệp và gia đình đối với <strong>${safeName}</strong>. Năng lượng số 8 thúc đẩy mạnh mẽ hướng đến thành công vật chất và quyền lực — nhưng nếu không cẩn thận, người bạn đời và cuộc sống gia đình có thể bị đặt xuống hàng ưu tiên thứ hai. Hãy chủ động và có ý thức về sự cân bằng này.</p>
<p class="nar">Ngược lại, nếu cả hai vợ chồng cùng chia sẻ tham vọng và hỗ trợ nhau trên con đường thành công, năm Vận số 8 có thể là năm cả hai cùng đạt được những đột phá quan trọng. Hãy biến sự thành công cá nhân thành điều mà cả gia đình cùng tự hào và tận hưởng — không phải nguồn gây căng thẳng hay sự xa cách.</p>`,
    }),

    9: (safeName, safeYear, safeAge) => ({
      tinhYeu: `<p class="nar">Trong năm Vận số 9, tình yêu của <strong>${safeName}</strong> bước vào giai đoạn của sự hoàn thành và buông bỏ. Đây là năm của những kết thúc cần thiết và những sự tha thứ sâu sắc — nếu có những mối quan hệ đã hết vai trò hay những vết thương tình cảm chưa được chữa lành, năm số 9 mang đến sức mạnh và sự rõ ràng để xử lý chúng một cách có phẩm giá.</p>
<p class="nar">Nếu đang trong một mối quan hệ lành mạnh và phát triển, đây là năm để cả hai nhìn lại hành trình đã đi qua cùng nhau, trân trọng những gì đã xây dựng và tạo ra không gian cho một giai đoạn mới đẹp hơn. Đừng vội bắt đầu những mối quan hệ mới nghiêm túc trong năm số 9 — hãy để bản thân hoàn thành chu kỳ này trước, rồi bước vào năm số 1 tiếp theo với trái tim trống rỗng và sẵn sàng cho điều mới.</p>`,

      suNghiep: `<p class="nar">Sự nghiệp của <strong>${safeName}</strong> trong năm Vận số 9 bước vào giai đoạn đóng lại một chương và chuẩn bị cho một chương mới. Đây là thời điểm để hoàn thành những dự án còn dang dở, giải quyết những công việc tồn đọng và tổng kết những gì đã đạt được trong chu kỳ 9 năm vừa qua. Đừng bắt đầu những dự án lớn mới trong năm này — hãy hoàn thiện những gì đang có.</p>
<p class="nar">Năm số 9 cũng mang đến câu hỏi sâu sắc: "Công việc này có còn phù hợp với giá trị của mình không?" Nếu câu trả lời là không, đây là năm để chuẩn bị cho sự chuyển đổi — không phải nhảy ngay lập tức, mà là lên kế hoạch và định hướng. Những thay đổi sự nghiệp được lên kế hoạch trong năm số 9 và thực hiện trong năm số 1 thường thành công nhất.</p>`,

      taiChinh: `<p class="nar">Tài chính trong năm Vận số 9 đòi hỏi <strong>${safeName}</strong> hành xử có trách nhiệm và hào phóng. Đây là năm của việc giải quyết những khoản nợ tồn đọng, hoàn thành những cam kết tài chính dang dở và làm sạch bức tranh tài chính của mình. Tránh tích lũy những khoản nợ mới hay cam kết tài chính lớn trong năm này.</p>
<p class="nar">Một nét đặc biệt của năm số 9 là năng lượng ủng hộ việc cho đi — từ thiện, giúp đỡ người cần hay đầu tư vào cộng đồng. Những gì bạn cho đi hào phóng trong năm này thường quay lại theo những dạng bất ngờ và lớn hơn ở năm tiếp theo. Đây là năm để mở rộng tâm lý về tiền bạc — không giữ quá chặt những gì không còn phục vụ bạn.</p>`,

      giaoTiepXaHoi: `<p class="nar">Trong năm Vận số 9, <strong>${safeName}</strong> được mời gọi để mở rộng tầm nhìn xã hội vượt ra ngoài vòng tròn cá nhân. Đây là năm phục vụ cộng đồng, đóng góp cho những điều lớn hơn bản thân và kết nối với những người mang tầm nhìn nhân văn rộng lớn hơn. Bạn sẽ cảm thấy được nuôi dưỡng bởi những kết nối mang ý nghĩa xã hội thực sự.</p>
<p class="nar">Đây cũng là năm để buông bỏ những mối quan hệ không còn phục vụ sự phát triển của cả hai bên — không nhất thiết phải đứt đoạn kịch tính, mà chỉ cần để chúng từ từ rút lui một cách tự nhiên và đầy ân sủng. Hãy trân trọng những mối quan hệ này vì những gì họ đã mang lại, và buông tay với lòng biết ơn thay vì với sự cay đắng.</p>`,

      hocTap: `<p class="nar">Học tập trong năm Vận số 9 hướng về sự tổng hợp và tích hợp kiến thức cho <strong>${safeName}</strong>. Đây không phải năm bắt đầu những chương trình học dài hạn mới — mà là năm để hoàn thiện, tổng kết và viết lại những gì bạn đã học được trong cả chu kỳ vừa qua. Đây là thời điểm tốt để viết ra kiến thức của mình — blog, sách, khóa học hay bất kỳ hình thức nào chia sẻ kinh nghiệm tích lũy được.</p>
<p class="nar">Những chủ đề học tập phù hợp nhất trong năm số 9 là những gì liên quan đến triết học, lịch sử, nhân văn hay bất kỳ lĩnh vực nào giúp bạn hiểu bức tranh lớn của sự tồn tại. Đây cũng là năm tốt để học hỏi từ những người lớn tuổi hơn và khôn ngoan hơn — những người đã đi qua những chu kỳ mà bạn đang chuẩn bị bước vào.</p>`,

      honNhan: `<p class="nar">Hôn nhân trong năm Vận số 9 là thời điểm để <strong>${safeName}</strong> và người bạn đời nhìn lại hành trình chung và chuẩn bị cho một giai đoạn mới. Đây là năm của sự tha thứ sâu sắc — không chỉ tha thứ cho người kia mà còn tha thứ cho chính mình về những sai lầm và thiếu sót trong suốt năm qua. Từ bi đối với bản thân là nền tảng của từ bi trong hôn nhân.</p>
<p class="nar">Nếu có những vấn đề tích lũy cần được giải quyết, hãy dũng cảm đối mặt với chúng trong năm số 9 thay vì mang sang chu kỳ mới. Hôn nhân được làm sạch và tái cam kết trong năm này sẽ bước vào năm số 1 tiếp theo với sức sống mới và nền tảng sâu sắc hơn. Đây là cơ hội tái khởi đầu — không phải kết thúc.</p>`,
    }),
  }

  // Gọi: NT.personalYearDeep(num, year, name)
  // ════════════════════════════════════════════════════════════════════
export function personalYearDeep(num: number, year: number, name: string): string {
    const safeName = escapeHtml(name);
    const safeYear = escapeHtml(String(year));
    const n = num % 9 || 9;
    const content: Record<
      number,
      {
        [key: string]: string | undefined;
        title: string;
        subtitle: string;
        intro: string;
        congviec: string;
        quanhe: string;
        suckhoe: string;
        taichinhthanhoc?: string;
        taichinhhoatap?: string;
        banthan: string;
        tonket: string;
      }
    > = {
      1: {
        title: 'Khởi đầu mới &amp; Tiên phong',
        subtitle: 'Năm của những bước đột phá và khởi đầu',
        intro: `Năm cá nhân số 1 mở ra một chu kỳ hoàn toàn mới cho <strong> ${safeName}</strong>.Đây là thời điểm vũ trụ trao cho bạn một trang giấy trắng — hãy viết lên đó những điều bạn thực sự muốn trở thành.Năng lượng năm nay mạnh mẽ, độc lập và tiên phong; mọi sự chần chừ đều có thể khiến bạn bỏ lỡ cơ hội đặc biệt.`,
        congviec: `Đây là năm lý tưởng để bắt đầu một dự án mới, thay đổi hướng đi sự nghiệp hoặc khởi động doanh nghiệp riêng.Năng lượng số 1 ủng hộ sự tự lập và dám nghĩ dám làm.Nếu bạn có ý tưởng đã nung nấu lâu nay, đây là thời điểm thực hiện nó.Hãy đặt mục tiêu cụ thể cho 12 tháng tới và bắt đầu từ bước nhỏ nhất ngay hôm nay.Tránh để người khác quyết định thay bạn trong những vấn đề quan trọng với sự nghiệp.`,
        quanhe: `Trong các mối quan hệ, bạn có thể cảm thấy cần không gian và sự độc lập hơn thường lệ.Đây là điều bình thường với năng lượng số 1. Tuy nhiên, hãy cẩn thận không để sự tự lập trở thành cô lập.Các mối quan hệ bắt đầu trong năm này thường mang năng lượng mạnh mẽ và định hình lại con người bạn.Nếu đang trong mối quan hệ, đây là năm để tái định nghĩa vai trò của bạn trong đó — theo hướng lành mạnh và trưởng thành hơn.`,
        suckhoe: `Sức khỏe năm nay có xu hướng tốt nếu bạn duy trì năng lượng một cách có kỷ luật.Hãy bắt đầu một thói quen tập luyện mới, điều chỉnh chế độ ăn uống hoặc cải thiện giấc ngủ.Tránh kiệt sức do làm việc quá sức — đây là nguy cơ phổ biến với năng lượng số 1. Hãy nhớ: cơ thể bạn là công cụ chính để bạn thực hiện những ý tưởng vĩ đại trong năm này.`,
        taichinhthanhoc: `Về tài chính, đây là năm tốt để bắt đầu những kế hoạch đầu tư mới và tạo ra nguồn thu nhập mới.Tuy nhiên, hãy hành động với sự chuẩn bị kỹ lưỡng thay vì bốc đồng.Đây cũng là năm để học một kỹ năng tài chính mới: đọc báo cáo, hiểu về đầu tư, hoặc tạo quỹ khẩn cấp cá nhân.`,
        banthan: `Đây là năm của sự tự khám phá sâu sắc.Hãy dành thời gian định nghĩa lại: bạn muốn trở thành ai trong chu kỳ 9 năm tiếp theo ? Những quyết định bạn đưa ra năm nay sẽ định hướng cả một giai đoạn dài của cuộc đời.Hãy can đảm đứng vào vị trí lãnh đạo — kể cả trong cuộc đời của chính mình.`,
        tonket: `Thành công của <strong> ${safeName}</strong> trong năm ${safeYear} nằm ở khả năng bắt đầu và kiên trì với những điều thực sự quan trọng — không bị phân tâm bởi ý kiến người khác.Đây là năm để khẳng định bản sắc và hướng đi của mình.Hãy dũng cảm bước ra khỏi vùng an toàn.`
      },
      2: {
        title: 'Hợp tác &amp; Kiên nhẫn chiến lược',
        subtitle: 'Năm của các mối quan hệ và ngoại giao',
        intro: `Năm cá nhân số 2 của <strong> ${safeName}</strong> là năm của sự chậm lại có chủ đích.Sau sự khởi đầu mạnh mẽ của số 1, vũ trụ mời bạn vào chế độ "trồng cây" — kiên nhẫn chăm sóc những gì đã được gieo, xây dựng liên minh và phát triển qua sự hợp tác thay vì đối đầu.`,
        congviec: `Năm nay không phải thời điểm của những hành động táo bạo đơn độc.Thay vào đó, hãy tập trung vào việc củng cố đội nhóm, cải thiện quy trình làm việc và xây dựng các mối quan hệ đồng nghiệp bền vững.Năng lực ngoại giao và khả năng lắng nghe sẽ mang lại cho bạn những kết quả tốt hơn bất kỳ sự quyết đoán đơn phương nào.Hợp tác, liên minh, và chia sẻ tín dụng sẽ là chìa khóa thăng tiến của bạn năm nay.`,
        quanhe: `Các mối quan hệ đang trong giai đoạn phát triển sâu sắc.Đây là năm lý tưởng để củng cố, hàn gắn và làm giàu những kết nối quan trọng trong cuộc đời bạn.Hôn nhân và quan hệ đối tác được đặc biệt ưu tiên bởi năng lượng số 2. Nếu bạn đang trong một mối quan hệ, hãy đầu tư thời gian chất lượng.Nếu còn độc thân, bạn có thể gặp được người bạn đời tiềm năng.`,
        suckhoe: `Sức khỏe tâm lý quan trọng hơn thể chất năm nay.Hãy chú ý đến căng thẳng cảm xúc, đặc biệt khi mâu thuẫn trong các mối quan hệ.Thiền định, yoga, hoặc bất kỳ hoạt động nào giúp bạn cân bằng cảm xúc đều rất có giá trị.Tránh lãng mạn hóa nỗi đau — hãy giải quyết những tổn thương chưa được xử lý.`,
        taichinhthanhhoc: `Tài chính năm nay không phải thời điểm để liều lĩnh.Hãy duy trì sự ổn định, trả bớt nợ và xây dựng quỹ dự phòng.Các cơ hội đầu tư tốt nhất có thể đến từ quan hệ đối tác — nhưng hãy thẩm định kỹ càng trước khi cam kết.`,
        banthan: `Đây là năm để học nghệ thuật lắng nghe thực sự — không chỉ nghe lời nói mà nghe cả những điều không được nói.Hãy thực hành sự nhạy cảm có chủ đích và tìm cách đóng góp cho những người xung quanh mà không cần ghi nhận.`,
        tonket: `Năm ${safeYear} của <strong> ${safeName}</strong> thành công khi bạn học được rằng sức mạnh không phải lúc nào cũng cần phô trương.Đôi khi, người có ảnh hưởng nhất trong phòng chính là người đang lắng nghe.`
      },
      3: {
        title: 'Sáng tạo &amp; Biểu đạt bản thân',
        subtitle: 'Năm của nghệ thuật, giao lưu và niềm vui',
        intro: `Năm cá nhân số 3 là mùa xuân trong hành trình 9 năm của <strong> ${safeName}</strong>.Đây là năm năng lượng dồi dào, cảm hứng sáng tạo và những kết nối xã hội phong phú.Hãy để bản thân tỏa sáng — đừng thu mình lại hay ẩn sau sự khiêm tốn không cần thiết.`,
        congviec: `Sáng tạo là tài sản lớn nhất của bạn năm nay.Nếu làm việc trong lĩnh vực nghệ thuật, truyền thông, giải trí hay bất kỳ ngành nào cần ý tưởng mới — đây là năm tỏa sáng của bạn.Đừng ngại đề xuất những ý tưởng táo bạo.Nếu không làm trong lĩnh vực sáng tạo, hãy tìm cách đưa sự sáng tạo vào công việc hiện tại của bạn — cách giải quyết vấn đề mới, cách giao tiếp với khách hàng, hay cách tổ chức quy trình.Đây cũng là năm tốt để mở rộng mạng lưới quan hệ nghề nghiệp.`,
        quanhe: `Cuộc sống xã hội của bạn sôi động hơn bao giờ hết.Bạn hấp dẫn người khác một cách tự nhiên và dễ tạo ra những kết nối mới.Hãy tận dụng điều này để xây dựng cả quan hệ cá nhân lẫn nghề nghiệp.Trong tình yêu, đây là năm vui vẻ và lãng mạn — nhưng hãy cẩn thận với xu hướng lý tưởng hóa người khác quá mức.`,
        suckhoe: `Sức khỏe nhìn chung tốt.Tuy nhiên, hãy chú ý không để guồng quay xã hội dẫn đến kiệt sức hay mất ngủ.Các hoạt động thể chất mang tính nghệ thuật — khiêu vũ, bơi lội, yoga — rất phù hợp với năng lượng số 3. Hãy chú ý đến hệ tiêu hóa và vùng cổ họng.`,
        taichinhthanhhoc: `Tài chính có thể tăng nhưng cũng dễ chi tiêu nhiều hơn thói quen.Hãy lập ngân sách cho những khoản "vui vẻ" để không bị mất kiểm soát.Tránh đầu tư vào những thứ hào nhoáng mà thiếu cơ sở.`,
        banthan: `Đây là năm để tìm lại tiếng cười và sự nhẹ nhàng.Hãy cho phép bản thân vui vẻ mà không cần lý do.Học một kỹ năng nghệ thuật mới, dù chỉ như sở thích.Hãy để trái tim bạn được bày tỏ — qua ngôn ngữ, nghệ thuật, âm nhạc, hay chỉ đơn giản là nói thật điều mình cảm thấy.`,
        tonket: `Thành công năm ${safeYear} của <strong> ${safeName}</strong> nằm ở việc dám biểu đạt bản thân một cách chân thực và đầu tư vào những mối quan hệ mang đến niềm vui thực sự.`
      },
      4: {
        title: 'Làm việc chăm chỉ và tiến độ chậm, nhưng ổn định',
        subtitle: 'Năm xây nền tảng và kỷ luật',
        intro: `Năm cá nhân số 4 của <strong> ${safeName}</strong> nhấn mạnh đến việc bạn cần củng cố năng lượng và nguồn lực để chúng có thể hỗ trợ cho sự phát triển của bạn trong tương lai.Bạn có thể bận tâm hơn về tiền bạc, tài sản hoặc cơ thể của mình.`,
        congviec: `Xét về công việc, năm nay bạn phải làm việc một cách có tổ chức, có kế hoạch, thiết lập các mục tiêu một cách rõ ràng và quản lý tất cả các công việc của mình một cách quy củ.Bạn cũng cần luôn làm việc chăm chỉ và kiên trì.Nếu bạn lập kế hoạch tốt, thì khi các ý tưởng được thực hiện, nó sẽ cho phép bạn đạt được nhiều lợi ích trong việc củng cố sự ổn định cho tương lai.Những nỗ lực ngay từ bây giờ sẽ giúp ổn định cuộc sống của bạn trong những năm tới.Tóm lại, đây là một năm để bạn đặt nền móng vững chắc cho việc xây dựng công việc kinh doanh, thậm chí bao gồm cả tổ ấm và gia đình.Liên quan đến học tập thi cử, năm nay là năm bạn cần phải thực sự nỗ lực học tập chăm chỉ để có được những kết quả tốt.Nếu bạn có dự định tham gia vào các khóa học, đi du học hoặc học lên các cấp học cao hơn thì đây là năm phù hợp.`,
        quanhe: `Về các mối quan hệ, năm nay bạn cần củng cố lại chúng.Điều này sẽ giúp bạn hiểu rõ hơn về các mối quan hệ của mình và tạo nên sự gắn kết bền chặt.Đặc biệt, bạn sẽ có thể thu hút những người bạn đồng hành tuyệt vời trong năm nay nếu bạn cho họ thấy bạn là người đáng tin cậy, tận tâm với công việc, trung thành và có thái độ tích cực.Còn nếu bạn đang trong một mối quan hệ tình cảm, hãy mong đợi một lễ đính hôn hoặc kết hôn.Và nếu bạn đã kết hôn, hãy mong đợi có con.`,
        suckhoe: `Về sức khỏe, năm cá nhân số 4 đặc biệt có tác động đến cơ thể vật lý của bạn.Bạn sẽ nhận thấy sự thay đổi về trọng lượng hoặc vóc dáng cơ thể.Những thay đổi này sẽ tích cực nếu bạn chăm sóc và giữ gìn cơ thể của mình, và nó sẽ trở nên tồi tệ nếu như bạn lơ là.Năm cá nhân số 4 cũng có thể mang đến những căn bệnh được thiết kế để giữ cho bạn vững vàng.Bạn cũng có thể nhận thấy rằng mình cần quan tâm nhiều hơn đến việc chải chuốt cá nhân.Những yếu tố khác cũng cần chú ý là các vấn đề về thận hoặc bàng quang, căng thẳng tinh thần do suy nghĩ quá nhiều và trầm cảm.`,
        taichinhthanhhoc: `Trong khía cạnh tài chính, bạn cần phải xem xét tài sản, thỏa thuận, hợp đồng hoặc các vấn đề pháp lý một cách kiên nhẫn và trung thực, tránh những rủi ro quá mức.Đừng đặt niềm tin vào sự may rủi hoặc cho phép bản thân bất cẩn trong năm nay.Hãy chỉ tham gia vào những dự án khi bạn chắc chắn rằng chúng có tính chất hợp lý và sẽ thành công.Đây cũng là thời điểm bạn nên tiết kiệm và bắt đầu tích lũy một số tài sản.Việc mua bán hoặc thực hiện các giao dịch liên quan đến xây dựng nhà cửa để định cư sẽ phù hợp.Còn nếu bạn muốn đầu tư vào nhà đất để sinh lời thì đây chưa thực sự là thời điểm tốt.`,
        banthan: `Về bản thân, đây là năm bạn sẽ cần phải bình tĩnh, ổn định, sắp xếp, tuân theo một thói quen, chịu trách nhiệm và nhìn thấu đáo mọi thứ.Bạn cũng cần dành thời gian để suy nghĩ nghiêm túc về tương lai.Hãy cố gắng tránh những cuộc cãi vã và hiểu lầm không đáng có.Năm này sẽ cho phép bạn sửa chữa một số sai lầm quan trọng mà bạn đã mắc phải trong quá khứ.Từ khóa quan trọng trong năm nay là sự cân bằng.Hãy tự kỷ luật bản thân bởi vì nếu bạn làm việc chăm chỉ, kiên nhẫn, tỉnh táo và thực tế thì khi hết năm, bạn sẽ cảm thấy khá hài lòng về những điều bạn đã hoàn thành.`,
        tonket: `Tóm lại, thành công của <strong> ${safeName}</strong> vào năm ${safeYear} là xây dựng được những bước đi bài bản và chắc chắn cho một mục tiêu lớn trong cuộc đời.Để đạt được điều đó, bạn cần bỏ đi sự quan tâm tới những điều nhỏ nhặt mà hãy luôn nghĩ về một tầm nhìn dài hạn, sau đó dành nhiều thời gian kiên trì để tìm cách thực hiện nó.Sự nỗ lực và chăm chỉ trong năm nay là không thể thiếu.`
      },
      5: {
        title: 'Cảm thấy lỏng lẻo và tự do, nhiều thay đổi',
        subtitle: 'Năm của thay đổi, phát triển và tự do',
        intro: `Đây sẽ là một năm cho sự thay đổi, phát triển, vui vẻ và tự do đối với <strong> ${safeName}</strong>.Năm nay có thể có một số sự thay đổi quan trọng về nơi ở, công việc, hướng đi hoặc hoàn cảnh gia đình.Bạn phải tận dụng lợi thế của sự thay đổi đó để giúp bạn tiến lên phía trước.Thách thức của bạn trong năm nay là tiếp tục tập trung vào các mục tiêu dài hạn, cố gắng sắp xếp các dự án quan trọng và xem xét chúng từ đầu đến cuối.`,
        congviec: `Về công việc, không giống như năm trước khi mọi thứ có xu hướng ổn định, năm nay dường như có phần lỏng lẻo và có sự thay đổi(có thể về môi trường làm việc, công việc của bạn, ...).Đôi khi bạn thấy mình mất hứng thú và trì hoãn các công việc hoặc dự án quan trọng mà bạn cần hoàn thành.Lời khuyên là bạn hãy lập kế hoạch cho một mục tiêu nhất định để thăng tiến đồng thời thực hiện các điều chỉnh và quyết định cần thiết để cải tiến.Ngoài ra, với năng lượng của năm số 5, bạn có thể theo đuổi sự nghiệp trong lĩnh vực nghệ thuật biểu diễn, hoặc bạn có thể trở thành một nhà văn viết về du lịch, đi khắp thế giới để tìm kiếm những điều thú vị và phiêu lưu mới.Về học tập thi cử, đây là năm bạn nên khám phá những khía cạnh, góc nhìn mới về bản thân mình.Nếu bạn có định hướng học lên các cấp học cao hơn hoặc đi du học, khám phá những nền văn hóa cũng như miền đất mới thì đây là năm phù hợp.`,
        quanhe: `Trong các mối quan hệ, để có được những điều tốt đẹp nhất trong năm nay, tất cả những thay đổi nên có lợi cho người khác cũng như cho chính bạn.Hãy cố gắng sống hài hòa với mọi người.Bạn có thể sẽ tham gia nhiều cuộc tụ họp xã hội hơn bình thường hoặc thậm chí tổ chức các bữa tiệc để xây dựng mối quan hệ tốt hơn.Nếu đã kết hôn, hãy mong đợi sự tập trung lại vào tình yêu với niềm đam mê.Nếu còn độc thân, hãy mong đợi được gặp những người mới, đầy đam mê và tuyệt vời.Nếu người yêu vẫn còn đồng hành với bạn cho đến tháng 4 năm sau, họ sẽ là người bạn đời tiềm năng.`,
        suckhoe: `Liên quan đến sức khỏe, đây là năm có thể có những thay đổi về sức khỏe của bạn.Dường như bạn dễ thích nghi và linh hoạt hơn, cũng như sẵn sàng thúc đẩy bản thân về mặt tinh thần và thể chất lên những tầm cao mới.Tuy nhiên, bạn cũng cần thận trọng vì năng lượng của năm số 5 có thể khiến bạn bị ốm do quá phấn khích cũng như do thay đổi đột ngột.`,
        taichinhthanhhoc: `Về tài chính, hãy xem xét những gì bạn ký và suy nghĩ kỹ về việc thực hiện các thỏa thuận dài hạn.Nếu bạn không suy nghĩ thấu đáo, bạn có thể phải thực hiện các thay đổi hoặc điều chỉnh sau đó.Nếu bạn muốn đầu tư vào đất đai hoặc thực hiện các giao dịch tài chính lớn, đây không phải là năm đem lại cho bạn thành công nổi trội.`,
        banthan: `Về bản thân, năm nay bạn cần cố gắng giữ tập trung và tránh bị phân tán năng lượng.Khi những cơ hội mới đến, bạn nên cố gắng đón nhận và có một tư duy cởi mở thì bạn sẽ có thể làm mới cuộc sống của mình, xóa bỏ những "lớp vỏ" cũ để có thêm tự do cá nhân và thăng tiến.Ngoài ra, năm nay bạn cũng nên thử một phong cách thời trang, thức ăn hoặc sở thích mới.`,
        tonket: `Tóm lại, năm cá nhân số 5 của <strong> ${safeName}</strong> trong năm ${safeYear} đem đến những thay đổi và cuộc phiêu lưu mới, nơi bạn có thể sẽ có những trải nghiệm mới hoặc bước vào những mối quan hệ mới.Hãy đón nhận những thay đổi và học cách thích nghi để tìm thấy thành công và niềm vui.Những quyết định của bạn trong năm này sẽ mang lại thay đổi rất lớn, vậy nên hãy suy tính thật kỹ càng và đưa ra những lựa chọn lý trí.`
      },
      6: {
        title: 'Tình yêu, Gia đình, Tổ ấm và Trách nhiệm',
        subtitle: 'Năm của tình yêu, hôn nhân và sự hy sinh',
        intro: `Năm cá nhân số 6 được gọi là năm của tình yêu, hôn nhân và sự hy sinh đối với <strong> ${safeName}</strong>.Cuộc sống sẽ mang đến cho bạn những sự kiện và cơ hội mà nhấn mạnh đến trách nhiệm và công việc đối nội.Năm nay, trọng tâm của bạn là gia đình, hôn nhân, trách nhiệm, phục vụ và hy sinh.`,
        congviec: `Về công việc, hãy đảm bảo bạn là người tháo vát, quyết đoán và bảo vệ những điều bạn tin tưởng.Bạn có thể có cơ hội thăng tiến và cải thiện công việc kinh doanh hoặc tài chính của mình.Tuy nhiên, nhiều khi bạn có thể thấy mình cam kết quá mức trong công việc và không thể từ chối vì bạn không muốn làm tổn thương hoặc làm cấp trên thất vọng.Đây là lúc bạn cần thiết lập ranh giới để tránh bị lợi dụng.Hãy làm việc theo tốc độ của bạn, làm điều gì đó khiến bạn cảm thấy bình yên; bạn thậm chí có thể học một kỹ năng hoặc thử một thứ gì đó mang tính nghệ thuật, thiền định thường xuyên và nghe nhạc.Liên quan đến học tập thi cử, nếu bạn muốn học lên các hàm vị cao hơn thì năm nay là năm phù hợp cho quyết định đó.`,
        quanhe: `Trong các mối quan hệ, năm nay hãy dành thời gian quan tâm, chia sẻ với gia đình và bạn bè, hiểu và cân nhắc nhu cầu của mọi người, đồng thời cố gắng cống hiến và không ích kỷ nhất có thể.Tuy nhiên, đôi khi những người khác có thể sẽ áp đặt bạn hoặc cố gắng lợi dụng bản chất tốt của bạn.Nếu bạn chấp nhận những tình huống này như một đặc ân thay vì một gánh nặng, bạn sẽ gặt hái được trái ngọt ở cuối con đường.Nếu đã kết hôn, đây là năm bạn nên chia sẻ những khoảnh khắc quý giá với gia đình và bạn bè.Nếu bạn chưa lập gia đình, đây là một năm tốt để kết hôn hoặc tiếp tục hôn nhân.`,
        suckhoe: `Xét về sức khỏe, việc trốn tránh trách nhiệm hoặc không ưu tiên các mối quan hệ của bạn, đặc biệt là với gia đình và bạn bè, về lâu dài có thể ảnh hưởng đến sức khỏe tinh thần của bạn.Nếu trách nhiệm dường như quá nhiều đối với bạn hoặc bạn cảm thấy choáng ngợp, hãy thử một số thói quen sẽ giúp cân bằng chúng.Hãy giao một số trách nhiệm cho những người mà bạn biết họ có khả năng đảm đương.Đây là một năm để bạn học cách xả stress, có niềm tin vào bản thân và những gì bạn đang làm.`,
        taichinhthanhhoc: `Về tài chính, nếu bạn cân bằng được gia đình và công việc, trách nhiệm và bản thân thì đây là năm bạn có thể có những sự cải thiện về tài chính.Nếu bạn có điều kiện, đây là năm phù hợp cho bạn để sửa sang, trang trí lại nhà cửa hoặc mua nhà, đất để định cư, sinh sống.Nếu bạn muốn đầu tư vào tài chính, đất đai để sinh lời thì năm nay chưa thực sự tốt, vì bạn có thể bị cảm xúc và trách nhiệm khiến bạn không lý trí đưa ra quyết định đúng đắn nhất.`,
        banthan: `Về bản thân, để đạt được nhiều thành tựu nhất trong năm nay, bạn cần biết hài lòng, quan tâm đến vấn đề của người khác và thể hiện rất nhiều tình yêu thương.Bạn cũng nên cho đi một cách hào phóng hơn những gì bạn nhận được.Việc tạo ra một bầu không khí hòa hợp cũng sẽ rất quan trọng, vì tình yêu, tiền bạc, sức khỏe và tình bạn có thể dễ dàng vuột mất nếu bất hòa kéo dài.Hãy giữ những lý tưởng cao đẹp và cố gắng tránh bất kỳ cảm giác bực bội vì sự bất công.`,
        tonket: `Tóm lại thành công của <strong> ${safeName}</strong> vào năm ${safeYear} là đạt được sự thấu hiểu về con người và xây dựng được niềm tin rất lớn của mọi người với bạn.Hãy dành thời gian thật vui vẻ bên gia đình và những người thân yêu của mình.Tuy nhiên hãy nhớ tiết chế tinh thần trách nhiệm của mình ở mức vừa đủ, không cho đi quá mức và cũng không giữ lại quá mức.`
      },
      7: {
        title: 'Chiều sâu nội tâm &amp; Tâm linh',
        subtitle: 'Năm của sự suy ngẫm, học hỏi và kết nối tâm linh',
        intro: `Năm cá nhân số 7 mời <strong> ${safeName}</strong> chậm lại và đi vào chiều sâu.Đây không phải năm của hành động ồ ạt — mà là năm của sự tích lũy tri thức, phát triển nội tâm và kết nối với trực giác.Những gì bạn học được trong năm này sẽ trở thành nền tảng cho sự thịnh vượng của năm số 8 tiếp theo.`,
        congviec: `Trong công việc, đây là năm thích hợp để chuyên môn hóa sâu hơn thay vì mở rộng.Nghiên cứu, phân tích và phát triển kỹ năng chuyên biệt sẽ mang lại kết quả tốt hơn là tìm kiếm những cơ hội mới ồ ạt.Nếu bạn cần đưa ra các quyết định lớn về sự nghiệp, hãy dành thời gian thẩm định kỹ thay vì hành động vội.Tránh những thay đổi lớn đột ngột về nghề nghiệp — đây không phải thời điểm tốt nhất.Thay vào đó, hãy chuẩn bị kỹ càng cho những bước đi lớn của năm tới.`,
        quanhe: `Năm số 7 có thể mang đến sự cô đơn nhất định — và điều đó không hẳn là xấu.Bạn đang học cách tận hưởng sự hiện diện của chính mình.Tuy nhiên, hãy thận trọng không để sự rút lui trở thành sự cô lập.Trong các mối quan hệ thân thiết, đây là năm cần sự thành thật và giao tiếp sâu sắc.Bề ngoài và những cuộc trò chuyện nông cạn sẽ không thỏa mãn bạn.Nếu đang trong mối quan hệ không còn phù hợp, bạn sẽ cảm nhận điều đó rõ ràng hơn bao giờ hết.`,
        suckhoe: `Đây là năm đặc biệt thích hợp để xây dựng thói quen thiền định, yoga và các thực hành tâm thân.Giấc ngủ chất lượng và thời gian yên tĩnh là điều kiện thiết yếu cho sức khỏe của bạn năm nay.Hãy chú ý đến hệ thần kinh và sức khỏe tâm lý — đây là những điểm dễ bị ảnh hưởng nhất trong năm số 7.`,
        taichinhthanhhoc: `Tài chính năm nay có thể không tăng đột biến — vũ trụ đang định hướng bạn vào chiều sâu hơn là chiều rộng.Hãy quản lý những gì đang có một cách khéo léo.Đây là năm tốt để học về đầu tư, tài chính cá nhân và lập kế hoạch tài chính dài hạn — nhưng chưa phải năm để hành động lớn.`,
        banthan: `Hãy đọc nhiều hơn, thiền nhiều hơn, ngồi một mình nhiều hơn.Đây không phải sự thất bại về mặt xã hội — đây là sự đầu tư vào chiều sâu của tâm hồn.Hãy đặt những câu hỏi lớn: "Ý nghĩa thực sự của tôi là gì? Điều gì làm tôi cảm thấy sống thật nhất?"`,
        tonket: `Năm ${safeYear} của <strong> ${safeName}</strong> thành công khi bạn thoát ra khỏi vòng xoáy bên ngoài và dũng cảm bước vào sự im lặng của chính mình.Những gì bạn tìm thấy ở đó sẽ thay đổi bạn theo cách không có môi trường bên ngoài nào có thể làm được.`
      },
      8: {
        title: 'Quyền lực &amp; Thịnh vượng',
        subtitle: 'Năm của thu hoạch, sự nghiệp và tài chính',
        intro: `Năm cá nhân số 8 là năm thu hoạch và quyền lực của <strong> ${safeName}</strong>.Đây là đỉnh cao của chu kỳ 9 năm về mặt thành tựu vật chất và ảnh hưởng xã hội.Những hạt giống bạn đã gieo trong các năm trước đang sẵn sàng cho mùa gặt — vấn đề chỉ là bạn có đủ can đảm để đến đồng ruộng không.`,
        congviec: `Đây là năm lý tưởng để thăng tiến, đàm phán, ký kết hợp đồng lớn, mở rộng quy mô kinh doanh hay yêu cầu mức lương xứng đáng với giá trị của bạn.Năng lượng số 8 ủng hộ sự quyết đoán và tư duy chiến lược.Hãy tự tin bước vào vị trí lãnh đạo — đây chính là thời điểm của bạn.Nếu bạn muốn khởi nghiệp hoặc đầu tư, năm số 8 là một trong những thời điểm thuận lợi nhất trong chu kỳ của bạn.`,
        quanhe: `Các mối quan hệ năm nay có thể chịu áp lực từ công việc và tham vọng của bạn.Hãy có ý thức dành thời gian cho những người quan trọng, đừng để thành công làm xói mòn sự kết nối.Đây cũng là năm để xem xét các mối quan hệ có đang mang đến cho nhau sự phát triển hay không.`,
        suckhoe: `Năng lượng cao, tham vọng lớn — nhưng cũng cần chú ý không kiệt sức.Hãy đảm bảo rằng áp lực công việc không dẫn đến căng thẳng mãn tính.Tập thể dục thường xuyên, ngủ đủ giấc và đặt ra ranh giới giữa công việc và nghỉ ngơi là rất quan trọng.`,
        taichinhthanhhoc: `Đây là năm tốt nhất để đầu tư, mua bất động sản, thực hiện các giao dịch tài chính lớn và tích lũy tài sản.Hãy hành động với sự chuẩn bị kỹ lưỡng — đừng lãng phí cơ hội quý hiếm này bằng sự chần chừ hay thiếu chuẩn bị.`,
        banthan: `Hãy học cách sử dụng quyền lực và ảnh hưởng của mình một cách có trách nhiệm.Sự thịnh vượng thực sự không chỉ là về tài sản — mà là về tác động tích cực bạn tạo ra cho những người xung quanh.`,
        tonket: `Năm ${safeYear} của <strong> ${safeName}</strong> là một trong những năm quan trọng nhất trong chu kỳ 9 năm của bạn.Đừng để nó trôi qua trong sự rụt rè.Hãy đứng thẳng, tin vào giá trị của mình và bước ra ánh sáng mà năm số 8 đang chiếu cho bạn.`
      },
      9: {
        title: 'Hoàn thành &amp; Buông bỏ',
        subtitle: 'Năm của sự kết thúc, nhân đạo và giải phóng',
        intro: `Năm cá nhân số 9 đánh dấu sự kết thúc của một chu kỳ 9 năm trong cuộc đời <strong> ${safeName}</strong>.Đây là năm của sự tổng kết, nhìn lại, và quan trọng nhất là buông bỏ những gì không còn phù hợp để chuẩn bị cho một khởi đầu hoàn toàn mới.Đây cũng là năm của lòng nhân ái và phục vụ.`,
        congviec: `Trong công việc, hãy hoàn thành những dự án còn dang dở và đừng bắt đầu những cam kết lớn mới.Đây là năm để tổng kết, đánh giá và học từ những kinh nghiệm đã qua.Nếu bạn đang cân nhắc chuyển hướng sự nghiệp, đây là năm để chuẩn bị tinh thần và lên kế hoạch — nhưng thực hiện vào năm số 1 tiếp theo.Đây là thời điểm tốt để đóng góp cho cộng đồng, từ thiện và phục vụ — những hành động này sẽ "trả ơn" vũ trụ và chuẩn bị cho chu kỳ mới.`,
        quanhe: `Các mối quan hệ không còn phù hợp sẽ kết thúc tự nhiên trong năm số 9. Đây không phải mất mát — đây là sự giải phóng.Hãy để những gì cần ra đi được ra đi với lòng biết ơn.Các mối quan hệ bền vững sẽ được thử nghiệm và trở nên vững chắc hơn.Đây cũng là năm tốt để tha thứ — cho người khác và cho chính mình.`,
        suckhoe: `Đây là năm để chú ý đến sức khỏe cảm xúc.Nếu có những tổn thương cũ chưa được xử lý, chúng có thể nổi lên trong năm số 9 để được giải quyết.Hãy tìm kiếm sự hỗ trợ nếu cần — một người tư vấn, một người bạn đáng tin, hay một thực hành tâm linh.Sức khỏe thể chất đặc biệt liên quan đến chất lượng giấc ngủ và hệ miễn dịch.`,
        taichinhthanhhoc: `Hãy trả bớt nợ, thanh lý những khoản đầu tư không còn hiệu quả và đơn giản hóa tài chính.Đây không phải năm để bắt đầu những dự án tài chính lớn mới — mà là năm để thu dọn và chuẩn bị cho giai đoạn mới.`,
        banthan: `Thực hành lòng biết ơn mỗi ngày.Nhìn lại 9 năm vừa qua và nhận ra những gì bạn đã học được, những cách bạn đã trưởng thành.Đây là năm để phục vụ với trái tim rộng mở — không kỳ vọng, không điều kiện.`,
        tonket: `Năm ${safeYear} của <strong> ${safeName}</strong> thành công khi bạn học được nghệ thuật buông bỏ — không phải từ bỏ, mà là tạo không gian.Mỗi thứ bạn buông ra trong năm này là một đôi tay trống để đón nhận điều kỳ diệu đang chờ ở phía trước.`
      }
    };

    const c = content[n] || content[9];
    return `
  <div class="year-detail-block">
      <div class="year-detail-headline">
        <span class="year-detail-label">VẬN SỐ NĂM ${safeYear} CỦA BẠN LÀ: ${n}</span>
      </div>
      <div class="year-detail-subtitle"><em>${c.title}</em></div>
      <p class="nar">${c.intro}</p>
      <div class="year-domain-block">
        <div class="domain-title">💼 Công việc &amp; Sự nghiệp</div>
        <p class="nar">${c.congviec}</p>
      </div>
      <div class="year-domain-block">
        <div class="domain-title">💗 Các mối quan hệ &amp; Tình yêu</div>
        <p class="nar">${c.quanhe}</p>
      </div>
      <div class="year-domain-block">
        <div class="domain-title">🌿 Sức khỏe</div>
        <p class="nar">${c.suckhoe}</p>
      </div>
      <div class="year-domain-block">
        <div class="domain-title">💰 Tài chính &amp; Học tập</div>
        <p class="nar">${c.taichinhthanhhoc || c.taichinhhoatap || 'Hãy xem xét tài chính của mình một cách cẩn thận trong năm này.'}</p>
      </div>
      <div class="year-domain-block">
        <div class="domain-title">🌟 Về bản thân</div>
        <p class="nar">${c.banthan}</p>
      </div>
      <div class="insight-box" style="margin-top:1rem;">📌 <strong>Tóm lại:</strong> ${c.tonket}</div>
    </div> `;
  }

export function buildYearDomainBlock(num: number, year: number, age: number, name: string): string {
  const safeName = escapeHtml(name);
  const safeYear = escapeHtml(String(year));
  const safeAge = escapeHtml(String(age));
    const n = num || 1;
    const domainFn = PERSONAL_YEAR_DOMAINS[n]
      || PERSONAL_YEAR_DOMAINS[n % 9 || 9];
    if (!domainFn) return '';
    const d = domainFn(safeName, safeYear, safeAge);

    // ── Summary/tagline cho từng domain × vận số ──────────────────────────────
    const DOMAIN_SUMMARIES: Record<number, Record<string, string>> = {
      1: {
        tinhYeu: 'Độc lập trong tình yêu — cần không gian để phát triển',
        suNghiep: 'Thời điểm vàng để bắt đầu những điều chưa từng thử',
        taiChinh: 'Đầu tư vào chính mình — lợi nhuận sẽ theo sau',
        giaoTiepXaHoi: 'Gây ấn tượng bằng sự tự tin và năng lượng tiên phong',
        hocTap: 'Học những gì bạn thực sự muốn, theo cách riêng của bạn',
        honNhan: 'Xác định lại vai trò — để cả hai cùng được tự do phát triển',
      },
      2: {
        tinhYeu: 'Thời gian của sự lắng nghe và kết nối sâu sắc',
        suNghiep: 'Hợp tác đúng người — nhân bội sức mạnh lên gấp đôi',
        taiChinh: 'Kiên nhẫn chờ thời — tránh quyết định tài chính vội vàng',
        giaoTiepXaHoi: 'Xây cầu nối bền — mỗi mối quan hệ đều có giá trị tiềm ẩn',
        hocTap: 'Học tốt nhất khi có người đồng hành cùng tiến',
        honNhan: 'Hiểu sâu hơn để yêu đúng hơn và bền vững hơn',
      },
      3: {
        tinhYeu: 'Yêu vui vẻ, nhẹ nhàng và đầy sáng tạo',
        suNghiep: 'Để sáng tạo dẫn lối — ý tưởng là tài sản lớn nhất năm nay',
        taiChinh: 'Cơ hội đến từ những kết nối và dự án sáng tạo bất ngờ',
        giaoTiepXaHoi: 'Là ngọn đèn trong phòng — năng lượng bạn lan tỏa rất xa',
        hocTap: 'Học bằng trải nghiệm, niềm vui và sự khám phá',
        honNhan: 'Nuôi dưỡng tình yêu bằng sự vui tươi và những điều mới mẻ',
      },
      4: {
        tinhYeu: 'Xây nền tảng bền vững — tình yêu cần hành động, không chỉ lời nói',
        suNghiep: 'Làm tới đâu chắc chắn tới đó',
        taiChinh: 'Tiết kiệm và kỷ luật — nền tảng tài chính được đặt từ đây',
        giaoTiepXaHoi: 'Uy tín được xây bằng sự nhất quán trong từng lời nói và hành động',
        hocTap: 'Học sâu, học kỹ — chiều sâu chuyên môn tạo sự khác biệt thực sự',
        honNhan: 'Đặt nền móng vững chắc cho tương lai chung dài hạn',
      },
      5: {
        tinhYeu: 'Tình yêu cần không gian tự do để tỏa sáng đúng nghĩa',
        suNghiep: 'Cơ hội bất ngờ xuất hiện — hãy sẵn sàng nắm bắt ngay',
        taiChinh: 'Đa dạng hóa nguồn thu nhập — đừng đặt tất cả vào một giỏ',
        giaoTiepXaHoi: 'Kết nối rộng và đa dạng — thế giới là sân chơi của bạn',
        hocTap: 'Học qua trải nghiệm thực tế và va chạm đa chiều',
        honNhan: 'Thiết lập ranh giới lành mạnh giữa tự do cá nhân và cam kết',
      },
      6: {
        tinhYeu: 'Tình yêu chín muồi — cho đi và nhận lại trong cân bằng',
        suNghiep: 'Phục vụ và chăm sóc — đây là thế mạnh lớn nhất của bạn',
        taiChinh: 'Đầu tư vào tổ ấm và gia đình — xứng đáng từng đồng bỏ ra',
        giaoTiepXaHoi: 'Trở thành chỗ dựa — kết nối bền chặt được xây từ sự quan tâm',
        hocTap: 'Học để chia sẻ — kiến thức có ý nghĩa nhất khi phục vụ người khác',
        honNhan: 'Năm tốt nhất để cam kết hoặc tái cam kết lời hứa thiêng liêng',
      },
      7: {
        tinhYeu: 'Tình yêu cần chiều sâu — hơn là bề mặt hào nhoáng bên ngoài',
        suNghiep: 'Đào sâu chuyên môn — sự xuất sắc đến từ sự chuyên biệt thực sự',
        taiChinh: 'Hiểu rõ dòng tiền và rủi ro trước khi hành động bất kỳ điều gì',
        giaoTiepXaHoi: 'Chọn lọc kỹ lưỡng — chất lượng kết nối hơn số lượng quan hệ',
        hocTap: 'Năm của sự học hỏi thực sự sâu sắc — hãy tận dụng triệt để',
        honNhan: 'Dành không gian riêng cho nhau — một phần quan trọng của yêu thương',
      },
      8: {
        tinhYeu: 'Cân bằng giữa tham vọng cá nhân và chất lượng mối quan hệ',
        suNghiep: 'Thu hoạch thành quả — đây là thời điểm bứt phá mạnh mẽ nhất',
        taiChinh: 'Năm của sự thịnh vượng nếu hành động đúng và quyết đoán',
        giaoTiepXaHoi: 'Mở rộng mạng lưới ảnh hưởng — địa vị được người khác công nhận',
        hocTap: 'Học để tạo ra kết quả thực tế và ứng dụng trực tiếp vào sự nghiệp',
        honNhan: 'Đừng để tham vọng công việc che khuất người bạn yêu',
      },
      9: {
        tinhYeu: 'Tha thứ và buông bỏ — tình yêu cần không gian mới để hồi sinh',
        suNghiep: 'Hoàn thành những gì còn dang dở — để sẵn sàng cho một khởi đầu mới',
        taiChinh: 'Cho đi để nhận lại — quy luật tuần hoàn thiêng liêng của số 9',
        giaoTiepXaHoi: 'Kết thúc lành mạnh — mọi lời chào tạm biệt đều là khởi đầu mới',
        hocTap: 'Tổng kết và suy ngẫm — bài học đắt giá nhất đến từ những gì đã qua',
        honNhan: 'Tha thứ — cho người kia và quan trọng hơn, cho chính mình',
      },
    };

    const sumLines = DOMAIN_SUMMARIES[n] || {};

    const renderDomain = (icon: string, label: string, summaryKey: string, content: string) => {
      const summary = sumLines[summaryKey] || '';
      return `
      <div class="py-domain">
        <div class="py-domain-title">${icon} ${label}:</div>
        ${summary ? `<div class="py-domain-summary">${summary}</div>` : ''}
        <div class="py-domain-body">${content || ''}</div>
      </div>`;
    };

    return `
    <div class="py-year-block">
      <div class="py-year-header">
        <span class="py-year-label">NĂM ${safeYear}</span>
        <span class="py-year-badge">VẬN SỐ ${n}</span>
        <span class="py-year-age">${safeAge} tuổi</span>
      </div>

      ${renderDomain('💑', 'Tình yêu của bạn trong năm này', 'tinhYeu', d.tinhYeu)}
      ${renderDomain('💼', 'Sự nghiệp của bạn trong năm này', 'suNghiep', d.suNghiep)}
      ${renderDomain('💰', 'Tài chính của bạn trong năm này', 'taiChinh', d.taiChinh)}
      ${renderDomain('🤝', 'Giao tiếp xã hội của bạn trong năm này', 'giaoTiepXaHoi', d.giaoTiepXaHoi)}
      ${renderDomain('📚', 'Học tập của bạn trong năm này', 'hocTap', d.hocTap)}
      ${renderDomain('💍', 'Hôn nhân của bạn trong năm này', 'honNhan', d.honNhan)}
    </div>`;
  }

export function personalMonthDeep(item: IndicatorResult & { year: number; month: number }, name: string): string {
  return `<article class="year-card-deep">
    <div class="year-card-deep-head"><span>THÁNG ${item.month}/${item.year}</span><strong>VẬN SỐ ${item.number}</strong></div>
    ${personalPeriod(`Tháng ${item.month}`, item.number, `${item.month}/${item.year}`, name, item.data)}
  </article>`;
}

export type LifeCycleAdvice = {
  career?: string;
  finance?: string;
  health?: string;
  relationship?: string;
  avoid?: string;
};

export type LifeCycleDeepEntry = {
  theme: string;
  paragraphs: string[];
  lesson: string;
  advice?: LifeCycleAdvice;
};

export type LifeCyclePhaseExtraEntry = {
  gieoHat?: string;
  truongThanh?: string;
  vienMan?: string;
};

export function lifeCycleNarrative(
  cycleNum: number,
  num: number,
  period: string,
  name: string,
  kbData?: { theme?: string; cycle1?: string; cycle2?: string; cycle3?: string },
): string {
    const safeName = escapeHtml(name);
    const stageLabels: Record<number, { title: string; shortName: string }> = {
      1: { title: 'Chu kỳ Nền Tảng (Hình Thành)', shortName: 'Hình Thành' },
      2: { title: 'Chu kỳ Xây Dựng (Trưởng Thành)', shortName: 'Trưởng Thành' },
      3: { title: 'Chu kỳ Thu Hoạch (Viên Mãn)', shortName: 'Viên Mãn' },
    };

    // Deep narratives: [cycleNum][num] = { theme, paragraphs[], lesson }
    const deepNarrative: Record<number, Record<number, LifeCycleDeepEntry>> = {
      // ══════════ CHU KỲ 1 — NỀN TẢNG (HÌNH THÀNH) ══════════
      1: {
        1: {
          theme: 'Ngọn lửa đầu đời — Tự khẳng định giữa sóng gió',
          paragraphs: [
            `Trong những năm tháng đầu đời, <strong>${safeName}</strong> mang trong mình năng lượng của số <strong>1</strong> — một ngọn lửa tự khẳng định hiếm gặp ở độ tuổi còn chưa đủ lớn để hiểu tại sao mình lại khác biệt. Bạn không phải đứa trẻ "ngoan" theo nghĩa thụ động — bạn có ý kiến riêng, bạn muốn tự mình làm mọi thứ, và bạn cảm thấy bất an khi bị kiểm soát quá mức. Đây không phải là sự nổi loạn — đây chính là linh hồn tiên phong đang hình thành.`,
            `Những trải nghiệm quan trọng nhất của chu kỳ này thường đến từ những lần <em>bạn bị ai đó gạt sang một bên</em> — không được lắng nghe, không được chọn, không được đứng đầu. Mỗi lần như vậy, trong bạn có thứ gì đó không chịu gập lại. Đó là hạt giống của ý chí lãnh đạo — và dù giai đoạn này có thể đau, nó đang rèn nên thứ không gì có thể bẻ gãy về sau. Bạn cũng học được rằng <strong>sự độc lập không phải là sự lạnh lùng</strong> — mà là biết mình muốn gì ngay cả khi thế giới chưa sẵn sàng nghe.`,
            `Gia đình và môi trường của chu kỳ đầu đời ảnh hưởng lớn đến cách bạn nhìn nhận quyền lực. Nếu bạn được nuôi dưỡng bởi những người biết tôn trọng ý kiến của bạn, bạn lớn lên với sự tự tin lành mạnh. Nếu không, bạn sẽ mang theo một vết thương nhỏ — cảm giác rằng mình phải <em>chiến đấu để tồn tại đúng nghĩa bản thân</em>. Nhưng dù hành trình nào, số 1 trong chu kỳ 1 hứa hẹn điều này: bạn sẽ không giống ai khác — và đó chính xác là điều vũ trụ muốn.`,
          ],
          lesson: `Bài học tâm linh của chu kỳ này không phải là học cách "ngoan hơn" — mà là học cách <strong>tin vào bản năng của chính mình</strong>, ngay cả khi chưa ai xác nhận rằng bạn đúng.`
        },
        2: {
          theme: 'Thế giới cảm xúc — Lớn lên trong sự nhạy cảm',
          paragraphs: [
            `Tuổi thơ và những năm đầu đời của <strong>${safeName}</strong> được bao phủ bởi năng lượng dịu dàng và sâu sắc của số <strong>2</strong>. Trong khi những đứa trẻ khác có thể chạy nhảy ầm ĩ, bạn thường là người ngồi quan sát — cảm nhận mọi thứ với độ nhạy cảm cao đến mức đôi khi tự ngạc nhiên về chính mình. Bạn biết khi nào mẹ buồn trước khi mẹ nói. Bạn nhận ra khi bạn bè không ổn chỉ qua một ánh mắt. Khả năng đọc người này không phải do học — đó là món quà thiên bẩm mà số 2 trao cho bạn.`,
            `Giai đoạn nền tảng với số 2 thường có những bài học đau đớn xung quanh chủ đề <em>ranh giới và lòng tự trọng</em>. Vì quá nhạy cảm và muốn làm mọi người hài lòng, bạn dễ trở thành người mà ai cũng tìm đến khi cần — nhưng hiếm ai hỏi bạn đang cảm thấy gì. Những trải nghiệm này, dù có phần tổn thương, đang dạy bạn một bài học tinh tế nhất mà con người có thể học: <strong>sự khác biệt giữa yêu thương và tự hủy hoại bản thân</strong>.`,
            `Môi trường gia đình và những mối quan hệ đầu đời in sâu vào cách bạn định nghĩa tình yêu. Bạn học cách yêu từ những người xung quanh — và nếu những mô hình đó lành mạnh, bạn lớn lên với khả năng kết nối sâu sắc hiếm ai có. Nếu không, bạn cần thêm thời gian để định nghĩa lại: <em>yêu thương không có nghĩa là mất đi chính mình.</em> Số 2 ở chu kỳ đầu đời đang xây dựng cho bạn một trái tim biết cảm — và đó chính là nền tảng của mọi điều bạn sẽ tạo ra về sau.`,
          ],
          lesson: `Bài học lớn nhất của giai đoạn này là <strong>học cách nhận sự quan tâm với cùng sự ân sủng mà bạn dành để cho đi</strong>. Bạn xứng đáng được quan tâm — không phải chỉ là người quan tâm.`
        },
        3: {
          theme: 'Ánh sáng trẻ thơ — Thế giới là sân khấu của bạn',
          paragraphs: [
            `Tuổi thơ của <strong>${safeName}</strong> với số <strong>3</strong> thường là một bức tranh đầy màu sắc — tiếng cười, những câu chuyện bất tận, những ý tưởng kỳ lạ và một năng lượng gây lây lan theo nghĩa đen nhất. Bạn không cần cố gắng để được chú ý — bạn tự nhiên chiếm lấy không gian bằng sự tồn tại vui vẻ và sáng tạo của mình. Trẻ em khác muốn chơi cùng bạn. Người lớn nhớ đến bạn. Và bạn — thường không biết mình đang làm gì kỳ diệu đến vậy.`,
            `Nhưng bên dưới vẻ ngoài tươi sáng đó, giai đoạn đầu đời của số 3 cũng ẩn chứa những bài học khó hơn. Vì tư duy nhảy múa và không tuyến tính, bạn thường bị gán nhãn là "thiếu tập trung" hay "không hoàn thành được điều gì". Môi trường học thuật cứng nhắc là kẻ thù của linh hồn số 3 — và nếu bạn từng bị bảo rằng mình "không đủ nghiêm túc", hãy biết đây: <strong>hệ thống đó được tạo ra cho số 4, không phải cho số 3.</strong> Thiên phú của bạn nằm ở những nơi người khác không nghĩ đến.`,
            `Điều quan trọng nhất của chu kỳ nền tảng với số 3 là <em>sự biểu đạt</em>. Bạn cần — theo nghĩa sinh tồn — được nói lên, được sáng tạo, được kể chuyện. Khi điều này bị bóp nghẹt, bạn có thể trở nên nội tâm theo cách đau đớn hoặc bùng phát theo những hướng không lành mạnh. Khi được nuôi dưỡng đúng cách, thứ nảy sinh từ tuổi thơ của số 3 là một con người có khả năng chạm đến trái tim người khác bằng ngôn từ và nghệ thuật theo cách không ai dạy được.`,
          ],
          lesson: `Giai đoạn đầu đời dạy bạn rằng <strong>niềm vui không phải là sự phù phiếm — đó là sức mạnh</strong>. Và đường dài nhất bạn có thể đi là đường đi qua sự im lặng của chính mình.`
        },
        4: {
          theme: 'Nền móng vững — Học cách tin vào kỷ luật',
          paragraphs: [
            `Tuổi thơ và giai đoạn đầu đời mang số <strong>4</strong> của <strong>${safeName}</strong> thường gắn liền với cảm giác về <em>trách nhiệm</em> — đôi khi nặng hơn so với tuổi tác. Bạn là đứa trẻ biết gọn gàng đồ chơi sau khi chơi xong, người sẽ nhắc nhở bạn bè đến đúng giờ và thường bị coi là "già hơn tuổi". Điều này không phải vì bạn thiếu sự tinh nghịch — mà vì trong linh hồn bạn có một thứ rất thực: <strong>sự tôn trọng đối với trật tự và công bằng</strong>.`,
            `Giai đoạn nền tảng với số 4 dạy bạn giá trị của sự kiên nhẫn thông qua những trải nghiệm đòi hỏi bạn phải chờ đợi — chờ đến lượt mình, chờ kết quả của công sức bỏ ra, chờ người khác nhận ra giá trị của bạn. Những lần chờ đó không phải sự trừng phạt. Chúng đang xây dựng trong bạn một thứ mà người ta thường mất cả đời để học: <strong>niềm tin rằng nỗ lực đúng hướng cuối cùng sẽ sinh trái</strong>. Không phải ngay lập tức — nhưng chắc chắn.`,
            `Môi trường gia đình của chu kỳ này có tác động lớn đến cách bạn định nghĩa "giá trị". Nếu bạn được dạy rằng chăm chỉ là đức tính cao quý, bạn lớn lên với một cơ sở đạo đức vững chắc. Nếu bạn bị gánh nặng quá mức ngay từ nhỏ, bạn có thể mang theo nỗi lo sợ rằng mình không bao giờ <em>"làm đủ"</em>. Bài học của giai đoạn này là tìm ra ranh giới giữa kỷ luật lành mạnh và sự tự trừng phạt không cần thiết.`,
          ],
          lesson: `Số 4 trong chu kỳ đầu đời trao cho bạn thứ quý giá hơn mọi tài năng: <strong>sự kiên định</strong>. Và từ kiên định, mọi điều vĩ đại đều có thể được xây dựng.`
        },
        5: {
          theme: 'Tuổi thơ phiêu lưu — Học cách sống với sự không chắc chắn',
          paragraphs: [
            `Giai đoạn đầu đời của <strong>${safeName}</strong> với năng lượng số <strong>5</strong> thường là một bộ phim phiêu lưu đầy màu sắc — thay đổi trường học, chuyển nhà, những người bạn mới và những thử thách bất ngờ xuất hiện liên tục. Trong khi đây có thể là điều khó khăn với nhiều đứa trẻ khác, bạn — dù đôi khi khóc vì phải chia tay — lại có một khả năng kỳ lạ: <strong>thích nghi nhanh đến mức đáng ngạc nhiên</strong>. Mỗi môi trường mới là một thế giới mới để khám phá, không phải mối đe dọa.`,
            `Sự tò mò trí tuệ của bạn trong giai đoạn này là vô hạn. Bạn muốn biết tại sao bầu trời có màu xanh, tại sao người lớn lại làm những điều họ làm, và có bao nhiêu cách khác nhau để giải quyết cùng một vấn đề. Đây không phải sự xao nhãng — đây là <em>tư duy của một linh hồn đang khám phá bức tranh lớn hơn của cuộc đời</em>. Những câu hỏi bạn đặt ra ở giai đoạn này đôi khi không có câu trả lời ngay — nhưng chúng đang định hình cách bạn tiếp cận thế giới cho đến cuối cuộc đời.`,
            `Thách thức lớn nhất của chu kỳ đầu đời với số 5 là <em>tìm thấy bản sắc ổn định giữa những thay đổi liên tục</em>. Khi mọi thứ xung quanh cứ thay đổi, bạn cần học cách xác định những gì là cốt lõi không thể lay chuyển của "bạn" — không phải môi trường, không phải mối quan hệ, không phải hoàn cảnh — mà là bản thân bạn. Khi tìm được điều đó, bạn trở thành người có thể đứng vững trong bất kỳ cơn bão nào.`,
          ],
          lesson: `Giai đoạn nền tảng với số 5 dạy bạn điều quan trọng nhất: <strong>sự tự do không đến từ việc không có ràng buộc — mà đến từ việc biết chính xác bạn là ai khi mọi thứ thay đổi</strong>.`
        },
        6: {
          theme: 'Trái tim nuôi dưỡng — Học cách yêu không điều kiện',
          paragraphs: [
            `Tuổi thơ của <strong>${safeName}</strong> với số <strong>6</strong> thường gắn liền với một cảm giác rất đặc biệt: <em>cảm giác có trách nhiệm với người khác ngay từ khi còn nhỏ.</em> Bạn có thể là người anh/chị luôn nhường em, đứa con luôn để ý xem bố mẹ có vui không, người bạn luôn ở lại an ủi khi người khác buồn. Trái tim bạn to lớn đến mức đôi khi nặng hơn cơ thể nhỏ bé có thể gánh.`,
            `Gia đình là trung tâm vũ trụ của bạn trong giai đoạn này — và cách gia đình vận hành sẽ in sâu vào định nghĩa của bạn về tình yêu. Nếu bạn được lớn lên trong một môi trường ấm áp và lành mạnh, bạn mang theo mẫu hình đó và tái tạo nó ở bất kỳ nơi nào bạn đặt chân. Nếu gia đình có nhiều vết nứt, bạn thường trở thành người cố keo lại mọi thứ — đôi khi là bằng chính sức khỏe tinh thần của mình. <strong>Đây là gánh nặng mà không đứa trẻ nào đáng phải gánh một mình.</strong>`,
            `Chu kỳ đầu với số 6 đặt nền móng cho một đặc điểm sẽ theo bạn suốt đời: <em>khả năng tạo ra sự ấm áp trong bất kỳ không gian nào bạn bước vào.</em> Đây không chỉ là kỹ năng — đây là thiên phú. Nhưng để phát huy nó lành mạnh, bạn cần học từ giai đoạn này một bài học tinh vi: rằng chăm sóc người khác và chăm sóc bản thân không phải là hai lựa chọn đối lập — chúng phải đi cùng nhau.`,
          ],
          lesson: `Giai đoạn nền tảng với số 6 đang dạy bạn rằng <strong>tình yêu thực sự bắt đầu từ việc yêu bản thân đủ để không cần ai cứu bạn</strong>. Khi bạn học được điều này, bạn trở thành người có thể yêu thương mà không mất đi chính mình.`
        },
        7: {
          theme: 'Tâm hồn nội tâm — Đứa trẻ đặt câu hỏi về tất cả',
          paragraphs: [
            `Giai đoạn đầu đời của <strong>${safeName}</strong> với số <strong>7</strong> thường khá khác biệt so với những đứa trẻ cùng trang lứa. Bạn ít thích những trò chơi ầm ĩ hơn — bạn thích quan sát, suy nghĩ, và đặt câu hỏi về những thứ mà người lớn đã từ lâu ngừng thắc mắc. <em>"Tại sao mọi người lại phải chết?"</em> hay <em>"Thực sự thế giới có bắt đầu không?"</em> — đây là những câu hỏi điển hình của một đứa trẻ số 7, và không phải giáo viên hay phụ huynh nào cũng biết cách trả lời.`,
            `Sự khác biệt này đôi khi tạo ra cảm giác cô đơn. Bạn không dễ dàng hòa vào đám đông — không phải vì bạn kiêu ngạo, mà vì bạn cần sự kết nối ở chiều sâu mà ít người cùng tuổi có thể đáp ứng. Bạn thường tìm bạn trong sách, trong thiên nhiên, trong những sở thích "lạ" so với chuẩn mực. Và ở những nơi tưởng chừng cô đơn đó, bạn đang xây dựng thứ vô giá nhất của cuộc đời mình: <strong>một thế giới nội tâm phong phú và sâu sắc không ai có thể lấy đi.</strong>`,
            `Chu kỳ đầu với số 7 cũng thường mang những trải nghiệm giúp bạn học cách <em>tin vào trực giác của mình</em>. Có thể bạn biết điều gì đó "không đúng" trước khi ai kịp nhận ra. Có thể bạn cảm nhận được sự giả dối trong người lớn trước khi họ nói dối. Những khả năng nhận thức sắc bén này không phải trí tưởng tượng — đó là trực giác đang được mài sắc từng ngày.`,
          ],
          lesson: `Số 7 ở chu kỳ đầu đời trao cho bạn thứ hiếm nhất trong thế giới hiện đại: <strong>khả năng sống với những câu hỏi không có câu trả lời — và tìm thấy vẻ đẹp trong sự bí ẩn đó thay vì lo sợ nó</strong>.`
        },
        8: {
          theme: 'Sức mạnh thử lửa — Học cách đứng dậy từ thất bại đầu đời',
          paragraphs: [
            `Giai đoạn đầu đời của <strong>${safeName}</strong> với số <strong>8</strong> thường không thiếu những thách thức — đôi khi khắc nghiệt hơn so với những gì một đứa trẻ nên phải đối mặt. Có thể là những khó khăn về vật chất, có thể là sự thiếu công nhận, hoặc những tình huống đòi hỏi bạn phải mạnh mẽ khi chưa đủ lớn để hiểu tại sao. Nhưng đây chính là lò luyện thép của cuộc đời bạn — và mỗi lần vượt qua, bạn tích lũy thêm một tầng sức mạnh mà về sau sẽ trở thành vũ khí mạnh nhất của mình.`,
            `Bạn học từ rất sớm rằng thế giới không tự đến với ai — người ta phải tự mở đường. Điều này tạo ra trong bạn một <em>bản năng tự lực và tư duy chiến lược</em> đặc biệt: bạn quan sát cách thứ hoạt động, bạn học cách đọc người, và bạn phát triển khả năng nhìn thấy cơ hội trong những nơi người khác chỉ thấy vấn đề. <strong>Tư duy này không phải từ sách giáo khoa — nó đến từ những trận chiến thực sự của cuộc đời bạn.</strong>`,
            `Mối quan hệ với tiền bạc, quyền lực và uy tín được định hình mạnh mẽ trong giai đoạn đầu đời này. Nếu bạn lớn lên trong sự thiếu hụt, bạn có thể mang theo một nỗi sợ vô thức về việc trở lại trạng thái đó — một nỗi sợ có thể thúc đẩy bạn đến thành công, nhưng cũng có thể làm bạn không bao giờ cảm thấy đủ. Nhận ra và chữa lành mối quan hệ với "sự giàu có" là một trong những hành trình quan trọng nhất của số 8.`,
          ],
          lesson: `Giai đoạn nền tảng với số 8 tạo ra một điều không thể giả tạo: <strong>sức bền thực sự — loại sức bền chỉ đến từ việc đã ngã và đã đứng dậy đủ nhiều lần để biết mình có thể làm điều đó mãi mãi</strong>.`
        },
        9: {
          theme: 'Tuổi thơ với tâm hồn cổ đại — Buông bỏ để lớn lên',
          paragraphs: [
            `Giai đoạn đầu đời của <strong>${safeName}</strong> với số <strong>9</strong> thường mang theo một cảm giác kỳ lạ: <em>bạn dường như "già hơn tuổi" theo nghĩa cảm xúc và tâm linh.</em> Bạn có lòng trắc ẩn sâu sắc với những người đau khổ — ngay cả khi còn nhỏ, bạn cảm thấy đau trước sự bất công theo cách không phải ai cũng có. Và bạn thường đặt câu hỏi về ý nghĩa của những điều xung quanh — tại sao người nghèo khổ, tại sao chiến tranh, tại sao mọi thứ không công bằng hơn.`,
            `Chu kỳ đầu với số 9 thường đi kèm với những mất mát hoặc những kết thúc quan trọng — người thân qua đời, người bạn chuyển đi, ngôi trường phải chia tay, một ước mơ bị bỏ lại. Mỗi mất mát này, dù đau, đang dạy bạn bài học tinh tế nhất mà số 9 cần học: <strong>sự buông bỏ không phải là thất bại — đó là bước đầu tiên của sự tự do.</strong> Khi bạn học cách không bám víu vào những gì đã qua, bạn tạo ra không gian cho điều lớn hơn bước vào.`,
            `Lòng vị tha của bạn trong giai đoạn này có thể đôi khi khiến bạn bỏ qua nhu cầu của chính mình. Bạn yêu quá rộng — và điều đó đẹp. Nhưng nếu không học cách yêu bản thân với cùng sự rộng lượng đó, bạn sẽ mang theo một vết thương ẩn trong suốt cuộc đời: cảm giác rằng mình chỉ có giá trị khi phục vụ người khác. <em>Đây là vết thương cần được nhìn thấy và chữa lành.</em>`,
          ],
          lesson: `Số 9 trong chu kỳ đầu đời hứa hẹn điều này: <strong>mọi điều bạn mất trong giai đoạn này đều đang dọn dọn chỗ cho điều lớn hơn mà bạn chưa thể thấy từ vị trí hiện tại</strong>. Hãy tin vào quá trình.`
        },
        11: {
          theme: 'Linh hồn nhạy cảm — Trưởng thành giữa hai thế giới',
          paragraphs: [
            `Tuổi thơ của <strong>${safeName}</strong> với số chủ <strong>11</strong> thường là một hành trình đặc biệt và không dễ dàng. Bạn cảm nhận mọi thứ ở một chiều sâu mà người xung quanh — kể cả bố mẹ — đôi khi không thể hiểu được. Bạn có thể biết ai đó đang buồn hoặc đang có ý định không tốt chỉ bằng trực giác. Bạn có những giấc mơ sống động, những linh cảm chính xác một cách khó lý giải, và đôi khi cảm thấy như mình nhìn thấy thứ gì đó mà người khác không thấy. Điều này có thể rất cô đơn.`,
            `Giai đoạn đầu đời với số 11 thường đi kèm với <em>sự nhạy cảm cực cao</em> — bạn hấp thụ năng lượng của môi trường xung quanh như miếng bọt biển, đặc biệt là những căng thẳng và xung đột trong gia đình. Bạn có thể bị lo âu, mất ngủ, hoặc có những phản ứng cảm xúc mạnh mẽ với những sự kiện mà người khác thấy bình thường. Đây không phải sự yếu đuối — <strong>đây là dấu hiệu của một hệ thống cảm nhận đặc biệt đang phát triển</strong>. Bạn cần được bảo vệ và nuôi dưỡng, không phải bị bảo là "đừng nhạy cảm quá".`,
            `Sứ mệnh lớn nhất của chu kỳ đầu đời với số 11 là <em>học cách sống với hai thế giới song song</em>: thế giới vật chất hàng ngày và thế giới nội tâm phong phú với những nhận thức tinh tế. Những đứa trẻ số 11 thường tìm được chỗ trú trong nghệ thuật, âm nhạc, văn chương — bất cứ thứ gì cho phép chuyển hóa những gì cảm nhận được thành hình thức có thể chia sẻ. Đây là cách số 11 sinh tồn và phát triển trong thế giới vật chất.`,
          ],
          lesson: `Giai đoạn đầu đời trao cho số 11 thứ quý giá nhất: <strong>chiều sâu cảm xúc và trực giác được mài sắc qua những khó khăn — và đây chính là nguồn sức mạnh cho sứ mệnh mà bạn mang theo suốt cuộc đời</strong>.`
        },
        22: {
          theme: 'Nền tảng vĩ đại — Học cách mang theo tầm nhìn',
          paragraphs: [
            `Tuổi thơ của <strong>${safeName}</strong> với số chủ <strong>22</strong> thường đặc biệt hơn những gì hoàn cảnh bề ngoài phản ánh. Bạn có những ý tưởng vượt xa độ tuổi — những kế hoạch, những giấc mơ về điều gì đó lớn hơn bình thường, và một cảm giác thầm lặng rằng mình được sinh ra để làm điều gì đó quan trọng mà chưa biết chính xác là gì. Đôi khi điều này làm bạn thất vọng với những gì đang có. Đôi khi nó là ngọn lửa bí mật giữ bạn tiến về phía trước.`,
            `Giai đoạn nền tảng với số 22 thường đòi hỏi bạn phát triển hai phẩm chất song song: <em>sự mơ mộng về những điều có thể và sự thực tế về cách làm điều đó thành hiện thực.</em> Số 22 là sự kết hợp của trực giác số 11 và kỷ luật số 4 — và trong giai đoạn đầu đời, bạn đang học cách tích hợp cả hai. Đây là bài học khó: làm sao để không đánh mất tầm nhìn khi đối mặt với thực tế, và không đánh mất thực tế khi bị cuốn theo tầm nhìn.`,
            `Những thách thức trong tuổi thơ của số 22 thường lớn hơn mức trung bình — như thể vũ trụ đang kiểm tra xem bạn có đủ sức mạnh để gánh vác những gì về sau sẽ được trao. <strong>Mỗi khó khăn bạn vượt qua trong giai đoạn này không chỉ rèn luyện cá nhân bạn — nó đang chuẩn bị cho bạn khả năng hiểu và dẫn dắt người khác qua những khó khăn tương tự.</strong>`,
          ],
          lesson: `Chu kỳ đầu của số 22 trao cho bạn điều không trường lớp nào có thể dạy: <strong>sự khôn ngoan thực tiễn đến từ việc đã sống qua đủ điều để biết rằng những gì lớn nhất đều được xây từ những nền tảng nhỏ bé và kiên nhẫn nhất</strong>.`
        },
      },

      // ══════════ CHU KỲ 2 — XÂY DỰNG (TRƯỞNG THÀNH) ══════════
      2: {
        1: {
          theme: 'Thời kỳ định hình — Biến ý chí thành di sản',
          paragraphs: [
            `Giai đoạn trưởng thành của <strong>${safeName}</strong> với năng lượng số <strong>1</strong> là thời kỳ của hàng triệu quyết định — mỗi ngày, mỗi giờ — định hình nên con người bạn sẽ trở thành. Đây không phải giai đoạn "thử nghiệm" như tuổi thơ. Đây là sân chơi thực sự, với tiền thật, mối quan hệ thật và hậu quả thật. Năng lượng số 1 trong chu kỳ này thúc bạn đến phía trước với tốc độ mà đôi khi chính bạn cũng ngạc nhiên — nhưng đây là lúc thiên phú lãnh đạo của bạn cần được biểu hiện, không phải chờ đợi.`,
            `Sự nghiệp và tầm ảnh hưởng là những chủ đề trung tâm. Bạn không hài lòng với việc là người thực hiện — bạn muốn là người định hướng. <em>Bạn có ý kiến về cách mọi thứ nên được làm, và thường bạn đúng hơn người ta nghĩ.</em> Thách thức là học cách biến sự quyết đoán này thành sức hút, không phải xung đột. Người lãnh đạo giỏi nhất không phải là người to tiếng nhất — mà là người khiến người khác muốn đi theo vì họ tin tưởng tầm nhìn đó.`,
            `Trong tình yêu và các mối quan hệ, giai đoạn này đặt ra câu hỏi quan trọng: <strong>bạn muốn đồng hành hay muốn người đi theo?</strong> Số 1 trong chu kỳ 2 cần học cách xây dựng mối quan hệ giữa hai người bình đẳng — không phải người dẫn và kẻ theo, không phải người quyết định và kẻ chấp nhận. Khi bạn tìm được người đủ mạnh để đứng cạnh chứ không đứng sau bạn, mối quan hệ đó sẽ là nền tảng của sức mạnh lớn nhất bạn từng có.`,
          ],
          lesson: `Thời kỳ xây dựng với số 1 dạy bạn rằng <strong>lãnh đạo thực sự không phải là đứng trên người khác — mà là đứng trước họ, chỉ đường và chịu trách nhiệm về những gì xảy ra sau lưng mình</strong>.`
        },
        2: {
          theme: 'Thời kỳ kết nối — Xây dựng những mối quan hệ thay đổi tất cả',
          paragraphs: [
            `Giai đoạn trưởng thành của <strong>${safeName}</strong> với năng lượng số <strong>2</strong> đặt con người lên trung tâm của mọi thứ. Đây là thời kỳ bạn nhận ra rằng <em>không ai có thể thực sự thành công một mình</em> — và sức mạnh thực sự của bạn không nằm ở việc làm mọi thứ một mình, mà ở khả năng xây dựng những liên minh, đối tác và mạng lưới tin tưởng đủ mạnh để nâng đỡ những mục tiêu lớn hơn bản thân.`,
            `Trong sự nghiệp, bạn thường tỏa sáng nhất ở vai trò mà người khác hay bỏ qua: người xây dựng đồng thuận, người hòa giải trong xung đột, người giữ mọi thứ không vỡ ra khi căng thẳng leo thang. <strong>Đóng góp thầm lặng nhất thường là đóng góp không thể thay thế nhất</strong> — và bạn là người hiểu điều này sâu sắc nhất. Hãy học cách đánh giá cao vai trò này của chính mình thay vì so sánh với những người ồn ào hơn.`,
            `Tình yêu và gia đình trong giai đoạn này thường chiếm vị trí quan trọng hơn hầu hết mọi thứ khác. Bạn đầu tư vào mối quan hệ bằng cả trái tim — và khi được đáp lại xứng đáng, bạn nở rộ theo những cách mà không ai ngoài người thân cận mới có thể nhận ra. Khi không được đáp lại, bạn có thể tàn héo trong im lặng. Bài học quan trọng nhất: <em>học cách nói ra những gì bạn cần trước khi nó trở thành vết thương không lành.</em>`,
          ],
          lesson: `Chu kỳ xây dựng với số 2 hứa hẹn điều này: <strong>những mối quan hệ bạn nuôi dưỡng trong giai đoạn này — bằng sự kiên nhẫn, sự lắng nghe và lòng chân thành — sẽ trở thành tài sản quý giá nhất của cuộc đời bạn</strong>.`
        },
        3: {
          theme: 'Mùa bứt phá sáng tạo — Tìm thấy tiếng nói của mình',
          paragraphs: [
            `Giai đoạn trưởng thành với số <strong>3</strong> là mùa bứt phá sáng tạo của <strong>${safeName}</strong>. Bạn giỏi nhất trong những lĩnh vực đòi hỏi ý tưởng và biểu đạt — viết, nói, thiết kế, giảng dạy, diễn xuất. Đây cũng là giai đoạn cần rèn thêm kỷ luật để hoàn thành những gì đã bắt đầu, tránh để tài năng rơi vào sự tản mạn.`,
            `Trong sự nghiệp, bạn tỏa sáng ở những nơi cần sự sáng tạo và kết nối con người. Bạn là người mang năng lượng vào phòng, người làm cho ý tưởng trở nên sống động và dễ hiểu hơn. Nhưng giai đoạn này cũng đòi hỏi bạn học cách <em>biến tài năng thành sản phẩm có giá trị thực tế</em> — không chỉ những buổi trình bày hay những ý tưởng đầy hứa hẹn, mà là những thứ hoàn chỉnh và tạo ra tác động thực.`,
            `Cuộc sống xã hội và tình yêu trong giai đoạn này phong phú và đôi khi hỗn độn. Bạn kết bạn dễ dàng — và đôi khi kết yêu cũng dễ dàng không kém. Thách thức là tìm ra người thực sự xứng đáng với sự đầu tư cảm xúc sâu hơn của bạn, không chỉ là những người mang lại sự phấn khích nhất thời. <strong>Chiều sâu của mối quan hệ đến không phải từ những người hấp dẫn nhất — mà từ những người ở lại khi sự phấn khích qua đi.</strong>`,
          ],
          lesson: `Giai đoạn xây dựng với số 3 dạy bạn điều quan trọng nhất: <strong>tài năng là hạt giống, nhưng kỷ luật mới là nước tưới — và chỉ khi kết hợp cả hai, những điều thực sự vĩ đại mới có thể nở rộ</strong>.`
        },
        4: {
          theme: 'Thời kỳ tích lũy — Những nền tảng được xây trong yên lặng',
          paragraphs: [
            `Giai đoạn trưởng thành của <strong>${safeName}</strong> với số <strong>4</strong> không phải giai đoạn hào nhoáng nhất — nhưng chắc chắn là giai đoạn quan trọng nhất. Đây là thời kỳ những quyết định đúng đắn được đưa ra không phải vì cảm hứng nhất thời mà vì sự tính toán kỹ lưỡng và kỷ luật bền bỉ. Mỗi thứ bạn xây trong giai đoạn này — sự nghiệp, tài chính, gia đình, thói quen — đều đang tạo nên nền móng cho những điều lớn hơn bạn sẽ đạt được trong giai đoạn sau.`,
            `Trong sự nghiệp, bạn nổi bật không phải vì sự hào phóng hay sự lôi cuốn — mà vì sự đáng tin cậy. <em>Bạn nói là làm, hứa là giữ</em>, và điều đó trong dài hạn xây dựng được uy tín mà không kỹ năng thuyết trình nào có thể tạo ra. Hãy kiên nhẫn — thành công của số 4 thường đến muộn hơn một chút so với những con số ồn ào hơn, nhưng khi đến, nó bền vững theo cách không gì có thể lung lay.`,
            `Trong gia đình và tình yêu, bạn là người xây dựng tổ ấm — không chỉ theo nghĩa đen, mà theo nghĩa cảm xúc. <strong>Bạn là người mà người thân biết họ có thể tin tưởng khi mọi thứ không ổn.</strong> Thách thức của giai đoạn này là tìm cách bảo vệ thời gian và năng lượng cho bản thân trong khi vẫn đáp ứng những trách nhiệm bạn coi là thiêng liêng. Kỷ luật với bản thân cũng cần thiết trong việc tự chăm sóc.`,
          ],
          lesson: `Chu kỳ xây dựng với số 4 hứa hẹn điều này: <strong>thứ bạn xây được trong giai đoạn im lặng này — từng viên gạch, từng thói quen, từng cam kết được giữ — sẽ là nền tảng mà cả phần còn lại của cuộc đời bạn đứng vững trên đó</strong>.`
        },
        5: {
          theme: 'Thời kỳ bứt phá — Những cánh cửa mới và những góc rẽ bất ngờ',
          paragraphs: [
            `Giai đoạn trưởng thành của <strong>${safeName}</strong> với số <strong>5</strong> thường là một bộ phim hành động nhiều tình tiết — thay đổi nghề nghiệp, di chuyển địa lý, những mối quan hệ bất ngờ và những cơ hội không ai tiên liệu được. Điều này có thể gây ra cảm giác không ổn định với người xung quanh, nhưng với bạn — khi được sống đúng với năng lượng số 5 — đây chính xác là cách cuộc đời nên vận hành. <em>Sự thay đổi không phải là kẻ thù của bạn. Đó là cách bạn tiến hóa.</em>`,
            `Trong sự nghiệp, bạn thường không phù hợp với những công việc tẻ nhạt và lặp đi lặp lại. Bạn cần sự đa dạng — cần được học những thứ mới, gặp những người mới và đối mặt với những thách thức không giống những gì đã qua. Những vị trí lý tưởng cho số 5 trong giai đoạn này là những nơi đòi hỏi sự linh hoạt và khả năng thích nghi: truyền thông, kinh doanh quốc tế, bán hàng, tư vấn, du lịch. <strong>Xem sự thay đổi nghề nghiệp như một chiến lược, không phải thất bại</strong> — đó là cách số 5 tiếp cận thị trường lao động khôn ngoan nhất.`,
            `Tình yêu và các mối quan hệ trong giai đoạn này thường phức tạp hơn những gì bạn dự tính. Bạn muốn tự do — nhưng cũng muốn kết nối thực sự. Hai điều này không phải mâu thuẫn, nhưng cần sự khéo léo để cân bằng. <em>Người bạn đời lý tưởng trong giai đoạn này không phải người giống bạn — mà là người đủ vững chắc để bạn có thể trở về sau mỗi chuyến phiêu lưu, nhưng cũng đủ tự do để không cố giam giữ bạn.</em>`,
          ],
          lesson: `Giai đoạn xây dựng với số 5 trao cho bạn thứ không thể học từ sách: <strong>khả năng điều hướng sự không chắc chắn với sự duyên dáng — không phải vì bạn không sợ, mà vì bạn đã quen đủ với sự thay đổi để biết rằng bạn luôn có thể tìm thấy con đường của mình</strong>.`
        },
        6: {
          theme: 'Thời kỳ gánh vác — Học cách yêu mà không mất mình',
          paragraphs: [
            `Giai đoạn trưởng thành của <strong>${safeName}</strong> với số <strong>6</strong> thường đặt nặng lên vai bạn những trách nhiệm thiêng liêng nhất — gia đình, con cái, cha mẹ già, cộng đồng. Đây là giai đoạn bạn trở thành <em>nơi nương tựa cho những người bạn yêu thương</em>, và điều đó vừa đẹp vừa nặng nề theo cách mà không ai ngoài bạn có thể hiểu hoàn toàn.`,
            `Trong sự nghiệp, bạn thường bị thu hút đến những lĩnh vực liên quan đến phục vụ và nuôi dưỡng: giáo dục, y tế, tư vấn, thiết kế không gian sống, nghệ thuật. Bạn làm tốt nhất khi công việc của mình có ý nghĩa rõ ràng với người khác — khi bạn có thể nhìn thấy tác động của mình trong cuộc sống của những người bạn phục vụ. <strong>Đừng để áp lực xã hội định nghĩa "thành công" theo những tiêu chuẩn không phù hợp với bản chất của bạn.</strong>`,
            `Thách thức lớn nhất của chu kỳ này là <em>ranh giới</em>. Bạn muốn giúp — nhưng không phải ai nhận sự giúp đỡ của bạn đều sử dụng nó đúng cách. Không phải mọi người đều xứng đáng với mức độ hy sinh mà bạn sẵn sàng thực hiện. Học cách phân biệt ai thực sự cần bạn và ai chỉ đang tiêu tốn năng lượng của bạn là bài học tối quan trọng của giai đoạn này — và nó cần được học trước khi bạn kiệt sức.`,
          ],
          lesson: `Giai đoạn xây dựng với số 6 dạy bạn điều không dễ nhưng cần thiết: <strong>tình yêu thương bền vững nhất không phải là tình yêu hy sinh tất cả — mà là tình yêu đến từ sự sung mãn của một trái tim cũng được yêu thương và chăm sóc đủ đầy</strong>.`
        },
        7: {
          theme: 'Thời kỳ đào sâu — Trở thành chuyên gia và nhà tư tưởng',
          paragraphs: [
            `Giai đoạn trưởng thành của <strong>${safeName}</strong> với số <strong>7</strong> là thời kỳ của sự tích lũy tri thức và chuyên môn sâu. Bạn không hài lòng với sự hiểu biết bề mặt — bạn muốn <em>hiểu thực sự</em>, muốn đi đến tận cùng của mỗi câu hỏi, muốn trở thành người mà người khác tìm đến khi họ cần sự thật thay vì sự an ủi. Đây là giai đoạn bạn xây dựng uy quyền tri thức theo nghĩa sâu sắc nhất.`,
            `Trong sự nghiệp, bạn thường xuất sắc nhất ở những lĩnh vực đòi hỏi sự tập trung dài hạn và tư duy phân tích: nghiên cứu, khoa học, tư vấn chiến lược, triết học, tâm lý học, công nghệ. Bạn không cần đám đông để thăng hoa — bạn cần sự yên tĩnh và không gian để tư duy. <strong>Hãy bảo vệ điều kiện làm việc này như một điều kiện sống còn, không phải đặc quyền.</strong>`,
            `Trong các mối quan hệ, giai đoạn này đòi hỏi bạn học cách <em>chia sẻ thế giới nội tâm phong phú của mình một cách có chọn lọc</em>. Bạn không cần phải mở lòng với tất cả mọi người — nhưng bạn cần ít nhất một hay hai người thực sự được phép bước vào. Sự cô đơn có chọn lọc là lành mạnh. Sự cô lập vì sợ hãi thì không — và bạn cần thành thật với bản thân về sự khác biệt này.`,
          ],
          lesson: `Giai đoạn xây dựng với số 7 tạo ra điều thế giới thực sự cần: <strong>những con người đã đủ dũng cảm để đi sâu — vào tri thức, vào bản thân, vào sự thật khó chịu — và có thể trở về với những hiểu biết mà người khác không thể đến được nếu không có người dẫn đường như bạn</strong>.`
        },
        8: {
          theme: 'Thời kỳ quyền lực — Thu hoạch những gì đã gieo',
          paragraphs: [
            `Giai đoạn trưởng thành của <strong>${safeName}</strong> với số <strong>8</strong> là thời kỳ mà những nỗ lực tích lũy từ trước bắt đầu sinh trái. Tài chính, địa vị, ảnh hưởng — những thứ này không đến ngẫu nhiên với số 8. Chúng đến như kết quả trực tiếp của sự kỷ luật, tầm nhìn chiến lược và khả năng không bỏ cuộc khi người khác đã từ bỏ lâu rồi. <em>Đây là giai đoạn để thu hoạch — nhưng cũng là giai đoạn để định nghĩa lại thành công bằng những tiêu chuẩn sâu sắc hơn tiền bạc và địa vị.</em>`,
            `Trong sự nghiệp, bạn thường ở vị trí lãnh đạo — chính thức hoặc không chính thức. Người ta tìm đến bạn để đưa ra quyết định, để xử lý tình huống khó, để tạo ra kết quả khi áp lực cao nhất. <strong>Bạn không nên từ chối vai trò này — nhưng bạn cần học cách không để nó tiêu hóa mọi phần khác của cuộc đời mình.</strong> Thành công mà cái giá là mất đi sức khỏe, gia đình hay sự bình an nội tâm không phải thành công — đó là sự trao đổi không cân xứng.`,
            `Sự thịnh vượng vật chất trong giai đoạn này cũng thường đi kèm với những bài kiểm tra về lòng chính trực: cơ hội cắt góc, những mối quan hệ chỉ vì lợi ích, những quyết định giữa cái gì đúng và cái gì có lợi. <em>Cách bạn đối diện với những bài kiểm tra này sẽ định hình di sản thực sự của bạn</em> — không phải con số tài khoản ngân hàng.`,
          ],
          lesson: `Giai đoạn xây dựng với số 8 dạy bạn bài học sâu sắc nhất về quyền lực: <strong>quyền lực thực sự không phải là khả năng kiểm soát người khác — mà là sự làm chủ đối với chính mình, ngay cả khi bạn có đủ sức để không cần làm vậy</strong>.`
        },
        9: {
          theme: 'Thời kỳ cống hiến — Mở rộng tình yêu ra thế giới',
          paragraphs: [
            `Giai đoạn trưởng thành của <strong>${safeName}</strong> với số <strong>9</strong> thường là thời kỳ mà bạn nhận ra một sự thật lớn: <em>những mục tiêu cá nhân đơn thuần không còn đủ khiến bạn bừng sáng.</em> Bạn cần điều gì đó lớn hơn bản thân — một sứ mệnh, một cộng đồng, một đóng góp có thể cảm nhận được trong thế giới rộng hơn bốn bức tường của cuộc đời riêng. Đây không phải ảo tưởng — đây là bản năng linh hồn của số 9 đang tự khẳng định.`,
            `Trong sự nghiệp, bạn thường bị thu hút đến những lĩnh vực có tác động xã hội rõ ràng: từ thiện, giáo dục, y tế, nghệ thuật có tầm ảnh hưởng, hoạt động cộng đồng. Nhưng ngay cả trong những ngành nghề bình thường, bạn tìm cách làm cho công việc của mình có ý nghĩa hơn — <strong>bằng cách chú ý đến con người đằng sau công việc, không chỉ kết quả của nó.</strong>`,
            `Giai đoạn này cũng thường đem đến những mất mát lớn — chia tay, kết thúc, những điều bạn yêu quý phải để lại phía sau. Số 9 ở chu kỳ 2 đang dạy bạn bài học thiêng liêng nhất: <em>buông bỏ không phải là từ bỏ — đó là hành động yêu thương sâu sắc nhất</em>, khi bạn nhận ra rằng giữ lấy đôi khi gây hại nhiều hơn là để đi.`,
          ],
          lesson: `Chu kỳ xây dựng với số 9 hứa hẹn điều này: <strong>khi bạn dám sống vì điều gì đó lớn hơn bản thân, cuộc đời bạn không trở nên nhỏ bé hơn — mà trở nên lớn hơn gấp nhiều lần theo những cách mà bạn sẽ chỉ hiểu khi nhìn lại về sau</strong>.`
        },
        11: {
          theme: 'Thời kỳ thức tỉnh — Sứ mệnh tâm linh bắt đầu hiện rõ',
          paragraphs: [
            `Giai đoạn trưởng thành của <strong>${safeName}</strong> với số chủ <strong>11</strong> thường mang theo một sự thức tỉnh — đôi khi từ từ, đôi khi đột ngột — về thứ mà bạn thực sự được sinh ra để làm. Đây là giai đoạn mà trực giác của bạn trở nên không thể phủ nhận: những linh cảm chính xác đến mức đáng sợ, những kết nối vô hình mà bạn bắt đầu học cách tin tưởng thay vì gạt đi. <em>Thế giới bên ngoài không cần biết điều bạn biết — bạn chỉ cần học cách hành động theo nó.</em>`,
            `Trong sự nghiệp, số 11 ở giai đoạn này thường tìm được con đường của mình ở những lĩnh vực kết hợp sự sáng tạo và tầm nhìn tâm linh: nghệ thuật, âm nhạc, viết lách, tư vấn tâm lý, giáo dục có chiều sâu, các phong trào xã hội. Bạn không phù hợp với những cấu trúc cứng nhắc — và sự nghiệp lý tưởng của bạn thường là những gì bạn tự tạo ra, không phải những gì ai đó thiết kế sẵn cho bạn.`,
            `Thách thức lớn nhất của giai đoạn này là <strong>học cách chuyển hóa sự nhạy cảm thành sức mạnh thay vì gánh nặng</strong>. Bạn cảm thấy nhiều — nhưng bạn cũng có thể bị kiệt sức vì hoàn cảnh và con người xung quanh nếu không học cách bảo vệ năng lượng của mình. Ranh giới không phải là bức tường — đó là sự bảo vệ thiêng liêng cho món quà mà bạn được trao để chia sẻ với thế giới.`,
          ],
          lesson: `Giai đoạn xây dựng với số 11 định nghĩa rõ nhất sứ mệnh của bạn: <strong>không phải để cứu vớt mọi người, mà để tỏa ánh sáng đúng thời điểm, đúng nơi, với đúng những người có thể nhận và biến nó thành điều gì đó tốt đẹp hơn cho thế giới này</strong>.`
        },
        22: {
          theme: 'Thời kỳ xây dựng di sản — Biến tầm nhìn thành hiện thực',
          paragraphs: [
            `Giai đoạn trưởng thành của <strong>${safeName}</strong> với số chủ <strong>22</strong> là thời kỳ mà tầm nhìn lớn bắt đầu gặp được những công cụ thực tế để hiện thực hóa. Đây là giai đoạn của những dự án quy mô vượt xa cá nhân — những thứ bạn xây dựng không chỉ cho bản thân mà cho nhiều người, không chỉ cho hôm nay mà cho nhiều năm về sau. <em>Cảm giác "phải làm điều gì đó lớn hơn" không còn là mơ hồ — nó trở thành kế hoạch cụ thể với những bước rõ ràng.</em>`,
            `Trong sự nghiệp, số 22 ở giai đoạn này thường ở vị trí kỳ lạ: bạn nhìn thấy những điều mà người khác chưa thấy, nhưng bạn cũng phải làm việc với thực tế mà người khác đang phải sống. Sự kết hợp giữa tầm nhìn tâm linh và kỷ luật thực tế — hai yếu tố cốt lõi của số 22 — phải được cân bằng liên tục. <strong>Những người vĩ đại nhất không phải những người chỉ mơ giỏi, cũng không phải những người chỉ thực thi giỏi — mà là những người làm được cả hai một lúc.</strong>`,
            `Áp lực trong giai đoạn này rất lớn — từ bên ngoài và từ bên trong. Từ bên ngoài, người ta kỳ vọng nhiều ở bạn. Từ bên trong, bạn kỳ vọng nhiều ở chính mình hơn bất kỳ ai. Học cách chia nhỏ tầm nhìn lớn thành những bước có thể thực hiện được từng ngày — đó là kỹ năng tối quan trọng. <em>Vĩ đại không được xây trong một ngày. Nó được xây từng viên gạch — với sự kiên nhẫn mà người từ bên ngoài không thể thấy.</em>`,
          ],
          lesson: `Chu kỳ xây dựng với số 22 hứa hẹn: <strong>khi bạn kiên trì với tầm nhìn của mình qua những năm tháng khó khăn và đôi khi cô đơn, thứ bạn tạo ra cuối cùng sẽ không chỉ thay đổi cuộc đời bạn — mà sẽ là điều mà nhiều người khác nhìn vào và tìm thấy can đảm để bắt đầu hành trình của chính họ</strong>.`
        },
      },

      // ══════════ CHU KỲ 3 — THU HOẠCH (VIÊN MÃN) ══════════
      3: {
        1: {
          theme: 'Viên mãn trong độc lập — Sống đúng với chính mình không cần chứng minh',
          paragraphs: [
            `Giai đoạn viên mãn của <strong>${safeName}</strong> với số <strong>1</strong> mang theo một sự tự do đặc biệt: <em>bạn không còn cần phải chứng minh mình là ai với bất kỳ ai.</em> Những năm tháng đầu đời tranh đấu để được nhìn nhận, những năm trưởng thành cố gắng khẳng định vị trí — tất cả đã qua. Giai đoạn này trao cho bạn đặc quyền quý giá nhất mà con người có thể có: sự tự do để sống hoàn toàn theo những gì bạn thực sự muốn, không phải những gì người khác kỳ vọng.`,
            `Đây là giai đoạn nhiều người mang số 1 thực sự bắt đầu tỏa sáng theo cách riêng — không phải vì họ đã cố gắng hơn, mà vì họ đã ngừng cố gắng chứng minh và bắt đầu <em>đơn giản là tồn tại</em> trong sức mạnh của chính mình. Những người xung quanh cảm nhận được sự khác biệt này — có một thứ gì đó ổn định, chắc chắn và chân thực trong bạn mà những năm trước chưa có.`,
            `Đóng góp của bạn trong giai đoạn này thường là sự chia sẻ kinh nghiệm và tầm nhìn — không phải qua việc lãnh đạo như trước, mà qua việc trở thành <strong>tấm gương sáng về điều có thể đạt được khi một người dám sống đúng với bản thân mình.</strong> Những người trẻ hơn nhìn vào bạn và thấy rằng họ không cần phải thu nhỏ bản thân để được chấp nhận — và đó là đóng góp lớn hơn nhiều so với bất kỳ thành tích nào.`,
          ],
          lesson: `Giai đoạn thu hoạch với số 1 là bằng chứng sống của một sự thật đơn giản: <strong>con người tự do nhất không phải là người không có ràng buộc — mà là người đã biết đủ về bản thân mình để không cần bất kỳ sự chấp thuận nào từ bên ngoài để cảm thấy trọn vẹn</strong>.`
        },
        2: {
          theme: 'Viên mãn trong kết nối — Tình yêu và sự trân trọng',
          paragraphs: [
            `Giai đoạn viên mãn của <strong>${safeName}</strong> với số <strong>2</strong> là thời kỳ đẹp nhất của những kết nối. Những mối quan hệ bạn đã đầu tư qua nhiều thập kỷ — tình bạn, gia đình, tình yêu — giờ mang lại những trái ngọt ngào theo cách mà bạn đã từng hy vọng nhưng chưa dám chắc. <em>Sự kiên nhẫn và lòng chân thành mà bạn đã gieo suốt cuộc đời đang trở về với bạn theo những hình thức đẹp đẽ nhất.</em>`,
            `Vai trò của bạn trong giai đoạn này thường chuyển từ người xây dựng kết nối sang <em>người gìn giữ và nuôi dưỡng những kết nối đó</em>. Bạn là người mà cả gia đình quay về, là người mà bạn bè tin tưởng chia sẻ những điều chưa nói với ai, là người mà cộng đồng nhỏ của bạn biết rằng sẽ luôn được chào đón ấm áp. Đây không phải vai trò nhỏ — đây là loại ảnh hưởng mà ít người có thể tạo ra.`,
            `Giai đoạn này cũng là thời điểm để bạn học cách <strong>nhận sự quan tâm với cùng vẻ duyên dáng mà bạn đã cho đi cả đời</strong>. Nếu bạn luôn là người chăm sóc, việc chấp nhận sự chăm sóc lại có thể cảm thấy kỳ lạ. Nhưng đây là bài học cuối cùng và đẹp nhất của số 2 — rằng yêu thương thực sự chảy theo hai chiều, và cho phép mình được yêu là một hành động dũng cảm và tuyệt đẹp.`,
          ],
          lesson: `Giai đoạn thu hoạch với số 2 trao cho bạn điều quý giá nhất: <strong>sự hiểu biết sâu sắc rằng cuộc đời đẹp nhất không phải là cuộc đời nhiều thành tích — mà là cuộc đời nhiều tình yêu thương thực sự được trao và được nhận theo cả hai chiều</strong>.`
        },
        3: {
          theme: 'Viên mãn trong sáng tạo — Di sản của những câu chuyện được kể',
          paragraphs: [
            `Giai đoạn viên mãn của <strong>${safeName}</strong> với số <strong>3</strong> thường là giai đoạn sáng tạo đỉnh cao — không phải vì kỹ thuật đỉnh cao (dù có thể vậy), mà vì <em>sự chân thực đỉnh cao.</em> Những gì bạn tạo ra trong giai đoạn này — dù là văn chương, âm nhạc, nghệ thuật, hay đơn giản là những câu chuyện bạn kể cho người yêu thương — đều mang theo chiều sâu của một người đã sống đủ lâu để biết điều gì thực sự quan trọng.`,
            `Bạn trở thành người kể chuyện của thế hệ mình — <strong>không phải vì bạn có câu chuyện hay nhất, mà vì bạn biết cách làm cho mọi câu chuyện trở thành thứ gì đó người khác có thể nhìn vào và thấy chính mình trong đó.</strong> Đây là món quà đặc biệt của số 3 ở giai đoạn viên mãn — không còn kể chuyện để được chú ý, mà kể chuyện để kết nối người với người qua những sự thật chung của con người.`,
            `Niềm vui vẫn là ngôn ngữ cốt lõi của bạn — nhưng giờ nó có thêm chiều sâu của người đã biết rằng niềm vui không phải là sự né tránh thực tế mà là cách chọn sống trong thực tế đó. <em>Sự vui vẻ của bạn trong giai đoạn này không phải vì cuộc sống hoàn hảo — mà vì bạn đã đủ khôn ngoan để nhận ra sự hoàn hảo trong những điều không hoàn hảo.</em>`,
          ],
          lesson: `Giai đoạn thu hoạch với số 3 để lại di sản đẹp nhất: <strong>những câu chuyện, những tác phẩm và những khoảnh khắc vui vẻ mà bạn đã tạo ra và chia sẻ — chúng sẽ sống trong ký ức của những người được chúng chạm đến, lâu hơn nhiều so với bất kỳ thứ vật chất nào bạn có thể để lại</strong>.`
        },
        4: {
          theme: 'Viên mãn trong bền vững — Nhìn lại những điều đã xây',
          paragraphs: [
            `Giai đoạn viên mãn của <strong>${safeName}</strong> với số <strong>4</strong> trao cho bạn một đặc quyền hiếm có: <em>khả năng nhìn lại và thấy rằng những gì bạn đã xây cẩn thận, kiên nhẫn qua nhiều thập kỷ đã đứng vững.</em> Không phải ai cũng có được sự thỏa mãn này — nhiều người dành cả đời xây những tòa lâu đài trên cát. Nhưng bạn, với kỷ luật và sự kiên định của số 4, đã xây trên đá — và giờ bạn có thể đứng trên nền móng đó và nhìn thấy những gì không gì có thể lung lay.`,
            `Gia đình và những mối quan hệ lâu bền là niềm vui lớn nhất của giai đoạn này. <strong>Sự trung thành và kiên định mà bạn đã thể hiện trong nhiều thập kỷ đã tạo ra những mối kết nối sâu và bền vững mà người đi đường tắt không bao giờ có được.</strong> Đây là thứ không thể mua bằng tiền hay đạt được bằng sự hào nhoáng — nó chỉ đến từ năm tháng của sự xuất hiện đáng tin cậy.`,
            `Giai đoạn này cũng là lúc để buông bỏ sự kiểm soát — một cách nhẹ nhàng và tự nguyện. <em>Đời cần bạn làm kiến trúc sư ít hơn và làm người thưởng thức nhiều hơn.</em> Hãy học cách để những thế hệ sau tiếp quản những gì bạn đã xây, tin rằng nền móng bạn đặt đủ vững để họ có thể phát triển trên đó theo những cách bạn chưa tưởng tượng đến.`,
          ],
          lesson: `Giai đoạn thu hoạch với số 4 xác nhận sự thật lớn nhất của cuộc đời bạn: <strong>không phải những thứ lớn lao và hào nhoáng tạo nên ý nghĩa — mà là những thứ nhỏ bé nhưng bền vững, được xây bằng tình yêu và kỷ luật qua từng ngày bình thường của cuộc sống</strong>.`
        },
        5: {
          theme: 'Viên mãn trong tự do — Sống phiêu lưu không cần xin phép',
          paragraphs: [
            `Giai đoạn viên mãn của <strong>${safeName}</strong> với số <strong>5</strong> thường là giai đoạn bùng phát bất ngờ — khi nhiều người khác bắt đầu chậm lại, bạn lại tìm thấy thêm năng lượng mới. Những kế hoạch từng bị hoãn lại vì trách nhiệm giờ có thể được thực hiện. Những ước mơ từng bị đặt sang một bên vì "chưa đúng lúc" giờ đã đến lúc — và thứ đặc biệt là bạn <em>biết cách thực hiện chúng với sự khôn ngoan mà tuổi trẻ không có.</em>`,
            `Đây là giai đoạn mà sự tò mò trí tuệ của bạn không giảm đi — nó đổi hướng. <strong>Thay vì phiêu lưu vì sự mới mẻ, bạn phiêu lưu vì sự hiểu biết ngày càng sâu hơn về vũ trụ rộng lớn mà bạn đang sống trong đó.</strong> Mỗi trải nghiệm mới không chỉ là một trải nghiệm — nó là một trang sách bổ sung vào cuốn bách khoa toàn thư sống của bạn.`,
            `Giai đoạn này cũng là thời điểm để thiết lập lại định nghĩa về "kết nối". Bạn không cần quá nhiều người — nhưng những người bạn chọn giữ lại cần thiết hơn bao giờ hết. <em>Chất lượng thay thế số lượng. Sự thực sự thay thế sự hào nhoáng.</em> Và bạn — với kinh nghiệm đời dồi dào — đã biết cách phân biệt hai thứ đó rất rõ ràng.`,
          ],
          lesson: `Giai đoạn thu hoạch với số 5 trao cho bạn điều mà nhiều người chỉ mơ ước: <strong>sự tự do thực sự — không phải vì không có gì ràng buộc, mà vì bạn đã học được cách sống trong bất kỳ hoàn cảnh nào mà vẫn cảm thấy mình đang bay</strong>.`
        },
        6: {
          theme: 'Viên mãn trong tình yêu — Thu hoạch những trái tim bạn đã gieo',
          paragraphs: [
            `Giai đoạn viên mãn của <strong>${safeName}</strong> với số <strong>6</strong> là hành trình về nhà — theo nghĩa sâu sắc nhất của từ này. Những gì bạn đã đặt vào gia đình, vào tình yêu, vào cộng đồng trong nhiều thập kỷ qua giờ hiện diện xung quanh bạn theo những hình thức ấm áp và cụ thể nhất. <em>Những con người bạn yêu thương và chăm sóc đang phản chiếu lại tình yêu đó.</em> Đây là thứ không có giá nào mua được.`,
            `Trong giai đoạn này, vai trò của bạn thường chuyển thành người <strong>truyền đạt sự khôn ngoan về tình yêu và gia đình</strong> cho những thế hệ sau. Không phải bằng những bài giảng hay lý thuyết — mà bằng cách sống đúng là tấm gương của những gì tình yêu thực sự trông như thế nào: sự hiện diện, sự kiên nhẫn, sự chấp nhận và sự tôn trọng lẫn nhau qua những thứ không dễ dàng.`,
            `Giai đoạn này cũng là thời điểm để học cách <em>buông bỏ những trách nhiệm mà bạn đã mang quá lâu</em>. Không phải từ bỏ — mà là trao lại cho những người đã sẵn sàng tiếp nhận. Khi bạn học cách giữ sợi dây kết nối trong khi không còn cần phải kéo căng nó nữa, bạn sẽ tìm thấy một loại bình an mà tất cả những năm tháng bận rộn không bao giờ cho phép.`,
          ],
          lesson: `Giai đoạn thu hoạch với số 6 cô đọng thành một sự thật ngắn gọn: <strong>tình yêu thương bạn đã cho đi — dù không ai đếm, dù không phải lúc nào cũng được đền đáp xứng đáng — đã tạo nên một di sản vô hình nhưng bất tử trong trái tim của tất cả những người may mắn được bạn yêu</strong>.`
        },
        7: {
          theme: 'Viên mãn trong tri thức — Chia sẻ những gì đã học được từ thâm sâu',
          paragraphs: [
            `Giai đoạn viên mãn của <strong>${safeName}</strong> với số <strong>7</strong> thường là thời kỳ mà sự khôn ngoan tích lũy cả đời bắt đầu tỏa sáng một cách tự nhiên và không cần cố gắng. <em>Bạn không cần phải chứng minh mình biết nhiều — điều đó hiện rõ trong cách bạn nghe, cách bạn đặt câu hỏi và cách bạn nói điều đúng vào đúng thời điểm mà không ai khác nhận ra là cần thiết.</em>`,
            `Giai đoạn này thường mang theo sự bình an nội tâm sâu sắc — không phải vì mọi thứ đã được giải đáp, mà vì bạn đã học được cách sống thoải mái với những câu hỏi không có câu trả lời. <strong>Đây là loại trí tuệ mà không trường đại học nào có thể trao — nó chỉ đến từ việc đã sống đủ lâu và đủ sâu để biết rằng sự bí ẩn không phải điều để sợ, mà là điều để tôn trọng.</strong>`,
            `Đóng góp của bạn trong giai đoạn này thường đến qua sự hiện diện và những cuộc trò chuyện. <em>Người tìm đến bạn không chỉ tìm câu trả lời — họ tìm sự hiểu biết.</em> Và bạn, với chiều sâu và sự bình an mà số 7 ở giai đoạn viên mãn mang lại, có thể trao cho họ thứ đó theo cách mà không có sách nào có thể thay thế.`,
          ],
          lesson: `Giai đoạn thu hoạch với số 7 tổng kết hành trình bằng một sự thật đẹp: <strong>sự khôn ngoan thực sự không phải là có câu trả lời cho mọi thứ — mà là biết những câu hỏi nào quan trọng nhất, và sống với chúng đủ lâu để hiểu được chiều sâu của chính những câu hỏi đó</strong>.`
        },
        8: {
          theme: 'Viên mãn trong di sản — Quyền lực được dùng để nâng đỡ',
          paragraphs: [
            `Giai đoạn viên mãn của <strong>${safeName}</strong> với số <strong>8</strong> là thời điểm mà những tài sản thực sự nhất của cuộc đời hiện ra — không phải chỉ là tài chính hay địa vị, mà là <em>sức ảnh hưởng có chiều sâu tích lũy qua nhiều thập kỷ của sự kiên định và chính trực.</em> Người ta tôn trọng bạn không vì những gì bạn có — mà vì những gì bạn đã làm và ai bạn đã là trong quá trình đó.`,
            `Giai đoạn này thường mang theo một sự chuyển hóa quan trọng với số 8: từ việc <em>tích lũy</em> sang việc <em>phân phối.</em> Đây là lúc bạn dùng những nguồn lực — tiền bạc, mạng lưới, kiến thức, ảnh hưởng — không phải để xây dựng thêm cho bản thân, mà để nâng đỡ những người đang ở vị trí bạn từng ở nhiều thập kỷ trước. <strong>Đây là khi vòng quay của số 8 khép lại hoàn toàn — và điều đó có một vẻ đẹp riêng không thể diễn tả.</strong>`,
            `Bình an nội tâm trong giai đoạn này đến từ việc nhận ra rằng thành công không phải là một đích đến — mà là một cuộc hành trình mà giá trị thật nằm trong những gì bạn học được và những ai bạn trở nên trong quá trình đó. <em>Sự nghiệp và tài sản có thể theo thời gian. Nhưng phẩm cách và di sản con người thì không.</em>`,
          ],
          lesson: `Giai đoạn thu hoạch với số 8 định nghĩa lại thành công theo cách đẹp nhất: <strong>quyền lực thực sự không phải là thứ bạn tích lũy được — mà là thứ bạn trao đi một cách khôn ngoan, và thấy nó tạo ra giá trị lớn hơn gấp nhiều lần trong tay những người bạn tin tưởng</strong>.`
        },
        9: {
          theme: 'Viên mãn trong buông bỏ — Sự giải phóng thiêng liêng',
          paragraphs: [
            `Giai đoạn viên mãn của <strong>${safeName}</strong> với số <strong>9</strong> là giai đoạn đẹp nhất và nhẹ nhàng nhất của hành trình dài — nếu bạn đã học được bài học tối quan trọng của số 9: <em>buông bỏ.</em> Điều này không có nghĩa là từ bỏ hay từ chối — đây là sự chấp nhận sâu sắc rằng mọi thứ đều có chu kỳ riêng, và sự khôn ngoan nằm ở chỗ biết khi nào là lúc ôm giữ và khi nào là lúc để đi.`,
            `Trong giai đoạn này, bạn thường trở thành <strong>người dẫn đường tâm linh</strong> cho những người xung quanh — không phải trong vai trò chính thức, mà đơn giản là qua sự hiện diện, qua những gì bạn đã sống qua và không còn sợ hãi. Người ta tìm đến bạn khi đứng trước những ngưỡng cửa lớn của cuộc đời vì họ cảm nhận rằng bạn đã đứng ở đó trước họ và đã đi qua với sự duyên dáng.`,
            `Tầm nhìn nhân đạo của bạn trong giai đoạn này đạt đến chiều sâu mà chỉ những năm tháng sống qua nhiều thứ mới tạo ra được. <em>Bạn không còn phân biệt "của tôi" và "của người khác" theo nghĩa cứng nhắc như trước.</em> Tình yêu của bạn mở rộng — không phải vì bạn cố gắng, mà vì sau tất cả những gì đã qua, bạn nhận ra rằng chúng ta tất cả đều đang ở trên cùng một con thuyền, với cùng những nỗi sợ và cùng những hy vọng.`,
          ],
          lesson: `Giai đoạn thu hoạch với số 9 để lại thông điệp thiêng liêng nhất của toàn bộ hành trình: <strong>cuộc đời không phải là về những gì bạn đạt được hay giữ lại được — mà là về những gì bạn đã cho đi, và sự nhẹ nhàng trong trái tim khi bạn nhận ra rằng sự cho đi đó đã tạo nên những gợn sóng tiếp tục lan rộng sau khi bạn không còn ở đây để thấy</strong>.`
        },
        11: {
          theme: 'Viên mãn của nhà tiên tri — Ánh sáng được trao lại',
          paragraphs: [
            `Giai đoạn viên mãn của <strong>${safeName}</strong> với số chủ <strong>11</strong> thường là giai đoạn mà sứ mệnh cuộc đời hiện ra rõ ràng nhất — không phải vì có ai đó tuyên bố, mà vì <em>bạn nhìn lại và thấy những sợi chỉ vô hình kết nối tất cả những gì bạn đã sống, đã học, đã trải qua.</em> Những điều từng có vẻ ngẫu nhiên giờ hiện ra như một bức tranh tổng thể có ý nghĩa sâu sắc.`,
            `Trong giai đoạn này, ảnh hưởng của bạn thường đến theo những cách bạn không hay biết. <strong>Những lời bạn nói, những điều bạn chia sẻ, những khoảnh khắc hiện diện chân thực mà bạn trao cho người khác — chúng sống tiếp trong những trái tim đó và lan truyền ra những nơi bạn không bao giờ thể đến được.</strong> Đây là sức mạnh thực sự của số 11 — không phải sân khấu lớn, mà là những kết nối âm thầm nhưng bất tử.`,
            `Sự bình an nội tâm của giai đoạn này đến từ việc không còn phải mang một mình gánh nặng của nhận thức. <em>Bạn đã học cách chia sẻ ánh sáng mà không bị tiêu tán, học cách bảo vệ sự nhạy cảm của mình mà không cần xây tường cao, học cách tồn tại với trọn vẹn cả hai thế giới — vật chất và tâm linh — mà không phải chọn một.</em>`,
          ],
          lesson: `Giai đoạn thu hoạch với số 11 tổng kết sứ mệnh bằng sự thật đơn giản nhưng sâu sắc nhất: <strong>bạn không đến thế giới này để được nhớ đến — bạn đến để thắp sáng. Và ánh sáng một khi đã được thắp lên thì không cần ai nhớ nguồn gốc — nó cứ tiếp tục soi sáng những con đường mà chính bạn cũng không thề thấy hết</strong>.`
        },
        22: {
          theme: 'Viên mãn của người kiến tạo — Di sản vĩ đại đứng vững',
          paragraphs: [
            `Giai đoạn viên mãn của <strong>${safeName}</strong> với số chủ <strong>22</strong> là lúc bạn có thể đứng lại và nhìn thấy những gì đã được xây dựng — không chỉ bằng tay bạn mà bằng tầm nhìn, sự kiên trì và sức chịu đựng của bạn qua nhiều thập kỷ. <em>Có những điều bạn đã tạo ra sẽ tồn tại lâu hơn bạn</em> — tổ chức, hệ thống, ý tưởng, con người bạn đã ảnh hưởng — và nhận ra điều đó có một ý nghĩa thiêng liêng khó diễn tả.`,
            `Giai đoạn này thường mang theo sự chuyển giao quan trọng: từ việc là người xây dựng sang trở thành <strong>người truyền cảm hứng cho thế hệ tiếp theo tiếp tục xây</strong>. Tầm nhìn bạn đã mang theo cả đời bây giờ cần được đặt vào những bàn tay khác — những người đủ trẻ để thực thi và đủ tầm để hiểu. Đây không phải sự từ bỏ — đây là hình thức đóng góp cao nhất.`,
            `Trong giai đoạn này, bình an đến từ việc nhận ra rằng <em>vĩ đại không đo bằng phạm vi mà đo bằng chiều sâu.</em> Bạn không cần phải thay đổi cả thế giới — bạn chỉ cần thay đổi đủ sâu trong phần thế giới mà bạn chạm đến. Và khi nhìn lại, bạn sẽ thấy rằng điều đó đã lan ra rộng hơn rất nhiều so với những gì bạn từng dám hy vọng.`,
          ],
          lesson: `Giai đoạn thu hoạch với số 22 kết thúc bằng sự thật vĩ đại nhất: <strong>di sản thực sự không phải là những thứ bạn xây bằng vật liệu — mà là những thứ bạn xây bằng cam kết, bằng tầm nhìn và bằng lòng dũng cảm để tin vào điều gì đó lớn hơn chính mình ngay cả khi không ai khác còn thấy nó rõ như bạn</strong>.`
        },
      },
    };

    // ── ADVICE DATA: lời khuyên thực tiễn cho (cycle × num) ──
    const adviceData: Record<number, Record<number, LifeCycleAdvice>> = {
      1: { // CHU KỲ 1 — Niên Thiếu (Hình Thành)
        1: {
          career: `Tập trung học và thực hành kỹ năng lãnh đạo sớm — tham gia các câu lạc bộ, nhóm dự án, cuộc thi để rèn tính tiên phong. Chọn ngành học phù hợp với khát vọng dẫn đầu (kinh doanh, kỹ thuật, khoa học). <strong>Tránh</strong> để người khác áp đặt con đường nghề nghiệp của bạn.`,
          finance: `Bắt đầu tiết kiệm từ sớm dù số tiền nhỏ — xây dựng thói quen tài chính kỷ luật. Không vay mượn bốc đồng. Học kiến thức tài chính cơ bản như một môn học ưu tiên.`,
          health: `Kênh năng lượng dồi dào vào thể thao và hoạt động thể chất có cấu trúc. Học cách ngủ đủ giấc và quản lý stress sớm — tránh kiệt sức do làm việc quá mức.`,
          relationship: `Học cách lắng nghe thay vì luôn muốn dẫn đầu trong giao tiếp. Xây dựng tình bạn dựa trên sự tôn trọng lẫn nhau, không phải thống trị.`,
          avoid: `Bảo thủ, không chịu nhận góp ý; cô lập bản thân để tránh xung đột; chi tiêu bốc đồng để chứng tỏ `
        },
        2: {
          career: `Phát triển kỹ năng giao tiếp, lắng nghe và làm việc nhóm — đây là nền tảng nghề nghiệp lâu dài của bạn. Chọn hướng học liên quan đến con người (tâm lý, giáo dục, y tế, ngoại giao). <strong>Tránh</strong> để người khác lấn át quyết định học tập của bạn.`,
          finance: `Xây dựng ngân sách cơ bản và tránh chi tiêu cảm tính. Học cách đàm phán và thương lượng — kỹ năng này sẽ sinh lời cả đời. Tránh cho mượn tiền vì nể nang.`,
          health: `Chú ý sức khỏe tinh thần — học cách đặt ranh giới cảm xúc lành mạnh. Tập thể dục nhẹ nhàng như yoga, bơi lội. Không nhịn ăn hay bỏ bữa vì bận lo cho người khác.`,
          relationship: `Học cách nói "không" mà không cảm thấy có lỗi. Chọn bạn bè có chiều sâu thay vì chạy theo số lượng. Tránh quan hệ bạn bè phụ thuộc một chiều.`,
          avoid: `Hy sinh bản thân quá mức; để người khác kiểm soát quyết định của mình; tránh xung đột lành mạnh cần thiết`
        },
        3: {
          career: `Nuôi dưỡng tài năng nghệ thuật và sáng tạo — đừng để áp lực "thực tế" dập tắt thiên phú của bạn. Tìm hướng kết hợp sáng tạo với ứng dụng (thiết kế, truyền thông, marketing). <strong>Tránh</strong> bỏ dở quá nhiều dự án học tập.`,
          finance: `Thiết lập ngân sách cho các hoạt động sáng tạo. Học cách biến tài năng thành thu nhập sớm — bắt đầu từ những freelance nhỏ. Tránh chi tiêu bốc hứng.`,
          health: `Dành thời gian vui chơi có chủ đích — niềm vui là nhiên liệu của bạn. Tránh stress vì cố gắng làm hài lòng người khác. Ngủ đủ giấc thay vì thức khuya sáng tác.`,
          relationship: `Học cách lắng nghe sâu hơn là chỉ nói. Xây dựng tình bạn vượt qua lớp vui vẻ bề ngoài. Thực hành cam kết nhỏ để rèn tính kiên nhẫn.`,
          avoid: `Bỏ dở các cam kết khi mất hứng; che giấu cảm xúc sâu sau lớp vui vẻ; tiêu xài không có kế hoạch`
        },
        4: {
          career: `Đầu tư nghiêm túc vào nền móng học vấn — đây là giai đoạn quan trọng nhất để xây kỹ năng cốt lõi. Chọn ngành có tính thực tế và ứng dụng cao. Rèn thói quen học tập có hệ thống từ sớm.`,
          finance: `Lập "hũ tiết kiệm" từ số tiền nhỏ và duy trì không gián đoạn. Học về ngân sách cá nhân và tránh nợ nần trong giai đoạn đầu đời. Tiết kiệm trước khi chi tiêu.`,
          health: `Xây dựng thói quen vận động đều đặn — không cần cường độ cao, chỉ cần kiên trì. Giữ giờ ngủ ổn định. Tránh làm việc quá sức đến kiệt sức.`,
          relationship: `Đầu tư vào ít mối quan hệ nhưng sâu sắc. Học cách thư giãn và vui chơi — không phải lúc nào cũng cần nghiêm túc. Mở cửa cho sự tự phát và kết nối thật sự.`,
          avoid: `Cứng nhắc đến mức không thể thích nghi; bỏ qua sức khỏe vì học hành; cô lập bản thân trong "bong bóng kỷ luật"`
        },
        5: {
          career: `Thử nhiều hướng học tập và hoạt động ngoại khóa để tìm ra đam mê thực sự. Tránh chọn ngành chỉ vì ổn định — bạn cần sự kích thích trí tuệ. Phát triển nhiều kỹ năng linh hoạt thay vì chuyên sâu quá sớm.`,
          finance: `Học cách quản lý chi tiêu trong môi trường luôn thay đổi. Xây dựng quỹ khẩn cấp nhỏ để đối phó bất ngờ. Tránh đặt cược tài chính lớn vào "cơ hội hấp dẫn" chưa kiểm chứng.`,
          health: `Kênh tốc độ và năng lượng vào thể thao phiêu lưu (leo núi, bơi, võ thuật). Học cách dừng lại và nghỉ ngơi — không phải lúc nào cũng cần di chuyển. Tránh lạm dụng kích thích.`,
          relationship: `Học cách duy trì kết nối khi hoàn cảnh thay đổi. Đừng bỏ rơi người quan trọng khi đang bận chạy theo điều mới. Thực hành cam kết nhỏ để xây nền tảng lòng tin.`,
          avoid: `Bỏ dở mọi thứ khi mất hứng; chi tiêu theo cảm hứng không có kế hoạch; tránh mọi trách nhiệm dưới danh nghĩa "tự do"`
        },
        6: {
          career: `Hướng đến ngành nghề liên quan đến chăm sóc và phục vụ (y tế, giáo dục, tư vấn, thiết kế không gian sống). Học cách đặt ranh giới lành mạnh trong công việc nhóm. <strong>Tránh</strong> hy sinh việc học vì quá bận lo người khác.`,
          finance: `Tránh cho mượn tiền vì lòng tốt quá mức — học nói không với tài chính. Xây dựng ngân sách ưu tiên bản thân trước. Thiết lập mục tiêu tài chính rõ ràng cho tương lai.`,
          health: `Ưu tiên sức khỏe của chính mình trước — bạn không thể cho từ chiếc bình rỗng. Học cách nhận sự chăm sóc từ người khác thay vì luôn là người cho đi.`,
          relationship: `Đặt ranh giới rõ ràng trong các mối quan hệ — yêu thương không có nghĩa là không có giới hạn. Chọn bạn bè biết trân trọng và đáp lại sự quan tâm của bạn.`,
          avoid: `Hy sinh nhu cầu bản thân hoàn toàn vì người khác; can thiệp quá mức vào cuộc sống của người thân; bỏ bê sức khỏe cá nhân`
        },
        7: {
          career: `Phát triển chiều sâu trong một lĩnh vực trí tuệ thay vì rải rác. Chọn ngành cần tư duy phân tích sâu (khoa học, nghiên cứu, triết học, công nghệ). Đừng để áp lực xã hội buộc bạn chọn con đường "ổn định" mà thiếu chiều sâu.`,
          finance: `Nghiên cứu kỹ trước khi đầu tư bất cứ điều gì — đây là điểm mạnh tự nhiên của bạn. Xây dựng nền tảng tài chính ổn định trước khi mạo hiểm. Tránh bị thuyết phục bởi cơ hội nghe hay nhưng chưa được kiểm chứng.`,
          health: `Tạo thói quen thiền định hoặc tĩnh lặng hàng ngày — não bạn cần thời gian yên tĩnh để phục hồi. Tránh cô lập xã hội quá mức. Duy trì kết nối với thiên nhiên thường xuyên.`,
          relationship: `Học cách mở lòng chia sẻ nội tâm thay vì chỉ quan sát. Xây dựng tối thiểu 1-2 tình bạn thực sự sâu sắc. Thực hành kết nối cảm xúc — không chỉ kết nối trí tuệ.`,
          avoid: `Cô lập hoàn toàn; phân tích quá nhiều đến mức không hành động; coi thường cảm xúc của người khác`
        },
        8: {
          career: `Phát triển tư duy kinh doanh và chiến lược từ sớm. Tìm kiếm mentor trong lĩnh vực bạn muốn thống lĩnh. Học về lãnh đạo và quản lý tổ chức — đây là nền tảng cho tương lai bạn hướng đến.`,
          finance: `Học quản lý tài chính nghiêm túc như một kỹ năng chuyên nghiệp. Bắt đầu xây dựng thói quen tiết kiệm và đầu tư nhỏ. Tránh phô trương tài chính để khẳng định địa vị.`,
          health: `Học cách biết điểm dừng — tham vọng lớn dễ dẫn đến kiệt sức. Xây dựng thói quen tập luyện có kỷ luật. Quản lý stress bằng hoạt động thể chất, không phải công việc thêm.`,
          relationship: `Học cách kết nối với con người không chỉ qua lợi ích. Thực hành lắng nghe và thấu cảm — đây là điểm yếu cần rèn luyện. Tránh coi mọi mối quan hệ là "đầu tư chiến lược".`,
          avoid: `Ám ảnh thành công đến mức bỏ qua mọi thứ khác; sử dụng người khác để đạt mục đích; kiêu ngạo khi thành công nhỏ`
        },
        9: {
          career: `Khám phá các ngành nghề có ý nghĩa nhân văn rộng lớn — nghệ thuật, giáo dục, xã hội, y tế. Không bị áp lực chọn nghề chỉ vì thu nhập cao. Tìm công việc chạm đến trái tim bạn.`,
          finance: `Học cách cân bằng giữa lòng hào phóng và sự thực tế tài chính. Thiết lập ngân sách từ thiện có kế hoạch, không chi bốc đồng. Xây dựng nền tảng tài chính vững trước khi phụng sự người khác.`,
          health: `Học cách đặt ranh giới cảm xúc — không ôm hết nỗi đau của thế giới. Thực hành buông bỏ hàng ngày. Tìm hoạt động tái tạo năng lượng riêng cho mình.`,
          relationship: `Học cách nhận bằng cách cho đi — yêu thương phải là hai chiều. Chọn người bạn đời và bạn bè có giá trị nhân văn tương đồng. Tránh cứu vớt những người không muốn được cứu.`,
          avoid: `Lý tưởng hóa đến mức không thực tế; kiệt sức vì quá quan tâm đến người khác; bỏ qua nhu cầu vật chất thiết thực của bản thân`
        },
        11: {
          career: `Phát triển kỹ năng biểu đạt trực giác qua nghệ thuật, âm nhạc, hoặc ngôn ngữ. Chọn môi trường học tập kích thích sự sáng tạo và chiều sâu. Học cách "neo" tầm nhìn vào hành động thực tế cụ thể.`,
          finance: `Xây dựng nền tảng tài chính ổn định để tầm nhìn cao cả của bạn có chỗ đứng vững. Tránh bị cuốn vào các ý tưởng hào nhoáng không có căn cơ. Học cách định giá đúng cho giá trị bạn tạo ra.`,
          health: `Quản lý hệ thần kinh nhạy cảm — thiền định, âm nhạc, thiên nhiên là liều thuốc tốt nhất. Học cách thoát khỏi sự quá kích thích. Ngủ đủ giấc là ưu tiên không thương lượng.`,
          relationship: `Tìm người hiểu được chiều sâu và trực giác của bạn. Học cách kết nối ở cả hai cấp độ — tinh thần và đời thường. Tránh cô lập khi cảm thấy "không ai hiểu mình".`,
          avoid: `Sống hoàn toàn trong thế giới ý tưởng mà quên hành động; lo lắng và nặng gánh quá mức; bác bỏ nhu cầu thực tế với lý do "tâm linh"`
        },
        22: {
          career: `Bắt đầu xây dựng tư duy hệ thống và quy mô lớn — đọc về lịch sử, văn minh, lãnh đạo. Tìm mentor với tầm nhìn dài hạn. Chọn nền tảng học thuật vững chắc cho tương lai xây dựng lớn.`,
          finance: `Xây dựng kỷ luật tài chính nghiêm ngặt — tầm nhìn lớn cần nền tảng vật chất vững. Tránh phung phí những gì chưa có. Học về đầu tư dài hạn và xây dựng tài sản có mục đích.`,
          health: `Học cách cân bằng giữa tham vọng lớn và sức khỏe thể chất. Xây dựng thói quen tập luyện ổn định. Tránh kiệt sức sớm vì áp lực tự đặt ra.`,
          relationship: `Tìm người bạn đường chia sẻ tầm nhìn lớn. Học cách trân trọng những khoảnh khắc nhỏ bé trong cuộc sống bình thường. Tránh coi mọi người như "nguồn lực cho sứ mệnh".`,
          avoid: `Bỏ qua nhu cầu cơ bản vì mải mê tầm nhìn; tự cô lập với lý do "người thường không hiểu"; kiệt sức trước khi dự án lớn bắt đầu`
        }
      },
      2: { // CHU KỲ 2 — Trưởng Thành (Xây Dựng)
        1: {
          career: `Đây là thời điểm khẳng định vị trí lãnh đạo và xây dựng sự nghiệp độc lập. Dũng cảm khởi nghiệp hoặc đảm nhận vai trò lớn hơn. Tránh ở quá lâu trong vai trò không cho phép bạn phát huy toàn lực.`,
          finance: `Đầu tư vào bản thân — kỹ năng, mạng lưới, kinh nghiệm — đây là tài sản sinh lời cao nhất. Xây dựng thu nhập đa nguồn. Tránh đặt tất cả trứng vào một giỏ.`,
          health: `Duy trì thói quen tập luyện như một kỷ luật lãnh đạo, không phải tùy hứng. Học cách ủy quyền để tránh kiệt sức. Nghỉ ngơi có chiến lược là một năng lực, không phải điểm yếu.`,
          relationship: `Xây dựng mối quan hệ đối tác bình đẳng — cả trong công việc lẫn cuộc sống. Học cách ăn mừng thành công của người khác. Tránh để tham vọng cá nhân làm xói mòn các mối quan hệ quan trọng.`,
          avoid: `Kiêu ngạo và cứng đầu khi thành công; cô lập vì nghĩ "không ai hiểu tầm nhìn của mình"; bỏ bê sức khỏe và các mối quan hệ`
        },
        2: {
          career: `Xây dựng danh tiếng qua các mối quan hệ nghề nghiệp sâu sắc và lâu dài. Tìm kiếm cơ hội hợp tác chiến lược. Tránh chấp nhận vai trò không được tôn trọng chỉ vì ngại xung đột.`,
          finance: `Hợp tác tài chính cần hợp đồng rõ ràng — lòng tốt không thay thế sự minh bạch. Xây dựng quỹ dự phòng cá nhân. Tránh bảo lãnh tài chính cho người khác.`,
          health: `Học cách tự chăm sóc sức khỏe với cùng sự ân cần bạn dành cho người khác. Quản lý căng thẳng bằng cách đặt ra ranh giới rõ ràng. Tránh kiệt sức vì quá nhiều cam kết xã hội.`,
          relationship: `Giai đoạn này phù hợp để xây dựng mối quan hệ lâu dài — trong công việc và tình cảm. Học cách nêu nhu cầu của mình một cách thẳng thắn. Tránh mối quan hệ phụ thuộc một chiều.`,
          avoid: `Đồng ý với tất cả để tránh xung đột; bị lợi dụng vì quá tốt bụng; bỏ qua nhu cầu cá nhân vì mải phục vụ người khác`
        },
        3: {
          career: `Giai đoạn tỏa sáng trong lĩnh vực sáng tạo và biểu đạt. Nắm bắt cơ hội trình bày, phát biểu, xuất bản. Đây là thời điểm xây dựng thương hiệu cá nhân mạnh mẽ.`,
          finance: `Đa dạng hóa nguồn thu từ kỹ năng sáng tạo. Xây dựng mạng lưới khách hàng và đối tác. Tránh chi tiêu theo cảm hứng mà không có kế hoạch dài hạn.`,
          health: `Duy trì năng lượng sáng tạo bằng lịch trình có cấu trúc. Tránh kiệt sức vì quá nhiều dự án song song. Học cách hoàn thành trước khi bắt đầu điều mới.`,
          relationship: `Xây dựng cộng đồng sáng tạo xung quanh mình. Chọn người bạn đời trân trọng sự sáng tạo và không kiểm soát nó. Học cách lắng nghe sâu trong mối quan hệ.`,
          avoid: `Bỏ dở quá nhiều dự án khi mất hứng; chi tiêu theo cảm hứng sáng tạo không có ngân sách; bỏ qua sức khỏe vì mải mê sáng tác`
        },
        4: {
          career: `Giai đoạn xây dựng sự nghiệp bền vững — đừng nản lòng với tiến độ chậm. Mỗi bước nhỏ đều quan trọng. Tìm kiếm vị trí có ổn định và cho phép bạn xây dựng chuyên môn sâu.`,
          finance: `Xây dựng nền tảng tài chính vững chắc — mua bảo hiểm, tăng tiết kiệm, đầu tư an toàn dài hạn. Tránh các quyết định tài chính bốc đồng hoặc rủi ro cao.`,
          health: `Xây dựng thói quen sức khỏe kiên nhẫn và bền vững — không phải sprint, mà là marathon. Duy trì lịch khám sức khỏe định kỳ. Tránh làm việc đến kiệt sức.`,
          relationship: `Đầu tư thời gian chất lượng vào gia đình và người thân. Học cách biểu đạt tình cảm bằng lời nói, không chỉ hành động. Xây dựng mối quan hệ đối tác thực sự bình đẳng.`,
          avoid: `Cứng nhắc đến mức không thích nghi với thay đổi cần thiết; làm việc quá sức đến mức hy sinh sức khỏe; trì hoãn niềm vui vì "chưa đủ ổn định"`
        },
        5: {
          career: `Mở lòng với những cơ hội không theo kế hoạch — thay đổi này có thể là bước ngoặt. Phát triển đa kỹ năng và mạng lưới rộng. Tránh bám víu vào vị trí không còn phù hợp vì sợ thay đổi.`,
          finance: `Xây dựng quỹ dự phòng lớn hơn để thoải mái với sự biến động. Tránh đặt cược lớn vào cơ hội chưa được kiểm chứng. Học cách quản lý dòng tiền không đều.`,
          health: `Duy trì thói quen sức khỏe cơ bản ngay cả khi mọi thứ thay đổi. Học cách phục hồi nhanh sau biến động. Tránh lạm dụng kích thích để đối phó với stress.`,
          relationship: `Giao tiếp rõ ràng về nhu cầu tự do của bạn với người thân. Học cách duy trì kết nối trong khi vẫn phát triển cá nhân. Tránh bỏ rơi người quan trọng khi đang bận chạy theo đổi mới.`,
          avoid: `Thay đổi hướng đi quá thường xuyên đến mức không xây được gì; chi tiêu liều lĩnh trong giai đoạn thu nhập không ổn định; né tránh cam kết cần thiết`
        },
        6: {
          career: `Giai đoạn lý tưởng để phát triển sự nghiệp liên quan đến chăm sóc và phục vụ. Xây dựng uy tín qua sự đáng tin cậy và tận tâm. Tránh đặt công việc lên trên sức khỏe gia đình.`,
          finance: `Lập kế hoạch tài chính gia đình dài hạn — bảo hiểm, giáo dục con cái, nhà cửa. Tránh chi tiêu quá mức cho gia đình đến mức bỏ bê dự phòng cá nhân. Cân bằng giữa cho đi và tích lũy.`,
          health: `Nhớ chăm sóc sức khỏe bản thân trong khi chăm sóc gia đình. Tránh hy sinh giấc ngủ và dinh dưỡng vì bận lo cho người khác. Đặt lịch tái tạo năng lượng cá nhân.`,
          relationship: `Đây là giai đoạn vàng để đầu tư vào gia đình và mối quan hệ thân thiết. Học cách yêu thương có ranh giới lành mạnh. Tránh kiểm soát người thân dù xuất phát từ lòng tốt.`,
          avoid: `Hy sinh bản thân hoàn toàn cho gia đình; kiểm soát người thân dưới danh nghĩa quan tâm; bỏ bê sự phát triển cá nhân`
        },
        7: {
          career: `Đầu tư vào việc trở thành chuyên gia thực sự trong lĩnh vực của mình. Nghiên cứu, học hỏi sâu hơn là mở rộng nhanh. Xây dựng uy tín qua sự hiểu biết sâu sắc thay vì chứng chỉ bề ngoài.`,
          finance: `Nghiên cứu kỹ trước mọi quyết định đầu tư lớn. Không để người khác "thuyết phục" bạn vào cơ hội chưa được kiểm chứng. Xây dựng nền tảng tài chính ổn định để có không gian suy nghĩ.`,
          health: `Thiền định và tĩnh lặng là ưu tiên sức khỏe quan trọng nhất của bạn. Giữ cân bằng giữa thời gian một mình và thời gian kết nối xã hội. Tránh cô lập quá mức.`,
          relationship: `Học cách chia sẻ thế giới nội tâm phong phú với những người bạn tin tưởng. Tìm bạn đời và bạn bè có chiều sâu trí tuệ tương đồng. Đừng để sự độc lập trở thành xa cách.`,
          avoid: `Phân tích quá mức đến tê liệt quyết định; cô lập xã hội quá mức; bỏ qua cảm xúc và kết nối con người vì quá chú trọng trí tuệ`
        },
        8: {
          career: `Giai đoạn thu hoạch và mở rộng mạnh mẽ nhất. Dũng cảm đàm phán, mở rộng, đầu tư. Xây dựng hệ thống tạo thu nhập thụ động. Tránh chần chừ trước cơ hội xứng đáng.`,
          finance: `Đây là giai đoạn tốt nhất để mua bất động sản, đầu tư dài hạn, mở rộng kinh doanh. Học cách dùng đòn bẩy tài chính thông minh. Tránh tích lũy mà không có mục tiêu rõ ràng.`,
          health: `Quản lý căng thẳng quyết định qua hoạt động thể chất có cường độ đủ lớn. Không hy sinh sức khỏe vì tham vọng ngắn hạn. Đặt giới hạn làm việc rõ ràng.`,
          relationship: `Dành thời gian chất lượng cho người thân ngay cả trong giai đoạn bận rộn đỉnh điểm. Học cách thể hiện tình yêu bằng hiện diện, không chỉ bằng vật chất. Chọn đối tác cùng tầm nhìn.`,
          avoid: `Ưu tiên kết quả hơn con người; kiệt sức vì không biết dừng lại; tích lũy không có mục đích ngoài số lượng`
        },
        9: {
          career: `Tìm tới những công việc có ý nghĩa nhân văn sâu sắc, nơi bạn đóng góp thực sự. Tránh làm việc chỉ vì thu nhập mà thiếu ý nghĩa — điều này làm kiệt năng lượng của bạn. Giai đoạn tốt để đóng góp cho cộng đồng.`,
          finance: `Xây dựng nền tảng tài chính vững trước khi cho đi — hào phóng cần đi kèm với sự bền vững. Lập ngân sách từ thiện có kế hoạch. Học cách buông bỏ những khoản đầu tư không còn hiệu quả.`,
          health: `Học cách đặt ranh giới cảm xúc — không ôm hết nỗi đau của thế giới. Tìm hoạt động chữa lành và tái tạo năng lượng cho chính mình. Thực hành buông bỏ hàng ngày.`,
          relationship: `Đây là giai đoạn học cách yêu thương vô điều kiện — cả với bản thân lẫn người khác. Học cách tha thứ để giải phóng bản thân. Tránh mối quan hệ tiêu hao một chiều.`,
          avoid: `Kiệt sức vì quá nhiều từ bi không có ranh giới; ôm đồm sứ mệnh cứu vớt thế giới; bỏ qua nhu cầu tài chính thiết thực`
        },
        11: {
          career: `Theo đuổi con đường sáng tạo, tư vấn tâm linh, hoặc truyền cảm hứng nơi trực giác của bạn là tài sản. Học cách hiện thực hóa tầm nhìn bằng các bước cụ thể. Tìm người cộng sự thực tế bổ trợ cho tầm nhìn của bạn.`,
          finance: `Định giá đúng cho giá trị đặc biệt bạn mang lại — không tự hạ giá. Xây dựng nền tảng tài chính ổn định để tầm nhìn cao cả có đất đứng. Tránh chi tiêu theo cảm hứng tâm linh.`,
          health: `Quản lý sự nhạy cảm của hệ thần kinh bằng thực hành chánh niệm thường xuyên. Tránh tiếp nhận quá nhiều năng lượng tiêu cực. Ngủ đủ giấc và phục hồi năng lượng là thiết yếu.`,
          relationship: `Tìm người bạn đời có đủ chiều sâu để tham gia và hiểu hành trình nội tâm của bạn. Học cách kết nối ở cấp độ đời thường bên cạnh cấp độ tâm linh. Không bỏ rơi bản thân vì sứ mệnh.`,
          avoid: `Sống hoàn toàn trong cõi ý tưởng mà không hành động; bị kiệt sức bởi sự nhạy cảm quá mức; hạ thấp giá trị bản thân`
        },
        22: {
          career: `Giai đoạn triển khai tầm nhìn lớn — xây dựng tổ chức, hệ thống, phong trào có quy mô thực sự. Tập hợp đội ngũ xứng tầm. Tránh cố làm một mình những gì cần nhiều người.`,
          finance: `Xây dựng mô hình tài chính bền vững cho tầm nhìn lớn. Học cách huy động vốn và quản lý nguồn lực quy mô lớn. Tránh hi sinh tài chính cá nhân cho sứ mệnh đến mức không bền vững.`,
          health: `Sức khỏe là nhiên liệu của sứ mệnh lớn — không thể bỏ qua. Xây dựng hệ thống hỗ trợ để không phải gánh chịu tất cả một mình. Học cách ủy quyền và tin tưởng đội ngũ.`,
          relationship: `Tìm người bạn đời và cộng sự hiểu và chia sẻ tầm nhìn của bạn. Học cách trân trọng những khoảnh khắc bình thường trong cuộc sống. Không hi sinh hoàn toàn đời sống cá nhân cho sứ mệnh.`,
          avoid: `Mất kết nối với con người bình thường vì sứ mệnh quá lớn; kiệt sức trước khi hoàn thành; bỏ qua sức khỏe cá nhân và các mối quan hệ thân thiết`
        }
      },
      3: { // CHU KỲ 3 — Viên Mãn (Thu Hoạch)
        1: {
          career: `Tiếp tục đóng góp và dẫn dắt theo hình thức phù hợp với giai đoạn này — cố vấn, mentor, hoặc khởi đầu điều gì đó hoàn toàn mới. Chia sẻ kinh nghiệm lãnh đạo cho thế hệ sau. Không cần nghỉ hưu hoàn toàn.`,
          finance: `Chuyển hướng từ tích lũy sang phân phối khôn ngoan — gia đình, từ thiện, đầu tư cho thế hệ sau. Đơn giản hóa tài chính để giảm gánh nặng quản lý. Đảm bảo dự phòng cho tuổi già.`,
          health: `Điều chỉnh cường độ hoạt động thể chất phù hợp tuổi tác nhưng không dừng lại hoàn toàn. Ưu tiên chất lượng giấc ngủ và dinh dưỡng. Học cách nghỉ ngơi mà không cảm thấy tội lỗi.`,
          relationship: `Đầu tư vào gia đình và di sản con người quan trọng hơn bao giờ hết. Học cách nhận sự chăm sóc từ người thân. Nuôi dưỡng các mối quan hệ sâu sắc thay vì mở rộng mạng lưới.`,
          avoid: `Không thể nghỉ ngơi và ủy quyền; kiệt sức vì vẫn muốn một mình gánh hết; xa cách con người vì không ai "đủ tầm"`
        },
        2: {
          career: `Giai đoạn thu hoạch mối quan hệ và tình cảm — những kết nối bạn đã xây dựng cả đời nở hoa. Đóng góp qua vai trò hòa giải, cố vấn và kết nối. Chia sẻ sự khôn ngoan về tình người.`,
          finance: `Đơn giản hóa tài chính và giảm rủi ro. Chuẩn bị kế hoạch di sản cẩn thận. Tránh bị lợi dụng tài chính vì lòng tốt quá mức ở giai đoạn này.`,
          health: `Duy trì các hoạt động xã hội tích cực — cô đơn là nguy cơ sức khỏe lớn nhất. Thực hành thiền định và tĩnh lặng. Ưu tiên chất lượng mối quan hệ thay vì sự kiện.`,
          relationship: `Giai đoạn thu hoạch tình người — tận hưởng chiều sâu của các mối quan hệ đã được xây dựng cả đời. Học cách nhận tình yêu thay vì luôn là người cho đi. Tha thứ và chữa lành những vết thương cũ.`,
          avoid: `Cô lập xã hội; bị lợi dụng tài chính vì lòng tốt; mang theo oán giận cũ không giải quyết`
        },
        3: {
          career: `Tiếp tục sáng tạo và biểu đạt — tinh thần số 3 không có khái niệm "về hưu". Viết hồi ký, dạy nghề, hoặc theo đuổi dự án nghệ thuật mơ ước. Chia sẻ tài năng với cộng đồng.`,
          finance: `Đơn giản hóa tài chính để có thêm thời gian và năng lượng cho sáng tạo. Chuẩn bị di sản sáng tạo — tác phẩm, dạy nghề. Tránh chi tiêu bốc đồng ở giai đoạn này.`,
          health: `Duy trì các hoạt động tạo niềm vui — đây là thuốc bổ tốt nhất. Tham gia câu lạc bộ sáng tạo và cộng đồng xã hội. Học cách quản lý năng lượng khôn ngoan hơn.`,
          relationship: `Chia sẻ niềm vui sống với người thân và cộng đồng. Trở thành nguồn ánh sáng và cảm hứng cho thế hệ sau. Nuôi dưỡng tình bạn cũ và mở đón tình bạn mới.`,
          avoid: `Thu mình lại trong khi vẫn còn nhiều để cho đi; để nỗi cô đơn dập tắt ngọn lửa sáng tạo; sống trong quá khứ`
        },
        4: {
          career: `Giai đoạn thu hoạch những gì đã xây dựng cả đời. Đóng góp kinh nghiệm thực tiễn cho tổ chức và gia đình. Trở thành người giữ gìn di sản và truyền thống có giá trị.`,
          finance: `Đơn giản hóa và củng cố tài chính. Chuẩn bị kế hoạch di sản rõ ràng. Tránh phức tạp hóa tài chính ở giai đoạn này — sự giản dị là sức mạnh.`,
          health: `Duy trì thói quen thể chất ổn định và vừa sức. Quan tâm đến sức khỏe tâm thần và kết nối xã hội. Học cách linh hoạt hơn khi cơ thể đặt ra giới hạn mới.`,
          relationship: `Trở thành nền tảng ổn định cho gia đình và cộng đồng. Chia sẻ sự khôn ngoan thực tế của cả đời. Học cách buông bỏ kiểm soát và tin tưởng thế hệ sau.`,
          avoid: `Cứng nhắc khi thế giới thay đổi xung quanh; không thể buông bỏ kiểm soát và ủy quyền; cô lập vì "người trẻ không hiểu"`
        },
        5: {
          career: `Giai đoạn tự do thực sự — khám phá những điều từng bị trì hoãn. Đừng tự giới hạn bởi tuổi tác. Chia sẻ hành trình phong phú với người xung quanh qua viết lách hoặc nói chuyện.`,
          finance: `Cân bằng giữa hưởng thụ và bảo tồn tài sản. Chuẩn bị dự phòng đủ cho tuổi cao. Tránh các đầu tư rủi ro cao ở giai đoạn này — bảo toàn quan trọng hơn sinh lợi.`,
          health: `Duy trì hoạt động thể chất phù hợp với tình trạng sức khỏe thực tế. Tránh phiêu lưu vượt quá giới hạn an toàn. Học cách thích nghi với những thay đổi thể chất tự nhiên.`,
          relationship: `Duy trì sự tò mò và cởi mở với người mới. Chia sẻ kinh nghiệm sống phong phú với thế hệ trẻ. Học cách nhận sự hỗ trợ từ người thân khi cần.`,
          avoid: `Liều lĩnh về thể chất hoặc tài chính vì muốn "sống trọn vẹn"; từ chối nhận sự giúp đỡ; phiêu lưu vượt quá giới hạn an toàn`
        },
        6: {
          career: `Giai đoạn thu hoạch tình yêu thương và di sản gia đình. Vai trò ông bà, người cố vấn gia đình là thiêng liêng nhất. Đóng góp cho cộng đồng qua tình nguyện và chăm sóc.`,
          finance: `Chuẩn bị di sản tài chính cho gia đình một cách công bằng và rõ ràng. Đơn giản hóa tài chính cá nhân. Tránh để gánh nặng tài chính đổ lên con cháu không cần thiết.`,
          health: `Học cách nhận sự chăm sóc từ gia đình — đây là kết quả tự nhiên của những gì bạn đã gieo. Tránh kiệt sức vì vẫn muốn "lo hết". Duy trì các hoạt động xã hội tích cực.`,
          relationship: `Giai đoạn viên mãn nhất của mọi mối quan hệ. Tận hưởng và trân trọng tình yêu thương xung quanh bạn. Học cách buông bỏ những mâu thuẫn cũ còn sót lại.`,
          avoid: `Tiếp tục ôm hết trách nhiệm không cần thiết; không cho con cháu không gian tự lập; mang theo oán giận và chưa được tha thứ`
        },
        7: {
          career: `Giai đoạn chia sẻ sự khôn ngoan tích lũy cả đời. Trở thành cố vấn, người hướng dẫn tri thức, hoặc tiếp tục viết và nghiên cứu. Không cần chứng minh gì — chỉ cần chia sẻ.`,
          finance: `Đơn giản hóa hoàn toàn tài chính. Chuẩn bị di sản tri thức — sách, bài viết, chia sẻ trực tiếp — cũng quý giá không kém di sản vật chất. Đảm bảo dự phòng tài chính đủ dùng.`,
          health: `Thực hành tâm linh và nội tâm là ưu tiên hàng đầu. Duy trì thói quen thiền định và đọc sách. Tránh cô lập quá mức — kết nối xã hội có chọn lọc vẫn quan trọng.`,
          relationship: `Chia sẻ chiều sâu nội tâm với những người thực sự trân trọng nó. Đây là giai đoạn của các cuộc trò chuyện sâu sắc và kết nối tâm hồn. Học cách hiện diện hoàn toàn.`,
          avoid: `Cô lập hoàn toàn vì "không ai hiểu"; trở nên hoài nghi và xa cách; ôm giữ tri thức thay vì chia sẻ`
        },
        8: {
          career: `Giai đoạn xây dựng và trao truyền di sản. Chuyển hướng từ tích lũy sang tặng trao và phân phối khôn ngoan. Sử dụng ảnh hưởng để nâng đỡ thế hệ sau.`,
          finance: `Chuyển nguồn lực tài chính sang mục đích di sản — gia đình, từ thiện, đầu tư cho thế hệ sau. Chuẩn bị kế hoạch di sản hoàn chỉnh. Đơn giản hóa quản lý tài chính cá nhân.`,
          health: `Học cách buông bỏ gánh nặng tích lũy. Thiền định và các hoạt động giảm stress là quan trọng. Duy trì vận động nhẹ nhàng và đều đặn.`,
          relationship: `Sử dụng ảnh hưởng và sự kính trọng để nâng đỡ người xung quanh. Học cách nhận về từ người thân thay vì luôn là người cho. Nuôi dưỡng di sản tình người bên cạnh di sản vật chất.`,
          avoid: `Tiếp tục tích lũy không có mục đích di sản rõ ràng; xa cách con người vì tập trung vào quản lý tài sản; không thể buông bỏ quyền kiểm soát`
        },
        9: {
          career: `Giai đoạn phụng sự và đóng góp nhân văn ý nghĩa nhất. Tình nguyện, từ thiện, hỗ trợ cộng đồng là cách hoàn thành vòng tròn cuộc đời. Đây là thời gian trao đi mà không kỳ vọng đền đáp.`,
          finance: `Sắp xếp tài chính gọn gàng cho giai đoạn cuối đời. Cho đi những gì không cần thiết. Chuẩn bị di chúc và kế hoạch di sản rõ ràng để không gánh nặng cho người thân.`,
          health: `Học nghệ thuật buông bỏ — thể chất và tinh thần. Thực hành tha thứ và giải phóng những gánh nặng cũ. Giữ kết nối xã hội và tinh thần tích cực.`,
          relationship: `Tha thứ và hòa giải với những mâu thuẫn chưa được giải quyết. Tập trung vào những mối quan hệ thực sự quan trọng. Mở lòng nhận tình yêu thương từ người xung quanh.`,
          avoid: `Ôm giữ oán giận không tha thứ đến cuối đời; tiếp tục cố gánh những gì không còn cần thiết; từ chối nhận sự hỗ trợ và chăm sóc`
        },
        11: {
          career: `Giai đoạn tỏa sáng ánh sáng tâm linh và truyền cảm hứng một cách thầm lặng nhưng mạnh mẽ. Chia sẻ sự khôn ngoan tâm linh với những người tìm đến. Đây là sứ mệnh đích thực cuối cuộc đời.`,
          finance: `Đơn giản hóa hoàn toàn tài chính vật chất để tập trung vào di sản tinh thần. Đảm bảo nhu cầu cơ bản được đáp ứng. Giải phóng khỏi lo lắng vật chất để sống trọn vẹn hiện tại.`,
          health: `Duy trì thực hành tâm linh và thiền định hàng ngày. Quản lý năng lượng nhạy cảm bằng cách giới hạn tiếp xúc với năng lượng tiêu cực. Ngủ đủ và phục hồi sâu.`,
          relationship: `Trở thành ngọn đèn soi sáng cho những người đang tìm kiếm. Kết nối sâu sắc với những tâm hồn đồng điệu. Học cách hiện diện trọn vẹn trong từng khoảnh khắc gặp gỡ.`,
          avoid: `Thu mình vì lo lắng bản thân "không đủ"; bị kiệt sức vì tiếp nhận quá nhiều năng lượng người khác; không chia sẻ ánh sáng trí tuệ và tâm linh`
        },
        22: {
          career: `Giai đoạn nhìn lại di sản đã xây dựng và hoàn thành những gì còn dang dở. Trao truyền tầm nhìn cho thế hệ kế tiếp đủ tâm huyết. Đây là lúc trở thành người thầy vĩ đại nhất.`,
          finance: `Chuẩn bị di sản tài chính và tổ chức để tiếp tục vận hành sau khi bạn không còn điều hành trực tiếp. Đơn giản hóa cá nhân để tập trung vào di sản lớn. Đảm bảo tổ chức/hệ thống bạn xây dựng có thể tự vận hành.`,
          health: `Biết nghỉ ngơi và ủy quyền — không cần mang tất cả trên vai nữa. Học cách nhận sự hỗ trợ từ người khác. Duy trì sức khoẻ để hoàn thành sứ mệnh cuối.`,
          relationship: `Mở lòng nhận tình yêu và sự biết ơn từ người được ảnh hưởng bởi công trình của mình. Học cách hiện diện với những người thân thiết thay vì chỉ bận rộn với sứ mệnh lớn.`,
          avoid: `Kiệt sức trong khi vẫn cố nắm giữ mọi thứ; không ủy quyền và tin tưởng người kế thừa; mất kết nối hoàn toàn với đời sống cá nhân và gia đình`
        }
      }
    };

    const stage = stageLabels[cycleNum];
    const effectiveNum = (num === 11 || num === 22) ? num : (num % 9 || 9);
    const cycleData = deepNarrative[cycleNum] || deepNarrative[1];
    const baseNarr = cycleData[effectiveNum] || cycleData[effectiveNum % 9 || 9];
    const cycleAdvice = adviceData[cycleNum] || {};
    const adviceForNum = cycleAdvice[effectiveNum] || cycleAdvice[effectiveNum % 9 || 9] || null;
    const narr = adviceForNum ? { ...baseNarr, advice: adviceForNum } : baseNarr;

    const paragraphsHtml = narr.paragraphs.map((p: string) => `<p class="nar">${p}</p>`).join('\n      ');

    return `<div class="cycle-block">
      <div class="cycle-header">
        <span class="cycle-badge">${cycleNum}</span>
        <div>
          <div class="cycle-label">${stage.title} · <strong style="color:#c026d3">Số ${num}</strong> · <em>${period}</em></div>
          <div class="cycle-theme">Chủ đề: ${narr.theme}</div>
        </div>
      </div>
      ${paragraphsHtml}
      <div class="insight-box">📌 <strong>Bài học cốt lõi:</strong> ${narr.lesson}</div>
      ${narr.advice ? `<div class="lc-advice-box">
        <div class="lc-advice-title">💡 Lời Khuyên Thực Tiễn</div>
        <div class="lc-advice-grid">
          ${narr.advice.career ? `<div class="lc-advice-item">
            <div class="lc-advice-icon">💼</div>
            <div class="lc-advice-content">
              <div class="lc-advice-label">Sự nghiệp & Học hành</div>
              <div class="lc-advice-text">${narr.advice.career}</div>
            </div>
          </div>` : ''}
          ${narr.advice.finance ? `<div class="lc-advice-item">
            <div class="lc-advice-icon">💰</div>
            <div class="lc-advice-content">
              <div class="lc-advice-label">Tài chính</div>
              <div class="lc-advice-text">${narr.advice.finance}</div>
            </div>
          </div>` : ''}
          ${narr.advice.health ? `<div class="lc-advice-item">
            <div class="lc-advice-icon">🌿</div>
            <div class="lc-advice-content">
              <div class="lc-advice-label">Sức khỏe & Năng lượng</div>
              <div class="lc-advice-text">${narr.advice.health}</div>
            </div>
          </div>` : ''}
          ${narr.advice.relationship ? `<div class="lc-advice-item">
            <div class="lc-advice-icon">💗</div>
            <div class="lc-advice-content">
              <div class="lc-advice-label">Mối quan hệ</div>
              <div class="lc-advice-text">${narr.advice.relationship}</div>
            </div>
          </div>` : ''}
        </div>
        ${narr.advice.avoid ? `<div class="lc-advice-avoid"><span class="lc-avoid-label">⚠️ Cần tránh:</span> ${narr.advice.avoid}</div>` : ''}
      </div>` : ''}
    </div>`;
}

  // ════════════════════════════════════════════════════════════════════
  // NĂM/THÁNG CÁ NHÂN — deep narrative with domain advice
  // ════════════════════════════════════════════════════════════════════

export const LIFE_CYCLE_PHASE_EXTRA: Record<number, LifeCyclePhaseExtraEntry> = {
  1: {
    gieoHat: 'Năng lượng số 1 trong giai đoạn niên thiếu hình thành ở bạn tinh thần độc lập và xu hướng tự mình khám phá thế giới từ rất sớm. Bạn thường xuyên muốn thử nghiệm mọi thứ theo cách riêng của mình, dù đôi khi điều đó đồng nghĩa với việc va chắp thực tế. Đây là giai đoạn bạn xây dựng bản sắc cá nhân mạnh mẽ và lòng dũng cảm để tiên phong.',
    truongThanh: 'Bước vào trưởng thành, số 1 thúc đẩy bạn trở thành người dẫn đầu trong sự nghiệp và cuộc sống. Đây là giai đoạn lý tưởng để khởi nghiệp, đảm nhận vai trò lãnh đạo hoặc xây dựng nền tảng độc lập về tài chính. Thách thức là không để cái tôi cá nhân cản trở các mối quan hệ cộng tác.',
    vienMan: 'Ở giai đoạn viên mãn, số 1 tiếp tục thổi vào bạn ngọn lửa của sự độc lập và ý chí. Bạn không muốn nghỉ hưu theo nghĩa thông thường — những người số 1 ở giai đoạn này thường vẫn tiếp tục sáng tạo, đóng góp và dẫn đường cho thế hệ sau bằng kinh nghiệm và trí tuệ tích lũy cả đời.',
  },
  2: {
    gieoHat: 'Năng lượng số 2 trong thời niên thiếu tạo ra một tâm hồn nhạy cảm, giàu cảm xúc và yêu thương. Bạn thường học được cách lắng nghe và thấu cảm từ rất sớm. Gia đình và bạn bè là vũ trụ của bạn trong giai đoạn này — sự hài hòa trong các mối quan hệ là điều bạn luôn tìm kiếm và gìn giữ.',
    truongThanh: 'Giai đoạn trưởng thành với số 2 là thời gian các mối quan hệ trở thành trung tâm cuộc sống — hôn nhân, đối tác, cộng sự. Bạn xuất sắc trong vai trò là người hỗ trợ và kiến tạo sự kết nối. Thách thức là học cách đảm bảo nhu cầu của chính mình cũng được đáp ứng, không chỉ mải lo cho người khác.',
    vienMan: 'Số 2 trong giai đoạn viên mãn khơi dậy ở bạn chiều sâu tâm linh và nhu cầu hòa bình nội tâm. Đây là lúc bạn tổng kết hành trình bằng những mối quan hệ trọn vẹn. Vai trò trung gian, dàn xếp, chữa lành trong gia đình và cộng đồng là nơi bạn tỏa sáng nhất.',
  },
  3: {
    gieoHat: 'Số 3 trong giai đoạn niên thiếu biến bạn thành một đứa trẻ đầy màu sắc, ham thích khám phá và không thiếu bạn bè. Trí tưởng tượng phong phú, khiếu hài hước và năng lực biểu đạt ngôn ngữ phát triển rất sớm. Đây là giai đoạn bạn học cách kể chuyện, sáng tạo và giao tiếp với thế giới bằng tất cả sự hoan hỉ và tò mò tự nhiên.',
    truongThanh: 'Giai đoạn trưởng thành với số 3 là mùa bứt phá sáng tạo. Bạn giỏi nhất trong những lĩnh vực đòi hỏi ý tưởng và biểu đạt — viết, nói, thiết kế, giảng dạy, diễn xuất. Đây cũng là giai đoạn cần rèn thêm kỷ luật để hoàn thành những gì đã bắt đầu, tránh để tài năng rơi vào sự tản mạn.',
    vienMan: 'Số 3 trong giai đoạn viên mãn giữ cho tinh thần bạn trẻ trung và tươi mới bất kể tuổi tác. Bạn tiếp tục sáng tạo, chia sẻ và truyền cảm hứng cho người xung quanh. Đây là giai đoạn đặc biệt thuận lợi để viết hồi ký, truyền nghề, hoặc làm bất cứ điều gì để lại dấu ấn nghệ thuật.',
  },
  4: {
    gieoHat: 'Số 4 trong giai đoạn niên thiếu định hình nên một đứa trẻ cần cảm giác an toàn và có cấu trúc. Bạn thích quy tắc rõ ràng, thường nghiêm túc hơn bạn bè cùng tuổi và có xu hướng quan tâm đến sự thực tế. Nhà cửa gọn gàng, bài tập chu đáo và lối sống có trật tự là những điều bạn thấm sâu vào hành vi.',
    truongThanh: 'Trưởng thành với số 4 là giai đoạn của sự xây dựng bền vững — từ sự nghiệp, tài chính đến gia đình. Bạn làm việc chăm chỉ hơn hầu hết mọi người và thường đạt được thành tựu thực chất. Rủi ro lớn nhất là kiệt sức vì không biết nghỉ ngơi và bỏ lỡ những niềm vui thoáng qua.',
    vienMan: 'Ở giai đoạn viên mãn, số 4 cho bạn cảm giác hài lòng khi nhìn lại toàn bộ những điều đã xây dựng được. Đây là lúc khôn ngoan thực tiễn của bạn trở thành di sản quý giá nhất cho con cháu và những người xung quanh. Bạn là người giữ gìn truyền thống và nền tảng ổn định của gia đình.',
  },
  5: {
    gieoHat: 'Số 5 trong giai đoạn niên thiếu tạo ra một tâm hồn hiếu kỳ không ngừng nghỉ. Bạn chán ngán routine, thích thử nghiệm và yêu thích bất ngờ. Khả năng thích nghi nhanh với môi trường mới và kết bạn với nhiều kiểu người khác nhau là điểm mạnh nổi bật từ rất sớm.',
    truongThanh: 'Giai đoạn trưởng thành với số 5 là hành trình tìm kiếm tự do và đa dạng trải nghiệm. Sự nghiệp của bạn có thể trải rộng nhiều lĩnh vực, bao gồm du lịch, truyền thông, kinh doanh đa ngành. Thách thức là duy trì cam kết đủ lâu để tạo nên thành tựu có chiều sâu, thay vì cứ mãi bắt đầu những chương mới.',
    vienMan: 'Số 5 trong giai đoạn viên mãn tiếp tục giữ bạn năng động và cởi mở với cuộc sống. Bạn không bao giờ thực sự về hưu theo nghĩa cứng nhắc — luôn có chuyến đi mới, góc nhìn mới và mối quan hệ mới chờ đón. Đây là giai đoạn bạn chia sẻ những bài học từ hành trình phong phú của mình.',
  },
  6: {
    gieoHat: 'Số 6 trong giai đoạn niên thiếu hình thành một tâm hồn có trách nhiệm và quan tâm sâu sắc đến người thân. Bạn thường được xem là đứa trẻ ngoan và chín chắn, nhưng bên trong cũng mang nỗi lo lắng về sự hài lòng của người khác. Gia đình là trung tâm an toàn và quan trọng nhất của bạn.',
    truongThanh: 'Giai đoạn trưởng thành với số 6 hướng bạn mạnh mẽ về phía xây dựng gia đình và cộng đồng. Hôn nhân, con cái và mái ấm là trọng tâm của những năm này. Bạn đặc biệt tài năng trong bất kỳ nghề nào liên quan đến chăm sóc, chữa lành và tổ chức không gian sống.',
    vienMan: 'Số 6 trong giai đoạn viên mãn là thời gian bạn thu hoạch những gì đã vun trồng trong các mối quan hệ — con cháu tràn đầy yêu thương, gia đình hạnh phúc và cộng đồng gắn kết. Đây là giai đoạn viên mãn đúng nghĩa nhất cho những ai mang số 6, khi vai trò người chăm sóc trở thành di sản tình thương.',
  },
  7: {
    gieoHat: 'Số 7 trong giai đoạn niên thiếu tạo nên một đứa trẻ thích quan sát hơn tham gia, suy nghĩ nhiều hơn nói. Bạn có nội tâm phong phú, tò mò về những câu hỏi lớn từ rất sớm và thường cảm thấy khác biệt với bạn cùng lứa. Đây là giai đoạn quan trọng để phát triển trực giác và khả năng tư duy độc lập.',
    truongThanh: 'Giai đoạn trưởng thành với số 7 là hành trình đào sâu vào chuyên môn và tìm kiếm sự thật. Bạn xuất sắc trong nghiên cứu, phân tích và bất kỳ lĩnh vực nào cần tư duy chiều sâu. Có thể bạn gặp khó khăn trong việc mở lòng với các mối quan hệ gần gũi — đây là bài học cần thực hành có ý thức.',
    vienMan: 'Số 7 trong giai đoạn viên mãn là sự hội tụ của trí tuệ và tâm linh. Đây là thời điểm bạn đặt ra và trả lời những câu hỏi sâu xa nhất về ý nghĩa cuộc đời. Vai trò cố vấn, người hướng dẫn tri thức phù hợp tuyệt đối với bạn ở giai đoạn tích lũy trọn vẹn này.',
  },
  8: {
    gieoHat: 'Số 8 trong giai đoạn niên thiếu hình thành sự nhận thức về quyền lực, tiền bạc và thực tế từ rất sớm. Bạn thường có tham vọng cao hơn bạn đồng trang lứa và nhạy bén với những cơ hội. Đây là giai đoạn xây dựng ý chí và học cách sử dụng quyền lực một cách có trách nhiệm.',
    truongThanh: 'Trưởng thành với số 8 là giai đoạn của sức mạnh và thành tựu vật chất. Khả năng lãnh đạo, kinh doanh và quản lý tài nguyên của bạn phát triển mạnh mẽ. Đây là thời điểm lý tưởng để xây dựng sự nghiệp lớn — nhưng cũng là lúc dễ nhất để đánh mất sự cân bằng nếu chỉ chạy theo kết quả.',
    vienMan: 'Số 8 trong giai đoạn viên mãn mang đến thời gian để đánh giá lại giá trị thực sự của những gì đã tích lũy. Đây là giai đoạn chuyển hướng từ tích lũy sang sử dụng sức ảnh hưởng và tài nguyên để tạo ra di sản có ý nghĩa sâu xa hơn cho cộng đồng và gia đình.',
  },
  9: {
    gieoHat: 'Số 9 trong giai đoạn niên thiếu tạo nên tâm hồn cảm thụ mạnh mẽ và lòng trắc ẩn rộng lớn từ sớm. Bạn thường xúc động trước nỗi đau của người khác và có xu hướng muốn giúp đỡ mọi người. Đây cũng là giai đoạn bạn bắt đầu cảm nhận rằng mình có sứ mệnh gì đó lớn hơn bản thân.',
    truongThanh: 'Giai đoạn trưởng thành với số 9 là thời gian bạn bắt đầu đi tìm và sống theo sứ mệnh nhân văn của mình. Nghề nghiệp liên quan đến giáo dục, nghệ thuật, y tế hoặc xã hội thường phù hợp và thỏa mãn nhất. Thách thức là học cách buông bỏ và không ôm đồm quá nhiều.',
    vienMan: 'Số 9 trong giai đoạn viên mãn là thời gian hoàn thành vòng tròn — của việc trao đi và tiếp nhận. Đây là giai đoạn tâm linh mở rộng và ý nghĩa cuộc sống trở nên trong sáng hơn bao giờ hết. Bạn trở thành người chứng kiến khôn ngoan cho cuộc sống của những người xung quanh.',
  },
  11: {
    gieoHat: 'Số 11 (Số Master) trong giai đoạn niên thiếu tạo ra một đứa trẻ đặc biệt nhạy cảm, đôi khi bị cảm giác không thuộc về nơi này. Trực giác mạnh mẽ nhưng cũng dễ bị lo âu và quá tải cảm xúc. Đây là giai đoạn quan trọng để học cách bảo vệ năng lượng nội tâm và định hướng trực giác.',
    truongThanh: 'Số 11 trong giai đoạn trưởng thành là thời gian những tiềm năng đặc biệt bắt đầu được hiện thực hóa. Bạn có khả năng truyền cảm hứng và dẫn dắt người khác theo những con đường sáng tạo hoặc tâm linh. Thách thức là cân bằng giữa tầm nhìn cao cả và những đòi hỏi thực tế của cuộc sống.',
    vienMan: 'Số 11 trong giai đoạn viên mãn là đỉnh cao của hành trình nội tâm và sứ mệnh truyền cảm hứng. Đây là lúc những giác ngộ và hiểu biết tích lũy cả đời được biểu đạt trọn vẹn nhất. Bạn trở thành ngọn đèn soi sáng cho những ai đang tìm kiếm ý nghĩa sâu xa hơn trong cuộc sống.',
  },
  22: {
    gieoHat: 'Số 22 (Số Master) trong giai đoạn niên thiếu ươm mầm tư duy của một người xây dựng vĩ đại. Bạn thường có khả năng nhìn xa hơn và suy nghĩ quy mô lớn hơn người cùng tuổi. Đây là giai đoạn học cách biến tầm nhìn thành kế hoạch và kỷ luật để kiên trì theo đuổi những gì quan trọng.',
    truongThanh: 'Số 22 trong giai đoạn trưởng thành là thời gian bạn bắt đầu xây dựng những thứ có tầm ảnh hưởng thực sự — doanh nghiệp, tổ chức, hệ thống, hay bất cứ điều gì có thể tồn tại lâu dài hơn bản thân bạn. Đây là giai đoạn đỉnh cao và đòi hỏi tất cả sự tập trung và kỷ luật.',
    vienMan: 'Số 22 trong giai đoạn viên mãn nhìn lại một hành trình xây dựng với quy mô và chiều sâu hiếm có. Di sản bạn để lại là hệ thống, phong trào hay cộng đồng mà nhiều người tiếp tục thụ hưởng. Đây là giai đoạn của sự hoàn tất mãn nguyện.',
  },
  33: {
    gieoHat: 'Số 33 (Số Master) trong giai đoạn niên thiếu hình thành một tâm hồn yêu thương bao la và nhạy cảm vô cùng. Bạn thường cảm nhận nỗi đau của người khác như của chính mình từ khi còn nhỏ. Đây là giai đoạn học cách yêu thương có ranh giới lành mạnh để không bị kiệt sức bởi sự nhạy cảm quá mức.',
    truongThanh: 'Số 33 trong giai đoạn trưởng thành là thời gian bạn được gọi đến sứ mệnh chữa lành và phụng sự với quy mô lớn. Giáo dục, tâm linh, nghệ thuật chữa lành — bất cứ con đường nào nơi tình yêu thương của bạn có thể chạm đến và thay đổi cuộc sống của những người khác.',
    vienMan: 'Số 33 trong giai đoạn viên mãn là sự trở về với tình yêu vũ trụ — vô điều kiện, vô biên giới và vô hạn. Đây là giai đoạn những người mang Master số 33 thực sự trở thành hiện thân của tình thương trong cộng đồng xung quanh họ, chữa lành bằng chính sự hiện diện.',
  },

};

type LifeCycleStage = {
  cycle: PeriodIndicatorResult;
  index: number;
  icon: string;
  label: string;
  color: string;
  extraKey: keyof LifeCyclePhaseExtraEntry;
  title: string;
};

function parseLifeCyclePeriod(period: string): { startAge: number; endAge?: number } {
  const matches = period.match(/\d+/g)?.map(Number) ?? [];
  return { startAge: matches[0] ?? 0, endAge: matches[1] };
}

function formatAgeRange(startAge: number, endAge?: number): string {
  return typeof endAge === "number" ? `${startAge} - ${endAge} tuổi` : `${startAge} tuổi trở đi`;
}

function formatYearRange(birthYear: number, startAge: number, endAge?: number): string {
  const startYear = birthYear + startAge;
  return typeof endAge === "number" ? `${startYear} - ${birthYear + endAge}` : `${startYear} trở đi`;
}

export function buildLifeCyclesSection(report: NumerologyReport, name: string): string {
  const safeName = escapeHtml(name);
  const birthYear = report.input.dobParts.year;
  const stages: LifeCycleStage[] = report.lifeCycles.slice(0, 3).map((cycle, index) => {
    const configs = [
      { icon: "🌱", label: "GIEO HẠT", color: "#4f46e5", extraKey: "gieoHat" as const, title: "Giai Đoạn 1 — Niên Thiếu (Gieo Hạt)" },
      { icon: "🌳", label: "CHÍN", color: "#7c3aed", extraKey: "truongThanh" as const, title: "Giai Đoạn 2 — Trưởng Thành (Chín)" },
      { icon: "🌾", label: "THU HOẠCH", color: "#c2410c", extraKey: "vienMan" as const, title: "Giai Đoạn 3 — Viên Mãn (Thu Hoạch)" },
    ];
    return { cycle, index, ...configs[index] };
  });

  const circles = stages
    .map((stage) => {
      const { startAge, endAge } = parseLifeCyclePeriod(stage.cycle.period);
      return `<div class="lc-circle-item">
        <div class="lc-circle" style="--lc-phase-color:${stage.color}">
          <div class="lc-stage-icon">${stage.icon}</div>
          <div class="lc-number">${stage.cycle.number}</div>
          <div class="lc-stage-name">${stage.label}</div>
          <div class="lc-age-range">${formatAgeRange(startAge, endAge)}</div>
          <div class="lc-year-range">${formatYearRange(birthYear, startAge, endAge)}</div>
        </div>
      </div>`;
    })
    .join("");

  const intro = `<div class="lc-intro-box">
    <p class="lc-intro-text">Cuộc đời mỗi người không trải ra như một đường thẳng, mà mở ra theo những mùa lớn của linh hồn. Ba chu kỳ đường đời cho thấy cách <strong>${safeName}</strong> được gieo mầm, trưởng thành và thu hoạch ý nghĩa qua từng giai đoạn khác nhau.</p>
    <p class="lc-intro-text"><strong>Gieo Hạt</strong> là giai đoạn hình thành căn tính đầu tiên — nơi những trải nghiệm tuổi thơ, gia đình, môi trường sống và bài học nền tảng đặt xuống những hạt giống sâu nhất trong tâm hồn.</p>
    <p class="lc-intro-text"><strong>Chín</strong> là giai đoạn trưởng thành và biểu hiện — nơi bạn bắt đầu dùng những gì đã học để xây dựng sự nghiệp, quan hệ, gia đình và vị trí của mình trong thế giới.</p>
    <p class="lc-intro-text"><strong>Thu Hoạch</strong> là giai đoạn viên mãn — nơi những lựa chọn, bài học và giá trị đã sống được cô đọng thành trí tuệ, di sản và sự bình an nội tâm.</p>
  </div>`;

  const details = stages
    .map((stage) => {
      const { startAge, endAge } = parseLifeCyclePeriod(stage.cycle.period);
      const ageRange = formatAgeRange(startAge, endAge);
      const yearRange = formatYearRange(birthYear, startAge, endAge);
      const extra = LIFE_CYCLE_PHASE_EXTRA[stage.cycle.number]?.[stage.extraKey];
      return `<article class="lc-phase-block" style="--lc-phase-color:${stage.color}">
        <div class="lc-phase-header">
          <div class="lc-phase-title">${stage.icon} ${stage.title}</div>
          <div class="lc-phase-sub">Số ${stage.cycle.number} / ${ageRange} (${yearRange})</div>
        </div>
        <div class="lc-phase-body">
          ${extra ? `<div class="lc-phase-intro">${extra}</div>` : ""}
          ${lifeCycleNarrative(stage.index + 1, stage.cycle.number, `${ageRange} (${yearRange})`, name, stage.cycle.data as { theme?: string; cycle1?: string; cycle2?: string; cycle3?: string })}
        </div>
      </article>`;
    })
    .join("");

  return `<div class="lc-circle-row">${circles}</div>${intro}${details}`;
}

type PyramidPeakAnalysisData = {
  title: string;
  icon: string;
  intro: string;
  career: string;
  opportunity: string;
  relationship: string;
  health: string;
  warnings: string[];
  innerQ: string;
};

// ════════════════════════════════════════════════════════════════════════════
// CHỈ SỐ SỨ MỆNH (DESTINY NUMBER) — Phân tích sâu theo PDF tham khảo
// Gọi: NT.destiny[num](name, d)
// ════════════════════════════════════════════════════════════════════════════

export function pyramidPeakAnalysis(
  peakIndex: number,
  peakNum: number,
  period: string,
  challengeNum: number | null,
  name: string,
): string {
  const safeName = escapeHtml(name);
  const safePeriod = escapeHtml(period);
    const periodLabels = ['Đầu đời & Thanh Xuân', 'Trưởng Thành', 'Chín Muồi', 'Hoàn Thành & Di Sản'];
    const periodLabel = periodLabels[peakIndex] || `Giai đoạn ${peakIndex + 1}`;
    const n = (typeof peakNum === 'number') ? (peakNum > 9 ? peakNum : peakNum) : parseInt(peakNum) || 1;

    // ── Data per peak number ──────────────────────────────────────────────────
    // ── Data per peak number ──────────────────────────────────────────────────
    const peakData: Record<number, PyramidPeakAnalysisData> = {
      1: {
        title: 'Người Tiên Phong — Năng Lượng Khởi Đầu & Lãnh Đạo',
        icon: '🔥',
        intro: `Trong giai đoạn <strong>${safePeriod}</strong>, vũ trụ đặt <strong>${safeName}</strong> vào đúng vị trí mà số 1 được sinh ra để chiếm lĩnh: <em>vị trí đầu tiên, người khai mở con đường</em>. Đây là ${periodLabel.toLowerCase()} mà mỗi quyết định bạn đưa ra — dù lớn hay nhỏ — đều khắc sâu vào hành trình linh hồn nhiều hơn bạn có thể nhận ra. Số 1 không cho phép bạn đứng sau, không cho phép bạn chờ đợi. Nó thúc đẩy bạn về phía trước với một sức mạnh mà đôi khi chính bạn cũng không hiểu nó từ đâu đến.`,
        career: 'Giai đoạn số 1 đỉnh cao là thời điểm vàng để <strong>khởi nghiệp, nhận vị trí lãnh đạo, hoặc đặt nền móng cho một hướng đi hoàn toàn mới</strong>. Các lĩnh vực phát huy tốt nhất: kinh doanh độc lập, sáng lập startup, quản lý dự án, vai trò trưởng nhóm. Hãy gắn tên mình vào những công trình trong giai đoạn này — đừng để người khác thu hoạch từ hạt giống bạn gieo.',
        opportunity: 'Cánh cửa lớn nhất mở ra cho những ai <strong>dám hành động trước khi sẵn sàng 100%</strong>. Mọi bước đi chủ động trong giai đoạn số 1 đều được khuếch đại — một cuộc gặp gỡ đúng lúc, một dự án táo bạo, một quyết định thay đổi ngành nghề. Đây cũng là lúc xây dựng personal brand sẽ cho quả trong nhiều năm tới.',
        relationship: 'Bạn có sức hút tự nhiên rất mạnh trong giai đoạn này — nhưng hãy tỉnh táo: <strong>sức hút không đồng nghĩa với sự phù hợp</strong>. Trong tình yêu, bạn cần người bạn đời đủ vững để không bị lấn át. Hãy chủ động rèn luyện kỹ năng lắng nghe — đây là điểm yếu tự nhiên cần khắc phục trong giai đoạn số 1.',
        health: 'Năng lượng tràn đầy nhưng nguy cơ <strong>đốt cháy bản thân</strong> rất cao. Não bộ và hệ thần kinh trung ương là vùng cần chú ý. Hãy đặt lịch nghỉ ngơi như một cuộc họp quan trọng — không thể huỷ. Thiền định, yoga hoặc bất kỳ hoạt động "làm chậm" nào là đối trọng hoàn hảo cho năng lượng Yang cực mạnh của số 1.',
        warnings: [
          '<strong>Cô đơn tự nguyện vì cái tôi quá lớn</strong> — xa cách người thân vì không muốn ai "cản trở" bước đi của mình',
          '<strong>Bướng bỉnh khi sai</strong> — từ chối thay đổi hướng đi dù có bằng chứng rõ ràng, vì nhận sai cảm thấy như một thất bại',
          '<strong>Đốt cầu quan hệ</strong> — quyết định quá nhanh, phát ngôn quá thẳng, gây tổn thương những người có thể là đồng minh lâu dài'
        ],
        innerQ: `<strong>${safeName}</strong>, câu hỏi sâu nhất của giai đoạn này là: <em>"Bạn đang dẫn dắt vì muốn phục vụ và tạo ra giá trị — hay vì cần được khẳng định và công nhận?"</em>`,
      },
      2: {
        title: 'Người Hòa Giải — Năng Lượng Kết Nối & Cộng Tác',
        icon: '🤝',
        intro: `Giai đoạn <strong>${safePeriod}</strong> đặt <strong>${safeName}</strong> vào trường năng lượng nhẹ nhàng nhưng đầy chiều sâu của <em>Số 2 — Người Cầu Nối</em>. Đây là ${periodLabel.toLowerCase()} mà vũ trụ không thưởng cho sức mạnh cá nhân — mà thưởng cho <strong>khả năng lắng nghe, kiên nhẫn và hợp tác</strong>. Những ai hiểu được quy luật này sẽ xây được những liên minh bền vững và tạo ra tác động gấp nhiều lần so với một mình chiến đấu.`,
        career: '<strong>Hợp tác, đối tác chiến lược và các vai trò hỗ trợ cao cấp</strong> là nơi năng lượng số 2 phát huy tối đa. Tư vấn, nhân sự, ngoại giao, trị liệu, quản lý quan hệ — tất cả đều được ủng hộ. Một cuộc hợp tác đúng người được ký kết trong giai đoạn này có thể thay đổi toàn bộ hướng đi sự nghiệp của bạn trong thập kỷ tới.',
        opportunity: 'Cơ hội vàng đến từ <strong>những mối quan hệ đặc biệt xuất hiện không báo trước</strong> — người thầy, đối tác kinh doanh, bạn đời tri kỷ. Đây cũng là thời điểm tốt để phát triển kỹ năng lắng nghe chiến lược: loại kỹ năng khiến người đối diện cảm thấy họ là người quan trọng nhất trong phòng.',
        relationship: 'Tình yêu và các mối quan hệ gần gũi là <strong>tâm điểm của giai đoạn số 2</strong>. Bạn có khả năng nuôi dưỡng kết nối sâu sắc và bền vững — nhưng hãy cẩn thận không hy sinh nhu cầu cốt lõi của mình. Ranh giới lành mạnh không phải là ích kỷ — đó là điều kiện để bạn tiếp tục cho đi bền vững.',
        health: 'Năng lượng số 2 cực kỳ nhạy cảm với <strong>căng thẳng môi trường và cảm xúc xung quanh</strong>. Hệ miễn dịch và tiêu hóa dễ bị ảnh hưởng khi có xung đột kéo dài. Hãy tạo ra những "vùng yên tĩnh" trong ngày — không điện thoại, không thông báo, chỉ là bạn và hơi thở.',
        warnings: [
          '<strong>Mất bản thân trong việc đáp ứng kỳ vọng người khác</strong> — đến mức không còn biết mình thực sự muốn gì và là ai',
          '<strong>Thiếu quyết đoán quá mức</strong> — bỏ lỡ những cơ hội thực sự đòi hỏi phải hành động nhanh và dứt khoát',
          '<strong>Thu hút và ôm giữ năng lượng tiêu cực</strong> của người khác vào mình đến mức kiệt sức trong âm thầm'
        ],
        innerQ: `<strong>${safeName}</strong>, câu hỏi sâu nhất của giai đoạn này là: <em>"Bạn đang hợp tác và cho đi từ sức mạnh nội tâm — hay từ nỗi sợ xung đột và bị từ chối?"</em>`,
      },
      3: {
        title: 'Người Biểu Đạt — Năng Lượng Sáng Tạo & Truyền Cảm Hứng',
        icon: '✨',
        intro: `Giai đoạn <strong>${safePeriod}</strong> là mùa hoa nở trong hành trình của <strong>${safeName}</strong> — được chiếu sáng bởi <em>Số 3 — Người Nghệ Sĩ & Người Kể Chuyện</em>. Đây là ${periodLabel.toLowerCase()} mà vũ trụ không chỉ cho phép bạn biểu đạt — vũ trụ <strong>yêu cầu</strong> bạn làm điều đó. Bởi vì giọng nói của bạn, câu chuyện của bạn, và cách bạn nhìn thế giới là thứ mà ai đó đang chờ đợi để được nghe.`,
        career: 'Lĩnh vực nghệ thuật, truyền thông, marketing, giảng dạy, diễn thuyết và viết lách đều <strong>được năng lượng số 3 ủng hộ mạnh mẽ</strong>. Nếu bạn chưa từng thử sáng tạo nội dung, xuất bản, hoặc dạy điều gì đó bạn biết — đây chính là lúc. Giọng nói và câu chuyện của bạn trong giai đoạn này mang sức lan toả đặc biệt mà không phải lúc nào cũng có.',
        opportunity: 'Cơ hội lớn nhất đến từ <strong>việc chia sẻ kiến thức và trải nghiệm</strong> — dưới bất kỳ hình thức nào. Đây cũng là thời điểm vàng để xây dựng mạng lưới xã hội, kết nối với những người sáng tạo cùng chí hướng, và thu hút sự chú ý từ những người đúng đắn. Thương hiệu cá nhân xây dựng trong giai đoạn này phục vụ bạn lâu dài.',
        relationship: 'Sức hút và năng lượng của bạn ở <strong>đỉnh cao trong giai đoạn số 3</strong>. Bạn thu hút người khác một cách tự nhiên — nhưng hãy tỉnh táo phân biệt kết nối có chiều sâu với quan hệ chỉ tồn tại bề mặt. Tình yêu trong giai đoạn số 3 thường bay bổng và đẹp — hãy tận hưởng nhưng đừng để cảm xúc che mờ sự sáng suốt.',
        health: 'Nguy cơ lớn nhất là <strong>dùng caffeine và kích thích để thay thế giấc ngủ</strong>. Hệ hô hấp, cổ họng và tuyến giáp cần được chú ý. Hãy để cơ thể được nghỉ ngơi đủ giấc — sáng tạo thực sự cần không gian tĩnh lặng bên cạnh sự sôi động bề ngoài.',
        warnings: [
          '<strong>Phân tán năng lượng vào quá nhiều hướng cùng lúc</strong> — bắt đầu nhiều dự án thú vị nhưng hoàn thành rất ít',
          '<strong>Dùng sự vui vẻ và duyên dáng như lớp giáp</strong> để tránh đối mặt với những vấn đề cốt lõi và cảm xúc thực sự',
          '<strong>Thiếu kỷ luật tài chính</strong> — thu nhập tốt trong giai đoạn này nhưng cũng tiêu dễ dàng không kém, tạo ra bất ổn dài hạn'
        ],
        innerQ: `<strong>${safeName}</strong>, câu hỏi sâu nhất của giai đoạn này là: <em>"Bạn đang thể hiện bản thân để kết nối thực sự và tạo ra giá trị — hay để được chú ý và công nhận?"</em>`,
      },
      4: {
        title: 'Người Kiến Tạo — Năng Lượng Nền Tảng & Kỷ Luật',
        icon: '🏗️',
        intro: `Giai đoạn <strong>${safePeriod}</strong> đưa <strong>${safeName}</strong> vào trường năng lượng vững chắc của <em>Số 4 — Người Xây Dựng Nền Móng</em>. Đây là ${periodLabel.toLowerCase()} mà vũ trụ không trao cho bạn những thứ hào nhoáng và dễ dàng — mà trao thứ <strong>quý giá hơn nhiều: cơ hội xây dựng điều gì đó thực sự bền vững</strong>. Trong xã hội thích ngắn hạn, đỉnh cao số 4 là loại năng lượng hiếm có và vô cùng cần thiết.`,
        career: 'Giai đoạn lý tưởng để <strong>hệ thống hóa, cấu trúc hóa và xây dựng quy trình bền vững</strong> trong sự nghiệp. Bất kỳ đầu tư nghiêm túc nào về nâng cao chuyên môn hoặc hoàn thiện sản phẩm dài hạn đều sẽ cho quả. Bất động sản, kỹ thuật, tài chính dài hạn và các nghề đòi hỏi tính chính xác cao đều được số 4 đặc biệt ủng hộ.',
        opportunity: 'Những nỗ lực <strong>âm thầm, kiên trì và không hào quang</strong> trong giai đoạn này được đền bù xứng đáng. Đây là lúc tốt nhất để ký những cam kết dài hạn và đặt xuống những viên gạch đầu tiên cho mục tiêu 5-10 năm. Người kiên nhẫn với số 4 sẽ thu hoạch những gì người vội vã không bao giờ đạt được.',
        relationship: 'Số 4 mang đến <strong>xu hướng trở nên nghiêm túc hơn trong tình yêu</strong> — và đó là điều tốt. Bạn tìm kiếm sự ổn định và trung thành, sẵn sàng đầu tư lâu dài. Tuy nhiên đừng để sự "thực tế" giết chết sự lãng mạn hoàn toàn — đôi khi người bạn yêu cần cảm xúc hơn là kế hoạch.',
        health: 'Bạn có xu hướng bỏ qua cơ thể vì làm việc quá sức. <strong>Xương khớp, lưng và hệ cơ xương cần được chú ý đặc biệt</strong>. Đặt lịch tập thể dục đều đặn — như một cuộc hẹn bất di bất dịch, không phải khi "có thời gian".',
        warnings: [
          '<strong>Cứng nhắc quá mức với kế hoạch</strong> — bám vào lịch trình ngay cả khi thực tế đã thay đổi và đòi hỏi linh hoạt',
          '<strong>Ôm quá nhiều trách nhiệm một mình</strong> và kiệt sức trong im lặng thay vì nhờ đến sự hỗ trợ đúng lúc',
          '<strong>Thực dụng quá mức khiến bỏ lỡ cơ hội</strong> — có những thời điểm cần sự liều lĩnh và tư duy sáng tạo mà số 4 thuần túy không cung cấp'
        ],
        innerQ: `<strong>${safeName}</strong>, câu hỏi sâu nhất của giai đoạn này là: <em>"Bạn đang xây dựng từ tình yêu với điều đó và niềm tin vào tương lai — hay từ nỗi sợ mọi thứ sẽ sụp đổ nếu bạn dừng lại?"</em>`,
      },
      5: {
        title: 'Người Giải Phóng — Năng Lượng Thay Đổi & Tự Do',
        icon: '🌊',
        intro: `Giai đoạn <strong>${safePeriod}</strong> thổi vào cuộc đời <strong>${safeName}</strong> một cơn gió lớn của <em>Số 5 — Người Phá Vỡ Giới Hạn</em>. Đây là ${periodLabel.toLowerCase()} mà những thay đổi lớn — đôi khi bất ngờ và không được mời — <strong>không phải là tai họa mà là món quà vũ trụ</strong> tặng cho những ai đủ dũng cảm nắm lấy. Số 5 không cho phép bạn đứng yên. Và chính sự chuyển động đó là nguồn sống của bạn trong giai đoạn này.`,
        career: 'Sự nghiệp trong giai đoạn số 5 cần <strong>sự linh hoạt và khả năng thích nghi</strong>. Những cơ hội tốt nhất thường đến từ hướng không ai ngờ — đừng từ chối chúng vì "không nằm trong kế hoạch". Du lịch, bán hàng, marketing đa kênh, truyền thông và bất cứ nghề nào liên quan đến sự thay đổi đều được ủng hộ mạnh.',
        opportunity: 'Cơ hội đến từ <strong>những gặp gỡ tình cờ, chuyến đi bất ngờ và cuộc trò chuyện tưởng như vô tình</strong>. Hãy giữ lịch trình linh hoạt và tâm thế mở — những cánh cửa trong giai đoạn số 5 chỉ mở trong chớp mắt và không chờ người chưa sẵn sàng.',
        relationship: 'Tình yêu trong giai đoạn số 5 <strong>hào hứng và cuốn hút nhưng cũng dễ bốc hơi</strong> nếu thiếu nền tảng. Bạn cần người bạn đời đủ linh hoạt để đi cùng bạn trong sự thay đổi, không phải người kéo bạn ngược lại. Hãy rõ ràng với chính mình về điều bạn thực sự tìm kiếm.',
        health: 'Nguy cơ lớn nhất là <strong>lạm dụng kích thích</strong> — quá nhiều trải nghiệm, quá ít nghỉ ngơi thực sự. Hệ thần kinh và tiêu hóa dễ bị ảnh hưởng. Hãy tạo ra ít nhất một thói quen ổn định mỗi ngày — như điểm neo trong cơn sóng của số 5.',
        warnings: [
          '<strong>Chạy trốn cam kết thay vì chấp nhận và trưởng thành</strong> — phân biệt sự tự do thực sự với việc né tránh trách nhiệm',
          '<strong>Tìm kiếm khoái cảm tức thì</strong> và bỏ qua những hậu quả tài chính, sức khỏe, quan hệ trong dài hạn',
          '<strong>Thay đổi liên tục đến mức mất phương hướng</strong> — không ai kể cả bạn biết bạn thực sự muốn gì và là ai'
        ],
        innerQ: `<strong>${safeName}</strong>, câu hỏi sâu nhất của giai đoạn này là: <em>"Sự tự do bạn đang tìm kiếm là tự do để hướng đến điều gì — hay chỉ là tự do để thoát khỏi điều gì?"</em>`,
      },
      6: {
        title: 'Người Nuôi Dưỡng — Năng Lượng Tình Yêu & Trách Nhiệm',
        icon: '💛',
        intro: `Giai đoạn <strong>${safePeriod}</strong> đặt <strong>${safeName}</strong> vào trái tim ấm áp của <em>Số 6 — Người Giữ Lửa Gia Đình & Cộng Đồng</em>. Đây là ${periodLabel.toLowerCase()} mà vũ trụ giao cho bạn một trong những nhiệm vụ thiêng liêng nhất: <strong>trở thành nơi nương tựa, người tạo ra sự hài hòa và vẻ đẹp</strong> trong những mối quan hệ xung quanh. Đây không phải giai đoạn của chinh phục — đây là giai đoạn của nuôi dưỡng và chữa lành.`,
        career: 'Các nghề liên quan đến <strong>chăm sóc, giảng dạy, tư vấn, y tế, thiết kế không gian sống</strong> và bất kỳ vai trò nào phục vụ một cộng đồng đều được số 6 ủng hộ đặc biệt. Đây cũng là giai đoạn tốt để xây dựng văn hoá đội nhóm tích cực và làm đẹp môi trường làm việc.',
        opportunity: 'Cơ hội đến từ <strong>phục vụ người khác một cách chân thực và không vụ lợi</strong>. Danh tiếng và sự tin tưởng từ cộng đồng xây dựng trong giai đoạn này không thể mua được bằng tiền — nhưng sẽ mở ra những cánh cửa nghề nghiệp và xã hội rất giá trị sau này.',
        relationship: 'Đây là <strong>đỉnh cao của sự nuôi dưỡng và cam kết sâu sắc</strong>. Tình yêu trong giai đoạn số 6 có thể đạt đến chiều sâu mà các giai đoạn khác không có. Nhưng hãy cẩn thận với xu hướng kiểm soát người thân "vì muốn tốt cho họ" — nuôi dưỡng lành mạnh là trao quyền, không phải tạo sự phụ thuộc.',
        health: 'Bạn dễ bỏ qua sức khỏe <strong>của chính mình</strong> trong khi chăm sóc người khác. Tim, tuần hoàn và hậu quả của căng thẳng tích tụ cần được chú ý. Hãy nhớ: bạn không thể rót nước từ một chiếc bình rỗng.',
        warnings: [
          '<strong>Kiểm soát người thân vì thương yêu</strong> — nhưng kiểm soát vẫn là kiểm soát, dù động cơ tốt đến đâu',
          '<strong>Hy sinh quá mức đến mức cảm thấy oán giận</strong> — khi sự cho đi đến từ cảm giác nghĩa vụ thay vì tình yêu thực sự',
          '<strong>Nhận trách nhiệm cho cảm xúc và hạnh phúc của người khác</strong> — đây là gánh nặng không ai có thể mang hộ ai'
        ],
        innerQ: `<strong>${safeName}</strong>, câu hỏi sâu nhất của giai đoạn này là: <em>"Bạn đang yêu thương và chăm sóc từ sự sung mãn nội tâm — hay từ nỗi sợ rằng nếu không làm vậy, bạn sẽ mất đi tình yêu của họ?"</em>`,
      },
      7: {
        title: 'Người Tìm Kiếm Sự Thật — Năng Lượng Tri Thức & Tâm Linh',
        icon: '🔮',
        intro: `Giai đoạn <strong>${safePeriod}</strong> là mùa thu hoạch của <strong>${safeName}</strong> — không phải thu hoạch vật chất mà thu hoạch <em>tri thức, trí tuệ và sự giác ngộ nội tâm</em>. <em>Số 7 — Người Tìm Sự Thật</em> không phải là con số của thành công nhanh chóng. Đây là ${periodLabel.toLowerCase()} mà <strong>chiều sâu và chất lượng của sự hiểu biết quan trọng hơn tốc độ và số lượng</strong>.`,
        career: 'Nghiên cứu chuyên sâu, phân tích, tư vấn chiến lược, tâm lý học, khoa học và <strong>bất kỳ lĩnh vực nào đòi hỏi sự đào sâu nghiêm túc</strong> đều được năng lượng số 7 ủng hộ. Đây là lúc để trở thành chuyên gia thực sự — không phải người biết nhiều thứ loáng thoáng mà là người hiểu một thứ ở mức độ người khác không thể đạt được.',
        opportunity: 'Cơ hội lớn đến từ <strong>việc chia sẻ tri thức chuyên sâu</strong> mà bạn đã tích lũy. Một khoá học được tạo ra, một phương pháp được hệ thống hoá — những thứ này trong giai đoạn số 7 có thể định hình danh tiếng của bạn trong nhiều năm tới.',
        relationship: 'Số 7 là con số của <strong>sự cô đơn thiêng liêng</strong> — bạn cần không gian riêng để suy ngẫm và tái tạo năng lượng. Người bạn đời lý tưởng là người hiểu và tôn trọng điều đó, không cảm thấy bị từ chối khi bạn cần không gian một mình.',
        health: '<strong>Não bộ và hệ thần kinh</strong> là vùng cần chú ý — đặc biệt là rối loạn giấc ngủ do suy nghĩ quá nhiều. Hãy tập thực hành "tắt não" vào buổi tối. Thiên nhiên là liều thuốc tốt nhất cho số 7.',
        warnings: [
          '<strong>Cô lập quá mức</strong> — rút lui khỏi các mối quan hệ đến mức trở thành cô đơn không lành mạnh',
          '<strong>Hoài nghi và lạnh lùng với cảm xúc</strong> — phân tích mọi thứ đến mức không thể kết nối và tin tưởng người khác',
          '<strong>Ôm giữ tri thức cho riêng mình</strong> — không chia sẻ những gì bạn biết vì sợ bị phán xét hoặc vì cảm giác người khác không hiểu được'
        ],
        innerQ: `<strong>${safeName}</strong>, câu hỏi sâu nhất của giai đoạn này là: <em>"Sự thu mình và chiều sâu bạn theo đuổi là để hiểu bản thân và phục vụ người khác tốt hơn — hay để trốn tránh thế giới và những mối quan hệ đòi hỏi sự dễ tổn thương?"</em>`,
      },
      8: {
        title: 'Người Kiến Tạo Quyền Lực — Năng Lượng Thịnh Vượng & Ảnh Hưởng',
        icon: '⚡',
        intro: `Giai đoạn <strong>${safePeriod}</strong> đặt <strong>${safeName}</strong> vào trường năng lượng mạnh mẽ và đòi hỏi nhất của <em>Số 8 — Người Kiến Tạo Thịnh Vượng</em>. Vũ trụ không trao số 8 cho người yếu lòng — nó trao cho những ai <strong>có khả năng chịu đựng áp lực lớn, dám đối mặt với thực tế khắc nghiệt và vẫn tiến lên</strong>. Đây là ${periodLabel.toLowerCase()} mà thành công vật chất và sức ảnh hưởng là hoàn toàn có thể.`,
        career: 'Tài chính, quản lý cấp cao, kinh doanh quy mô lớn, bất động sản và <strong>các lĩnh vực đòi hỏi tư duy chiến lược và quản lý nguồn lực</strong> đều được số 8 ủng hộ. Đây là giai đoạn để đàm phán những thỏa thuận lớn, thăng tiến vị trí quản lý cấp cao, và xây dựng sức ảnh hưởng tài chính thực sự.',
        opportunity: '<strong>Thu nhập và tài sản tăng trưởng mạnh</strong> là đặc trưng của giai đoạn số 8 — nhưng chỉ khi bạn hành động từ sự chính trực. Bộ lọc tốt nhất cho mọi cơ hội: "Liệu điều này có tạo ra giá trị thực cho người khác không?"',
        relationship: 'Bạn yêu mạnh mẽ và bảo hộ — nhưng <strong>cần một người bạn đời không bị đe dọa bởi sức mạnh của bạn</strong>. Hãy cẩn thận không để sự bận rộn và tập trung vào sự nghiệp làm lạnh dần các mối quan hệ quan trọng.',
        health: '<strong>Hệ tim mạch và huyết áp là những vùng cần giám sát</strong> trong giai đoạn áp lực cao của số 8. Tập thể dục không chỉ là sức khỏe — với số 8, nó còn là cách giải phóng áp lực tích tụ. Hãy chuyển hóa căng thẳng qua thể chất, không phải dồn nén nó.',
        warnings: [
          '<strong>Ám ảnh với kết quả đến mức bỏ qua con người</strong> — xem người khác qua lăng kính năng suất và lợi ích thay vì giá trị con người',
          '<strong>Tích luỹ mà không bao giờ thấy đủ</strong> — chu kỳ "chỉ cần thêm một chút nữa" khiến ngưỡng hài lòng không bao giờ đến',
          '<strong>Dùng quyền lực để kiểm soát thay vì trao quyền</strong> — đây là sự lãng phí lớn nhất của năng lượng số 8'
        ],
        innerQ: `<strong>${safeName}</strong>, câu hỏi sâu nhất của giai đoạn này là: <em>"Thịnh vượng bạn đang xây dựng sẽ phục vụ điều gì — và khi đạt được, cuộc sống của những ai xung quanh bạn sẽ tốt hơn không?"</em>`,
      },
      9: {
        title: 'Người Hoàn Thành Chu Kỳ — Năng Lượng Nhân Đạo & Buông Bỏ',
        icon: '🌏',
        intro: `Giai đoạn <strong>${safePeriod}</strong> đặt <strong>${safeName}</strong> vào trường năng lượng sâu thẳm và nhân văn nhất của <em>Số 9 — Người Hoàn Thành, Linh Hồn Đã Trải Qua Nhiều</em>. Đây là ${periodLabel.toLowerCase()} mà sứ mệnh của bạn vượt ra khỏi giới hạn của bản thân — <strong>vũ trụ gọi bạn đến những điều lớn hơn chính mình</strong>. Số 9 không phải về tích luỹ — nó về cho đi, về buông bỏ, về phục vụ điều gì đó có ý nghĩa bền vững.`,
        career: '<strong>Nhân đạo, giáo dục, nghệ thuật chữa lành, lãnh đạo cộng đồng và bất kỳ lĩnh vực nào có tác động xã hội rộng lớn</strong> đều được ủng hộ trong giai đoạn số 9. Đây là lúc kiến thức và kinh nghiệm tích lũy từ các giai đoạn trước được tổng hợp thành sự đóng góp thực sự có giá trị.',
        opportunity: 'Cơ hội lớn nhất đến từ <strong>việc kết nối những gì bạn biết với những gì thế giới cần</strong>. Một dự án xã hội, một tác phẩm sáng tạo, một chương trình đào tạo — bất cứ điều gì giúp bạn "trả lại" cho cuộc đời theo cách chỉ bạn có thể làm được.',
        relationship: 'Bạn yêu rộng lớn và vị tha trong giai đoạn này — nhưng <strong>hãy học cách yêu thương với ranh giới lành mạnh</strong>. Buông bỏ những mối quan hệ đã hết vai trò trong hành trình là một hành động yêu thương — với cả họ và bạn.',
        health: 'Hệ miễn dịch và sức khỏe cảm xúc cần được <strong>nuôi dưỡng có ý thức</strong>. Bạn dễ bị kiệt sức vì ôm quá nhiều nỗi đau của người khác. Hãy thực hành buông bỏ theo nghĩa đen — thở ra, nhả ra, và nhớ rằng bạn không phải cứu vớt ai ngoài việc sống trọn vẹn nhất có thể.',
        warnings: [
          '<strong>Ôm giữ vết thương cũ không chịu buông</strong> — tha thứ không phải để người kia xứng đáng, mà để bạn được tự do',
          '<strong>Tự tan trong người khác</strong> — mất ranh giới giữa lòng trắc ẩn lành mạnh và sự hoà tan bản thân',
          '<strong>Cưu mang quá nhiều trách nhiệm nhân đạo</strong> cùng lúc đến mức không thể làm tốt bất kỳ điều nào trong số đó'
        ],
        innerQ: `<strong>${safeName}</strong>, câu hỏi sâu nhất của giai đoạn này là: <em>"Bạn đang cho đi từ sự sung mãn và tình yêu — hay từ cảm giác tội lỗi rằng mình chưa đủ khi chưa cứu được ai đó?"</em>`,
      },
      10: {
        title: 'Người Mang Sức Mạnh Đặc Biệt — Năng Lượng Số 10 Siêu Việt',
        icon: '🌟',
        intro: `Giai đoạn <strong>${safePeriod}</strong> đặt <strong>${safeName}</strong> vào một trong những trường năng lượng đặc biệt nhất của kim tự tháp: <em>Số 10 — Con Số Của Một Chu Kỳ Hoàn Thành Và Bắt Đầu Lại Ở Tầng Cao Hơn</em>. Số 10 trong kim tự tháp không được rút gọn về 1 — nó mang trong mình <strong>năng lượng của Số 1 được tăng cường bởi Số 0 — biểu tượng của tiềm năng vô hạn</strong>. Đây là ${periodLabel.toLowerCase()} với sức mạnh tiên phong cực đại và chiều sâu khôn ngoan từ những gì đã trải qua.`,
        career: 'Số 10 mang <strong>sức mạnh lãnh đạo của Số 1 nhưng với chiều sâu và sự chín chắn lớn hơn nhiều</strong>. Đây là giai đoạn lý tưởng để thành lập hoặc tái cơ cấu tổ chức, dẫn dắt sự thay đổi mang tính hệ thống. Những người sở hữu đỉnh số 10 thường có khả năng hướng dẫn và thôi thúc người khác theo cách rất tự nhiên.',
        opportunity: 'Cơ hội lớn nhất đến từ <strong>việc dẫn dắt và truyền cảm hứng theo cách riêng</strong> — không theo bất kỳ công thức có sẵn nào. Số 10 không đi theo con đường của ai — nó tạo ra con đường. Hãy tin vào trực giác lãnh đạo của bạn, ngay cả khi không ai hiểu hướng đi bạn chọn.',
        relationship: 'Bạn yêu với <strong>sức mạnh và sự quyết tâm đặc trưng của số 1 nhưng mang chiều sâu cảm xúc của số 0</strong>. Khi đã chọn ai, bạn toàn tâm toàn ý. Người bạn đời lý tưởng tôn trọng sức mạnh của bạn như một tài sản, không xem nó là mối đe dọa.',
        health: 'Bạn có nguồn năng lượng thể chất đặc biệt nhưng <strong>hệ thần kinh cần được bảo vệ khỏi sự kích thích liên tục</strong>. Tạo ra những khoảng "im lặng" trong ngày — không để thông tin, quyết định và trách nhiệm lấp đầy mọi khoảng trống trong nhận thức.',
        warnings: [
          '<strong>Ôm tất cả không chia sẻ</strong> — cảm thấy mình phải tự mình làm mọi thứ vì không ai làm tốt như mình',
          '<strong>Không biết khi nào cần dừng lại</strong> — đốt cháy năng lượng vô tận đến khi cơ thể và tinh thần bắt buộc phải dừng',
          '<strong>Cô đơn ở đỉnh cao</strong> — không chia sẻ được với ai vì cảm thấy không ai ở cùng tần số'
        ],
        innerQ: `<strong>${safeName}</strong>, câu hỏi sâu nhất của giai đoạn này là: <em>"Sức mạnh và tầm ảnh hưởng bạn đang xây dựng sẽ được dùng để làm gì — và ai sẽ được hưởng lợi từ điều đó cùng với bạn?"</em>`,
      },
      11: {
        title: 'Nhà Giác Ngộ — Năng Lượng Trực Giác Siêu Việt & Sứ Mệnh Ánh Sáng',
        icon: '💫',
        intro: `Giai đoạn <strong>${safePeriod}</strong> đặt <strong>${safeName}</strong> vào trường năng lượng bậc thầy hiếm có của <em>Số 11 — Con Số Master, Người Mang Ánh Sáng</em>. Đây là ${periodLabel.toLowerCase()} mà ranh giới giữa trực giác và lý trí mờ dần — <strong>những điều bạn "cảm nhận" thường chính xác hơn những gì bạn "suy nghĩ"</strong>. Số 11 trong kim tự tháp không được rút gọn về 2 — nó mang tần số rung động hoàn toàn khác, đòi hỏi mức độ trưởng thành và nhận thức về bản thân rất cao.`,
        career: 'Trực giác đặc biệt nhạy bén là <strong>công cụ nghề nghiệp mạnh nhất</strong> của bạn trong giai đoạn này. Bất kỳ lĩnh vực nào đòi hỏi sự sáng tạo đột phá, tầm nhìn chiến lược xa và khả năng truyền cảm hứng cho tập thể — lãnh đạo tinh thần, tư vấn cao cấp, nghệ thuật, giáo dục đổi mới — đều phát huy tối đa năng lượng số 11.',
        opportunity: 'Những ý tưởng và tầm nhìn bạn nhận được trong giai đoạn này thường <strong>đi trước thời đại 5-10 năm</strong>. Hãy ghi lại tất cả — ngay cả những thứ có vẻ điên rồ — vì chúng sẽ có ý nghĩa sau này. Đây cũng là thời điểm tốt để phát triển và chia sẻ những khả năng tâm linh và trực giác một cách có cấu trúc và có ích.',
        relationship: 'Bạn cảm nhận được cảm xúc và nhu cầu chưa được nói của người khác theo cách mà ít người có. Đây là <strong>thiên phú — nhưng chỉ khi bạn học được cách giữ ranh giới năng lượng rõ ràng</strong>. Không phải nhiệm vụ của bạn là chữa lành mọi người bạn gặp.',
        health: 'Hệ thần kinh cực kỳ nhạy cảm trong giai đoạn số 11. <strong>Thiền định không phải là tuỳ chọn — đó là nhu cầu sinh tồn</strong>. Hãy tạo ra những khoảng "detox năng lượng" thường xuyên: thời gian trong thiên nhiên, không điện thoại, không tiếp nhận thông tin cảm xúc từ người khác.',
        warnings: [
          '<strong>Gánh nặng trách nhiệm quá lớn</strong> — cảm thấy mình phải cứu hoặc chữa lành tất cả mọi người xung quanh',
          '<strong>Lo lắng và kiệt sức thần kinh kinh niên</strong> — hệ thần kinh siêu nhạy cảm liên tục bị kích thích mà không có thời gian phục hồi',
          '<strong>Dao động giữa xuất chúng và sụp đổ</strong> mà không có điểm trung bình ổn định nào giữa hai thái cực'
        ],
        innerQ: `<strong>${safeName}</strong>, câu hỏi sâu nhất của giai đoạn này là: <em>"Bạn đang sống với và từ những khả năng đặc biệt của mình — hay đang bị chúng dẫn dắt đến kiệt sức và mất phương hướng?"</em>`,
      },
      22: {
        title: 'Kiến Trúc Sư Vũ Trụ — Năng Lượng Tạo Ra Di Sản Vĩnh Cửu',
        icon: '🏛️',
        intro: `Giai đoạn <strong>${safePeriod}</strong> đặt <strong>${safeName}</strong> vào trường năng lượng hùng vĩ hiếm có của <em>Số 22 — Kiến Trúc Sư Bậc Thầy</em>. Đây là ${periodLabel.toLowerCase()} mà vũ trụ trao cho bạn vừa <strong>tầm nhìn của nhà tiên tri vừa bàn tay của người thợ thủ công có tay nghề cao</strong> — khả năng hiếm hoi biến những điều phi thường thành hiện thực vật lý. Số 22 không xây nhà — nó xây đế chế, xây phong trào, xây hệ thống tồn tại sau khi người xây đã rời đi.`,
        career: 'Bạn có khả năng tạo ra những dự án và tổ chức có <strong>tầm ảnh hưởng xuyên thế hệ</strong>. Kiến trúc, kỹ thuật, chính sách công, lãnh đạo tổ chức quốc tế, xây dựng di sản văn hoá, hệ thống giáo dục — bất kỳ lĩnh vực nào kết hợp tầm nhìn vĩ mô với khả năng thực thi cụ thể đều xứng đáng với số 22.',
        opportunity: 'Những cơ hội trong giai đoạn này thường có <strong>quy mô lớn hơn những gì bạn nghĩ mình xứng đáng nhận</strong>. Đừng co lại. Vũ trụ giao những dự án lớn cho số 22 bởi vì linh hồn bạn đã chuẩn bị — ngay cả khi tâm trí còn nghi ngờ.',
        relationship: 'Bạn cần những người bạn đời và cộng sự <strong>đủ tin tưởng để chia sẻ tầm nhìn lớn và đủ thực tế để giữ bạn có chân trên mặt đất</strong>. Đây là giai đoạn cần những mối quan hệ có chiều sâu và nền tảng vững chắc, không phải những kết nối xã giao phù du.',
        health: 'Gánh nặng của trách nhiệm lớn có thể đè nặng lên hệ thần kinh và tâm lý. <strong>Áp lực kỳ vọng cao cần được quản lý có ý thức</strong>. Hãy xây dựng những thói quen phục hồi năng lượng nghiêm túc như một phần của kỷ luật hàng ngày, không phải như phần thưởng khi "xong việc".',
        warnings: [
          '<strong>Áp lực kỳ vọng tự đặt ra</strong> — trở thành gánh nặng đè nặng đến mức tê liệt và không thể hành động',
          '<strong>Thất vọng sâu khi thực tế chuyển động chậm hơn tầm nhìn</strong> — dẫn đến bỏ cuộc giữa chừng ngay trước khi đạt đến đỉnh',
          '<strong>Cô đơn của người nhìn xa hơn đám đông</strong> — không ai xung quanh thực sự hiểu được điều bạn đang cố tạo ra'
        ],
        innerQ: `<strong>${safeName}</strong>, câu hỏi sâu nhất của giai đoạn này là: <em>"Bạn đang kiến tạo từ Sứ Mệnh và tình yêu với điều đó — hay từ nhu cầu được lịch sử ghi nhận và nhớ đến?"</em>`,
      },
    };

    const pd = peakData[n] || peakData[1];
    const challengeSuffix = challengeNum !== null
      ? `<p class="nar" style="margin-top:0.5rem;font-size:0.93em;color:#64748b;"><em>📌 Thử thách song hành trong giai đoạn này: <strong>Số ${challengeNum}</strong> — đây là bài học mà năng lượng đỉnh cao số ${n} buộc bạn phải đối mặt và vượt qua để phát huy hết tiềm năng.</em></p>` : '';

    return `
    <div class="peak-analysis-block">
      <div class="peak-analysis-header">
        <div class="peak-analysis-num">${n}</div>
        <div>
          <div class="peak-analysis-kicker">${['Đỉnh Thứ Nhất', 'Đỉnh Thứ Hai', 'Đỉnh Thứ Ba', 'Đỉnh Thứ Tư'][peakIndex] || 'Đỉnh Cao'} — ${periodLabel}</div>
          <div class="peak-analysis-title">${pd.icon} ${pd.title}</div>
          <div class="peak-analysis-age">${safePeriod}</div>
        </div>
      </div>

      <p class="nar">${pd.intro}</p>
      ${challengeSuffix}

      <div class="peak-aspect-grid">
        <div class="peak-aspect-box career">
          <div class="peak-aspect-label">💼 Sự nghiệp & Tài chính</div>
          <p class="peak-aspect-text">${pd.career}</p>
        </div>
        <div class="peak-aspect-box opportunity">
          <div class="peak-aspect-label">🌱 Cơ hội mở ra</div>
          <p class="peak-aspect-text">${pd.opportunity}</p>
        </div>
        <div class="peak-aspect-box love">
          <div class="peak-aspect-label">💞 Tình yêu & Quan hệ</div>
          <p class="peak-aspect-text">${pd.relationship}</p>
        </div>
        <div class="peak-aspect-box health">
          <div class="peak-aspect-label">🌿 Sức khỏe & Năng lượng</div>
          <p class="peak-aspect-text">${pd.health}</p>
        </div>
      </div>

      <div class="peak-negatives">
        <div class="peak-negatives-label">⚠️ Các khía cạnh tiêu cực cần tránh</div>
        <ul>
          ${pd.warnings.map(w => `<li>${w}</li>`).join('')}
        </ul>
      </div>

      <div class="peak-reflection">
        <div class="peak-reflection-label">🪷 Câu hỏi chiêm nghiệm nội tâm</div>
        <p>${pd.innerQ}</p>
      </div>
    </div>`;

}

function replaceNarrativeVars(html: string, vars: Record<string, string | number>): string {
  let out = html;
  for (const [key, value] of Object.entries(vars)) {
    out = out.replaceAll(`{{${key}}}`, escapeHtml(String(value)));
  }
  return out;
}

function renderPyramidNarrative(
  narrative: NarrativeKb | undefined,
  group: "pyramidPeak" | "pyramidChallenge",
  number: number | string,
  vars: Record<string, string | number>,
): string {
  const entry = narrative?.[group]?.[String(number)];
  return entry ? replaceNarrativeVars(entry.html, vars) : "";
}

function parsePyramidPeriodAge(str: string): { start: number | null; end: number | null; isOpen: boolean } {
  if (!str) return { start: null, end: null, isOpen: false };
  const rangeM = str.match(/(\d+)\s*[\u2013\-]\s*(\d+)/);
  if (rangeM) return { start: Number.parseInt(rangeM[1] ?? "", 10), end: Number.parseInt(rangeM[2] ?? "", 10), isOpen: false };
  const openM = str.match(/(\d+)/);
  if (openM) return { start: Number.parseInt(openM[1] ?? "", 10), end: null, isOpen: true };
  return { start: null, end: null, isOpen: false };
}

export function buildPyramidSection(report: NumerologyReport, name: string, narrative?: NarrativeKb): string {
  const peaks = report.pyramidPeaks;
  const challenges = report.pyramidChallenges;
  const birthYear = report.input.dobParts.year;

  const buildPeriodHeader = (periodStr: string, idx: number): string => {
    const { start, end, isOpen } = parsePyramidPeriodAge(periodStr);
    const labels = ["Một", "Hai", "Ba", "Bốn"];
    const lb = labels[idx] || String(idx + 1);
    if (start === null) return `7.${idx + 1}. Giai đoạn ${lb}`;
    const sy = birthYear + start;
    if (isOpen) return `7.${idx + 1}. GIAI ĐOẠN ${lb.toUpperCase()} — KỂ TỪ TUỔI ${start} (${sy}) TRỞ ĐI`;
    const ey = birthYear + (end ?? start);
    return `7.${idx + 1}. GIAI ĐOẠN ${lb.toUpperCase()} TỪ ĐẦU TUỔI ${start} (${sy}) TỚI HẾT TUỔI ${end} (${ey})`;
  };

  const renderPeak = (peak: PeriodIndicatorResult, idx: number): string => {
    const data = asRecord(peak.data);
    const period = peak.period || "";
    const n = peak.number % 9 || 9;
    let html = `<h4 class="pyramid-sub-heading">7.${idx + 1}.1. Đỉnh cao của bạn trong giai đoạn này là số ${peak.number}</h4>`;
    const narrativeHtml = renderPyramidNarrative(narrative, "pyramidPeak", n, {
      name,
      period,
      peakIndex: idx + 1,
    });
    if (narrativeHtml) {
      html += narrativeHtml;
    } else {
      if (typeof data.theme === "string") html += `<p class="nar"><em>${data.theme}</em></p>`;
      if (typeof data.opportunity === "string") html += `<p class="nar">${data.opportunity}</p>`;
      if (typeof data.challenge === "string") html += `<p class="nar"><span class="pyramid-note">⚠ Lưu ý:</span> ${data.challenge}</p>`;
      if (typeof data.advice === "string") html += `<p class="nar"><span class="pyramid-advice">★ Lời khuyên:</span> ${data.advice}</p>`;
    }
    const keywords = data.keywords;
    if (Array.isArray(keywords) && keywords.length) {
      html += `<p class="nar pyramid-keywords"><strong>Từ khóa năng lượng:</strong> ${keywords.join(" · ")}</p>`;
    } else if (typeof keywords === "string") {
      html += `<p class="nar pyramid-keywords"><strong>Từ khóa năng lượng:</strong> ${keywords}</p>`;
    }
    return html;
  };

  const renderChallenge = (challenge: PeriodIndicatorResult | undefined, idx: number): string => {
    const data = asRecord(challenge?.data);
    const num = challenge?.number ?? "?";
    const period = challenge?.period || peaks[idx]?.period || "";
    let html = `<h4 class="pyramid-sub-heading challenge">7.${idx + 1}.2. Thử thách của bạn trong giai đoạn này là số ${num}</h4>`;
    const narrativeHtml = renderPyramidNarrative(narrative, "pyramidChallenge", num, { name, period });
    if (narrativeHtml) {
      html += narrativeHtml;
    } else {
      if (typeof data.lesson === "string") html += `<p class="nar">${data.lesson}</p>`;
      if (typeof data.trap === "string") html += `<p class="nar"><span class="pyramid-note">⚡ Bẫy định kiến:</span> ${data.trap}</p>`;
      if (typeof data.how_to_overcome === "string") html += `<p class="nar"><span class="pyramid-advice">✔ Cách vượt qua:</span> ${data.how_to_overcome}</p>`;
    }
    return html;
  };

  const periodsHtml = peaks
    .map(
      (peak, index) => `
    <div class="pyramid-period">
      <h3 class="pyramid-period-heading">${buildPeriodHeader(peak.period, index)}</h3>
      ${renderPeak(peak, index)}
      ${renderChallenge(challenges[index], index)}
    </div>`,
    )
    .join("");

  const peakAnalysisHtml = peaks
    .map((peak, index) => pyramidPeakAnalysis(index, peak.number, peak.period, challenges[index]?.number ?? null, name))
    .join("");

  return `
    <p class="nar">Kim Tự Tháp cho thấy <strong>4 giai đoạn</strong> trong cuộc đời bạn — mỗi giai đoạn tương ứng với một đỉnh cao và một thử thách riêng. Đỉnh cao là năng lượng chủ đề bạn nên phát triển trong giai đoạn đó; thử thách là bài học bạn bắt buộc phải vượt qua để tiến lên đỉnh kế tiếp.</p>
    <!-- CHART:pyramid -->
    <div class="pyramid-periods-wrap">${periodsHtml}</div>
    <h4 class="pyramid-analysis-heading">Phân Tích Chi Tiết Từng Đỉnh Cao</h4>
    ${peakAnalysisHtml}
  `;
}

function sameEnergy(a: number, b: number): boolean {
  const active = [1, 3, 5, 9];
  const stable = [2, 4, 6, 8];
  return (active.includes(a) && active.includes(b)) || (stable.includes(a) && stable.includes(b));
}

export type LifePathFamous = { name: string; field: string; note?: string };
export type LifePathCompat = {
  tot?: number[];
  khong?: number[];
  moTaTot?: string;
  moTaKhong?: string;
  chiTiet?: string;
};
export type LifePathExtraEntry = {
  nguoiNoiTieng?: LifePathFamous[];
  tuongThich?: LifePathCompat;
  tinhDuyen?: string;
  baiHocThuThach?: string;
  banBeGiaDinh?: string;
  duLichSoThich?: string;
  ngheNghiep?: string;
};

export const LIFE_PATH_EXTRA: Record<number, LifePathExtraEntry> = {

  1: {
    nguoiNoiTieng: [
      { name: 'Steve Jobs', field: 'Công nghệ', note: 'Nhà sáng lập Apple, biểu tượng của tư duy tiên phong và ý chí lãnh đạo không ai bắt chước được' },
      { name: 'Napoleon Bonaparte', field: 'Lịch sử / Quân sự', note: 'Hoàng đế Pháp — chiến lược gia vĩ đại với khát vọng chinh phục không giới hạn' },
      { name: 'Lady Gaga', field: 'Âm nhạc', note: 'Biểu tượng pop độc đáo, luôn dẫn đầu xu hướng, không ngại thách thức chuẩn mực' },
      { name: 'Martin Luther King Jr.', field: 'Nhân quyền', note: 'Lãnh đạo phong trào dân quyền — người thay đổi lịch sử bằng ý chí và tầm nhìn' },
      { name: 'Nikola Tesla', field: 'Khoa học', note: 'Thiên tài phát minh độc lập — người đi trước thời đại trong lĩnh vực điện từ' },
      { name: 'Scarlett Johansson', field: 'Điện ảnh', note: 'Nữ diễn viên hàng đầu Hollywood với cá tính mạnh mẽ và sự nghiệp tự xây dựng' },
    ],
    tuongThich: {
      tot: [3, 5, 7],
      khong: [2, 4, 6],
      moTaTot: 'Số 3 mang sáng tạo bù đắp cho sự nghiêm túc của số 1. Số 5 cùng yêu tự do và hành động nhanh. Số 7 kích thích trí tuệ và chiều sâu tư duy của số 1.',
      moTaKhong: 'Số 2 và số 4 có nhịp sống chậm hơn, dễ gây xung đột với tốc độ của số 1. Số 6 cần sự ổn định và cam kết mà số 1 đôi khi khó duy trì liên tục.',
      chiTiet: `<ul>
        <li><strong>Số 3:</strong> Số 1 cung cấp định hướng và ý chí, số 3 mang đến niềm vui và sắc màu. Cả hai đều năng động và yêu hành động.</li>
        <li><strong>Số 5:</strong> Hai linh hồn tự do — cùng thích khám phá, không chịu bị gò bó và luôn tìm kiếm điều mới mẻ tiếp theo.</li>
        <li><strong>Số 7:</strong> Số 1 hành động, số 7 suy nghĩ sâu — sự bổ sung tuyệt vời giữa trực giác và hành động có chiều sâu.</li>
      </ul>`,
    },
    tinhDuyen: `<ul>
      <li><strong>Phong cách yêu:</strong> Số 1 yêu mạnh mẽ, đam mê và thường là người chủ động. Bạn muốn dẫn dắt và bảo vệ người mình yêu, nhưng đôi khi quên rằng tình yêu cần sự cân bằng giữa cho và nhận.</li>
      <li><strong>Điều bạn cần ở người yêu:</strong> Người có thể ngưỡng mộ sức mạnh của bạn mà không sợ bạn, đủ mạnh để không bị nuốt chửng bởi cái tôi của bạn, nhưng cũng đủ linh hoạt để theo nhịp sống năng động.</li>
      <li><strong>Thử thách tình cảm:</strong> Xu hướng kiểm soát và cái tôi cao có thể tạo ra căng thẳng. Bạn cần học cách lắng nghe và cho phép người kia có không gian riêng trong mối quan hệ.</li>
      <li><strong>Lời khuyên:</strong> Tình yêu thực sự không phải là lãnh thổ để chinh phục — đó là nơi bạn có thể hạ bộ giáp xuống và trở thành phiên bản dễ bị tổn thương nhất của mình.</li>
    </ul>`,
    baiHocThuThach: `<ul>
      <li><strong>Bài học cốt lõi:</strong> Học cách hợp tác thực sự — không phải chỉ chỉ huy. Sức mạnh thực sự là biết khi nào nên dẫn đầu và khi nào nên để người khác dẫn.</li>
      <li><strong>Thử thách về cái tôi:</strong> Khi thất bại, bạn có xu hướng đổ lỗi cho hoàn cảnh bên ngoài thay vì nhìn vào bên trong. Đây là bài học về sự khiêm tốn — không phải yếu đuối.</li>
      <li><strong>Thử thách về sự kiên nhẫn:</strong> Bạn muốn mọi thứ diễn ra theo tốc độ của mình. Học cách chấp nhận rằng không phải mọi thứ đều có thể ép buộc bằng ý chí.</li>
      <li><strong>Bài học về kết nối:</strong> Thành công cá nhân rực rỡ nhất sẽ trống rỗng nếu thiếu những mối quan hệ sâu sắc. Đừng hy sinh tất cả cho sự nghiệp.</li>
    </ul>`,
    banBeGiaDinh: `<ul>
      <li><strong>Trong tình bạn:</strong> Bạn là người bạn trung thành và bảo vệ khi đã thực sự tin ai đó. Vòng tròn thân thiết của bạn thường nhỏ — bạn không cần nhiều bạn, chỉ cần bạn thật.</li>
      <li><strong>Trong gia đình:</strong> Bạn có thiên hướng trở thành trụ cột — người mọi người trông dựa. Điều này mang lại sức mạnh nhưng cũng áp lực. Hãy học cách chia sẻ gánh nặng.</li>
      <li><strong>Điểm cần chú ý:</strong> Cái tôi mạnh đôi khi khiến bạn khó thừa nhận mình cần giúp đỡ. Trong gia đình và tình bạn, dễ bị tổn thương là dấu hiệu của tin tưởng — không phải yếu đuối.</li>
    </ul>`,
    duLichSoThich: `<ul>
      <li><strong>Phong cách du lịch:</strong> Bạn thích những chuyến đi có mục đích — khám phá điều mới, chinh phục thử thách. Trekking, leo núi, du lịch mạo hiểm đều phù hợp với năng lượng số 1.</li>
      <li><strong>Sở thích nổi bật:</strong> Thể thao cạnh tranh, lãnh đạo nhóm, dự án cá nhân sáng tạo, học kỹ năng mới có tính ứng dụng cao.</li>
      <li><strong>Tái tạo năng lượng:</strong> Bạn nạp lại bằng cách có thời gian một mình — đọc sách, thiền định, hoặc bất kỳ hoạt động nào cho phép bạn xử lý suy nghĩ trong yên lặng.</li>
    </ul>`,
    ngheNghiep: `<ul>
      <li><strong>Định hướng phù hợp nhất:</strong> Bất kỳ lĩnh vực nào cho phép bạn lãnh đạo và tự chủ — quản lý cấp cao, kinh doanh riêng, khởi nghiệp, sáng tạo độc lập.</li>
      <li><strong>Công việc lý tưởng:</strong> CEO / Founder, nhà phát minh, kiến trúc sư, giám đốc sáng tạo, nhà nghiên cứu độc lập, chính trị gia, vận động viên chuyên nghiệp.</li>
      <li><strong>Môi trường làm việc:</strong> Cần tự chủ cao, không thích bị vi quản lý. Làm tốt nhất khi được giao mục tiêu rõ ràng và toàn quyền quyết định cách đạt được.</li>
      <li><strong>Lưu ý:</strong> Tránh những vị trí đòi hỏi làm theo lệnh người khác mà không có cơ hội đóng góp ý kiến — điều này sẽ nhanh chóng làm cạn kiệt động lực của bạn.</li>
    </ul>`,
  },

  2: {
    nguoiNoiTieng: [
      { name: 'Barack Obama', field: 'Chính trị', note: 'Tổng thống Mỹ thứ 44, biểu tượng của ngoại giao tinh tế và khả năng kết nối con người' },
      { name: 'Diana Spencer', field: 'Hoàng gia / Nhân đạo', note: 'Công nương của lòng dân, người dùng địa vị để phục vụ và chữa lành người khác' },
      { name: 'Bill Clinton', field: 'Chính trị', note: 'Tổng thống nổi tiếng với khả năng đồng cảm và kỹ năng đàm phán vượt trội' },
      { name: 'Jennifer Aniston', field: 'Điện ảnh', note: 'Biểu tượng của sự ấm áp và kết nối cảm xúc trong Hollywood' },
      { name: 'Tony Blair', field: 'Chính trị', note: 'Thủ tướng Anh, người hòa giải và xây dựng đồng thuận trong chính sách đối ngoại' },
      { name: 'Madonna', field: 'Âm nhạc', note: 'Nữ hoàng nhạc pop mang âm nhạc như vũ khí kết nối và truyền cảm hứng toàn cầu' },
    ],
    tuongThich: {
      tot: [4, 6, 8],
      khong: [1, 5, 7],
      moTaTot: 'Số 4 cung cấp sự ổn định mà số 2 cần. Số 6 cùng yêu thương và hướng đến gia đình. Số 8 bổ sung sức mạnh lãnh đạo để cân bằng với bản chất hỗ trợ của số 2.',
      moTaKhong: 'Số 1 quá quyết đoán có thể áp đảo số 2 nhạy cảm. Số 5 thích tự do khiến số 2 bất an. Số 7 thích cô độc khó thỏa mãn nhu cầu kết nối của số 2.',
      chiTiet: `<ul>
        <li><strong>Số 4:</strong> Số 4 cung cấp nền tảng vững chắc mà số 2 luôn tìm kiếm, và số 2 mang đến sự dịu dàng làm mềm sự cứng nhắc của số 4.</li>
        <li><strong>Số 6:</strong> Cả hai đều yêu thương gia đình và cộng đồng — sự kết hợp tạo ra mái ấm hạnh phúc và bền vững.</li>
        <li><strong>Số 8:</strong> Số 8 dẫn đầu bên ngoài, số 2 hỗ trợ từ bên trong — sự phân công vai trò tự nhiên và hoàn chỉnh.</li>
      </ul>`,
    },
    tinhDuyen: `<ul>
      <li><strong>Phong cách yêu:</strong> Tận tâm, chăm sóc và nhạy cảm với cảm xúc người yêu. Bạn yêu bằng những hành động nhỏ — nhớ từng chi tiết, lắng nghe sâu sắc, luôn hiện diện khi người kia cần.</li>
      <li><strong>Điều bạn cần:</strong> Sự an tâm và cam kết rõ ràng. Bạn không phù hợp với những mối quan hệ mơ hồ — bạn cần biết mình đứng ở đâu trong trái tim người kia.</li>
      <li><strong>Thách thức:</strong> Xu hướng hy sinh bản thân quá mức và không nói lên nhu cầu của chính mình. Hãy nhớ: yêu bản thân đủ để đặt ra giới hạn là điều kiện để yêu người khác bền vững.</li>
    </ul>`,
    baiHocThuThach: `<ul>
      <li><strong>Bài học về giá trị bản thân:</strong> Bạn có xu hướng đánh giá bản thân qua mắt người khác. Học cách nhận ra giá trị của mình độc lập với sự công nhận của người khác.</li>
      <li><strong>Thử thách về quyết đoán:</strong> Sợ mất lòng người khác khiến bạn trì hoãn quyết định. Hãy thực hành đưa ra lựa chọn rõ ràng — ngay cả khi không làm hài lòng tất cả mọi người.</li>
      <li><strong>Thử thách về ranh giới:</strong> Học cách phân biệt giữa giúp đỡ từ sức mạnh và giúp đỡ vì sợ bị từ bỏ. Ranh giới lành mạnh là biểu hiện của tình yêu trưởng thành.</li>
    </ul>`,
    banBeGiaDinh: `<ul>
      <li><strong>Trong tình bạn:</strong> Bạn là người bạn lý tưởng — luôn lắng nghe, không phán xét, và luôn hiện diện. Mọi người tự nhiên tìm đến bạn khi cần chia sẻ.</li>
      <li><strong>Trong gia đình:</strong> Bạn thường là người giữ hòa khí và cầu nối trong gia đình. Nhưng hãy chú ý không để vai trò "người hòa giải" trở thành gánh nặng bạn gánh một mình.</li>
      <li><strong>Lưu ý:</strong> Đôi khi bạn cần cho phép người khác chăm sóc lại bạn — và học cách nhận sự giúp đỡ một cách duyên dáng.</li>
    </ul>`,
    duLichSoThich: `<ul>
      <li><strong>Phong cách du lịch:</strong> Bạn thích những chuyến đi trải nghiệm văn hóa và kết nối con người — du lịch cộng đồng, homestay, thăm bạn bè ở xa.</li>
      <li><strong>Sở thích:</strong> Âm nhạc, thơ ca, nghệ thuật, nấu ăn, thiền định, yoga, làm vườn — những hành động có tính chữa lành và nuôi dưỡng.</li>
      <li><strong>Tái tạo năng lượng:</strong> Cần không gian yên tĩnh để tái nạp sau khi tiếp nhận quá nhiều cảm xúc từ người khác. Thời gian gần thiên nhiên đặc biệt tốt cho bạn.</li>
    </ul>`,
    ngheNghiep: `<ul>
      <li><strong>Định hướng phù hợp:</strong> Công việc đòi hỏi kỹ năng giao tiếp, thấu cảm và hỗ trợ người khác — tư vấn, giáo dục, y tế, ngoại giao, quan hệ công chúng.</li>
      <li><strong>Công việc lý tưởng:</strong> Chuyên gia tư vấn tâm lý, nhà mediator, giáo viên, nhà ngoại giao, HR manager, nhạc sĩ, y tá, nhân viên xã hội.</li>
      <li><strong>Môi trường làm việc:</strong> Cần môi trường hài hòa, không xung đột cao. Làm tốt nhất trong nhóm nhỏ với sự tin tưởng lẫn nhau.</li>
    </ul>`,
  },

  3: {
    nguoiNoiTieng: [
      { name: 'David Bowie', field: 'Âm nhạc', note: 'Huyền thoại rock người liên tục tái tạo bản thân — biểu tượng của sáng tạo không giới hạn' },
      { name: 'Jodie Foster', field: 'Điện ảnh', note: 'Diễn viên - đạo diễn tài năng, kết hợp chiều sâu nghệ thuật với kỷ luật thực chiến' },
      { name: 'Abraham Lincoln', field: 'Lịch sử / Chính trị', note: 'Tổng thống Mỹ nổi tiếng với hùng biện và khả năng truyền cảm hứng qua ngôn ngữ' },
      { name: 'Celine Dion', field: 'Âm nhạc', note: 'Giọng ca huyền thoại, biểu tượng của sự biểu đạt cảm xúc qua âm nhạc' },
      { name: 'Snoop Dogg', field: 'Âm nhạc / Văn hóa', note: 'Nghệ sĩ hip-hop biểu tượng với phong cách sáng tạo và khiếu hài hước độc đáo' },
      { name: 'Reese Witherspoon', field: 'Điện ảnh / Kinh doanh', note: 'Diễn viên và nhà sản xuất thành công, kết hợp sáng tạo với kinh doanh thực chiến' },
    ],
    tuongThich: {
      tot: [1, 5, 9],
      khong: [4, 7, 8],
      moTaTot: 'Số 1 cung cấp định hướng cho năng lượng sáng tạo của số 3. Số 5 cùng yêu sự tự do và trải nghiệm. Số 9 chia sẻ tầm nhìn nhân văn rộng lớn.',
      moTaKhong: 'Số 4 quá thực tế có thể dập tắt sự bốc đồng sáng tạo của số 3. Số 7 thích cô độc khó hòa hợp với bản chất xã hội của số 3. Số 8 tập trung vật chất dễ xung đột với giá trị nghệ thuật.',
      chiTiet: `<ul>
        <li><strong>Số 1:</strong> Số 1 tiên phong, số 3 sáng tạo — cùng nhau tạo ra những dự án đột phá và đầy cảm hứng.</li>
        <li><strong>Số 5:</strong> Hai linh hồn phiêu lưu — luôn có điều mới để khám phá và kể chuyện về.</li>
        <li><strong>Số 9:</strong> Cả hai đều muốn tạo ra tác động lớn hơn bản thân — kết hợp sáng tạo (3) và tầm nhìn nhân đạo (9).</li>
      </ul>`,
    },
    tinhDuyen: `<ul>
      <li><strong>Phong cách yêu:</strong> Lãng mạn, biểu đạt và đầy sắc màu. Bạn yêu bằng lời nói, bài hát, thơ ca và những cử chỉ sáng tạo. Tình yêu với bạn là một tác phẩm nghệ thuật không ngừng được tạo ra.</li>
      <li><strong>Điều bạn cần:</strong> Người yêu cần là khán giả tốt — ai đó thực sự nghe và trân trọng những gì bạn tạo ra. Cần đủ kiên nhẫn ở lại khi bạn đang trong giai đoạn "mất hứng" cảm xúc.</li>
      <li><strong>Thách thức:</strong> Bốc đồng cảm xúc và thiên hướng lý tưởng hóa người yêu — rồi thất vọng khi họ không hoàn hảo như tưởng tượng. Tình yêu thực sự đòi hỏi nhìn thấy người kia như họ thực sự là.</li>
    </ul>`,
    baiHocThuThach: `<ul>
      <li><strong>Bài học về kỷ luật sáng tạo:</strong> Tài năng không đủ — sự kiên trì và kỷ luật mới là thứ biến tiềm năng thành thành tựu thực sự.</li>
      <li><strong>Thử thách về sự hoàn thành:</strong> Học cách kết thúc những gì đã bắt đầu. Mỗi dự án hoàn chỉnh là bằng chứng cho giá trị của bạn.</li>
      <li><strong>Thử thách về chiều sâu:</strong> Nhận ra rằng sự vui vẻ bề mặt đôi khi là cơ chế phòng thủ. Cho phép bản thân trải nghiệm và biểu đạt cả những cảm xúc khó khăn hơn.</li>
    </ul>`,
    banBeGiaDinh: `<ul>
      <li><strong>Trong tình bạn:</strong> Xuất sắc — bạn là người bạn khiến mọi cuộc gặp gỡ trở thành bữa tiệc. Nhưng hãy chú ý duy trì chiều sâu trong tình bạn, không chỉ bề rộng.</li>
      <li><strong>Trong gia đình:</strong> Bạn là nguồn năng lượng và niềm vui trong gia đình. Nhưng đôi khi cần học cách lắng nghe thay vì luôn muốn nói và kể chuyện.</li>
      <li><strong>Lưu ý:</strong> Khi gia đình đang trải qua khó khăn, hãy cho phép bản thân hiện diện thật sự — không phải chỉ "vui vẻ" để làm nhẹ không khí.</li>
    </ul>`,
    duLichSoThich: `<ul>
      <li><strong>Phong cách du lịch:</strong> Bạn yêu những chuyến đi giàu văn hóa và nghệ thuật — bảo tàng, lễ hội âm nhạc, các thành phố năng động với đời sống nghệ thuật phong phú.</li>
      <li><strong>Sở thích:</strong> Viết lách, âm nhạc, hội họa, sân khấu, diễn hài, nhiếp ảnh, podcast, content creation — bất cứ điều gì cho phép biểu đạt bản thân.</li>
      <li><strong>Tái tạo năng lượng:</strong> Các hoạt động sáng tạo không có áp lực kết quả — vẽ vì vui, viết nhật ký, chơi nhạc cụ chỉ cho bản thân.</li>
    </ul>`,
    ngheNghiep: `<ul>
      <li><strong>Định hướng phù hợp:</strong> Bất kỳ lĩnh vực nào cho phép sáng tạo, biểu đạt và giao tiếp — nghệ thuật, truyền thông, marketing, giáo dục sáng tạo.</li>
      <li><strong>Công việc lý tưởng:</strong> Nhà văn, blogger, MC, diễn viên, ca sĩ, thiết kế sáng tạo, giáo viên nghệ thuật, content creator, copywriter, nhà trị liệu qua nghệ thuật.</li>
      <li><strong>Môi trường làm việc:</strong> Cần môi trường sáng tạo, không quá cứng nhắc về quy trình. Làm tốt nhất khi có cơ hội thử nghiệm và biểu đạt ý tưởng bản thân.</li>
    </ul>`,
  },

  4: {
    nguoiNoiTieng: [
      { name: 'Bill Gates', field: 'Công nghệ / Từ thiện', note: 'Nhà sáng lập Microsoft — biểu tượng của sự xây dựng có hệ thống và tầm nhìn dài hạn' },
      { name: 'Elton John', field: 'Âm nhạc', note: 'Huyền thoại nhạc pop với sự nghiệp được xây dựng bằng kỷ luật và bền bỉ phi thường' },
      { name: 'Arnold Schwarzenegger', field: 'Thể thao / Điện ảnh / Chính trị', note: 'Từ bodybuilder đến thống đốc California — hành trình xây dựng qua kỷ luật thép' },
      { name: 'Paul McCartney', field: 'Âm nhạc', note: 'Thành viên huyền thoại The Beatles, người xây dựng di sản âm nhạc trường tồn' },
      { name: 'Clint Eastwood', field: 'Điện ảnh', note: 'Biểu tượng của sự kỷ luật, đáng tin cậy và tay nghề điêu luyện trong suốt sự nghiệp' },
      { name: 'Oprah Winfrey', field: 'Truyền thông / Từ thiện', note: 'Từ nghèo khó đến tỷ phú truyền thông — hành trình của ý chí và công việc bền bỉ' },
    ],
    tuongThich: {
      tot: [2, 6, 8],
      khong: [3, 5, 7],
      moTaTot: 'Số 2 mang sự dịu dàng làm mềm sự cứng nhắc của số 4. Số 6 cùng yêu ổn định và gia đình. Số 8 chia sẻ tham vọng xây dựng và năng lực thực thi.',
      moTaKhong: 'Số 3 bốc đồng và thiếu kỷ luật dễ làm số 4 bực bội. Số 5 thích thay đổi liên tục xung đột với nhu cầu ổn định của số 4. Số 7 sống trong thế giới nội tâm quá nhiều.',
      chiTiet: `<ul>
        <li><strong>Số 2:</strong> Số 4 xây nền tảng, số 2 xây cầu nối — cùng nhau tạo ra mối quan hệ vừa vững chắc vừa ấm áp.</li>
        <li><strong>Số 6:</strong> Cả hai đều coi trọng gia đình, an toàn và cam kết — đây là cặp đôi tạo ra mái ấm lý tưởng.</li>
        <li><strong>Số 8:</strong> Cùng tham vọng, cùng kỷ luật — hai người xây dựng đế chế cùng nhau với sự tôn trọng lẫn nhau.</li>
      </ul>`,
    },
    tinhDuyen: `<ul>
      <li><strong>Phong cách yêu:</strong> Trung thành và đáng tin cậy tuyệt đối. Bạn không nói nhiều về tình yêu nhưng thể hiện qua hành động — luôn ở đây, luôn giữ lời hứa, luôn là chỗ dựa vững chắc.</li>
      <li><strong>Điều bạn cần:</strong> Người yêu ổn định, nhất quán và nghiêm túc với mối quan hệ. Bạn không phù hợp với người thích cảm giác mạnh hay không chắc chắn về cam kết.</li>
      <li><strong>Thách thức:</strong> Đôi khi quá cứng nhắc và khó thay đổi theo yêu cầu. Tình yêu cần sự linh hoạt — đừng để tiêu chuẩn cao trở thành rào cản cho sự gần gũi.</li>
    </ul>`,
    baiHocThuThach: `<ul>
      <li><strong>Bài học về sự linh hoạt:</strong> Không phải mọi thứ đều cần được kiểm soát và lên kế hoạch. Học cách đón nhận sự thay đổi bất ngờ như một phần tự nhiên của cuộc sống.</li>
      <li><strong>Thử thách về niềm vui:</strong> Bạn quá tập trung vào công việc đến mức bỏ lỡ niềm vui của hành trình. Đôi khi chỉ cần ngồi và tận hưởng khoảnh khắc.</li>
      <li><strong>Thử thách sự kiệt sức:</strong> Học cách nhận ra giới hạn của mình trước khi vượt qua nó. Nghỉ ngơi phòng ngừa hiệu quả hơn phục hồi sau kiệt sức.</li>
    </ul>`,
    banBeGiaDinh: `<ul>
      <li><strong>Trong tình bạn:</strong> Bạn không có nhiều bạn nhưng những người bạn có sẽ biết rằng bạn luôn ở đó cho họ. Độ tin cậy của bạn là tài sản lớn nhất trong tình bạn.</li>
      <li><strong>Trong gia đình:</strong> Bạn thường là người chịu trách nhiệm và giải quyết vấn đề thực tế trong gia đình. Hãy đảm bảo bạn cũng có không gian để được chăm sóc lại.</li>
    </ul>`,
    duLichSoThich: `<ul>
      <li><strong>Phong cách du lịch:</strong> Bạn thích những chuyến đi được lên kế hoạch kỹ lưỡng với mục đích rõ ràng — du lịch lịch sử, tìm hiểu kiến trúc, các địa điểm kỳ quan thiên nhiên.</li>
      <li><strong>Sở thích:</strong> Làm vườn, DIY, xây dựng thủ công, cờ vua, lập trình, đọc sách kỹ thuật — những hoạt động đòi hỏi kiên nhẫn và kỹ năng.</li>
      <li><strong>Tái tạo năng lượng:</strong> Các hoạt động có cấu trúc và có thể thấy kết quả rõ ràng — làm món ăn phức tạp, hoàn thiện dự án thủ công, thể dục đều đặn.</li>
    </ul>`,
    ngheNghiep: `<ul>
      <li><strong>Định hướng phù hợp:</strong> Công việc đòi hỏi sự chính xác, hệ thống và tính đáng tin cậy — kỹ thuật, tài chính, xây dựng, quản lý dự án.</li>
      <li><strong>Công việc lý tưởng:</strong> Kỹ sư, kiến trúc sư, kế toán, quản lý dự án, nhà phân tích tài chính, bác sĩ, luật sư, nhà nghiên cứu khoa học.</li>
      <li><strong>Môi trường làm việc:</strong> Cần quy trình rõ ràng và kết quả có thể đo lường. Làm tốt nhất trong môi trường có cấu trúc nhưng cho phép thể hiện chuyên môn sâu.</li>
    </ul>`,
  },

  5: {
    nguoiNoiTieng: [
      { name: 'Angelina Jolie', field: 'Điện ảnh / Nhân đạo', note: 'Biểu tượng của sự tự do và dũng cảm — liên tục phá vỡ giới hạn trong sự nghiệp và cuộc sống' },
      { name: 'Mick Jagger', field: 'Âm nhạc', note: 'Giọng ca The Rolling Stones — biểu tượng của năng lượng không tuổi và sự tự do không giới hạn' },
      { name: 'Beyoncé', field: 'Âm nhạc / Kinh doanh', note: 'Nữ hoàng pop với sức sáng tạo không ngừng và khả năng tái tạo bản thân đỉnh cao' },
      { name: 'Isaac Newton', field: 'Khoa học', note: 'Nhà khoa học vĩ đại với tư duy độc lập và khao khát không ngừng khám phá bí ẩn vũ trụ' },
      { name: 'Vincent van Gogh', field: 'Nghệ thuật', note: 'Họa sĩ hậu ấn tượng — linh hồn tự do với di sản nghệ thuật vĩnh cửu' },
      { name: 'Eminem', field: 'Âm nhạc', note: 'Rapper huyền thoại với khả năng biến đổi và thích nghi không ngừng xuyên suốt sự nghiệp' },
    ],
    tuongThich: {
      tot: [1, 3, 7],
      khong: [2, 4, 6],
      moTaTot: 'Số 1 cùng yêu tự do và hành động nhanh. Số 3 mang sáng tạo và niềm vui. Số 7 kích thích trí tò mò của số 5 bằng chiều sâu và triết học.',
      moTaKhong: 'Số 2 cần sự ổn định và cam kết mà số 5 khó cung cấp. Số 4 quá kỷ luật và routine xung đột với bản chất phiêu lưu của số 5. Số 6 cần sự gắn kết gia đình mà số 5 khó đáp ứng.',
      chiTiet: `<ul>
        <li><strong>Số 1:</strong> Hai người hành động và tiên phong — cùng khám phá thế giới và không ai áp đảo ai.</li>
        <li><strong>Số 3:</strong> Số 5 phiêu lưu, số 3 kể chuyện — mỗi hành trình đều trở thành tác phẩm nghệ thuật.</li>
        <li><strong>Số 7:</strong> Số 5 tìm kiếm trải nghiệm, số 7 tìm kiếm ý nghĩa — cùng nhau khám phá chiều rộng và chiều sâu của cuộc sống.</li>
      </ul>`,
    },
    tinhDuyen: `<ul>
      <li><strong>Phong cách yêu:</strong> Cuồng nhiệt, hấp dẫn và đầy bất ngờ. Bạn là người tình thú vị nhất thế giới — nhưng cũng là người khó bắt nhất. Không ai yêu bạn theo cách bình thường.</li>
      <li><strong>Điều bạn cần:</strong> Người yêu cần đủ tự tin và an toàn trong bản thân để không cần kiểm soát bạn. Ai đó yêu bạn vì sự tự do của bạn — không phải dù cho sự tự do của bạn.</li>
      <li><strong>Thách thức:</strong> Nỗi sợ cam kết và cảm giác bị giam cầm trong quan hệ. Nhận ra rằng cam kết thực sự không có nghĩa là mất tự do — mà là chọn ai để cùng tự do với.</li>
    </ul>`,
    baiHocThuThach: `<ul>
      <li><strong>Bài học về cam kết:</strong> Tự do thực sự không phải là không có ràng buộc — mà là chọn lựa có ý thức. Học cách cam kết với những gì thực sự quan trọng.</li>
      <li><strong>Thử thách về kiên nhẫn:</strong> Không phải mọi thứ đáng giá đều đến nhanh. Học cách chờ đợi và kiên trì với những dự án dài hơi.</li>
      <li><strong>Thử thách về tập trung:</strong> Quá nhiều hướng đi cùng một lúc dẫn đến không đi đến đâu. Học cách chọn lọc và ưu tiên.</li>
    </ul>`,
    banBeGiaDinh: `<ul>
      <li><strong>Trong tình bạn:</strong> Bạn là người bạn thú vị và truyền cảm hứng nhất — nhưng đôi khi "biến mất" khi đang trong giai đoạn phiêu lưu riêng. Hãy chú ý duy trì kết nối định kỳ.</li>
      <li><strong>Trong gia đình:</strong> Bạn mang năng lượng và sự thú vị vào gia đình, nhưng đôi khi cần mở rộng thời gian để hiện diện nhiều hơn cho những người thân yêu.</li>
    </ul>`,
    duLichSoThich: `<ul>
      <li><strong>Phong cách du lịch:</strong> Du lịch tự túc không có lịch trình cố định — khám phá những nơi ít người biết đến, đặt vé phút chót, sống cùng người địa phương.</li>
      <li><strong>Sở thích:</strong> Học ngoại ngữ, thể thao mạo hiểm, nhảy dù, lặn biển, leo núi, khiêu vũ, âm nhạc đường phố — bất cứ điều gì kích thích giác quan.</li>
      <li><strong>Tái tạo năng lượng:</strong> Di chuyển! Bạn nạp lại bằng cách thay đổi môi trường và tiếp xúc với những điều mới.</li>
    </ul>`,
    ngheNghiep: `<ul>
      <li><strong>Định hướng phù hợp:</strong> Công việc linh hoạt, đa dạng và không lặp lại — bán hàng, truyền thông, du lịch, nghệ thuật biểu diễn, tư vấn, khởi nghiệp.</li>
      <li><strong>Công việc lý tưởng:</strong> Travel blogger, nhà báo, nhà ngoại giao, diễn viên, DJ, hướng dẫn viên du lịch, chuyên gia marketing, doanh nhân đa ngành.</li>
      <li><strong>Môi trường làm việc:</strong> Cần sự linh hoạt tối đa — remote work, tự kinh doanh, hoặc công ty có văn hóa năng động. Cứng nhắc là kẻ thù năng suất của bạn.</li>
    </ul>`,
  },

  6: {
    nguoiNoiTieng: [
      { name: 'Michael Jackson', field: 'Âm nhạc', note: 'Ông hoàng nhạc pop — dành cả đời tạo ra âm nhạc chữa lành và kết nối nhân loại' },
      { name: 'John Lennon', field: 'Âm nhạc / Hòa bình', note: 'Huyền thoại The Beatles, biểu tượng của tình yêu thương và khát vọng hòa bình thế giới' },
      { name: 'Albert Einstein', field: 'Khoa học', note: 'Thiên tài vật lý với trí tưởng tượng phi thường và lòng trắc ẩn sâu sắc với nhân loại' },
      { name: 'Dalai Lama', field: 'Tâm linh / Hòa bình', note: 'Lãnt tụ tinh thần Tây Tạng, biểu tượng của lòng từ bi và tình yêu thương vô điều kiện' },
      { name: 'Meryl Streep', field: 'Điện ảnh', note: 'Nữ diễn viên huyền thoại với khả năng thấu cảm sâu sắc qua từng nhân vật' },
      { name: 'Eleanor Roosevelt', field: 'Chính trị / Nhân đạo', note: 'Đệ nhất phu nhân Mỹ, nhà hoạt động nhân quyền và từ thiện cả đời' },
    ],
    tuongThich: {
      tot: [2, 3, 9],
      khong: [1, 5, 7],
      moTaTot: 'Số 2 cùng yêu thương và nuôi dưỡng — tạo ra mái ấm lý tưởng. Số 3 mang joy và sáng tạo vào cuộc sống trách nhiệm của số 6. Số 9 chia sẻ tầm nhìn nhân văn rộng lớn.',
      moTaKhong: 'Số 1 quá tập trung vào bản thân dễ va chạm với bản chất phục vụ của số 6. Số 5 thích tự do gây bất ổn cho số 6. Số 7 quá hướng nội khó thỏa mãn nhu cầu kết nối của số 6.',
      chiTiet: `<ul>
        <li><strong>Số 2:</strong> Cả hai đều chăm sóc và yêu thương — nhưng cần học cách nhận lại, không chỉ cho đi.</li>
        <li><strong>Số 3:</strong> Số 6 nuôi dưỡng, số 3 truyền cảm hứng — sự cân bằng tốt giữa trách nhiệm và niềm vui.</li>
        <li><strong>Số 9:</strong> Cùng muốn tạo ra thế giới tốt đẹp hơn — chỉ khác về quy mô và cách tiếp cận.</li>
      </ul>`,
    },
    tinhDuyen: `<ul>
      <li><strong>Phong cách yêu:</strong> Tận tụy, chăm sóc và sẵn sàng hy sinh. Bạn yêu bằng cả con người mình — và đôi khi điều đó quá nhiều đến mức người kia cảm thấy ngột ngạt.</li>
      <li><strong>Điều bạn cần:</strong> Người yêu trân trọng sự chăm sóc của bạn và biết cách đáp lại. Bạn cần sự công nhận và lòng biết ơn — không ai có thể cho đi mãi mà không cần nhận lại.</li>
      <li><strong>Thách thức:</strong> Xu hướng kiểm soát từ tình yêu thương — muốn bảo vệ người yêu đến mức không cho họ không gian để tự lớn lên.</li>
    </ul>`,
    baiHocThuThach: `<ul>
      <li><strong>Bài học về ranh giới:</strong> Không phải mọi người đều cần được cứu. Học cách đứng bên cạnh thay vì đứng ở giữa giải quyết vấn đề cho người khác.</li>
      <li><strong>Thử thách hoàn hảo chủ nghĩa:</strong> Bạn kỳ vọng rất cao và thường thất vọng với thực tế. Học cách chấp nhận "đủ tốt" trong những tình huống không cần hoàn hảo.</li>
      <li><strong>Thử thách về tự chăm sóc:</strong> Bạn giỏi chăm sóc người khác nhưng thường quên chăm sóc bản thân. Bạn không thể rót từ chiếc cốc trống.</li>
    </ul>`,
    banBeGiaDinh: `<ul>
      <li><strong>Trong tình bạn:</strong> Bạn là người bạn luôn ở đó — nhưng đôi khi quá nhiệt tình đến mức áp đảo. Học cách cho bạn bè không gian để họ cũng tự lo được.</li>
      <li><strong>Trong gia đình:</strong> Trụ cột của gia đình — người giữ ấm mọi mối quan hệ. Đây là thiên phú lớn nhất và cũng là trách nhiệm nặng nhất của bạn.</li>
    </ul>`,
    duLichSoThich: `<ul>
      <li><strong>Phong cách du lịch:</strong> Bạn thích du lịch theo nhóm hoặc gia đình. Điểm đến lý tưởng vừa đẹp vừa có ý nghĩa văn hóa và lịch sử sâu sắc.</li>
      <li><strong>Sở thích:</strong> Nấu ăn, trang trí nhà cửa, làm vườn, nhiếp ảnh, dạy học, tình nguyện, yoga, thiền định.</li>
      <li><strong>Tái tạo năng lượng:</strong> Tạo ra không gian đẹp và ấm cúng — trang trí lại một góc nhà, nấu một bữa ăn ngon, dành thời gian chăm sóc cơ thể có chủ đích.</li>
    </ul>`,
    ngheNghiep: `<ul>
      <li><strong>Định hướng phù hợp:</strong> Công việc chăm sóc, nuôi dưỡng và phục vụ cộng đồng — y tế, giáo dục, tư vấn, thiết kế không gian sống.</li>
      <li><strong>Công việc lý tưởng:</strong> Bác sĩ, y tá, giáo viên, nhà tư vấn gia đình, nhà thiết kế nội thất, nhà hoạt động xã hội, chef, chuyên gia dinh dưỡng.</li>
      <li><strong>Môi trường làm việc:</strong> Cần cảm giác đang tạo ra sự khác biệt và được trân trọng. Môi trường hài hòa và có văn hóa tốt quan trọng hơn tiền lương cao.</li>
    </ul>`,
  },

  7: {
    nguoiNoiTieng: [
      { name: 'Leonardo DiCaprio', field: 'Điện ảnh / Môi trường', note: 'Diễn viên chiều sâu với cam kết mạnh mẽ về bảo vệ môi trường — điển hình của số 7 có tầm nhìn' },
      { name: 'Fyodor Dostoevsky', field: 'Văn học', note: 'Đại văn hào Nga — người khai thác chiều sâu tâm lý con người như không ai khác' },
      { name: 'Stephen Hawking', field: 'Khoa học', note: 'Nhà vật lý thiên tài, người khám phá bí ẩn sâu nhất của vũ trụ bất chấp mọi giới hạn' },
      { name: 'Elon Musk', field: 'Công nghệ', note: 'Doanh nhân viễn kiến — người đặt câu hỏi lớn hơn bất kỳ ai về tương lai nhân loại' },
      { name: 'Eric Clapton', field: 'Âm nhạc', note: 'Guitar huyền thoại — chiều sâu âm nhạc phản ánh thế giới nội tâm sâu thẳm' },
      { name: 'Keira Knightley', field: 'Điện ảnh', note: 'Diễn viên với chiều sâu nội tâm và khả năng thể hiện các nhân vật phức tạp xuất sắc' },
    ],
    tuongThich: {
      tot: [1, 5, 9],
      khong: [2, 6, 8],
      moTaTot: 'Số 1 hành động trong khi số 7 suy nghĩ — bổ sung nhau hoàn hảo. Số 5 kích thích trí tò mò của số 7 bằng trải nghiệm mới. Số 9 chia sẻ chiều sâu triết học và tầm nhìn lớn.',
      moTaKhong: 'Số 2 cần kết nối cảm xúc liên tục mà số 7 khó cung cấp. Số 6 quá hướng ngoại và cần sự hiện diện nhiều hơn số 7 muốn cho. Số 8 quá tập trung vật chất, trong khi số 7 sống trong thế giới tinh thần.',
      chiTiet: `<ul>
        <li><strong>Số 1:</strong> Số 7 cung cấp chiều sâu và phân tích, số 1 cung cấp quyết đoán và hành động — bổ trợ lý tưởng.</li>
        <li><strong>Số 5:</strong> Cùng tò mò và yêu khám phá — một người khám phá bên ngoài (5), một người khám phá bên trong (7).</li>
        <li><strong>Số 9:</strong> Cả hai đều suy nghĩ về những điều lớn hơn bản thân — triết học, tâm linh và ý nghĩa cuộc sống.</li>
      </ul>`,
    },
    tinhDuyen: `<ul>
      <li><strong>Phong cách yêu:</strong> Sâu sắc và đòi hỏi. Bạn không quan tâm đến tình yêu bề mặt — bạn muốn kết nối tâm hồn thực sự. Điều này có nghĩa là bạn có ít mối quan hệ nhưng rất sâu.</li>
      <li><strong>Điều bạn cần:</strong> Người yêu trí tuệ, tôn trọng không gian của bạn và không cần bạn phải biểu đạt tình cảm theo cách thông thường. Ai đó hiểu rằng yên lặng cùng nhau cũng là một hình thức thân mật.</li>
      <li><strong>Thách thức:</strong> Khó tin tưởng và mở lòng. Bạn kiểm tra người kia rất kỹ trước khi cho vào vòng trong — đôi khi làm người kia bỏ cuộc trước khi đến được thực sự.</li>
    </ul>`,
    baiHocThuThach: `<ul>
      <li><strong>Bài học về kết nối:</strong> Trí tuệ và sự hiểu biết không thể thay thế kết nối con người thực sự. Học cách mở lòng ngay cả khi điều đó cảm thấy dễ bị tổn thương.</li>
      <li><strong>Thử thách về niềm tin:</strong> Xu hướng hoài nghi có thể ngăn bạn trải nghiệm những điều tốt đẹp. Không phải mọi điều đều cần được phân tích trước khi tin.</li>
      <li><strong>Thử thách về chia sẻ kiến thức:</strong> Bạn tích lũy nhiều tri thức nhưng đôi khi giữ cho riêng mình. Chia sẻ những khám phá chính là sứ mệnh của số 7.</li>
    </ul>`,
    banBeGiaDinh: `<ul>
      <li><strong>Trong tình bạn:</strong> Ít bạn, nhưng sâu và bền. Bạn là người bạn hiếm hoi thực sự lắng nghe và hiểu — không phán xét, không lời khuyên rẻ tiền.</li>
      <li><strong>Trong gia đình:</strong> Bạn yêu thương gia đình nhưng cần nhiều không gian riêng hơn mức trung bình. Hãy giao tiếp điều này rõ ràng thay vì chỉ rút lui im lặng.</li>
    </ul>`,
    duLichSoThich: `<ul>
      <li><strong>Phong cách du lịch:</strong> Bạn thích những chuyến đi một mình đến những nơi có chiều sâu lịch sử, tâm linh hoặc thiên nhiên hùng vĩ — Kyoto, Tuscany, các đền cổ ở châu Á.</li>
      <li><strong>Sở thích:</strong> Đọc sách triết học và khoa học, thiền định, nghiên cứu cổ học, thiên văn học, âm nhạc cổ điển, viết nhật ký.</li>
      <li><strong>Tái tạo năng lượng:</strong> Cô độc có chất lượng — một mình với suy nghĩ của mình trong không gian yên tĩnh.</li>
    </ul>`,
    ngheNghiep: `<ul>
      <li><strong>Định hướng phù hợp:</strong> Công việc đòi hỏi tư duy phân tích sâu, nghiên cứu độc lập và chuyên môn đặc biệt — khoa học, triết học, công nghệ, phân tích.</li>
      <li><strong>Công việc lý tưởng:</strong> Nhà khoa học, triết gia, nhà phân tích dữ liệu, lập trình viên, thám tử, chuyên gia tâm lý, nhà thiên văn học, nhà văn nghiêm túc, cố vấn chiến lược.</li>
      <li><strong>Môi trường làm việc:</strong> Cần không gian yên tĩnh để tập trung và làm việc độc lập. Ít meetings, ít xã giao bắt buộc — nhiều thời gian tự tổ chức.</li>
    </ul>`,
  },

  8: {
    nguoiNoiTieng: [
      { name: 'Nelson Mandela', field: 'Chính trị / Nhân quyền', note: 'Biểu tượng của quyền năng dùng cho mục đích cao cả — từ tù nhân đến tổng thống' },
      { name: 'Pablo Picasso', field: 'Nghệ thuật', note: 'Họa sĩ huyền thoại với ý chí thống trị thế giới nghệ thuật bằng cách đặt ra quy tắc riêng' },
      { name: 'Sandra Bullock', field: 'Điện ảnh / Kinh doanh', note: 'Diễn viên và nhà sản xuất thành công, biểu tượng cân bằng giữa quyền lực và nhân tính' },
      { name: 'Richard Branson', field: 'Kinh doanh', note: 'Tỷ phú Virgin — biểu tượng của tham vọng không giới hạn và khả năng xây dựng đế chế kinh doanh đa lĩnh vực' },
      { name: 'Whoopi Goldberg', field: 'Điện ảnh / Giải trí', note: 'Diễn viên và MC huyền thoại với sức mạnh ý chí và cá tính không thể nhầm lẫn' },
      { name: 'Anthony Hopkins', field: 'Điện ảnh', note: 'Diễn viên huyền thoại với sự kiểm soát và kỷ luật nghề nghiệp tuyệt đối' },
    ],
    tuongThich: {
      tot: [2, 4, 6],
      khong: [3, 5, 7],
      moTaTot: 'Số 2 bổ sung sự tinh tế cảm xúc cho số 8 quyết đoán. Số 4 chia sẻ kỷ luật và tham vọng xây dựng. Số 6 mang sự ấm áp và nhắc số 8 nhớ những điều quan trọng ngoài thành công.',
      moTaKhong: 'Số 3 bốc đồng và thiếu kế hoạch dài hạn. Số 5 thích tự do không cam kết dễ xung đột với định hướng của số 8. Số 7 sống trong thế giới tinh thần, ít quan tâm vật chất.',
      chiTiet: `<ul>
        <li><strong>Số 2:</strong> Số 8 chinh phục bên ngoài, số 2 xây dựng bên trong — sự phân công vai trò tự nhiên và hiệu quả.</li>
        <li><strong>Số 4:</strong> Cùng tham vọng, cùng kỷ luật — hai người xây dựng đế chế cùng nhau với sự tôn trọng sâu sắc.</li>
        <li><strong>Số 6:</strong> Số 6 nhắc số 8 rằng con người quan trọng hơn kết quả — điều chỉnh cân bằng thiết yếu.</li>
      </ul>`,
    },
    tinhDuyen: `<ul>
      <li><strong>Phong cách yêu:</strong> Passionate và bảo vệ mạnh mẽ. Bạn yêu bằng sự bảo vệ và cung cấp — muốn người yêu được tốt nhất. Nhưng đôi khi nhầm lẫn giữa tình yêu và sự kiểm soát.</li>
      <li><strong>Điều bạn cần:</strong> Người yêu đủ mạnh để không bị nuốt chửng bởi năng lượng của bạn — ai đó có thể nhìn thẳng vào mắt bạn và nói "không" khi cần thiết.</li>
      <li><strong>Thách thức:</strong> Xu hướng đặt công việc và tham vọng lên trên mối quan hệ. Nhớ rằng thành công sẽ trống rỗng nếu không có ai để chia sẻ.</li>
    </ul>`,
    baiHocThuThach: `<ul>
      <li><strong>Bài học về quyền lực:</strong> Quyền lực thực sự không đến từ việc kiểm soát người khác — mà từ việc truyền cảm hứng để họ tự nguyện theo. Lãnh đạo bằng ảnh hưởng, không phải áp lực.</li>
      <li><strong>Thử thách về cân bằng:</strong> Dễ bị cuốn vào vòng xoáy của sự thành công và quên đi những điều không thể mua được bằng tiền.</li>
      <li><strong>Thử thách về khiêm tốn:</strong> Học cách thừa nhận sai lầm và đón nhận phản hồi — những điều này làm bạn mạnh hơn, không yếu hơn.</li>
    </ul>`,
    banBeGiaDinh: `<ul>
      <li><strong>Trong tình bạn:</strong> Bạn là người bạn hào phóng và bảo vệ mạnh mẽ. Nhưng đôi khi cần học cách là bạn bình đẳng thay vì luôn ở vị trí "người giúp đỡ" hoặc "người lãnh đạo".</li>
      <li><strong>Trong gia đình:</strong> Trụ cột kinh tế và quyết định. Hãy chú ý cân bằng giữa cung cấp vật chất và hiện diện cảm xúc.</li>
    </ul>`,
    duLichSoThich: `<ul>
      <li><strong>Phong cách du lịch:</strong> Bạn thích du lịch hạng sang và có mục đích — kết hợp công việc và nghỉ dưỡng. Các điểm đến mang tầm lịch sử hoặc địa lý hùng vĩ thu hút bạn.</li>
      <li><strong>Sở thích:</strong> Đầu tư, cờ vua, golf, boxing/MMA, bộ sưu tập nghệ thuật, rượu vang cao cấp, kinh doanh sáng tạo.</li>
      <li><strong>Tái tạo năng lượng:</strong> Các hoạt động thể chất cạnh tranh — thể thao, gym, dance — và thỉnh thoảng nghỉ dưỡng sang trọng để tái nạp.</li>
    </ul>`,
    ngheNghiep: `<ul>
      <li><strong>Định hướng phù hợp:</strong> Lãnh đạo, tài chính, kinh doanh quy mô lớn — bất kỳ lĩnh vực nào cho phép thi thố tầm ảnh hưởng và tạo ra kết quả có thể đo lường.</li>
      <li><strong>Công việc lý tưởng:</strong> CEO, banker, luật sư điều hành, bác sĩ phẫu thuật, đạo diễn, chính trị gia cấp cao, quản lý quỹ đầu tư, thẩm phán.</li>
      <li><strong>Môi trường làm việc:</strong> Cần quyền tự chủ và ảnh hưởng thực sự. Tránh vị trí trung gian không có quyền quyết định — điều này nhanh chóng làm bạn bực bội và mất động lực.</li>
    </ul>`,
  },

  9: {
    nguoiNoiTieng: [
      { name: 'Mahatma Gandhi', field: 'Chính trị / Nhân quyền', note: 'Cha đẻ của Ấn Độ độc lập — biểu tượng tối thượng của lòng từ bi và sức mạnh phi bạo lực' },
      { name: 'Mother Teresa', field: 'Nhân đạo / Tôn giáo', note: 'Nữ tu sĩ Công giáo dành cả cuộc đời phục vụ người nghèo khổ nhất trên Trái Đất' },
      { name: 'Jim Carrey', field: 'Điện ảnh / Triết học', note: 'Diễn viên hài thiên tài đồng thời là triết gia về ý nghĩa cuộc sống và sự vô thường' },
      { name: 'Morgan Freeman', field: 'Điện ảnh', note: 'Giọng điệu của nhân loại — diễn viên mang đến sự khôn ngoan và bình an trong mọi vai diễn' },
      { name: 'Yoko Ono', field: 'Nghệ thuật / Hòa bình', note: 'Nghệ sĩ và nhà hoạt động hòa bình, tiếp nối di sản nhân văn của John Lennon' },
      { name: 'Judi Dench', field: 'Điện ảnh / Sân khấu', note: 'Nữ diễn viên huyền thoại với sự nghiệp trải dài 6 thập kỷ, biểu tượng của trí tuệ và nhân cách' },
    ],
    tuongThich: {
      tot: [3, 6, 9],
      khong: [4, 8, 22],
      moTaTot: 'Số 3 mang sự vui tươi sáng tạo bổ sung cho tầm nhìn lớn của số 9. Số 6 chia sẻ tình yêu thương và phục vụ. Số 9 khác — hai tâm hồn vũ trụ hiểu nhau không cần giải thích.',
      moTaKhong: 'Số 4 quá thực tế có thể không hiểu lý tưởng của số 9. Số 8 tập trung tích lũy vật chất, ngược với tinh thần buông bỏ của số 9. Số 22 cùng tầm nhìn lớn nhưng khác phương pháp.',
      chiTiet: `<ul>
        <li><strong>Số 3:</strong> Số 9 mang tầm nhìn, số 3 mang giọng nói — cùng nhau truyền đạt thông điệp nhân văn đến thế giới.</li>
        <li><strong>Số 6:</strong> Cùng yêu thương và muốn tạo ra môi trường tốt đẹp hơn — một người ở quy mô gia đình (6), một người ở quy mô thế giới (9).</li>
        <li><strong>Số 9:</strong> Hai tâm hồn cổ đại hiểu nhau ở chiều sâu linh hồn mà rất ít người có thể chạm đến.</li>
      </ul>`,
    },
    tinhDuyen: `<ul>
      <li><strong>Phong cách yêu:</strong> Sâu sắc, vị tha và thường yêu người kia nhiều hơn yêu bản thân. Bạn nhìn thấy tiềm năng tốt nhất trong người yêu — đôi khi điều này trở thành gánh nặng khi thực tế không đáp ứng.</li>
      <li><strong>Điều bạn cần:</strong> Người yêu chia sẻ giá trị nhân văn và có chiều sâu tâm hồn tương đồng. Sự giả tạo hay ích kỷ sẽ làm bạn mất lòng tin nhanh chóng.</li>
      <li><strong>Thách thức:</strong> Khó buông bỏ — kể cả khi mối quan hệ đã kết thúc, bạn vẫn giữ những vết thương và tình cảm cũ lâu hơn cần thiết.</li>
    </ul>`,
    baiHocThuThach: `<ul>
      <li><strong>Bài học về buông bỏ:</strong> Phiên bản mới nhất của bạn không thể ra đời nếu bạn vẫn đang cầm giữ mọi thứ cũ. Buông bỏ là hành động can đảm nhất của số 9.</li>
      <li><strong>Thử thách về ranh giới:</strong> Lòng trắc ẩn không có nghĩa là chịu đựng mọi thứ. Học cách phân biệt giữa giúp đỡ thực sự và hy sinh bản thân vô ích.</li>
      <li><strong>Thử thách về vật chất:</strong> Xu hướng không quan tâm đến tài chính có thể tạo ra bất ổn thực tế. Chăm sóc nhu cầu vật chất của mình cũng là hành động yêu thương bản thân.</li>
    </ul>`,
    banBeGiaDinh: `<ul>
      <li><strong>Trong tình bạn:</strong> Bạn bè đến từ mọi tầng lớp xã hội — bạn nhìn thấy giá trị trong tất cả mọi người. Nhưng hãy chú ý không để bị lợi dụng lòng tốt.</li>
      <li><strong>Trong gia đình:</strong> Bạn yêu thương gia đình sâu sắc nhưng đôi khi cảm thấy không ai thực sự hiểu thế giới bên trong của bạn. Hãy cố gắng biểu đạt thay vì giữ im lặng.</li>
    </ul>`,
    duLichSoThich: `<ul>
      <li><strong>Phong cách du lịch:</strong> Du lịch có mục đích — volunteering trip, hành hương tâm linh, khám phá văn hóa bản địa. Bạn muốn mỗi chuyến đi để lại dấu ấn tốt đẹp.</li>
      <li><strong>Sở thích:</strong> Thiền định, yoga, tình nguyện, viết lách suy ngẫm, âm nhạc trị liệu, đọc sách triết học và tâm linh.</li>
      <li><strong>Tái tạo năng lượng:</strong> Thiên nhiên và sự im lặng — đặc biệt là biển, núi hoặc những nơi có năng lượng tĩnh lặng. Thời gian một mình để tái kết nối với bản thân.</li>
    </ul>`,
    ngheNghiep: `<ul>
      <li><strong>Định hướng phù hợp:</strong> Công việc phục vụ nhân loại ở quy mô lớn — nghệ thuật, nhân đạo, giáo dục, y tế, tâm linh, môi trường.</li>
      <li><strong>Công việc lý tưởng:</strong> Nhà văn, nghệ sĩ, nhà hoạt động xã hội, bác sĩ tình nguyện, nhà tâm lý học, giáo viên truyền cảm hứng, nhà lãnh đạo tổ chức phi lợi nhuận.</li>
      <li><strong>Môi trường làm việc:</strong> Cần ý nghĩa thực sự — không chỉ là tiền lương. Sẽ kiệt sức nhanh chóng trong môi trường thiếu mục đích và giá trị nhân văn.</li>
    </ul>`,
  },

  11: {
    nguoiNoiTieng: [
      { name: 'Barack Obama', field: 'Chính trị', note: 'Tổng thống Mỹ mang thông điệp hy vọng và thay đổi đến hàng triệu người' },
      { name: 'Edgar Allan Poe', field: 'Văn học', note: 'Nhà văn thiên tài với trực giác sâu thẳm và khả năng khai thác tâm linh con người' },
      { name: 'Mozart', field: 'Âm nhạc', note: 'Thiên tài âm nhạc có khả năng kênh hóa vũ trụ qua nốt nhạc — biểu tượng tối thượng của số 11' },
      { name: 'Coco Chanel', field: 'Thiết kế thời trang', note: 'Nhà thiết kế cách mạng với trực giác thẩm mỹ vượt trước thời đại nhiều thập kỷ' },
      { name: 'Harry Houdini', field: 'Nghệ thuật biểu diễn', note: 'Ảo thuật gia huyền thoại — người truyền cảm hứng và kỳ diệu hóa cuộc sống thường nhật' },
    ],
    tuongThich: {
      tot: [2, 6, 8],
      khong: [1, 5, 9],
      moTaTot: 'Số 2 (nền tảng của 11) chia sẻ sự nhạy cảm và hài hòa. Số 6 cung cấp sự ổn định và tình yêu thương. Số 8 giúp số 11 hiện thực hóa tầm nhìn cao cả bằng năng lực thực thi.',
      moTaKhong: 'Số 1 quá cứng nhắc và thực tế có thể làm số 11 cảm thấy không được hiểu. Số 5 thiếu chiều sâu cần thiết. Số 9 cũng tầm nhìn lớn — nhưng đôi khi cả hai đều thiếu người hiện thực hóa.',
      chiTiet: `<ul>
        <li><strong>Số 2:</strong> Số 11 là bậc cao của số 2 — khi gặp nhau, họ hiểu nhau ở chiều sâu cảm xúc mà ít người đạt được.</li>
        <li><strong>Số 6:</strong> Số 6 nuôi dưỡng, số 11 truyền cảm hứng — cân bằng giữa thực tế và lý tưởng.</li>
        <li><strong>Số 8:</strong> Số 11 có tầm nhìn, số 8 có sức mạnh thực thi — cặp đôi có thể tạo ra tác động thực sự lên thế giới.</li>
      </ul>`,
    },
    tinhDuyen: `<ul>
      <li><strong>Phong cách yêu:</strong> Bạn yêu bằng cả linh hồn — cường độ và chiều sâu tình cảm không phải ai cũng có thể chịu đựng hoặc xứng đáng nhận. Bạn cần người thực sự đặc biệt.</li>
      <li><strong>Điều bạn cần:</strong> Người yêu có chiều sâu tâm hồn tương đồng, hiểu và trân trọng bản chất nhạy cảm và trực giác của bạn.</li>
      <li><strong>Thách thức:</strong> Lý tưởng hóa quá mức và dễ vỡ mộng. Học cách yêu thương người thực sự đứng trước mặt mình, không phải phiên bản hoàn hảo bạn tưởng tượng.</li>
    </ul>`,
    baiHocThuThach: `<ul>
      <li><strong>Bài học về hiện thực hóa:</strong> Tầm nhìn và trực giác chỉ có giá trị khi được đưa vào hành động. Học cách cầu nối giữa thế giới tinh thần và thế giới vật chất.</li>
      <li><strong>Thử thách về lo lắng:</strong> Nhạy cảm cao đi kèm với xu hướng lo âu và căng thẳng. Phát triển các thực hành làm dịu hệ thần kinh là cần thiết.</li>
      <li><strong>Thử thách về uy quyền:</strong> Học cách tin vào tầm nhìn của mình và chia sẻ nó mà không cần đợi sự xác nhận của người khác.</li>
    </ul>`,
    banBeGiaDinh: `<ul>
      <li><strong>Trong tình bạn:</strong> Người bạn đồng hành lý tưởng cho những cuộc trò chuyện chiều sâu. Nhưng cần học cách cũng thoải mái trong những tương tác nhẹ nhàng, không sâu sắc.</li>
      <li><strong>Trong gia đình:</strong> Thường là người "khác biệt" trong gia đình — mọi người yêu quý nhưng chưa hẳn hiểu. Hãy kiên nhẫn giải thích thế giới bên trong của bạn.</li>
    </ul>`,
    duLichSoThich: `<ul>
      <li><strong>Sở thích:</strong> Thiền định, nghiên cứu tâm linh, sáng tác nghệ thuật theo trực giác, âm nhạc chữa lành, tiếp xúc với thiên nhiên và các vùng năng lượng đặc biệt.</li>
      <li><strong>Phong cách du lịch:</strong> Các điểm đến có năng lượng tâm linh mạnh — Ấn Độ, Peru, Ai Cập cổ đại, các vùng núi thiêng. Bạn du lịch để tìm kiếm ý nghĩa, không chỉ nghỉ dưỡng.</li>
    </ul>`,
    ngheNghiep: `<ul>
      <li><strong>Định hướng phù hợp:</strong> Truyền cảm hứng và dẫn dắt thông qua nghệ thuật, tâm linh, giáo dục hoặc tư vấn — nơi tầm nhìn và trực giác của bạn tạo ra giá trị thực.</li>
      <li><strong>Công việc lý tưởng:</strong> Nhà trị liệu, life coach, nhạc sĩ, diễn thuyết truyền cảm hứng, nghệ sĩ, nhà thơ, nhà lãnh đạo tâm linh, tư vấn chiến lược.</li>
    </ul>`,
  },

  22: {
    nguoiNoiTieng: [
      { name: 'Bill Gates', field: 'Công nghệ / Từ thiện', note: 'Xây dựng Microsoft từ garage, sau đó tạo ra tổ chức từ thiện lớn nhất thế giới' },
      { name: 'Dalai Lama XIV', field: 'Tâm linh', note: 'Người xây dựng cầu nối giữa Đông và Tây, giữa tinh thần và thực tế suốt nhiều thập kỷ' },
      { name: 'Sigmund Freud', field: 'Tâm lý học', note: 'Người xây dựng nền tâm lý học hiện đại — tư duy hệ thống ở quy mô toàn nhân loại' },
      { name: 'Richard Nixon', field: 'Chính trị', note: 'Tổng thống Mỹ với tầm nhìn địa chính trị vĩ đại và khả năng xây dựng thể chế phức tạp' },
    ],
    tuongThich: {
      tot: [4, 6, 8],
      khong: [3, 5, 9],
      moTaTot: 'Số 4 (nền tảng của 22) chia sẻ kỷ luật và tính thực tế. Số 6 mang sự ấm áp cần thiết. Số 8 chia sẻ tham vọng quy mô lớn và sức mạnh thực thi.',
      moTaKhong: 'Số 3 thiếu chiều sâu và kỷ luật cần thiết. Số 5 quá tự do không phù hợp mục tiêu dài hạn. Số 9 cùng tầm nhìn nhân loại nhưng thiếu tính thực tế.',
      chiTiet: `<ul>
        <li><strong>Số 4:</strong> Số 22 là bậc cao của số 4 — cùng xây dựng, cùng kỷ luật, nhưng ở quy mô khác nhau. Khi gặp nhau, họ tạo nền tảng cực kỳ vững chắc.</li>
        <li><strong>Số 8:</strong> Cả hai đều muốn tạo ra đế chế — nhưng số 22 ở quy mô phục vụ nhân loại, không chỉ tích lũy cá nhân.</li>
      </ul>`,
    },
    tinhDuyen: `<ul>
      <li><strong>Phong cách yêu:</strong> Nghiêm túc và cam kết — bạn không quan tâm tình yêu thoáng qua. Khi đã yêu, bạn đầu tư toàn bộ và kỳ vọng người kia cũng tương tự.</li>
      <li><strong>Điều bạn cần:</strong> Người đồng hành chia sẻ tầm nhìn lớn và không sợ hãi trước sức mạnh và tham vọng của bạn.</li>
      <li><strong>Thách thức:</strong> Tầm nhìn quá lớn đôi khi khiến bạn quên những điều nhỏ bé quan trọng — một bữa tối cùng nhau, một cuộc trò chuyện không có mục tiêu.</li>
    </ul>`,
    baiHocThuThach: `<ul>
      <li><strong>Bài học về khiêm tốn:</strong> Tầm nhìn lớn không có nghĩa là bạn đúng về mọi thứ. Học cách lắng nghe người khác dù bạn tin vào con đường của mình.</li>
      <li><strong>Thử thách về sức khỏe:</strong> Tham vọng phi thường dễ dẫn đến kiệt sức. Cơ thể là phương tiện — cần được chăm sóc để hoàn thành sứ mệnh.</li>
    </ul>`,
    banBeGiaDinh: `<ul>
      <li><strong>Trong tình bạn và gia đình:</strong> Bạn là người đáng tin cậy tuyệt đối — nhưng đôi khi quá bận rộn với "sứ mệnh" đến mức bỏ lỡ những khoảnh khắc bình thường quý giá.</li>
    </ul>`,
    duLichSoThich: `<ul>
      <li><strong>Sở thích:</strong> Kiến trúc, lịch sử văn minh, địa chính trị, xây dựng hệ thống quy mô lớn, nghiên cứu các mô hình xã hội tiên tiến.</li>
    </ul>`,
    ngheNghiep: `<ul>
      <li><strong>Công việc lý tưởng:</strong> Lãnh đạo tổ chức quốc tế, kiến trúc sư đô thị, nhà lập pháp, người sáng lập phong trào xã hội quy mô lớn, tỷ phú từ thiện.</li>
      <li><strong>Lưu ý:</strong> Số 22 cần tìm được dự án xứng tầm — khi chưa tìm thấy, dễ rơi vào trạng thái bất an và tích lũy không có mục đích rõ ràng.</li>
    </ul>`,
  },

  33: {
    nguoiNoiTieng: [
      { name: 'Meryl Streep', field: 'Điện ảnh', note: 'Diễn viên vĩ đại nhất thế giới — người chữa lành qua nghệ thuật chuyện kể' },
      { name: 'Francis of Assisi', field: 'Tôn giáo / Nhân đạo', note: 'Thánh Francisco — biểu tượng của lòng từ bi và phục vụ vô điều kiện tất cả chúng sinh' },
      { name: 'Stephen King', field: 'Văn học', note: 'Nhà văn huyền thoại người chữa lành nỗi sợ của nhân loại bằng cách đặt tên cho chúng' },
      { name: 'Albert Schweitzer', field: 'Y tế / Nhân đạo', note: 'Bác sĩ và nhạc sĩ — người hy sinh danh vọng để phục vụ người nghèo ở Châu Phi' },
    ],
    tuongThich: {
      tot: [6, 9, 11],
      khong: [1, 5, 8],
      moTaTot: 'Số 6 (nền tảng của 33) chia sẻ tình yêu thương và nuôi dưỡng. Số 9 cùng tầm nhìn nhân văn toàn cầu. Số 11 cùng chiều sâu tâm linh và trực giác cao.',
      moTaKhong: 'Số 1 quá tự ngã và thực dụng. Số 5 thiếu cam kết và chiều sâu. Số 8 ưu tiên vật chất khó hòa hợp với giá trị cho đi vô điều kiện của số 33.',
      chiTiet: `<ul>
        <li><strong>Số 6:</strong> Số 33 là bậc thăng hoa của số 6 — khi gặp nhau, tình yêu thương đạt đến chiều sâu hiếm thấy.</li>
        <li><strong>Số 9:</strong> Cả hai đều yêu thương ở quy mô lớn hơn bản thân — đây là sự cộng hưởng mạnh mẽ nhất.</li>
      </ul>`,
    },
    tinhDuyen: `<ul>
      <li><strong>Phong cách yêu:</strong> Yêu thương vô điều kiện ở mức độ mà rất ít người có thể nhận và hiểu. Bạn thấy điều tốt nhất trong người yêu và chữa lành họ bằng tình yêu — đây là quà tặng và cũng là gánh nặng.</li>
      <li><strong>Điều bạn cần:</strong> Người đủ trưởng thành để nhận tình yêu của bạn mà không cảm thấy áp lực phải hoàn hảo. Ai đó yêu thương lại bạn với sự chân thật.</li>
      <li><strong>Thách thức:</strong> Bạn đôi khi yêu tiềm năng của người kia hơn là con người thực tế của họ. Học cách yêu thương có ranh giới lành mạnh.</li>
    </ul>`,
    baiHocThuThach: `<ul>
      <li><strong>Bài học thiêng liêng nhất:</strong> Không phải mọi người đều cần được cứu bởi bạn. Đôi khi tình yêu thương nhất là cho phép người khác đi con đường riêng của họ.</li>
      <li><strong>Thử thách về ranh giới:</strong> Lòng từ bi không có ranh giới sẽ dẫn đến kiệt sức và mất bản thân. Ranh giới không phải là hàng rào — đó là cách bảo tồn khả năng yêu thương bền vững.</li>
    </ul>`,
    banBeGiaDinh: `<ul>
      <li><strong>Trong mọi mối quan hệ:</strong> Bạn là người chữa lành — ai đến với bạn đều ra đi tốt hơn. Nhưng hãy nhớ: bạn cũng cần được chữa lành. Hãy tìm những người có thể làm điều đó cho bạn.</li>
    </ul>`,
    duLichSoThich: `<ul>
      <li><strong>Sở thích:</strong> Tất cả những gì chữa lành và kết nối — thiền định, yoga, nghệ thuật, âm nhạc, tình nguyện, dạy học, viết lách về tình thương và sự trưởng thành.</li>
    </ul>`,
    ngheNghiep: `<ul>
      <li><strong>Công việc lý tưởng:</strong> Thầy giáo tâm linh, nhà trị liệu chữa lành, nghệ sĩ biểu đạt tình yêu thương vũ trụ, nhà lãnh đạo tôn giáo hoặc cộng đồng, nhà từ thiện.</li>
      <li><strong>Lưu ý:</strong> Số 33 cần tìm được sứ mệnh phù hợp — khi chưa có, dễ trở nên kiệt sức và mất phương hướng vì cảm giác phải phục vụ mà không biết phục vụ điều gì.</li>
    </ul>`,
  },

};

export function renderLifePathExtra(num: number, name: string): string {
  const n = num;
  const data = LIFE_PATH_EXTRA[n];
  if (!data) return '';

  let html = '';

  // 1. Người nổi tiếng
  if (data.nguoiNoiTieng && data.nguoiNoiTieng.length) {
    const cards = data.nguoiNoiTieng.map((p: LifePathFamous) => `
      <div class="lp-famous-card">
        <div class="lp-famous-name">${escapeHtml(p.name)}</div>
        <div class="lp-famous-field">${escapeHtml(p.field)}</div>
        ${p.note ? `<div class="lp-famous-note">${escapeHtml(p.note)}</div>` : ''}
      </div>`).join('');
    html += `
    <div class="lp-extra-section">
      <div class="lp-extra-heading">🌟 Người Nổi Tiếng Cùng Số Đường Đời ${n}</div>
      <div class="lp-famous-grid">${cards}</div>
    </div>`;
  }

  // 2. Mối quan hệ tương thích
  if (data.tuongThich) {
    const tc = data.tuongThich;
    const goodNums = (tc.tot || []).map((x: number) => `<div class="lp-compat-num">${x}</div>`).join('');
    const badNums = (tc.khong || []).map((x: number) => `<div class="lp-compat-num">${x}</div>`).join('');
    html += `
    <div class="lp-extra-section">
      <div class="lp-extra-heading">💞 Mối Quan Hệ Tương Thích</div>
      <div class="lp-compat-wrapper">
        <div class="lp-compat-good">
          <div class="lp-compat-label">✅ Tương thích tốt nhất</div>
          <div class="lp-compat-numbers">${goodNums}</div>
          <div class="lp-compat-desc">${tc.moTaTot || ''}</div>
        </div>
        <div class="lp-compat-bad">
          <div class="lp-compat-label">⚠️ Ít tương thích nhất</div>
          <div class="lp-compat-numbers">${badNums}</div>
          <div class="lp-compat-desc">${tc.moTaKhong || ''}</div>
        </div>
      </div>
      ${tc.chiTiet ? `<div class="lp-extra-body">${tc.chiTiet}</div>` : ''}
    </div>`;
  }

  // 3. Tình duyên
  if (data.tinhDuyen) {
    html += `
    <div class="lp-extra-section">
      <div class="lp-extra-heading">💖 Tình Duyên</div>
      <div class="lp-extra-body">${data.tinhDuyen}</div>
    </div>`;
  }

  // 4. Bài học & Thử thách
  if (data.baiHocThuThach) {
    html += `
    <div class="lp-extra-section">
      <div class="lp-extra-heading">📖 Bài Học &amp; Thử Thách</div>
      <div class="lp-extra-body">${data.baiHocThuThach}</div>
    </div>`;
  }

  // 5. Bạn bè & Gia đình
  if (data.banBeGiaDinh) {
    html += `
    <div class="lp-extra-section">
      <div class="lp-extra-heading">👨‍👩‍👧 Bạn Bè &amp; Gia Đình</div>
      <div class="lp-extra-body">${data.banBeGiaDinh}</div>
    </div>`;
  }

  // 6. Du lịch & Sở thích
  if (data.duLichSoThich) {
    html += `
    <div class="lp-extra-section">
      <div class="lp-extra-heading">✈️ Du Lịch &amp; Sở Thích</div>
      <div class="lp-extra-body">${data.duLichSoThich}</div>
    </div>`;
  }

  // 7. Nghề nghiệp
  if (data.ngheNghiep) {
    html += `
    <div class="lp-extra-section">
      <div class="lp-extra-heading">💼 Nghề Nghiệp Phù Hợp</div>
      <div class="lp-extra-body">${data.ngheNghiep}</div>
    </div>`;
  }

  return html;
}

// ─── HELPER: Build Life Cycles Section (redesigned) ──────────────────────────

export function lifePathCtxBlock(num: number, ctx: NarrativeContext, name: string): string {
  const soul = ctx.soul;
  const bday = ctx.birthday;
  const same = num === soul;
  const energyMatch = ([1, 3, 5, 9].includes(num) && [1, 3, 5, 9].includes(soul)) ||
    ([2, 4, 6, 8].includes(num) && [2, 4, 6, 8].includes(soul));
  let insight = '';
  if (same) {
    insight = `Linh hồn số <strong>${soul}</strong> của bạn hoàn toàn đồng nhất với Đường đời — điều cực kỳ hiếm gặp. Những gì bạn khao khát sâu nhất bên trong chính xác là những gì thiên mệnh dẫn dắt bạn thực sống. Hạnh phúc và bình an đến với bạn tự nhiên hơn khi bạn lắng nghe tiếng gọi nội tâm thay vì chạy theo kỳ vọng bên ngoài.`;
  } else if (energyMatch) {
    insight = `Linh hồn số <strong>${soul}</strong> cộng hưởng hài hòa với Đường đời — năng lượng bên trong và bên ngoài chảy cùng một nhịp, tạo ra sự vững vàng và nhất quán nội tâm đặc biệt. Hành động từ trái tim thường đồng thời là hành động đúng với thiên mệnh.`;
  } else {
    insight = `Linh hồn số <strong>${soul}</strong> tạo ra chiều kích nội tâm khác biệt với Đường đời — bên ngoài bạn vận hành theo số ${num}, nhưng sâu bên trong luôn có một khao khát riêng từ năng lượng số ${soul}. Hiểu được sự đa chiều này là chìa khóa để bạn sống trọn vẹn mà không bị xé ngang.`;
  }
  return `<div class="insight-box" style="margin-top:1rem;border-color:#7c3aed;">🔗 <strong>Giao điểm Đường đời ↔ Linh hồn (${soul}) &amp; Ngày sinh (${bday}):</strong> ${insight} Ngày sinh số <strong>${bday}</strong> của bạn bổ sung năng lực tự nhiên, hỗ trợ Đường đời số ${num} phát triển theo cách riêng biệt và độc đáo.</div>`;
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
