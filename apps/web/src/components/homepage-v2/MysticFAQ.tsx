"use client";

import { useState } from "react";

const faqs = [
  {
    question: "Bản tổng quan miễn phí khác gì bản luận giải đầy đủ?",
    answer:
      "Phần miễn phí giúp bạn nhìn nhanh một số lớp tổng quan. Bản luận giải đầy đủ đi sâu hơn vào từng nhóm chỉ số, chu kỳ thời gian, điểm mạnh, thách thức và gợi ý quan sát bản thân theo từng giai đoạn.",
  },
  {
    question: "Hiện tại module nào đã dùng được trong Bản Mệnh?",
    answer:
      "Thần số học là module đang mở để bạn nhập thông tin và nhận báo cáo. Tarot là module tiếp theo trong lộ trình. Tử vi, Ma trận định mệnh, Bản đồ sao và Bát tự sẽ được mở theo từng giai đoạn sau.",
  },
  {
    question: "Báo cáo Thần số học gồm những nội dung gì?",
    answer:
      "Báo cáo hiện có phần tổng quan miễn phí, các chỉ số chính, luận giải chuyên sâu, năm cá nhân, tháng cá nhân và chu kỳ vận số. Nội dung được trình bày theo từng phần để bạn dễ theo dõi.",
  },
  {
    question: "Nội dung luận giải có cá nhân hóa theo thông tin của tôi không?",
    answer:
      "Báo cáo được tạo từ thông tin bạn nhập và hệ thống chỉ số tương ứng, sau đó ghép với kho nội dung đã biên tập. Mục tiêu là tạo một bản đọc cá nhân hóa theo hồ sơ của bạn, không phải một đoạn mô tả chung cho mọi người.",
  },
  {
    question: "Nội dung có dùng AI tạo sinh cho phần luận giải không?",
    answer:
      "Không. Phần luận giải hiện tại được tạo từ hệ thống công thức và kho nội dung đã biên tập của Bản Mệnh, không dùng AI tạo sinh để viết mới từng báo cáo.",
  },
  {
    question: "Tôi không rành huyền học, đọc luận giải có hiểu được không?",
    answer:
      "Có. Nội dung được viết theo hướng dễ đọc, ưu tiên giải thích ý nghĩa và cách tự quan sát thay vì bắt bạn phải biết thuật ngữ chuyên sâu từ trước.",
  },
  {
    question: "Báo cáo đã mở khóa có xem lại được không?",
    answer:
      "Có. Báo cáo đã mở khóa được gắn với tài khoản hoặc hồ sơ tương ứng để bạn có thể quay lại xem khi cần.",
  },
  {
    question: "Thông tin cá nhân khi nhập vào có được bảo mật không?",
    answer:
      "Bản Mệnh chỉ dùng thông tin cần thiết để tạo hồ sơ, lưu báo cáo và xử lý quyền truy cập. Dữ liệu nhạy cảm không được đưa vào tài nguyên public hoặc static asset.",
  },
  {
    question: "Kết quả luận giải có phải lời dự đoán chắc chắn không?",
    answer:
      "Không. Nội dung trên Bản Mệnh chỉ mang tính tham khảo, hỗ trợ tự quan sát và định hướng suy nghĩ. Kết quả không thay thế tư vấn y tế, tâm lý, pháp lý, tài chính hoặc các quyết định chuyên môn.",
  },
];

export function MysticFAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="mystic-section" id="faq">
      <div className="mystic-container">
        <div className="section-head">
          <p className="section-kicker">Câu hỏi thường gặp</p>
          <h2>Trước khi bắt đầu luận giải</h2>
          <p>
            Những câu trả lời ngắn gọn về module đang mở, cách cá nhân hóa báo cáo,
            quyền truy cập và giới hạn của nội dung luận giải.
          </p>
        </div>
        <div className="faq-list">
          {faqs.map((item, index) => {
            const isOpen = index === openIndex;
            return (
              <article className="faq-item" key={item.question}>
                <button className="faq-button" onClick={() => setOpenIndex(isOpen ? -1 : index)} type="button">
                  <span>{item.question}</span>
                  <span className={`faq-icon ${isOpen ? "open" : ""}`}>⌄</span>
                </button>
                {isOpen ? <div className="faq-answer">{item.answer}</div> : null}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
