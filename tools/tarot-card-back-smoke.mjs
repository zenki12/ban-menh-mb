const playwrightModule = process.env.PLAYWRIGHT_MODULE_URL ?? "playwright";
const { chromium } = await import(playwrightModule);

const baseUrl = process.env.TAROT_BASE_URL ?? "http://localhost:3000";
const browser = await chromium.launch({
  executablePath: process.env.PLAYWRIGHT_BROWSER_PATH,
  headless: true,
});
const page = await browser.newPage({ viewport: { width: 375, height: 812 } });

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
        aspectMeaning: "Hãy bước tiếp với sự tỉnh thức.",
      },
    }),
  });
});

async function assertLoadedImage(locator, label) {
  await locator.waitFor();
  const state = await locator.evaluate((image) => ({
    complete: image.complete,
    naturalWidth: image.naturalWidth,
    naturalHeight: image.naturalHeight,
    path: new URL(image.src).pathname,
  }));
  if (!state.complete || state.naturalWidth !== 1024 || state.naturalHeight !== 1536) {
    throw new Error(`${label} chưa tải đúng ảnh Celestial Compass 1024×1536.`);
  }
  if (state.path !== "/tarot_cards/card-back.png") {
    throw new Error(`${label} dùng sai đường dẫn: ${state.path}.`);
  }
}

try {
  await page.goto(`${baseUrl}/tarot`, { waitUntil: "networkidle" });

  const dailyDialog = page.getByRole("dialog", { name: "Thông điệp mỗi ngày" });
  await dailyDialog.waitFor();
  await assertLoadedImage(dailyDialog.locator(".tarot-daily-back-image"), "Daily Card");
  const normalTransition = await dailyDialog.locator(".tarot-daily-flip-inner")
    .evaluate((element) => getComputedStyle(element).transitionDuration);
  if (normalTransition === "0s") throw new Error("Daily Card bị mất hiệu ứng flip 3D.");
  await dailyDialog.getByRole("button", { name: "Chạm để mở thông điệp hôm nay", exact: true }).last().click();
  await dailyDialog.locator(".tarot-daily-flip.is-revealed").waitFor();
  await dailyDialog.getByRole("button", { name: "Đã nhận thông điệp" }).click();

  await page.getByRole("button", { name: "Bắt đầu từng bước" }).click();
  await page.getByRole("button", { name: /Sự nghiệp/ }).click();
  await page.locator(".tarot-niche").first().click();
  await page.getByRole("button", { name: "Tiếp tục" }).click();
  await page.getByRole("button", { name: /1 lá/ }).click();
  await page.getByRole("button", { name: "Mở bài" }).click();

  const deckStack = page.locator(".tarot-deck-stack");
  await deckStack.waitFor();
  await assertLoadedImage(deckStack.locator(".tarot-deck-stack-image"), "Chồng bài 3D");
  await page.getByRole("button", { name: "Xào Bài" }).click();
  const deckCards = page.locator(".tarot-fan-card");
  await deckCards.first().waitFor();
  if (await deckCards.count() !== 78) throw new Error("Quạt bài không có đủ 78 lá úp.");
  await assertLoadedImage(deckCards.first().locator(".tarot-fan-card-image"), "Quạt 78 lá");
  await deckCards.first().focus();
  await page.keyboard.press("Enter");

  const revealBack = page.locator(".tarot-reveal-card-back").first();
  await revealBack.waitFor();
  await assertLoadedImage(revealBack.locator(".tarot-reveal-card-back-image"), "Bước reveal");
  await page.getByText("Chạm để lật lá số 1", { exact: true }).waitFor();
  if (await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)) {
    throw new Error("Ảnh mặt lưng làm tràn ngang viewport 375px.");
  }

  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.locator("#tarot-reveal-card-0").click();
  await page.locator("#tarot-reveal-card-0.is-flipped").waitFor();
  const reducedDuration = await page.locator("#tarot-reveal-card-0 .tarot-reveal-card-inner")
    .evaluate((element) => getComputedStyle(element).transitionDuration);
  if (Number.parseFloat(reducedDuration) > 0.001) {
    throw new Error(`Reduced motion chưa được giữ đúng: ${reducedDuration}.`);
  }

  console.log(JSON.stringify({
    asset: "/tarot_cards/card-back.png",
    dimensions: "1024x1536",
    dailyFlip: true,
    deckCards: 78,
    deckFan: true,
    revealFlip: true,
    reducedMotion: true,
    viewport: "375x812",
    noHorizontalOverflow: true,
  }, null, 2));
} catch (error) {
  console.error((await page.locator("body").innerText()).slice(-4_000));
  throw error;
} finally {
  await browser.close();
}
