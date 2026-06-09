"use client";

import { useState, useRef, useEffect } from "react";
import MessageBubble, { Message } from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";

const GREETING: Message = {
  role: "assistant",
  content:
    "Selamat datang! I'm your SEA AI Digital Advisor — here to help you grow your business through smarter digital presence and better systems.\n\nI'm not here to sell you a website. I'm here to understand your business and find the best path forward together.\n\nTo start — what kind of business are you running?",
};

export default function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isStreaming]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isStreaming) return;

    const userMessage: Message = { role: "user", content: text.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsStreaming(true);

    const apiMessages = newMessages.map((m) => ({
      role: m.role,
      content: m.content,
    }));

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (!res.ok || !res.body) throw new Error("Stream failed");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let assistantText = "";

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        assistantText += decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "assistant",
            content: assistantText,
          };
          return updated;
        });
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I'm sorry, I encountered a connection issue. Please try again in a moment.",
        },
      ]);
    } finally {
      setIsStreaming(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="flex-shrink-0 bg-navy-900 border-b border-navy-700 px-4 py-3 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center">
          <span className="text-navy-950 text-xs font-bold">SEA</span>
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-sm font-semibold text-white truncate">
            SEA AI Digital Advisor
          </h1>
          <p className="text-xs text-slate-400 truncate">
            Sarawak Entrepreneurs Association × KOBIS Berhad
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs text-emerald-400 font-medium">Online</span>
        </div>
      </header>

      {/* Messages */}
      <main className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((msg, i) => (
          <MessageBubble key={i} message={msg} />
        ))}
        {isStreaming && messages[messages.length - 1]?.role !== "assistant" && (
          <TypingIndicator />
        )}
        <div ref={bottomRef} />
      </main>

      {/* Input */}
      <footer className="flex-shrink-0 bg-navy-900 border-t border-navy-700 p-3">
        <div className="flex items-end gap-2 bg-navy-800 rounded-2xl border border-navy-700 focus-within:border-gold-500/50 transition-colors px-3 py-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Tell me about your business…"
            rows={1}
            disabled={isStreaming}
            className="flex-1 bg-transparent text-sm text-slate-200 placeholder-slate-500 resize-none outline-none max-h-32 leading-relaxed"
            style={{ minHeight: "24px" }}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isStreaming}
            className="flex-shrink-0 w-8 h-8 rounded-xl bg-gold-500 hover:bg-gold-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center justify-center"
          >
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4 text-navy-950"
            >
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
        <p className="text-center text-xs text-slate-600 mt-2">
          SEA × KOBIS · Digital Growth Platform
        </p>
      </footer>
    </div>
  );
}
