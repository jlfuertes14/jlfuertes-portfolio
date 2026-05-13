"use client";

import React from "react";
import { motion } from "framer-motion";
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

export const TechMarquee = () => {
  // Triple the list to ensure there's enough content to fill the screen and loop smoothly
  const marqueeItems = [...technologies, ...technologies, ...technologies];

  return (
    <div className="relative flex w-full items-center overflow-hidden bg-transparent py-24 px-8 sm:px-12 md:px-48 border-none">
      {/* Title Section - Static on the left */}
      <div className="z-20 flex items-center bg-transparent pr-16">
        <span className="whitespace-nowrap text-lg font-semibold tracking-tight text-foreground/60">
          My Essential Tool Stack
        </span>
      </div>

      {/* Sliding Track with CSS Mask for smooth fading */}
      <div 
        className="flex-1 overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
        }}
      >
        <motion.div
          className="flex gap-32 items-center whitespace-nowrap"
          animate={{
            x: [0, -1500],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {marqueeItems.map((tech, index) => (
            <div
              key={index}
              className="flex items-center gap-6 opacity-80 hover:opacity-100 dark:grayscale hover:grayscale-0 transition-all duration-300 group"
            >
              <div className="relative h-16 w-16 transition-transform duration-300 group-hover:scale-110">
                <Image
                  src={tech.icon}
                  alt={tech.name}
                  fill
                  className={`object-contain ${(tech as any).invertInDark ? "dark:invert dark:brightness-100" : ""}`}
                />
              </div>
              <span className="text-xl font-semibold tracking-tight text-foreground/80">
                {tech.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>


  );
};

