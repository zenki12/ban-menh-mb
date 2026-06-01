import { escapeHtml } from "./common";

export type DestinySubSection = { label: string; body: string };
export type DestinyExtraEntry = {
  yNghiaHeader: string;
  yNghiaBody: string;
  subSections: DestinySubSection[];
  tomLai: string;
};

const p = (text: string) => `<p class="nar">${text}</p>`;

export const DESTINY_EXTRA: Record<number, DestinyExtraEntry> = {
  1: {
    yNghiaHeader: "SỨ MỆNH SỐ 1 CÓ Ý NGHĨA GÌ?",
    yNghiaBody: [
      p(`Sứ mệnh số 1 đưa <strong>{{name}}</strong> vào con đường của người khai mở. Bạn không đến để đứng trong hàng ngũ quá lâu, mà đến để nhìn thấy hướng đi mới, gọi tên khả năng mới và dám bước trước khi mọi thứ được chứng minh hoàn toàn. Trong những thời điểm người khác còn lưỡng lự, bạn thường là người khởi động nhịp đầu tiên.`),
      p(`Năng lượng này trao cho bạn ý chí cá nhân mạnh, tư duy độc lập và khả năng thu hút người khác bằng sự quyết đoán. Khi sống đúng sứ mệnh, bạn không chỉ làm cho bản thân nổi bật; bạn còn giúp người xung quanh tin rằng họ cũng có thể bắt đầu lại, đứng dậy và tạo ra điều chưa từng có trong đời họ.`),
      p(`Mặt khó của sứ mệnh số 1 nằm ở cái tôi. Nếu không được rèn giũa, sự tự tin có thể chuyển thành áp đặt, sự độc lập có thể trở thành cô lập, và khả năng lãnh đạo có thể bị hiểu như nhu cầu kiểm soát. Bạn cần học cách dẫn đường mà không phủ bóng lên người khác.`),
      p(`Công việc phù hợp với <strong>{{name}}</strong> là nơi bạn được tự chủ, được đề xuất, được tạo mô hình mới hoặc chịu trách nhiệm cho một hướng đi rõ ràng. Nếu bị đặt trong môi trường quá chật, quá nhiều xin phép và quá ít quyền quyết định, năng lượng số 1 sẽ nhanh chóng khô cạn.`),
      p(`Sứ mệnh này yêu cầu bạn hạ cái tôi xuống đúng lúc, không phải để yếu đi, mà để sức mạnh trở nên sắc bén hơn. Người lãnh đạo thật sự không chỉ đi đầu; họ còn biết nhìn lại phía sau để bảo đảm người khác có thể đi cùng.`),
    ].join("\n"),
    subSections: [
      {
        label: "KHẢ NĂNG LÃNH ĐẠO BẨM SINH",
        body: [
          p(`<strong>{{name}}</strong> có bản năng nhận trách nhiệm và nhìn ra điểm cần hành động. Bạn thường không cần ai chỉ định mới bắt đầu dẫn dắt; trong một tập thể rối, bạn tự nhiên nhìn thấy thứ tự, ưu tiên và bước đầu tiên cần làm.`),
          p(`Năng lực này phát huy tốt nhất khi đi cùng sự lắng nghe. Nếu bạn chỉ tiến lên theo ý mình, người khác có thể nể phục nhưng khó gắn bó. Khi biết hỏi, biết trao quyền và biết ghi nhận, bạn trở thành người mở đường đáng tin cậy.`),
        ].join("\n"),
      },
      {
        label: "TIÊN PHONG & ĐỘC LẬP",
        body: [
          p(`Số 1 không phù hợp với đời sống chỉ lặp lại điều đã có. Bạn cần một vùng đất để thử, một mục tiêu để chinh phục và một tiêu chuẩn do chính mình đặt ra. Tự do hành động là điều kiện quan trọng để bạn phát triển.`),
          p(`Tuy vậy, độc lập không có nghĩa là từ chối mọi sự hỗ trợ. Sứ mệnh của bạn lớn hơn khi biết dùng trí tuệ tập thể, biến đồng minh thành sức bật và để người khác góp phần làm ý tưởng của bạn đứng vững hơn.`),
        ].join("\n"),
      },
      {
        label: "CÁI TÔI MẠNH",
        body: [
          p(`Cái tôi là thanh kiếm của số 1: dùng đúng thì mở đường, dùng sai thì tạo khoảng cách. <strong>{{name}}</strong> cần phân biệt giữa lòng tự trọng và sự cố chấp, giữa quyết đoán và không chịu nghe ai.`),
          p(`Bài học quan trọng là biết nhận lỗi nhanh, sửa hướng nhanh và không xem phản hồi như sự tấn công. Khi cái tôi phục vụ sứ mệnh thay vì điều khiển sứ mệnh, bạn sẽ có uy lực rất lớn.`),
        ].join("\n"),
      },
    ],
    tomLai: `<strong>{{name}}</strong> đến với sứ mệnh số 1 để khai mở, dẫn đầu và đánh thức tinh thần chủ động trong chính mình cũng như trong người khác. Mỗi lần bạn dám bắt đầu, dám chịu trách nhiệm và dám đi qua nỗi sợ bị đánh giá, sứ mệnh số 1 đang được thực thi ở trình độ cao nhất.`,
  },
  2: {
    yNghiaHeader: "SỨ MỆNH SỐ 2 CÓ Ý NGHĨA GÌ?",
    yNghiaBody: [
      p(`Sứ mệnh số 2 trao cho <strong>{{name}}</strong> vai trò của người kết nối, điều hòa và làm mềm những va chạm trong đời sống. Bạn không nhất thiết phải đứng giữa sân khấu, nhưng sự hiện diện của bạn có thể khiến một căn phòng bớt căng, một cuộc đối thoại bớt sắc, một mối quan hệ có cơ hội được nối lại.`),
      p(`Điểm mạnh của số 2 là sự khéo léo, nhẫn nại, tinh tế và khả năng nhìn thấy nhu cầu ẩn sau lời nói. Bạn nhận ra chi tiết mà người khác bỏ qua, cảm được nhịp của tập thể và hiểu khi nào cần tiến, khi nào cần chờ. Đó là năng lực ngoại giao rất quý.`),
      p(`Nhưng sứ mệnh này cũng đặt ra bài học về ranh giới. Nếu quá sợ làm mất lòng, bạn có thể im lặng trước điều mình cần nói, chiều theo người khác quá lâu rồi âm thầm tổn thương. Sự hòa hợp thật không đến từ việc bạn biến mất trong mong muốn của người khác.`),
      p(`Trong công việc, <strong>{{name}}</strong> phù hợp với vai trò cố vấn, hỗ trợ chiến lược, chăm sóc quan hệ, điều phối, nhân sự, truyền thông nội bộ hoặc các vị trí cần sự kiên nhẫn và niềm tin. Bạn giỏi làm cho hệ thống người vận hành cùng nhau.`),
      p(`Sứ mệnh số 2 trưởng thành khi bạn biết mềm mà không yếu, biết lắng nghe mà không đánh mất tiếng nói của mình. Khi đó, bạn trở thành cây cầu vững chắc, không phải tấm thảm để người khác bước qua.`),
    ].join("\n"),
    subSections: [
      {
        label: "KHẢ NĂNG NGOẠI GIAO",
        body: [
          p(`<strong>{{name}}</strong> có tài chọn lời, đọc bối cảnh và làm dịu các cực đối lập. Bạn nhìn thấy điều mỗi bên thật sự cần, từ đó có thể dẫn cuộc trò chuyện về điểm gặp nhau thay vì để nó vỡ ra thành tranh thắng thua.`),
          p(`Khi được dùng đúng, khả năng ngoại giao này giúp bạn thành công trong thương lượng, tư vấn, làm việc nhóm và xây dựng cộng đồng. Người khác tin bạn vì họ cảm thấy được lắng nghe.`),
        ].join("\n"),
      },
      {
        label: "NHẠY CẢM CẢM XÚC",
        body: [
          p(`Bạn cảm nhận nhanh những thay đổi nhỏ trong thái độ, giọng nói và không khí. Đây là món quà giúp bạn hiểu người, nhưng cũng khiến bạn dễ mệt nếu sống trong môi trường quá nhiều xung đột hoặc thiếu rõ ràng.`),
          p(`Hãy học cách phân biệt cảm xúc của mình với cảm xúc bạn đang tiếp nhận từ người khác. Không phải mọi sự nặng nề quanh bạn đều là trách nhiệm bạn phải gánh.`),
        ].join("\n"),
      },
      {
        label: "THIẾU QUYẾT ĐOÁN",
        body: [
          p(`Số 2 đôi khi trì hoãn lựa chọn vì muốn giữ hòa khí. Nhưng có những thời điểm không quyết định cũng là một quyết định, và nó có thể khiến bạn bị kéo theo hướng người khác chọn thay mình.`),
          p(`Bài học là nói rõ điều mình muốn bằng giọng bình tĩnh. Quyết đoán không cần ồn ào; với bạn, nó có thể là một câu nói nhẹ nhưng không rút lại.`),
        ].join("\n"),
      },
    ],
    tomLai: `<strong>{{name}}</strong> mang sứ mệnh số 2 để kết nối, điều hòa và dạy người khác về sức mạnh của sự tinh tế. Khi bạn biết giữ hòa hợp mà vẫn giữ mình, biết lắng nghe mà vẫn nói thật, sứ mệnh số 2 đang được thực thi ở trình độ cao nhất.`,
  },
  3: {
    yNghiaHeader: "SỨ MỆNH SỐ 3 CÓ Ý NGHĨA GÌ?",
    yNghiaBody: [
      p(`Sứ mệnh số 3 mở ra con đường của biểu đạt, sáng tạo và truyền cảm hứng. <strong>{{name}}</strong> đến để làm cho ý tưởng có hình dạng, cảm xúc có ngôn ngữ và đời sống bớt khô cứng. Khi bạn nói, viết, trình bày, kể chuyện hoặc tạo ra một hình thức nghệ thuật, năng lượng sứ mệnh bắt đầu vận hành.`),
      p(`Bạn có khả năng làm người khác nhẹ lòng hơn, nhìn thấy màu sắc hơn và tin vào khả năng vui sống hơn. Điểm mạnh của bạn không chỉ là khiếu hài hước hay óc sáng tạo; đó còn là khả năng biến trải nghiệm cá nhân thành thông điệp có thể chạm tới nhiều người.`),
      p(`Mặt bóng của số 3 là sự phân tán. Quá nhiều ý tưởng có thể khiến bạn bắt đầu nhiều nhưng hoàn tất ít. Cảm xúc lên xuống mạnh cũng có thể làm bạn thiếu nhất quán. Sứ mệnh này cần kỷ luật tinh tế để tài năng không tan vào những phút hứng khởi ngắn.`),
      p(`Trong sự nghiệp, bạn phù hợp với truyền thông, nghệ thuật, giáo dục, nội dung, diễn thuyết, thiết kế, thương hiệu, giải trí hoặc bất kỳ công việc nào cần giọng nói riêng. Khi được biểu đạt, bạn phát triển rất nhanh.`),
      p(`Sứ mệnh số 3 không yêu cầu bạn luôn vui. Nó yêu cầu bạn trung thực với trải nghiệm của mình và biến nó thành thứ có ích, đẹp, sâu hoặc sáng cho người khác.`),
    ].join("\n"),
    subSections: [
      {
        label: "SỰ SÁNG TẠO & BIỂU ĐẠT",
        body: [
          p(`<strong>{{name}}</strong> có xu hướng nhìn cuộc sống qua hình ảnh, câu chuyện và sắc thái. Bạn dễ tìm được cách nói khiến điều phức tạp trở nên gần gũi, điều nặng nề trở nên có thể tiếp nhận.`),
          p(`Khi bạn cho phép mình sáng tạo đều đặn, không đợi cảm hứng hoàn hảo, sứ mệnh số 3 trở thành một dòng chảy có kỷ luật và có giá trị thực tế.`),
        ].join("\n"),
      },
      {
        label: "BẢN BAY BỔNG",
        body: [
          p(`Bạn cần không gian để tưởng tượng, thử nghiệm và thay đổi góc nhìn. Sự bay bổng giúp bạn không bị mắc kẹt trong những khuôn mẫu cũ, đồng thời đem lại luồng sinh khí mới cho tập thể.`),
          p(`Nhưng bay bổng cũng cần điểm neo. Hãy có lịch, deadline, người đồng hành hoặc một cam kết đủ rõ để ý tưởng của bạn có thể trở thành sản phẩm, tác phẩm hoặc kết quả cụ thể.`),
        ].join("\n"),
      },
      {
        label: "DỄ PHÂN TÁN",
        body: [
          p(`Số 3 dễ bị cuốn theo điều mới trước khi điều cũ kịp chín. Bạn có thể bắt đầu vì thích thú rồi bỏ dở khi cảm xúc hạ xuống. Đây là thử thách lớn nhất của tài năng sáng tạo.`),
          p(`Bài học là chọn ít hơn nhưng đi sâu hơn. Khi <strong>{{name}}</strong> học cách hoàn tất, tiếng nói của bạn sẽ có trọng lượng lớn hơn rất nhiều.`),
        ].join("\n"),
      },
    ],
    tomLai: `<strong>{{name}}</strong> mang sứ mệnh số 3 để biểu đạt, sáng tạo và truyền cảm hứng bằng giọng nói riêng. Mỗi lần bạn biến cảm xúc thành ngôn từ, ý tưởng thành hình dạng và niềm vui thành giá trị cụ thể, sứ mệnh số 3 đang được thực thi ở trình độ cao nhất.`,
  },
  4: {
    yNghiaHeader: "SỨ MỆNH SỐ 4 CÓ Ý NGHĨA GÌ?",
    yNghiaBody: [
      p(`Làm việc chăm chỉ tận tâm, trung thành, trung thực, đáng tin cậy là những từ khóa rất mạnh của sứ mệnh số 4. Sứ mệnh của <strong>{{name}}</strong> trong cuộc đời này là xây dựng một thứ gì đó có tính tổ chức cao và có giá trị lâu dài. Trong công ty bạn sẽ là người xây dựng nền tảng, quy trình. Bạn sinh ra là để quản lý và thiết lập trật tự. Hãy tạo dựng nền tảng và phát triển mọi thứ từ đó.`),
      p(`Bạn có những đặc điểm tuyệt vời, nhưng thật không may là bạn cũng có một số tiêu cực mạnh. Trừ khi bạn có những chỉ số khác có thể bổ trợ lại tính cách nhạt của bạn. Ví dụ bạn cần cân bằng nó với năng lực tự nhiên số 3 chẳng hạn — hãy đọc thêm về năng lực tự nhiên và chỉ số thái độ, số nhân cách của bạn để xem chúng bổ trợ hay thêm vào cho điểm tiêu cực của số này của bạn.`),
      p(`Mặt tích cực của bạn phải trả giá bằng những phẩm chất tốt hơn của bạn, sự chăm chỉ đặc biệt là lớn. Trong khi bạn làm việc chăm chỉ bạn thường cứng nhắc và buồn tẻ khi nào đến niềm vui. Bạn tận tâm và đáng tin cậy trong công việc, nhưng đó chỉ là công việc; bạn quá thiếu sức tưởng tượng để làm cho nó trở nên thêm thú vị hơn.`),
      p(`Bạn thường giỏi về làm cho mọi thứ và thường không biết cách pha trò. Thời gian đối với bạn rất có giá trị và bạn chỉ lấp đầy nó bằng những thứ có lợi cho bạn.`),
      p(`Bởi vì điều này nên bạn có thể sẽ bị độc thân rất lâu. Điều này không phải là điều đáng buồn với bạn của mình, bởi vì bạn thích ở mình thì bạn sống cuộc sống của số 4 quan trọng hơn, như công việc và sở thích, thực tế hơn khi ở một mình thì tốt hơn khi ở một nơi tốt hơn, và bạn sẽ mang lại lợi ích tốt hơn như theo đó.`),
      p(`Thêm vào đó, thật khó để tìm một người có tất cả những đặc điểm mà bạn đánh giá cao. Bạn cần một người không ngồi đó, nói chuyện, làm phí thời gian. Và bạn sẽ luôn trung thành nếu quyết định hợp tác.`),
      p(`Bạn cũng sẽ trung thành với đồng nghiệp hoặc nhân viên của mình. Bạn sẽ là tài sản quý báu cho bất kỳ công ty nào khi bạn cải thiện, tổ chức lại mọi hệ thống mà bạn thấy. Bạn sửa chữa những gì bị hỏng và đúng. Bạn ưa quyền tốt và biến công việc phải đảm nhận - bạn sẽ trở thành một nhà quản lý xuất sắc.`),
    ].join("\n"),
    subSections: [
      {
        label: "KỸ NĂNG TỔ CHỨC CỦA BẠN",
        body: [
          p(`Bạn là một thuật sĩ — đó là lời giải thích duy nhất cho việc bạn luôn tổ chức mọi thứ một cách có hệ thống. Bạn là một nhà quản lý bẩm sinh, thực hiện bất kỳ nhiệm vụ nào. Bạn có hệ thống với mọi thứ, kể cả công việc. Điều này chắc chắn sẽ giúp bạn về mặt tài chính và thúc đẩy sự phát triển của gia đình.`),
          p(`Bởi vì bạn có những phẩm chất lý này, bạn sẽ phù hợp với những vị trí như vậy quanh đảm nhận và nắm quyền là điều hoàn hảo cho bạn. Các kỹ năng của bạn sẽ được sử dụng tốt. Phương pháp của bạn luôn hiệu quả và sự nhiệt tình của bạn dành cho những việc thật đáng ngưỡng mộ.`),
          p(`Nếu cuối cùng bạn chọn đi theo con đường này, các mối quan hệ sẽ trở nên dễ dàng với bạn, khi bạn đưa ra các ý tưởng để giữ cho mọi thứ diễn ra suôn sẻ. Mặc dù vậy, hãy cẩn thận đừng quá tập trung vào kết quả ngắn hạn. Sự khéo léo mà bạn gắng gỏi học hỏi và thể hiện ra ngoài có thể không phải lúc nào cũng làm bạn thỏa mãn nhưng hãy cứ sử dụng nó.`),
        ].join("\n"),
      },
      {
        label: "BẠN CỨNG NHẮC",
        body: [
          p(`Tất cả phẩm chất tốt của sứ mệnh số 4 đều đi kèm với một cái giá. Bạn sống quá chặt chẽ nên cuộc sống của bạn có thể trở nên cứng nhắc. Bạn quá tập trung vào mục tiêu, trách nhiệm của mình và hoàn thành công việc một cách kịp thời, vì vậy vui vẻ là một thử thách thực sự với bạn.`),
          p(`Bạn không có thời gian để buôn chuyện hoặc tán gẫu với mọi người. Bạn ít để cho tình yêu hoặc các số này cần đường. Sự thiếu hoạt của các khiến bạn có vẻ buồn tẻ và đó không phải là điều đáng mong đợi ở tính cách của một người.`),
          p(`Điều bạn cần, là học cách buông bỏ. Hãy để người yêu hoặc bạn đời của bạn lên kế hoạch cho một buổi tối vui nào đó mà bạn không có bất kỳ lịch trình đã định. Hãy để nhóm làm việc dưới quyền bạn thử nghiệm trong công việc và không bám vào kế hoạch của bạn trong một ngày. Hệ thống của bạn sẽ vẫn ở đó khi bạn quay lại.`),
        ].join("\n"),
      },
      {
        label: "TRUNG THỰC",
        body: [
          p(`Điều tuyệt vời ở bạn là bạn trung thực một cách mạnh mẽ. Bạn luôn nói cho mọi người biết điều gì đang thực sự xảy ra và không khoan nhượng. Bạn sẽ nói thật với bạn bè và gia đình của bạn tại sao mọi thứ đang diễn ra.`),
          p(`Bạn chỉ tập trung vào con đường sự nghiệp hoặc cuộc sống gia đình định, bạn không có thời gian mà mọi người đều dành nhiều thời gian hơn đến những việc quan trọng. Nhưng niềm vui là điều quan trọng trong cuộc sống. Cơ hội để vui chơi là điều cần thiết, vì vậy hãy để bản thân thỉnh thoảng được tự do.`),
          p(`Có thể sự trung thực của bạn sẽ có ích khi đối mặt với những lời bào chữa, bạn sẽ cho họ biết ý kiến của mình và đôi khi sự thật rất khó. Ngay cả khi mọi người không thích những gì bạn nói, bạn vẫn trung thành với họ nên họ sẽ gắn bó với bạn bất chấp.`),
          p(`Những người thân yêu của bạn sẽ cảm ơn bạn vì đã thành thật về những gì bạn thích và không thích. Họ sẽ có đủ kiên nhẫn để đối phó với mặt khó chịu của bạn, bởi vì bạn thành thật về lý do tại sao bạn là như vậy.`),
        ].join("\n"),
      },
    ],
    tomLai: `<strong>{{name}}</strong> đến thế giới này để xây dựng. Không phải để mơ mộng — mà để hiện thực hóa. Mỗi hệ thống bạn tạo ra, mỗi nền tảng bạn củng cố, mỗi lần bạn hoàn thành điều mình đã hứa — đó là sứ mệnh số 4 đang được thực thi ở trình độ cao nhất.`,
  },
  5: {
    yNghiaHeader: "SỨ MỆNH SỐ 5 CÓ Ý NGHĨA GÌ?",
    yNghiaBody: [
      p(`Sứ mệnh số 5 đưa <strong>{{name}}</strong> vào con đường của trải nghiệm, dịch chuyển và mở rộng giới hạn. Bạn đến để chứng minh rằng cuộc sống không chỉ là một khuôn mẫu cố định, mà là một trường học rộng lớn nơi con người trưởng thành qua lựa chọn, va chạm và thích nghi.`),
      p(`Bạn có khả năng kể chuyện, kết nối nhanh, ứng biến và làm cho người khác cảm thấy đời sống còn rất nhiều khả năng. Khi bạn bước vào một môi trường cũ kỹ, bạn thường đem theo luồng khí mới: ý tưởng mới, cách làm mới, câu hỏi mới.`),
      p(`Thử thách của số 5 là sự bồn chồn. Tự do có thể biến thành trốn tránh nếu bạn dùng nó để né trách nhiệm. Thẳng thắn có thể thành thô ráp nếu thiếu sự cân nhắc. Sứ mệnh này cần một trục đạo đức vững để sự linh hoạt không biến thành hỗn loạn.`),
      p(`Công việc phù hợp với bạn là truyền thông, du lịch, kinh doanh linh hoạt, bán hàng, nghiên cứu thị trường, sáng tạo nội dung, tổ chức sự kiện, tư vấn đổi mới hoặc các vai trò cần thích nghi nhanh. Bạn phát triển khi được tiếp xúc nhiều dạng người và nhiều bối cảnh.`),
      p(`Sứ mệnh số 5 trưởng thành khi bạn dùng tự do để chọn có ý thức, không phải để bỏ chạy. Khi đó, bạn trở thành người mở cửa cho những ai đang sợ thay đổi.`),
    ].join("\n"),
    subSections: [
      {
        label: "KHẢ NĂNG THÍCH NGHI",
        body: [
          p(`<strong>{{name}}</strong> có năng lực đổi hướng nhanh khi hoàn cảnh thay đổi. Bạn không cần mọi điều kiện hoàn hảo mới hành động; bạn học ngay trong lúc đang đi và thường tìm được lối ra khi người khác còn đang phân tích.`),
          p(`Khả năng thích nghi này là tài sản lớn trong thời đại biến động. Tuy vậy, hãy phân biệt giữa linh hoạt và thiếu cam kết. Có những cánh cửa chỉ mở khi bạn ở lại đủ lâu.`),
        ].join("\n"),
      },
      {
        label: "BẢN PHIÊU LƯU",
        body: [
          p(`Số 5 cần cảm giác đời sống đang chuyển động. Bạn có thể thấy ngột ngạt trong môi trường quá lặp lại, quá nhiều kiểm soát hoặc thiếu cơ hội tiếp xúc với điều mới.`),
          p(`Phiêu lưu không nhất thiết là rời đi liên tục. Đôi khi phiêu lưu sâu nhất là dám thử một cách sống mới, một thói quen mới, một tiêu chuẩn mới ngay trong chính cuộc đời hiện tại.`),
        ].join("\n"),
      },
      {
        label: "DỄ XAO LÃNG",
        body: [
          p(`Vì bị hấp dẫn bởi quá nhiều khả năng, <strong>{{name}}</strong> dễ bỏ ngang khi điều mới xuất hiện. Điều này có thể làm người khác thấy bạn khó đoán hoặc thiếu tin cậy.`),
          p(`Bài học là chọn một vài cam kết chính và bảo vệ chúng. Khi biết neo tự do vào trách nhiệm, bạn trở thành người vừa sống rộng vừa tạo được kết quả thật.`),
        ].join("\n"),
      },
    ],
    tomLai: `<strong>{{name}}</strong> mang sứ mệnh số 5 để mở rộng trải nghiệm, truyền cảm hứng đổi mới và nhắc người khác rằng tự do cần đi cùng trách nhiệm. Mỗi lần bạn dám thay đổi mà vẫn giữ lời với điều quan trọng, sứ mệnh số 5 đang được thực thi ở trình độ cao nhất.`,
  },
  6: {
    yNghiaHeader: "SỨ MỆNH SỐ 6 CÓ Ý NGHĨA GÌ?",
    yNghiaBody: [
      p(`Sứ mệnh số 6 đặt <strong>{{name}}</strong> trước bài học lớn về tình yêu, trách nhiệm và sự chăm sóc có giới hạn. Bạn đến để tạo ra không gian an toàn, gìn giữ gia đình, nâng đỡ cộng đồng và nhắc người khác rằng đời sống không chỉ có thành tựu, mà còn cần sự tử tế có hình hài cụ thể.`),
      p(`Điểm mạnh của bạn là sự đáng tin cậy, óc xét đoán, khả năng thu xếp đời sống và cảm giác trách nhiệm rất cao. Khi bạn yêu ai, bạn thường muốn làm cho họ tốt hơn, ổn hơn, bớt vất vả hơn. Đây là năng lượng bảo hộ rất mạnh.`),
      p(`Nhưng số 6 dễ rơi vào hai cực: hoặc gánh quá nhiều, hoặc can thiệp quá sâu. Bạn có thể nhầm giữa quan tâm và kiểm soát, giữa giúp đỡ và làm thay. Sứ mệnh này cần sự tôn trọng ranh giới của người khác và của chính bạn.`),
      p(`Trong sự nghiệp, bạn phù hợp với giáo dục, tư vấn, chăm sóc cộng đồng, thiết kế không gian sống, quản trị nhân sự, dịch vụ khách hàng, nghệ thuật ứng dụng hoặc các vai trò cần trách nhiệm và thẩm mỹ. Bạn làm tốt khi thấy công việc của mình cải thiện đời sống con người.`),
      p(`Sứ mệnh số 6 trưởng thành khi bạn yêu thương mà không đánh mất mình, phục vụ mà không tự biến mình thành người gánh hết. Khi đó, bạn trở thành điểm tựa bền vững.`),
    ].join("\n"),
    subSections: [
      {
        label: "TÌNH YÊU & TRÁCH NHIỆM GIA ĐÌNH",
        body: [
          p(`<strong>{{name}}</strong> có xu hướng xây mái nhà, cả nghĩa đen lẫn nghĩa bóng. Bạn muốn những người quan trọng được an ổn, được quan tâm, được sống trong một trật tự giàu tình cảm.`),
          p(`Gia đình có thể là nguồn sức mạnh lớn, nhưng cũng là nơi bạn dễ gánh trách nhiệm quá mức. Hãy nhớ: tình yêu bền vững cần cả chăm sóc lẫn tự do.`),
        ].join("\n"),
      },
      {
        label: "BẢN BẢO BỌC",
        body: [
          p(`Bạn bảo vệ người mình thương bằng hành động thực tế. Bạn nhìn thấy điều cần sửa, cần chuẩn bị, cần phòng ngừa. Đây là phẩm chất quý trong một thế giới nhiều bất ổn.`),
          p(`Tuy vậy, bảo bọc quá mức có thể làm người khác khó trưởng thành. Hãy hỏi họ cần gì trước khi tự quyết định điều gì là tốt nhất cho họ.`),
        ].join("\n"),
      },
      {
        label: "NGUY CƠ HY SINH BẢN THÂN",
        body: [
          p(`Số 6 dễ xem việc mệt mỏi của mình là bình thường, miễn là người khác ổn. Nhưng nếu bạn luôn cho đi từ phần cạn kiệt, sự dịu dàng sẽ dần biến thành trách móc âm thầm.`),
          p(`Bài học là chăm sóc bản thân như một phần của trách nhiệm, không phải phần thưởng sau khi mọi người đã ổn. Bạn cũng xứng đáng được nâng đỡ.`),
        ].join("\n"),
      },
    ],
    tomLai: `<strong>{{name}}</strong> mang sứ mệnh số 6 để xây dựng tình yêu có trách nhiệm, tạo không gian an toàn và nuôi dưỡng điều đẹp trong đời sống. Khi bạn biết chăm sóc mà vẫn tôn trọng ranh giới, sứ mệnh số 6 đang được thực thi ở trình độ cao nhất.`,
  },
  7: {
    yNghiaHeader: "SỨ MỆNH SỐ 7 CÓ Ý NGHĨA GÌ?",
    yNghiaBody: [
      p(`Sứ mệnh số 7 dẫn <strong>{{name}}</strong> vào con đường của tri thức, chiều sâu nội tâm và sự truy tìm bản chất. Bạn không đến để tin mọi thứ quá nhanh; bạn đến để hỏi, đào sâu, quan sát và tìm ra quy luật ẩn phía sau đời sống.`),
      p(`Bạn có trí nhớ tốt, trực giác mạnh, khả năng phân tích và nhu cầu hiểu đến tận gốc. Khi sống đúng sứ mệnh, bạn có thể trở thành người nghiên cứu, người cố vấn trí tuệ, người giữ kho tri thức hoặc người giúp người khác nhìn thấy chiều sâu mà họ bỏ qua.`),
      p(`Mặt khó của số 7 là cô lập và nghi ngờ. Nếu không cẩn thận, bạn có thể đứng ngoài đời sống quá lâu, quan sát quá nhiều mà ít tham gia. Sự kín đáo có thể bảo vệ bạn, nhưng cũng có thể dựng tường ngăn bạn với tình cảm chân thật.`),
      p(`Công việc phù hợp là nghiên cứu, phân tích dữ liệu, khoa học, triết học, chiến lược, tâm lý, viết lách chuyên sâu, công nghệ, giảng dạy tri thức hoặc các lĩnh vực đòi hỏi sự chính xác và chiều sâu.`),
      p(`Sứ mệnh số 7 trưởng thành khi bạn không chỉ biết nhiều, mà còn biết chia sẻ đúng lúc. Tri thức giữ lại quá lâu sẽ trở thành cô độc; tri thức được trao đúng cách sẽ thành ánh sáng cho người khác.`),
    ].join("\n"),
    subSections: [
      {
        label: "CHIỀU SÂU TÂM LINH",
        body: [
          p(`<strong>{{name}}</strong> có nhu cầu tự hỏi về ý nghĩa của đời sống, về lý do phía sau các biến cố và về cấu trúc vô hình của con người. Bạn không dễ hài lòng với lời giải thích nông.`),
          p(`Chiều sâu này giúp bạn nhìn xa hơn bề mặt, nhưng cần được cân bằng bằng đời sống thực tế: cơ thể, công việc, gia đình, cam kết và những việc nhỏ mỗi ngày.`),
        ].join("\n"),
      },
      {
        label: "BẢN KÍN ĐÁO",
        body: [
          p(`Bạn thường giữ nhiều điều trong lòng và chỉ chia sẻ khi thật sự tin tưởng. Sự kín đáo giúp bạn tránh ồn ào, nhưng cũng khiến người khác khó hiểu bạn đang cần gì.`),
          p(`Hãy chọn một vài người đủ tin cậy để mở lòng. Không phải ai cũng cần biết thế giới bên trong của bạn, nhưng nếu không ai được bước vào, bạn sẽ rất dễ cô đơn.`),
        ].join("\n"),
      },
      {
        label: "NGUY CƠ CÔ LẬP",
        body: [
          p(`Số 7 có thể dùng lý trí để tránh cảm xúc. Bạn phân tích rất giỏi, nhưng đôi khi điều cần thiết không phải thêm một lập luận, mà là một cuộc trò chuyện thật.`),
          p(`Bài học là tham gia vào đời sống mà không đánh mất chiều sâu. Bạn có thể vừa là người quan sát sắc bén, vừa là người hiện diện chân thành.`),
        ].join("\n"),
      },
    ],
    tomLai: `<strong>{{name}}</strong> mang sứ mệnh số 7 để tìm kiếm tri thức, đào sâu sự thật và chia sẻ hiểu biết với sự khiêm nhường. Mỗi lần bạn biến cô tĩnh thành trí tuệ hữu ích cho đời sống, sứ mệnh số 7 đang được thực thi ở trình độ cao nhất.`,
  },
  8: {
    yNghiaHeader: "SỨ MỆNH SỐ 8 CÓ Ý NGHĨA GÌ?",
    yNghiaBody: [
      p(`Sứ mệnh số 8 đưa <strong>{{name}}</strong> vào con đường của quyền lực, thành tựu, quản trị nguồn lực và ảnh hưởng vật chất. Bạn đến để học cách làm chủ sức mạnh: tiền bạc, vị thế, hệ thống, con người và trách nhiệm đi kèm với tất cả những điều đó.`),
      p(`Điểm mạnh của bạn là tầm nhìn xa, bản năng lãnh đạo, tư duy thực tế và khả năng biến mục tiêu lớn thành chiến lược cụ thể. Khi sống đúng sứ mệnh, bạn có thể tạo ra tổ chức, tài sản, công việc và cơ hội cho nhiều người khác.`),
      p(`Mặt khó của số 8 là tham vọng không được soi xét. Nếu chỉ chạy theo kết quả, bạn có thể trở nên khắt khe, thiếu kiên nhẫn hoặc dùng quyền lực như công cụ áp đảo. Bài học lớn là thành công phải có đạo đức, nếu không nó sẽ trở thành gánh nặng.`),
      p(`Bạn phù hợp với kinh doanh, tài chính, đầu tư, quản trị, luật, bất động sản, điều hành, chiến lược, thương mại hoặc các vai trò có quyền quyết định rõ. Môi trường nhỏ hẹp và thiếu tham vọng khó giữ được bạn lâu.`),
      p(`Sứ mệnh số 8 trưởng thành khi bạn biết dùng quyền lực để xây dựng, không phải để chứng minh. Khi vật chất và trách nhiệm cùng đi trong một trật tự đúng, bạn có thể tạo dấu ấn rất lớn.`),
    ].join("\n"),
    subSections: [
      {
        label: "QUYỀN LỰC & THỊNH VƯỢNG",
        body: [
          p(`<strong>{{name}}</strong> có khả năng thu hút trách nhiệm lớn và những bài toán liên quan đến tài nguyên. Bạn thường được đặt vào vị trí cần quyết đoán, tính toán và chịu trách nhiệm cho kết quả.`),
          p(`Thịnh vượng với số 8 không chỉ là tích lũy; đó là năng lực tổ chức dòng chảy vật chất để tạo ra giá trị bền hơn cho bản thân, gia đình và tập thể.`),
        ].join("\n"),
      },
      {
        label: "TƯ DUY KINH DOANH",
        body: [
          p(`Bạn có thể nhìn một ý tưởng dưới góc độ khả thi: nguồn lực ở đâu, vận hành thế nào, rủi ro là gì, lợi ích có xứng đáng không. Đây là tư duy rất mạnh để xây hệ thống.`),
          p(`Khi kết hợp sự quyết đoán với dữ liệu và đạo đức, bạn có thể trở thành người điều hành đáng tin. Đừng chỉ hỏi điều gì sinh lợi; hãy hỏi điều gì xứng đáng được xây.`),
        ].join("\n"),
      },
      {
        label: "NGUY CƠ THAM VỌNG MÙ QUÁNG",
        body: [
          p(`Số 8 dễ bị cuốn vào mục tiêu kế tiếp mà quên kiểm tra cái giá phải trả. Bạn có thể trở nên quá cứng, quá vội hoặc xem cảm xúc là thứ làm chậm tiến độ.`),
          p(`Bài học là nhớ rằng quyền lực luôn đi cùng hậu quả. Thành công thật sự không khiến bạn mất nhân tính; nó làm cho năng lực của bạn phục vụ được nhiều điều đúng hơn.`),
        ].join("\n"),
      },
    ],
    tomLai: `<strong>{{name}}</strong> mang sứ mệnh số 8 để làm chủ quyền lực, tạo thành tựu và xây dựng giá trị vật chất có trách nhiệm. Khi bạn dùng tham vọng để kiến tạo thay vì áp đảo, sứ mệnh số 8 đang được thực thi ở trình độ cao nhất.`,
  },
  9: {
    yNghiaHeader: "SỨ MỆNH SỐ 9 CÓ Ý NGHĨA GÌ?",
    yNghiaBody: [
      p(`Sứ mệnh số 9 đưa <strong>{{name}}</strong> vào con đường của lòng nhân ái, tầm nhìn rộng và khả năng cống hiến vượt khỏi lợi ích cá nhân. Bạn đến để học cách yêu thương con người như một tổng thể phức tạp: đẹp, yếu, sai, đáng thương và đáng được nâng đỡ.`),
      p(`Bạn có sức hút tự nhiên, óc hài hước, lòng trắc ẩn và khả năng truyền cảm hứng. Khi sống đúng sứ mệnh, bạn có thể dùng nghệ thuật, giáo dục, y tế, hoạt động xã hội, truyền thông hoặc một hình thức phục vụ cộng đồng để làm đời sống bớt lạnh.`),
      p(`Mặt khó của số 9 là nỗi buồn sâu, sự lý tưởng hóa và xu hướng cho đi quá nhiều. Bạn có thể yêu một hình ảnh đẹp của con người rồi đau khi họ không như bạn tưởng. Bạn cũng có thể mang nỗi đau của người khác vào mình đến mức mất phương hướng.`),
      p(`Công việc phù hợp là nơi tài năng cá nhân được dùng cho lợi ích rộng hơn: nghệ thuật, giáo dục, công tác xã hội, tư vấn, y tế, nhân sự, truyền thông cộng đồng, thiện nguyện chuyên nghiệp hoặc các dự án nhân văn.`),
      p(`Sứ mệnh số 9 trưởng thành khi bạn biết cho đi mà không tự xóa mình, biết tha thứ mà không dung túng, biết yêu thương mà vẫn có ranh giới. Khi đó lòng nhân ái của bạn có sức bền.`),
    ].join("\n"),
    subSections: [
      {
        label: "TÌNH YÊU NHÂN LOẠI",
        body: [
          p(`<strong>{{name}}</strong> có khả năng nhìn thấy con người phía sau lỗi lầm, nỗi sợ và vẻ ngoài. Bạn dễ động lòng trước bất công, khổ đau hoặc những số phận bị bỏ quên.`),
          p(`Tình yêu rộng này là tài sản quý, nhưng cần đi cùng sự tỉnh táo. Không phải ai bạn thương cũng cần bạn cứu; đôi khi điều nhân ái nhất là trao sự tôn trọng và ranh giới.`),
        ].join("\n"),
      },
      {
        label: "TÀI NĂNG TRUYỀN CẢM HỨNG",
        body: [
          p(`Bạn có thể dùng câu chuyện, hình ảnh, lời nói hoặc chính đời sống của mình để đánh thức điều tốt trong người khác. Khi bạn tin vào một lý tưởng, người khác cảm nhận được sức nặng của niềm tin đó.`),
          p(`Hãy dùng tài năng này có trách nhiệm. Truyền cảm hứng không phải làm người khác xúc động nhất thời, mà giúp họ nhìn thấy một hành động đúng có thể bắt đầu ngay.`),
        ].join("\n"),
      },
      {
        label: "NGUY CƠ ĐAU KHỔ VÌ NGƯỜI KHÁC",
        body: [
          p(`Số 9 dễ ôm vào lòng quá nhiều câu chuyện. Nếu không biết lọc, bạn có thể mệt vì những nỗi đau không thuộc quyền kiểm soát của mình.`),
          p(`Bài học là phụng sự bằng sự sáng suốt. Bạn có thể thương người mà vẫn nghỉ ngơi, có thể giúp đời mà vẫn giữ đời sống riêng không bị phá vỡ.`),
        ].join("\n"),
      },
    ],
    tomLai: `<strong>{{name}}</strong> mang sứ mệnh số 9 để cống hiến, truyền cảm hứng và mở rộng lòng nhân ái trong đời sống thực tế. Khi bạn biết yêu thương có ranh giới và biến lý tưởng thành hành động cụ thể, sứ mệnh số 9 đang được thực thi ở trình độ cao nhất.`,
  },
};

export function renderDestinyExtra(num: number, name: string): string {
  const entry = DESTINY_EXTRA[num] || DESTINY_EXTRA[num % 9 || 9];
  if (!entry) return "";
  const safeName = escapeHtml(name);
  const replaceVars = (html: string) => html.replaceAll("{{name}}", safeName);

  const sub = entry.subSections.map(s => `
    <div class="lp-extra-section">
      <div class="lp-extra-heading">${s.label}</div>
      <div class="lp-extra-body">${replaceVars(s.body)}</div>
    </div>`).join("");

  return `
    <div class="lp-extra-section">
      <div class="lp-extra-heading">${entry.yNghiaHeader}</div>
      <div class="lp-extra-body">${replaceVars(entry.yNghiaBody)}</div>
    </div>
    ${sub}
    <div class="insight-box" style="margin-top:1rem;">🎯 <strong>Tóm lại:</strong> ${replaceVars(entry.tomLai)}</div>
  `;
}
