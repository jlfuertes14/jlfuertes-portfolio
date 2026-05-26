"use client";

import { motion, useTransform, MotionValue } from "framer-motion";
import React, { useRef, ReactNode } from "react";

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
        className={`relative flex w-full max-w-5xl origin-top flex-col overflow-hidden rounded-[2.5rem] border border-border bg-card shadow-2xl will-change-transform dark:border-white/5 dark:bg-[#0a0a0a] ${className}`}
      >
        {children}
      </motion.div>
    </div>
  );
};
