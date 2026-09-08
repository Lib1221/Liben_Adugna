/**
 * Chat client for the portfolio assistant.
 *
 * Talks to the serverless endpoint in /api/chat.ts, which holds the Gemini API key.
 * Nothing secret ships to the browser. Conversation history is kept here so the
 * server stays stateless.
 */

type ChatTurn = { role: "user" | "model"; text: string };

const ENDPOINT = "/api/chat";
const MAX_HISTORY_TURNS = 10;

class ChatService {
  private history: ChatTurn[] = [];

  isReady(): boolean {
    return true;
  }

  startChat() {
    this.history = [];
  }

  resetChat() {
    this.history = [];
  }

  async sendMessage(userMessage: string): Promise<string> {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage, history: this.history }),
    });

    let payload: { reply?: string; error?: string } = {};
    try {
      payload = await response.json();
    } catch {
      /* non-JSON body, handled below */
    }

    if (!response.ok || !payload.reply) {
      if (response.status === 429) throw new Error("quota");
      if (response.status === 503) throw new Error("not configured");
      throw new Error(payload.error || `Request failed (${response.status})`);
    }

    this.history.push({ role: "user", text: userMessage }, { role: "model", text: payload.reply });
    if (this.history.length > MAX_HISTORY_TURNS * 2) {
      this.history = this.history.slice(-MAX_HISTORY_TURNS * 2);
    }

    return payload.reply;
  }
}

export const geminiService = new ChatService();
export default geminiService;
