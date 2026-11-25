"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ServiceHoverModal } from "@/components/ui/services-with-animated-hover-modal";
import { playHoverSound } from "@/lib/sound-effects";
import { services } from "@/lib/services-data";

export default function Services() {
  const [modal, setModal] = useState({ active: false, index: 0 });

  // Formatted items for the cursor-following floating preview
  const hoverModalItems = services.map((s) => ({
    title: s.title,
    subtitle: s.subtitle,
    category: s.subtitle,
    color: s.color,
    src: s.proof.image,
    alt: s.proof.alt,
  }));

  return (
    <section
      id="services"
      className="relative py-24 sm:py-32 lg:py-40 bg-background text-foreground scroll-mt-24 overflow-hidden"
    >
      {/* Ambient atmospheric backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] max-w-full aspect-square rounded-full bg-primary/5 blur-[160px]"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header section */}
        <div className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground">
              What I can offer<span className="text-primary">.</span>
            </h2>
          </div>
          <p className="max-w-md text-base sm:text-lg text-muted-foreground font-normal leading-relaxed text-pretty">
            From full-stack web apps and applied AI to embedded hardware and
            workflow automation, I build practical systems designed to work
            reliably in the real world.
          </p>
        </div>

        {/* Interactive Dennis Snellenberg-inspired Services List */}
        <ul className="flex w-full flex-col border-t border-border/80 list-none p-0 m-0">
          {services.map((service, index) => (
            <li key={service.slug} className="list-none w-full p-0 m-0">
              <Link
                href={`/services/${service.slug}`}
                onClick={() => setModal({ active: false, index })}
                onMouseEnter={() => {
                  setModal({ active: true, index });
                  playHoverSound();
                }}
                onMouseLeave={() => setModal({ active: false, index })}
                className={cn(
                  "group relative flex w-full flex-col md:flex-row items-start md:items-center justify-between",
                  "py-8 sm:py-10 lg:py-12 px-4 sm:px-6 md:px-8 border-b border-border/70 text-left cursor-pointer",
                  "hover:border-transparent active:border-transparent focus:border-transparent",
                  "rounded-2xl md:rounded-3xl overflow-hidden select-none",
                  "focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                )}
                aria-label={`Read ${service.title} service guide and case details`}
              >
                {/* Smooth GPU-Composited Hover Highlight Backdrop */}
                <div
                  aria-hidden="true"
                  className={cn(
                    "pointer-events-none absolute inset-0 z-0",
                    "bg-zinc-950 dark:bg-white",
                    "opacity-0 group-hover:opacity-100",
                    "transition-opacity duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]",
                    "shadow-xl dark:shadow-2xl dark:shadow-white/5"
                  )}
                />

                {/* Left Column: Number, Title, and Tech Tags */}
                <div className="relative z-10 flex flex-row items-baseline gap-4 sm:gap-6 md:gap-8 flex-1 min-w-0 pr-4">
                  <span className="font-mono text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-foreground/80 dark:text-foreground/70 tabular-nums shrink-0 select-none transition-colors duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:text-white dark:group-hover:text-zinc-950">
                    {service.number}
                  </span>

                  <div className="flex flex-col gap-2 min-w-0">
                    <h3 className="m-0 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground transition-[transform,color] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-2.5 motion-reduce:group-hover:translate-x-0 group-hover:text-white dark:group-hover:text-zinc-950">
                      {service.title}
                    </h3>

                    {/* Short description on mobile, tech pills on tablet+ */}
                    <p className="text-sm text-muted-foreground line-clamp-2 md:hidden transition-colors duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:text-zinc-300 dark:group-hover:text-zinc-600">
                      {service.shortDesc}
                    </p>

                    <div className="hidden sm:flex flex-wrap items-center gap-2 mt-1 transition-[transform] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-2.5 motion-reduce:group-hover:translate-x-0">
                      {service.tech.map((item) => (
                        <span
                          key={item}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full border border-border/80 bg-background/80 text-[11px] font-mono text-muted-foreground font-medium transition-[background-color,border-color,color] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:bg-white/10 group-hover:border-white/20 group-hover:text-zinc-200 dark:group-hover:bg-black/5 dark:group-hover:border-black/15 dark:group-hover:text-zinc-800"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column: Category Subtitle & Action Trigger */}
                <div className="relative z-10 mt-4 md:mt-0 flex items-center justify-between w-full md:w-auto gap-4 md:gap-8 shrink-0">
                  <span className="font-mono text-xs sm:text-sm font-medium tracking-wider uppercase text-muted-foreground transition-[transform,color] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:text-zinc-200 dark:group-hover:text-zinc-800 group-hover:translate-x-1">
                    {service.subtitle}
                  </span>

                  {/* Desktop Hover Hint / Mobile Action Badge */}
                  <div className="flex size-9 sm:size-10 items-center justify-center rounded-full border border-border/80 bg-card text-muted-foreground transition-[transform,background-color,border-color,color] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-110 group-hover:bg-white group-hover:border-white group-hover:text-zinc-950 dark:group-hover:bg-zinc-950 dark:group-hover:border-zinc-950 dark:group-hover:text-white">
                    <ArrowUpRight className="size-4 sm:size-5 transition-[transform] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:rotate-45" />
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Floating Cursor-Following Preview (Dennis Snellenberg Style) */}
      <ServiceHoverModal modal={modal} items={hoverModalItems} />
    </section>
  );
}
