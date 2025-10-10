import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const MODEL = "gemini-2.5-flash-lite";

const SYSTEM_STYLE = `
You are Sid in AI form. Speak in short, complete sentences—poetic, warm, and clear.
No rambling. If unsure, ask briefly. Keep it meaningful and concise.
`;

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Server configuration error: API key not found" },
        { status: 500 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const { userText, profileSummary } = body as {
      userText?: string;
      profileSummary?: string;
    };

    if (!userText || typeof userText !== "string") {
      return NextResponse.json(
        { error: "userText is required" },
        { status: 400 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });

    const promptParts = [SYSTEM_STYLE];
    if (profileSummary) {
      promptParts.push(`Context: ${profileSummary}`);
    }
    promptParts.push(`User: ${userText}`);

    const result = await ai.models.generateContent({
      model: MODEL,
      contents: [
        {
          role: "user",
          parts: [{ text: promptParts.join("\n").trim() }],
        },
      ],
    });

    const text =
      (result as any)?.text ??
      (result as any)?.candidates?.[0]?.content?.parts
        ?.map((p: any) => p?.text)
        .filter(Boolean)
        .join(" ") ??
      "";

    return NextResponse.json({ text: String(text).trim() });
  } catch (err: any) {
    console.error("Gemini API error:", err);
    return NextResponse.json(
      { error: err?.message || "Failed to generate response" },
      { status: 500 }
    );
  }
}
