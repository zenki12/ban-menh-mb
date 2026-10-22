import { Card } from "../../components/ui";

type TarotProfileFieldsProps = {
  dob: string;
  gender: string;
  name: string;
  onDobChange: (value: string) => void;
  onGenderChange: (value: string) => void;
  onNameChange: (value: string) => void;
};

export function TarotProfileFields({
  dob,
  gender,
  name,
  onDobChange,
  onGenderChange,
  onNameChange,
}: TarotProfileFieldsProps) {
  const today = new Date().toISOString().slice(0, 10);

  return (
    <Card className="tarot-profile-card" padding="md" variant="glass">
      <div aria-hidden="true" className="tarot-profile-aura" />
      <div className="tarot-profile-heading">
        <div>
          <span className="tarot-profile-eyebrow">Hồ sơ năng lượng · Tùy chọn</span>
          <h3>Kết nối tần số năng lượng của bạn</h3>
        </div>
        <svg aria-hidden="true" viewBox="0 0 48 48">
          <path d="M24 4 28 18 44 24 28 30 24 44 20 30 4 24 20 18Z" />
          <circle cx="24" cy="24" r="4" />
        </svg>
      </div>
      <p className="tarot-profile-intro">
        Cung cấp thông tin giúp vũ trụ định vị bản mệnh, cung hoàng đạo và cá nhân hóa sâu sắc lời luận giải.
      </p>

      <div className="tarot-profile-grid">
        <label className="tarot-profile-field">
          <span>Tên / Biệt danh</span>
          <input
            autoComplete="name"
            className="tarot-profile-input"
            maxLength={80}
            onChange={(event) => onNameChange(event.target.value)}
            placeholder="Tên bạn muốn được gọi (VD: Minh, Linh...)"
            type="text"
            value={name}
          />
          <small>Để lời luận giải gọi bạn theo cách gần gũi nhất.</small>
        </label>

        <label className="tarot-profile-field">
          <span>Ngày sinh</span>
          <input
            autoComplete="bday"
            className="tarot-profile-input"
            max={today}
            onChange={(event) => onDobChange(event.target.value)}
            type="date"
            value={dob}
          />
          <small>Dùng để tính Cung Hoàng Đạo và Con số năng lượng.</small>
        </label>

        <fieldset className="tarot-profile-field tarot-profile-gender">
          <legend>Giới tính</legend>
          <div className="tarot-profile-gender-options">
            {["Nam", "Nữ", "Khác"].map((option) => (
              <button
                aria-pressed={gender === option}
                className={gender === option ? "is-active" : undefined}
                key={option}
                onClick={() => onGenderChange(gender === option ? "" : option)}
                type="button"
              >
                {option}
              </button>
            ))}
          </div>
          <small>Giúp lựa chọn cách xưng hô và thấu cảm phù hợp; bạn có thể bỏ qua.</small>
        </fieldset>
      </div>

      <div className="tarot-profile-privacy">
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path d="M7 10V7a5 5 0 0 1 10 0v3m-11 0h12v10H6V10Z" />
        </svg>
        <p>
          Nếu để trống, hệ thống sẽ xưng hô là “Bạn”. Khi hoàn tất trải bài, dữ liệu đã nhập cùng câu hỏi và các lá bài sẽ được Google Gemini xử lý để tạo nội dung bằng AI.
        </p>
      </div>
    </Card>
  );
}
