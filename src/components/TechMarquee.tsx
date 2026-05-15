"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

const technologies = [
  { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
  { name: "C#", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" },
  { name: "Arduino", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "FastAPI", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
  { name: "Flask", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg", invertInDark: true },
  { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", invertInDark: true },
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
      className={`group flex items-center ${
        compact ? "gap-3 rounded-full px-4 py-2.5" : "gap-6"
      } opacity-80 transition-all duration-300 dark:grayscale hover:opacity-100 hover:grayscale-0`}
    >
      <div
        className={`relative ${
          compact ? "h-8 w-8" : "h-16 w-16"
        } transition-transform duration-300 group-hover:scale-110`}
      >
        <Image
          src={tech.icon}
          alt={tech.name}
          fill
          className={`object-contain ${tech.invertInDark ? "dark:invert dark:brightness-100" : ""}`}
        />
      </div>
      <span
        className={`font-semibold tracking-tight text-foreground/80 ${
          compact ? "text-sm" : "text-xl"
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
              className="flex w-max items-center gap-3"
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
              className="flex w-max items-center gap-3"
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
        className="relative hidden sm:flex w-full items-center overflow-hidden bg-transparent py-16 md:py-24 px-8 sm:px-12 lg:px-20 xl:px-32 border-none"
      >
        <div className="z-20 flex items-center bg-transparent pr-10 lg:pr-16">
          <span className="whitespace-nowrap text-base lg:text-lg font-semibold tracking-tight text-foreground/60">
            My Essential Tool Stack
          </span>
        </div>

        <div className="flex-1 overflow-hidden" style={maskedStyle}>
          <motion.div
            className="flex w-max items-center gap-16 lg:gap-24 xl:gap-32 whitespace-nowrap"
            animate={prefersReducedMotion ? undefined : { x: ["0%", "-50%"] }}
            transition={
              prefersReducedMotion
                ? undefined
                : { duration: 28, repeat: Infinity, ease: "linear" }
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
