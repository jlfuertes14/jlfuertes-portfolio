"use client";

import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, Send, X, Loader2 } from "lucide-react";
import Image from "next/image";

interface Message {
  role: "user" | "model";
  content: string;
}

const MAX_CHARS = 1000;

export default function AiChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      content:
        "Hi there! 👋 Thanks for visiting my website. Feel free to ask me anything about programming, web development, robotics, or my experiences in tech. Let me know how I can help!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || input.length > MAX_CHARS) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, { role: "user", content: userMessage }],
        }),
      });

      const data = await response.json();

      if (response.status === 429) {
        setMessages((prev) => [
          ...prev,
          {
            role: "model",
            content: data.content || "You're sending messages too fast! Please wait a moment before trying again. ⏳",
          },
        ]);
      } else {
        setMessages((prev) => [...prev, { role: "model", content: data.content }]);
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          content: "Sorry, I'm having trouble connecting right now. You can reach me at johnlester.fuertes@gmail.com 📧",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 sm:right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] rounded-2xl border border-border bg-background shadow-2xl shadow-black/20 flex flex-col overflow-hidden"
          style={{ height: "500px" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 rounded-full overflow-hidden border border-border">
                <Image
                  src="/images/profile-dark.png"
                  alt="John Lester"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-sm font-bold text-foreground">Chat with John Lester</h3>
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs text-muted-foreground font-medium">Online</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              aria-label="Close chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((m, idx) => (
              <div key={idx}>
                {m.role === "model" && (
                  <div className="flex items-start gap-2.5 mb-1">
                    <div className="relative h-6 w-6 rounded-full overflow-hidden shrink-0 mt-0.5 border border-border">
                      <Image
                        src="/images/profile-dark.png"
                        alt="John Lester"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-foreground/70 mb-1 block">John Lester</span>
                      <div className="rounded-2xl rounded-tl-sm bg-card border border-border px-3.5 py-2.5 text-sm text-foreground/80 leading-relaxed max-w-[280px]">
                        {m.content}
                      </div>
                    </div>
                  </div>
                )}
                {m.role === "user" && (
                  <div className="flex justify-end">
                    <div className="rounded-2xl rounded-tr-sm bg-primary px-3.5 py-2.5 text-sm text-primary-foreground leading-relaxed max-w-[280px]">
                      {m.content}
                    </div>
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-2.5">
                <div className="relative h-6 w-6 rounded-full overflow-hidden shrink-0 mt-0.5 border border-border">
                  <Image
                    src="/images/profile-dark.png"
                    alt="John Lester"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <span className="text-xs font-semibold text-foreground/70 mb-1 block">John Lester</span>
                  <div className="rounded-2xl rounded-tl-sm bg-card border border-border px-3.5 py-2.5 flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    <span className="text-xs text-muted-foreground">Typing...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-border bg-card p-3">
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value.slice(0, MAX_CHARS))}
                placeholder="Type a message..."
                className="flex-1 rounded-xl bg-muted/50 border border-border/50 px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading || input.length > MAX_CHARS}
                className="h-10 w-10 shrink-0 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:brightness-110 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
            <div className="flex items-center justify-between mt-2 px-1">
              <span className="text-[11px] text-muted-foreground">
                Ask me about programming, web dev, or tech!
              </span>
              <span className={`text-[11px] font-medium ${input.length > MAX_CHARS * 0.9 ? "text-destructive" : "text-muted-foreground"}`}>
                {input.length}/{MAX_CHARS}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 sm:right-6 z-50 flex items-center gap-2 rounded-full bg-card border border-border px-4 py-3 text-sm font-semibold text-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
        aria-label="Chat with John Lester"
      >
        <MessageCircle className="h-5 w-5" />
        <span className="hidden sm:inline">Chat with John Lester</span>
      </button>
    </>
  );
}
