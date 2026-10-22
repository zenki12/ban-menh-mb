const playwrightModule = process.env.PLAYWRIGHT_MODULE_URL ?? "playwright";
const { chromium } = await import(playwrightModule);

const baseUrl = process.env.TAROT_BASE_URL ?? "http://localhost:3000";
const browser = await chromium.launch({
  executablePath: process.env.PLAYWRIGHT_BROWSER_PATH,
  headless: true,
});
const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
const today = new Date().toISOString().slice(0, 10);
const jobQuestions = [
  "Bạn có đang dành nhiều thời gian để than vãn về tình hình thất nghiệp của mình hơn là dành thời gian để hành động cải thiện nó không?",
  "Trong tuần qua, bạn có dành ít nhất 30 phút mỗi ngày để chủ động tìm kiếm và nộp hồ sơ, hay chỉ lướt qua loa cho có lệ?",
  "Có phải bạn đang viện cớ 'chưa tìm thấy công việc phù hợp' để trì hoãn việc cập nhật CV và hồ sơ năng lực của mình không?",
];
let readingRequest = null;

await page.addInitScript(({ date }) => {
  window.localStorage.setItem("tarot_daily_seen", date);
}, { date: today });

await page.route("**/api/tarot/clarify?*", async (route) => {
  const nicheKey = new URL(route.request().url()).searchParams.get("niche");
  await route.fulfill({
    contentType: "application/json",
    body: JSON.stringify({ ok: true, nicheKey, questions: jobQuestions }),
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
        overview: "Thông điệp thử nghiệm cho hành trình xin việc.",
        cards: [{ position: card.position, cardName: card.nameVi, interpretation: "Hãy tập trung vào hành động cụ thể." }],
        synergy: "Một lá bài nhấn mạnh sự chủ động.",
        advice: ["Cập nhật CV.", "Nộp hồ sơ có chọn lọc.", "Theo dõi phản hồi."],
        markdown: "### Lời Hồi Đáp Từ Vũ Trụ",
      },
    }),
  });
});

async function chooseCareerJob() {
  await page.getByRole("button", { name: "Bắt đầu từng bước" }).click();
  await page.getByRole("heading", { name: "Chọn lĩnh vực" }).waitFor();
  await page.getByRole("button", { name: /Sự nghiệp/ }).click();
  await page.getByRole("button", { name: /Xin việc làm/i }).click();
  await page.getByRole("button", { name: "Tiếp tục" }).click();
}

async function finishOneCardReading() {
  await page.getByRole("button", { name: /1 lá/ }).click();
  await page.getByRole("button", { name: "Mở bài" }).click();
  await page.getByRole("heading", { name: "Rút bài từ bộ 78 lá" }).waitFor();
  await page.getByRole("button", { name: "Chọn lá bài 1", exact: true }).click();
  await page.getByRole("heading", { name: "Lật từng lá để mở thông điệp" }).waitFor();
  await page.locator(".tarot-reveal-grid article button").click();
  await page.getByRole("button", { name: "Xem luận giải" }).click();

  await page.getByText(jobQuestions[0]).waitFor();
  await page.getByRole("button", { name: "CHIA SẺ THÊM THÔNG TIN" }).click();
  await page.getByLabel("Câu chuyện bạn muốn chia sẻ thêm (không bắt buộc)").fill("Tôi đã nộp 12 hồ sơ nhưng chưa nhận được phản hồi.");
  await page.getByRole("button", { name: "CÓ", exact: true }).click();
  await page.getByText(jobQuestions[1]).waitFor();
  await page.getByRole("button", { name: "KHÔNG", exact: true }).click();
  await page.getByText(jobQuestions[2]).waitFor();
  await page.getByRole("button", { name: "CÓ", exact: true }).click();
  await page.getByText("Thông điệp thử nghiệm cho hành trình xin việc.").waitFor();
}

try {
  await page.goto(`${baseUrl}/tarot`, { waitUntil: "networkidle" });
  await chooseCareerJob();
  await finishOneCardReading();

  if (readingRequest?.nicheKey !== "job_search") throw new Error("Request AI không giữ nicheKey job_search.");
  if (readingRequest?.additionalContext !== "Tôi đã nộp 12 hồ sơ nhưng chưa nhận được phản hồi.") {
    throw new Error("Phần chia sẻ thêm chưa được gửi vào luận giải.");
  }
  if (readingRequest?.clarifications?.map((item) => item.question).join("|") !== jobQuestions.join("|")) {
    throw new Error("Ba câu hỏi niche không được giữ nguyên trong request AI.");
  }
  const storedThemeDay = await page.evaluate(() => Object.entries(localStorage).find(([key]) => key.startsWith("bm_tarot_theme_day_v1:career_")));
  if (!storedThemeDay?.[1]?.startsWith("career_")) throw new Error("Chưa lưu dấu chủ đề/ngày sau khi hoàn tất trải bài.");

  await page.getByRole("button", { name: "Trở về đầu hành trình" }).click();
  await chooseCareerJob();
  const warning = page.getByRole("dialog", { name: "Vũ Trụ Đã Lên Tiếng" });
  await warning.waitFor();
  await page.getByText("Bạn đã trải bài chủ đề này hôm nay.", { exact: false }).waitFor();
  if (await page.evaluate(() => document.body.style.overflow !== "hidden")) throw new Error("Popup chưa khóa body scroll.");
  if (await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)) throw new Error("Popup tràn ngang ở 375px.");
  await page.getByRole("button", { name: "Tiếp Tục", exact: true }).click();
  await warning.waitFor({ state: "hidden" });
  await page.getByRole("heading", { name: "Chọn kiểu trải bài" }).waitFor();

  await page.reload({ waitUntil: "networkidle" });
  await chooseCareerJob();
  await page.getByRole("dialog", { name: "Vũ Trụ Đã Lên Tiếng" }).waitFor();
  await page.getByRole("button", { name: "Quay Lại", exact: true }).click();
  await page.getByRole("heading", { name: "Khám phá thông điệp Tarot của bạn" }).waitFor();

  console.log(JSON.stringify({
    niche: "job_search",
    questions: jobQuestions.length,
    additionalContext: true,
    themeDayStored: true,
    warning: true,
    continueAction: true,
    backAction: true,
    viewport: "375x812",
    bodyScrollLocked: true,
    noHorizontalOverflow: true,
  }, null, 2));
} finally {
  await browser.close();
}
