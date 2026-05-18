// Placeholder pricing — sẽ được mở rộng ở T-0401.

export type Product = {
  code: string;
  name: string;
  priceVnd: number;
  tier: "single" | "bundle";
  description: string;
};

export const PRODUCTS = [
  {
    code: "numerology_single_report",
    name: "Báo cáo Thần số học",
    priceVnd: 99000,
    tier: "single",
    description: "Một báo cáo cá nhân chi tiết.",
  },
  {
    code: "tarot_session",
    name: "Phiên Tarot 3 lá",
    priceVnd: 79000,
    tier: "single",
    description: "Một phiên rút bài có diễn giải.",
  },
  {
    code: "bundle_explorer",
    name: "Gói Khám phá",
    priceVnd: 249000,
    tier: "bundle",
    description: "Gồm Thần số học và 2 phiên Tarot.",
  },
] as const satisfies readonly Product[];

export function formatPriceVnd(price: number): string {
  return `${new Intl.NumberFormat("vi-VN").format(price)}₫`;
}
