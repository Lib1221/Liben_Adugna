import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles, Loader2 } from 'lucide-react';
import geminiService from '../services/geminiService';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'ai';
    timestamp: Date;
}

const AIChatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Auto-scroll to bottom when new messages arrive
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Focus input when chat opens
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    // Initialize chat with welcome message
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            const welcomeMessage: Message = {
                id: 'welcome',
                text: "👋 Hi! I'm Liben Adugna's AI Assistant. I can answer questions about his projects, skills, and experience. What would you like to know?",
                sender: 'ai',
                timestamp: new Date(),
            };
            setMessages([welcomeMessage]);
        }
    }, [isOpen]);

    const handleSendMessage = async () => {
        if (!inputValue.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text: inputValue.trim(),
            sender: 'user',
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);
        setError(null);

        try {
            if (!geminiService.isReady()) {
                throw new Error('AI service is not ready. Please check your API key configuration.');
            }

            const response = await geminiService.sendMessage(userMessage.text);

            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: response,
                sender: 'ai',
                timestamp: new Date(),
            };

            setMessages(prev => [...prev, aiMessage]);
        } catch (err: any) {
            setError(err.message || 'Failed to get response. Please try again.');

            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: err.message || 'Sorry, I encountered an error. Please try again.',
                sender: 'ai',
                timestamp: new Date(),
            };

            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleClose = () => {
        setIsOpen(false);
        // Reset chat after closing
        setTimeout(() => {
            setMessages([]);
            geminiService.resetChat();
        }, 300);
    };

    // Suggested questions
    const suggestedQuestions = [
        "What projects has Liben built?",
        "What technologies does Liben know?",
        "Tell me about the Smart Gebere project",
        "What's Liben's expertise?"
    ];

    return (
        <>
            {/* Floating Chat Button */}
            <motion.button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 p-4 rounded-full shadow-2xl hover:shadow-yellow-400/50 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                    boxShadow: [
                        '0 0 20px rgba(250, 204, 21, 0.4)',
                        '0 0 30px rgba(250, 204, 21, 0.6)',
                        '0 0 20px rgba(250, 204, 21, 0.4)',
                    ],
                }}
                transition={{
                    boxShadow: {
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    },
                }}
                style={{ display: isOpen ? 'none' : 'block' }}
            >
                <Sparkles className="w-6 h-6" />
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.8 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="fixed bottom-6 right-6 z-50 w-[400px] h-[600px] max-w-[calc(100vw-3rem)] max-h-[calc(100vh-3rem)] flex flex-col"
                    >
                        {/* Glassmorphic Container */}
                        <div className="flex flex-col h-full backdrop-blur-xl bg-gray-900/90 border border-gray-700/50 rounded-2xl shadow-2xl overflow-hidden">
                            {/* Header */}
                            <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="bg-white/20 p-2 rounded-lg">
                                        <Sparkles className="w-5 h-5 text-gray-900" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 text-sm">Liben Adugna AI Assistant</h3>
                                        <p className="text-xs text-gray-800">Ask me anything about Liben!</p>
                                    </div>
                                </div>
                                <button
                                    onClick={handleClose}
                                    className="text-gray-900 hover:bg-white/20 p-2 rounded-lg transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Messages Area */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                                {messages.map((message) => (
                                    <motion.div
                                        key={message.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div
                                            className={`max-w-[80%] p-3 rounded-2xl ${message.sender === 'user'
                                                    ? 'bg-yellow-400 text-gray-900 rounded-br-sm'
                                                    : 'bg-gray-800 text-gray-200 rounded-bl-sm border border-gray-700'
                                                }`}
                                        >
                                            <p className="text-sm whitespace-pre-wrap break-words">{message.text}</p>
                                            <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-gray-700' : 'text-gray-500'}`}>
                                                {message.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}

                                {/* Loading Indicator */}
                                {isLoading && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="flex justify-start"
                                    >
                                        <div className="bg-gray-800 text-gray-200 p-3 rounded-2xl rounded-bl-sm border border-gray-700">
                                            <div className="flex items-center gap-2">
                                                <Loader2 className="w-4 h-4 animate-spin text-yellow-400" />
                                                <span className="text-sm">Thinking...</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Suggested Questions (only show at start) */}
                                {messages.length === 1 && !isLoading && (
                                    <div className="space-y-2">
                                        <p className="text-xs text-gray-500 text-center">💡 Try asking:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {suggestedQuestions.map((question, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => setInputValue(question)}
                                                    className="text-xs bg-gray-800/50 hover:bg-gray-700 text-yellow-400 px-3 py-2 rounded-full border border-gray-700 transition-colors"
                                                >
                                                    {question}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div ref={messagesEndRef} />
                            </div>

                            {/* Error Display */}
                            {error && (
                                <div className="px-4 py-2 bg-red-500/10 border-t border-red-500/20">
                                    <p className="text-xs text-red-400">⚠️ {error}</p>
                                </div>
                            )}

                            {/* Input Area */}
                            <div className="p-4 bg-gray-800/50 border-t border-gray-700/50">
                                <div className="flex items-center gap-2">
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        placeholder="Ask about Liben's work..."
                                        className="flex-1 bg-gray-900 text-gray-200 placeholder-gray-500 px-4 py-3 rounded-xl border border-gray-700 focus:outline-none focus:border-yellow-400 transition-colors text-sm"
                                        disabled={isLoading}
                                    />
                                    <motion.button
                                        onClick={handleSendMessage}
                                        disabled={!inputValue.trim() || isLoading}
                                        className="bg-yellow-400 text-gray-900 p-3 rounded-xl hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Send className="w-5 h-5" />
                                    </motion.button>
                                </div>
                                <p className="text-xs text-gray-500 mt-2 text-center">
                                    Powered by Gemini AI • Portfolio Assistant
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default AIChatbot;
