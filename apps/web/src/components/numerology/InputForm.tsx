"use client";

import { reportInputSnapshotSchema } from "@banmenh/shared";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Button, Card } from "../ui";

type FormData = {
  fullName: string;
  nickname: string;
  gender: "" | "male" | "female";
  birthDay: string;
  birthMonth: string;
  birthYear: string;
};

type FieldErrors = Partial<Record<keyof FormData, string>>;

const namePattern = /^[\p{L}\s]+$/u;
const initialForm: FormData = {
  fullName: "",
  nickname: "",
  gender: "",
  birthDay: "",
  birthMonth: "",
  birthYear: "",
};
const genderOptions = [
  { value: "male", iconSrc: "/icons/gender-male.png", label: "Nam", selectedClass: "border-[var(--bm-border-gold)] shadow-[var(--bm-shadow-gold)]", selectedBg: "linear-gradient(135deg, rgba(251,191,36,0.15), rgba(245,158,11,0.05))" },
  { value: "female", iconSrc: "/icons/gender-female.png", label: "Nữ", selectedClass: "border-[var(--bm-border-purple)] shadow-[var(--bm-shadow-purple)]", selectedBg: "linear-gradient(135deg, rgba(167,139,250,0.15), rgba(124,58,237,0.05))" },
] as const;

function pad(value: string) {
  return value.padStart(2, "0");
}

function isValidDate(year: number, month: number, day: number) {
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}

function daysInMonth(year: number, month: number) {
  if (!year || !month) return 31;
  return new Date(Date.UTC(year, month, 0)).getUTCDate();
}

function FieldError({ message }: { message?: string }) {
  return message ? <p className="mt-2 text-sm text-[var(--bm-danger)]">{message}</p> : null;
}

export function InputForm() {
  const router = useRouter();
  const currentYear = new Date().getFullYear();
  const years = useMemo(() => Array.from({ length: currentYear - 1900 + 1 }, (_, index) => String(currentYear - index)), [currentYear]);
  const [formData, setFormData] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const maxDays = daysInMonth(Number(formData.birthYear), Number(formData.birthMonth));

  const setField = (field: keyof FormData, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  useEffect(() => {
    if (Number(formData.birthDay) > maxDays) {
      setFormData((current) => ({ ...current, birthDay: "" }));
      setErrors((current) => ({ ...current, birthDay: undefined }));
    }
  }, [formData.birthDay, maxDays]);

  const validate = () => {
    const nextErrors: FieldErrors = {};
    const day = Number(formData.birthDay);
    const month = Number(formData.birthMonth);
    const year = Number(formData.birthYear);

    if (!formData.fullName.trim()) nextErrors.fullName = "Vui lòng nhập họ tên";
    if (formData.fullName.length > 200) nextErrors.fullName = "Họ tên tối đa 200 ký tự";
    if (formData.fullName.trim() && !namePattern.test(formData.fullName.trim())) {
      nextErrors.fullName = "Họ tên chỉ nên gồm chữ cái và khoảng trắng";
    }
    if (formData.nickname.length > 120) nextErrors.nickname = "Tên thường gọi tối đa 120 ký tự";
    if (!day || !month || !year || !isValidDate(year, month, day)) {
      nextErrors.birthDay = "Ngày sinh không hợp lệ";
    }

    const birthDate = year && month && day ? `${year}-${pad(formData.birthMonth)}-${pad(formData.birthDay)}` : "";
    const payload = {
      fullName: formData.fullName.trim(),
      nickname: formData.nickname.trim() || undefined,
      gender: formData.gender || undefined,
      birthDate,
    };
    const schemaResult = reportInputSnapshotSchema.safeParse(payload);
    if (!schemaResult.success) {
      for (const issue of schemaResult.error.issues) {
        const field = issue.path[0];
        if (field === "birthDate") nextErrors.birthDay = nextErrors.birthDay ?? "Ngày sinh không hợp lệ";
        if (field === "nickname") nextErrors.nickname = "Tên thường gọi tối đa 120 ký tự";
      }
    }

    return { errors: nextErrors, birthDate };
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = validate();
    if (Object.keys(result.errors).length > 0) {
      setErrors(result.errors);
      return;
    }

    setSubmitting(true);
    const params = new URLSearchParams({
      fullName: formData.fullName.trim(),
      dob: result.birthDate,
    });
    if (formData.gender) params.set("gender", formData.gender);
    if (formData.nickname.trim()) params.set("nickname", formData.nickname.trim());
    router.push(`/than-so-hoc/result?${params.toString()}`);
  };

  const inputClass =
    "mt-2 w-full rounded-lg border border-[var(--bm-border-subtle)] bg-[var(--bm-bg-glass)] px-4 py-3 text-[var(--bm-text-main)] outline-none transition focus:border-[var(--bm-border-purple)]";

  return (
    <Card as="section" className="mt-5 sm:mt-6" variant="glass" padding="lg">
      <form onSubmit={handleSubmit} noValidate>
        <div className="grid gap-4 sm:gap-5">
          <div>
            <label className="text-sm font-bold" htmlFor="fullName">
              Họ và tên (đầy đủ và có dấu) <span className="text-[var(--bm-danger)]">*</span>
            </label>
            <input
              id="fullName"
              className={inputClass}
              placeholder="Vui lòng nhập đầy đủ họ tên"
              value={formData.fullName}
              onChange={(event) => setField("fullName", event.target.value)}
            />
            <FieldError message={errors.fullName} />
          </div>

          <div>
            <label className="text-sm font-bold" htmlFor="nickname">
              Tên thường gọi (tên gọi hàng ngày, có thể bỏ trống)
            </label>
            <input
              id="nickname"
              className={inputClass}
              placeholder="Ví dụ: Chun, Chin,..."
              value={formData.nickname}
              onChange={(event) => setField("nickname", event.target.value)}
            />
            <FieldError message={errors.nickname} />
          </div>

          <fieldset>
            <legend className="text-sm font-bold">
              Giới tính <span className="text-[var(--bm-danger)]">*</span>
            </legend>
            <div role="radiogroup" className="mt-3 grid grid-cols-2 gap-3">
              {genderOptions.map((option) => {
                const selected = formData.gender === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => setField("gender", option.value)}
                    className={[
                      "group flex min-h-28 flex-col items-center justify-center gap-2 rounded-xl border-2 px-4 py-3 transition-all duration-200 sm:min-h-32 sm:py-4",
                      selected
                        ? option.selectedClass
                        : "border-[var(--bm-border-subtle)] bg-[var(--bm-bg-glass)] opacity-70 hover:-translate-y-0.5 hover:opacity-100",
                    ].join(" ")}
                    style={selected ? { backgroundImage: option.selectedBg } : undefined}
                  >
                    <img src={option.iconSrc} alt="" aria-hidden="true" className="size-14 object-contain sm:size-16" />
                    <span className="text-base font-bold text-[var(--bm-text-main)]">{option.label}</span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          <div>
            <label className="text-sm font-bold">
              Ngày sinh (dương lịch và theo đúng định dạng) <span className="text-[var(--bm-danger)]">*</span>
            </label>
            <div className="mt-2 grid grid-cols-3 gap-2 sm:gap-3">
              <select className={inputClass.replace("mt-2 ", "")} value={formData.birthDay} onChange={(event) => setField("birthDay", event.target.value)} aria-label="Ngày sinh">
                <option value="">Ngày</option>
                {Array.from({ length: maxDays }, (_, index) => String(index + 1)).map((day) => <option key={day} value={day}>{day}</option>)}
              </select>
              <select className={inputClass.replace("mt-2 ", "")} value={formData.birthMonth} onChange={(event) => setField("birthMonth", event.target.value)} aria-label="Tháng sinh">
                <option value="">Tháng</option>
                {Array.from({ length: 12 }, (_, index) => String(index + 1)).map((month) => <option key={month} value={month}>Tháng {month}</option>)}
              </select>
              <select className={inputClass.replace("mt-2 ", "")} value={formData.birthYear} onChange={(event) => setField("birthYear", event.target.value)} aria-label="Năm sinh">
                <option value="">Năm</option>
                {years.map((year) => <option key={year} value={year}>{year}</option>)}
              </select>
            </div>
            <FieldError message={errors.birthDay} />
          </div>
        </div>

        <Button className="mt-6" fullWidth loading={submitting} type="submit">
          Phân tích báo cáo của tôi
        </Button>
        <p className="mt-3 text-sm leading-6 text-[var(--bm-text-muted)]">
          Mỗi bản luận giải là một tấm gương để bạn nhìn lại nhịp sống, lựa chọn và những khuynh hướng nổi bật của mình.
        </p>
      </form>
    </Card>
  );
}
