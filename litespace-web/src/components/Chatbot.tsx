"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { marked } from "marked";
import DOMPurify from "dompurify";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const DEFAULT_MESSAGE: Message = {
  role: "assistant",
  content: "Xin chào! Tôi là trợ lý AI của LiteSpace. Tôi có thể giúp bạn tìm hiểu chi tiết về bảng giá, thủ tục đăng ký hoặc các ưu đãi dịch vụ Văn phòng ảo tại LiteSpace. Bạn cần hỗ trợ gì hôm nay?",
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([DEFAULT_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isLoading]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setMessages([]);
    setTimeout(() => {
      setMessages([DEFAULT_MESSAGE]);
      setIsRefreshing(false);
    }, 500);
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    const newMessages = [...messages, userMessage];
    
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) throw new Error("API Error");

      const data = await response.json();
      setMessages([...newMessages, { role: "assistant", content: data.reply }]);
    } catch (error) {
      setMessages([
        ...newMessages,
        { role: "assistant", content: "Xin lỗi, đã xảy ra lỗi kết nối với máy chủ AI. Vui lòng thử lại sau." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const renderMarkdown = (text: string) => {
    const rawHtml = marked.parse(text) as string;
    const cleanHtml = DOMPurify.sanitize(rawHtml);
    return { __html: cleanHtml };
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center border border-white/20"
          >
            <span className="material-symbols-outlined text-3xl">chat</span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 w-[calc(100vw-2rem)] md:w-[420px] h-[650px] max-h-[85vh] flex flex-col bg-white/90 backdrop-blur-2xl border border-outline-variant/20 shadow-2xl rounded-3xl overflow-hidden"
          >
            <div className="flex items-center justify-between px-6 py-4 bg-primary/95 text-white shadow-sm border-b border-white/10 shrink-0">
              <div className="flex items-center gap-4">
                <div className="relative flex items-center justify-center w-11 h-11 bg-white/20 rounded-full shrink-0 shadow-inner">
                  <span className="material-symbols-outlined text-[22px]">auto_awesome</span>
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-400 border-2 border-primary rounded-full animate-pulse"></span>
                </div>
                <div>
                  <h3 className="font-bold text-lg leading-tight tracking-wide">Trợ lý AI LiteSpace</h3>
                  <p className="text-xs text-white/80 font-medium">Sẵn sàng hỗ trợ</p>
                </div>
              </div>
              
              <div className="flex gap-1">
                <button 
                  onClick={handleRefresh}
                  className="w-9 h-9 flex items-center justify-center hover:bg-white/20 rounded-full transition-colors"
                  title="Làm mới hội thoại"
                >
                  <span className={`material-symbols-outlined text-[20px] ${isRefreshing ? "animate-spin" : ""}`}>
                    refresh
                  </span>
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-9 h-9 flex items-center justify-center hover:bg-white/20 rounded-full transition-colors"
                  title="Đóng chatbot"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-surface/30 hide-scrollbar scroll-smooth">
              {messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div 
                    className={`px-5 py-3.5 max-w-[85%] ${
                      msg.role === "user" 
                      ? "bg-primary text-white rounded-[1.5rem] rounded-tr-sm shadow-md" 
                      : "bg-white text-on-surface border border-outline-variant/15 rounded-[1.5rem] rounded-tl-sm shadow-sm"
                    }`}
                  >
                    {msg.role === "user" ? (
                      <p className="whitespace-pre-wrap text-[15px]">{msg.content}</p>
                    ) : (
                      <div 
                        className="chat-markdown text-[15px]"
                        dangerouslySetInnerHTML={renderMarkdown(msg.content)} 
                      />
                    )}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white px-5 py-4 rounded-[1.5rem] rounded-tl-sm border border-outline-variant/15 shadow-sm flex items-center gap-2">
                    <span className="text-[14px] text-on-surface-variant mr-1 font-medium">Đang nhập</span>
                    <div className="flex space-x-1.5">
                      <div className="w-1.5 h-1.5 bg-primary/80 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                      <div className="w-1.5 h-1.5 bg-primary/80 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                      <div className="w-1.5 h-1.5 bg-primary/80 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} className="h-2" />
            </div>

            <div className="p-4 bg-white/80 border-t border-outline-variant/20 shrink-0">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Nhập nội dung cần tư vấn..."
                  className="w-full bg-surface px-6 py-4 pr-16 rounded-full text-[15px] font-medium text-on-surface outline-none focus:ring-2 focus:ring-primary/20 border border-transparent focus:border-primary/50 transition-all shadow-inner"
                  disabled={isLoading}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 w-10 h-10 flex items-center justify-center rounded-full bg-primary text-white disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform shadow-md"
                >
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>send</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
