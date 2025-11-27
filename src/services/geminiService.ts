import { GoogleGenerativeAI, ChatSession } from '@google/generative-ai';
import { systemPrompt } from '../data/portfolioContext';

/**
 * Gemini AI Service
 * Handles all interactions with Google's Gemini AI API
 */

class GeminiService {
    private genAI: GoogleGenerativeAI | null = null;
    private chatSession: ChatSession | null = null;
    private initialized: boolean = false;

    constructor() {
        this.initialize();
    }

    /**
     * Initialize Gemini AI with API key from environment variables
     */
    private initialize() {
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

        if (!apiKey) {
            console.error('❌ Gemini API key not found. Please add VITE_GEMINI_API_KEY to your .env.local file');
            return;
        }

        try {
            this.genAI = new GoogleGenerativeAI(apiKey);
            this.initialized = true;
            console.log('✅ Gemini AI initialized successfully');
        } catch (error) {
            console.error('❌ Failed to initialize Gemini AI:', error);
        }
    }

    /**
     * Start a new chat session with the portfolio context
     */
    startChat() {
        if (!this.initialized || !this.genAI) {
            throw new Error('Gemini AI is not initialized. Please check your API key.');
        }

        try {
            const model = this.genAI.getGenerativeModel({
                model: 'gemini-pro',
            });

            this.chatSession = model.startChat({
                history: [],
                generationConfig: {
                    maxOutputTokens: 500,
                    temperature: 0.7,
                    topP: 0.8,
                    topK: 40,
                },
            });

            console.log('🚀 New chat session started');
        } catch (error) {
            console.error('❌ Failed to start chat session:', error);
            throw error;
        }
    }

    /**
     * Send a message to the AI and get a response
     * @param userMessage - The user's question
     * @returns AI response text
     */
    async sendMessage(userMessage: string): Promise<string> {
        if (!this.chatSession) {
            this.startChat();
        }

        if (!this.chatSession) {
            throw new Error('Failed to create chat session');
        }

        try {
            // Combine system prompt with user message for context
            const fullPrompt = `${systemPrompt}\n\n**User Question:** ${userMessage}`;

            const result = await this.chatSession.sendMessage(fullPrompt);
            const response = await result.response;
            const text = response.text();

            return text;
        } catch (error: any) {
            console.error('❌ Error sending message to Gemini:', error);

            // Handle specific error cases
            if (error?.message?.includes('API key')) {
                throw new Error('Invalid API key. Please check your Gemini API key configuration.');
            } else if (error?.message?.includes('quota')) {
                throw new Error('API quota exceeded. Please try again later.');
            } else if (error?.message?.includes('SAFETY')) {
                return "I apologize, but I can't respond to that. Please ask me about Liben's portfolio, projects, or skills!";
            }

            throw new Error('Failed to get response from AI. Please try again.');
        }
    }

    /**
     * Reset the chat session (start fresh conversation)
     */
    resetChat() {
        this.chatSession = null;
        console.log('🔄 Chat session reset');
    }

    /**
     * Check if the service is ready to use
     */
    isReady(): boolean {
        return this.initialized;
    }
}

// Export a singleton instance
export const geminiService = new GeminiService();
export default geminiService;
