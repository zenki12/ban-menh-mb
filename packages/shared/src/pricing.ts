// Shared product/pricing contract — nguồn sự thật duy nhất cho giá và gói.
// Được kiểm soát bởi T-0401. Mọi thay đổi giá phải qua đây, không hardcode
// nơi khác. Voucher/payment runtime sẽ vào ở T-0505/T-0506.

export type ProductModule = "numerology" | "tarot" | "bundle";

export type ProductTier =
  | "single_report"
  | "session"
  | "bundle"
  | "subscription";

export type Product = {
  /** Mã sản phẩm duy nhất, snake_case. Khớp với `purchases.productCode`. */
  code: string;
  module: ProductModule;
  name: string;
  description: string;
  /** Giá niêm yết VND, không decimals. */
  priceVnd: number;
  tier: ProductTier;
  /** 3-5 bullet mô tả quyền lợi gói. */
  features: readonly string[];
  /** ISO date (YYYY-MM-DD). Mặc định luôn active nếu không set. */
  activeFrom?: string;
  activeUntil?: string;
};

export const PRODUCTS = [
  {
    code: "numerology_single_report",
    module: "numerology",
    name: "Báo cáo Thần số học",
    description:
      "Một bản luận giải Thần số học cá nhân hóa, mở khóa vĩnh viễn cho hồ sơ đã mua.",
    priceVnd: 99000,
    tier: "single_report",
    features: [
      "Báo cáo đầy đủ các chỉ số cốt lõi",
      "Lưu vào tài khoản, đọc lại bất kỳ lúc nào",
      "Xuất bản đẹp để xem trên mọi thiết bị",
    ],
  },
  {
    code: "tarot_session_one",
    module: "tarot",
    name: "Phiên Tarot 1 lá",
    description:
      "Một phiên rút 1 lá nhanh để soi chiếu một câu hỏi cụ thể trong ngày.",
    priceVnd: 49000,
    tier: "session",
    features: [
      "Rút 1 lá theo câu hỏi của bạn",
      "Diễn giải xuôi/ngược rõ ràng",
      "Lưu lịch sử để đối chiếu sau",
    ],
  },
  {
    code: "tarot_session_three",
    module: "tarot",
    name: "Phiên Tarot 3 lá",
    description:
      "Phiên 3 lá Quá khứ - Hiện tại - Tương lai cho góc nhìn đa chiều hơn.",
    priceVnd: 79000,
    tier: "session",
    features: [
      "Trải bài 3 lá theo trục thời gian",
      "Diễn giải tổng hợp dòng chảy năng lượng",
      "Gợi ý hành động phản tỉnh từ kết quả",
    ],
  },
  {
    code: "bundle_explorer",
    module: "bundle",
    name: "Gói Khám phá",
    description:
      "Combo tiết kiệm gồm 1 báo cáo Thần số học và 2 phiên Tarot 3 lá.",
    priceVnd: 249000,
    tier: "bundle",
    features: [
      "1 báo cáo Thần số học mở khóa vĩnh viễn",
      "2 phiên Tarot 3 lá dùng trong 90 ngày",
      "Tiết kiệm so với mua lẻ từng gói",
    ],
  },
] as const satisfies readonly Product[];

/** Định dạng giá VND theo locale vi-VN, ví dụ 99.000₫. */
export function formatPriceVnd(price: number): string {
  return `${new Intl.NumberFormat("vi-VN").format(price)}₫`;
}

/** Tìm sản phẩm theo `code`. Trả về `undefined` nếu không tồn tại. */
export function findProduct(code: string): Product | undefined {
  return PRODUCTS.find((product) => product.code === code);
}

/** Lọc danh sách sản phẩm theo module. */
export function getProductsByModule(
  module: Product["module"],
): readonly Product[] {
  return PRODUCTS.filter((product) => product.module === module);
}
