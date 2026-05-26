"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const footer = document.getElementById("footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        "group fixed bottom-8 left-1/2 z-60 flex -translate-x-1/2 items-center gap-2 rounded-full border border-border/70 bg-background/92 px-5 py-3 text-foreground shadow-[0_16px_40px_rgba(0,0,0,0.14)] backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_20px_48px_rgba(0,0,0,0.18)] active:scale-[0.98]",
        isVisible ? "translate-y-0 opacity-100 pointer-events-auto" : "translate-y-10 opacity-0 pointer-events-none"
      )}
      aria-label="Back to top"
    >
      <div className="absolute inset-0 rounded-full bg-linear-to-r from-primary/12 via-transparent to-primary/8 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span className="relative text-[0.95rem] font-medium tracking-tight">
        Back to top
      </span>
      <ArrowUp className="relative h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-[1px]" />
    </button>
  );
}
