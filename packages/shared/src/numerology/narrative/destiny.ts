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
      p(`Điểm đáng quý của số 1 là khả năng nhìn thấy hạt giống thành tựu ngay khi mọi thứ còn rất sơ khai. Bạn có thể nhận ra một hướng đi, một sản phẩm, một cách làm hoặc một tiêu chuẩn mới trước khi đám đông kịp gọi tên nó. Vì vậy, đừng xem cảm giác muốn bắt đầu là bốc đồng; nó là tín hiệu sứ mệnh, miễn là bạn biết kiểm tra thực tế, lập kế hoạch và chịu trách nhiệm đến cùng.`),
      p(`Trong quan hệ, số 1 cần học cách yêu mà không biến người kia thành người đi theo. Bạn có thể rất mạnh, rất rõ ràng và rất có sức đẩy, nhưng tình cảm bền vững không lớn lên từ mệnh lệnh. Nó lớn lên từ sự tôn trọng, sự lắng nghe và khả năng cho người khác một khoảng trời riêng. Khi bạn biết chia sẻ quyền lực, mối quan hệ sẽ bổ trợ cho sứ mệnh thay vì trở thành nơi tranh giành vị trí.`),
      p(`Con đường phát triển của <strong>{{name}}</strong> là biến tham vọng cá nhân thành một ngọn đuốc có ích. Bạn không cần nhỏ lại để được yêu quý, nhưng cũng không cần lớn tiếng để được công nhận. Khi hành động của bạn có mục tiêu, có đạo đức và có khả năng nâng người khác cùng tiến, số 1 bước vào tầng cao nhất: người khai mở có bản lĩnh và có lòng tự trọng sáng rõ.`),
    ].join("\n"),
    subSections: [
      {
        label: "KHẢ NĂNG LÃNH ĐẠO BẨM SINH",
        body: [
          p(`<strong>{{name}}</strong> có bản năng nhận trách nhiệm và nhìn ra điểm cần hành động. Bạn thường không cần ai chỉ định mới bắt đầu dẫn dắt; trong một tập thể rối, bạn tự nhiên nhìn thấy thứ tự, ưu tiên và bước đầu tiên cần làm.`),
          p(`Năng lực này phát huy tốt nhất khi đi cùng sự lắng nghe. Nếu bạn chỉ tiến lên theo ý mình, người khác có thể nể phục nhưng khó gắn bó. Khi biết hỏi, biết trao quyền và biết ghi nhận, bạn trở thành người mở đường đáng tin cậy.`),
          p(`Trong đời sống thực tế, khả năng lãnh đạo của bạn không nhất thiết phải xuất hiện bằng chức danh. Nó có thể nằm trong cách bạn chốt một quyết định khó, bảo vệ tiêu chuẩn đúng, đặt lại hướng cho nhóm hoặc dám nói điều chưa ai dám nói. Càng trưởng thành, bạn càng hiểu rằng lãnh đạo không phải là đứng cao hơn, mà là nhìn xa hơn và chịu phần trách nhiệm nặng hơn.`),
          p(`Lời khuyên dành cho bạn là hãy chọn một vài trận địa thật sự xứng đáng. Số 1 có thể lao vào quá nhiều cuộc chiến vì muốn chứng minh mình đúng; điều đó làm hao lực và dễ tạo đối đầu không cần thiết. Khi biết chọn đúng mục tiêu, đúng thời điểm và đúng người đồng hành, uy lực của bạn trở nên cô đọng, sắc bén và có sức lan tỏa hơn rất nhiều.`),
        ].join("\n"),
      },
      {
        label: "TIÊN PHONG & ĐỘC LẬP",
        body: [
          p(`Số 1 không phù hợp với đời sống chỉ lặp lại điều đã có. Bạn cần một vùng đất để thử, một mục tiêu để chinh phục và một tiêu chuẩn do chính mình đặt ra. Tự do hành động là điều kiện quan trọng để bạn phát triển.`),
          p(`Tuy vậy, độc lập không có nghĩa là từ chối mọi sự hỗ trợ. Sứ mệnh của bạn lớn hơn khi biết dùng trí tuệ tập thể, biến đồng minh thành sức bật và để người khác góp phần làm ý tưởng của bạn đứng vững hơn.`),
          p(`Sự tiên phong của bạn mạnh nhất khi được đặt vào một nhịp bền. Có những ý tưởng cần cú bật đầu tiên, nhưng cũng có những thành tựu cần nhiều tháng, nhiều năm để thành hình. Nếu chỉ yêu khoảnh khắc mở đường mà bỏ qua phần xây dựng tiếp theo, bạn sẽ có nhiều khởi đầu rực rỡ nhưng ít di sản thật sự. Hãy học cách ở lại đủ lâu với điều mình đã khai mở.`),
          p(`Bạn cũng cần phân biệt giữa độc lập và cô lập. Độc lập giúp bạn tự quyết, tự chịu trách nhiệm và dám chọn khác đám đông; cô lập khiến bạn từ chối phản hồi, tự gồng và đánh mất nguồn lực quý. Khi biết để người khác tham gia mà vẫn giữ lõi định hướng, bạn không mất quyền chủ động; bạn chỉ làm cho con đường của mình rộng hơn.`),
        ].join("\n"),
      },
      {
        label: "CÁI TÔI MẠNH",
        body: [
          p(`Cái tôi là thanh kiếm của số 1: dùng đúng thì mở đường, dùng sai thì tạo khoảng cách. <strong>{{name}}</strong> cần phân biệt giữa lòng tự trọng và sự cố chấp, giữa quyết đoán và không chịu nghe ai.`),
          p(`Bài học quan trọng là biết nhận lỗi nhanh, sửa hướng nhanh và không xem phản hồi như sự tấn công. Khi cái tôi phục vụ sứ mệnh thay vì điều khiển sứ mệnh, bạn sẽ có uy lực rất lớn.`),
          p(`Một số 1 chưa trưởng thành thường sợ bị xem là yếu nếu thừa nhận mình cần giúp đỡ. Nhưng ở tầng cao hơn, bạn sẽ thấy sự mạnh mẽ thật sự không nằm ở vẻ bất khả xâm phạm, mà nằm ở năng lực học nhanh và đứng dậy nhanh. Người khác tin bạn hơn khi họ thấy bạn có thể sửa sai mà không đánh mất khí chất dẫn đầu.`),
          p(`Hãy đặt cho mình những nghi thức kiểm tra cái tôi: hỏi lại mục tiêu thật sự là gì, ai đang bị bỏ quên, quyết định này phục vụ kết quả hay chỉ phục vụ cảm giác thắng. Những câu hỏi đó không làm bạn chậm đi; chúng làm mũi tên số 1 bay đúng đích hơn, tránh lãng phí sức mạnh vào những cuộc đối đầu không xứng đáng.`),
        ].join("\n"),
      },
      {
        label: "ỨNG DỤNG THỰC TẾ CỦA SỨ MỆNH SỐ 1",
        body: [
          p(`Trong nghề nghiệp, <strong>{{name}}</strong> nên chọn những vai trò có quyền quyết định thật, dù ban đầu quy mô còn nhỏ. Một dự án tự dẫn, một nhóm nhỏ do bạn chịu trách nhiệm, một sản phẩm cá nhân hoặc một sáng kiến nội bộ sẽ nuôi dưỡng số 1 tốt hơn nhiều so với vị trí an toàn nhưng hoàn toàn thụ động. Bạn cần cảm giác mình đang tạo hướng đi, không chỉ hoàn thành phần việc được giao.`),
          p(`Về tài chính, số 1 phát triển khi biết biến ý tưởng thành tài sản hoặc năng lực độc quyền. Hãy đầu tư vào kỹ năng ra quyết định, thương hiệu cá nhân, khả năng bán ý tưởng và khả năng chịu trách nhiệm trước kết quả. Tránh tiêu tiền chỉ để khẳng định bản thân hoặc chứng minh vị thế; tiền bạc của bạn nên phục vụ mục tiêu dài hạn và quyền tự chủ, không phục vụ sự nóng nảy nhất thời.`),
          p(`Về quan hệ xã hội, bài học là dẫn dắt bằng sự rõ ràng thay vì áp lực. Bạn có thể nói thẳng điều mình muốn, nhưng hãy để người khác có quyền phản hồi và quyền không đồng ý. Khi một người số 1 biết tạo không gian cho tiếng nói khác, họ không mất sức mạnh; họ trở thành trung tâm đáng tin cậy hơn, vì người khác cảm thấy được tham gia chứ không bị kéo theo.`),
          p(`Mỗi tháng, bạn nên chọn một việc chứng minh mình đang thật sự đi đầu: hoàn tất một quyết định bị trì hoãn, trình bày một ý tưởng, nhận trách nhiệm cho một kết quả, hoặc dừng một hướng đi không còn đúng. Những hành động cụ thể này giúp sứ mệnh số 1 không chỉ là khí chất bên trong, mà trở thành dấu vết rõ ràng trong công việc, tài chính và các mối quan hệ.`),
        ].join("\n"),
      },
      {
        label: "THỰC HÀNH PHÁT TRIỂN DÀNH CHO SỐ 1",
        body: [
          p(`Khi bước vào một giai đoạn mới, <strong>{{name}}</strong> nên bắt đầu bằng câu hỏi: điều gì thật sự cần mình khởi xướng, và điều gì chỉ là ham muốn chứng minh bản thân? Câu hỏi này giúp bạn phân biệt giữa tiếng gọi sứ mệnh và phản ứng tự ái. Nếu một hướng đi làm bạn thấy tỉnh táo, có trách nhiệm và sẵn sàng học, đó thường là hướng đáng theo. Nếu nó chỉ làm bạn muốn thắng nhanh, hãy chậm lại để xem mình đang phục vụ mục tiêu hay phục vụ cái tôi.`),
          p(`Trong ba tháng đầu của một dự án, hãy ưu tiên tạo nhịp hành động nhỏ nhưng đều. Số 1 rất mạnh ở cú bật đầu tiên, nhưng dễ mất kiên nhẫn khi kết quả chưa đến ngay. Bạn cần biến sự bốc lửa thành lịch làm việc, biến tầm nhìn thành mốc kiểm tra, biến quyết tâm thành cam kết có người chứng kiến. Khi có cấu trúc, năng lực tiên phong của bạn không cháy bùng rồi tắt, mà trở thành ngọn lửa đủ bền để dẫn đường.`),
          p(`Khi gặp phản đối, đừng vội xem đó là dấu hiệu mình bị ngăn cản. Có những phản đối chỉ là nỗi sợ của người khác, nhưng cũng có những phản đối chứa thông tin quý. Hãy học cách nghe phần dữ kiện trong lời góp ý, bỏ qua phần cảm xúc không cần thiết, rồi tự quyết. Đây là nghệ thuật rất cao của số 1: không bị lung lay bởi đám đông, nhưng cũng không kiêu ngạo trước những tín hiệu thật.`),
          p(`Ở tầng trưởng thành, sứ mệnh số 1 không còn hỏi “làm sao để tôi nổi bật” mà hỏi “làm sao để điều đúng được bắt đầu”. Khi bạn chuyển trọng tâm từ hình ảnh cá nhân sang công trình cần được khai mở, uy lực của bạn tự nhiên dịu lại mà vẫn mạnh. Người khác sẽ theo bạn không phải vì bị áp đảo, mà vì họ cảm thấy phía trước có một con đường đáng tin.`),
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
      p(`Điểm đặc biệt của số 2 là khả năng nhìn thấy phần bị bỏ sót trong mối quan hệ: một ánh mắt ngập ngừng, một lời chưa nói hết, một chi tiết nhỏ làm toàn bộ bầu khí thay đổi. <strong>{{name}}</strong> có thể dùng sự nhạy cảm này để tạo tin cậy, nhưng cũng cần nhớ rằng trực giác phải đi cùng sự kiểm chứng. Không phải điều bạn cảm được lúc nào cũng là sự thật hoàn chỉnh; đôi khi nó chỉ là lời mời để hỏi sâu hơn.`),
      p(`Trong tình cảm, bạn có xu hướng muốn sự an toàn và sự gắn bó rõ ràng. Điều đó không sai, nhưng nếu thiếu lòng tin vào giá trị của mình, bạn dễ chờ người khác xác nhận rồi mới dám yên tâm. Bài học của số 2 là đứng vững trong sự dịu dàng: biết yêu, biết cần, biết mềm lòng, nhưng vẫn nói được điều làm mình tổn thương và điều mình không thể tiếp tục chịu đựng.`),
      p(`Con đường phát triển của bạn không nằm ở việc trở thành người cứng rắn như số 1 hay rực rỡ như số 3. Số 2 có quyền lực riêng: quyền lực của sự kết nối, kiên nhẫn và khả năng làm mọi người muốn ngồi lại với nhau. Khi bạn tin rằng sự mềm mại cũng là một dạng sức mạnh, sứ mệnh hòa giải của bạn sẽ sáng lên rất rõ.`),
    ].join("\n"),
    subSections: [
      {
        label: "KHẢ NĂNG NGOẠI GIAO",
        body: [
          p(`<strong>{{name}}</strong> có tài chọn lời, đọc bối cảnh và làm dịu các cực đối lập. Bạn nhìn thấy điều mỗi bên thật sự cần, từ đó có thể dẫn cuộc trò chuyện về điểm gặp nhau thay vì để nó vỡ ra thành tranh thắng thua.`),
          p(`Khi được dùng đúng, khả năng ngoại giao này giúp bạn thành công trong thương lượng, tư vấn, làm việc nhóm và xây dựng cộng đồng. Người khác tin bạn vì họ cảm thấy được lắng nghe.`),
          p(`Ngoại giao của số 2 không phải là làm vừa lòng tất cả. Đó là nghệ thuật giữ cho sự thật được nói ra mà không làm đứt gãy phẩm giá của người nghe. Bạn có thể chọn từ ngữ, chọn thời điểm và chọn nhịp điệu để một vấn đề khó được mở ra trong sự tôn trọng. Đây là năng lực rất quý trong gia đình, đội nhóm, đối tác và mọi môi trường cần hợp tác dài hạn.`),
          p(`Tuy nhiên, hãy cẩn thận với thói quen nói vòng vì sợ mất hòa khí. Khi thông điệp bị bọc quá nhiều lớp, người khác có thể không hiểu điều bạn thật sự cần. Sự khéo léo tốt nhất của bạn là rõ ràng mà vẫn tử tế, mềm mại mà vẫn có ranh giới. Khi đó, lời nói của bạn vừa có duyên vừa có trọng lượng.`),
        ].join("\n"),
      },
      {
        label: "NHẠY CẢM CẢM XÚC",
        body: [
          p(`Bạn cảm nhận nhanh những thay đổi nhỏ trong thái độ, giọng nói và không khí. Đây là món quà giúp bạn hiểu người, nhưng cũng khiến bạn dễ mệt nếu sống trong môi trường quá nhiều xung đột hoặc thiếu rõ ràng.`),
          p(`Hãy học cách phân biệt cảm xúc của mình với cảm xúc bạn đang tiếp nhận từ người khác. Không phải mọi sự nặng nề quanh bạn đều là trách nhiệm bạn phải gánh.`),
          p(`Sự nhạy cảm của bạn giống một mặt nước trong: chỉ cần một chiếc lá rơi cũng tạo gợn. Nhờ vậy bạn hiểu người, nhưng cũng dễ bị mệt nếu ở quá lâu trong môi trường căng thẳng, thiếu thành thật hoặc nhiều lời trách móc ngầm. Hãy chọn không gian sống và làm việc có nhịp độ nhân văn, vì hệ thần kinh tinh tế của bạn cần sự ổn định để phát huy tốt nhất.`),
          p(`Một thực hành quan trọng là gọi tên cảm xúc trước khi phản ứng. Khi buồn, hãy nhận biết mình đang buồn; khi bất an, hãy hỏi bất an này đến từ dữ kiện nào. Việc đặt tên không làm cảm xúc biến mất, nhưng giúp bạn trở lại vị trí chủ động. Từ đó bạn có thể đáp lại bằng sự sáng suốt thay vì để cảm xúc của cả căn phòng cuốn mình đi.`),
        ].join("\n"),
      },
      {
        label: "THIẾU QUYẾT ĐOÁN",
        body: [
          p(`Số 2 đôi khi trì hoãn lựa chọn vì muốn giữ hòa khí. Nhưng có những thời điểm không quyết định cũng là một quyết định, và nó có thể khiến bạn bị kéo theo hướng người khác chọn thay mình.`),
          p(`Bài học là nói rõ điều mình muốn bằng giọng bình tĩnh. Quyết đoán không cần ồn ào; với bạn, nó có thể là một câu nói nhẹ nhưng không rút lại.`),
          p(`Thiếu quyết đoán thường xuất hiện khi bạn nhìn thấy quá nhiều mặt của vấn đề. Bạn hiểu người này có lý, người kia cũng có nỗi khổ, phương án nào cũng có cái giá riêng. Nhưng sứ mệnh số 2 không yêu cầu bạn đứng ngoài mãi để giữ công bằng tuyệt đối; nó yêu cầu bạn đưa ra lựa chọn có trái tim và có trách nhiệm.`),
          p(`Hãy tập bắt đầu bằng những quyết định nhỏ: nói không với một lịch hẹn không phù hợp, chọn điều mình muốn ăn, xác nhận thời hạn, nêu mong đợi trong quan hệ. Những việc tưởng nhẹ này rèn cho bạn cảm giác mình có quyền định hình đời sống. Khi quyền chọn lựa được dùng đều đặn, sự mềm mại của bạn không còn bị nhầm với sự do dự.`),
        ].join("\n"),
      },
      {
        label: "ỨNG DỤNG THỰC TẾ CỦA SỨ MỆNH SỐ 2",
        body: [
          p(`Trong công việc, <strong>{{name}}</strong> nên đặt mình ở nơi cần xây cầu nối: điều phối nhóm, chăm sóc khách hàng, cố vấn, nhân sự, đối tác, trợ lý chiến lược hoặc vai trò giữ nhịp vận hành phía sau. Bạn có thể không phải người ồn ào nhất, nhưng bạn thường là người khiến hệ thống bớt va đập. Khi biết ghi nhận giá trị âm thầm ấy, bạn sẽ không còn tự xem mình là người đứng sau kém quan trọng.`),
          p(`Về tài chính, số 2 cần tránh quyết định vì nể nang. Cho vay, góp vốn, giảm giá, nhận thêm việc hoặc hy sinh quyền lợi chỉ để giữ quan hệ đều có thể làm bạn mất cân bằng. Hãy viết rõ thỏa thuận, thời hạn và trách nhiệm. Sự minh bạch không làm mất tình cảm; nó bảo vệ tình cảm khỏi những hiểu lầm âm thầm tích tụ qua thời gian.`),
          p(`Trong tình yêu, bạn nên luyện cách nói nhu cầu trước khi sự im lặng biến thành thử thách người kia. Đừng chờ đối phương tự đoán mọi điều tinh tế trong lòng bạn. Số 2 có khả năng thấu cảm cao, nhưng không phải ai cũng có cùng mức nhạy cảm ấy. Khi bạn nói thật bằng giọng hiền hòa, mối quan hệ có cơ hội trưởng thành thay vì mắc kẹt trong kỳ vọng không lời.`),
          p(`Mỗi tháng, hãy chọn một cuộc trò chuyện cần được làm rõ: một ranh giới, một lời cảm ơn, một lời từ chối hoặc một nhu cầu chưa được nói. Đây là nghi thức thực hành sứ mệnh số 2 rất mạnh. Bạn không cần biến mình thành người cứng; bạn chỉ cần để sự dịu dàng của mình có xương sống, có tiếng nói và có vị trí xứng đáng.`),
        ].join("\n"),
      },
      {
        label: "THỰC HÀNH PHÁT TRIỂN DÀNH CHO SỐ 2",
        body: [
          p(`Mỗi khi cảm thấy khó xử, <strong>{{name}}</strong> nên tự hỏi: mình đang muốn giữ hòa khí, hay đang tránh nói thật? Hai điều này rất khác nhau. Giữ hòa khí là biết chọn lời nói khéo để sự thật được tiếp nhận; tránh nói thật là để vấn đề tiếp tục tồn tại dưới lớp im lặng. Số 2 phát triển mạnh khi bạn biết đưa sự thật vào quan hệ bằng đôi tay mềm, không ném nó như một viên đá, nhưng cũng không giấu nó dưới thảm.`),
          p(`Trong công việc nhóm, hãy tập ghi nhận phần đóng góp của mình bằng dữ kiện cụ thể. Bạn đã kết nối ai với ai, làm rõ hiểu lầm nào, giữ khách hàng nào ở lại, xử lý chi tiết nào để cả hệ thống chạy mượt hơn? Khi nhìn thấy giá trị cụ thể của mình, bạn sẽ bớt lệ thuộc vào lời khen bên ngoài. Sự tự tin của số 2 không cần ồn ào; nó cần bằng chứng âm thầm được bạn tự công nhận.`),
          p(`Khi rơi vào trạng thái quá nhạy cảm, đừng vội kết luận rằng người khác cố ý làm bạn tổn thương. Hãy tách dữ kiện khỏi suy diễn: họ đã nói gì, đã làm gì, mình đang cảm thấy gì, mình cần hỏi lại điều gì. Thói quen này giúp bạn giữ được món quà cảm nhận tinh tế mà không bị cuốn vào vòng nghi ngờ. Số 2 càng trưởng thành càng biết kiểm tra cảm xúc bằng sự rõ ràng.`),
          p(`Ở tầng cao, sứ mệnh số 2 không chỉ là làm người hòa giải cho người khác, mà còn là làm người hòa giải bên trong chính mình. Bạn học cách cho phần mềm yếu và phần mạnh mẽ cùng tồn tại, cho nhu cầu riêng và nhu cầu chung được ngồi cùng bàn. Khi bạn không còn phải chọn giữa yêu người và giữ mình, sự hiện diện của bạn trở thành một nơi rất an toàn.`),
          p(`Một dấu hiệu bạn đang đi đúng đường là các mối quan hệ quanh bạn bớt phải đoán ý nhau. Sự có mặt của bạn khuyến khích mọi người nói thật hơn, lắng nghe chậm hơn và đối xử với khác biệt bằng sự tôn trọng. Khi điều đó xảy ra, sứ mệnh số 2 không còn là sự nhẫn nhịn âm thầm; nó trở thành nghệ thuật tạo hòa hợp có phẩm giá.`),
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
      p(`Điểm sáng của số 3 là khả năng biến không khí thành sân khấu và biến câu chuyện bình thường thành chất liệu có hồn. <strong>{{name}}</strong> có thể làm người khác nhớ một ý tưởng không chỉ vì nó đúng, mà vì nó được truyền đạt bằng nhịp điệu, hình ảnh và cảm xúc. Đây là món quà lớn trong thời đại nhiều thông tin nhưng thiếu tiếng nói có bản sắc.`),
      p(`Trong tình cảm, số 3 thường cần sự vui tươi, tán thưởng và khả năng đối thoại sinh động. Bạn không hợp với mối quan hệ quá khô, quá nặng kiểm soát hoặc xem cảm xúc là điều phiền phức. Tuy vậy, bạn cũng cần học cam kết dài hạn: không bỏ đi chỉ vì cảm hứng giảm xuống, không dùng sự duyên dáng để né một cuộc nói chuyện khó.`),
      p(`Con đường phát triển của bạn là đưa niềm vui vào khuôn để nó trở thành thành tựu. Một tài năng sáng tạo không có nhịp luyện tập sẽ dễ tan thành những mẩu hứng thú rời rạc. Khi bạn chọn một kênh biểu đạt chính, rèn nó đủ lâu và cho nó phục vụ một thông điệp có ích, số 3 trở thành người truyền cảm hứng có chiều sâu.`),
    ].join("\n"),
    subSections: [
      {
        label: "SỰ SÁNG TẠO & BIỂU ĐẠT",
        body: [
          p(`<strong>{{name}}</strong> có xu hướng nhìn cuộc sống qua hình ảnh, câu chuyện và sắc thái. Bạn dễ tìm được cách nói khiến điều phức tạp trở nên gần gũi, điều nặng nề trở nên có thể tiếp nhận.`),
          p(`Khi bạn cho phép mình sáng tạo đều đặn, không đợi cảm hứng hoàn hảo, sứ mệnh số 3 trở thành một dòng chảy có kỷ luật và có giá trị thực tế.`),
          p(`Sự sáng tạo của bạn không nhất thiết phải nằm trong nghệ thuật theo nghĩa hẹp. Nó có thể xuất hiện trong cách bạn giảng giải một vấn đề, xây dựng thương hiệu, thiết kế trải nghiệm khách hàng, viết một bài đăng, kể một câu chuyện bán hàng hoặc làm dịu bầu không khí bằng một câu nói đúng lúc. Khi biết xem sự biểu đạt là kỹ năng cần rèn, bạn sẽ thấy cơ hội nghề nghiệp mở ra rộng hơn.`),
          p(`Lời khuyên là hãy có nơi lưu giữ ý tưởng và nhịp hoàn thành rõ ràng. Số 3 thường có nhiều tia sáng cùng lúc; nếu không ghi lại, chọn lọc và đưa vào lịch, những tia sáng ấy dễ biến mất. Một cuốn sổ, một hệ thống nội dung, một deadline mềm hoặc một người đồng hành có thể giúp bạn biến cảm hứng thành sản phẩm.`),
        ].join("\n"),
      },
      {
        label: "BẢN BAY BỔNG",
        body: [
          p(`Bạn cần không gian để tưởng tượng, thử nghiệm và thay đổi góc nhìn. Sự bay bổng giúp bạn không bị mắc kẹt trong những khuôn mẫu cũ, đồng thời đem lại luồng sinh khí mới cho tập thể.`),
          p(`Nhưng bay bổng cũng cần điểm neo. Hãy có lịch, deadline, người đồng hành hoặc một cam kết đủ rõ để ý tưởng của bạn có thể trở thành sản phẩm, tác phẩm hoặc kết quả cụ thể.`),
          p(`Trí tưởng tượng của bạn giống một cánh cửa mở ra nhiều phòng cùng lúc. Điều này làm đời sống phong phú, nhưng cũng dễ khiến bạn đánh mất thứ tự ưu tiên. Khi quá nhiều khả năng cùng hấp dẫn, hãy quay lại câu hỏi: điều gì đang phục vụ sứ mệnh của mình, điều gì chỉ làm mình xao động trong chốc lát. Câu hỏi đó giúp bạn giữ sự bay bổng mà không trôi khỏi đường chính.`),
          p(`Trong công việc, hãy cho mình những khoảng thử nghiệm có giới hạn. Bạn có thể dành một mùa để học một kỹ năng mới, thử một định dạng mới hoặc kiểm tra một ý tưởng truyền thông mới, nhưng cần mốc đánh giá rõ ràng. Số 3 phát triển đẹp nhất khi được chơi trong một khung đủ rộng và đủ chắc.`),
        ].join("\n"),
      },
      {
        label: "DỄ PHÂN TÁN",
        body: [
          p(`Số 3 dễ bị cuốn theo điều mới trước khi điều cũ kịp chín. Bạn có thể bắt đầu vì thích thú rồi bỏ dở khi cảm xúc hạ xuống. Đây là thử thách lớn nhất của tài năng sáng tạo.`),
          p(`Bài học là chọn ít hơn nhưng đi sâu hơn. Khi <strong>{{name}}</strong> học cách hoàn tất, tiếng nói của bạn sẽ có trọng lượng lớn hơn rất nhiều.`),
          p(`Phân tán của số 3 đôi khi không đến từ lười biếng, mà đến từ sợ sản phẩm cuối cùng không đẹp như cảm hứng ban đầu. Vì vậy bạn cứ giữ mọi thứ ở trạng thái đang làm, đang nghĩ, đang chuẩn bị. Hãy nhớ rằng một tác phẩm chưa hoàn hảo nhưng hoàn tất sẽ dạy bạn nhiều hơn mười ý tưởng còn nằm trong đầu.`),
          p(`Hãy tập kết thúc bằng nghi thức nhỏ: đặt ngày hoàn thành, xuất bản bản đầu tiên, gửi cho người cần đọc, hoặc đóng một dự án để rút kinh nghiệm. Mỗi lần hoàn tất, bạn củng cố niềm tin rằng tiếng nói của mình có thể tạo tác động thật. Đó là cách số 3 đi từ duyên dáng sang có tầm.`),
        ].join("\n"),
      },
      {
        label: "ỨNG DỤNG THỰC TẾ CỦA SỨ MỆNH SỐ 3",
        body: [
          p(`Trong nghề nghiệp, <strong>{{name}}</strong> nên có một kênh biểu đạt chính để năng lực sáng tạo không bị phân tán khắp nơi. Đó có thể là viết, nói, thiết kế, kể chuyện thương hiệu, đào tạo, nội dung số, trình diễn, tư vấn sáng tạo hoặc bất kỳ hình thức nào giúp ý tưởng có hình dạng. Khi có một sân khấu ổn định, số 3 không chỉ tỏa sáng theo khoảnh khắc mà còn tích lũy được uy tín.`),
          p(`Về tài chính, bạn cần biến tài năng thành sản phẩm, gói dịch vụ hoặc năng lực có thể đo được. Số 3 dễ được yêu mến, nhưng sự yêu mến không tự động thành thu nhập nếu thiếu cấu trúc. Hãy định giá công sức, có lịch xuất bản, có danh mục sản phẩm và có cách theo dõi kết quả. Kỷ luật nhẹ nhàng sẽ bảo vệ nguồn cảm hứng của bạn khỏi cảnh làm nhiều mà thu về ít.`),
          p(`Trong quan hệ, bạn nên để người thân thấy cả phần vui tươi lẫn phần nghiêm túc của mình. Nếu luôn dùng hài hước để né tổn thương, người khác sẽ khó chạm đến chiều sâu thật. Số 3 trưởng thành khi dám nói: mình buồn, mình sợ, mình cần được lắng nghe. Khi đó sự duyên dáng của bạn không còn là lớp trang trí, mà trở thành cánh cửa dẫn vào sự chân thành.`),
          p(`Mỗi tháng, hãy hoàn tất một sản phẩm nhỏ: một bài viết, một bản trình bày, một buổi chia sẻ, một thiết kế, một video, một ý tưởng được đóng gói. Đừng chờ điều lớn lao. Chính những lần hoàn tất nhỏ sẽ tạo đường ray cho tài năng số 3, giúp bạn đi từ cảm hứng đẹp sang dấu ấn có thể nhìn thấy và có thể trao đi.`),
        ].join("\n"),
      },
      {
        label: "THỰC HÀNH PHÁT TRIỂN DÀNH CHO SỐ 3",
        body: [
          p(`Khi cảm hứng đến, <strong>{{name}}</strong> nên ghi lại ngay nhưng chưa cần làm ngay. Sau đó hãy quay lại chọn lọc: ý tưởng nào phục vụ thông điệp chính, ý tưởng nào chỉ làm mình vui trong chốc lát, ý tưởng nào có thể hoàn thành trong thời gian thật. Thói quen tách cảm hứng khỏi hành động tức thời giúp số 3 bớt phân tán mà vẫn giữ được sự phong phú tự nhiên.`),
          p(`Bạn nên có lịch sáng tạo cố định, kể cả khi không thấy vui. Đây là bài học quan trọng vì số 3 thường chờ cảm xúc đẹp rồi mới bắt đầu. Nhưng cảm xúc đẹp đôi khi xuất hiện sau khi bạn ngồi xuống làm việc, không phải trước đó. Khi bạn tôn trọng lịch luyện tập, tài năng biểu đạt không còn phụ thuộc hoàn toàn vào tâm trạng; nó trở thành một dòng kỹ năng có thể tin cậy.`),
          p(`Khi giao tiếp, hãy để sự hài hước phục vụ sự thật thay vì che giấu sự thật. Bạn có thể làm bầu không khí nhẹ hơn, nhưng đừng dùng sự duyên dáng để lẩn tránh cam kết, xin lỗi hoặc nói một điều khó. Người khác sẽ tin bạn hơn khi họ thấy phía sau nụ cười là một người có chiều sâu, biết chịu trách nhiệm với lời nói và cảm xúc của mình.`),
          p(`Ở tầng cao, sứ mệnh số 3 là biến đời sống thành ngôn ngữ. Niềm vui, nỗi buồn, thất bại, tình yêu, sự xấu hổ, niềm tin, tất cả đều có thể trở thành chất liệu làm người khác thấy mình không cô đơn. Khi bạn sống thật và diễn đạt thật, món quà sáng tạo của bạn không còn chỉ để gây ấn tượng; nó trở thành một cây cầu nhân văn.`),
          p(`Bạn cũng nên tập phân biệt giữa được chú ý và được thấu hiểu. Được chú ý có thể đến rất nhanh nhờ sự duyên dáng, nhưng được thấu hiểu cần sự nhất quán và chiều sâu. Khi nội dung bạn tạo ra không chỉ làm người khác thích mà còn giúp họ hiểu một điều, nhớ một điều, dám sống thật hơn một chút, số 3 đã bước vào tầng ảnh hưởng trưởng thành.`),
          p(`Hãy để mỗi tác phẩm, mỗi câu nói và mỗi lần xuất hiện của bạn có một mục đích rõ: làm sáng, làm đẹp, làm nhẹ hoặc làm sâu thêm đời sống. Khi mục đích ấy đủ rõ, sự biểu đạt của bạn bớt tản mạn và trở thành một dạng đóng góp có linh hồn.`),
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
      p(`Số 5 có món quà của trải nghiệm: bạn học nhanh khi được đi, được thử, được tiếp xúc với người mới và hoàn cảnh mới. <strong>{{name}}</strong> không sinh ra để hiểu đời sống qua một ô cửa hẹp. Bạn cần nếm nhiều kiểu môi trường, nhiều dạng công việc, nhiều hệ giá trị khác nhau để rút ra ngôn ngữ riêng về tự do, thích nghi và khả năng sống linh hoạt.`),
      p(`Trong các mối quan hệ, bạn cần sự tôn trọng khoảng trời cá nhân. Một tình yêu quá kiểm soát có thể làm bạn nghẹt thở, nhưng một tình yêu không cam kết cũng khiến bạn trôi dạt. Bài học là nói thật về nhu cầu tự do của mình, đồng thời chứng minh bằng hành động rằng tự do không có nghĩa là biến mất, thất hứa hoặc để người kia phải đoán mãi.`),
      p(`Con đường phát triển của số 5 là biến sự ham khám phá thành trí tuệ sống. Mỗi chuyến đi, mỗi lần đổi nghề, mỗi cuộc gặp, mỗi cú rẽ đều cần để lại một bài học rõ. Nếu chỉ tích lũy cảm giác mới, bạn sẽ nhanh chán; nếu biết chưng cất kinh nghiệm thành hiểu biết và chia sẻ nó cho người khác, bạn trở thành người dẫn đường qua biến động.`),
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
          p(`Khả năng thích nghi của bạn rất mạnh khi hoàn cảnh thay đổi bất ngờ. Nơi người khác hoảng, bạn thường nhìn thấy một lối rẽ, một cơ hội học hỏi hoặc một cách xoay chuyển tình thế. Đây là lợi thế lớn trong các lĩnh vực cần giao tiếp, di chuyển, thị trường, truyền thông, bán hàng, sự kiện hoặc các dự án đổi mới liên tục.`),
          p(`Tuy vậy, hãy phân biệt giữa phiêu lưu và tự làm rối đời mình. Một trải nghiệm mới xứng đáng khi nó mở rộng hiểu biết, tăng năng lực hoặc đưa bạn đến gần đời sống thật hơn. Nếu nó chỉ giúp bạn quên đi trách nhiệm trong vài ngày, nó sẽ lấy đi sức mạnh của số 5. Hãy chọn những chuyến đi, những dự án và những thay đổi có chiều sâu.`),
        ].join("\n"),
      },
      {
        label: "DỄ XAO LÃNG",
        body: [
          p(`Vì bị hấp dẫn bởi quá nhiều khả năng, <strong>{{name}}</strong> dễ bỏ ngang khi điều mới xuất hiện. Điều này có thể làm người khác thấy bạn khó đoán hoặc thiếu tin cậy.`),
          p(`Bài học là chọn một vài cam kết chính và bảo vệ chúng. Khi biết neo tự do vào trách nhiệm, bạn trở thành người vừa sống rộng vừa tạo được kết quả thật.`),
          p(`Số 5 thường không sợ cái mới, nhưng lại có thể sợ sự lặp lại. Vấn đề là mọi thành tựu bền vững đều cần một phần lặp lại: luyện kỹ năng, chăm quan hệ, giữ lời hứa, theo dõi tài chính, hoàn thành việc đã nhận. Khi bạn biết đưa sự tò mò vào những việc lặp lại ấy, đời sống không còn khô cứng mà trở thành một hành trình có nhịp.`),
          p(`Một lời khuyên thực tế là hãy xây vài nguyên tắc bất di bất dịch cho mình. Ví dụ: đã hứa thì báo trước nếu thay đổi; đã nhận việc thì có mốc bàn giao; đã cần tự do thì nói thẳng thay vì biến mất. Những nguyên tắc này không trói bạn. Chúng bảo vệ danh dự của bạn, để người khác tin rằng sự linh hoạt của bạn vẫn đáng tin cậy.`),
        ].join("\n"),
      },
      {
        label: "ỨNG DỤNG THỰC TẾ CỦA SỨ MỆNH SỐ 5",
        body: [
          p(`Trong nghề nghiệp, <strong>{{name}}</strong> nên chọn những môi trường có biến động lành mạnh: truyền thông, du lịch, bán hàng, phát triển thị trường, sản phẩm mới, sự kiện, đào tạo trải nghiệm hoặc các vai trò cần đi nhiều, gặp nhiều và học nhanh. Bạn không hợp với chiếc hộp quá kín. Nhưng dù ở đâu, hãy có một trục kỹ năng chính để mọi trải nghiệm đều làm bạn sắc hơn, không chỉ bận rộn hơn.`),
          p(`Về tài chính, số 5 cần kế hoạch chống bốc đồng. Bạn dễ chi cho trải nghiệm, thiết bị mới, chuyến đi, khóa học hoặc cơ hội bất ngờ. Những khoản đó có thể rất đáng giá nếu nằm trong chiến lược phát triển bản thân. Hãy chia ngân sách thành phần tự do và phần bất khả xâm phạm. Khi tự do có ngân sách, bạn vẫn được sống rộng mà không phá hỏng sự ổn định dài hạn.`),
          p(`Trong tình cảm, hãy nói thật về nhu cầu di chuyển, thay đổi và không gian riêng ngay từ đầu. Người yêu bạn không nhất thiết phải giống bạn, nhưng cần hiểu nhịp sống của bạn. Ngược lại, bạn cũng cần chứng minh rằng mình có thể ở lại, lắng nghe và xây dựng khi mối quan hệ bước vào giai đoạn bình thường. Tự do sâu nhất là được chọn gắn bó mà không thấy mình bị nhốt.`),
          p(`Mỗi tháng, hãy chọn một trải nghiệm mới có mục đích và một cam kết cũ cần hoàn tất. Cặp đôi này rất quan trọng với số 5: một bên nuôi sự sống động, một bên rèn độ tin cậy. Khi bạn vừa mở rộng thế giới vừa giữ lời với những điều đã chọn, sứ mệnh tự do của bạn trở thành nguồn cảm hứng có trách nhiệm.`),
        ].join("\n"),
      },
      {
        label: "THỰC HÀNH PHÁT TRIỂN DÀNH CHO SỐ 5",
        body: [
          p(`Khi thấy thôi thúc muốn đổi hướng, <strong>{{name}}</strong> nên dừng lại hỏi: mình đang đi về phía điều sống động hơn, hay đang chạy khỏi phần trách nhiệm khó chịu? Số 5 có trực giác rất tốt với cơ hội mới, nhưng cũng dễ nhầm sự bồn chồn với tiếng gọi thật. Nếu một thay đổi làm bạn tự do hơn và trưởng thành hơn, nó đáng cân nhắc. Nếu nó chỉ giúp bạn thoát khỏi cuộc trò chuyện khó, hãy ở lại thêm một nhịp.`),
          p(`Bạn nên thiết kế đời sống theo mô hình có nhịp đổi mới định kỳ. Thay vì để sự chán nản tích tụ rồi bùng thành quyết định đột ngột, hãy chủ động đưa trải nghiệm mới vào lịch: học một kỹ năng, đi một nơi, gặp một nhóm người, thử một định dạng công việc. Khi nhu cầu tự do được chăm sóc đều, bạn ít phải phá vỡ mọi thứ chỉ để cảm thấy mình còn sống.`),
          p(`Trong giao tiếp, sự thẳng thắn của bạn cần đi cùng sự tinh tế. Bạn có thể nói rất nhanh, rất thật và rất trúng, nhưng nếu thiếu cân nhắc, lời nói dễ thành vết cắt. Hãy tự hỏi người nghe cần sự thật ở liều lượng nào để có thể tiếp nhận. Khi số 5 biết điều chỉnh nhịp truyền đạt, sự chân thật của bạn trở thành món quà, không phải cú sốc.`),
          p(`Ở tầng cao, sứ mệnh số 5 là chứng minh rằng tự do và trách nhiệm không đối nghịch. Bạn có thể đi xa, sống rộng, thay đổi, khám phá, nhưng vẫn giữ lời, giữ phẩm chất và giữ lòng trung thực với điều mình đã chọn. Khi làm được điều đó, bạn trở thành bằng chứng sống rằng đời người có thể linh hoạt mà không lạc hướng.`),
          p(`Một thực hành rất hữu ích là lưu lại nhật ký trải nghiệm: mình đã thử điều gì, học được gì, điều đó thay đổi cách mình nhìn đời ra sao. Số 5 đi qua nhiều chặng, nhưng nếu không ghi nhận bài học, mọi thứ chỉ còn là ký ức rời rạc. Khi bạn biết chưng cất trải nghiệm thành tri thức, những biến động trong đời trở thành kho báu thay vì sự xáo trộn.`),
          p(`Bạn cũng nên xây một nhóm người có thể nhắc mình quay về trục chính. Đó không phải là những người kiểm soát bạn, mà là những người đủ hiểu để hỏi: điều này có thật sự thuộc về con đường của bạn không? Với số 5, một cộng đồng biết tôn trọng tự do nhưng vẫn phản chiếu sự thật sẽ giúp bạn đi xa mà không tự đánh mất mình.`),
          p(`Khi đời sống mở ra quá nhiều lựa chọn, hãy quay về ba tiêu chí: lựa chọn này có làm mình trưởng thành hơn không, có giữ được danh dự của mình không, và có tạo thêm tự do thật sự trong tương lai không? Nếu câu trả lời mơ hồ, hãy chậm lại. Sự chậm lại đúng lúc đôi khi chính là hình thức tự do cao nhất của số 5.`),
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
      p(`Số 6 có một vẻ đẹp rất đời: bạn biết nhìn thấy nơi nào cần được sắp lại, ai đang cần được quan tâm, điều gì trong một mái nhà hoặc một tập thể đang mất cân bằng. <strong>{{name}}</strong> có thể đem lại cảm giác ấm áp, trật tự và đáng tin. Đây là năng lực lớn trong gia đình, dịch vụ, giáo dục, tư vấn, thẩm mỹ, nhân sự và mọi công việc đặt con người ở trung tâm.`),
      p(`Trong tình cảm, bạn thường yêu bằng hành động. Bạn chăm sóc, nhớ chi tiết, lo trước điều cần lo và muốn người mình thương được sống tốt hơn. Nhưng tình yêu của số 6 cần tránh biến thành dự án sửa chữa người khác. Không ai có thể lớn lên nếu luôn bị đặt dưới ánh nhìn đánh giá. Khi bạn biết thương mà vẫn tôn trọng nhịp trưởng thành riêng của người kia, tình yêu trở nên dịu và bền hơn.`),
      p(`Con đường phát triển của bạn là chấp nhận sự không hoàn hảo mà vẫn giữ tiêu chuẩn đẹp. Bạn không cần hạ thấp lý tưởng về gia đình, đạo đức hay trách nhiệm; bạn chỉ cần để lý tưởng ấy có chỗ cho con người thật, với mỏi mệt, sai sót và giới hạn. Khi lòng tốt có ranh giới, số 6 trở thành nguồn nâng đỡ lành mạnh cho rất nhiều người.`),
    ].join("\n"),
    subSections: [
      {
        label: "TÌNH YÊU & TRÁCH NHIỆM GIA ĐÌNH",
        body: [
          p(`<strong>{{name}}</strong> có xu hướng xây mái nhà, cả nghĩa đen lẫn nghĩa bóng. Bạn muốn những người quan trọng được an ổn, được quan tâm, được sống trong một trật tự giàu tình cảm.`),
          p(`Gia đình có thể là nguồn sức mạnh lớn, nhưng cũng là nơi bạn dễ gánh trách nhiệm quá mức. Hãy nhớ: tình yêu bền vững cần cả chăm sóc lẫn tự do.`),
          p(`Với số 6, khái niệm gia đình có thể rộng hơn huyết thống. Đó là nhóm người bạn chọn bảo vệ, cộng đồng bạn muốn vun đắp, không gian bạn muốn làm cho tử tế hơn. Bạn có thiên hướng tạo nơi chốn: một căn nhà, một đội nhóm, một thương hiệu hoặc một dịch vụ khiến người khác thấy mình được đón nhận và được chăm chút.`),
          p(`Hãy cẩn thận với niềm tin rằng mọi thứ chỉ ổn khi bạn tự tay lo hết. Niềm tin đó có vẻ cao thượng nhưng dễ làm bạn kiệt sức và làm người khác phụ thuộc. Một gia đình hoặc tập thể khỏe mạnh là nơi trách nhiệm được chia sẻ. Khi bạn dám giao việc, dám nhờ giúp và dám để người khác làm theo cách của họ, tình yêu của bạn có thêm không gian để thở.`),
        ].join("\n"),
      },
      {
        label: "BẢN BẢO BỌC",
        body: [
          p(`Bạn bảo vệ người mình thương bằng hành động thực tế. Bạn nhìn thấy điều cần sửa, cần chuẩn bị, cần phòng ngừa. Đây là phẩm chất quý trong một thế giới nhiều bất ổn.`),
          p(`Tuy vậy, bảo bọc quá mức có thể làm người khác khó trưởng thành. Hãy hỏi họ cần gì trước khi tự quyết định điều gì là tốt nhất cho họ.`),
          p(`Bản năng bảo vệ của bạn rất quý khi có khủng hoảng. Bạn thường là người nhớ thuốc men, giấy tờ, lịch hẹn, bữa ăn, khoản tiền cần chuẩn bị hoặc lời động viên đúng lúc. Chính những việc nhỏ đó tạo nên cảm giác an toàn. Nhưng hãy để sự chu đáo đi cùng câu hỏi: người kia đang cần được hỗ trợ, hay cần được tin tưởng để tự đứng lên?`),
          p(`Trong công việc, năng lực bảo bọc biến thành khả năng quản lý chất lượng và trải nghiệm. Bạn nhìn thấy điểm chưa đẹp, quy trình chưa thuận, cảm xúc khách hàng chưa được chăm. Nếu dùng đúng, bạn có thể nâng tiêu chuẩn dịch vụ lên rất cao. Nếu dùng quá mức, bạn dễ soi lỗi và làm người khác căng thẳng. Hãy nhớ mục tiêu là làm tốt hơn, không phải làm mọi thứ hoàn hảo đến ngột ngạt.`),
        ].join("\n"),
      },
      {
        label: "NGUY CƠ HY SINH BẢN THÂN",
        body: [
          p(`Số 6 dễ xem việc mệt mỏi của mình là bình thường, miễn là người khác ổn. Nhưng nếu bạn luôn cho đi từ phần cạn kiệt, sự dịu dàng sẽ dần biến thành trách móc âm thầm.`),
          p(`Bài học là chăm sóc bản thân như một phần của trách nhiệm, không phải phần thưởng sau khi mọi người đã ổn. Bạn cũng xứng đáng được nâng đỡ.`),
          p(`Khi số 6 hy sinh quá lâu, sự dịu dàng có thể biến thành trách móc âm thầm. Bạn vẫn làm, vẫn lo, vẫn cười, nhưng bên trong thấy không ai hiểu mình. Đó là dấu hiệu ranh giới đã bị bỏ quên. Hãy nói ra nhu cầu trước khi nó thành oán giận; hãy nghỉ trước khi cơ thể buộc bạn phải dừng lại.`),
          p(`Một thực hành cần thiết là lập danh sách điều bạn nhận lại, không chỉ điều bạn cho đi. Bạn cần niềm vui riêng, bạn bè riêng, thời gian riêng và những mục tiêu không chỉ xoay quanh việc làm người khác ổn. Khi đời sống của bạn có nguồn nuôi dưỡng riêng, sự chăm sóc bạn trao đi sẽ trong trẻo hơn và ít đòi hỏi đền đáp hơn.`),
        ].join("\n"),
      },
      {
        label: "ỨNG DỤNG THỰC TẾ CỦA SỨ MỆNH SỐ 6",
        body: [
          p(`Trong nghề nghiệp, <strong>{{name}}</strong> nên chọn nơi trách nhiệm của bạn tạo ra chất lượng sống tốt hơn cho người khác: giáo dục, tư vấn, dịch vụ khách hàng cao cấp, nhân sự, quản lý vận hành, thiết kế không gian, chăm sóc cộng đồng hoặc các vai trò cần sự tin cậy lâu dài. Bạn làm tốt khi thấy công việc của mình không chỉ hoàn thành nhiệm vụ, mà còn làm một hệ thống trở nên nhân văn hơn.`),
          p(`Về tài chính, số 6 cần tránh chi tiêu vì cảm giác phải lo cho mọi người. Bạn có thể mua quà, hỗ trợ gia đình, đứng ra gánh chi phí hoặc nhận phần thiệt về mình vì muốn giữ hòa khí. Hãy lập ranh giới tài chính rõ: khoản nào là trách nhiệm, khoản nào là tình cảm, khoản nào vượt quá khả năng. Sự rõ ràng giúp lòng tốt của bạn bền hơn.`),
          p(`Trong tình yêu, hãy để đối phương được là người lớn bên cạnh bạn, không phải một người cần được bạn quản lý. Bạn có thể chăm sóc rất sâu, nhưng cũng cần học cách nhận chăm sóc. Khi bạn dám nói mình mệt, mình cần ôm, mình cần được lắng nghe, mối quan hệ trở thành hai chiều. Đó là nơi số 6 thật sự được nuôi dưỡng chứ không chỉ liên tục cho đi.`),
          p(`Mỗi tháng, hãy chọn một việc chăm sóc bản thân có lịch cố định và một việc cải thiện không gian sống. Hai hành động này đưa sứ mệnh số 6 về đúng nền: yêu thương có hình dạng, có trật tự và có sự cân bằng. Khi nhà bên trong của bạn ổn, bạn mới có thể làm điểm tựa ổn cho người khác.`),
        ].join("\n"),
      },
      {
        label: "THỰC HÀNH PHÁT TRIỂN DÀNH CHO SỐ 6",
        body: [
          p(`Khi muốn giúp ai đó, <strong>{{name}}</strong> nên hỏi ba câu trước khi hành động: người này có thật sự cần mình giúp không, họ đã tự làm phần của họ chưa, và mình có đủ sức để giúp mà không oán trách không? Ba câu hỏi này giúp lòng tốt của bạn đi đúng đường. Số 6 không thiếu tình thương; điều cần rèn là sự sáng suốt để tình thương không biến thành gánh nặng một chiều.`),
          p(`Bạn nên có một hệ thống chăm sóc bản thân cụ thể như cách bạn chăm người khác. Lịch nghỉ, bữa ăn, khám sức khỏe, không gian riêng, tài chính cá nhân và thời gian vui chơi không phải phần thừa. Chúng là nền móng để bạn tiếp tục trao đi mà không cạn. Khi số 6 coi bản thân là một người cũng cần được bảo vệ, sứ mệnh phục vụ trở nên cân bằng hơn.`),
          p(`Trong gia đình hoặc đội nhóm, hãy tập giao trách nhiệm theo năng lực của từng người. Bạn có thể hướng dẫn, kiểm tra và hỗ trợ, nhưng không nên lấy hết phần học hỏi của người khác. Đôi khi yêu thương là để người kia tự va chạm với hậu quả vừa đủ. Khi bạn bớt làm thay, những người xung quanh có cơ hội trưởng thành, còn bạn có cơ hội thở.`),
          p(`Ở tầng cao, sứ mệnh số 6 là tạo ra những không gian khiến con người sống tử tế hơn. Đó có thể là một mái nhà, một lớp học, một dịch vụ, một đội nhóm hoặc một thương hiệu. Khi bạn kết hợp tình yêu với tiêu chuẩn, lòng tốt với ranh giới, thẩm mỹ với trách nhiệm, bạn trở thành người xây tổ ấm theo nghĩa rất rộng của đời sống.`),
          p(`Dấu hiệu tích cực của số 6 là người khác ở gần bạn thấy mình muốn sống có trách nhiệm hơn, không phải chỉ muốn dựa vào bạn. Khi sự chăm sóc của bạn khơi dậy phần tốt đẹp trong họ, thay vì làm họ lệ thuộc, bạn đã đặt tình yêu đúng vị trí. Đó là sự nâng đỡ trưởng thành, có hơi ấm nhưng không đánh mất ranh giới.`),
          p(`Hãy nhớ rằng sự đẹp đẽ bạn tìm kiếm không cần hoàn hảo tuyệt đối. Một căn nhà có tiếng cười, một đội nhóm biết xin lỗi, một mối quan hệ biết sửa sai vẫn quý hơn một bề mặt chỉn chu nhưng căng cứng. Khi số 6 cho phép đời sống được thật, tình yêu của bạn trở nên dễ thở hơn.`),
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
      p(`Số 7 có khả năng đào sâu đến tận lõi vấn đề. <strong>{{name}}</strong> thường không hài lòng với câu trả lời dễ dãi; bạn muốn biết vì sao, cơ chế nào, quy luật nào, ý nghĩa nào đang vận hành phía sau. Nhờ vậy, bạn có thể trở thành người giữ chuẩn mực tri thức, người kiểm chứng, người phân tích hoặc người soi sáng những điểm mà bề mặt ồn ào đã che khuất.`),
      p(`Trong tình cảm, bạn cần người tôn trọng không gian riêng và chiều sâu suy nghĩ. Bạn không dễ mở lòng với sự vội vàng, cũng không hợp với những mối quan hệ chỉ sống bằng bề nổi. Nhưng nếu khép kín quá lâu, người yêu thương bạn sẽ không biết cách bước lại gần. Bài học là chia sẻ từng lớp, đúng người, đúng nhịp, để sự riêng tư không trở thành bức tường lạnh.`),
      p(`Con đường phát triển của bạn là biến tri thức thành sự hiện diện có ích. Biết nhiều không đủ; số 7 cần học cách giảng giải, viết lại, ứng dụng, tư vấn hoặc tạo hệ thống để hiểu biết của mình đi vào đời sống. Khi trí tuệ có lòng khiêm nhường và khả năng phụng sự, bạn trở thành người dẫn đường âm thầm nhưng rất sâu.`),
    ].join("\n"),
    subSections: [
      {
        label: "CHIỀU SÂU TÂM LINH",
        body: [
          p(`<strong>{{name}}</strong> có nhu cầu tự hỏi về ý nghĩa của đời sống, về lý do phía sau các biến cố và về cấu trúc vô hình của con người. Bạn không dễ hài lòng với lời giải thích nông.`),
          p(`Chiều sâu này giúp bạn nhìn xa hơn bề mặt, nhưng cần được cân bằng bằng đời sống thực tế: cơ thể, công việc, gia đình, cam kết và những việc nhỏ mỗi ngày.`),
          p(`Chiều sâu nội tâm của bạn có thể mở ra những câu hỏi lớn về ý nghĩa, số phận, đạo đức, niềm tin và vị trí của con người trong thế giới. Đó là vùng đất quý, nhưng cũng cần sự tỉnh táo. Hãy để những tìm kiếm vô hình làm đời sống cụ thể tốt hơn: tử tế hơn trong lời nói, rõ ràng hơn trong lựa chọn, bền bỉ hơn trong công việc.`),
          p(`Bạn nên có những khoảng tĩnh đều đặn để đọc, ghi chép, suy ngẫm hoặc nghiên cứu. Số 7 không thể sống quá lâu trong ồn ào mà không suy giảm năng lực. Tuy vậy, sau mỗi giai đoạn đi vào bên trong, hãy quay lại với một hành động cụ thể. Một hiểu biết chỉ thật sự trưởng thành khi nó làm thay đổi cách bạn sống.`),
        ].join("\n"),
      },
      {
        label: "BẢN KÍN ĐÁO",
        body: [
          p(`Bạn thường giữ nhiều điều trong lòng và chỉ chia sẻ khi thật sự tin tưởng. Sự kín đáo giúp bạn tránh ồn ào, nhưng cũng khiến người khác khó hiểu bạn đang cần gì.`),
          p(`Hãy chọn một vài người đủ tin cậy để mở lòng. Không phải ai cũng cần biết thế giới bên trong của bạn, nhưng nếu không ai được bước vào, bạn sẽ rất dễ cô đơn.`),
          p(`Sự kín đáo giúp bạn bảo vệ năng lượng tinh thần và tránh những cuộc nói chuyện hời hợt. Nhưng nếu biến kín đáo thành thói quen giấu mọi nhu cầu, bạn sẽ khiến người khác phải đoán, còn mình thì âm thầm thất vọng vì không được hiểu. Hãy tập nói một phần sự thật trước, đủ rõ để người thân biết bạn đang ở đâu trong lòng mình.`),
          p(`Trong môi trường làm việc, bạn có thể không phải người nói nhiều nhất nhưng thường là người nhìn ra lỗ hổng quan trọng. Đừng để sự dè dặt làm bạn im lặng khi cần lên tiếng. Một nhận xét chính xác, được nói đúng lúc, có thể cứu cả dự án khỏi sai hướng. Sự kín đáo của bạn nên là chiều sâu, không phải sự vắng mặt.`),
        ].join("\n"),
      },
      {
        label: "NGUY CƠ CÔ LẬP",
        body: [
          p(`Số 7 có thể dùng lý trí để tránh cảm xúc. Bạn phân tích rất giỏi, nhưng đôi khi điều cần thiết không phải thêm một lập luận, mà là một cuộc trò chuyện thật.`),
          p(`Bài học là tham gia vào đời sống mà không đánh mất chiều sâu. Bạn có thể vừa là người quan sát sắc bén, vừa là người hiện diện chân thành.`),
          p(`Cô lập thường bắt đầu rất hợp lý: bạn cần yên tĩnh, cần tự suy nghĩ, cần tránh người ồn ào. Nhưng nếu kéo dài, nó có thể làm thế giới bên trong của bạn trở nên quá lớn còn đời sống bên ngoài quá nhỏ. Khi đó, mọi va chạm đều mệt mỏi hơn. Hãy duy trì vài mối kết nối đều đặn, ít nhưng thật, để bạn không đánh mất cảm giác thuộc về.`),
          p(`Một cách cân bằng tốt là chọn cộng đồng có chiều sâu: nhóm học thuật, nhóm thực hành tâm linh nghiêm túc, nhóm đọc sách, nhóm nghiên cứu, hoặc một vòng bạn bè biết tôn trọng im lặng. Bạn không cần đông người. Bạn cần những nơi mà trí tuệ của mình được thử thách và trái tim của mình vẫn được đối xử tử tế.`),
        ].join("\n"),
      },
      {
        label: "ỨNG DỤNG THỰC TẾ CỦA SỨ MỆNH SỐ 7",
        body: [
          p(`Trong nghề nghiệp, <strong>{{name}}</strong> nên chọn những vai trò cho phép đào sâu thay vì chỉ xử lý bề mặt: nghiên cứu, phân tích, chiến lược, công nghệ, dữ liệu, giáo dục chuyên sâu, tư vấn, viết lách, triết học ứng dụng hoặc các lĩnh vực cần kiểm chứng nghiêm túc. Bạn có thể không thích môi trường quá ồn ào, nhưng lại rất mạnh trong những bài toán cần sự tập trung, sự độc lập và khả năng nhìn ra quy luật.`),
          p(`Về tài chính, số 7 cần tránh quyết định vì nghi ngờ quá mức hoặc vì muốn có đủ mọi dữ kiện mới dám hành động. Nghiên cứu là lợi thế, nhưng nếu kéo dài vô tận sẽ làm cơ hội đi qua. Hãy đặt thời hạn cho việc tìm hiểu, sau đó chọn bước thử nghiệm nhỏ. Cách này giúp bạn giữ sự thận trọng mà vẫn không bị mắc kẹt trong vòng phân tích.`),
          p(`Trong tình cảm, bạn nên nói rõ nhu cầu cần không gian thay vì biến mất trong im lặng. Người khác có thể tôn trọng sự riêng tư của bạn nếu họ hiểu đó là cách bạn nạp lại tinh thần, không phải dấu hiệu lạnh nhạt. Ngược lại, bạn cũng cần có những thời điểm hiện diện trọn vẹn: đặt điện thoại xuống, nhìn vào mắt người đối diện và chia sẻ điều thật sự đang diễn ra bên trong.`),
          p(`Mỗi tháng, hãy chọn một chủ đề để đào sâu và một cách để chia sẻ lại. Đó có thể là một bài ghi chú, một buổi trò chuyện, một tài liệu hướng dẫn hoặc một quyết định được cải thiện nhờ nghiên cứu. Khi tri thức đi ra khỏi căn phòng riêng và trở thành giá trị cho người khác, sứ mệnh số 7 được thực thi rất đẹp.`),
        ].join("\n"),
      },
      {
        label: "THỰC HÀNH PHÁT TRIỂN DÀNH CHO SỐ 7",
        body: [
          p(`Khi bắt đầu một giai đoạn học hỏi, <strong>{{name}}</strong> nên xác định câu hỏi trung tâm thay vì gom quá nhiều mảnh tri thức rời rạc. Số 7 rất dễ đi sâu vào nhiều đường hầm cùng lúc, rồi quên mình đang tìm câu trả lời cho điều gì. Một câu hỏi trung tâm sẽ giúp bạn chọn sách, chọn người thầy, chọn dữ kiện và chọn trải nghiệm phù hợp hơn. Chiều sâu cần một trục, nếu không nó sẽ thành mê cung.`),
          p(`Bạn nên có nhịp chuyển hóa tri thức thành sản phẩm. Sau một thời gian nghiên cứu, hãy viết một bản tổng kết, tạo một sơ đồ, dạy lại cho ai đó, áp dụng vào quyết định công việc hoặc biến nó thành quy trình. Số 7 thường thấy mình chưa biết đủ, nhưng thế giới không cần bạn hoàn hảo mới được chia sẻ. Thế giới cần phần hiểu biết đã chín của bạn được trao bằng sự khiêm nhường.`),
          p(`Khi nghi ngờ ai đó, hãy phân biệt giữa trực giác và nỗi sợ bị tổn thương. Trực giác thường rõ, lặng và có dữ kiện tinh tế; nỗi sợ thường lặp đi lặp lại, khiến bạn muốn rút lui hoàn toàn. Nếu chưa chắc, hãy hỏi thẳng bằng giọng bình tĩnh. Một cuộc trò chuyện rõ ràng có thể giúp bạn tiết kiệm rất nhiều ngày tự phân tích trong im lặng.`),
          p(`Ở tầng cao, sứ mệnh số 7 là đưa ánh sáng của hiểu biết vào những nơi mơ hồ. Bạn không cần trở thành người nói nhiều; bạn cần trở thành người nói đúng, viết đúng, phân tích đúng và sống đúng với điều mình đã thấy. Khi tri thức đi cùng sự chính trực, sự hiện diện lặng lẽ của bạn cũng có sức ảnh hưởng rất lớn.`),
          p(`Bạn cũng cần cho phép mình có những kết luận tạm thời. Không phải vấn đề nào cũng chờ được đến khi bạn chắc chắn tuyệt đối. Đôi khi đời sống cần một quyết định đủ đúng, rồi điều chỉnh sau khi có thêm dữ kiện. Khi số 7 học cách hành động với mức hiểu biết hiện có, trí tuệ của bạn bước ra khỏi phòng nghiên cứu và bắt đầu tạo kết quả.`),
          p(`Một dấu hiệu bạn đang dùng đúng sứ mệnh là người khác tìm đến bạn không chỉ để lấy câu trả lời, mà để học cách suy nghĩ sâu hơn. Khi bạn giúp họ tự đặt câu hỏi tốt hơn, tri thức của bạn không tạo sự phụ thuộc; nó mở ra năng lực nhận biết cho người đối diện.`),
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
      p(`Số 8 mang bài học về quyền lực trong đời sống thực tế: tiền bạc, vị thế, tài sản, hệ thống, luật chơi và khả năng ra quyết định dưới áp lực. <strong>{{name}}</strong> thường không thể né những chủ đề này quá lâu. Dù bạn chọn kinh doanh, quản trị, đầu tư, điều hành hay một vai trò chuyên môn, cuộc đời vẫn sẽ đặt bạn trước câu hỏi: bạn dùng năng lực tạo ảnh hưởng để xây điều gì?`),
      p(`Trong quan hệ, số 8 cần học cách hiện diện bằng cảm xúc chứ không chỉ bằng trách nhiệm vật chất. Bạn có thể lo được nhiều thứ, giải quyết được nhiều việc, bảo vệ người thân bằng hành động cụ thể, nhưng người bên cạnh vẫn cần nghe lời dịu dàng, cần thấy bạn mềm xuống và cần biết họ không chỉ là một phần trong kế hoạch thành công của bạn.`),
      p(`Con đường phát triển của bạn là cân bằng tham vọng với đạo đức. Thành tựu lớn không sai; tiền bạc không xấu; quyền lực không tự nó là bóng tối. Điều quyết định là cách bạn đạt được, cách bạn đối xử với người yếu thế hơn và cách bạn dùng phần thặng dư mình có. Khi số 8 có nguyên tắc, thành công của bạn tạo cấu trúc cho nhiều người khác cùng đi lên.`),
    ].join("\n"),
    subSections: [
      {
        label: "QUYỀN LỰC & THỊNH VƯỢNG",
        body: [
          p(`<strong>{{name}}</strong> có khả năng thu hút trách nhiệm lớn và những bài toán liên quan đến tài nguyên. Bạn thường được đặt vào vị trí cần quyết đoán, tính toán và chịu trách nhiệm cho kết quả.`),
          p(`Thịnh vượng với số 8 không chỉ là tích lũy; đó là năng lực tổ chức dòng chảy vật chất để tạo ra giá trị bền hơn cho bản thân, gia đình và tập thể.`),
          p(`Bạn có khả năng cảm nhận nơi nào nguồn lực đang bị lãng phí, nơi nào cần người đứng ra quyết định, nơi nào một mô hình có thể sinh giá trị lớn hơn. Đây là lý do số 8 thường hợp với kinh doanh, tài chính, vận hành, bất động sản, quản trị hoặc các vị trí cần chịu trách nhiệm về kết quả cuối cùng. Bạn không ngại bài toán lớn nếu thấy nó xứng đáng.`),
          p(`Tuy vậy, quyền lực của số 8 cần được soi bằng câu hỏi đạo đức thường xuyên. Một quyết định có lợi nhưng làm tổn hại niềm tin dài hạn sẽ không thật sự là thắng lợi. Một thành công khiến bạn đánh mất sự tôn trọng dành cho chính mình cũng không phải thành công. Khi bạn chọn điều bền thay vì điều nhanh, vận số 8 trở nên rất mạnh.`),
        ].join("\n"),
      },
      {
        label: "TƯ DUY KINH DOANH",
        body: [
          p(`Bạn có thể nhìn một ý tưởng dưới góc độ khả thi: nguồn lực ở đâu, vận hành thế nào, rủi ro là gì, lợi ích có xứng đáng không. Đây là tư duy rất mạnh để xây hệ thống.`),
          p(`Khi kết hợp sự quyết đoán với dữ liệu và đạo đức, bạn có thể trở thành người điều hành đáng tin. Đừng chỉ hỏi điều gì sinh lợi; hãy hỏi điều gì xứng đáng được xây.`),
          p(`Tư duy kinh doanh của bạn không nhất thiết chỉ dùng để mở công ty. Nó có thể xuất hiện trong cách bạn quản lý ngân sách gia đình, phát triển một thương hiệu cá nhân, xây quỹ dự phòng, tối ưu nguồn lực cho đội nhóm hoặc biến kỹ năng của mình thành một hệ sinh thái giá trị. Số 8 nhìn đời sống qua lăng kính hiệu quả, nhưng hiệu quả cần đi cùng nhân tính.`),
          p(`Hãy rèn thói quen đo lường mà không lạnh lùng. Số liệu giúp bạn tỉnh táo, nhưng con người không chỉ là số liệu. Một nhà điều hành giỏi biết nhìn báo cáo, nhưng cũng biết lắng nghe câu chuyện phía sau báo cáo ấy. Khi bạn kết hợp thực tế với sự công bằng, người khác sẽ tin vào quyền lãnh đạo của bạn thay vì chỉ sợ quyền đó.`),
        ].join("\n"),
      },
      {
        label: "NGUY CƠ THAM VỌNG MÙ QUÁNG",
        body: [
          p(`Số 8 dễ bị cuốn vào mục tiêu kế tiếp mà quên kiểm tra cái giá phải trả. Bạn có thể trở nên quá cứng, quá vội hoặc xem cảm xúc là thứ làm chậm tiến độ.`),
          p(`Bài học là nhớ rằng quyền lực luôn đi cùng hậu quả. Thành công thật sự không khiến bạn mất nhân tính; nó làm cho năng lực của bạn phục vụ được nhiều điều đúng hơn.`),
          p(`Tham vọng mù quáng thường bắt đầu bằng một lý do nghe rất hợp lý: muốn chứng minh, muốn bảo đảm an toàn, muốn không thua ai, muốn gia đình tự hào. Nhưng nếu không dừng lại để hỏi mình đang đánh đổi điều gì, bạn có thể đi rất xa rồi mới nhận ra bên trong trống rỗng. Số 8 cần mục tiêu lớn, nhưng mục tiêu ấy phải còn giữ được linh hồn.`),
          p(`Một thực hành tốt là định nghĩa thành công bằng nhiều tầng: tài chính, sức khỏe, gia đình, danh dự, đóng góp và sự bình an nội tâm. Nếu chỉ một tầng tăng lên còn các tầng khác sụp xuống, đó không phải thịnh vượng đầy đủ. Khi bạn biết xây thành tựu đa tầng, tham vọng của bạn trở thành sức mạnh kiến tạo thay vì áp lực đè nặng.`),
        ].join("\n"),
      },
      {
        label: "ỨNG DỤNG THỰC TẾ CỦA SỨ MỆNH SỐ 8",
        body: [
          p(`Trong nghề nghiệp, <strong>{{name}}</strong> nên đặt mình ở nơi có bài toán thật về nguồn lực: tăng trưởng, doanh thu, vận hành, đầu tư, quản trị con người, kiểm soát rủi ro hoặc xây hệ thống có khả năng mở rộng. Bạn học tốt nhất khi có trách nhiệm rõ và thước đo kết quả cụ thể. Những môi trường chỉ nói lý tưởng nhưng thiếu thực thi sẽ nhanh chóng làm năng lực số 8 của bạn bị tù túng.`),
          p(`Về tài chính, bạn cần một triết lý tiền bạc riêng. Không chỉ kiếm được bao nhiêu, mà tiền đến từ đâu, đi về đâu, phục vụ điều gì và có làm bạn tự do hơn không. Hãy xây quỹ dự phòng, học quản trị tài sản, hiểu đòn bẩy và biết giới hạn rủi ro. Số 8 có thể đi xa với tiền bạc, nhưng chỉ khi tiền bạc được đặt dưới kỷ luật và đạo đức.`),
          p(`Trong tình cảm, hãy nhớ người thân không chỉ cần sự bảo đảm vật chất. Họ cần thời gian, sự mềm mại, lời hỏi han và cảm giác bạn thật sự có mặt. Nếu bạn chỉ thể hiện tình yêu bằng việc giải quyết vấn đề, mối quan hệ có thể trở nên hiệu quả nhưng thiếu ấm áp. Sứ mệnh số 8 trưởng thành khi biết đặt trái tim vào lịch trình bận rộn của mình.`),
          p(`Mỗi quý, hãy đánh giá lại ba loại tài sản: tài sản vật chất, tài sản quan hệ và tài sản danh dự. Nếu một quyết định làm tăng tiền nhưng làm giảm niềm tin, hãy xem lại. Nếu một mục tiêu làm tăng vị thế nhưng bào mòn sức khỏe, hãy điều chỉnh. Khi bạn quản trị đời sống như một hệ thống toàn diện, quyền lực của bạn trở nên bền và đẹp hơn.`),
        ].join("\n"),
      },
      {
        label: "THỰC HÀNH PHÁT TRIỂN DÀNH CHO SỐ 8",
        body: [
          p(`Khi đặt mục tiêu lớn, <strong>{{name}}</strong> nên viết rõ ba tầng kết quả: điều bạn muốn đạt, cái giá bạn sẵn sàng trả, và giới hạn bạn không vượt qua. Số 8 có sức chịu áp lực cao nên đôi khi quen với việc cố thêm, đẩy thêm, thắng thêm. Nhưng thành công không có giới hạn đạo đức sẽ dễ biến thành vòng xoáy. Việc xác định ranh giới từ đầu giúp bạn đi nhanh mà không đánh mất phương hướng.`),
          p(`Bạn nên có lịch kiểm tra tài chính và quyền lực cá nhân đều đặn. Quyền lực không chỉ nằm ở tiền; nó nằm ở người phụ thuộc vào bạn, quyết định bạn được quyền đưa ra, thông tin bạn nắm giữ và ảnh hưởng bạn tạo ra. Hãy hỏi: mình đang dùng những thứ này để nâng hệ thống lên hay để kiểm soát vì bất an? Câu hỏi ấy giúp số 8 giữ được sự trong sạch của sức mạnh.`),
          p(`Trong công việc, hãy rèn khả năng trao quyền. Một số 8 mạnh thường muốn tự kiểm soát các điểm quan trọng vì sợ sai sót, nhưng nếu không xây đội ngũ, bạn sẽ trở thành nút cổ chai của chính hệ thống mình tạo ra. Hãy chọn người, đào tạo tiêu chuẩn, giao phạm vi rõ và kiểm tra bằng dữ kiện. Khi người khác lớn lên trong hệ thống của bạn, thành tựu mới thật sự mở rộng.`),
          p(`Ở tầng cao, sứ mệnh số 8 là làm chủ vật chất mà không bị vật chất làm chủ. Bạn có thể xây tài sản, vị thế, doanh nghiệp, danh tiếng, nhưng vẫn nhớ rằng tất cả chỉ là phương tiện để tạo giá trị và bảo vệ điều đúng. Khi quyền lực đi cùng lòng tự trọng và trách nhiệm xã hội, số 8 trở thành một trụ cột rất mạnh của cộng đồng.`),
          p(`Một dấu hiệu cần chú ý là khi bạn bắt đầu xem mọi thứ như cuộc đua phải thắng. Số 8 phát triển bền hơn khi biết có những chiến thắng không đáng theo, có những thương vụ không đáng nhận và có những vị trí không đáng đánh đổi sự bình an. Khả năng từ chối cơ hội không phù hợp cũng là một dạng quyền lực rất trưởng thành.`),
          p(`Khi bạn đủ mạnh để chọn điều đúng ngay cả lúc điều sai có vẻ sinh lợi nhanh hơn, sứ mệnh số 8 bước vào tầng rất sáng. Đó là lúc thành tựu không chỉ làm bạn lớn lên, mà còn làm hệ thống xung quanh trở nên công bằng và đáng tin hơn.`),
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
      p(`Số 9 mang một tầm nhìn rộng về con người. <strong>{{name}}</strong> thường không chỉ quan tâm chuyện của riêng mình; bạn dễ bị chạm bởi những câu chuyện bất công, mất mát, hy vọng và những phận người cần được nhìn thấy. Đây là chất liệu của người nghệ sĩ, nhà giáo dục, người làm cộng đồng, người truyền cảm hứng hoặc bất kỳ ai muốn để lại một dấu ấn nhân văn.`),
      p(`Trong tình cảm, số 9 có thể rất lãng mạn, hào phóng và giàu tưởng tượng. Bạn dễ yêu bằng một hình ảnh đẹp về người kia, rồi thất vọng khi họ hiện ra với đầy đủ giới hạn của con người thật. Bài học là yêu người đang ở trước mặt, không chỉ yêu tiềm năng hoặc câu chuyện bạn tự viết về họ. Khi lý tưởng đi cùng sự thật, trái tim bạn bớt đau hơn.`),
      p(`Con đường phát triển của bạn là học cách buông bỏ đúng lúc. Có những mối quan hệ, vai trò, dự án hoặc nỗi buồn từng rất quan trọng nhưng đã hoàn thành bài học của chúng. Nếu cứ giữ lại vì thương, vì tiếc hoặc vì sợ mình trở nên ích kỷ, bạn sẽ không còn đủ chỗ cho sứ mệnh mới. Số 9 cần biết khép lại để tình yêu được tái sinh trong hình thức trưởng thành hơn.`),
    ].join("\n"),
    subSections: [
      {
        label: "TÌNH YÊU NHÂN LOẠI",
        body: [
          p(`<strong>{{name}}</strong> có khả năng nhìn thấy con người phía sau lỗi lầm, nỗi sợ và vẻ ngoài. Bạn dễ động lòng trước bất công, khổ đau hoặc những số phận bị bỏ quên.`),
          p(`Tình yêu rộng này là tài sản quý, nhưng cần đi cùng sự tỉnh táo. Không phải ai bạn thương cũng cần bạn cứu; đôi khi điều nhân ái nhất là trao sự tôn trọng và ranh giới.`),
          p(`Tình yêu nhân loại của số 9 có thể biểu hiện rất cụ thể: bạn muốn làm một sản phẩm có ích, kể một câu chuyện khiến người khác mở lòng, tham gia hoạt động cộng đồng, dạy một điều giúp ai đó đổi đời hoặc đơn giản là sống tử tế hơn trong những tương tác nhỏ. Đừng xem lòng tốt chỉ là cảm xúc; với bạn, nó cần trở thành hành động có hình dạng.`),
          p(`Nhưng tình yêu rộng cũng cần một trung tâm vững. Nếu bạn ôm quá nhiều nỗi đau không thuộc phần mình, bạn sẽ dần kiệt sức và có thể trở nên cay đắng. Hãy chọn một vài hướng phụng sự rõ ràng, nơi tài năng của bạn thật sự tạo khác biệt. Khi biết chọn, lòng nhân ái của bạn đi xa hơn nhiều so với việc phản ứng trước mọi nỗi buồn xuất hiện trước mắt.`),
        ].join("\n"),
      },
      {
        label: "TÀI NĂNG TRUYỀN CẢM HỨNG",
        body: [
          p(`Bạn có thể dùng câu chuyện, hình ảnh, lời nói hoặc chính đời sống của mình để đánh thức điều tốt trong người khác. Khi bạn tin vào một lý tưởng, người khác cảm nhận được sức nặng của niềm tin đó.`),
          p(`Hãy dùng tài năng này có trách nhiệm. Truyền cảm hứng không phải làm người khác xúc động nhất thời, mà giúp họ nhìn thấy một hành động đúng có thể bắt đầu ngay.`),
          p(`Tài năng truyền cảm hứng của bạn thường đến từ việc đã cảm rất sâu. Bạn có thể dùng nỗi buồn, niềm tin, ký ức và lý tưởng của mình để tạo ra lời nói có sức chạm. Điều quan trọng là đừng chỉ dừng ở vẻ đẹp của thông điệp. Hãy dẫn người nghe đến một bước cụ thể: hiểu mình hơn, tha thứ nhẹ hơn, học một kỹ năng, giúp một người, hoặc chọn sống có trách nhiệm hơn.`),
          p(`Trong nghề nghiệp, số 9 có thể tỏa sáng ở nơi cần kể chuyện, giáo dục, nghệ thuật, nhân sự, truyền thông cộng đồng, tư vấn hoặc các dự án có chiều kích xã hội. Bạn không nhất thiết phải làm việc từ thiện mới sống đúng sứ mệnh. Chỉ cần công việc của bạn làm con người được nhìn thấy, được nâng phẩm giá hoặc được mở rộng nhận thức, số 9 đã có đất để vận hành.`),
        ].join("\n"),
      },
      {
        label: "NGUY CƠ ĐAU KHỔ VÌ NGƯỜI KHÁC",
        body: [
          p(`Số 9 dễ ôm vào lòng quá nhiều câu chuyện. Nếu không biết lọc, bạn có thể mệt vì những nỗi đau không thuộc quyền kiểm soát của mình.`),
          p(`Bài học là phụng sự bằng sự sáng suốt. Bạn có thể thương người mà vẫn nghỉ ngơi, có thể giúp đời mà vẫn giữ đời sống riêng không bị phá vỡ.`),
          p(`Số 9 dễ nhầm sự cao thượng với việc chịu đựng vô hạn. Bạn có thể tha thứ nhiều lần, cho thêm nhiều cơ hội và tự thuyết phục rằng ai rồi cũng sẽ tốt hơn nếu được yêu đủ. Nhưng có những tình huống cần ranh giới rõ, thậm chí cần rời đi. Sự nhân ái không yêu cầu bạn ở lại nơi liên tục làm tổn hại phẩm giá của mình.`),
          p(`Hãy xem việc chăm đời sống riêng là một phần của phụng sự. Bạn cần ngủ đủ, có người để tâm sự, có niềm vui không gắn với trách nhiệm và có quyền được bình yên. Khi nội tâm của bạn được nuôi dưỡng, sự cống hiến không còn là dòng chảy rút cạn, mà trở thành nguồn sáng bền bỉ và ấm áp hơn.`),
        ].join("\n"),
      },
      {
        label: "ỨNG DỤNG THỰC TẾ CỦA SỨ MỆNH SỐ 9",
        body: [
          p(`Trong nghề nghiệp, <strong>{{name}}</strong> nên chọn những vai trò cho phép tài năng cá nhân chạm đến lợi ích rộng hơn: nghệ thuật, giáo dục, truyền thông nhân văn, hoạt động xã hội, tư vấn, nhân sự, y tế, dự án cộng đồng hoặc những sản phẩm giúp con người hiểu nhau hơn. Bạn cần cảm thấy công việc có ý nghĩa vượt khỏi lợi ích riêng; nếu không, dù thành công bên ngoài, bên trong vẫn dễ thấy thiếu.`),
          p(`Về tài chính, số 9 cần học cách cho đi có cấu trúc. Bạn có thể hào phóng, dễ mềm lòng và muốn giúp khi thấy ai khó khăn. Nhưng lòng tốt không có kế hoạch có thể khiến bạn mất cân bằng. Hãy có ngân sách cho gia đình, cho cộng đồng, cho bản thân và cho tương lai. Khi sự hào phóng nằm trong trật tự, bạn vừa giúp được người khác vừa không tự đặt mình vào thiếu hụt.`),
          p(`Trong tình yêu, hãy phân biệt giữa lòng trắc ẩn và xu hướng cứu rỗi. Bạn có thể nhìn thấy phần đẹp trong một người, nhưng không vì thế mà bỏ qua hành vi làm tổn thương mình. Số 9 trưởng thành khi biết yêu bằng trái tim rộng mà vẫn nhìn sự thật rõ. Một mối quan hệ đúng không bắt bạn phải liên tục hy sinh phẩm giá để chứng minh tình yêu.`),
          p(`Mỗi năm, hãy chọn một hình thức cống hiến phù hợp với tài năng của mình thay vì phản ứng rải rác trước mọi lời kêu gọi. Có thể là dạy một nhóm nhỏ, hỗ trợ một dự án, làm nội dung có ích, mentoring cho người trẻ hoặc dành một phần thu nhập cho mục tiêu nhân văn. Khi sự phụng sự có hình dạng, sứ mệnh số 9 trở thành dòng chảy bền bỉ chứ không chỉ là xúc cảm nhất thời.`),
        ].join("\n"),
      },
      {
        label: "THỰC HÀNH PHÁT TRIỂN DÀNH CHO SỐ 9",
        body: [
          p(`Khi một câu chuyện làm bạn xúc động mạnh, <strong>{{name}}</strong> nên dừng lại hỏi: mình có vai trò thật sự trong việc này không, hay mình chỉ đang bị kéo vào vì đồng cảm? Số 9 có trái tim rộng nên dễ phản ứng trước mọi nỗi đau. Nhưng sứ mệnh không phải là gánh hết thế giới; sứ mệnh là chọn đúng nơi tài năng, thời gian và nguồn lực của bạn có thể tạo khác biệt bền.`),
          p(`Bạn nên có nghi thức kết thúc cho những điều đã qua. Đó có thể là viết một lá thư không gửi, dọn một góc cũ, hoàn thành một lời hứa cuối, hoặc gọi tên bài học trước khi bước tiếp. Số 9 thường giữ ký ức rất sâu; nếu không có cách khép lại, ký ức trở thành căn phòng bạn cứ quay về. Khi biết kết thúc đẹp, bạn không phản bội quá khứ; bạn giải phóng mình để yêu đời sống hiện tại hơn.`),
          p(`Trong công việc sáng tạo hoặc cộng đồng, hãy biến lý tưởng thành kế hoạch. Một tầm nhìn nhân văn cần ngân sách, lịch trình, kỹ năng, người phụ trách và thước đo tác động. Nếu chỉ dựa vào cảm xúc đẹp, dự án dễ bắt đầu bằng nhiệt tâm rồi yếu dần. Khi số 9 biết quản trị lòng tốt, điều bạn làm có thể đi xa hơn và chạm đến nhiều người hơn.`),
          p(`Ở tầng cao, sứ mệnh số 9 là phụng sự mà vẫn sống trọn đời mình. Bạn có quyền yêu, nghỉ, vui, nhận tiền, được công nhận và có ranh giới. Càng cho phép bản thân sống đầy đủ, bạn càng ít phụng sự từ thiếu hụt. Khi trái tim rộng đi cùng sự sáng suốt, bạn trở thành người nhắc thế giới nhớ về lòng nhân mà không đánh mất chính mình.`),
          p(`Bạn cũng nên học cách nhận lại mà không thấy áy náy. Số 9 đôi khi quen với vai trò người cho, người hiểu, người bao dung, nên khi được chăm sóc lại thấy lúng túng. Nhưng dòng chảy nhân ái cần hai chiều. Khi bạn cho phép mình nhận tình yêu, sự hỗ trợ và sự công nhận, trái tim rộng của bạn không nhỏ đi; nó chỉ trở nên cân bằng và thật hơn.`),
        ].join("\n"),
      },
    ],
    tomLai: `<strong>{{name}}</strong> mang sứ mệnh số 9 để cống hiến, truyền cảm hứng và mở rộng lòng nhân ái trong đời sống thực tế. Khi bạn biết yêu thương có ranh giới và biến lý tưởng thành hành động cụ thể, sứ mệnh số 9 đang được thực thi ở trình độ cao nhất.`,
  },
};

export function renderDestinyExtra(num: number, name: string): string {
  const entry = DESTINY_EXTRA[num];
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
