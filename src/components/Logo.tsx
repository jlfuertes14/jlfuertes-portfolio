"use client";

import React from "react";
import { motion } from "framer-motion";

export const Logo = () => {
  return (
    <motion.div
      className="group relative flex items-center cursor-pointer select-none"
      initial="initial"
      whileHover="hover"
      onClick={() => {
        window.dispatchEvent(new CustomEvent("hero-reanimate"));
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
    >
      <div className="flex items-center">
        {/* The 'J' - Uses theme-aware foreground color */}
        <motion.span
          className="text-4xl font-black leading-none text-foreground transition-all duration-300 group-hover:text-primary"
          variants={{
            hover: { x: -2 }
          }}
        >
          J
        </motion.span>

        {/* The 'Tiny Space' - 4px gap */}
        <div className="w-[4px]" />

        {/* The 'L' - Stays in brand primary color for identity */}
        <motion.span
          className="text-4xl font-black leading-none text-primary transition-all duration-300"
          variants={{
            hover: { x: 2 }
          }}
        >
          L
        </motion.span>
      </div>

      {/* Brand Line Accent */}
      <motion.div
        className="absolute -bottom-2 left-0 h-[3px] rounded-full bg-primary"
        variants={{
          initial: { width: 0, opacity: 0 },
          hover: { width: "100%", opacity: 1 }
        }}
        transition={{ duration: 0.4, ease: "circOut" }}
      />

      {/* Corner Identity Mark */}
      <motion.div
        className="absolute -top-1 -right-2 h-2 w-2 rounded-sm bg-primary shadow-[0_0_10px_var(--color-primary)]"
        variants={{
          initial: { scale: 0, rotate: -45 },
          hover: { scale: 1, rotate: 0 }
        }}
        transition={{ type: "spring", stiffness: 500, damping: 20 }}
      />

      {/* Ambient Glow */}
      <div className="absolute inset-0 -z-10 bg-primary/5 blur-2xl opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
    </motion.div>
  );
};

