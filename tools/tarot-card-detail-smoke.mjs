const playwrightModule = process.env.PLAYWRIGHT_MODULE_URL ?? "playwright";
const { chromium } = await import(playwrightModule);

const baseUrl = process.env.TAROT_BASE_URL ?? "http://localhost:3000";
const browser = await chromium.launch({
  executablePath: process.env.PLAYWRIGHT_BROWSER_PATH,
  headless: true,
});
const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
const today = new Date().toISOString().slice(0, 10);
let drawnCard = null;

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
        "Bạn có thật sự chủ động theo dõi phản hồi từ nhà tuyển dụng không?",
      ],
    }),
  });
});

await page.route("**/api/tarot/reading", async (route) => {
  const request = JSON.parse(route.request().postData() ?? "{} ");
  drawnCard = request.cards?.[0] ?? null;
  await route.fulfill({
    contentType: "application/json",
    body: JSON.stringify({
      ok: true,
      fallback: false,
      source: "gemini",
      disclosure: "Nội dung được AI hỗ trợ diễn giải.",
      reading: {
        overview: "Một cơ hội nghề nghiệp đang yêu cầu sự chuẩn bị rõ ràng.",
        cards: [{
          position: drawnCard.position,
          cardName: `${drawnCard.nameVi} · Ngược`,
          interpretation: "Lá bài nhắc bạn rà soát lại chiến lược xin việc.",
        }],
        synergy: "Một lá tập trung vào trọng tâm hiện tại.",
        advice: ["Chỉnh CV.", "Luyện phỏng vấn.", "Theo dõi phản hồi."],
        markdown: "### Lời Hồi Đáp Từ Vũ Trụ",
      },
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
        nameEn: drawnCard?.nameEn ?? "Two of Wands",
        nameVi: drawnCard?.nameVi ?? "Hai Gậy",
        number: "2",
        orientation: "reversed",
        element: "Lửa",
        planet: "Sao Hỏa",
        zodiac: "Bạch Dương",
        numerology: "Tầm nhìn, lựa chọn và sự cân bằng giữa hai hướng đi.",
        keywords: ["Lập kế hoạch", "Tầm nhìn", "Quyết định"],
        meaning: "Chiều ngược cho thấy tầm nhìn đang bị thu hẹp bởi nỗi sợ lựa chọn sai.",
        aspectMeaning: "Trong hành trình xin việc, hãy rà soát chiến lược và chuẩn bị một phương án thực tế hơn.",
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
  await page.getByRole("button", { name: "Tự nhập" }).click();
  await page.getByPlaceholder("Điều bạn muốn vũ trụ giải đáp... (tùy chọn)").fill("Tôi cần chuẩn bị gì để tìm được công việc phù hợp?");
  await page.getByPlaceholder("Tên bạn muốn được gọi (VD: Minh, Linh...)").fill("Nông Xuân Thái");
  await page.getByLabel("Ngày sinh").fill("1996-09-03");
  await page.getByRole("button", { name: "Nam", exact: true }).click();
  await page.getByRole("button", { name: "Tiếp tục" }).click();
  await page.getByRole("button", { name: /1 lá/ }).click();
  await page.evaluate(() => {
    Math.random = () => 0.1;
  });
  await page.getByRole("button", { name: "Mở bài" }).click();
  await page.getByRole("heading", { name: "Rút bài từ bộ 78 lá" }).waitFor();
  await page.getByRole("button", { name: "Chọn lá bài 1", exact: true }).click();
  await page.getByRole("heading", { name: "Lật từng lá để mở thông điệp" }).waitFor();
  await page.locator(".tarot-reveal-grid article button").click();
  const revealDialog = page.getByRole("dialog", { name: /Chi tiết lá/ });
  await revealDialog.waitFor();
  await revealDialog.getByText("Đã mở toàn bộ các lá", { exact: false }).waitFor();
  await revealDialog.getByRole("button", { name: "Tiếp tục kết nối tâm thức" }).click();
  await page.getByRole("heading", { name: "Kết nối tâm thức" }).waitFor();
  for (let index = 0; index < 3; index += 1) {
    await page.getByRole("button", { name: "CÓ", exact: true }).click();
  }

  const trigger = page.getByRole("button", { name: /Xem chi tiết chuyên sâu lá/ });
  await trigger.waitFor();
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: /Chi tiết lá/ });
  await dialog.waitFor();
  const identityHeader = dialog.locator(".tarot-reading-detail-header");
  await identityHeader.getByText("Nông Xuân Thái", { exact: true }).waitFor();
  await identityHeader.locator("time[datetime='1996-09-03']").filter({ hasText: "03/09/1996" }).waitFor();
  await identityHeader.getByText("Xin Việc Làm", { exact: true }).waitFor();
  if (await identityHeader.locator(".tarot-reading-detail-clock[aria-hidden='true'] svg").count() !== 1) {
    throw new Error("Header chưa hiển thị biểu tượng đồng hồ SVG trang trí.");
  }
  await page.getByText("Hành tinh: Sao Hỏa").waitFor();
  await page.getByText("Cung: Bạch Dương").waitFor();
  await page.getByText(/Số 2 - Tầm nhìn/).waitFor();
  await page.getByRole("heading", { name: "TRONG XIN VIỆC LÀM" }).waitFor();
  if (!(await dialog.locator(".tarot-reading-detail-visual img").evaluate((image) => image.classList.contains("is-reversed")))) {
    throw new Error("Ảnh lá ngược chưa được xoay 180 độ.");
  }
  if (await page.evaluate(() => document.body.style.overflow !== "hidden")) {
    throw new Error("Modal chưa khóa cuộn body.");
  }
  if (await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)) {
    throw new Error("Modal bị tràn ngang ở viewport 375px.");
  }

  await page.keyboard.press("Escape");
  await dialog.waitFor({ state: "hidden" });
  if (!(await trigger.evaluate((element) => document.activeElement === element))) {
    throw new Error("Focus chưa quay lại thẻ lá bài sau khi đóng bằng Escape.");
  }

  await trigger.click();
  await page.getByRole("dialog", { name: /Chi tiết lá/ }).waitFor();
  await page.locator(".fixed.inset-0.z-50").click({ position: { x: 2, y: 2 } });
  await page.getByRole("dialog", { name: /Chi tiết lá/ }).waitFor({ state: "hidden" });

  console.log(JSON.stringify({
    flow: "Sự nghiệp → Xin Việc Làm → chi tiết lá",
    badges: ["Sao Hỏa", "Bạch Dương", "Số 2"],
    reversed: true,
    viewport: "375x812",
    escape: true,
    outsideClick: true,
    focusRestored: true,
  }, null, 2));
} finally {
  await browser.close();
}
