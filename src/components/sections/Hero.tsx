"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/site-data";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "power4.out" },
        });

        // 1. Circle — elastic scale-in
        tl.fromTo(
          ".hero-circle",
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1.2,
            ease: "elastic.out(1, 0.55)",
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
            duration: 0.7,
            stagger: 0.035,
            ease: "back.out(1.7)",
          },
          0.5
        );

        // 4. Description + CTA
        tl.fromTo(
          ".hero-desc",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4"
        );

        // 7. Footer elements
        tl.fromTo(
          ".hero-footer-el",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.1 },
          "-=0.2"
        );

        // Single float on load
        gsap.to(".hero-circle", {
          y: -8,
          duration: 2,
          ease: "power2.out",
        });

        // Continuous: scroll line pulse
        gsap.fromTo(
          ".hero-scroll-line",
          { y: -12, opacity: 1 },
          {
            y: 20,
            opacity: 0,
            duration: 1.4,
            repeat: -1,
            ease: "power2.in",
          }
        );
      });

      // Reduced motion — just show everything
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          ".hero-logo, .hero-circle, .hero-image, .hero-char, .hero-desc, .hero-nav, .hero-footer-el",
          { opacity: 1, y: 0, x: 0, scale: 1, rotationX: 0 }
        );
      });
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
      className="relative flex min-h-screen w-full flex-col items-center justify-between overflow-hidden bg-background p-6 sm:p-8 md:p-12"
    >
      {/* Spacer for sticky navbar */}
      <div className="h-16" />

      {/* ─── Main Content Area ─── */}
      <div className="relative grid w-full max-w-7xl flex-grow grid-cols-1 items-center md:grid-cols-3">
        {/* Left — Description */}
        <div className="hero-desc z-20 order-2 md:order-1 text-center md:text-left opacity-0">
          <p className="mx-auto max-w-xs text-sm leading-relaxed text-foreground/70 md:mx-0">
            {siteConfig.tagline}
          </p>
          <a
            href="#about"
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors duration-300 underline decoration-primary underline-offset-4"
          >
            Read More
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        {/* Center — Profile Image + Circle */}
        <div className="relative order-1 md:order-2 flex justify-center items-center h-full overflow-visible">
          {/* Yellow circle — centered behind upper body */}
          <div className="hero-circle absolute z-0 rounded-full bg-yellow-400/90 opacity-0 h-[250px] w-[250px] md:h-[350px] md:w-[350px] lg:h-[430px] lg:w-[430px] -translate-y-[60%]" />
          {/* Profile image — overlaps circle, body extends below */}
          <div className="hero-image relative z-10 opacity-0 w-[280px] md:w-[340px] lg:w-[420px] translate-y-[15%]">
            <Image
              src="/images/prof trans.png"
              alt={siteConfig.name}
              width={900}
              height={1300}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>

        {/* Right — Name */}
        <div className="z-20 order-3 flex items-center justify-center text-center md:justify-start">
          <h1 className="text-6xl font-extrabold text-foreground sm:text-7xl md:text-8xl lg:text-9xl leading-[0.85] tracking-tighter">
            {splitText("JOHN")}
            <br />
            {splitText("LESTER")}
          </h1>
        </div>
      </div>

      {/* ─── Bottom Bar ─── */}
      <footer className="z-30 flex w-full max-w-7xl items-center justify-between">
        <div className="hero-footer-el text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground opacity-0">
          Taytay, Rizal, PH
        </div>

        {/* Scroll Indicator */}
        <div className="hero-footer-el flex flex-col items-center gap-1.5 opacity-0">
          <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
            Scroll
          </span>
          <div className="relative h-8 w-[1px] overflow-hidden">
            <div className="hero-scroll-line absolute top-0 left-0 w-full h-3 bg-gradient-to-b from-primary to-transparent" />
          </div>
        </div>

        <div className="hero-footer-el text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground opacity-0">
          © {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
}
