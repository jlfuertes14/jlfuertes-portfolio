"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { ArrowRight, ChevronDown } from "lucide-react";
import { siteConfig } from "@/lib/site-data";
import { TechMarquee } from "../TechMarquee";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      const reanimate = () => tl.restart();
      window.addEventListener("hero-reanimate", reanimate);

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // 1. Circle — elastic scale-in
        tl.fromTo(
          ".hero-circle",
          { scale: 0, opacity: 0, y: -150 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: "elastic.out(1, 0.75)",
          },
          0.1
        );

        // 2. Profile image slides up
        tl.fromTo(
          ".hero-image",
          { opacity: 0, y: 60, scale: 0.85 },
          { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out" },
          0.35
        );

        // 3. Name — staggered character reveal
        tl.fromTo(
          ".hero-char",
          { opacity: 0, y: 80, rotationX: -90 },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 0.8,
            stagger: 0.05,
            ease: "power4.out",
          },
          0.5
        );

        // 4. Description + CTA
        tl.fromTo(
          ".hero-desc-group",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.4"
        );

        // 5. Vertical Text
        tl.fromTo(
          ".hero-side-text",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.2 },
          "-=0.6"
        );

        // 7. Footer elements (Tech Marquee)
        tl.fromTo(
          ".hero-footer-el",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
          0.8
        );
      });

      // Reduced motion — just show everything
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          ".hero-logo, .hero-circle, .hero-image, .hero-char, .hero-desc-group, .hero-side-text, .hero-footer-el",
          { opacity: 1, y: 0, x: 0, scale: 1, rotationX: 0 }
        );
      });

      return () => {
        window.removeEventListener("hero-reanimate", reanimate);
      };
    },
    { scope: containerRef }
  );

  const splitText = (text: string) =>
    text.split("").map((char, i) => (
      <span
        key={`${text}-${i}`}
        className="hero-char inline-block opacity-0"
        style={{ perspective: "600px" }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));

  return (
    <div
      ref={containerRef}
      className="relative flex min-h-screen w-full flex-col items-center justify-between overflow-hidden bg-background p-6 sm:p-8 md:p-12 pb-8 sm:pb-12 md:pb-16"
    >
      <div className="h-16" /> {/* Spacer for sticky navbar */}

      {/* Architectural Side Text */}
      <div className="absolute left-10 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-12 z-20">
        <span className="hero-side-text vertical-text text-[10px] uppercase tracking-[0.4em] text-muted-foreground/50 opacity-0 [writing-mode:vertical-rl]">
          Full Stack Developer
        </span>
        <div className="hero-side-text w-px h-24 bg-border/40 opacity-0" />
        <span className="hero-side-text vertical-text text-[10px] uppercase tracking-[0.4em] text-muted-foreground/50 opacity-0 [writing-mode:vertical-rl]">
          Based in Philippines
        </span>
      </div>

      <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-12 z-20">
        <span className="hero-side-text vertical-text text-[10px] uppercase tracking-[0.4em] text-muted-foreground/50 opacity-0 [writing-mode:vertical-rl]">
          Est. 2026
        </span>
        <div className="hero-side-text w-px h-24 bg-border/40 opacity-0" />
        <span className="hero-side-text vertical-text text-[10px] uppercase tracking-[0.4em] text-muted-foreground/50 opacity-0 [writing-mode:vertical-rl]">
          {new Date().getFullYear()} Edition
        </span>
      </div>

      {/* ─── Main Content Area ─── */}
      <div className="relative z-10 grid w-full max-w-7xl grow grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-0">
        {/* Left Side: Typography & Bio */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <h1 className="text-[15vw] lg:text-[10rem] font-extralight text-foreground leading-[0.8] tracking-tighter mb-8">
            {splitText("Hello")}
          </h1>

          <div className="hero-desc-group opacity-0 max-w-md space-y-8">
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              I am <span className="text-foreground font-medium">{siteConfig.name}</span>,  a Computer Engineer bridging the gap between <span className="text-primary/80">hardware circuits</span> and <span className="text-primary/80">intelligent software</span>.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <button
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                className="group flex items-center gap-3 px-6 py-3 rounded-full bg-foreground text-background font-medium hover:bg-foreground/90 transition-all duration-300"
              >
                <span>Scroll down</span>
                <ChevronDown className="w-4 h-4 animate-bounce" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Signature Profile style */}
        <div className="hero-image-container relative flex justify-center items-center h-full">
          <div className="hero-circle absolute z-0 rounded-full bg-primary opacity-0 h-[280px] w-[280px] md:h-[400px] md:w-[400px] lg:h-[520px] lg:w-[520px]" />
          <div className="hero-image relative z-10 opacity-0 w-[240px] md:w-[320px] lg:w-[440px] mt-12 lg:mt-20">
            <Image
              src="/images/prof trans.png"
              alt={siteConfig.name}
              width={900}
              height={1300}
              className="w-full h-auto drop-shadow-2xl"
              priority
            />
          </div>
        </div>
      </div>

      {/* ─── Bottom Bar (Tech Stack Marquee) ─── */}
      <div className="z-30 w-full mt-auto border-none">
        <div className="hero-footer-el opacity-0 border-none">
          <TechMarquee />
        </div>
      </div>
    </div>
  );
}
