function additionalContextDetails(input: TarotAiReadingRequest): string {
  return input.additionalContext
    ? cleanPromptText(input.additionalContext)
    : "Không có thông tin bổ sung.";
}

export function buildTarotPrompt(input: TarotAiReadingRequest): string {
  const name = cleanPromptText(input.profile.name || "Bạn");
  const dob = cleanPromptText(input.profile.dob || "Không cung cấp");
  const gender = cleanPromptText(input.profile.gender || "Không cung cấp");
  const question = cleanPromptText(input.question);
  const birthProfile = calculateTarotBirthProfile(input.profile.dob);
  const salutation = input.profile.gender === "Nam" ? "anh" : input.profile.gender === "Nữ" ? "chị" : "bạn";
  const viewerSummary = birthProfile
    ? `Người xem: ${name} (${gender}), sinh ngày ${dob} (${birthProfile.generationGroup}), thuộc Cung ${birthProfile.zodiac} (Nguyên tố ${birthProfile.element}), Con số năng lượng ${birthProfile.energyNumber}.
Định hướng phong cách cho độ tuổi này: ${birthProfile.toneGuide}`
    : `Người xem: ${name} (${gender}), ngày sinh chưa được cung cấp. Định hướng: Văn phong gần gũi, đời thường, thấu cảm, dễ hiểu.`;

  return `Bạn là người bạn đồng hành thấu hiểu tâm lý và giải mã thông điệp Tarot theo góc nhìn ĐỜI THƯỜNG, THỰC TẾ, GẦN GŨI và CHẠM CẢM XÚC.

QUY TẮC QUAN TRỌNG VỀ NGÔN TỪ VÀ VĂN PHONG:
- BỎ HẾT TỪ NGỮ QUÁ HUYỀN HỌC, SÁCH VỞ HOẶC THUẬT NGỮ CHUYÊN NGÀNH KHÓ HIỂU:
  + Tuyệt đối KHÔNG dùng các từ như "Sự mặc khải", "Vũ trụ đã lên tiếng", "Năng lượng siêu hình", "Nghiệp chướng", "Đại định mệnh", "Thần thánh hóa"...
  + Thay bằng cách nói đời thường, tự nhiên: "Góc nhìn sâu hơn", "Bức tranh toàn cảnh", "Điều đang diễn ra", "Nút thắt thực tế", "Gợi ý hành động"...
- TÙY BIẾN VĂN PHONG THEO THẾ HỆ / ĐỘ TUỔI:
  + ${birthProfile?.generationGroup === "Gen Z" ? "Người xem thuộc Gen Z: Hãy dùng ngôn từ hiện đại, thẳng thắn, bắt đúng tâm lý loay hoay định hướng, áp lực đồng trang lứa, mập mờ tình cảm, tự nhiên như một người bạn tâm sự chân thành." : birthProfile?.generationGroup === "Gen Y (Millennials)" ? "Người xem thuộc Gen Y (Millennials): Dùng giọng văn tinh tế, thực tế, thấu hiểu áp lực công việc, tài chính, sự nghiệp và cân bằng cuộc sống của người đang trưởng thành." : "Dùng văn phong ấm áp, thấu đáo, thực tế, nói thẳng vào bản chất vấn đề mà không hoa mỹ sáo rỗng."}
- TUYỆT ĐỐI KHÔNG chào hỏi (ví dụ: Chào bạn, Xin chào,...). KHÔNG nhắc lại vai trò hoặc prompt.
- Gọi trực tiếp tên ${name} một cách tự nhiên trong bài và xưng hô là “${salutation}” khi phù hợp.

## Thông tin người trải bài
<du-lieu-nguoi-dung>
- **Hồ sơ:** ${viewerSummary}
- **Chủ đề:** ${cleanPromptText(input.themeLabel)}
- **Lĩnh vực chi tiết:** ${cleanPromptText(input.nicheLabel)}
- **Câu hỏi của ${name}:** ${question}
</du-lieu-nguoi-dung>

## Các lá bài đã rút (${input.cards.length} lá)
${cardDetails(input)}

## Câu hỏi làm rõ & Câu trả lời thực tế của ${name}
${clarificationDetails(input)}

## Chia sẻ tâm sự thêm từ ${name}
<du-lieu-nguoi-dung-bo-sung>
${additionalContextDetails(input)}
</du-lieu-nguoi-dung-bo-sung>

YÊU CẦU NỘI DUNG THEO 3 PHẦN DỄ HIỂU (Định dạng JSON):
1. **overview (Lời Hồi Đáp Thẳng Vào Câu Hỏi)**:
   - Đi thẳng vào câu hỏi "${question}" của ${name}.
   - Phân tích rõ thực trạng đang diễn ra dựa trên chính các câu trả lời Có/Không và tâm sự thực tế của ${name}, giải thích vì sao họ đang bế tắc hoặc phân vân.
2. **cards (Ý nghĩa từng lá bài)**:
   - Đúng ${input.cards.length} phần tử tương ứng từng lá bài.
   - Giải thích ý nghĩa của lá bài đó gắn liền với hoàn cảnh thực tế của ${name}, dùng từ ngữ dễ hiểu, tránh thuật ngữ Tarot cao siêu.
3. **synergy (Góc Nhìn Sâu Sắc & Nút Thắt Chính)**:
   - Xâu chuỗi tất cả các lá bài lại thành một câu chuyện hoàn chỉnh: Điều gì đang níu giữ? Đâu là rào cản tâm lý thực sự? Xu hướng diễn biến tiếp theo là gì?
4. **advice (3 Gợi Ý Hành Động Thực Tế)**:
   - Đúng 3 việc cụ thể, thực tế, làm được ngay trong vài ngày tới để cải thiện tình hình cho ${name}.

Hãy trả về duy nhất object JSON theo schema quy định.`;
}
