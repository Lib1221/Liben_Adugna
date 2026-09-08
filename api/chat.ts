import type { IncomingMessage, ServerResponse } from "node:http";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { systemPrompt } from "../src/data/portfolioContext";

/**
 * Serverless endpoint for the portfolio chatbot.
 *
 * The Gemini API key lives only here (Vercel environment variable), never in the
 * client bundle. The system prompt is also fixed server-side so the endpoint cannot
 * be used as a general-purpose Gemini proxy.
 */

type ChatTurn = { role: "user" | "model"; text: string };

// Vercel's Node runtime adds these helpers to the standard request/response objects.
type VercelRequest = IncomingMessage & { body?: unknown };
type VercelResponse = ServerResponse & {
  status(code: number): VercelResponse;
  json(data: unknown): VercelResponse;
};

const MAX_MESSAGE_CHARS = 1000;
const MAX_HISTORY_TURNS = 10;
const MODEL = "gemini-2.5-flash";

const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!apiKey) {
    return res.status(503).json({ error: "Chat is not configured on the server." });
  }

  const body = (req.body ?? {}) as { message?: unknown; history?: unknown };
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!message) {
    return res.status(400).json({ error: "message is required" });
  }
  if (message.length > MAX_MESSAGE_CHARS) {
    return res.status(413).json({ error: `message must be under ${MAX_MESSAGE_CHARS} characters` });
  }

  const history: ChatTurn[] = Array.isArray(body.history)
    ? (body.history as unknown[])
        .filter(
          (t): t is ChatTurn =>
            typeof t === "object" &&
            t !== null &&
            ((t as ChatTurn).role === "user" || (t as ChatTurn).role === "model") &&
            typeof (t as ChatTurn).text === "string" &&
            (t as ChatTurn).text.length <= MAX_MESSAGE_CHARS,
        )
        .slice(-MAX_HISTORY_TURNS)
    : [];

  // Gemini requires the history to start with a user turn.
  while (history.length && history[0].role !== "user") history.shift();

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: MODEL,
      systemInstruction: systemPrompt,
      generationConfig: { maxOutputTokens: 500, temperature: 0.7, topP: 0.8, topK: 40 },
    });

    const chat = model.startChat({
      history: history.map((t) => ({ role: t.role, parts: [{ text: t.text }] })),
    });

    const result = await chat.sendMessage(message);
    const text = result.response.text();

    return res.status(200).json({ reply: text });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("chat error:", msg);

    if (/quota|429|RESOURCE_EXHAUSTED/i.test(msg)) {
      return res.status(429).json({ error: "The assistant is busy right now. Please try again in a minute." });
    }
    if (/SAFETY/i.test(msg)) {
      return res.status(200).json({
        reply: "I can't respond to that one. Ask me about Liben's projects, skills, or experience.",
      });
    }
    return res.status(502).json({ error: "The assistant could not answer right now." });
  }
}
