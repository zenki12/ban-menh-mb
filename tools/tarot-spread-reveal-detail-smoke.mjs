const playwrightModule = process.env.PLAYWRIGHT_MODULE_URL ?? "playwright";
const { chromium } = await import(playwrightModule);

const baseUrl = process.env.TAROT_BASE_URL ?? "http://localhost:3000";
const browser = await chromium.launch({
  executablePath: process.env.PLAYWRIGHT_BROWSER_PATH,
  headless: true,
});
const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
const today = new Date().toISOString().slice(0, 10);
let readingRequest = null;

await page.addInitScript(({ date }) => {
  window.localStorage.setItem("tarot_daily_seen", date);
}, { date: today });

await page.route("**/api/tarot/clarify?*", async (route) => {
  const nicheKey = new URL(route.request().url()).searchParams.get("niche");
  await route.fulfill({
    contentType: "application/json",
    body: JSON.stringify({
      ok: true,
      nicheKey,
      questions: [
        "Bạn có đang trì hoãn việc cập nhật hồ sơ xin việc không?",
        "Bạn có đang tự giới hạn mình vì sợ bị từ chối không?",
        "Bạn có chủ động theo dõi phản hồi từ nhà tuyển dụng không?",
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
        nameEn: `Test Card ${cardId}`,
        nameVi: `Lá kiểm thử ${cardId}`,
        number: String((cardId % 9) + 1),
        orientation: "upright",
        element: "Lửa",
        planet: "Sao Hỏa",
        zodiac: "Bạch Dương",
        numerology: "Chủ động và chuyển hóa.",
        keywords: ["Chủ động", "Tầm nhìn", "Chuyển hóa"],
        meaning: "Ý nghĩa gốc phục vụ kiểm thử modal tuần tự.",
        aspectMeaning: "Trong xin việc làm, hãy biến nhận thức thành hành động cụ thể.",
      },
    }),
  });
});

await page.route("**/api/tarot/reading", async (route) => {
  readingRequest = JSON.parse(route.request().postData() ?? "{}");
  await route.fulfill({
    contentType: "application/json",
    body: JSON.stringify({
      ok: true,
      fallback: false,
      source: "gemini",
      disclosure: "Nội dung được AI hỗ trợ diễn giải.",
      reading: {
        overview: "Ba lá mở ra một tiến trình thay đổi rõ ràng.",
        cards: readingRequest.cards.map((card) => ({
          position: card.position,
          cardName: card.nameVi,
          interpretation: "Thông điệp kiểm thử theo đúng vị trí của lá bài.",
        })),
        synergy: "Các lá liên kết thành một hành trình từ nhận thức đến hành động.",
        advice: ["Cập nhật CV.", "Nộp hồ sơ có chọn lọc.", "Theo dõi phản hồi."],
        markdown: "### Lời Hồi Đáp Từ Vũ Trụ",
      },
    }),
  });
});

try {
  await page.goto(`${baseUrl}/tarot`, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Bắt đầu từng bước" }).click();
  await page.getByRole("heading", { name: "Chọn lĩnh vực" }).waitFor();
  await page.getByRole("button", { name: /Sự nghiệp/ }).click();
  await page.getByRole("button", { name: /Xin việc làm/i }).click();
  await page.getByRole("button", { name: "Tiếp tục" }).click();
  await page.getByRole("button", { name: /3 lá/ }).click();
  await page.getByRole("button", { name: "Mở bài" }).click();
  await page.getByRole("heading", { name: "Rút bài từ bộ 78 lá" }).waitFor();
  await page.getByRole("button", { name: "Chọn lá bài 1", exact: true }).click();
  await page.getByRole("button", { name: "Chọn lá bài 2", exact: true }).click();
  await page.getByRole("button", { name: "Chọn lá bài 3", exact: true }).click();
  await page.getByRole("heading", { name: "Lật từng lá để mở thông điệp" }).waitFor();

  if (await page.getByRole("button", { name: "Tiếp tục kết nối tâm thức" }).count() !== 0) {
    throw new Error("CTA kết nối tâm thức xuất hiện trước khi lật đủ ba lá.");
  }

  await page.locator("#tarot-reveal-card-0").click();
  let dialog = page.getByRole("dialog", { name: /Chi tiết lá/ });
  await dialog.waitFor();
  await dialog.getByText("Bạn còn 2 lá chưa lật", { exact: false }).waitFor();
  if (await dialog.getByRole("button", { name: "Trước" }).count() !== 0) {
    throw new Error("Carousel xuất hiện khi mới chỉ có một lá được lật.");
  }
  await dialog.getByRole("button", { name: "Lật lá tiếp theo" }).click();
  await dialog.waitFor({ state: "hidden" });
  if (!(await page.locator("#tarot-reveal-card-1").evaluate((element) => document.activeElement === element))) {
    throw new Error("Focus chưa chuyển đến lá chưa lật tiếp theo.");
  }

  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.locator("#tarot-reveal-card-1").click();
  dialog = page.getByRole("dialog", { name: /Chi tiết lá/ });
  await dialog.waitFor();
  await dialog.getByText("Bạn còn 1 lá chưa lật", { exact: false }).waitFor();
  await dialog.getByRole("button", { name: "Trước" }).click();
  await dialog.locator(".tarot-reading-detail-position").filter({ hasText: "Quá khứ" }).waitFor();
  await dialog.getByRole("button", { name: "Sau" }).click();
  await dialog.locator(".tarot-reading-detail-position").filter({ hasText: "Hiện tại" }).waitFor();
  await dialog.getByRole("button", { name: "Lật lá tiếp theo" }).click();

  await page.locator("#tarot-reveal-card-2").click();
  dialog = page.getByRole("dialog", { name: /Chi tiết lá/ });
  await dialog.waitFor();
  await dialog.getByText("Đã mở toàn bộ các lá", { exact: false }).waitFor();
  await dialog.getByText("3 / 3 lá đã mở", { exact: true }).waitFor();
  await page.setViewportSize({ width: 812, height: 375 });
  if (await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)) {
    throw new Error("Modal tuần tự bị tràn ngang ở chế độ ngang.");
  }
  await page.setViewportSize({ width: 375, height: 812 });
  if (await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)) {
    throw new Error("Modal tuần tự bị tràn ngang tại viewport 375px.");
  }
  if (await page.evaluate(() => document.body.style.overflow !== "hidden")) {
    throw new Error("Modal tuần tự chưa khóa cuộn body.");
  }
  await dialog.getByRole("button", { name: "Tiếp tục kết nối tâm thức" }).click();

  await page.getByRole("heading", { name: "Kết nối tâm thức" }).waitFor();
  for (let index = 0; index < 3; index += 1) {
    await page.getByRole("button", { name: "CÓ", exact: true }).click();
  }
  await page.getByRole("heading", { name: "Thông điệp từ vũ trụ" }).waitFor();
  if (readingRequest?.cards?.length !== 3) throw new Error("Gemini không nhận đủ ba lá sau bước tâm thức.");

  console.log(JSON.stringify({
    spread: 3,
    autoOpenDetail: true,
    remainingProgress: [2, 1, 0],
    revealedCarousel: true,
    nextCardFocus: true,
    consciousnessGate: true,
    finalReading: true,
    reducedMotion: true,
    landscape: "812x375",
    viewport: "375x812",
    noHorizontalOverflow: true,
  }, null, 2));
} finally {
  await browser.close();
}
