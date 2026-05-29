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
