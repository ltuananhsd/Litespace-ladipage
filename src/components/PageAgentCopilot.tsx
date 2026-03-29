"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { PageAgent } from "page-agent";
import type { ExecutionResult, AgentStepEvent } from "page-agent";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  X,
  Send,
  Trash2,
  StopCircle,
  ChevronRight,
  Loader2,
  Sparkles,
  MessageSquare
} from "lucide-react";

// ─── Settings ────────────────────────────────────────────────────────────────
const HEADER_HEIGHT = "0px"; // Dính sát viền trên 100%, ko chừa gầm
const DESKTOP_WIDTH_PERCENT = 20; // 20% chiều ngang desktop

// ─── Kiểu dữ liệu nội bộ ────────────────────────────────────────────────────
type MessageRole = "user" | "agent" | "step" | "error";

interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
}

// ─── Gợi ý nhanh ─────────────────────────────────────────────────────────────
const QUICK_SUGGESTIONS = [
  { label: "📋 Xem bảng giá", prompt: "Cuộn xuống phần bảng giá cho tôi" },
  { label: "🚀 Đăng ký dịch vụ", prompt: "Click vào nút Đăng ký ngay" },
  { label: "❓ Xem FAQ", prompt: "Điều hướng đến trang FAQ" },
  { label: "📞 Liên hệ hỗ trợ", prompt: "Điều hướng đến trang Liên hệ" },
];

const LLM_BASE_URL = process.env.NEXT_PUBLIC_LLM_BASE_URL || "";
const LLM_API_KEY = process.env.NEXT_PUBLIC_LLM_API_KEY || "";
const isApiConfigured = Boolean(LLM_BASE_URL && LLM_API_KEY);

// ─── Animation variants (cho Mobile Floating Mode) ───────────────────────────
const panelVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 320, damping: 28 },
  },
  exit: {
    opacity: 0,
    y: 30,
    scale: 0.92,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

const toggleBtnVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 400, damping: 20 },
  },
  exit: { scale: 0, opacity: 0, transition: { duration: 0.15 } },
};

const msgVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: "easeOut" } },
};

// ─── Component chính ─────────────────────────────────────────────────────────

export default function PageAgentCopilot() {
  const [isOpen, setIsOpen] = useState(false); // Mobile: Nút nổi. Desktop: Mở sẵn 20% hay thu vào
  const [isDesktop, setIsDesktop] = useState(false); // State phát hiện màn hình lớn

  const [input, setInput] = useState("");
  const [isExecuting, setIsExecuting] = useState(false);
  const [currentActivity, setCurrentActivity] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isWaitingAnswer, setIsWaitingAnswer] = useState(false);

  const agentRef = useRef<PageAgent | null>(null);
  const askUserResolverRef = useRef<((value: string) => void) | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const msgIdCounter = useRef(0);

  // ── Khởi tạo Trạng thái Responsive (SSG an toàn) ─────────────────────────────
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      const lg = window.innerWidth >= 1024;
      setIsDesktop(lg);
      
      // Mở sẵn 20% nếu là desktop, đóng (thành nút tròn) nếu là mobile
      // Tuy nhiên không ép buộc đè người dùng nếu người dùng đang chủ động thu gọn trên desktop
      // Ở đây ta dùng 1 flag sessionStorage nhẹ để không bật tắt khó chịu
      if (lg && !window.sessionStorage.getItem('copilotFirstOpenDesktop')) {
         setIsOpen(true);
         window.sessionStorage.setItem('copilotFirstOpenDesktop', '1');
      } else if (!lg && !window.sessionStorage.getItem('copilotFirstOpenMobile')) {
         setIsOpen(false);
         window.sessionStorage.setItem('copilotFirstOpenMobile', '1');
      }
    };
    
    handleResize(); // Init run
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ── Auto chèn Margin/Padding cho toàn trang khi Desktop mở 20% ────────
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (isDesktop && isOpen) {
      document.body.style.transition = "padding-left 0.5s cubic-bezier(0.16, 1, 0.3, 1)";
      document.body.style.paddingLeft = `${DESKTOP_WIDTH_PERCENT}%`;
    } else {
      document.body.style.transition = "padding-left 0.5s cubic-bezier(0.16, 1, 0.3, 1)";
      document.body.style.paddingLeft = "0px";
    }

    return () => {
      document.body.style.paddingLeft = "0px"; // Auto clean up khi unmount
    };
  }, [isDesktop, isOpen]);


  const newId = () => `msg-${Date.now()}-${++msgIdCounter.current}`;

  const addMessage = useCallback((role: MessageRole, content: string) => {
    setMessages((prev) => [...prev, { id: newId(), role, content }]);
  }, []);

  // ── Khởi tạo PageAgent (chỉ phía client) ──────────────────────────────────
  useEffect(() => {
    if (typeof window === "undefined" || agentRef.current) return;
    if (!isApiConfigured) return;

    try {
      agentRef.current = new PageAgent({
        model: "ces-chatbot-gpt-5.4",
        baseURL: LLM_BASE_URL,
        apiKey: LLM_API_KEY,
        instructions: {
          system: `Bạn là AI Copilot của LITE Space - dịch vụ văn phòng ảo chuyên nghiệp tại Việt Nam.
Website có các trang: Trang chủ (/), Giới thiệu (/about), Dịch vụ (/services), Bảng giá (/pricing), FAQ (/faq), Liên hệ (/contact), Đăng ký (/register), Blog (/blog).
Hãy thực thi các yêu cầu điều hướng và tương tác trên website một cách chính xác và nhanh chóng.
Luôn trả lời bằng tiếng Việt.`,
        },
        onAfterStep: (_agent, history) => {
          const lastEvent = history[history.length - 1];
          if (lastEvent?.type === "step") {
            const step = lastEvent as AgentStepEvent;
            const goal = step.reflection?.next_goal;
            if (goal) {
              setMessages((prev) => {
                const lastMsg = prev[prev.length - 1];
                if (lastMsg?.role === "step" && lastMsg.content === goal) return prev;
                return [...prev, { id: newId(), role: "step", content: goal }];
              });
            }
          }
        },
        onAskUser: async (question: string) => {
          addMessage("agent", `🤔 ${question}`);
          setIsWaitingAnswer(true);
          return new Promise<string>((resolve) => {
            askUserResolverRef.current = resolve;
          });
        },
      });

      try {
        if (agentRef.current.panel && typeof agentRef.current.panel.dispose === 'function') {
          agentRef.current.panel.dispose();
        }
      } catch (err) { }

      const askUserTool = agentRef.current.tools.get("ask_user");
      if (askUserTool) {
        askUserTool.execute = async (input: any) => {
          const question = input.question;
          addMessage("agent", `🤔 ${question}`);
          setIsWaitingAnswer(true);
          const answer = await new Promise<string>((resolve) => {
            askUserResolverRef.current = resolve;
          });
          return `User answered: ${answer}`;
        };
      }

      agentRef.current.addEventListener("activity", (e: Event) => {
        const activity = (e as CustomEvent).detail as { type: string; tool?: string };
        if (activity.type === "thinking") setCurrentActivity("🧠 Đang suy nghĩ...");
        else if (activity.type === "executing")
          setCurrentActivity(`⚡ Đang thực thi: ${activity.tool || ""}`);
        else if (activity.type === "executed") setCurrentActivity(null);
        else if (activity.type === "retrying") setCurrentActivity("🔄 Đang thử lại...");
        else setCurrentActivity(null);
      });
    } catch (err) {
      console.warn("[PageAgentCopilot] Không thể khởi tạo PageAgent:", err);
    }
  }, [addMessage]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, currentActivity]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  const handleExecute = async (taskText?: string) => {
    const task = (taskText ?? input).trim();
    if (!task) return;

    if (isWaitingAnswer && askUserResolverRef.current) {
      setInput("");
      addMessage("user", task);
      askUserResolverRef.current(task);
      askUserResolverRef.current = null;
      setIsWaitingAnswer(false);
      return; 
    }

    if (!agentRef.current || isExecuting) return;

    setInput("");
    addMessage("user", task);
    setIsExecuting(true);
    setCurrentActivity("🧠 Đang phân tích...");

    try {
      const result: ExecutionResult = await agentRef.current.execute(task);
      if (result.success) {
        addMessage("agent", result.data || "✅ Đã hoàn thành thao tác theo yêu cầu!");
      } else {
        addMessage("error", result.data || "❌ Không thể hoàn thành yêu cầu.");
      }
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "Lỗi không xác định.";
      if (msg.includes("network") || msg.includes("fetch")) {
        addMessage("error", "❌ Lỗi kết nối mạng.");
      } else if (msg.includes("401") || msg.includes("Unauthorized")) {
        addMessage("error", "❌ API Key không hợp lệ.");
      } else {
        addMessage("error", `❌ Lỗi: ${msg}`);
      }
    } finally {
      setIsExecuting(false);
      setCurrentActivity(null);
    }
  };

  const handleStop = () => {
    agentRef.current?.stop();
    setIsExecuting(false);
    if (isWaitingAnswer && askUserResolverRef.current) {
      askUserResolverRef.current("");
      askUserResolverRef.current = null;
      setIsWaitingAnswer(false);
    }
    setCurrentActivity(null);
    addMessage("agent", "⏹ Đã dừng thao tác.");
  };

  const handleClear = () => {
    setMessages([]);
    setCurrentActivity(null);
  };

  // ─── Phần UI dùng chung giữa Desktop (Fixed Sidebar) và Mobile (Modal) ───────
  const CoreChatUI = (isDesktopMode: boolean) => (
    <div className={
        isDesktopMode 
          ? "w-full h-full flex flex-col bg-surface/95 backdrop-blur-3xl overflow-hidden shadow-inner" 
          : "rounded-3xl shadow-2xl shadow-primary/15 w-[340px] sm:w-[400px] flex flex-col border border-outline-variant/30 overflow-hidden bg-white/95 backdrop-blur-xl"
    }>
      {/* ── Header ── */}
      <div className="bg-gradient-to-r from-primary to-primary-dim text-on-primary px-4 py-3.5 flex justify-between items-center flex-shrink-0 relative z-10 shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm shadow-inner">
            <Sparkles size={18} className="text-white drop-shadow-md" />
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="font-headline font-bold text-[15px] leading-none drop-shadow-sm">
              LITESPACE AI
            </h3>
            <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded-md tracking-wide font-medium shadow-sm">
              COPILOT
            </span>
          </div>
        </div>
        <div className="flex items-center gap-0.5">
          {messages.length > 0 && !isExecuting && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              onClick={handleClear}
              title="Xóa lịch sử"
              className="text-on-primary/70 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/20"
            >
              <Trash2 size={16} />
            </motion.button>
          )}
          {/* Nút Đóng (Chỉ có trên mobile, Desktop xài Cờ gạt ở bên cạnh) */}
          {!isDesktopMode && (
            <button
              onClick={() => setIsOpen(false)}
              className="text-on-primary/70 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/20"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      {/* ── Body / Chat ── */}
      <div className={`px-4 py-4 overflow-y-auto flex flex-col gap-3.5 scroll-smooth hide-scrollbar bg-surface/60 ${isDesktopMode ? 'flex-1' : 'h-[360px]'}`}>
        
        {/* Màn hình rỗng — welcome */}
        {messages.length === 0 && !isExecuting && (
          <div className="flex flex-col items-center justify-center h-full gap-4 text-center px-2">
            <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary-dim text-on-primary rounded-[20px] shadow-[0_10px_25px_rgba(0,88,187,0.25)] flex items-center justify-center">
              <MessageSquare size={26} className="text-white drop-shadow-lg" />
            </div>
            <div>
              <h4 className="font-headline font-bold text-on-surface text-[15px] mb-1.5 tracking-tight">
                AI Copilot sẫn sàng!
              </h4>
              <p className="text-[12.5px] text-on-surface-variant/90 leading-relaxed font-body">
                {isApiConfigured
                  ? "Hướng dẫn tôi click, tìm thông tin, điền form hoặc bất kỳ thao tác nào trực tiếp trên giao diện website này."
                  : "⚠️ Chưa cấu hình API Key. Vui lòng thiết lập môi trường (LLM_BASE_URL) để sử dụng."}
              </p>
            </div>
            {/* Quick suggestions */}
            {isApiConfigured && (
              <div className="w-full flex flex-col gap-2 mt-2">
                {QUICK_SUGGESTIONS.map((s) => (
                  <button
                    key={s.prompt}
                    onClick={() => handleExecute(s.prompt)}
                    className="w-full text-left font-body text-[12.5px] px-3.5 py-3 bg-white border border-outline-variant/30 rounded-xl text-on-surface hover:border-primary/40 hover:bg-primary/[0.03] hover:text-primary hover:shadow-sm transition-all flex items-center justify-between group"
                  >
                    <span>{s.label}</span>
                    <ChevronRight size={13} className="text-outline/50 group-hover:text-primary transition-colors" />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Danh sách tin nhắn */}
        {messages.map((msg) => {
          if (msg.role === "step") {
            return (
              <motion.div key={msg.id} variants={msgVariants} initial="hidden" animate="visible" className="flex items-start gap-2 self-start pl-1">
                <Loader2 size={12} className="text-primary/60 mt-[3px] animate-[spin_3s_linear_infinite]" />
                <p className="text-[11.5px] text-on-surface-variant/70 italic leading-relaxed font-body">
                  {msg.content}
                </p>
              </motion.div>
            );
          }
          if (msg.role === "error") {
            return (
              <motion.div key={msg.id} variants={msgVariants} initial="hidden" animate="visible" className="self-start bg-error-container/10 border border-error/20 text-error text-[13px] leading-relaxed px-3.5 py-2.5 rounded-[18px] rounded-tl-sm max-w-[88%] shadow-sm font-body">
                {msg.content}
              </motion.div>
            );
          }
          const isUser = msg.role === "user";
          return (
            <motion.div
              key={msg.id}
              variants={msgVariants}
              initial="hidden"
              animate="visible"
              className={`text-[13.5px] leading-[1.6] px-4 py-2.5 max-w-[88%] shadow-sm font-body ${
                isUser
                  ? "bg-primary text-on-primary self-end rounded-[20px] rounded-tr-[4px]"
                  : "bg-white border text-on-surface border-outline-variant/20 self-start rounded-[20px] rounded-tl-[4px] ring-1 ring-black/[0.02]"
              }`}
            >
              {isUser ? (
                msg.content
              ) : (
                <div className="space-y-1.5 break-words">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      p: ({ node, ...props }: any) => <p className="m-0 leading-relaxed" {...props} />,
                      strong: ({ node, ...props }: any) => <strong className="font-semibold text-primary-dim" {...props} />,
                      a: ({ node, ...props }: any) => <a className="text-primary hover:underline font-medium underline-offset-2" target="_blank" rel="noopener noreferrer" {...props} />,
                      ul: ({ node, ...props }: any) => <ul className="list-inside list-disc my-1 pl-1 space-y-0.5 marker:text-primary/50" {...props} />,
                      ol: ({ node, ...props }: any) => <ol className="list-inside list-decimal my-1 pl-1 space-y-0.5 marker:text-primary/80 font-medium" {...props} />,
                      li: ({ node, ...props }: any) => <li className="ml-1" {...props} />,
                      code: ({ node, ...props }: any) => <code className="bg-primary/5 border border-primary/10 px-1 py-0.5 rounded text-[12.5px] font-mono text-primary-dim" {...props} />,
                      blockquote: ({ node, ...props }: any) => <blockquote className="border-l-[3px] border-primary/40 pl-3 italic text-on-surface-variant/80 my-1.5" {...props} />
                    }}
                  >
                    {msg.content}
                  </ReactMarkdown>
                </div>
              )}
            </motion.div>
          );
        })}

        {isExecuting && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-outline-variant/20 text-on-surface-variant px-4 py-2.5 rounded-[20px] rounded-tl-[4px] shadow-sm self-start ring-1 ring-black/[0.02] flex items-center gap-2.5 max-w-[88%]">
            <Loader2 size={16} className="animate-spin text-primary flex-shrink-0" />
            <span className="text-[12.5px] font-medium leading-snug font-body">
              {currentActivity || "Đang xử lý..."}
            </span>
          </motion.div>
        )}

        {/* Anchor để auto-scroll */}
        <div ref={messagesEndRef} className="h-1" />
      </div>

      {/* ── Input Area ── */}
      <div className="px-3.5 py-3 border-t border-outline-variant/15 flex items-center gap-2.5 bg-white relative z-10">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) handleExecute();
          }}
          placeholder={
            isWaitingAnswer
              ? "Nhập câu trả lời của bạn..."
              : isApiConfigured
              ? "Hướng dẫn AI điều khiển trang..."
              : "Chưa cấu hình API Key..."
          }
          className="flex-1 bg-surface-variant/20 text-[13.5px] px-4 py-3 rounded-2xl focus:outline-none focus:ring-[3px] focus:ring-primary/15 focus:bg-white border border-outline-variant/30 focus:border-primary/40 transition-all font-body text-on-surface placeholder:text-on-surface-variant/60 disabled:opacity-50"
          disabled={(isExecuting && !isWaitingAnswer) || !isApiConfigured}
        />
        {isExecuting && !isWaitingAnswer ? (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            onClick={handleStop}
            title="Dừng lại"
            className="flex-shrink-0 p-3 bg-error text-white rounded-xl shadow-sm hover:brightness-110 hover:shadow-md transition-all active:scale-95"
          >
            <StopCircle size={18} />
          </motion.button>
        ) : (
          <button
            onClick={() => handleExecute()}
            disabled={!input.trim() || !isApiConfigured}
            className="flex-shrink-0 p-3 bg-gradient-to-br from-primary to-primary-dim text-white rounded-xl shadow-[0_4px_12px_rgba(0,88,187,0.2)] hover:shadow-[0_6px_16px_rgba(0,88,187,0.3)] transition-all disabled:opacity-30 disabled:shadow-none disabled:cursor-not-allowed active:scale-95 group"
          >
            <Send size={18} className={input.trim() ? "translate-x-0.5 -translate-y-0.5 transition-transform" : ""} />
          </button>
        )}
      </div>
    </div>
  );

  // ─── Render Container (Switch Mobile/Desktop Tự động) ────────────────────────
  return (
    <div id="litespace-custom-copilot" data-browser-use-ignore="true" data-page-agent-ignore="true">
      {/* Ẩn triệt để UI panel gốc của page-agent */}
      <style dangerouslySetInnerHTML={{
        __html: `
          #page-agent-runtime_agent-panel,
          div[data-page-agent-ignore="true"]:not(#litespace-custom-copilot) {
            display: none !important;
            opacity: 0 !important;
            visibility: hidden !important;
            pointer-events: none !important;
            width: 0 !important;
            height: 0 !important;
          }
          /* Hide scrollbar completely but allow scrolling */
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `
      }} />

      {/* ── Desktop UI (Sidebar Split 20/80) ── */}
      {isDesktop && (
        <div 
           className="fixed left-0 bottom-0 z-[100] border-r border-outline-variant/30 shadow-[4px_0_24px_rgba(0,0,0,0.02)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex"
           style={{
             top: HEADER_HEIGHT, 
             width: `${DESKTOP_WIDTH_PERCENT}%`,
             transform: isOpen ? "translateX(0)" : "translateX(-100%)",
           }}
        >
          {CoreChatUI(true)}

          {/* Toggle Tab (Tai gấu cờ rút thò ra viền phải) */}
          <button
             onClick={() => setIsOpen(!isOpen)}
             title={isOpen ? "Đóng Chat AI" : "Mở Chat AI"}
             className="absolute top-[40%] right-0 translate-x-[98%] -translate-y-1/2 w-7 h-20 bg-white border border-l-0 border-outline-variant/30 rounded-r-2xl flex items-center justify-center hover:bg-surface-variant transition-colors group cursor-pointer shadow-[8px_0_16px_rgba(0,0,0,0.03)]"
          >
             <ChevronRight size={18} strokeWidth={2.5} className={`text-on-surface-variant/80 group-hover:text-primary transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>
      )}

      {/* ── Mobile UI (Floating Popup) ── */}
      {!isDesktop && (
        <div className="fixed bottom-6 left-6 z-[9999] flex flex-col items-start gap-4 pointer-events-none">
          {/* Vùng chat (Bắt sự kiện click bên trong nó) */}
          <div className="pointer-events-auto origin-bottom-left">
            <AnimatePresence mode="wait">
              {isOpen && (
                <motion.div
                  key="panel-mobile"
                  variants={panelVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {CoreChatUI(false)}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Nút tròn nổi (Chỉ hiện khi khung chat đóng) */}
          <div className="pointer-events-auto">
            <AnimatePresence mode="wait">
              {!isOpen && (
                <motion.button
                  key="toggle-mobile"
                  variants={toggleBtnVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsOpen(true)}
                  aria-label="Mở LITESPACE Copilot"
                  className="bg-gradient-to-br from-primary to-primary-dim text-white p-4 rounded-[22px] shadow-[0_8px_30px_rgba(0,88,187,0.3)] hover:shadow-[0_12px_40px_rgba(0,88,187,0.4)] transition-shadow flex items-center justify-center group relative overflow-hidden"
                >
                  {/* Glass reflection effect */}
                  <div className="absolute inset-0 bg-white/20 -skew-x-[30deg] -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
                  <Bot size={28} className="drop-shadow-sm group-hover:-rotate-12 transition-transform duration-300" />
                  
                  {/* Ping badge nổi bật */}
                  <span className="absolute top-0 right-0 flex h-[14px] w-[14px] -translate-y-1 translate-x-1">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#fca5a5] opacity-75" />
                    <span className="relative inline-flex rounded-full h-[14px] w-[14px] bg-error border-2 border-white" />
                  </span>
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* ── CSS ÉP CỨNG ĐẨY NAVBAR (Khắc phục chồng đè) ── */}
      {isDesktop && isOpen && (
        <style dangerouslySetInnerHTML={{ __html: `
          nav.fixed {
            left: calc(50% + ${DESKTOP_WIDTH_PERCENT / 2}%) !important;
            width: calc((100vw - ${DESKTOP_WIDTH_PERCENT}vw) * 0.9) !important;
            transition: left 0.5s cubic-bezier(0.16,1,0.3,1), width 0.5s cubic-bezier(0.16,1,0.3,1) !important;
          }
        `}} />
      )}
    </div>
  );
}
