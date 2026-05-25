"use client";

import { motion, useTransform, MotionValue } from "framer-motion";
import React, { useRef, ReactNode } from "react";
import ReactLenis from "lenis/react";

interface StickyCardProps {
  i: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
  children: ReactNode;
  className?: string;
}

export const StickyCard = ({
  i,
  progress,
  range,
  targetScale,
  children,
  className = "",
}: StickyCardProps) => {
  const container = useRef<HTMLDivElement>(null);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="sticky top-0 flex items-center justify-center px-4 sm:px-6 lg:px-8"
    >
      <motion.div
        style={{
          scale,
          top: `calc(10vh + ${i * 25}px)`,
        }}
        className={`origin-top relative flex flex-col overflow-hidden w-full max-w-5xl rounded-[2.5rem] bg-card dark:bg-[#0a0a0a] border border-border dark:border-white/5 shadow-2xl ${className}`}
      >
        {children}
      </motion.div>
    </div>
  );
};

export { ReactLenis };
