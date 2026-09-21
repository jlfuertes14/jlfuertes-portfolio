"use client";

import * as React from "react";
import { flushSync } from "react-dom";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-10 w-20 rounded-full bg-muted/20" />; 
  }

  const isDark = resolvedTheme === "dark";

  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    const newTheme = isDark ? "light" : "dark";

    // Fallback if View Transitions API is not supported or user prefers reduced motion
    if (
      typeof document === "undefined" ||
      !("startViewTransition" in document) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      if (newTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      setTheme(newTheme);
      return;
    }

    // Detect if hero circle badge is visible in viewport, otherwise fall back to toggle button
    const heroCircle = document.querySelector(".hero-circle");
    let originEl: Element = e.currentTarget;

    if (heroCircle) {
      const heroRect = heroCircle.getBoundingClientRect();
      const isHeroVisible =
        heroRect.top < window.innerHeight &&
        heroRect.bottom > 0 &&
        heroRect.left < window.innerWidth &&
        heroRect.right > 0;

      if (isHeroVisible) {
        originEl = heroCircle;
      }
    }

    // Get origin coordinates (center of hero circle or theme toggle button)
    const rect = originEl.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    // If starting from hero circle, start the transition circle at the hero circle's exact size
    const isFromHero = Boolean(heroCircle && originEl === heroCircle);
    const startRadius = isFromHero ? Math.round(rect.width / 2) : 0;

    // Calculate maximum radius to ensure the circle curtain covers the furthest corner of the viewport
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    // Set CSS variables on document element for the keyframe animation
    document.documentElement.style.setProperty("--theme-toggle-x", `${x}px`);
    document.documentElement.style.setProperty("--theme-toggle-y", `${y}px`);
    document.documentElement.style.setProperty("--theme-toggle-start-r", `${startRadius}px`);
    document.documentElement.style.setProperty("--theme-toggle-r", `${endRadius}px`);

    const transition = (document as unknown as {
      startViewTransition: (cb: () => void) => { ready: Promise<void> };
    }).startViewTransition(() => {
      // Synchronously toggle class so the new view snapshot has the actual new theme colors
      if (newTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      flushSync(() => {
        setTheme(newTheme);
      });
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(${startRadius}px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 650,
          easing: "cubic-bezier(0.23, 1, 0.32, 1)",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
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
              : "border-black/10 bg-primary/20 shadow-[0_0_20px_var(--color-primary)]"
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
          <div className="absolute inset-0 rounded-full transition-opacity duration-300 bg-linear-to-tr from-primary/30 to-transparent opacity-100 blur-[1px]" />
          
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
                <Sun className="h-4 w-4 text-primary drop-shadow-[0_0_12px_var(--color-primary)]" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Liquid Overflow Glow */}
        <div className="absolute -inset-1 rounded-full opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100 bg-primary/10" />
      </button>
    </div>
  );
}


