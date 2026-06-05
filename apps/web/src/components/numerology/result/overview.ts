import type { NumerologyReport } from "@banmenh/shared";
import { readString } from "./utils";

export function generateOverview(report: NumerologyReport, name: string): string {
  const lifePath = report.lifePath;
  const destiny = report.destiny;
  const personalYear = report.personalYear;
  const lifePathTitle =
    readString(lifePath.data, ["title", "name"]) || `Số ${lifePath.displayNumber ?? lifePath.number}`;
  const destinyTitle = readString(destiny.data, ["title", "name"]) || `Số ${destiny.number}`;
  const yearTheme = readString(personalYear.data, ["theme", "title"]);

  return `Năng lượng cốt lõi của ${name} là sự kết hợp giữa Đường Đời ${lifePath.displayNumber ?? lifePath.number} (${lifePathTitle}) và Sứ mệnh ${destiny.number} (${destinyTitle}). Năm ${personalYear.year} đến với năng lượng số ${personalYear.number}${yearTheme ? ` - ${yearTheme}` : ""}. Đây là bức tranh sơ khởi về chân dung số học của bạn.`;
}
