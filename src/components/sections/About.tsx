"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "@/components/SectionHeading";
import { skills, siteConfig } from "@/lib/site-data";
import { Cpu, PenTool } from "lucide-react";
import {
  SiHtml5,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiMongodb,
  SiPython,
  SiCplusplus,
  SiEspressif,
  SiFigma,
} from "react-icons/si";

const iconMap: Record<string, { icon: React.ElementType; color: string }> = {
  "HTML/CSS/JS": { icon: SiHtml5, color: "#E34F26" },
  "React / Next.js": { icon: SiReact, color: "#61DAFB" },
  "TypeScript": { icon: SiTypescript, color: "#3178C6" },
  "Tailwind CSS": { icon: SiTailwindcss, color: "#06B6D4" },
  "Node.js": { icon: SiNodedotjs, color: "#339939" },
  "MongoDB": { icon: SiMongodb, color: "#47A248" },
  "Python": { icon: SiPython, color: "#FFCE3A" }, // Updated to Python vibrant yellow
  "C++ / Arduino": { icon: SiCplusplus, color: "#00599C" },
  "MicroPython": { icon: SiPython, color: "#3776AB" }, // Keep blue for MicroPython
  "ESP32": { icon: SiEspressif, color: "#E7352C" },
  "Embedded Systems": { icon: Cpu, color: "#888888" },
  "UI/UX Design": { icon: SiFigma, color: "#F24E1E" },
};

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Text block slides in from left
        gsap.fromTo(
          ".about-text",
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".about-text",
              start: "top 85%",
            },
          }
        );

        // Skills pills stagger with elastic pop
        gsap.fromTo(
          ".skill-pill",
          { opacity: 0, y: 20, scale: 0.85 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.45,
            stagger: 0.04,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: ".about-skills",
              start: "top 85%",
            },
          }
        );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".about-text, .skill-pill", {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      className="w-full px-6 py-24 md:py-32 md:px-12"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading title="ABOUT" highlight="ME" />

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          {/* Left — Bio */}
          <div className="about-text space-y-5 text-foreground/70 leading-relaxed opacity-0">
            <p>
              I&apos;m a 4th-year Computer Engineering student with a passion
              for both web development and electronics. I want to be a flexible
              developer who can bridge the gap between software and hardware.
            </p>
            <p>
              I&apos;ve always been fascinated by the tech world, and I believe
              that genuine passion is the key to success. I pride myself on
              having an &quot;I&apos;ll figure it out&quot; mindset — no matter
              how hard the problem is, I don&apos;t give up easily.
            </p>
            <div className="flex flex-col gap-2 pt-2 text-sm text-foreground/40 font-medium">
              <span>📍 {siteConfig.location}</span>
              <span>
                🎓 {siteConfig.degree} — {siteConfig.university}
              </span>
            </div>
          </div>

          {/* Right — Skills */}
          <div>
            <h3 className="mb-6 text-xs font-bold uppercase tracking-widest text-foreground/40">
              Knowledge &amp; Skills
            </h3>
            <div className="about-skills grid grid-cols-4 sm:grid-cols-6 gap-5 w-fit">
              {skills.map((skill) => {
                const mapping = iconMap[skill.name] || { icon: Cpu, color: "currentColor" };
                const Icon = mapping.icon;
                return (
                  <span
                    key={skill.name}
                    className="skill-pill group relative z-10 hover:z-50 cursor-default flex h-[3.25rem] w-[3.25rem] items-center justify-center rounded-xl border border-border bg-card/50 transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_20px_-5px_oklch(0.75_0.18_160/0.3)] opacity-0"
                  >
                    <Icon className="h-6 w-6" style={{ color: mapping.color }} />
                    
                    {/* Hover Tooltip */}
                    <span className="absolute -bottom-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap text-xs font-medium text-foreground bg-background border border-border/60 rounded-md px-2.5 py-1.5 shadow-xl pointer-events-none hidden md:block">
                      {skill.name}
                    </span>
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
