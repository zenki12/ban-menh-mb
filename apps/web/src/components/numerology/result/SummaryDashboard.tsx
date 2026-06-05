"use client";

import {
  calcCareerGroups,
  calcLineChartData,
  calcPersonalityGroups,
  type NumerologyReport,
} from "@banmenh/shared";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

import { Button } from "../../ui";
import { CareerBars } from "./charts/CareerBars";
import { LineChartVanSo } from "./charts/LineChartVanSo";
import { PersonalityBars } from "./charts/PersonalityBars";

type SummaryDashboardProps = {
  report: NumerologyReport;
  userName: string;
  dob: string;
  unlocked: boolean;
  onUnlock: () => void;
};

const chips = [
  ["Linh hồn", "soul"],
  ["Sứ mệnh", "destiny"],
  ["Thái độ", "attitude"],
  ["Nhân cách", "personality"],
  ["Trưởng thành", "maturity"],
  ["Tư duy", "cognitiveAbility"],
] as const;

function detailsHref(search: { toString: () => string }) {
  const query = search.toString();
  return query ? `/than-so-hoc/result/details?${query}` : "/than-so-hoc/result/details";
}

export function SummaryDashboard({
  report,
  userName,
  dob,
  unlocked,
  onUnlock,
}: SummaryDashboardProps) {
  const lifePathNumber = report.lifePath.displayNumber ?? report.lifePath.number;
  const searchParams = useSearchParams();
  const detailUrl = detailsHref(searchParams);
  const currentYear = report.personalYear.year;
  const lineData = useMemo(
    () => calcLineChartData(report, currentYear, -5, 5),
    [currentYear, report],
  );
  const personalityGroups = useMemo(
    () => calcPersonalityGroups(report.input.dobParts),
    [report.input.dobParts],
  );
  const careerGroups = useMemo(
    () => calcCareerGroups(report.lifePath.number, report.destiny.number),
    [report.destiny.number, report.lifePath.number],
  );

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

          <div className="grid w-full grid-cols-3 gap-3 md:grid-cols-6">
            {chips.map(([label, key]) => (
              <div className="rounded-lg border border-white/10 bg-white/[0.04] p-3 text-center" key={key}>
                <div className="text-xs text-white/52">{label}</div>
                <div className="mt-1 text-2xl font-black text-[#f5e8c7]">{report[key].number}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold text-[#f5e8c7]">CHU KỲ VẬN SỐ CỦA BẠN</h2>
        <LineChartVanSo data={lineData} />
      </section>

      <section className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-lg font-bold text-[#f5e8c7]">NHÓM TÍNH CÁCH THEO BẢN NGÃ</h2>
          <p className="text-sm leading-6 text-white/62">
            Đây là các nhóm tính cách bẩm sinh được phân tích từ biểu đồ Pythagoras ngày sinh của bạn.
          </p>
        </div>
        <PersonalityBars groups={personalityGroups} />
      </section>

      <section className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-lg font-bold text-[#f5e8c7]">TỈ LỆ NHÓM NGÀNH PHÙ HỢP VỚI BẠN</h2>
          <p className="text-sm leading-6 text-white/62">
            Dựa trên số đường đời và sứ mệnh, phân tích tỉ lệ phù hợp nhóm ngành nghề.
          </p>
        </div>
        <CareerBars groups={careerGroups} />
      </section>

      <section className="rounded-lg border border-[#f7c948]/24 bg-[#171021]/90 p-5 text-center shadow-[0_24px_80px_rgba(0,0,0,0.28)] sm:p-7">
        {unlocked ? (
          <Button href={detailUrl} size="lg">
            Xem luận giải chi tiết →
          </Button>
        ) : (
          <div className="mx-auto grid max-w-2xl gap-3 sm:grid-cols-2">
            <Button href={detailUrl} size="lg" variant="secondary">
              Xem preview miễn phí →
            </Button>
            <Button onClick={onUnlock} size="lg">
              Mở khóa toàn bộ luận giải
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}
