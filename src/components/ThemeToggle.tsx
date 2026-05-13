"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-10 w-20 rounded-full bg-muted/20" />; 
  }

  const isDark = theme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <div className="flex items-center justify-center">
      <button
        onClick={toggleTheme}
        className={`group relative flex h-10 w-20 cursor-pointer items-center rounded-full border p-1 backdrop-blur-xl transition-colors duration-200 ${
          isDark 
            ? "border-white/10 bg-white/5 hover:border-white/20" 
            : "border-black/10 bg-black/5 hover:border-black/20"
        }`}
        aria-label="Toggle theme"
      >
        {/* Liquid Thumb */}
        <motion.div
          className={`absolute z-20 flex h-8 w-8 items-center justify-center rounded-full border ${
            isDark 
              ? "border-white/10 bg-primary/20 shadow-[0_0_20px_var(--color-primary)]" 
              : "border-orange-200 bg-orange-50 shadow-[0_0_20px_rgba(249,115,22,0.4)]"
          }`}
          initial={false}
          animate={{
            x: isDark ? 40 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 700,
            damping: 35,
            mass: 0.8
          }}
        >
          {/* Inner highlights for glass look */}
          <div className={`absolute inset-0 rounded-full transition-opacity duration-300 ${
            isDark ? "bg-gradient-to-tr from-primary/30 to-transparent opacity-100" : "bg-gradient-to-tr from-orange-300/40 to-transparent opacity-100"
          } blur-[1px]`} />
          
          {/* Icons (Inside Thumb) */}
          <AnimatePresence mode="wait" initial={false}>
            {isDark ? (
              <motion.div
                key="moon"
                initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                transition={{ duration: 0.15 }}
              >
                <Moon className="h-4 w-4 text-primary drop-shadow-[0_0_8px_var(--color-primary)]" />
              </motion.div>
            ) : (
              <motion.div
                key="sun"
                initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                transition={{ duration: 0.15 }}
              >
                <Sun className="h-4 w-4 text-orange-500 drop-shadow-[0_0_12px_rgba(249,115,22,0.8)]" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Liquid Overflow Glow */}
        <div className={`absolute -inset-1 rounded-full opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100 ${
          isDark ? "bg-primary/10" : "bg-orange-500/10"
        }`} />
      </button>
    </div>
  );
}





