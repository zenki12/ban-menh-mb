import { escapeHtml } from "./common";

export type PersonalPeriodKbData = {
  theme?: string;
  description?: string;
  meaning?: string;
  focus?: string;
  opportunities?: string;
  challenges?: string;
  advice?: string;
};

export function personalPeriod(
  label: string,
  num: number,
  yearOrMonth: string | number,
  name: string,
  kbData?: PersonalPeriodKbData | unknown,
): string {
    const d = kbData as PersonalPeriodKbData | undefined;
    const safeLabel = escapeHtml(label);
    const safeYearOrMonth = escapeHtml(String(yearOrMonth));
    const safeName = escapeHtml(name);
    const numMeta: Record<number, { icon: string; theme: string; energy: string; dos: string; donts: string }> = {
      1: { icon: '🌱', theme: 'Khởi đầu & Tiên phong', energy: `Đây là thời điểm vũ trụ trao cho <strong>${safeName}</strong> một trang trắng tinh khôi. Năng lượng số 1 thúc đẩy bạn hành động, khởi xướng và dứt khoát. Mọi thứ bạn gieo hạt trong giai đoạn này sẽ định hình cả chu kỳ 9 năm hoặc 9 tháng tiếp theo.`, dos: 'Bắt đầu dự án mới, thể hiện bản thân, đưa ra quyết định táo bạo, tự học kỹ năng mới', donts: 'Trì hoãn, phụ thuộc vào người khác để ra quyết định' },
      2: { icon: '🤝', theme: 'Hợp tác & Kiên nhẫn', energy: `Giai đoạn này dành cho sự kết nối và lắng nghe. Năng lượng số 2 yêu cầu <strong>${safeName}</strong> phải chậm lại, quan tâm đến người khác và xây dựng những cây cầu kết nối. Đây không phải thời điểm của hành động ồ ạt — mà là thời điểm của sự kiên nhẫn chiến lược.`, dos: 'Xây dựng và củng cố mối quan hệ, lắng nghe sâu, chiến lược dài hạn, chăm sóc sức khỏe', donts: 'Hấp tấp, cưỡng cầu, đối đầu không cần thiết' },
      3: { icon: '✨', theme: 'Sáng tạo & Biểu đạt', energy: `Đây là mùa xuân của cuộc đời. Năng lượng số 3 mang đến cho <strong>${safeName}</strong> nguồn cảm hứng sáng tạo và khát khao biểu đạt bản thân. Giao lưu, học hỏi, thử những điều mới — tất cả đều được universe ủng hộ trong giai đoạn này.`, dos: 'Sáng tạo, kết nối xã hội, học kỹ năng mới, du lịch, viết lách, âm nhạc, nghệ thuật', donts: 'Phân tán năng lượng, bỏ cuộc giữa chừng' },
      4: { icon: '🏗️', theme: 'Xây dựng & Kỷ luật', energy: `Thực tế và kỷ luật là từ khóa của giai đoạn này. Năng lượng số 4 yêu cầu <strong>${safeName}</strong> xây dựng nền tảng vững chắc — trong công việc, tài chính, sức khỏe và các mối quan hệ. Không phải thời điểm hào nhoáng, nhưng là thời điểm tạo ra sự khác biệt thực sự.`, dos: 'Lập kế hoạch chi tiết, tiết kiệm, chăm sóc sức khỏe, hoàn thiện kỹ năng, tổ chức lại cuộc sống', donts: 'Trì hoãn, chi tiêu bốc đồng, bỏ qua chi tiết' },
      5: { icon: '🌊', theme: 'Thay đổi & Tự do', energy: `Những bất ngờ và cơ hội mới đang ở ngưỡng cửa. Năng lượng số 5 mang đến cho <strong>${safeName}</strong> làn gió của sự thay đổi — đôi khi được lên kế hoạch, đôi khi hoàn toàn bất ngờ. Hãy giữ sự linh hoạt và sẵn sàng cho những cánh cửa mà bạn chưa từng nghĩ đến.`, dos: 'Đón nhận thay đổi, thử nghiệm, mở rộng kết nối, du lịch, học thêm', donts: 'Cứng nhắc, sợ thay đổi, cam kết vội vàng' },
      6: { icon: '💗', theme: 'Tình yêu & Trách nhiệm', energy: `Gia đình và các mối quan hệ thân thiết đòi hỏi sự chú ý đặc biệt trong giai đoạn này. Năng lượng số 6 mời <strong>${safeName}</strong> quay về với những gì thực sự quan trọng — không phải thành công bên ngoài, mà là chất lượng của những kết nối bên trong.`, dos: 'Chăm sóc gia đình, hàn gắn mối quan hệ, tạo môi trường sống tốt đẹp hơn, phục vụ cộng đồng', donts: 'Bỏ qua gia đình, ôm đồm trách nhiệm không phải của mình' },
      7: { icon: '🔮', theme: 'Nội tâm & Tâm linh', energy: `Đây là năm/tháng của sự tự vấn và chiều sâu. Năng lượng số 7 dẫn <strong>${safeName}</strong> về với nội tâm — học hỏi, nghiên cứu, thiền định và lắng nghe những thông điệp từ bên trong. Nghỉ ngơi và tiếp nạp là những hành động tiến bộ trong giai đoạn này.`, dos: 'Meditation, học hỏi chuyên sâu, viết nhật ký, đọc sách, nghỉ ngơi có chủ đích', donts: 'Ép buộc hành động bên ngoài, bỏ qua trực giác, so sánh bản thân với người khác' },
      8: { icon: '👑', theme: 'Quyền lực & Thịnh vượng', energy: `Năng lượng số 8 đang chiếu sáng con đường thành công và thịnh vượng cho <strong>${safeName}</strong>. Đây là thời điểm để thu hoạch những gì đã gieo, đàm phán, mở rộng và khẳng định vị thế của mình. Tiền bạc và cơ hội đang sẵn sàng — vấn đề là bạn có đủ can đảm để đón nhận hay không.`, dos: 'Đàm phán và ký kết hợp đồng, đầu tư, mở rộng sự nghiệp, yêu cầu mức lương xứng đáng', donts: 'Từ chối cơ hội vì sợ thất bại, chi tiêu liều lĩnh' },
      9: { icon: '🦋', theme: 'Hoàn thành & Buông bỏ', energy: `Một chương quan trọng đang khép lại. Năng lượng số 9 mời <strong>${safeName}</strong> nhìn lại, cảm ơn và buông bỏ những gì không còn phục vụ hành trình của mình nữa. Đây là giai đoạn giải phóng sâu sắc — và nếu được thực hiện đúng cách, sẽ mở ra không gian cho một khởi đầu hoàn toàn mới.`, dos: 'Tổng kết, từ thiện, buông bỏ mối quan hệ/công việc cũ không còn phù hợp, du lịch dài ngày', donts: 'Bắt đầu dự án mới lớn, cưỡng cầu giữ lại những gì đã hết vai trò' }
    };

    const meta = numMeta[num] || numMeta[num % 9 || 9];

    let txt = `
    <div class="personal-year-card">
      <div class="py-icon">${meta?.icon || '⭐'}</div>
      <div class="py-content">
        <div class="py-title">${safeLabel} <strong>${safeYearOrMonth}</strong> của <strong>${safeName}</strong></div>
        <div class="py-num-badge">${num}</div>
        <div class="py-theme">${meta?.theme || ''}</div>
      </div>
    </div>`;

    txt += `<p class="nar">${meta?.energy || ''}</p>`;

    if (d?.description || d?.theme || d?.meaning) {
      txt += `<p class="nar">${d.description || d.theme || d.meaning}</p>`;
    }
    if (d?.focus) txt += `<p class="nar"><strong>✦ Trọng tâm cần hướng đến:</strong> ${d.focus}</p>`;
    if (d?.opportunities) txt += `<p class="nar"><strong>✦ Cơ hội đang mở ra:</strong> ${d.opportunities}</p>`;
    if (d?.challenges) txt += `<p class="nar"><strong>✦ Thử thách cần vượt qua:</strong> ${d.challenges}</p>`;

    if (meta?.dos || meta?.donts) {
      txt += `<div class="dos-donts-grid">
        <div class="dos-block"><strong>✅ Nên làm:</strong><br>${meta.dos}</div>
        <div class="donts-block"><strong>❌ Tránh:</strong><br>${meta.donts}</div>
      </div>`;
    }
    if (d?.advice) txt += `<div class="insight-box">💡 <strong>Lời khuyên đặc biệt:</strong> ${d.advice}</div>`;
    return txt;
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

  export type YearDeepContent = {
  title: string;
  subtitle: string;
  intro: string;
  congviec: string;
  quanhe: string;
  suckhoe: string;
  taichinhthanhoc?: string;
  taichinhthanhhoc?: string;
  taichinhhoatap?: string;
  banthan: string;
  tonket: string;
};

export function personalYearDeep(num: number, year: number, name: string): string {
    const safeName = escapeHtml(name);
    const safeYear = escapeHtml(String(year));
    const n = num % 9 || 9;
    const content: Record<number, YearDeepContent> = {
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


function yearContent(num: number, name: string): Omit<YearDeepContent, "title" | "subtitle" | "intro"> {
    const safeName = escapeHtml(name);
    const n = num % 9 || 9;
    const YEAR_DATA: Record<number, Omit<YearDeepContent, "title" | "subtitle" | "intro">> = {
      1: {
        congviec: `Đây là năm lý tưởng để bắt đầu một dự án mới, thay đổi hướng đi sự nghiệp hoặc khởi động doanh nghiệp riêng.Năng lượng số 1 ủng hộ sự tự lập và dám nghĩ dám làm.Nếu bạn có ý tưởng đã nung nấu lâu nay, đây là thời điểm thực hiện nó.Hãy đặt mục tiêu cụ thể cho 12 tháng tới và bắt đầu từ bước nhỏ nhất ngay hôm nay.Tránh để người khác quyết định thay bạn trong những vấn đề quan trọng với sự nghiệp.\n\nTuy nhiên, hãy cẩn thận không để tính độc lập trở thành sự cứng đầu.Hợp tác vẫn cần thiết nhưng hãy đảm bảo bạn đang chọn người cộng tác đúng đắn — người phù hợp với tầm nhìn của bạn.`,
        quanhe: `Trong các mối quan hệ, bạn có thể cảm thấy cần không gian và sự độc lập hơn thường lệ.Đây là điều bình thường với năng lượng số 1. Tuy nhiên, hãy cẩn thận không để sự tự lập trở thành cô lập.Các mối quan hệ bắt đầu trong năm này thường mang năng lượng mạnh mẽ và định hình lại con người bạn.\n\nNếu đang trong mối quan hệ, đây là năm để tái định nghĩa vai trò của bạn trong đó — theo hướng lành mạnh và trưởng thành hơn.Hãy nói ra những điều bạn thực sự muốn thay vì chờ đợi người kia tự hiểu.`,
        taichinhthanhoc: `Về tài chính, đây là năm tốt để bắt đầu những kế hoạch đầu tư mới và tạo ra nguồn thu nhập mới.Tuy nhiên, hãy hành động với sự chuẩn bị kỹ lưỡng thay vì bốc đồng.Đây cũng là năm để học một kỹ năng tài chính mới: đọc báo cáo, hiểu về đầu tư, hoặc tạo quỹ khẩn cấp cá nhân.\n\nHãy xây dựng ngân sách rõ ràng và bám sát kế hoạch chi tiêu.Các khoản tiết kiệm bắt đầu trong năm này sẽ có hiệu quả kép trong vài năm tới.`,
        banthan: `Đây là năm của sự tự khám phá sâu sắc.Hãy dành thời gian định nghĩa lại: bạn muốn trở thành ai trong chu kỳ 9 năm tiếp theo ? Những quyết định bạn đưa ra năm nay sẽ định hướng cả một giai đoạn dài của cuộc đời.\n\nHãy mở rộng mạng lưới quan hệ một cách có chủ đích.Tìm kiếm những người có thể truyền cảm hứng và kết nối bạn với cơ hội mới.Đồng thời, hãy sẵn sàng buông bỏ những mối quan hệ không còn phù hợp với con người bạn đang trở thành.`,
        suckhoe: `Sức khỏe năm nay có xu hướng tốt nếu bạn duy trì năng lượng một cách có kỷ luật.Hãy bắt đầu một thói quen tập luyện mới, điều chỉnh chế độ ăn uống hoặc cải thiện giấc ngủ.Tránh kiệt sức do làm việc quá sức — đây là nguy cơ phổ biến với năng lượng số 1.\n\nDành thời gian cho bản thân học điều mới là đầu tư thông minh nhất trong năm 1. Bạn có tinh thần học hỏi rất cao — hãy tận dụng điều này để nâng cao năng lực.`,
        tonket: `Thành công của <strong>${safeName}</strong> trong năm này không được đo bằng những gì người khác nhìn thấy — mà bằng mức độ bạn đã dám là chính mình. Năm số 1 trao cho bạn một đặc ân hiếm có: trang giấy trắng. Được viết lại, được chọn lại, được bắt đầu không phải từ con số không — mà từ tất cả những gì bạn đã tích lũy.

Hãy nhớ rằng: mọi bước đi lớn đều bắt đầu từ một quyết định nhỏ được đưa ra trong im lặng. <strong>${safeName}</strong> đang ở ngay tại giao lộ đó. Những gì bạn chọn trong năm này — dù lớn hay nhỏ — đều mang năng lượng của người tiênen phong. Không phải ai cũng có cơ hội này. Hãy trân trọng nó.

Năm số 1 sẽ đi qua — nhưng những cánh cửa bạn mở ra trong năm này sẽ ở lại rất lâu. Hãy dũng cảm bước qua chúng.`,
      },
      2: {
        congviec: `Năm 2 là năm của sự hợp tác và xây dựng mối quan hệ nghề nghiệp.Đây không phải thời điểm tốt để hành động đơn độc — hãy tìm kiếm đối tác, cộng sự và người cố vấn.Những kết nối bạn xây dựng năm nay sẽ mang lại quả ngọt trong tương lai.\n\nHãy kiên nhẫn với tiến độ công việc — số 2 không ủng hộ sự vội vàng.Tập trung vào việc cải thiện kỹ năng giao tiếp và lắng nghe.Đây là năm để làm nền tảng, không phải để thu hoạch lớn.`,
        quanhe: `Đây là năm lý tưởng cho các mối quan hệ — tình yêu, gia đình và bạn bè đều cần được chú tâm.Năng lượng số 2 tăng cường sự nhạy cảm cảm xúc, giúp bạn hiểu người khác sâu sắc hơn.\n\nNếu đang tìm kiếm tình yêu, bạn có thể gặp người quan trọng trong năm này.Nếu đang trong mối quan hệ, đây là thời điểm để củng cố và làm sâu sắc thêm sự gắn kết.Hãy thể hiện sự quan tâm qua hành động nhỏ hàng ngày.`,
        taichinhthanhoc: `Tài chính năm 2 thường ổn định nhưng không có đột phá lớn.Đây là thời điểm tốt để tiết kiệm và tránh các khoản đầu tư rủi ro cao.Hãy tập trung vào việc thanh toán các khoản nợ hiện tại và xây dựng quỹ dự phòng.\n\nCác quyết định tài chính quan trọng nên được thảo luận kỹ với người có chuyên môn hoặc người bạn tin tưởng thay vì quyết định một mình.`,
        banthan: `Năm 2 là năm để xây dựng và duy trì các mối quan hệ xã hội có chiều sâu.Thay vì mở rộng số lượng, hãy tập trung vào chất lượng.Dành thời gian cho những người thực sự quan trọng với bạn.\n\nHãy tham gia các nhóm cộng đồng hoặc câu lạc bộ phù hợp với sở thích.Sự kết nối xã hội sẽ mang lại cho bạn cảm giác an toàn và được hỗ trợ trong suốt năm này.`,
        suckhoe: `Sức khỏe cần được chú ý đặc biệt về mặt cảm xúc và tinh thần.Năng lượng số 2 làm tăng nhạy cảm — hãy học cách bảo vệ năng lượng bản thân trước các tình huống căng thẳng.\n\nNăm 2 là thời điểm tốt để học các kỹ năng tự nhận thức và quản lý cảm xúc.Thiền định, yoga hoặc ghi nhật ký có thể giúp bạn duy trì cân bằng tâm lý.`,
        tonket: `Năm số 2 dạy <strong>${safeName}</strong> một bài học mà xã hội hiện đại thường quên mất: không phải mọi thứ đều cần được đẩy nhanh. Đôi khi, đi chậm là cách đi xa nhất. Hãy để những kết nối bạn gây dựng trong năm này được tưới tắm bằng sự kiên nhẫn và chân thành.

Thành công thực sự của năm 2 không nằm ở những gì bạn đạt được một mình — mà ở những mối quan hệ được củng cố, những hạt giống hợp tác được gieo xuống, và những cuộc đối thoại chân thực được mở ra. Nốu đo được những điều này, bạn sẽ thấy năm này giàu có hơn bất kỳ năm nào.

<strong>${safeName}</strong>, hãy kết thúc năm 2 với câu hỏi: <em>"Ai trong cuộc đời mình đang cần mình hơn mình nghĩ?"</em> Rồi hãy thực hiện đớu nhỏ nhất vào ngày mai.`,
      },
      3: {
        congviec: `Năm 3 là năm của sự sáng tạo và biểu đạt trong sự nghiệp.Hãy để bản thân được tỏa sáng — trình bày ý tưởng, đề xuất dự án mới và không ngại thể hiện tài năng.Đây là thời điểm lý tưởng cho các ngành nghề liên quan đến nghệ thuật, truyền thông và giao tiếp.\n\nNăm 3 ủng hộ sự mở rộng và phát triển — hãy nắm bắt cơ hội mới, tham gia sự kiện ngành và kết nối với những người có thể mở ra cánh cửa mới cho sự nghiệp.`,
        quanhe: `Sức hút xã hội của bạn đạt đỉnh cao trong năm 3. Đây là năm lý tưởng để gặp gỡ người mới, mở rộng vòng tròn quan hệ và tạo ra những kỷ niệm đáng nhớ.\n\nTrong tình yêu, năng lượng lãng mạn và tự nhiên của năm 3 tạo nên những khoảnh khắc đặc biệt.Hãy thể hiện tình cảm một cách sáng tạo và đừng ngại những cử chỉ lãng mạn bất ngờ.`,
        taichinhthanhoc: `Tài chính có xu hướng tích cực trong năm 3 nhưng cần kiểm soát chi tiêu — năng lượng phong phú của năm này dễ dẫn đến việc tiêu xài hoang phí.Hãy dành một phần thu nhập cho những trải nghiệm có giá trị thay vì chỉ vật dụng.\n\nCác cơ hội thu nhập bổ sung có thể đến qua các dự án sáng tạo, viết lách hoặc các hoạt động nghệ thuật.Hãy mở mắt với những nguồn thu nhập không truyền thống.`,
        banthan: `Đây là năm bạn tỏa sáng nhất trong các tương tác xã hội.Năng lượng vui vẻ, lạc quan và hài hước tự nhiên thu hút mọi người đến với bạn.\n\nHãy tham gia các sự kiện xã hội, câu lạc bộ và nhóm cộng đồng.Chia sẻ tài năng và niềm vui với người khác — đây là cách bạn tạo ra tác động lớn nhất trong năm này.`,
        suckhoe: `Sức khỏe nhìn chung tốt trong năm 3 với nhiều năng lượng và niềm vui.Hãy tận dụng sức sống này cho các hoạt động thể chất vui vẻ như nhảy, bơi lội hoặc thể thao nhóm.\n\nNăm 3 là thời điểm tốt để học bất cứ điều gì khơi dậy niềm vui và sự tò mò.Các khóa học ngắn hạn, hội thảo hoặc chương trình đào tạo mới sẽ mang lại nhiều điều thú vị.`,
        tonket: `Năm số 3 nhắc nhở <strong>${safeName}</strong> rằng — bạn có một món quà mà nhiều người khác trân trọng khi thấy bạn dũng cảm đem ra: đó là khả năng mang lại ánh sáng. Hãy để mình được vui, được sáng tạo, và được nói thật cảm xúc của mình theo cách chân thực nhất.

Đây là năm để trả lời câu hỏi: <em>"Nếu không có ai phán xét, mình sẽ làm gì?"</em> Rồi hãy thực sự làm điều đó. Những gì <strong>${safeName}</strong> tạo ra, biểu đạt và chia sẻ trong năm 3 đều có tiềm năng lan toả xa hơn bạn tưởng.

Hãy kết năm 3 không phải bằng câu hỏi <em>"Mình đã đạt được gì?"</em> mà bằng câu hỏi <em>"Mình đã cho đi được gì?"</em> Đó mới là thước đo đích thực của một năm số 3 thành công.`,
      },
      4: {
        congviec: `Năm 4 là năm của sự xây dựng nền tảng vững chắc trong sự nghiệp.Đây không phải lúc để mơ mộng mà là lúc để lên kế hoạch cụ thể và thực thi từng bước.Mọi nỗ lực kiên trì trong năm này sẽ tạo ra kết quả bền vững.\n\nHãy tập trung vào việc hoàn thiện kỹ năng chuyên môn, cải thiện quy trình làm việc và xây dựng uy tín nghề nghiệp.Đây là năm để trở thành chuyên gia đáng tin cậy trong lĩnh vực của mình.`,
        quanhe: `Trong tình yêu và các mối quan hệ, năm 4 đòi hỏi sự ổn định và cam kết thực sự.Đây là thời điểm tốt để định nghĩa rõ ràng về tương lai của mối quan hệ — nếu đang tìm kiếm, hãy tập trung vào sự tương thích lâu dài thay vì cảm xúc nhất thời.\n\nNếu đang trong mối quan hệ, hãy xây dựng những thói quen tốt cùng nhau — từ quản lý tài chính đến các kế hoạch chung dài hạn.`,
        taichinhthanhoc: `Đây là năm lý tưởng để xây dựng nền tảng tài chính vững chắc.Hãy lập ngân sách chi tiết, tạo quỹ khẩn cấp và bắt đầu các khoản đầu tư dài hạn an toàn.\n\nTránh các quyết định tài chính rủi ro hoặc vay mượn không cần thiết.Kỷ luật tài chính trong năm 4 sẽ mang lại an toàn lâu dài cho bạn.`,
        banthan: `Năm 4 có thể cảm thấy ít sôi nổi về mặt xã hội hơn các năm khác, nhưng đây là thời điểm để xây dựng những mối quan hệ có chiều sâu thực sự.\n\nHãy tập trung vào những người thực sự hiểu và hỗ trợ bạn.Chất lượng quan trọng hơn số lượng trong năm này.`,
        suckhoe: `Sức khỏe cần được chú trọng thông qua thói quen ổn định và kỷ luật.Đây là năm tốt để thiết lập một chế độ tập luyện đều đặn, ăn uống lành mạnh và ngủ đủ giấc.\n\nNăm 4 là năm để học những kỹ năng thực tiễn và kỹ thuật — các khóa học cấp chứng chỉ hoặc đào tạo chuyên sâu sẽ rất có giá trị.`,
        tonket: `<strong>${safeName}</strong> có thể cảm thấy năm số 4 không có nhiều ánh đèn sân khấu — và đúng là như vậy. Năm 4 là năm của hậu trường: nơi những cột trụ vô hình được dựng lên, những hệ thống được xây dựng, và những thói quen sẽ định hình cả một thập kỷ sắp tới. Đừng đánh giá thấp những năm này.

Mọi tòa nhà lớn đều có một giai đoạn đào móng — không ai chụp ảnh giai đoạn đó, nhưng không có nó thì không có gì cả được xây lên. <strong>${safeName}</strong> đang ở trong giai đoạn đó. Hãy làm việc với sự kiên nhẫn và tự hào — vì chính bạn biết giá trị của từng viên đá mình đang đặt xuống.

Hãy kết năm 4 bằng một câu hỏi: <em>"Mình đã xây được những gì sẽ ở lại sau khi mình không còn ở đó nữa?"</em> Câu trả lời sẽ cho bạn thấy năm này có ý nghĩa lớn thế nào.`,
      },
      5: {
        congviec: `Năm 5 mang đến những thay đổi lớn và cơ hội bất ngờ trong sự nghiệp.Hãy chuẩn bị tinh thần đón nhận sự thay đổi — đây có thể là thay đổi công việc, vị trí hoặc hướng đi hoàn toàn mới.\n\nNăm 5 ủng hộ sự linh hoạt và khả năng thích nghi.Đừng bám víu vào những gì không còn phù hợp.Hãy mở lòng với những cơ hội mà bạn trước đây chưa từng xem xét.`,
        quanhe: `Trong tình yêu, năm 5 mang đến sự hấp dẫn và phiêu lưu.Bạn có thể gặp những người thú vị và đa dạng.Tuy nhiên, hãy cẩn thận với việc theo đuổi sự mới lạ mà bỏ qua sự ổn định cần thiết.\n\nNếu đang trong mối quan hệ, hãy mang lại sự tươi mới và hứng thú — cùng nhau thử những điều mới, du lịch hoặc tạo ra những trải nghiệm chưa từng có.`,
        taichinhthanhoc: `Tài chính trong năm 5 có thể không ổn định — thu nhập và chi tiêu đều có thể dao động.Hãy chuẩn bị quỹ dự phòng đủ lớn để đối phó với những bất ngờ.\n\nCó thể xuất hiện các cơ hội kiếm tiền từ những hoạt động mới và bất ngờ.Hãy cởi mở nhưng đừng đặt cược tất cả vào những cơ hội chưa được kiểm chứng.`,
        banthan: `Đây là năm bạn kết nối được với những người rất đa dạng từ nhiều lĩnh vực và văn hóa khác nhau.Mạng lưới quan hệ của bạn có thể mở rộng đáng kể trong năm 5.\n\nHãy tận dụng sự hấp dẫn tự nhiên và khả năng giao tiếp trong năm này để xây dựng những mối quan hệ có thể mở ra cơ hội trong tương lai.`,
        suckhoe: `Sức khỏe có thể bị ảnh hưởng bởi sự thay đổi quá nhiều và căng thẳng do biến động.Hãy duy trì thói quen lành mạnh cơ bản ngay cả khi mọi thứ xung quanh thay đổi.\n\nNăm 5 là thời điểm tốt để học bằng cách trải nghiệm thực tế — các chuyến đi học hỏi, thực tập hoặc làm việc trong môi trường mới sẽ rất có giá trị.`,
        tonket: `Nếu có một từ để tóm gọn năm số 5 của <strong>${safeName}</strong>, đó là: <em>thích nghi</em>. Không phải ai cũng có thể đứng vững giữa sóng gió mà không bị cuốn trôi. Nhưng bạn có thể học được cách đó. Và đó chính là hành trang quý giá nhất mà năm 5 dành tặng cho bạn.

Hãy nhìn lại những thay đổi trong năm này — cả những thứ bạn chọn và những thứ ập đến mà không báo trước. Điều gì trong số đó đã dạy cho <strong>${safeName}</strong> về sức mạnh thực sự của mình? Đó là câu trả lời bạn sẽ mang theo suốt cả phần đời còn lại.

Năm 5 có thể đã xào trộn cuộc sống của bạn. Nhưng giữa tất cả sự xao động đó, hãy tìm xem: điều gì đã tọn tại qua tất cả? Đứa con người thực sự của <strong>${safeName}</strong> — vẫn ở đó, vẫn vững vàng hơn bước vào.`,
      },
      6: {
        congviec: `Năm 6 là năm của trách nhiệm và phục vụ trong sự nghiệp.Đây là thời điểm để thể hiện vai trò lãnh đạo có tâm — không chỉ đạt kết quả mà còn chăm lo cho đồng nghiệp và cộng đồng.\n\nCác ngành nghề liên quan đến y tế, giáo dục, tư vấn và phục vụ cộng đồng sẽ đặc biệt phù hợp trong năm này.Sự toàn tâm toàn ý của bạn sẽ được ghi nhận và đền đáp.`,
        quanhe: `Đây là năm lý tưởng để đầu tư vào gia đình và các mối quan hệ thân thiết.Năng lượng số 6 đặt gia đình lên hàng đầu — hãy dành thời gian chất lượng cho những người bạn yêu thương.\n\nNếu đang tìm kiếm tình yêu, bạn thu hút những người tìm kiếm sự ổn định và chăm sóc.Mối quan hệ bắt đầu trong năm 6 thường nghiêm túc và hướng đến kết hôn.`,
        taichinhthanhoc: `Tài chính năm 6 thường ổn định nhưng có thể có những chi tiêu lớn liên quan đến gia đình — nhà cửa, chăm sóc người thân hoặc giáo dục cho con cái.\n\nHãy lập kế hoạch tài chính gia đình cẩn thận.Đây cũng là thời điểm tốt để mua bảo hiểm hoặc đầu tư cho an toàn lâu dài của gia đình.`,
        banthan: `Năm 6 khiến bạn trở thành người được tin tưởng và tìm đến trong cộng đồng.Bạn có khả năng tạo ra sự hòa hợp và chữa lành trong các nhóm xã hội.\n\nHãy tham gia các hoạt động cộng đồng và tình nguyện.Đóng góp cho xã hội trong năm này sẽ mang lại cho bạn cảm giác thỏa mãn sâu sắc.`,
        suckhoe: `Hãy chú ý không hy sinh sức khỏe bản thân vì chăm lo quá mức cho người khác — đây là nguy cơ phổ biến trong năm 6. Hãy nhớ rằng bạn cần tự chăm sóc mình trước.`,
        tonket: `Năm số 6 có một năng lượng hướng về con người rất đặc biệt — và <strong>${safeName}</strong> đang được gọi để sống trong năng lượng đó. Đây là năm để nhận ra rằng chăm sóc người khác không phải sự yếu đuối — đó là một trong những hình thức cường đại nhất mà một con người có thể biểu lộ.

Hãy nhìn lại những gì bạn đã trân trọng trong năm này. Ai đã gõ cửa tâm hồn bạn và được bạn mở? Đó là những mối quan hệ sẽ định nghĩa sự giàu có cuộc đời của <strong>${safeName}</strong> sau này.

Thành công của năm 6 là đạt được sự thấu hiểu về con người và xây dựng được niềm tin lớn của những người xung quanh. Hãy tiếp tục tiếp thêm điều đó — và nhớ tiết chế mức trách nhiệm của mình ở mức vừa đủ, không cho đi quá mức và cũng không giữ lại quá mức.`,
      },
      7: {
        congviec: `Năm 7 là năm của sự nghiên cứu, học tập và phát triển nội tâm trong sự nghiệp.Đây không phải lúc để mở rộng hay tìm kiếm thành công bên ngoài — thay vào đó, hãy đào sâu vào chuyên môn và kiến thức.\n\nHãy dành thời gian cho việc học, nghiên cứu và phát triển kỹ năng đặc biệt.Những người làm việc trong lĩnh vực học thuật, nghiên cứu hay tâm linh sẽ thấy năm này đặc biệt thuận lợi.`,
        quanhe: `Năm 7 có xu hướng hướng nội — bạn có thể thấy mình cần nhiều không gian riêng hơn.Điều này có thể gây hiểu lầm trong các mối quan hệ nếu không được giải thích rõ ràng.\n\nHãy giao tiếp thẳng thắn với người thân về nhu cầu cần không gian của mình.Các mối quan hệ bắt đầu trong năm 7 thường có chiều sâu trí tuệ và tâm linh đặc biệt.`,
        taichinhthanhoc: `Tài chính không phải ưu tiên hàng đầu trong năm 7 — đây là năm để tích lũy tri thức hơn là tiền bạc.Hãy tránh các quyết định tài chính lớn và rủi ro.\n\nCác khoản đầu tư vào giáo dục, khóa học hoặc phát triển cá nhân là sáng suốt nhất trong năm này.`,
        banthan: `Bạn có thể trở nên chọn lọc hơn trong các mối quan hệ xã hội trong năm 7. Đây là điều tự nhiên — hãy tập trung vào những cuộc trò chuyện có chiều sâu thay vì giao tiếp bề mặt.\n\nCác nhóm nghiên cứu, thảo luận hoặc học thuật sẽ phù hợp với bạn hơn trong năm này.`,
        suckhoe: `Năm 7 là thời điểm tốt nhất trong 9 năm để học và nghiên cứu chuyên sâu.Hãy tận dụng tư duy rõ ràng và khả năng tập trung cao của năm này.\n\nSức khỏe cần chú ý đến căng thẳng tâm lý do suy nghĩ quá nhiều — thiền định và các hoạt động thư giãn tâm trí là cần thiết.`,
        tonket: `Năm số 7 là năm hiếm hoi mà cuộc sống từ bên trong trở nên rớn ràng hơn thế giới bên ngoài. <strong>${safeName}</strong> có cơ hội đi vào chiều sâu của mình — không phải để lẩn trốn, mà để hiểu rõ hơn ai là mình và mình muốn đi về phía nào.

Những câu trả lời quan trọng nhất trong năm 7 không đến từ google, từ bạn bè, hay từ chuyên gia — chúng đến từ những khoảnh khắc yên tĩnh đủ lâu để bạn thực sự lắng nghe chính mình. Hãy trân trọng những khoảnh khắc đó.

Thành công của <strong>${safeName}</strong> trong năm 7 không nằm ở những gì bạn đạt được — mà nằm ở chiều sâu bạn chạm được. Những gì bạn khám phá được về bản thân sẽ trở thành la bàn dẫn đường cho cả giai đoạn quyền lực sắp tới — năm 8 và những gì theo sau.`,
      },
      8: {
        congviec: `Năm 8 là năm của thành công vật chất và quyền lực trong sự nghiệp.Đây là thời điểm để thực hiện những tham vọng lớn, đàm phán quan trọng và khẳng định vị trí lãnh đạo.\n\nNăng lượng số 8 ủng hộ việc đạt được thành tựu đáng kể — thăng tiến, tăng lương, mở rộng kinh doanh hoặc ký kết hợp đồng lớn.Hãy hành động táo bạo nhưng có tính toán.`,
        quanhe: `Trong tình yêu, bạn thu hút sự tôn trọng và ngưỡng mộ hơn là sự phụ thuộc.Hãy tìm kiếm người bạn đời có sự độc lập và tham vọng riêng của họ.\n\nNếu đang trong mối quan hệ, hãy đảm bảo sự nghiệp thành công không khiến bạn bỏ bê mối quan hệ.Hãy chia sẻ thành công với người thân thay vì chỉ tập trung vào mục tiêu cá nhân.`,
        taichinhthanhoc: `Đây là năm tốt nhất để đầu tư, kinh doanh và tăng nguồn thu nhập.Tuy nhiên, hãy tránh lòng tham quá mức — năng lượng số 8 có thể dẫn đến rủi ro tài chính nếu không được kiểm soát.\n\nHãy lên kế hoạch tài chính rõ ràng với mục tiêu cụ thể.Đầu tư có nghiên cứu kỹ lưỡng sẽ mang lại kết quả tốt trong năm này.`,
        banthan: `Năm 8 mang đến ảnh hưởng xã hội mạnh mẽ — bạn tự nhiên đứng ở vị trí trung tâm và người khác tìm kiếm sự lãnh đạo của bạn.\n\nHãy sử dụng ảnh hưởng này một cách có trách nhiệm.Xây dựng mạng lưới quan hệ nghề nghiệp và tích cực tham gia các sự kiện ngành.`,
        suckhoe: `Sức khỏe có thể bị ảnh hưởng bởi áp lực công việc cao.Hãy đặt ra giới hạn rõ ràng và không hy sinh sức khỏe cho thành công vật chất.\n\nNăm 8 là thời điểm tốt để học các kỹ năng lãnh đạo và quản lý — đầu tư vào giáo dục lãnh đạo sẽ có giá trị trong các năm tới.`,
        tonket: `Năm số 8 là năm <strong>${safeName}</strong> đứng dưới ánh đèn — và ánh đèn đó có thể rất có lợi hoặc rất khắc nghiệt, tùy vào cách bạn chuẩn bị. Hãy nhớ rằng quyền lực thực sự không phải là để kiểm soát mà là để ảnh hưởng — và sự ảnh hưởng bền lâu nhất đều đến từ giá trị, không phải từ sức mạnh.

Hãy kết năm 8 bằng câu hỏi: <em>"Mình đã dùng được bao nhiêu trong những gì mình có để giúp ích cho người khác?"</em> Câu trả lời sẽ cho bạn thấy liệu thành công năm nay có ý nghĩa thật sự hay không.

<strong>${safeName}</strong>, đừng để năm quan trọng nhất trong chu kỳ 9 năm trôi qua trong sự rụt rè. Hãy đứng thẳng, tin vào giá trị của mình, và bước ra ánh sáng mà năm số 8 đang chiếu cho bạn.`,
      },
      9: {
        congviec: `Năm 9 là năm hoàn thành chu kỳ và buông bỏ trong sự nghiệp.Đây là thời điểm để kết thúc những dự án dở dang, giải quyết các vấn đề còn tồn đọng và chuẩn bị cho chu kỳ mới.\n\nHãy đánh giá lại hướng đi sự nghiệp — điều gì đã phục vụ tốt cho bạn và điều gì cần thay đổi ? Năm 9 là cơ hội để định hình lại tầm nhìn cho chu kỳ 9 năm tiếp theo.`,
        quanhe: `Trong các mối quan hệ, năm 9 có thể mang đến sự kết thúc — một số mối quan hệ có thể kết thúc tự nhiên vì chúng đã hoàn thành vai trò của mình.Đây không nhất thiết là điều tiêu cực.\n\nHãy giải quyết những hiểu lầm lâu nay, tha thứ và được tha thứ.Năm 9 là thời điểm để chữa lành những vết thương cũ trong các mối quan hệ.`,
        taichinhthanhoc: `Tài chính trong năm 9 cần được quản lý cẩn thận — đây không phải năm tốt để bắt đầu đầu tư lớn mới.Thay vào đó, hãy giải quyết các khoản nợ còn lại và chuẩn bị nền tảng tài chính cho chu kỳ mới.\n\nHãy tổng kết lại tình hình tài chính: điều gì hiệu quả, điều gì không ? Bài học này sẽ giúp bạn quản lý tốt hơn trong 9 năm tới.`,
        banthan: `Năm 9 là lúc để buông bỏ những mối quan hệ xã hội không còn phục vụ cho sự phát triển của bạn.Điều này có thể khó khăn nhưng cần thiết cho sự phát triển tiếp theo.\n\nHãy tập trung vào việc chữa lành và tha thứ trong các mối quan hệ hiện tại.Tham gia các hoạt động nhân đạo hoặc tình nguyện sẽ mang lại ý nghĩa sâu sắc trong năm này.`,
        suckhoe: `Sức khỏe năm 9 cần sự chú ý đặc biệt đến việc giải phóng căng thẳng và chữa lành — cả về thể xác lẫn tinh thần.Đây là năm tốt để làm các liệu pháp chữa lành, nghỉ dưỡng hoặc tĩnh tâm.\n\nNăm 9 là thời điểm tốt để chia sẻ kiến thức và kinh nghiệm tích lũy — dạy người khác những gì bạn đã học được.`,
        tonket: `Năm số 9 là một trong những năm được định nghĩa bởi những gì bạn dám bỏ lại — không phải những gì bạn nắm giữ. <strong>${safeName}</strong> đang được mời buông bỏ — con người cũ, thói quen cũ, mối quan hệ cũ, kiểu tư duy cũ. Không phải vì chúng xấu, mà vì bạn đã vượt lên chúng rồi.

Buông bỏ thực sự được bắt đầu từ phía trong: tha thứ những điều bạn đã giữ lâu, bày tỏ lòng biết ơn với những gì cuộc sống đã mang lại (dù tốt hay khó), và đặt niềm tin vào những gì sắp đến dù chưa thấy hình dáng.

<strong>${safeName}</strong>, hành trình 9 năm sắp khép lại. Đừng vội. Hãy dành một khoảnh khắc để cảm ơn tất cả những năm đó — và mỗi thứ bạn buông ra hôm nay là một đôi tay trống để đón nhận điều kỳ diệu phía trước.`,
      },
    };
    return YEAR_DATA[n] || YEAR_DATA[1];
}

function yearIntro(num: number, year: number, name: string): Pick<YearDeepContent, "title" | "subtitle" | "intro"> {
    const safeName = escapeHtml(name);
    const n = num % 9 || 9;
    // The full content lives inside personalYearDeep — we duplicate only the meta fields here.
    const META: Record<number, Pick<YearDeepContent, "title" | "subtitle" | "intro">> = {
      1: {
        title: 'Khởi đầu mới &amp; Tiên phong', subtitle: 'Năm của những bước đột phá và khởi đầu',
        intro: `Năm cá nhân số 1 mở ra một chu kỳ hoàn toàn mới cho <strong>${safeName}</strong>. Đây là thời điểm vũ trụ trao cho bạn một trang giấy trắng — hãy viết lên đó những điều bạn thực sự muốn trở thành. Năng lượng năm nay mạnh mẽ, độc lập và tiên phong; mọi sự chần chừ đều có thể khiến bạn bỏ lỡ cơ hội đặc biệt.`
      },
      2: {
        title: 'Hợp tác &amp; Kiên nhẫn chiến lược', subtitle: 'Năm của các mối quan hệ và ngoại giao',
        intro: `Năm cá nhân số 2 của <strong>${safeName}</strong> là năm của sự chậm lại có chủ đích. Sau sự khởi đầu mạnh mẽ của số 1, vũ trụ mời bạn vào chế độ "trồng cây" — kiên nhẫn chăm sóc những gì đã được gieo, xây dựng liên minh và phát triển qua sự hợp tác thay vì đối đầu.`
      },
      3: {
        title: 'Sáng tạo &amp; Biểu đạt', subtitle: 'Năm của niềm vui, nghệ thuật và giao tiếp',
        intro: `Năm cá nhân số 3 mang đến cho <strong>${safeName}</strong> làn sóng năng lượng vui tươi, sáng tạo và biểu đạt. Đây là năm để tỏa sáng, kết nối và thể hiện bản thân một cách chân thực. Hãy để niềm vui dẫn đường.`
      },
      4: {
        title: 'Xây dựng &amp; Kỷ luật', subtitle: 'Năm của nền tảng và sự kiên trì',
        intro: `Năm cá nhân số 4 đặt <strong>${safeName}</strong> vào vai trò người kiến tạo. Đây không phải năm của phiêu lưu hay cảm hứng bốc đồng — mà là năm của nỗ lực bền bỉ, kế hoạch chi tiết và xây dựng nền móng cho tương lai.`
      },
      5: {
        title: 'Chuyển đổi &amp; Tự do', subtitle: 'Năm của thay đổi và trải nghiệm mới',
        intro: `Năm cá nhân số 5 mang đến cho <strong>${safeName}</strong> gió mới của sự thay đổi. Đây là năm năng động nhất trong chu kỳ, với nhiều biến động, cơ hội bất ngờ và những cuộc gặp gỡ định hình lại con người bạn.`
      },
      6: {
        title: 'Tình yêu &amp; Trách nhiệm', subtitle: 'Năm của gia đình, hôn nhân và sự hy sinh',
        intro: `Năm cá nhân số 6 được gọi là năm của tình yêu và trách nhiệm đối với <strong>${safeName}</strong>. Cuộc sống sẽ mang đến những sự kiện nhấn mạnh đến gia đình, các mối quan hệ thân thiết và nghĩa vụ với người xung quanh.`
      },
      7: {
        title: 'Chiều sâu nội tâm &amp; Tâm linh', subtitle: 'Năm của sự suy ngẫm, học hỏi và kết nối tâm linh',
        intro: `Năm cá nhân số 7 mời <strong>${safeName}</strong> chậm lại và đi vào chiều sâu. Đây không phải năm của hành động ồ ạt — mà là năm của sự tích lũy tri thức, phát triển nội tâm và kết nối với trực giác. Những gì bạn học được trong năm này sẽ trở thành nền tảng cho sự thịnh vượng của năm số 8 tiếp theo.`
      },
      8: {
        title: 'Quyền lực &amp; Thịnh vượng', subtitle: 'Năm của thu hoạch, sự nghiệp và tài chính',
        intro: `Năm cá nhân số 8 là năm thu hoạch và quyền lực của <strong>${safeName}</strong>. Đây là đỉnh cao của chu kỳ 9 năm về mặt thành tựu vật chất và ảnh hưởng xã hội. Những hạt giống bạn đã gieo trong các năm trước đang sẵn sàng cho mùa gặt — vấn đề chỉ là bạn có đủ can đảm để đến đồng ruộng không.`
      },
      9: {
        title: 'Hoàn thành &amp; Buông bỏ', subtitle: 'Năm của sự kết thúc, nhân đạo và giải phóng',
        intro: `Năm cá nhân số 9 đánh dấu sự kết thúc của một chu kỳ 9 năm trong cuộc đời <strong>${safeName}</strong>. Đây là năm của sự tổng kết, nhìn lại, và quan trọng nhất là buông bỏ những gì không còn phù hợp để chuẩn bị cho một khởi đầu hoàn toàn mới.`
      },
    };
    return META[n] || META[1];
}

export function buildPersonalYearFullBlock(
  pyNum: number,
  year: number,
  age: number,
  name: string,
  sectionIndex = 1,
): string {
  const n = pyNum % 9 || 9;
  const safeName = escapeHtml(name);
  const safeYear = escapeHtml(String(year));
  const safeAge = escapeHtml(String(age));
  const safeNameUpper = safeName.toUpperCase();

  let meta: Pick<YearDeepContent, "title" | "subtitle" | "intro"> | null = null;
  try { meta = yearIntro(n, year, name); } catch (_error) { }

  let deepData: Omit<YearDeepContent, "title" | "subtitle" | "intro"> | null = null;
  try { deepData = yearContent(n, name); } catch (_error) { }

  const intro = meta && meta.intro ? meta.intro : '';
  const title = meta && meta.title ? meta.title : '';

  const DOMAINS = [
    { key: 'congviec', altKey: null, icon: '💼', label: 'Công việc & Sự nghiệp' },
    { key: 'quanhe', altKey: null, icon: '💗', label: 'Các mối quan hệ & Tình yêu' },
    { key: 'suckhoe', altKey: null, icon: '🌿', label: 'Sức khỏe' },
    { key: 'taichinhthanhhoc', altKey: 'taichinhthanhoc', icon: '💰', label: 'Tài chính & Học tập' },
    { key: 'banthan', altKey: null, icon: '🌟', label: 'Về bản thân' },
  ] as const;

  let domainHTML = '';
  if (deepData) {
    for (const d of DOMAINS) {
      const text = deepData[d.key] || (d.altKey && deepData[d.altKey]) || '';
      if (!text) continue;
      domainHTML += `
        <div class="year-domain-block">
          <div class="domain-title">${d.icon} ${d.label}</div>
          <p class="nar">${text.replace(/\n/g, '<br>')}</p>
        </div>`;
    }
    if (deepData.tonket) {
      domainHTML += `<div class="insight-box" style="margin-top:1rem;">📌 <strong>Tóm lại:</strong> ${deepData.tonket.replace(/\n/g, '<br>')}</div>`;
    }
  }

  const sectionLabel = `8.${sectionIndex}`;

  return `
    <div class="py-year-block" id="py-year-${safeYear}">
      <h3 class="py-year-heading">
        ${sectionLabel}. NĂM ${safeYear}, ${safeNameUpper} ${safeAge} TUỔI CÓ VẬN SỐ ${n}
      </h3>
      <div class="py-year-intro">
        <span class="py-num-badge">${n}</span>
        <div>
          <div class="year-detail-block">
            <div class="year-detail-headline">
              <span class="year-detail-label">VẬN SỐ NĂM ${safeYear} CỦA BẠN LÀ: ${n}</span>
            </div>
            ${title ? `<div class="year-detail-subtitle"><em>${title}</em></div>` : ''}
            ${intro ? `<p class="nar">${intro}</p>` : ''}
          </div>
        </div>
      </div>
      ${domainHTML}
    </div>`;
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

type MonthDeepContent = {
  energy: string;
  congviec: string;
  tinhyeu: string;
  taichinh: string;
  giaotiep: string;
  hoctap: string;
  tongket: string;
};

export function personalMonthDeep(item: { number: number; year: number; month: number }, name: string): string {
    const num = item.number;
    const month = item.month;
    const year = item.year;
    const n = num % 9 || 9;
    const safeName = escapeHtml(name);
    const safeYear = escapeHtml(String(year));
    const monthNames = ['', 'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
      'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
    const label = `${monthNames[month] || 'Tháng ' + month}/${safeYear}`;

    const content: Record<number, MonthDeepContent> = {
      1: {
        energy: `Tháng cá nhân số <strong>1</strong> là tháng của <em>sự khởi đầu và tiên phong</em> cho <strong>${safeName}</strong>. Vũ trụ đang trao cho bạn một trang trắng hoàn toàn mới — năng lượng số 1 thôi thúc bạn hành động, ra quyết định và dứt khoát với những điều chưa làm được. Đây là tháng gieo hạt quan trọng cho cả chu kỳ phía trước.`,
        congviec: `Đây là thời điểm lý tưởng để <strong>${safeName}</strong> khởi động những dự án mới, đề xuất sáng kiến hoặc đảm nhận trách nhiệm lớn hơn. Năng lượng số 1 hỗ trợ mạnh cho việc tự lập và hành động độc lập — những quyết định được đưa ra trong tháng này có thể định hình cả quý tiếp theo. Đừng chờ đợi — hãy là người đầu tiên đề xuất, đầu tiên thử nghiệm và đầu tiên bước vào cơ hội mới.`,
        tinhyeu: `Trong chuyện tình cảm, <strong>${safeName}</strong> có thể cảm thấy mạnh mẽ và tự tin hơn bình thường — và đây chính là lúc tốt để bày tỏ cảm xúc hoặc chủ động làm mới mối quan hệ. Với người đang độc thân, tháng số 1 có thể mang đến cơ hội gặp gỡ bất ngờ. Với người đã có đôi, hãy dẫn đầu trong việc tạo ra những trải nghiệm mới và phá vỡ sự tẻ nhạt quen thuộc.`,
        taichinh: `Tháng số 1 thích hợp để <strong>${safeName}</strong> bắt đầu kế hoạch tài chính mới, mở tài khoản tiết kiệm có mục tiêu, hoặc đưa ra quyết định đầu tư đã suy nghĩ từ lâu. Hãy chủ động — cơ hội tài chính đến với những ai đứng dậy trước. Tuy nhiên tránh chi tiêu bốc đồng vì muốn thể hiện hay chứng tỏ bản thân.`,
        giaotiep: `Sức hút cá nhân của <strong>${safeName}</strong> rất mạnh trong tháng này. Người khác tự nhiên chú ý đến bạn và muốn nghe bạn nói — hãy tận dụng điều đó để xây dựng mạng lưới mới, tạo ấn tượng ban đầu tốt hoặc dẫn dắt nhóm. Tháng số 1 không phải thời điểm để thu mình — hãy hiện diện và để bản thân được nhìn thấy.`,
        hoctap: `<strong>${safeName}</strong> có thể cảm thấy đặc biệt hứng khởi với việc học những kỹ năng hoàn toàn mới trong tháng này. Đây là lúc tốt để đăng ký khóa học, thử phương pháp học mới, hoặc nghiên cứu lĩnh vực mà bạn muốn phát triển. Não bộ đang trong trạng thái tiếp nhận mạnh — hãy tận dụng.`,
        tongket: `Tháng số 1 tổng kết lại bằng một lời hứa với bản thân: <em>hành động sớm hơn, quyết đoán hơn và tin tưởng vào bản ngã cốt lõi của mình</em>. Nếu trong tháng này có điều gì trì hoãn — hãy xem đó là tín hiệu cần vượt qua ngay. Những gì <strong>${safeName}</strong> bắt đầu trong tháng số 1 sẽ có sức lan tỏa vào các tháng tiếp theo của năm.`
      },
      2: {
        energy: `Tháng cá nhân số <strong>2</strong> mang đến cho <strong>${safeName}</strong> năng lượng của <em>sự hợp tác, lắng nghe và kiên nhẫn chiến lược</em>. Đây không phải thời điểm của hành động ồ ạt mà là thời điểm để nuôi dưỡng các mối quan hệ, xây dựng cây cầu kết nối và chuẩn bị nền móng cho những điều lớn hơn.`,
        congviec: `Tháng số 2 thích hợp để <strong>${safeName}</strong> tập trung vào hợp tác và làm việc nhóm hơn là thi đua cá nhân. Những thỏa thuận, đàm phán và tìm kiếm đồng thuận đều được hỗ trợ trong tháng này. Hãy kiên nhẫn — quyết định được đưa ra cùng người khác sẽ bền vững hơn quyết định đơn phương. Đây cũng là lúc tốt để hoàn thiện những chi tiết nhỏ mà tháng trước chưa giải quyết.`,
        tinhyeu: `Trong tình cảm, <strong>${safeName}</strong> đang ở trong tháng được thiên nhiên ủng hộ nhất cho sự kết nối sâu sắc. Những cuộc trò chuyện thành thật, những khoảnh khắc lắng nghe thực sự và sự chia sẻ nhẹ nhàng sẽ tạo ra chiều sâu mới trong mối quan hệ. Với người độc thân, hãy chú ý đến những ai đang ở cạnh bạn nhưng chưa được nhìn thấy đúng mức.`,
        taichinh: `Hãy tránh đưa ra những quyết định tài chính lớn một mình trong tháng số 2. <strong>${safeName}</strong> sẽ lợi hơn nếu tham khảo ý kiến của người có kinh nghiệm hoặc hợp tác tài chính với người tin cậy. Đây cũng là tháng thích hợp để xem lại ngân sách, rà soát các khoản chi và chuẩn bị tài chính một cách thầm lặng và cẩn thận.`,
        giaotiep: `<strong>${safeName}</strong> tỏa ra sự ấm áp và dễ tiếp cận đặc biệt trong tháng này — người ta tự nhiên muốn chia sẻ với bạn. Hãy lắng nghe nhiều hơn nói, quan sát nhiều hơn hành động. Những thông tin quý giá và cơ hội ẩn thường đến qua những cuộc trò chuyện tưởng như bình thường khi bạn thực sự chú tâm lắng nghe.`,
        hoctap: `Tháng số 2 rất thích hợp để <strong>${safeName}</strong> học theo cặp hoặc nhóm nhỏ. Các khóa học về kỹ năng giao tiếp, tư vấn, trị liệu, ngoại ngữ hoặc bất kỳ kiến thức nào liên quan đến con người đều đặc biệt phù hợp. Hãy tìm người thầy hoặc mentor — giai đoạn này bạn học tốt nhất từ người khác chứ không phải từ sách vở một mình.`,
        tongket: `Tháng số 2 nhắc nhở <strong>${safeName}</strong> rằng <em>sức mạnh thật sự không phải là đi một mình nhanh hơn — mà là đi cùng người khác xa hơn</em>. Hãy trân trọng những liên minh bạn đang xây dựng. Bất kỳ mối quan hệ nào được vun đắp trong tháng này đều có tiềm năng phát triển lâu dài và sâu sắc.`
      },
      3: {
        energy: `Tháng cá nhân số <strong>3</strong> là <em>mùa hoa nở</em> trong hành trình của <strong>${safeName}</strong>. Năng lượng sáng tạo và biểu đạt đang ở đỉnh cao — vũ trụ không chỉ cho phép bạn thể hiện bản thân mà còn <em>yêu cầu</em> bạn làm điều đó. Niềm vui, kết nối xã hội và những ý tưởng mới liên tục xuất hiện.`,
        congviec: `<strong>${safeName}</strong> có thể tỏa sáng đặc biệt trong các cuộc họp, thuyết trình và giao tiếp với khách hàng trong tháng này. Những ý tưởng sáng tạo đang chín muồi — hãy mạnh dạn đề xuất, viết ra và chia sẻ. Các dự án liên quan đến nội dung, truyền thông, giảng dạy hay bất kỳ thứ gì cần biểu đạt đều có lợi thế lớn trong tháng số 3.`,
        tinhyeu: `Tháng này <strong>${safeName}</strong> rất hấp dẫn và thu hút — người mới có thể xuất hiện, mối quan hệ cũ có thể được làm mới bằng sự vui vẻ và tự phát. Hãy đưa người thân ra ngoài, thử trải nghiệm mới cùng nhau, tạo ra những kỷ niệm đẹp. Tuy nhiên, đừng để sự phấn khích bề mặt che lấp những cuộc trò chuyện quan trọng cần có chiều sâu.`,
        taichinh: `Tháng số 3 thường mang đến những cơ hội tài chính qua kết nối xã hội và mạng lưới quan hệ của <strong>${safeName}</strong>. Bạn có thể nhận được lời mời hợp tác, cơ hội phụ thu nhập hoặc khách hàng mới qua giới thiệu. Tuy nhiên hãy cẩn thận với chi tiêu bốc hứng — tháng số 3 dễ khiến bạn mua sắm không có kế hoạch vì đang ở trạng thái phấn khích.`,
        giaotiep: `<strong>${safeName}</strong> là tâm điểm của mọi cuộc tụ họp xã hội trong tháng này. Năng lượng giao tiếp của bạn mạnh đến mức người ta tự nhiên muốn ở quanh bạn. Đây là thời điểm lý tưởng để mở rộng mạng lưới, tham gia các sự kiện và kết nối với những người sáng tạo — một cuộc gặp gỡ tưởng như tình cờ có thể thay đổi hướng đi của bạn.`,
        hoctap: `Tháng số 3 rất thích hợp để <strong>${safeName}</strong> học những kỹ năng sáng tạo và biểu đạt. Viết lách, thiết kế, nhiếp ảnh, diễn xuất, kể chuyện — bất kỳ nghệ thuật nào giúp bạn bày tỏ nội tâm đều phát triển nhanh trong giai đoạn này. Đây cũng là lúc tốt để dạy lại những gì bạn biết — dạy người khác là cách học sâu nhất.`,
        tongket: `Tháng số 3 kết thúc với thông điệp: <em>hãy để bản thân được tỏa sáng theo cách chỉ bạn mới có thể làm được</em>. <strong>${safeName}</strong> không cần phải hoàn hảo mới bắt đầu biểu đạt — giọng nói, câu chuyện và góc nhìn độc đáo của bạn là thứ thế giới đang cần. Năng lượng vui vẻ và sáng tạo của tháng này — hãy chia sẻ nó trước khi nó qua đi.`
      },
      4: {
        energy: `Tháng cá nhân số <strong>4</strong> yêu cầu <strong>${safeName}</strong> tập trung vào <em>kỷ luật, tổ chức và xây dựng nền tảng</em>. Đây không phải tháng hào nhoáng hay bứt phá nhanh — đây là tháng làm những việc thực chất và kiên nhẫn. Những gì được xây dựng chắc chắn trong tháng này sẽ đứng vững qua những tháng biến động phía trước.`,
        congviec: `<strong>${safeName}</strong> nên tập trung hoàn thiện các dự án đang dang dở thay vì mở thêm dự án mới trong tháng số 4. Đây là lúc tốt để lập quy trình, tổ chức lại hệ thống làm việc, xây dựng thói quen nghề nghiệp và đầu tư vào việc nâng cao kỹ năng chuyên môn. Những đồng nghiệp và cấp trên sẽ chú ý đến sự cẩn thận và đáng tin cậy của bạn tháng này.`,
        tinhyeu: `Trong tháng số 4, <strong>${safeName}</strong> có xu hướng tìm kiếm sự ổn định và chắc chắn trong tình cảm hơn là những khoảnh khắc hào hứng ngắn ngủi. Đây là lúc tốt để xây dựng nền tảng vững chắc cho mối quan hệ — những cuộc trò chuyện thực chất về tương lai, về kỳ vọng và về cam kết. Đừng để sự thực dụng của số 4 giết chết sự lãng mạn hoàn toàn — người thân cần cả hai.`,
        taichinh: `Tháng số 4 là thời điểm lý tưởng nhất trong năm để <strong>${safeName}</strong> xem xét và tái cơ cấu tài chính. Lập ngân sách, cắt giảm chi tiêu không cần thiết, tăng tiết kiệm, nghiên cứu các lựa chọn đầu tư an toàn dài hạn — tất cả đều được hỗ trợ mạnh. Tránh các quyết định tài chính rủi ro cao trong tháng này.`,
        giaotiep: `<strong>${safeName}</strong> có thể không phải là người nói chuyện nhiều nhất trong phòng tháng này — và đó là điều tốt. Chất lượng giao tiếp của bạn cao hơn số lượng. Những ai thực sự lắng nghe sẽ nhận ra sự chín chắn và đáng tin cậy toát ra từ bạn. Hãy dồn năng lượng vào những mối quan hệ thực chất thay vì mở rộng xã giao bề mặt.`,
        hoctap: `Tháng số 4 thuận lợi nhất cho việc học theo kiểu <em>đào sâu có hệ thống</em>. <strong>${safeName}</strong> học tốt hơn khi có bài bản rõ ràng, tài liệu cụ thể và lộ trình được vạch ra từ trước. Các kỹ năng kỹ thuật, tài chính, lập kế hoạch hay bất kỳ chuyên môn nào đòi hỏi tính tỉ mỉ đều đặc biệt phù hợp trong giai đoạn này.`,
        tongket: `Tháng số 4 nhắc <strong>${safeName}</strong> về giá trị của sự kiên nhẫn — <em>những thứ xây bằng tay, từng viên gạch một, luôn đứng lâu hơn những thứ được dựng lên qua đêm</em>. Đừng nản lòng nếu tiến độ trông chậm chạp. Sự cố gắng âm thầm của bạn trong tháng này đang tạo ra nền móng thực sự cho những gì sắp đến.`
      },
      5: {
        energy: `Tháng cá nhân số <strong>5</strong> mang đến cho <strong>${safeName}</strong> <em>làn gió tươi mới của sự thay đổi và tự do</em>. Những bất ngờ, cơ hội mới và sự điều chỉnh là đặc trưng của tháng này — đừng chống lại chúng. Sự linh hoạt và sẵn sàng thích nghi là tài sản lớn nhất của bạn trong giai đoạn này.`,
        congviec: `Tháng số 5 có thể mang đến những thay đổi bất ngờ trong môi trường làm việc của <strong>${safeName}</strong> — nhiệm vụ mới, hướng đi mới, thậm chí cơ hội việc làm từ nơi không ngờ tới. Đừng từ chối chúng chỉ vì không nằm trong kế hoạch — một số cánh cửa tốt nhất trong sự nghiệp được mở ra trong những tháng số 5. Hãy giữ tâm thế mở và linh hoạt.`,
        tinhyeu: `Trong tình cảm, <strong>${safeName}</strong> đang ở tháng của sự hào hứng và tự phát. Những cuộc hẹn ngẫu hứng, trải nghiệm mới cùng nhau, phá bỏ thói quen cũ — tất cả đều được hoan nghênh. Với người độc thân, những cuộc gặp gỡ tình cờ trong tháng này có thể để lại ấn tượng lâu dài. Hãy mở lòng nhưng đừng quên giữ sự sáng suốt trong những quyết định quan trọng.`,
        taichinh: `Tháng số 5 có thể mang đến những cơ hội tài chính từ hướng bất ngờ cho <strong>${safeName}</strong> — nhưng cũng đi kèm với cám dỗ chi tiêu theo sự hào hứng. Hãy dựng một bộ lọc 24 giờ — bất kỳ chi tiêu lớn nào cũng nên chờ một ngày trước khi quyết định. Đồng thời giữ sẵn một khoản dự phòng nhỏ cho những cơ hội thực sự tốt có thể xuất hiện bất ngờ.`,
        giaotiep: `<strong>${safeName}</strong> sẽ gặp nhiều người mới thú vị trong tháng này — và những cuộc trò chuyện tưởng như ngắn ngủi có thể mở ra cánh cửa mới. Hãy đặt mình vào những môi trường mới, tham gia sự kiện khác với thói quen và để những cuộc gặp gỡ tình cờ diễn ra. Đừng lên kế hoạch quá chi tiết cho các hoạt động xã hội tháng này.`,
        hoctap: `Tháng số 5 không phải lúc học theo kiểu ngồi xuống và học từng chương. <strong>${safeName}</strong> học tốt nhất trong tháng này qua trải nghiệm thực tế, thử nghiệm hoặc tiếp xúc với môi trường hoàn toàn mới. Những kỹ năng liên quan đến giao tiếp đa văn hóa, ngôn ngữ và linh hoạt trong môi trường biến đổi nhanh đều phát triển mạnh.`,
        tongket: `Tháng số 5 kết thúc với câu hỏi: <em>bạn đã sống trọn vẹn tháng này chưa — hay chỉ đang đứng nhìn những điều thú vị đi qua từ phía sau kính?</em> <strong>${safeName}</strong> được vũ trụ mời gọi tham gia — không chỉ quan sát. Tự do thực sự đến từ việc dũng cảm thử những thứ chưa từng thử trước đây.`
      },
      6: {
        energy: `Tháng cá nhân số <strong>6</strong> của <strong>${safeName}</strong> đặt trọng tâm vào <em>gia đình, tình yêu và trách nhiệm sâu sắc</em>. Đây là thời điểm để chăm sóc những mối quan hệ thân thiết nhất và tạo ra sự hài hòa trong không gian sống và làm việc. Vũ trụ giao cho bạn nhiệm vụ thiêng liêng: trở thành chỗ nương tựa.`,
        congviec: `Tháng số 6 thích hợp để <strong>${safeName}</strong> cải thiện môi trường làm việc, xây dựng văn hóa nhóm tích cực và giải quyết các mâu thuẫn còn tồn đọng. Vai trò người hòa giải, người hỗ trợ và người tạo ra sự gắn kết đang được ủng hộ mạnh. Các nghề liên quan đến chăm sóc, giảng dạy hoặc thiết kế không gian sống đặc biệt thuận lợi trong tháng này.`,
        tinhyeu: `<strong>${safeName}</strong> đang trong giai đoạn vàng để đầu tư thực sự vào mối quan hệ tình cảm. Những cử chỉ nhỏ — một bữa ăn được nấu với tâm, một cuộc trò chuyện dài, sự hiện diện trọn vẹn — tạo ra ảnh hưởng sâu sắc hơn bất kỳ món quà đắt tiền nào. Đây cũng là tháng để hàn gắn những vết nứt nhỏ trong mối quan hệ trước khi chúng trở nên lớn hơn.`,
        taichinh: `Tháng số 6 có thể mang đến những chi phí liên quan đến gia đình hoặc cải thiện không gian sống — điều đó là hoàn toàn tự nhiên. <strong>${safeName}</strong> hãy lập kế hoạch ngân sách gia đình dài hạn trong tháng này, bao gồm quỹ dự phòng khẩn cấp. Tránh bỏ bê tài chính cá nhân trong khi chăm lo cho người khác.`,
        giaotiep: `<strong>${safeName}</strong> được cảm nhận như một người ấm áp, đáng tin cậy và quan tâm thực sự trong xã hội tháng này. Người ta tìm đến bạn để chia sẻ, để được lắng nghe và để cảm thấy an toàn. Hãy cho phép mình trở thành nguồn năng lượng tích cực — nhưng đồng thời học cách đặt ranh giới lành mạnh để không trở thành thùng rác cảm xúc của người khác.`,
        hoctap: `Tháng số 6 thuận lợi để <strong>${safeName}</strong> học những kỹ năng liên quan đến con người — giao tiếp phi bạo lực, tư vấn tâm lý cơ bản, thiết kế nội thất, ẩm thực, chăm sóc sức khỏe gia đình. Đây cũng là tháng học qua trải nghiệm gia đình — những gì được dạy qua tình huống thực trong cuộc sống thường có chiều sâu hơn những gì học trong sách.`,
        tongket: `Tháng số 6 nhắc <strong>${safeName}</strong> rằng <em>yêu thương thực sự không yêu cầu sự hoàn hảo — nó chỉ yêu cầu sự hiện diện</em>. Những gì bạn đã cho đi trong tháng này — dù nhỏ bé, dù không ai ghi nhận — đang tạo ra những vòng sóng tình yêu thương lan ra xa hơn bạn tưởng. Hãy nhớ: chăm sóc bản thân cũng là một hành động yêu thương.`
      },
      7: {
        energy: `Tháng cá nhân số <strong>7</strong> mời <strong>${safeName}</strong> vào <em>sự tĩnh lặng và chiều sâu nội tâm</em>. Đây không phải tháng của hành động ồn ào — vũ trụ đang yêu cầu bạn dừng lại, quan sát và lắng nghe những thông điệp tinh tế hơn. Trực giác của bạn đặc biệt nhạy bén trong tháng số 7.`,
        congviec: `Tháng số 7 không thích hợp để <strong>${safeName}</strong> ra mắt sản phẩm mới hay thực hiện những bước đột phá lớn — nhưng là lúc lý tưởng để nghiên cứu, phân tích và chuẩn bị. Hãy đào sâu vào chuyên môn, đọc những tài liệu đã để dành, nghiên cứu thị trường hoặc xem lại chiến lược tổng thể. Những quyết định chiến lược sau giai đoạn suy nghĩ kỹ lưỡng trong tháng số 7 thường rất chính xác.`,
        tinhyeu: `Trong tháng số 7, <strong>${safeName}</strong> có thể cần nhiều không gian riêng hơn bình thường — và đó là nhu cầu hoàn toàn tự nhiên, không phải dấu hiệu của sự xa cách. Hãy giải thích điều này cho người thân. Mặt khác, những cuộc trò chuyện sâu sắc về ý nghĩa cuộc sống và giá trị sẽ tạo ra sự kết nối mạnh mẽ hơn bất kỳ hoạt động xã hội nào.`,
        taichinh: `Tháng số 7 là lúc <strong>${safeName}</strong> nên nghiên cứu kỹ trước mọi quyết định tài chính quan trọng. Đừng bị thúc đẩy bởi áp lực “cơ hội sắp hết” — hãy dành thời gian phân tích, so sánh và hỏi ý kiến chuyên gia nếu cần. Đây cũng là lúc tốt để xem lại hiệu quả của các khoản đầu tư hiện tại và điều chỉnh nếu cần thiết.`,
        giaotiep: `<strong>${safeName}</strong> không cần phải là trung tâm của mọi cuộc trò chuyện trong tháng số 7. Chất lượng cao hơn số lượng — một cuộc trò chuyện có chiều sâu với một người phù hợp sẽ có giá trị hơn hàng chục cuộc xã giao bề mặt. Hãy chọn lọc người để tâm sự và không ngần ngại từ chối các sự kiện xã hội không cần thiết trong tháng này.`,
        hoctap: `Đây là một trong những tháng học tập hiệu quả nhất trong năm cho <strong>${safeName}</strong>. Tháng số 7 ủng hộ việc nghiên cứu chuyên sâu, đọc sách triết học hay tâm linh, theo đuổi một chủ đề bạn thực sự tò mò từ lâu. Thiền định, viết nhật ký và các thực hành nội tâm cũng là hình thức học tập quan trọng trong giai đoạn này.`,
        tongket: `Tháng số 7 kết thúc với lời nhắc: <em>không phải mọi câu hỏi đều cần câu trả lời ngay — và không phải mọi khoảnh khắc yên tĩnh đều cần được lấp đầy bằng hành động</em>. <strong>${safeName}</strong> đang trong quá trình tích lũy nội lực. Những gì bạn học được và cảm nhận được trong tháng 7 sẽ trở thành la bàn dẫn đường cho những tháng hành động sắp tới.`
      },
      8: {
        energy: `Tháng cá nhân số <strong>8</strong> mang đến cho <strong>${safeName}</strong> luồng năng lượng của <em>quyền lực, thịnh vượng và ảnh hưởng</em>. Đây là một trong những tháng mạnh nhất trong chu kỳ 9 tháng — những hành động đúng đắn được thực hiện trong tháng này thường mang lại kết quả vượt mong đợi.`,
        congviec: `Tháng số 8 là lúc <strong>${safeName}</strong> nên hành động quyết đoán trong sự nghiệp: đàm phán tăng lương, ký kết hợp đồng quan trọng, mở rộng kinh doanh, hoặc đảm nhận vai trò lãnh đạo. Đừng ngần ngại — vũ trụ đang ủng hộ sức mạnh và sự tự tin của bạn. Năng lực và uy tín bạn đã xây dựng từ trước giờ đang được nhìn nhận và đền bù xứng đáng.`,
        tinhyeu: `Trong tình cảm, <strong>${safeName}</strong> có thể toát ra sức hút và sự tự tin đặc biệt — điều này hấp dẫn người xung quanh. Tuy nhiên hãy chú ý không để sự bận rộn và tập trung vào sự nghiệp làm nguội lạnh mối quan hệ. Hãy đầu tư thời gian có chất lượng cho người thân — không phải thời gian thừa sau khi đã làm xong mọi việc. Bạn yêu mạnh mẽ nhất khi bạn chủ động chứ không phải khi bị nhắc nhở.`,
        taichinh: `Tháng số 8 là đỉnh cao tài chính trong năm cho <strong>${safeName}</strong>. Đây là lúc để đầu tư, mở rộng nguồn thu nhập, đàm phán các điều khoản có lợi và ra quyết định tài chính táo bạo nhưng có cơ sở. Hãy dùng sức mạnh tháng này để xây dựng nền tảng vật chất dài hạn — không chỉ hưởng thụ ngắn hạn. Những gì bạn xây dựng trong tháng số 8 sẽ phục vụ bạn trong nhiều năm tới.`,
        giaotiep: `<strong>${safeName}</strong> mang sức hút tự nhiên của người “thành công thực sự” trong tháng này. Người khác tôn trọng và muốn kết nối với bạn — không chỉ vì bạn vui vẻ hay thân thiện, mà vì họ cảm nhận được năng lực và uy quyền. Hãy dùng vị thế này để xây dựng những liên minh có giá trị — nhưng đừng để quyền lực biến thành sự cô lập.`,
        hoctap: `Tháng số 8 ủng hộ việc học những kỹ năng liên quan đến quản lý, lãnh đạo, tài chính và xây dựng ảnh hưởng. <strong>${safeName}</strong> học tốt nhất trong giai đoạn này khi được áp dụng thực tiễn ngay — lý thuyết kết hợp với thực hành. Tham dự các hội thảo kinh doanh hoặc mentoring với người thành công hơn đều mang lại nhiều giá trị.`,
        tongket: `Tháng số 8 kết thúc với câu hỏi quan trọng: <em>bạn đang dùng sức mạnh của mình để xây dựng gì — và ai sẽ được hưởng lợi từ điều đó?</em> Thịnh vượng thực sự của <strong>${safeName}</strong> không đến từ những gì bạn tích lũy cho chỉ một mình bạn — mà đến từ sức ảnh hưởng và giá trị bạn tạo ra cho người khác trong quá trình đó.`
      },
      9: {
        energy: `Tháng cá nhân số <strong>9</strong> của <strong>${safeName}</strong> mang năng lượng của <em>sự hoàn thành, buông bỏ và chuẩn bị cho chu kỳ mới</em>. Đây là tháng cuối trong vòng 9 — và giá trị của nó là ở chỗ bạn có thể kết thúc thật tốt đẹp, không phải bắt đầu thật hùng hổ.`,
        congviec: `<strong>${safeName}</strong> nên tập trung hoàn thành những gì còn dang dở và giải quyết triệt để những vấn đề tồn đọng trong công việc. Đây không phải lúc khởi động dự án lớn mới hay ký cam kết dài hạn quan trọng — những điều đó hãy chờ đến tháng số 1 tiếp theo. Tháng số 9 là lúc tổng kết, học bài học từ những gì đã qua và chuẩn bị tinh thần cho giai đoạn kế tiếp.`,
        tinhyeu: `Trong tình cảm, tháng số 9 mang đến cho <strong>${safeName}</strong> cơ hội tha thứ và hàn gắn — với người khác và với chính mình. Những mâu thuẫn cũ nếu chưa được giải quyết sẽ nổi lên rõ hơn trong tháng này. Đây là lời mời để giải quyết chúng lần cuối trước khi bước sang chu kỳ mới. Một cuộc tình không lành mạnh cũng có thể đến hồi kết một cách tự nhiên.`,
        taichinh: `Tháng số 9 không thích hợp cho những quyết định tài chính táo bạo — hãy để dành điều đó cho tháng số 1. <strong>${safeName}</strong> nên dùng tháng này để tổng kết tài chính, giải quyết các khoản nợ còn tồn đọng và đơn giản hóa các cam kết tài chính. Từ thiện và hào phóng với người khác trong tháng số 9 có giá trị đặc biệt — đây là cách tốt nhất để “đóng vòng” năng lượng tài chính.`,
        giaotiep: `<strong>${safeName}</strong> sẽ tỏa ra sự sâu sắc và lòng trắc ẩn đặc biệt trong các mối quan hệ xã hội tháng này. Người ta cảm nhận được rằng bạn đã trải qua nhiều và hiểu cuộc đời theo cách khác — điều đó tạo ra sức hút khác biệt. Đây là tháng tốt để tha thứ những ai đã làm bạn tổn thương — không phải vì họ xứng đáng được tha, mà vì bạn xứng đáng được tự do.`,
        hoctap: `Tháng số 9 thuận lợi cho việc học qua <em>phản chiếu và tổng kết</em>. <strong>${safeName}</strong> có thể viết lại những bài học lớn nhất của năm qua, đọc sách về nhân văn và triết học, hoặc tham gia các khóa học có chiều sâu tinh thần. Dạy lại những gì đã học — cho người khác hoặc qua viết lách — là cách học sâu nhất của tháng số 9.`,
        tongket: `Tháng số 9 kết thúc một chu kỳ với thông điệp đẹp nhất: <em>mọi kết thúc đều là sự chuẩn bị cho một khởi đầu ở tầng cao hơn</em>. <strong>${safeName}</strong> không cần phải cảm thấy buồn khi một chương khép lại — hãy cảm ơn tất cả những gì đã diễn ra, cả tốt lẫn khó, rồi nhẹ nhàng bước qua ngưỡng cửa. Tháng số 1 đang chờ bạn phía trước.`
      }
    };

    const c = content[n] || content[9];
    const domains: Array<{ icon: string; label: string; key: keyof MonthDeepContent }> = [
      { icon: '💼', label: 'Sự nghiệp & Công việc trong tháng này:', key: 'congviec' },
      { icon: '💕', label: 'Tình yêu & Mối quan hệ trong tháng này:', key: 'tinhyeu' },
      { icon: '💰', label: 'Tài chính trong tháng này:', key: 'taichinh' },
      { icon: '🌟', label: 'Giao tiếp xã hội trong tháng này:', key: 'giaotiep' },
      { icon: '🎓', label: 'Học tập & Phát triển bản thân trong tháng này:', key: 'hoctap' },
      { icon: '💫', label: 'Tổng kết & Thông điệp tháng này:', key: 'tongket' },
    ];
    const domainsHtml = domains.map(d => c[d.key] ? `
      <div class="year-domain-block">
        <div class="domain-title">${d.icon} ${d.label}</div>
        <p class="nar">${c[d.key]}</p>
      </div>` : '').join('');

    return `
    <div class="month-detail-block">
      <div class="month-detail-headline">CHỈ SỐ THÁNG ${label} CỦA BẠN LÀ: ${n}</div>
      <p class="nar">${c.energy}</p>
      ${domainsHtml}
    </div>`;
}
