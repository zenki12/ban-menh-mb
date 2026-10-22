const playwrightModule = process.env.PLAYWRIGHT_MODULE_URL ?? "playwright";
const { chromium } = await import(playwrightModule);

const baseUrl = process.env.TAROT_BASE_URL ?? "http://localhost:3000";
const browser = await chromium.launch({
  executablePath: process.env.PLAYWRIGHT_BROWSER_PATH,
  headless: true,
});
const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
const today = new Date().toISOString().slice(0, 10);
let comboRequest = null;
let readingRequest = null;

await page.addInitScript(({ date }) => {
  window.localStorage.setItem("tarot_daily_seen", date);
}, { date: today });

await page.route("**/api/tarot/clarify?*", async (route) => {
  const nicheKey = new URL(route.request().url()).searchParams.get("niche");
  await route.fulfill({
    contentType: "application/json",
    body: JSON.stringify({
      nicheKey,
      questions: [
        "Bạn có đang giữ lại điều đã không còn phù hợp?",
        "Bạn có đang né tránh một quyết định quan trọng?",
        "Bạn có sẵn sàng hành động khác đi không?",
      ],
    }),
  });
});

await page.route("**/api/tarot/card/*", async (route) => {
  const cardId = Number(new URL(route.request().url()).pathname.split("/").at(-1));
  await route.fulfill({
    contentType: "application/json",
    body: JSON.stringify({
      ok: true,
      card: {
        id: cardId,
        nameEn: "The Fool",
        nameVi: "Kẻ Khờ",
        number: "0",
        orientation: "upright",
        element: "Khí",
        planet: "Sao Thiên Vương",
        zodiac: "Bảo Bình",
        numerology: "Khởi nguyên",
        keywords: ["Khởi đầu", "Tự do"],
        meaning: "Một hành trình mới đang mở ra.",
        aspectMeaning: "Trong ngách đã chọn, đây là lời mời bước về phía trước.",
      },
    }),
  });
});

await page.route("**/api/tarot/reading", async (route) => {
  readingRequest = JSON.parse(route.request().postData() ?? "{}");
  const card = readingRequest.cards[0];
  await route.fulfill({
    contentType: "application/json",
    body: JSON.stringify({
      ok: true,
      fallback: false,
      source: "gemini",
      disclosure: "Nội dung được AI hỗ trợ diễn giải.",
      reading: {
        overview: "Thông điệp kiểm thử cộng hưởng.",
        cards: [{ position: card.position, cardName: card.nameVi, interpretation: "Một chuyển động mới đang hình thành." }],
        synergy: "Các nguồn năng lượng đang hội tụ.",
        advice: ["Quan sát.", "Lựa chọn.", "Hành động."],
        markdown: "### Lời Hồi Đáp Từ Vũ Trụ",
      },
    }),
  });
});

await page.route("**/api/tarot/combo", async (route) => {
  comboRequest = JSON.parse(route.request().postData() ?? "{}");
  await route.fulfill({
    contentType: "application/json",
    body: JSON.stringify({
      ok: true,
      testMode: true,
      combos: [{
        id: "the tower_death",
        size: 2,
        title: "Sụp Đổ & Tái Sinh (Total Rebirth)",
        description: "Một chu kỳ cũ khép lại.",
        text: "Sự kết hợp này yêu cầu bạn buông cấu trúc cũ để tạo khoảng trống cho một khởi đầu chân thật hơn.",
        orientationVariant: "Up_Rev",
        cards: [
          { id: 16, nameEn: "The Tower", nameVi: "Tòa Tháp", orientation: "upright" },
          { id: 13, nameEn: "Death", nameVi: "Cái Chết", orientation: "reversed" },
        ],
      }],
    }),
  });
});

try {
  await page.goto(`${baseUrl}/tarot`, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Bắt đầu từng bước" }).click();
  await page.getByRole("button", { name: /Tình yêu/ }).click();
  await page.locator(".tarot-niche").first().click();
  await page.getByPlaceholder("Tên bạn muốn được gọi (VD: Minh, Linh...)").fill("Turniodev");
  await page.getByRole("button", { name: "Tiếp tục" }).click();
  await page.getByRole("button", { name: /1 lá/ }).click();
  await page.getByRole("button", { name: "Mở bài" }).click();
  await page.getByRole("button", { name: "Chọn lá bài 1", exact: true }).click();
  await page.locator("#tarot-reveal-card-0").click();
  const detail = page.getByRole("dialog", { name: /Chi tiết lá/ });
  await detail.waitFor();
  await detail.getByRole("button", { name: "Tiếp tục kết nối tâm thức" }).click();
  for (let index = 0; index < 3; index += 1) {
    await page.getByRole("button", { name: "CÓ", exact: true }).click();
  }

  const combo = page.getByRole("region", { name: "Cộng hưởng định mệnh" });
  await combo.waitFor();
  await combo.getByText("Cộng Hưởng Định Mệnh", { exact: true }).waitFor();
  await combo.getByText("Sụp Đổ & Tái Sinh", { exact: true }).waitFor();
  await combo.getByText("Total Rebirth", { exact: true }).waitFor();
  await combo.getByText("Chế độ kiểm thử", { exact: true }).waitFor();
  if (await combo.locator("img").count() !== 2) throw new Error("Khối combo không hiển thị đủ hai ảnh lá bài.");
  if (await combo.locator(".tarot-combo-plus").count() !== 1) throw new Error("Khối combo thiếu dấu cộng giữa các lá.");
  if (!comboRequest?.testModeRequested) throw new Error("Tên Turniodev chưa kích hoạt yêu cầu test mode.");
  if (await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)) {
    throw new Error("Khối combo làm tràn ngang viewport 375px.");
  }
  await page.emulateMedia({ reducedMotion: "reduce" });
  const animationName = await combo.locator(".tarot-combo-sigil").evaluate((element) => getComputedStyle(element).animationName);
  if (animationName !== "none") throw new Error("Sigil chưa tắt chuyển động khi người dùng bật reduced motion.");

  console.log(JSON.stringify({
    combo: true,
    cards: 2,
    plus: true,
    testMode: true,
    viewport: "375x812",
    noHorizontalOverflow: true,
    reducedMotion: true,
  }, null, 2));
} catch (error) {
  console.error((await page.locator("body").innerText()).slice(-4_000));
  throw error;
} finally {
  await browser.close();
}
