"use client";

import type { IndicatorResult, NumerologyReport } from "@banmenh/shared";
import { useSearchParams } from "next/navigation";

import { Button, Card } from "../../ui";
import { LockedGrid, type LockedGroup } from "./LockedGrid";
import { generateOverview } from "./overview";
import { PersonalMonthFull } from "./PersonalMonthFull";
import { UNLOCK_CTA_ID } from "./scrollToUnlock";
import { LOCKED_COUNT, readString, truncateText } from "./utils";

type SummaryDashboardProps = {
  report: NumerologyReport;
  userName: string;
  dob: string;
  unlocked: boolean;
  onUnlock: () => void;
};

const indicatorChips = [
  ["Đường Đời", "lifePath"],
  ["Sứ mệnh", "destiny"],
  ["Linh hồn", "soul"],
  ["Nhân cách", "personality"],
  ["Trưởng thành", "maturity"],
  ["Thái độ", "attitude"],
  ["Năm cá nhân", "personalYear"],
  ["Tháng cá nhân", "personalMonth"],
] as const satisfies ReadonlyArray<readonly [string, keyof NumerologyReport]>;

const lockedGroups: LockedGroup[] = [
  {
    label: "Cá tính & Linh hồn",
    icon: "👤",
    items: [
      "Sứ mệnh",
      "Linh hồn",
      "Nhân cách",
      "Thái độ",
      "Động lực tiếp cận",
      "Năng lực tiếp cận",
      "Thái độ tiếp cận",
    ].map((title) => ({ title })),
  },
  {
    label: "Chu kỳ thời gian",
    icon: "⏳",
    items: [
      "12 tháng cá nhân",
      "Ngày cá nhân",
      "3 chu kỳ cuộc đời",
      "4 đỉnh kim tự tháp",
      "4 thử thách kim tự tháp",
    ].map((title) => ({ title })),
  },
  {
    label: "Bài học & Hành trình",
    icon: "🎯",
    items: [
      "Bài học karmic",
      "Số trưởng thành",
      "Năng lực trưởng thành",
      "Năng lực nhận thức",
      "Khó khăn cần vượt qua",
      "Thử thách linh hồn",
      "Thử thách sứ mệnh",
      "Thử thách cá tính",
    ].map((title) => ({ title })),
  },
  {
    label: "Dấu ấn biểu tượng",
    icon: "🔤",
    items: [{ title: "Chữ cái mở đầu" }, { title: "Chữ cái đóng" }],
  },
];
const PRICE = "99.000đ";

function detailsHref(search: { toString: () => string }) {
  const query = search.toString();
  return query ? `/than-so-hoc/result/details?${query}` : "/than-so-hoc/result/details";
}

function displayNumber(indicator: IndicatorResult) {
  return indicator.displayNumber ?? indicator.number;
}

function indicatorTitle(indicator: IndicatorResult, fallbackLabel: string) {
  return readString(indicator.data, ["title", "name", "theme"]) || `${fallbackLabel} ${displayNumber(indicator)}`;
}

function previewBody(indicator: IndicatorResult, maxLength: number) {
  const text =
    readString(indicator.data, ["description", "meaning", "title"]) ||
    `Chỉ số ${displayNumber(indicator)} mở ra một góc nhìn khái quát về năng lượng nổi bật của bạn.`;
  return truncateText(text, maxLength);
}

function IndicatorPreview({
  title,
  label,
  indicator,
  maxLength,
}: {
  title: string;
  label: string;
  indicator: IndicatorResult;
  maxLength: number;
}) {
  return (
    <Card as="article" variant="glass" padding="lg">
      <p className="text-sm font-bold uppercase tracking-[0.14em] text-[var(--bm-primary-soft)]">
        {label}
      </p>
      <h3 className="mt-3">
        {title} {displayNumber(indicator)} - "{indicatorTitle(indicator, title)}"
      </h3>
      <p className="mt-4 text-[var(--bm-text-soft)]">{previewBody(indicator, maxLength)}</p>
    </Card>
  );
}

function PersonalYearPreview({ report }: { report: NumerologyReport }) {
  const personalYearTitle = readString(report.personalYear.data, ["title", "theme"]);
  const personalYearIntro =
    readString(report.personalYear.data, ["description", "meaning", "summary"]) ||
    `Năm cá nhân ${report.personalYear.number} mở ra một nhịp vận số riêng cho hiện tại.`;

  return (
    <Card as="article" variant="glass" padding="lg">
      <p className="text-sm font-bold uppercase tracking-[0.14em] text-[var(--bm-primary-soft)]">
        Chỉ số thời gian
      </p>
      <h3 className="mt-3">
        Năm Cá Nhân {report.personalYear.year}: Số {report.personalYear.number}
        {personalYearTitle ? ` - "${personalYearTitle}"` : ""}
      </h3>
      <p className="mt-4 text-[var(--bm-text-soft)]">{truncateText(personalYearIntro, 200)}</p>
    </Card>
  );
}

export function SummaryDashboard({
  report,
  userName,
  dob,
  unlocked,
  onUnlock,
}: SummaryDashboardProps) {
  const lifePathNumber = displayNumber(report.lifePath);
  const searchParams = useSearchParams();
  const detailUrl = detailsHref(searchParams);

  return (
    <div className="space-y-8">
      <section className="rounded-lg border border-white/10 bg-[#0c0816]/86 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.34)] sm:p-7">
        <div className="grid gap-4 border-b border-white/10 pb-5 text-sm sm:grid-cols-2">
          <div>
            <div className="text-white/48">Họ và tên</div>
            <div className="mt-1 text-lg font-semibold text-[#f5e8c7]">{userName}</div>
          </div>
          <div>
            <div className="text-white/48">Ngày sinh</div>
            <div className="mt-1 text-lg font-semibold text-[#f5e8c7]">{dob}</div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-6 py-8">
          <div className="relative grid size-48 place-items-center rounded-full bg-[radial-gradient(circle_at_center,rgba(247,201,72,0.22),rgba(168,85,247,0.12)_48%,rgba(12,8,22,0.18)_70%)] shadow-[0_0_72px_rgba(247,201,72,0.28)] ring-4 ring-[#f7c948]/70 sm:size-64">
            <div className="absolute inset-4 rounded-full border border-white/12" />
            <div className="text-center">
              <div className="text-xs font-semibold text-white/58 sm:text-sm">SỐ CHỦ ĐẠO</div>
              <div className="mt-2 text-7xl font-black leading-none text-[#f7c948] sm:text-8xl">
                {lifePathNumber}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bm-result-overview">
        <h2>Tổng quan</h2>
        <p>{generateOverview(report, userName)}</p>
      </section>

      <section>
        <div className="mb-4">
          <h2 className="text-xl font-bold text-[var(--bm-text-main)]">Các chỉ số chính</h2>
          <p className="mt-2 text-sm text-[var(--bm-text-soft)]">
            Đây là bảng số khái quát để bạn nhìn nhanh cấu trúc năng lượng của hồ sơ.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {indicatorChips.map(([label, key]) => {
            const indicator = report[key] as IndicatorResult;
            return (
              <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4 text-center" key={key}>
                <div className="text-3xl font-black text-[#f5e8c7]">{displayNumber(indicator)}</div>
                <div className="mt-1 text-xs text-white/58">{label}</div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <IndicatorPreview
          indicator={report.lifePath}
          label="Chỉ số chính"
          maxLength={200}
          title="Số Đường Đời"
        />
        <PersonalYearPreview report={report} />
      </section>

      <PersonalMonthFull report={report} />

      <LockedGrid groups={lockedGroups} lockedCount={LOCKED_COUNT} />

      <section id={UNLOCK_CTA_ID} className="scroll-mt-8">
        <Card className="bm-cta-card" variant="glass" padding="lg">
          <h2>Luận giải đầy đủ về {userName}</h2>

          <div className="bm-cta-divider" />

          <h3>🎯 Báo cáo đầy đủ gồm:</h3>
          <ul>
            <li>✓ 33 chỉ số phân tích chuyên sâu</li>
            <li>✓ 5 khía cạnh: tình yêu, sự nghiệp, tài chính, sức khỏe, gia đình</li>
            <li>✓ Vận số 11 năm tới và chi tiết 3 năm</li>
            <li>✓ Lưới Pythagoras 3x3 và mũi tên sức mạnh</li>
            <li>✓ Bài học Karmic và Nợ Nghiệp nếu có</li>
            <li>✓ Hơn 50.000 chữ luận giải cá nhân hóa</li>
          </ul>

          <div className="bm-cta-divider" />

          <h3>💵 Bạn nhận được với {PRICE}:</h3>
          <ul>
            <li>⏱ Truy cập vĩnh viễn, đọc lại không giới hạn</li>
            <li>📱 Đọc trên mọi thiết bị</li>
            <li>🔧 Hỗ trợ sửa thông tin trong 24h</li>
            <li>🔒 Bảo mật PayOS qua ngân hàng Việt Nam</li>
          </ul>

          <div className="bm-cta-divider" />

          <div className="bm-cta-price-block">
            <div className="bm-cta-price">{PRICE}</div>
            <div className="bm-cta-anchor">(~ 2 cốc trà sữa, có giá trị cả đời)</div>
          </div>

          {unlocked ? (
            <Button href={detailUrl} fullWidth size="lg" variant="primary">
              Xem báo cáo đầy đủ
            </Button>
          ) : (
            <Button fullWidth onClick={onUnlock} size="lg" variant="primary">
              Khám phá toàn bộ chỉ số →
            </Button>
          )}

          <p className="bm-cta-disclaimer">ⓘ Không hoàn tiền sau khi mở khóa</p>
        </Card>
      </section>
    </div>
  );
}
