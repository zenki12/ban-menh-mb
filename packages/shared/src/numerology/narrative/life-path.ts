import type { IndicatorResult, PeriodIndicatorResult } from "../report";
import { escapeHtml, generic, type NarrativeContext } from "./common";

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
  const lp = ctx.lifePath;
  const bday = ctx.birthday;
  const same = num === lp;
  const energyMatch = ([1, 3, 5, 9].includes(num) && [1, 3, 5, 9].includes(lp)) ||
    ([2, 4, 6, 8].includes(num) && [2, 4, 6, 8].includes(lp));
  const interactionDesc = same
    ? `Hiếm gặp — Sứ mệnh số <strong>${num}</strong> hoàn toàn trùng với Đường đời số <strong>${lp}</strong>. Không có mâu thuẫn giữa việc bạn là ai và bạn được giao làm gì — đây là sự thống nhất hoàn hảo, giúp bạn hành động từ trạng thái nguyên vẹn và không chia cắt.`
    : energyMatch
      ? `Sứ mệnh số <strong>${num}</strong> cộng hưởng tốt với Đường đời số <strong>${lp}</strong> — cùng dòng năng lượng, giúp bạn lan tỏa sứ mệnh một cách tự nhiên và mạnh mẽ qua chính con người của mình.`
      : `Sứ mệnh số <strong>${num}</strong> và Đường đời số <strong>${lp}</strong> mang hai năng lượng bổ trợ nhau. Đường đời định hình cách bạn tiếp cận cuộc sống, Sứ mệnh mở ra chiều kích đóng góp rộng hơn. Hãy để cả hai hướng dẫn nhau — không phải cạnh tranh nhau.`;
  return `<p class="nar" style="border-left:3px solid #2563eb;padding-left:1rem;margin-top:1rem;"><strong>🔗 Sứ mệnh trong tổng thể biểu đồ của ${escapeHtml(name)}:</strong> ${interactionDesc} Năng lực tự nhiên từ ngày sinh số <strong>${bday}</strong> là một trong những công cụ quý giá để bạn hiện thực hóa sứ mệnh này.</p>`;
}

export function personalityCtxBlock(num: number, ctx: NarrativeContext, name: string): string {
  return `<div class="insight-box cross-context-box">🔗 <strong>Nhân cách ${num} trong tương quan với Linh hồn ${ctx.soul}:</strong> Đây là lớp người khác nhìn thấy trước khi chạm tới nội tâm của <strong>${escapeHtml(name)}</strong>. Hiểu khoảng cách này giúp bạn giao tiếp thật hơn.</div>`;
}

export function maturityCtxBlock(num: number, ctx: NarrativeContext, name: string): string {
  const lp = ctx.lifePath;
  const dest = ctx.destiny;
  return `<p class="nar" style="border-left:3px solid #059669;padding-left:1rem;margin-top:1rem;"><strong>✦ Số Trưởng Thành ${num} trong tổng thể biểu đồ của ${escapeHtml(name)}:</strong> Con số này được hình thành từ sự tổng hợp của Đường đời số <strong>${lp}</strong> (năng lượng cốt lõi của bạn) và Sứ mệnh số <strong>${dest}</strong> (điều bạn đang theo đuổi). Đây là điểm tiến hóa cuối cùng — khi những bài học từ cả hai chỉ số được tích hợp hoàn toàn, bạn trở thành phiên bản đầy đủ nhất của chính mình. Giai đoạn trưởng thành không phải về việc thay đổi con người — mà là tinh lọc và kết tinh những gì đã luôn hiện hữu trong bạn.</p>`;
}

export function indicatorHtml(
  label: string,
  indicator: IndicatorResult | PeriodIndicatorResult,
  name: string,
  ctx?: NarrativeContext,
): string {
  return generic(label, indicator.number, name, indicator.data) + (ctx ? lifePathCtxBlock(indicator.number, ctx, name) : "");
}
