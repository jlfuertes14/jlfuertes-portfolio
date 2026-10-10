"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

const technologies = [
  { name: "C++", icon: "/icons/tech/cplusplus.svg" },
  { name: "C#", icon: "/icons/tech/csharp.svg" },
  { name: "Arduino", icon: "/icons/tech/arduino.svg" },
  { name: "Python", icon: "/icons/tech/python.svg" },
  { name: "FastAPI", icon: "/icons/tech/fastapi.svg" },
  { name: "Flask", icon: "/icons/tech/flask.svg", invertInDark: true },
  { name: "HTML5", icon: "/icons/tech/html5.svg" },
  { name: "CSS3", icon: "/icons/tech/css3.svg" },
  { name: "JavaScript", icon: "/icons/tech/javascript.svg" },
  { name: "Node.js", icon: "/icons/tech/nodejs.svg" },
  { name: "Next.js", icon: "/icons/tech/nextjs.svg" },
  { name: "React", icon: "/icons/tech/react.svg" },
  { name: "TypeScript", icon: "/icons/tech/typescript.svg" },
  { name: "Tailwind CSS", icon: "/icons/tech/tailwindcss.svg" },
  { name: "MongoDB", icon: "/icons/tech/mongodb.svg" },
  { name: "UI/UX Design", icon: "/icons/tech/figma.svg", invertInDark: true },
];

function TechItem({
  tech,
  compact = false,
}: {
  tech: (typeof technologies)[number];
  compact?: boolean;
}) {
  return (
    <div
      className={`group flex items-center ${compact ? "gap-3 rounded-full px-4 py-2.5" : "gap-6"
        } opacity-80 transition-all duration-300 dark:grayscale hover:opacity-100 hover:grayscale-0`}
    >
      <div
        className={`relative ${compact ? "h-8 w-8" : "h-16 w-16"
          } transition-transform duration-300 group-hover:scale-110`}
      >
        <Image
          src={tech.icon}
          alt={tech.name}
          fill
          sizes={compact ? "32px" : "64px"}
          className={`object-contain ${tech.invertInDark ? "dark:invert dark:brightness-100" : ""}`}
        />
      </div>
      <span
        className={`font-semibold tracking-tight text-foreground/80 ${compact ? "text-sm" : "text-xl"
          }`}
      >
        {tech.name}
      </span>
    </div>
  );
}

export const TechMarquee = () => {
  const prefersReducedMotion = useReducedMotion();
  const desktopItems = [...technologies, ...technologies];
  const mobileTopRow = [...technologies.slice(0, 8), ...technologies.slice(0, 8)];
  const mobileBottomRow = [...technologies.slice(8), ...technologies.slice(8)];

  const maskedStyle = {
    maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
    WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
  } as const;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative sm:hidden w-full overflow-hidden bg-transparent px-4 py-10"
      >
        <div className="mb-6 text-center">
          <span className="text-[11px] font-bold uppercase tracking-[0.35em] text-foreground/55">
            Essential Tool Stack
          </span>
        </div>

        <div className="space-y-4">
          <div className="overflow-hidden" style={maskedStyle}>
            <motion.div
              className="flex w-max items-center gap-3 will-change-transform"
              animate={prefersReducedMotion ? undefined : { x: ["0%", "-50%"] }}
              transition={
                prefersReducedMotion
                  ? undefined
                  : { duration: 18, repeat: Infinity, ease: "linear" }
              }
            >
              {mobileTopRow.map((tech, index) => (
                <div
                  key={`mobile-top-${tech.name}-${index}`}
                  className="rounded-full border border-border/60 bg-background/50 backdrop-blur-sm"
                >
                  <TechItem tech={tech} compact />
                </div>
              ))}
            </motion.div>
          </div>

          <div className="overflow-hidden" style={maskedStyle}>
            <motion.div
              className="flex w-max items-center gap-3 will-change-transform"
              animate={prefersReducedMotion ? undefined : { x: ["-50%", "0%"] }}
              transition={
                prefersReducedMotion
                  ? undefined
                  : { duration: 20, repeat: Infinity, ease: "linear" }
              }
            >
              {mobileBottomRow.map((tech, index) => (
                <div
                  key={`mobile-bottom-${tech.name}-${index}`}
                  className="rounded-full border border-border/60 bg-background/50 backdrop-blur-sm"
                >
                  <TechItem tech={tech} compact />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.75, ease: "easeOut" }}
        className="relative hidden sm:flex w-full items-center overflow-hidden bg-transparent py-12 md:py-16 xl:py-20 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 border-none"
      >
        <div className="z-20 flex items-center bg-transparent pr-6 lg:pr-10 xl:pr-14 shrink-0">
          <span className="whitespace-nowrap text-sm md:text-base lg:text-lg font-semibold tracking-tight text-foreground/60">
            My Essential Tool Stack
          </span>
        </div>

        <div className="flex-1 overflow-hidden" style={maskedStyle}>
          <motion.div
            className="flex w-max items-center gap-10 md:gap-14 lg:gap-16 xl:gap-24 whitespace-nowrap will-change-transform"
            animate={prefersReducedMotion ? undefined : { x: ["0%", "-50%"] }}
            transition={
              prefersReducedMotion
                ? undefined
                : { duration: 24, repeat: Infinity, ease: "linear" }
            }
          >
            {desktopItems.map((tech, index) => (
              <TechItem key={`desktop-${tech.name}-${index}`} tech={tech} />
            ))}
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};
