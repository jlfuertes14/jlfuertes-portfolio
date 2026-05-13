"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SectionHeadingProps {
  title: string;
  highlight: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  title,
  highlight,
  subtitle,
  className = "",
  align = "left",
}: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".sh-char",
          { opacity: 0, y: 50, rotationX: -40 },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 0.6,
            stagger: 0.025,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 88%",
            },
          }
        );

        if (subtitle) {
          gsap.fromTo(
            ".sh-sub",
            { opacity: 0, y: 15 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              delay: 0.3,
              scrollTrigger: {
                trigger: ref.current,
                start: "top 88%",
              },
            }
          );
        }
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".sh-char", { opacity: 1, y: 0, rotationX: 0 });
        gsap.set(".sh-sub", { opacity: 1, y: 0 });
      });
    },
    { scope: ref }
  );

  const splitWord = (text: string, isHighlight = false) =>
    text.split("").map((char, i) => (
      <span
        key={`${isHighlight ? "h" : "t"}-${i}`}
        className={`sh-char inline-block ${isHighlight ? "text-primary" : ""}`}
        style={{ perspective: "600px" }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));

  return (
    <div
      ref={ref}
      className={`${align === "center" ? "text-center" : ""} ${className}`}
    >
      <h2
        className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
        style={{ textWrap: "balance" } as React.CSSProperties}
      >
        {splitWord(title + " ")}
        {splitWord(highlight, true)}
      </h2>
      {subtitle && (
        <p
          className={`sh-sub mt-4 text-sm font-bold tracking-widest text-foreground/40 max-w-lg ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
