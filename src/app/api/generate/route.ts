// Server-side only: your OpenAI key is safe here
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { title } = await req.json();

  const prompt = `You're an experienced private chef. Write a healthy balanced recipe under 50 words based on: ${title}`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // ✅ Secure
      },
      body: JSON.stringify({
        model: "gpt-4.1",
        messages: [
          { role: "system", content: prompt },
          { role: "user", content: title },
        ],
      }),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("OpenAI API error:", error);
    return NextResponse.json(
      { error: "Failed to generate content" },
      { status: 500 }
    );
  }
}
