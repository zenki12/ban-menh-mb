// V1 literal grid knowledge ported from E:/huyen hoc AI/test/numerology_core/app.js.
// Keep Vietnamese strings byte-for-byte with V1; do not paraphrase.

export type CellKnowledge = {
  one: string;
  many: (n: number) => string;
  zero: string;
};

export type GridArrow = {
  name: string;
  code: string;
  cells: [number, number, number];
  active: string;
  missing: string;
};

export const CELL_KNOWLEDGE: Record<number, CellKnowledge> = {
  1: {
    one: `<p class="nar"><strong>Số 1 lẻ loi trong biểu đồ</strong> — Đây là số của ý chí cá nhân và sự độc lập. Sự hiện diện của một số 1 đơn lẻ mang đến tinh thần tiên phong, khả năng tự lực và xu hướng hành động độc lập. Đây là nền tảng của tính tự chủ, nhưng cũng cần có sự kết nối với người khác để phát huy hết tiềm năng.</p>`,
    many: (n) => `<p class="nar"><strong>${n} số 1 trong biểu đồ</strong> — Sự tập trung cao độ của năng lượng số 1 tạo ra một cá nhân có <strong>bản ngã cực kỳ mạnh mẽ</strong>, ý chí thép và tinh thần không chịu khuất phục. Tuy nhiên, khi năng lượng này vượt ngưỡng, bạn có thể trở nên cứng đầu, khó lắng nghe và thiếu linh hoạt trong các mối quan hệ. Hãy dùng ý chí này để xây dựng, không phải để kiểm soát.</p>`,
    zero: `<p class="nar"><strong>Thiếu số 1 trong biểu đồ ngày sinh</strong> — Số 1 vắng mặt có thể dẫn đến thiếu tự tin vào bản thân, khó đưa ra quyết định cá nhân và xu hướng phụ thuộc vào ý kiến người khác. Bài học là phát triển <em>sự tự tin và tính độc lập</em> — hãy chủ động hơn trong các quyết định của cuộc đời mình.</p>`
  },
  2: {
    one: `<p class="nar"><strong>Số 2 trong biểu đồ</strong> — Sự hiện diện của số 2 mang đến khả năng <strong>cảm nhận tế nhị và kết nối cảm xúc</strong>. Bạn có thiên phú trong việc lắng nghe, đồng cảm và xây dựng các mối quan hệ sâu sắc. Trực giác của bạn thường chính xác hơn bạn nghĩ — hãy tin vào tiếng thì thầm bên trong.</p>`,
    many: (n) => `<p class="nar"><strong>${n} số 2 trong biểu đồ</strong> — Sự nhân lên của số 2 tạo ra <strong>độ nhạy cảm cực kỳ cao</strong>. Bạn có thể bị ảnh hưởng nặng nề bởi cảm xúc của người xung quanh, dễ bị tổn thương và đôi khi không phân biệt được cảm xúc của mình và của người khác. Đây là siêu năng lực nếu được kiểm soát tốt, nhưng là điểm yếu nếu không học cách đặt ranh giới.</p>`,
    zero: `<p class="nar"><strong>Thiếu số 2 trong biểu đồ ngày sinh</strong> — Sự vắng mặt của số 2 có thể khiến bạn gặp khó khăn trong việc đồng cảm và thấu hiểu cảm xúc người khác. Bài học là <em>học cách lắng nghe — không chỉ bằng tai mà bằng cả trái tim</em>.</p>`
  },
  3: {
    one: `<p class="nar"><strong>Số 3 trong biểu đồ</strong> — Được ví như "cái móc neo trị chất trí nhớ", số 3 duy nhất trong biểu đồ giúp bạn có <strong>trí nhớ rất tốt và bền lâu</strong>, miễn là nó được sử dụng thường xuyên. Số 3 cũng mang đến sự linh hoạt tư duy và khả năng học hỏi nhanh. Bạn rất có lợi thế trong việc học tập và tiếp thu kiến thức mới.</p>`,
    many: (n) => `<p class="nar"><strong>${n} số 3 trong biểu đồ</strong> — Trí tuệ và óc sáng tạo dồi dào là điểm nổi bật. Sự nhân bội của số 3 tạo ra một <strong>tâm trí cực kỳ hoạt động</strong>, liên tục xử lý thông tin, tạo ý tưởng và nhìn ra những kết nối mà người khác bỏ qua. Tuy nhiên, bạn cũng cần cẩn thận với xu hướng suy nghĩ quá mức và lo lắng không cần thiết.</p>`,
    zero: `<p class="nar"><strong>Thiếu số 3 trong biểu đồ ngày sinh</strong> — Sự vắng mặt của số 3 có thể làm bạn gặp khó khăn trong việc biểu đạt bản thân, đặc biệt là trong các tình huống cần diễn đạt rõ ràng. Bài học là <em>phát triển khả năng giao tiếp và luyện tập biểu đạt cảm xúc</em> thông qua viết lách, nghệ thuật hoặc âm nhạc.</p>`
  },
  4: {
    one: `<p class="nar"><strong>Số 4 trong biểu đồ</strong> — Số 4 mang đến <strong>sự thực dụng, kiên định và ý thức tổ chức</strong>. Bạn biết cách xây dựng nền tảng vững chắc cho mọi công việc và thường là người đáng tin cậy nhất trong nhóm. Khả năng làm việc kiên trì và có phương pháp là tài sản lớn của bạn.</p>`,
    many: (n) => `<p class="nar"><strong>${n} số 4 trong biểu đồ</strong> — Sự tập trung của số 4 tạo ra một <strong>con người cực kỳ thực tế, trọng bằng chứng và không ngừng làm việc</strong>. Bạn có thể bị xem là cứng nhắc hoặc quá khắt khe với tiêu chuẩn của mình, nhưng chính sự kỷ luật này là điều tạo nên sự tín nhiệm và thành công lâu dài.</p>`,
    zero: `<p class="nar"><strong>Thiếu số 4 trong biểu đồ ngày sinh</strong> — Bạn có thể thiếu tính thực dụng và gặp khó khăn trong việc hoàn thành những việc đòi hỏi kiên nhẫn dài hơi. Bài học là <em>học cách xây dựng kỷ luật cá nhân và hoàn thành những gì đã bắt đầu</em>.</p>`
  },
  5: {
    one: `<p class="nar"><strong>Số 5 trong biểu đồ</strong> — Con số trung tâm của biểu đồ Pythagoras, số 5 là "trái tim" kết nối tất cả. Sự hiện diện của số 5 mang đến <strong>sự linh hoạt, khả năng thích nghi và ý thức tự do</strong>. Bạn biết cách điều hướng trong các hoàn cảnh thay đổi và thường tìm được con đường cân bằng giữa các thái cực.</p>`,
    many: (n) => `<p class="nar"><strong>${n} số 5 trong biểu đồ</strong> — Sự hiện diện mạnh mẽ của số 5 trung tâm tạo ra <strong>năng lượng tự do cực kỳ mạnh mẽ</strong>. Bạn có thể kháng cự mạnh mẽ với bất kỳ hình thức kiểm soát hay giới hạn nào. Sức hút cá nhân và khả năng thuyết phục của bạn rất cao, nhưng hãy cẩn thận với xu hướng bốc đồng và thiếu kiên định.</p>`,
    zero: `<p class="nar"><strong>Thiếu số 5 trong biểu đồ ngày sinh</strong> — Sự thiếu vắng của "trái tim biểu đồ" có thể dẫn đến khó khăn trong việc quyết định và thiếu sự linh hoạt khi đối mặt với thay đổi. Bài học là <em>học cách đón nhận sự thay đổi như một người bạn đồng hành, không phải kẻ thù</em>.</p>`
  },
  6: {
    one: `<p class="nar"><strong>Số 6 trong biểu đồ</strong> — Là một con số tượng trưng cho <strong>tình yêu thương, sự sáng tạo và trách nhiệm gia đình</strong>. Người có số 6 trong biểu đồ rất tập trung và có trách nhiệm với những người thân yêu. Sức sáng tạo dành cho các đề tài về gia đình, tổ ấm và cái đẹp là nổi trội của bạn.</p>`,
    many: (n) => `<p class="nar"><strong>${n} số 6 trong biểu đồ</strong> — Sự tập trung cao của số 6 tạo ra một tâm hồn <strong>cực kỳ yêu thương và sẵn sàng hy sinh cho gia đình</strong>. Tuy nhiên, điều này cũng có thể dẫn đến việc ôm đồm trách nhiệm hay can thiệp quá mức vào cuộc sống người thân. Khi trưởng thành hơn, bạn sẽ khám phá ra rằng sức mạnh sáng tạo của mình có thể lan tỏa ra nhiều lĩnh vực hơn.</p>`,
    zero: `<p class="nar"><strong>Thiếu số 6 trong biểu đồ ngày sinh</strong> — Bạn có thể gặp khó khăn trong việc duy trì các cam kết lâu dài hoặc đặt ưu tiên cho các mối quan hệ. Bài học là <em>học cách nuôi dưỡng các mối quan hệ với sự kiên nhẫn và nhất quán</em>.</p>`
  },
  7: {
    one: `<p class="nar"><strong>Số 7 trong biểu đồ</strong> — Số của <strong>triết học, tâm linh và sự học hỏi qua trải nghiệm thực tiễn</strong>. Người có số 7 thường học tốt nhất qua việc tự mình làm và trải qua. Họ có chiều sâu nội tâm hiếm có và thường tìm kiếm ý nghĩa đằng sau những điều hiển nhiên.</p>`,
    many: (n) => `<p class="nar"><strong>${n} số 7 trong biểu đồ</strong> — Sự nhân bội của số 7 tạo ra một <strong>tâm trí hướng nội sâu sắc, thực dụng và kiên định</strong>. Bạn tin vào những gì mình đã tự trải qua hơn bất kỳ lý thuyết nào. Tuy nhiên, xu hướng cô lập và khó tin tưởng có thể là thách thức lớn trong các mối quan hệ.</p>`,
    zero: `<p class="nar"><strong>Thiếu số 7 trong biểu đồ ngày sinh</strong> — Bạn có thể thiếu sự kiên nhẫn trong học hỏi qua trải nghiệm và dễ bỏ cuộc khi gặp khó khăn. Bài học là <em>tin vào quá trình — mỗi thất bại là một bước tiến đến thành công nếu bạn đủ kiên nhẫn để rút ra bài học</em>.</p>`
  },
  8: {
    one: `<p class="nar"><strong>Số 8 trong biểu đồ</strong> — Số 8 mang đến <strong>độ nhạy bén về vật chất, khả năng tổ chức và khát vọng thành tựu</strong>. Bạn hiểu rõ giá trị của sự bền vững và có khả năng quản lý nguồn lực hiệu quả. Con đường dẫn đến sự thịnh vượng vật chất thường gắn liền với số 8.</p>`,
    many: (n) => `<p class="nar"><strong>${n} số 8 trong biểu đồ</strong> — Sự tập trung của số 8 tạo ra <strong>tham vọng mạnh mẽ về thành công vật chất và địa vị xã hội</strong>. Bạn có thể cực kỳ tập trung vào mục tiêu đến mức bỏ qua các khía cạnh khác của cuộc sống. Sự cân bằng giữa vật chất và tinh thần là chìa khóa để năng lượng số 8 phát huy tốt nhất.</p>`,
    zero: `<p class="nar"><strong>Thiếu số 8 trong biểu đồ ngày sinh</strong> — Bạn có thể thiếu sự kết nối với thế giới vật chất hoặc gặp khó khăn trong việc hiện thực hóa các mục tiêu tài chính. Bài học là <em>học cách trân trọng và quản lý các nguồn lực vật chất một cách có ý thức và có trách nhiệm</em>.</p>`
  },
  9: {
    one: `<p class="nar"><strong>Số 9 trong biểu đồ</strong> — Số của <strong>lý tưởng, nhân đạo và tầm nhìn rộng lớn</strong>. Bạn có xu hướng suy nghĩ và cảm nhận ở quy mô lớn hơn — không chỉ cho bản thân mà cho tập thể và cộng đồng. Sự hiện diện của số 9 trong biểu đồ thường đi kèm với tâm hồn nghệ sĩ và ý thức xã hội cao.</p>`,
    many: (n) => `<p class="nar"><strong>${n} số 9 trong biểu đồ</strong> — Sức mạnh của lý tưởng và khát vọng nhân đạo ở mức cực cao. ${n >= 3 ? `<strong>Ba hay nhiều số 9</strong> trong biểu đồ tạo ra sự khuếch đại lý tưởng đến mức có thể dẫn đến thất vọng sâu sắc khi thực tế không đáp ứng được những kỳ vọng cao cả đó. Năng lượng cảm xúc rất dữ dội — bạn cần học cách <em>cân bằng giữa lý tưởng và hiện thực</em>, giữa việc muốn thay đổi thế giới và chấp nhận giới hạn của con người.` : `Lý tưởng mạnh mẽ của bạn là nguồn cảm hứng cho người xung quanh, nhưng hãy chú ý đến việc không ôm đồm quá nhiều trách nhiệm cùng một lúc.`}</p>`,
    zero: `<p class="nar"><strong>Thiếu số 9 trong biểu đồ ngày sinh</strong> — Sự vắng mặt của số 9 có thể khiến bạn chỉ tập trung vào những mục tiêu cụ thể và hữu hình mà bỏ qua bức tranh lớn hơn. Bài học là <em>học cách mở rộng tầm nhìn và kết nối hành động cá nhân với tác động đến cộng đồng</em>.</p>`
  }
};

export const ARROWS: GridArrow[] = [
  {
    name: 'Trục Quyết Tâm', code: '1-5-9', cells: [1, 5, 9],
    active: `<div class="arrow-block active-arrow">
      <div class="arrow-title arrow-has">✅ Trục Quyết Tâm (1-5-9) — Mũi tên Chủ Động Hành Động</div>
      <p class="nar">Trục này cho thấy bạn có <strong>sự quyết tâm cao và có xu hướng hành động ngay khi muốn thực hiện một việc hoặc kế hoạch nào đó</strong> mà không trì hoãn. Bạn thường muốn làm đến cùng những công việc mà bạn tin tưởng và những điều mà bạn cho là đúng. Đây là một trong những mũi tên mạnh mẽ nhất — người sở hữu trục này hiếm khi nói suông mà không làm.</p>
      <p class="nar">Trong công việc và cuộc sống, bạn là người tạo ra động lực cho cả nhóm. Khi bạn đã quyết định điều gì, không có nhiều thứ có thể ngăn bạn lại. Hãy dùng sức mạnh này để hướng đến những mục tiêu xứng đáng với con người bạn.</p>
    </div>`,
    missing: `<div class="arrow-block missing-arrow">
      <div class="arrow-title arrow-no">⚠️ Thiếu Trục Quyết Tâm (1-5-9) — Dễ Bỏ Cuộc Giữa Chừng</div>
      <p class="nar">Sự vắng mặt của trục 1-5-9 cho thấy bạn có thể gặp khó khăn trong việc duy trì quyết tâm và hoàn thành những kế hoạch đã đề ra. Bạn dễ bị phân tâm hoặc mất động lực khi gặp trở ngại, và đôi khi cảm thấy thiếu hướng đi rõ ràng trong cuộc sống.</p>
      <p class="nar"><strong>Lời khuyên:</strong> Hãy xây dựng thói quen đặt mục tiêu nhỏ hàng ngày. Mỗi lần hoàn thành một việc nhỏ sẽ củng cố "cơ bắp quyết tâm" của bạn. Tìm một người cố vấn hoặc người bạn đồng hành có thể giúp bạn giữ cam kết.</p>
    </div>`
  },
  {
    name: 'Trục Cân Bằng Tinh Thần', code: '2-5-8', cells: [2, 5, 8],
    active: `<div class="arrow-block active-arrow">
      <div class="arrow-title arrow-has">✅ Trục Cân Bằng Tinh Thần (2-5-8) — Mũi tên Cảm Xúc</div>
      <p class="nar">Trục này đại diện cho <strong>những gì liên quan đến trái tim của con người</strong> — phụ trách toàn bộ cảm giác, bao gồm trực giác, tình yêu thương, sự tự do, các cảm xúc tích cực, biểu đạt nghệ thuật, sự độc lập về tinh thần, và trí tuệ/thông thái.</p>
      <p class="nar">Người sở hữu trục 2-5-8 thường có <strong>khả năng trực giác rất mạnh</strong> và biết cách điều hướng năng lượng cảm xúc của bản thân. Họ thường rất nhạy bén với cảm xúc của người xung quanh và có khả năng chữa lành thông qua kết nối chân thật.</p>
    </div>`,
    missing: `<div class="arrow-block missing-arrow">
      <div class="arrow-title arrow-no">⚠️ Thiếu Trục Cân Bằng Tinh Thần (2-5-8) — Cần Phát Triển Trí Tuệ Cảm Xúc</div>
      <p class="nar">Sự thiếu vắng của trục 2-5-8 có thể khiến bạn gặp khó khăn trong việc kết nối với cảm xúc của mình và người khác. Bạn có thể đôi khi cảm thấy bị cô lập về mặt cảm xúc, hoặc không biết cách phản ứng phù hợp trong các tình huống đòi hỏi sự đồng cảm sâu sắc.</p>
      <p class="nar"><strong>Lời khuyên:</strong> Luyện tập chánh niệm và viết nhật ký cảm xúc. Cho phép bản thân cảm nhận, không chỉ phân tích. Các hoạt động nghệ thuật như âm nhạc, vẽ tranh hay khiêu vũ có thể giúp bạn kết nối với trí tuệ cảm xúc của mình.</p>
    </div>`
  },
  {
    name: 'Trục Hoài Nghi', code: '3-5-7', cells: [3, 5, 7],
    active: `<div class="arrow-block active-arrow">
      <div class="arrow-title arrow-has">✅ Trục Hoài Nghi (3-5-7) — Mũi tên Tư Duy Phản Biện</div>
      <p class="nar">Trục 3-5-7 mang đến <strong>tư duy phân tích sắc bén và khả năng nhìn thấy những gì người khác bỏ qua</strong>. Bạn không dễ bị lừa dối và thường đặt câu hỏi trước khi tin vào bất cứ điều gì. Đây là mũi tên của những nhà khoa học, nhà điều tra và những người theo đuổi sự thật.</p>
      <p class="nar">Khả năng hoài nghi lành mạnh này là một tài sản quý trong thế giới hiện đại, khi thông tin giả và thao túng tâm lý tràn lan. Hãy dùng nó để bảo vệ bản thân và những người bạn yêu thương.</p>
    </div>`,
    missing: `<div class="arrow-block missing-arrow">
      <div class="arrow-title arrow-no">⚠️ Thiếu Trục Hoài Nghi (3-5-7) — Cần Phát Triển Tư Duy Phản Biện</div>
      <p class="nar">Sự vắng mặt của trục 3-5-7 có thể khiến bạn đôi khi quá tin vào người khác hoặc chấp nhận thông tin mà không kiểm chứng kỹ lưỡng. Bạn có thể dễ bị ảnh hưởng bởi ý kiến của số đông hoặc những người có địa vị.</p>
      <p class="nar"><strong>Lời khuyên:</strong> Hãy tập thói quen đặt câu hỏi "Tại sao?" và "Nguồn gốc thông tin này từ đâu?" trước khi đưa ra quyết định quan trọng.</p>
    </div>`
  },
  {
    name: 'Trục Lập Kế Hoạch', code: '1-2-3', cells: [1, 2, 3],
    active: `<div class="arrow-block active-arrow">
      <div class="arrow-title arrow-has">✅ Trục Lập Kế Hoạch (1-2-3) — Mũi tên Trí Tuệ</div>
      <p class="nar">Trục này cho thấy bạn là <strong>người có khả năng lập kế hoạch tốt và thường làm việc theo kế hoạch vạch ra</strong>. Bạn làm việc gì thường cũng có những bước định sẵn trong đầu rõ ràng. Trí nhớ tốt, tư duy logic và khả năng tổ chức thông tin là những điểm mạnh của bạn.</p>
      <p class="nar">Những người có trục 1-2-3 thường giỏi trong các lĩnh vực đòi hỏi sự tỉ mỉ, hệ thống hóa và khả năng nhìn xa trông rộng.</p>
    </div>`,
    missing: `<div class="arrow-block missing-arrow">
      <div class="arrow-title arrow-no">⚠️ Thiếu Trục Lập Kế Hoạch (1-2-3) — Cần Phát Triển Tư Duy Có Hệ Thống</div>
      <p class="nar">Sự thiếu vắng của trục này có thể khiến bạn có xu hướng hành động theo cảm tính hơn là kế hoạch. Bạn có thể giỏi bắt đầu nhưng gặp khó khăn trong việc theo dõi tiến độ và điều chỉnh khi cần thiết.</p>
      <p class="nar"><strong>Lời khuyên:</strong> Hãy bắt đầu sử dụng công cụ quản lý công việc đơn giản. Chia nhỏ mục tiêu lớn thành các bước có thể thực hiện ngay hôm nay — điều này sẽ thay đổi hoàn toàn hiệu suất của bạn.</p>
    </div>`
  },
  {
    name: 'Trục Ý Chí', code: '4-5-6', cells: [4, 5, 6],
    active: `<div class="arrow-block active-arrow">
      <div class="arrow-title arrow-has">✅ Trục Ý Chí (4-5-6) — Mũi tên Bền Vững</div>
      <p class="nar">Trục 4-5-6 mang đến <strong>sự kiên trì, bền bỉ và ý chí vượt qua nghịch cảnh</strong>. Bạn không bỏ cuộc dễ dàng và có khả năng duy trì nỗ lực trong thời gian dài để đạt được mục tiêu. Đây là mũi tên của những người xây dựng nên những thứ bền vững theo thời gian.</p>
    </div>`,
    missing: `<div class="arrow-block missing-arrow">
      <div class="arrow-title arrow-no">⚠️ Thiếu Trục Ý Chí (4-5-6) — Cần Phát Triển Sự Kiên Trì</div>
      <p class="nar">Sự vắng mặt của trục 4-5-6 có thể khiến bạn gặp khó khăn trong việc duy trì nỗ lực ổn định theo thời gian. Bạn có thể rất nhiệt tình lúc đầu nhưng mất động lực khi kết quả đến chậm hơn mong đợi.</p>
      <p class="nar"><strong>Lời khuyên:</strong> Hãy tạo ra những "phần thưởng nhỏ" trên hành trình dài để duy trì động lực. Và hãy nhớ — hầu hết thành công lớn đều đến từ sự kiên trì bình thường chứ không phải từ tài năng thiên bẩm đặc biệt.</p>
    </div>`
  },
  {
    name: 'Trục Hành Động', code: '7-8-9', cells: [7, 8, 9],
    active: `<div class="arrow-block active-arrow">
      <div class="arrow-title arrow-has">✅ Trục Hành Động (7-8-9) — Mũi tên Thực Tiễn</div>
      <p class="nar">Trục 7-8-9 là mũi tên của những <strong>người hành động thực tiễn và có khả năng hiện thực hóa ý tưởng thành kết quả cụ thể</strong>. Bạn tin vào những gì có thể làm ra được, đo lường được và chứng minh được. Sự kết hợp giữa học từ kinh nghiệm (7), quản lý nguồn lực (8) và tầm nhìn rộng (9) tạo nên một con người vô cùng hiệu quả.</p>
    </div>`,
    missing: `<div class="arrow-block missing-arrow">
      <div class="arrow-title arrow-no">⚠️ Thiếu Trục Hành Động (7-8-9) — Cần Chuyển Tư Duy Thành Hành Động</div>
      <p class="nar">Sự thiếu vắng của trục 7-8-9 có thể khiến bạn có nhiều ý tưởng nhưng gặp khó khăn trong việc biến chúng thành kết quả cụ thể. Bạn có thể thiên về lý thuyết hơn thực hành, hoặc đôi khi thiếu niềm tin vào khả năng thực thi của mình.</p>
      <p class="nar"><strong>Lời khuyên:</strong> Hãy tập thói quen "làm trước, hoàn thiện sau". Đừng chờ điều kiện hoàn hảo mới hành động — hãy bắt đầu ngay với những gì bạn đang có.</p>
    </div>`
  },
  {
    name: 'Trục Thể Chất', code: '1-4-7', cells: [1, 4, 7],
    active: `<div class="arrow-block active-arrow">
      <div class="arrow-title arrow-has">✅ Trục Thể Chất (1-4-7) — Mũi tên Nền Tảng Vật Lý</div>
      <p class="nar">Trục 1-4-7 cho thấy bạn có <strong>mối kết nối mạnh mẽ với thế giới vật chất và thể chất</strong>. Bạn có xu hướng học qua trải nghiệm thực tiễn và có sức chịu đựng thể chất cao. Sự kỷ luật, thực dụng và học từ kinh nghiệm là những phẩm chất nổi bật của bạn.</p>
    </div>`,
    missing: `<div class="arrow-block missing-arrow">
      <div class="arrow-title arrow-no">⚠️ Thiếu Trục Thể Chất (1-4-7) — Cần Chăm Sóc Nền Tảng Vật Lý</div>
      <p class="nar">Sự vắng mặt của trục 1-4-7 có thể khiến bạn thiếu sự kết nối với cơ thể và thế giới vật chất. Bạn có thể dễ bỏ qua các nhu cầu thể chất cơ bản và gặp khó khăn trong việc ổn định các vấn đề tài chính và sức khỏe.</p>
      <p class="nar"><strong>Lời khuyên:</strong> Hãy xây dựng thói quen chăm sóc sức khỏe thể chất — tập thể dục đều đặn, ngủ đủ giấc và ăn uống lành mạnh. Sức khỏe thể chất là nền tảng cho mọi thành tựu khác.</p>
    </div>`
  },
  {
    name: 'Trục Tâm Thần', code: '3-6-9', cells: [3, 6, 9],
    active: `<div class="arrow-block active-arrow">
      <div class="arrow-title arrow-has">✅ Trục Tâm Thần (3-6-9) — Mũi tên Lý Tưởng & Sáng Tạo</div>
      <p class="nar">Trục 3-6-9 mang đến <strong>sự kết hợp hiếm có giữa trí tuệ, tình yêu thương và tầm nhìn lý tưởng</strong>. Bạn có khả năng sáng tạo cao, tầm nhìn nhân đạo và khả năng truyền cảm hứng cho người khác. Đây là mũi tên của các nghệ sĩ, nhà tư tưởng và những người dẫn dắt văn hóa.</p>
    </div>`,
    missing: `<div class="arrow-block missing-arrow">
      <div class="arrow-title arrow-no">⚠️ Thiếu Trục Tâm Thần (3-6-9) — Cần Nuôi Dưỡng Trí Tưởng Tượng</div>
      <p class="nar">Sự vắng mặt của trục 3-6-9 có thể khiến bạn có xu hướng quá thực dụng và đôi khi khó nhìn thấy những khả năng rộng lớn hơn trong cuộc sống. Bạn có thể thiếu kết nối với sự sáng tạo và tầm nhìn dài hạn.</p>
      <p class="nar"><strong>Lời khuyên:</strong> Hãy dành thời gian mỗi tuần cho những hoạt động sáng tạo thuần túy. Đọc sách, khám phá nghệ thuật, và kết nối với những người có tầm nhìn khác biệt sẽ giúp bạn mở rộng thế giới quan.</p>
    </div>`
  }
];
