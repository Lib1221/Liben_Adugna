import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useDragControls, useReducedMotion } from 'framer-motion';
import { X, Send, Sparkles, Loader2, GripVertical, Minimize2, Maximize2, Copy, Check } from 'lucide-react';
import geminiService from '../services/geminiService';
import { trackEvent } from '../utils/analytics';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

// Simple markdown parser for chatbot responses
const parseMarkdown = (text: string) => {
  // Split into lines
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];
  
  lines.forEach((line, index) => {
    let content: React.ReactNode = line;
    
    // Bold **text**
    content = line.split(/\*\*(.*?)\*\*/g).map((part, i) => 
      i % 2 === 1 ? <strong key={i} className="font-semibold text-yellow-400">{part}</strong> : part
    );
    
    // Bullet points
    if (line.trim().startsWith('- ') || line.trim().startsWith('• ')) {
      content = (
        <div key={index} className="flex gap-2 ml-2">
          <span className="text-yellow-500">•</span>
          <span>{line.trim().substring(2)}</span>
        </div>
      );
    }
    // Numbered lists
    else if (/^\d+\.\s/.test(line.trim())) {
      const num = line.trim().match(/^(\d+)\./)?.[1];
      content = (
        <div key={index} className="flex gap-2 ml-2">
          <span className="text-yellow-500 font-medium">{num}.</span>
          <span>{line.trim().replace(/^\d+\.\s/, '')}</span>
        </div>
      );
    }
    // Headers
    else if (line.trim().startsWith('### ')) {
      content = <div key={index} className="font-semibold text-white mt-2">{line.replace('### ', '')}</div>;
    }
    else if (line.trim().startsWith('## ')) {
      content = <div key={index} className="font-bold text-white mt-2">{line.replace('## ', '')}</div>;
    }
    // Code inline `code`
    else if (line.includes('`')) {
      content = line.split(/`(.*?)`/g).map((part, i) => 
        i % 2 === 1 ? <code key={i} className="px-1 py-0.5 bg-dark-200 rounded text-yellow-400 text-xs">{part}</code> : part
      );
    }
    
    if (typeof content === 'string' || Array.isArray(content)) {
      elements.push(<div key={index}>{content}</div>);
    } else {
      elements.push(content);
    }
  });
  
  return elements;
};

const AIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dragControls = useDragControls();
  const shouldReduceMotion = useReducedMotion();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current && !isMinimized) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: 'welcome',
        text: "Hi! I'm Liben's AI Assistant. I can answer questions about his **projects**, **skills**, and **experience**. What would you like to know?",
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    if (isOpen) {
      trackEvent("ai_chat_open");
    }
  }, [isOpen]);

  const getContextLinks = (message: string) => {
    const text = message.toLowerCase();
    const links = [];
    if (text.includes("project")) links.push({ label: "Portfolio", href: "#" });
    if (text.includes("skill")) links.push({ label: "Skills", href: "#" });
    if (text.includes("experience")) links.push({ label: "Resume", href: "#" });
    return links;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    const messageToSend = inputValue.trim();
    setInputValue('');
    setIsLoading(true);
    trackEvent("ai_chat_send");

    try {
      if (!geminiService.isReady()) {
        throw new Error('Service not initialized');
      }

      const response = await geminiService.sendMessage(messageToSend);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error: unknown) {
      console.error('Chatbot error:', error);
      const reason = error instanceof Error ? error.message : "";

      let errorText = "I'm having trouble connecting. Please try again later.";

      if (reason.includes('not configured')) {
        errorText = "The assistant is not set up yet. Please email Liben directly.";
      } else if (reason.includes('quota')) {
        errorText = "The assistant is busy right now. Please try again in a minute.";
      }
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: errorText,
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

  const suggestedQuestions = [
    "What projects has Liben worked on?",
    "What are his main skills?",
    "Tell me about his experience",
  ];
  const quickActions = [
    "Summarize key ML projects",
    "What are Liben's strongest skills?",
    "How can I contact Liben?",
  ];

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-5 md:right-6 z-50 w-14 h-14 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg shadow-yellow-500/30 hover:bg-yellow-400 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          display: isOpen ? "none" : "flex",
          bottom: "calc(env(safe-area-inset-bottom, 0px) + 24px)",
        }}
        animate={shouldReduceMotion ? undefined : { y: [0, -4, 0] }}
        transition={shouldReduceMotion ? undefined : { duration: 3.2, repeat: Infinity, repeatType: "loop" }}
        aria-label="Open AI Assistant"
      >
        <Sparkles className="w-6 h-6 text-black" />
      </motion.button>

      {/* Chat Window - Draggable */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            drag
            dragControls={dragControls}
            dragMomentum={false}
            dragElastic={0}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`fixed z-50 ${isMinimized ? 'w-[280px]' : 'w-[calc(100vw-32px)] sm:w-[380px]'} ${isMinimized ? '' : 'h-[520px]'} flex flex-col bg-dark-500 border border-gray-800 rounded-2xl shadow-2xl overflow-hidden`}
            style={{
              right: 16,
              bottom:
                typeof window !== "undefined" && window.innerWidth < 768
                  ? "calc(env(safe-area-inset-bottom, 0px) + 96px)"
                  : "calc(env(safe-area-inset-bottom, 0px) + 24px)",
              cursor: 'default'
            }}
          >
            {/* Header - Draggable Handle */}
            <motion.div 
              className="p-3 bg-yellow-500 flex items-center justify-between cursor-grab active:cursor-grabbing"
              onPointerDown={(e) => dragControls.start(e)}
            >
              <div className="flex items-center gap-2">
                <GripVertical className="w-4 h-4 text-black/50" />
                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-yellow-500" />
                </div>
                <div>
                  <h3 className="text-black font-semibold text-sm">AI Assistant</h3>
                  {!isMinimized && <p className="text-black/60 text-xs">Ask about Liben</p>}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1.5 hover:bg-black/10 rounded-lg transition-colors"
                  aria-label={isMinimized ? "Maximize chat" : "Minimize chat"}
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4 text-black" /> : <Minimize2 className="w-4 h-4 text-black" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-black/10 rounded-lg transition-colors"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4 text-black" />
                </button>
              </div>
            </motion.div>

            {/* Messages - Hidden when minimized */}
            {!isMinimized && (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] p-3 rounded-2xl ${
                          message.sender === 'user'
                            ? 'bg-yellow-500 text-black rounded-br-sm'
                            : 'bg-dark-300 text-gray-200 border border-gray-700 rounded-bl-sm'
                        }`}
                      >
                        <div className="text-sm leading-relaxed">
                          {message.sender === 'ai' ? parseMarkdown(message.text) : message.text}
                        </div>
                        {message.sender === 'ai' && (
                          <div className="mt-2 pt-2 border-t border-gray-700/70 flex items-center justify-between">
                            <div className="flex gap-2">
                              {getContextLinks(message.text).map((link) => (
                                <a key={link.label} href={link.href} className="text-[11px] text-yellow-500 hover:text-yellow-400">
                                  {link.label}
                                </a>
                              ))}
                            </div>
                            <button
                              onClick={async () => {
                                await navigator.clipboard.writeText(message.text);
                                setCopiedMessageId(message.id);
                                setTimeout(() => setCopiedMessageId(null), 1200);
                              }}
                              className="inline-flex items-center gap-1 text-[11px] text-gray-400 hover:text-white"
                            >
                              {copiedMessageId === message.id ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                              {copiedMessageId === message.id ? "Copied" : "Copy"}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="p-3 bg-dark-300 border border-gray-700 rounded-2xl rounded-bl-sm">
                        <div className="flex items-center gap-2">
                          <Loader2 className="w-4 h-4 text-yellow-500 animate-spin" />
                          <span className="text-xs text-gray-400">Thinking...</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Suggested Questions */}
                  {messages.length === 1 && (
                    <div className="space-y-2 pt-2">
                      <p className="text-xs text-gray-500">Quick questions:</p>
                      {suggestedQuestions.map((q, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            setInputValue(q);
                            inputRef.current?.focus();
                          }}
                          className="block w-full text-left p-2.5 bg-dark-400 border border-gray-700 rounded-xl text-sm text-gray-400 hover:border-yellow-500/50 hover:text-white transition-all"
                        >
                          {q}
                        </button>
                      ))}
                      <p className="text-xs text-gray-500 pt-2">Suggested actions:</p>
                      <div className="flex flex-wrap gap-2">
                        {quickActions.map((action) => (
                          <button
                            key={action}
                            onClick={() => setInputValue(action)}
                            className="px-2.5 py-1.5 rounded-lg text-xs bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 hover:bg-yellow-500/20 transition-all"
                          >
                            {action}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-3 border-t border-gray-800 bg-dark-400">
                  <div className="flex gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask something..."
                      className="flex-1 px-4 py-2.5 bg-dark-300 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 transition-colors text-sm"
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim() || isLoading}
                      className="p-2.5 bg-yellow-500 rounded-xl text-black disabled:opacity-50 disabled:cursor-not-allowed hover:bg-yellow-400 transition-colors"
                      aria-label="Send message"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatbot;
