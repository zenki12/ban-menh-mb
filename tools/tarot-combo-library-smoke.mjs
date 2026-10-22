const playwrightModule = process.env.PLAYWRIGHT_MODULE_URL ?? "playwright";
const { chromium } = await import(playwrightModule);

const baseUrl = process.env.TAROT_BASE_URL ?? "http://localhost:3000";
const browser = await chromium.launch({
  executablePath: process.env.PLAYWRIGHT_BROWSER_PATH,
  headless: true,
});
const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
const requests = [];

await page.addInitScript((date) => {
  window.localStorage.setItem("tarot_daily_seen", date);
}, new Date().toISOString().slice(0, 10));

const baseCards = [
  { id: 6, nameEn: "The Lovers", nameVi: "Tình Nhân" },
  { id: 15, nameEn: "The Devil", nameVi: "Ác Quỷ" },
];

function item(index, size = 2) {
  const cards = Array.from({ length: size }, (_, cardIndex) => ({
    ...baseCards[cardIndex % baseCards.length],
  }));
  return {
    id: `karmic_bond_${index}`,
    size,
    title: `Mối Liên Kết Nghiệp Quả ${index} (Karmic Bond ${index})`,
    description: "Hai nguồn năng lượng soi chiếu một bài học chung.",
    cards,
  };
}

await page.route("**/api/tarot/combos/*", async (route) => {
  const combo = item(1);
  const domain = (key, label, nicheKey, nicheLabel) => ({
    key,
    label,
    niches: [{
      key: nicheKey,
      label: nicheLabel,
      upright: `Thông điệp xuôi dành cho ${nicheLabel}.`,
      reversed: `Thông điệp ngược dành cho ${nicheLabel}.`,
    }],
  });
  await route.fulfill({
    contentType: "application/json",
    body: JSON.stringify({
      ok: true,
      combo,
      domains: [
        domain("love", "Tình Yêu", "love", "Tình Yêu Tổng Quát"),
        domain("finance", "Tài Chính", "savings", "Tiết Kiệm / Tích Lũy"),
        domain("health", "Sức Khỏe", "health", "Sức Khỏe Thể Chất"),
        domain("career", "Sự Nghiệp", "career", "Sự Nghiệp / Công Việc"),
        domain("self", "Bản Thân", "self", "Định Hướng Bản Thân"),
      ],
    }),
  });
});

await page.route("**/api/tarot/combos?*", async (route) => {
  const url = new URL(route.request().url());
  const currentPage = Number(url.searchParams.get("page") ?? "1");
  const size = url.searchParams.get("size") ?? "all";
  const query = url.searchParams.get("q") ?? "";
  requests.push({ page: currentPage, size, query });
  const selectedSize = size === "all" ? 2 : Number(size);
  const total = query ? 1 : size === "3" ? 2 : 31;
  const count = query ? 1 : size === "3" ? 2 : currentPage === 3 ? 1 : 15;
  await route.fulfill({
    contentType: "application/json",
    body: JSON.stringify({
      ok: true,
      items: Array.from({ length: count }, (_, index) => item((currentPage - 1) * 15 + index + 1, selectedSize)),
      total,
      page: currentPage,
      pageSize: 15,
      totalPages: Math.ceil(total / 15),
    }),
  });
});

try {
  await page.goto(`${baseUrl}/tarot`, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Từ điển", exact: true }).click();
  const dialog = page.getByRole("dialog", { name: "Từ điển Tarot" });
  await dialog.waitFor();
  await dialog.getByRole("tab", { name: "Mật Mã Cộng Hưởng" }).click();
  await dialog.getByRole("heading", { name: "Mật Mã Cộng Hưởng" }).waitFor();
  if (await dialog.locator(".tarot-combo-library-card").count() !== 15) {
    throw new Error("Trang đầu không hiển thị đúng 15 combo.");
  }

  await dialog.getByRole("button", { name: /Định Mệnh \(3 lá\)/ }).click();
  await dialog.getByText("Tìm thấy 2 combo", { exact: true }).waitFor();
  const search = dialog.getByPlaceholder("Ví dụ: Karmic Bond hoặc The Lovers");
  await search.fill("The Lovers");
  await dialog.getByText("Tìm thấy 1 combo", { exact: true }).waitFor();
  if (!requests.some((request) => request.size === "3" && request.query === "The Lovers")) {
    throw new Error("Bộ lọc số lá và tìm kiếm chưa được gửi đồng thời.");
  }

  await search.fill("");
  await dialog.getByRole("button", { name: /^Tất cả/ }).click();
  await dialog.getByText("Tìm thấy 31 combo", { exact: true }).waitFor();
  await dialog.getByRole("button", { name: "2", exact: true }).click();
  await dialog.getByText("Trang 2 / 3", { exact: true }).waitFor();
  if (!requests.some((request) => request.page === 2 && request.size === "all")) {
    throw new Error("Phân trang chưa tải trang thứ hai từ API.");
  }

  await dialog.locator(".tarot-combo-library-card").first().click();
  const back = dialog.getByRole("button", { name: /Trở về Mật Mã Cộng Hưởng/ });
  await back.waitFor();
  if (!(await back.evaluate((element) => document.activeElement === element))) {
    throw new Error("Focus chưa được chuyển tới nút trở về khi mở chi tiết.");
  }
  await dialog.getByRole("heading", { name: "Mối Liên Kết Nghiệp Quả 1" }).waitFor();
  if (await dialog.locator(".tarot-combo-domain").count() !== 5) {
    throw new Error("Chi tiết không có đủ 5 lĩnh vực chính.");
  }
  await dialog.getByRole("button", { name: /Tài Chính/ }).click();
  await dialog.getByRole("button", { name: "Tiết Kiệm / Tích Lũy" }).click();
  await dialog.getByText("Thông điệp xuôi dành cho Tiết Kiệm / Tích Lũy.", { exact: true }).waitFor();
  await dialog.getByText("Thông điệp ngược dành cho Tiết Kiệm / Tích Lũy.", { exact: true }).waitFor();
  if (await dialog.locator(".tarot-combo-orientation-block").count() !== 2) {
    throw new Error("Ngách chưa hiển thị đủ hai khối Xuôi và Ngược.");
  }
  if (await dialog.locator(".tarot-combo-orientation-block img.is-reversed").count() !== 2) {
    throw new Error("Ảnh ở khối Ngược chưa được xoay đủ.");
  }
  if (await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)) {
    throw new Error("Từ điển combo làm tràn ngang viewport 375px.");
  }
  if (await page.evaluate(() => document.body.style.overflow !== "hidden")) {
    throw new Error("Modal Từ điển chưa khóa cuộn body.");
  }
  await page.keyboard.press("Escape");
  await dialog.waitFor({ state: "hidden" });

  console.log(JSON.stringify({
    pageSize: 15,
    filterAndSearch: true,
    pagination: true,
    domains: 5,
    uprightAndReversed: true,
    focus: true,
    escape: true,
    viewport: "375x812",
    noHorizontalOverflow: true,
  }, null, 2));
} catch (error) {
  console.error((await page.locator("body").innerText()).slice(-4_000));
  throw error;
} finally {
  await browser.close();
}
