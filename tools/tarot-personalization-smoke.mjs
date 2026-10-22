const playwrightModule = process.env.PLAYWRIGHT_MODULE_URL ?? "playwright";
const { chromium } = await import(playwrightModule);

const baseUrl = process.env.TAROT_BASE_URL ?? "http://localhost:3000";
const browser = await chromium.launch({
  executablePath: process.env.PLAYWRIGHT_BROWSER_PATH,
  headless: true,
});
const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
const today = new Date().toISOString().slice(0, 10);

await page.addInitScript(({ date }) => {
  window.localStorage.setItem("tarot_daily_seen", date);
}, { date: today });

try {
  await page.goto(`${baseUrl}/tarot`, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Bắt đầu từng bước" }).click();
  await page.getByRole("button", { name: /Tình yêu/ }).click();
  await page.locator(".tarot-niche").first().click();
  await page.getByRole("button", { name: "Tự nhập" }).click();
  await page.getByPlaceholder("Điều bạn muốn vũ trụ giải đáp... (tùy chọn)").fill("Mối quan hệ hiện tại đang muốn dạy tôi điều gì?");
  await page.getByPlaceholder("Tên bạn muốn được gọi (VD: Minh, Linh...)").fill("Hương");
  await page.getByLabel("Ngày sinh").fill("1997-07-20");
  await page.getByRole("button", { name: "Nữ", exact: true }).click();

  await page.getByRole("button", { name: "Tiếp tục" }).click();
  await page.getByRole("button", { name: /1 lá/ }).click();
  await page.getByRole("button", { name: "Mở bài" }).click();
  await page.getByRole("heading", { name: "Rút bài từ bộ 78 lá" }).waitFor();
  await page.getByRole("button", { name: "Chọn lá bài 1", exact: true }).click();
  await page.getByRole("heading", { name: "Lật từng lá để mở thông điệp" }).waitFor();
  await page.locator(".tarot-reveal-grid article button").click();
  await page.getByRole("button", { name: "Xem luận giải" }).click();

  const questions = [];
  for (let index = 0; index < 3; index += 1) {
    const question = await page.locator(".tarot-consciousness-question").textContent();
    if (!question || !/(bỏ rơi|tổn thương|mối quan hệ|ranh giới|người ấy|đối phương)/i.test(question)) {
      throw new Error(`Câu hỏi tâm thức không thuộc chủ đề Tình yêu: ${question}`);
    }
    questions.push(question);
    await page.getByRole("button", { name: index % 2 === 0 ? "Có" : "Không", exact: true }).click();
  }

  await page.getByRole("heading", { name: "Thông điệp từ vũ trụ" }).waitFor();
  await page.getByRole("heading", { name: "Lời Hồi Đáp Từ Vũ Trụ" }).waitFor({ timeout: 25_000 });
  const finalText = await page.locator(".tarot-stage--final").innerText();
  const fallback = finalText.includes("Gemini tạm thời không khả dụng");
  if (!fallback && (!finalText.includes("Hương") || !finalText.includes("Cự Giải") || !finalText.includes("Nước"))) {
    throw new Error("Bản đọc Gemini chưa thể hiện đủ tên, Cung Cự Giải và nguyên tố Nước.");
  }
  const overflows = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  if (overflows) throw new Error("Giao diện Tarot bị tràn ngang ở viewport 375px.");

  console.log(JSON.stringify({ profile: "Hương", dob: "1997-07-20", theme: "Tình yêu", questions, fallback }, null, 2));
} finally {
  await browser.close();
}
