const playwrightModule = process.env.PLAYWRIGHT_MODULE_URL ?? "playwright";
const { chromium } = await import(playwrightModule);

const baseUrl = process.env.TAROT_BASE_URL ?? "http://localhost:3000";
const browser = await chromium.launch({
  executablePath: process.env.PLAYWRIGHT_BROWSER_PATH,
  headless: true,
});

async function prepareTarot(page, spread) {
  await page.addInitScript((date) => {
    window.localStorage.setItem("tarot_daily_seen", date);
  }, new Date().toISOString().slice(0, 10));
  await page.goto(`${baseUrl}/tarot`, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Bắt đầu từng bước" }).click();
  await page.getByRole("button", { name: /Sự nghiệp/ }).click();
  await page.locator(".tarot-niche").first().click();
  await page.getByRole("button", { name: "Tiếp tục" }).click();
  await page.getByRole("button", { name: new RegExp(`^${spread} lá`) }).click();
  await page.getByRole("button", { name: "Mở bài" }).click();
  await page.locator(".tarot-deck-stack").waitFor({ timeout: 10_000 });
}

async function assertCardBack(locator, label) {
  const image = locator.locator("img").first();
  await image.waitFor();
  const state = await image.evaluate((element) => ({
    loaded: element.complete && element.naturalWidth === 1024 && element.naturalHeight === 1536,
    path: new URL(element.src).pathname,
  }));
  if (!state.loaded || state.path !== "/tarot_cards/card-back.png") {
    throw new Error(`${label} không dùng đúng mặt lưng Celestial Compass.`);
  }
}

async function desktopFlow() {
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await prepareTarot(page, 3);
  await assertCardBack(page.locator(".tarot-deck-stack"), "Chồng bài 3D");
  if (await page.locator(".tarot-deck-stack-layer").count() !== 7) {
    throw new Error("Chồng bài chưa có đủ lớp tạo chiều sâu.");
  }

  await page.getByRole("button", { name: "Xào Bài" }).click();
  await page.locator(".tarot-deck-ritual.is-shuffling").waitFor();
  const startedAt = Date.now();
  if (await page.locator(".tarot-shuffle-packet").count() !== 2) {
    throw new Error("Hoạt cảnh xào không tách bộ bài thành hai phần.");
  }
  await page.locator(".tarot-deck-ritual.is-fanned").waitFor({ timeout: 3_000 });
  const shuffleDuration = Date.now() - startedAt;
  if (shuffleDuration < 1_100 || shuffleDuration > 2_400) {
    throw new Error(`Thời lượng xào ngoài khoảng kỳ vọng: ${shuffleDuration}ms.`);
  }

  const cards = page.locator(".tarot-fan-card");
  if (await cards.count() !== 78) throw new Error("Quạt bài không có đủ 78 lá.");
  await assertCardBack(cards.first(), "Quạt bài");
  await page.waitForTimeout(1_300);
  if (process.env.TAROT_DESKTOP_SCREENSHOT) {
    await page.screenshot({ fullPage: true, path: process.env.TAROT_DESKTOP_SCREENSHOT });
  }
  const exposedCard = cards.last();
  const beforeHover = await exposedCard.evaluate((element) => getComputedStyle(element).transform);
  await exposedCard.hover();
  await page.waitForTimeout(320);
  const afterHover = await exposedCard.evaluate((element) => getComputedStyle(element).transform);
  if (beforeHover === afterHover) throw new Error("Lá trong quạt không nhô lên khi hover.");

  await page.mouse.move(0, 0);
  await cards.nth(38).focus();
  await page.keyboard.press("Enter");
  await page.locator(".tarot-fan-card.is-drawn").waitFor();
  if (await page.locator(".tarot-drawn-slot.is-filled").count() !== 1) {
    throw new Error("Lá đầu tiên chưa bay xuống khay đã chọn.");
  }
  for (const index of [39, 40]) {
    await cards.nth(index).focus();
    await page.keyboard.press("Enter");
    await page.waitForTimeout(80);
  }
  await page.getByRole("heading", { name: "Lật từng lá để mở thông điệp" }).waitFor({ timeout: 3_000 });
  if (await page.locator(".tarot-reveal-card").count() !== 3) {
    throw new Error("Spread 3 lá chưa tự chuyển đúng sang reveal.");
  }
  await page.close();
  return { shuffleDuration };
}

async function mobileReducedMotionFlow() {
  const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await prepareTarot(page, 1);
  await page.getByRole("button", { name: "Xào Bài" }).click();
  await page.locator(".tarot-deck-ritual.is-fanned").waitFor();
  if (await page.locator(".tarot-deck-ritual.is-shuffling").count() !== 0) {
    throw new Error("Reduced motion chưa bỏ qua trạng thái xào.");
  }

  const fan = page.locator(".tarot-card-fan");
  const fanMetrics = await fan.evaluate((element) => ({
    clientWidth: element.clientWidth,
    scrollWidth: element.scrollWidth,
    touchAction: getComputedStyle(element).touchAction,
  }));
  if (fanMetrics.scrollWidth <= fanMetrics.clientWidth || fanMetrics.touchAction !== "pan-x") {
    throw new Error("Rail mobile chưa hỗ trợ cuộn ngang cảm ứng.");
  }
  await fan.evaluate((element) => { element.scrollLeft = 480; });
  await page.waitForTimeout(50);
  if (await fan.evaluate((element) => element.scrollLeft) <= 0) {
    throw new Error("Rail mobile không cuộn ngang được.");
  }

  const firstCard = page.locator(".tarot-fan-card").first();
  const box = await firstCard.boundingBox();
  if (!box || box.width < 44 || box.height < 44) throw new Error("Touch target lá bài nhỏ hơn 44px.");
  if (await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)) {
    throw new Error("Rail bài làm tràn ngang toàn document 375px.");
  }
  const ritualHeight = await page.locator(".tarot-deck-ritual").evaluate((element) => element.getBoundingClientRect().height);
  if (ritualHeight > 520) throw new Error(`Deck ritual mobile quá cao: ${ritualHeight}px.`);
  if (process.env.TAROT_MOBILE_SCREENSHOT) {
    await page.screenshot({ fullPage: true, path: process.env.TAROT_MOBILE_SCREENSHOT });
  }

  await firstCard.focus();
  await page.keyboard.press("Enter");
  await page.getByRole("heading", { name: "Lật từng lá để mở thông điệp" }).waitFor({ timeout: 2_000 });
  await page.close();
  return { railScrollWidth: fanMetrics.scrollWidth, ritualHeight };
}

try {
  const desktop = await desktopFlow();
  const mobile = await mobileReducedMotionFlow();
  console.log(JSON.stringify({
    states: ["idle", "shuffling", "fanned"],
    desktopCards: 78,
    desktopSpread: 3,
    shuffleDurationMs: desktop.shuffleDuration,
    hover: true,
    keyboardSelection: true,
    mobileViewport: "375x812",
    mobileRailScrollWidth: mobile.railScrollWidth,
    mobileRitualHeight: mobile.ritualHeight,
    reducedMotionSkip: true,
    autoAdvance: true,
    noDocumentOverflow: true,
  }, null, 2));
} finally {
  await browser.close();
}
