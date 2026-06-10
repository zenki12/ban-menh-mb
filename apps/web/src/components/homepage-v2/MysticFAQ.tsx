"use client";

import { useState } from "react";

const faqs = [
  {
    question: "Khi nào Tarot, Tử vi và các module còn lại ra mắt?",
    answer:
      "Tarot là module tiếp theo. Tử vi, Ma trận, Bản đồ sao và Bát tự đang nằm trong roadmap để triển khai theo từng giai đoạn.",
  },
  {
    question: "All-access bundle sẽ có giá bao nhiêu?",
    answer:
      "Bundle 6 module chưa chốt giá chính thức. Bản demo chỉ ghi định hướng sản phẩm, không thay đổi giá hiện tại của Thần số học.",
  },
  {
    question: "Đã mua Thần số học thì có ưu đãi khi bundle ra mắt không?",
    answer:
      "Định hướng sản phẩm là early adopter sẽ có ưu đãi đặc biệt khi gói all-access mở bán.",
  },
  {
    question: "Báo cáo Thần số học hiện có những gì?",
    answer:
      "Báo cáo hiện có tổng quan miễn phí, các chỉ số chính, luận giải chuyên sâu, năm cá nhân, tháng cá nhân và chu kỳ vận số.",
  },
  {
    question: "Nội dung có phải AI tạo theo từng người dùng không?",
    answer:
      "Không. Runtime chỉ tính chỉ số và nối vào kho nội dung đã biên tập, không gọi AI để sinh luận giải cho từng lượt.",
  },
  {
    question: "Báo cáo đã mua có xem lại được không?",
    answer: "Có. Báo cáo được lưu trong tài khoản đã đăng nhập để đọc lại khi cần.",
  },
];

export function MysticFAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="mystic-section" id="faq">
      <div className="mystic-container">
        <div className="section-head">
          <p className="section-kicker">FAQ</p>
          <h2>Câu hỏi trước khi mở khóa</h2>
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
