import { NextResponse } from "next/server";

export async function GET() {
  const key = process.env.GEMINI_API_KEY?.trim() || "";
  const model = "gemini-3.1-pro-preview";
  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: "Hãy viết một thông điệp Tarot triết lý ngắn bằng tiếng Việt." }],
            },
          ],
        }),
      }
    );
    const data = await res.json();
    return NextResponse.json({
      keyPrefix: key.slice(0, 10),
      modelTested: model,
      httpStatus: res.status,
      ok: res.ok,
      data,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}
