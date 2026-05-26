"use client";

import React, { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frameId: number | null = null;

    const updateProgress = () => {
      frameId = null;
      if (!barRef.current) return;
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? window.scrollY / totalHeight : 0;
      barRef.current.style.transform = `scaleX(${progress})`;
    };

    const handleScroll = () => {
      if (frameId !== null) return;
      frameId = window.requestAnimationFrame(updateProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateProgress();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-100 h-[4px] pointer-events-none">
      <div
        ref={barRef}
        className="h-full bg-primary will-change-transform origin-left"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
