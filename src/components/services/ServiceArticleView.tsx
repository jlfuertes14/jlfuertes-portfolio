"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Expand,
  X,
} from "lucide-react";
import type { ServiceItem } from "@/lib/services-data";
import type { Project } from "@/lib/site-data";
import { cn } from "@/lib/utils";

interface ServiceArticleViewProps {
  service: ServiceItem;
  prevService: ServiceItem;
  nextService: ServiceItem;
  relatedProjects: Project[];
}

interface TocEntry {
  id: string;
  label: string;
}

export default function ServiceArticleView({
  service,
  prevService,
  nextService,
  relatedProjects,
}: ServiceArticleViewProps) {
  const prefersReducedMotion = useReducedMotion();
  const progressBarRef = useRef<HTMLDivElement>(null);

  const [activeSectionId, setActiveSectionId] = useState<string>(
    service.sections[0]?.id ?? "overview"
  );
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  const tocEntries = useMemo<TocEntry[]>(() => {
    const base: TocEntry[] = service.sections.map((section) => ({
      id: section.id,
      label: section.heading,
    }));

    base.push({ id: "deliverables", label: "What you get" });
    base.push({ id: "proof-gallery", label: "Selected artifacts" });

    if (relatedProjects.length > 0) {
      base.push({ id: "related-work", label: "Related projects" });
    }

    return base;
  }, [service.sections, relatedProjects.length]);

  useEffect(() => {
    const rafId = window.requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => window.cancelAnimationFrame(rafId);
  }, []);

  // GPU-composited reading progress indicator (transform: scaleX only)
  useEffect(() => {
    let frameId: number | null = null;

    const updateProgress = () => {
      frameId = null;
      if (!progressBarRef.current) return;
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const ratio =
        totalHeight > 0
          ? Math.min(1, Math.max(0, window.scrollY / totalHeight))
          : 0;
      progressBarRef.current.style.transform = `scaleX(${ratio})`;
    };

    const handleScroll = () => {
      if (frameId !== null) return;
      frameId = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  // Track active editorial section for the sticky Table of Contents
  useEffect(() => {
    const sectionElements = tocEntries
      .map((entry) => document.getElementById(entry.id))
      .filter((el): el is HTMLElement => el !== null);

    if (sectionElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveSectionId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-18% 0px -65% 0px",
        threshold: 0,
      }
    );

    sectionElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [tocEntries]);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const showPrevImage = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null
        ? (prev - 1 + service.proof.gallery.length) %
          service.proof.gallery.length
        : null
    );
  }, [service.proof.gallery.length]);

  const showNextImage = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % service.proof.gallery.length : null
    );
  }, [service.proof.gallery.length]);

  // Lightbox keyboard navigation & scroll lock
  useEffect(() => {
    if (lightboxIndex === null) return;

    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.body.setAttribute("data-modal-open", "true");

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeLightbox();
      } else if (event.key === "ArrowLeft") {
        showPrevImage();
      } else if (event.key === "ArrowRight") {
        showNextImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.removeAttribute("data-modal-open");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxIndex, closeLightbox, showPrevImage, showNextImage]);

  const handleJumpToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
    setActiveSectionId(id);
  };

  return (
    <div className="min-h-[100dvh] bg-background text-foreground selection:bg-primary/30 selection:text-primary">
      {/* Hairline Reading Progress Bar */}
      <div
        aria-hidden="true"
        className="fixed top-0 inset-x-0 z-[60] h-[2px] bg-border/30 pointer-events-none"
      >
        <div
          ref={progressBarRef}
          className="h-full w-full bg-foreground origin-left will-change-transform"
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      {/* Spacer for fixed floating navbar */}
      <div className="h-24 sm:h-28 md:h-32" />

      <article className="pb-24 sm:pb-32">
        {/* =================================================================== */}
        {/* WIDE CONTAINER                                                      */}
        {/* =================================================================== */}
        <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-8 lg:px-12">
          {/* Minimal Back Link Bar */}
          <div className="pb-6 border-b border-border/60">
            <Link
              href="/#services"
              className="group inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none rounded-full pr-2"
            >
              <ArrowLeft
                className="size-4 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-x-1 motion-reduce:group-hover:translate-x-0"
                aria-hidden="true"
              />
              <span>Back to Services</span>
            </Link>
          </div>

          {/* ================================================================= */}
          {/* CLEAN EDITORIAL MASTHEAD (SPACE GROTESK + INTER)                  */}
          {/* ================================================================= */}
          <header className="pt-10 sm:pt-14 lg:pt-16 pb-10 sm:pb-14">
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                ease: [0.23, 1, 0.32, 1],
              }}
              className="space-y-6"
            >
              <p className="font-mono text-xs sm:text-[13px] uppercase tracking-[0.14em] text-muted-foreground">
                {service.eyebrow}
              </p>

              <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-bold tracking-tight leading-[1.01] text-foreground max-w-5xl">
                {service.title}
                <span className="text-primary">.</span>
              </h1>

              <p className="text-xl sm:text-2xl lg:text-[26px] font-normal leading-[1.45] tracking-[-0.01em] text-muted-foreground max-w-4xl text-pretty pt-1">
                {service.shortDesc}
              </p>
            </motion.div>
          </header>

          {/* ================================================================= */}
          {/* FULL-WIDTH HERO VISUAL SHOWCASE                                   */}
          {/* ================================================================= */}
          <figure className="mb-16 sm:mb-24">
            <button
              type="button"
              onClick={() => setLightboxIndex(0)}
              className="group relative block aspect-[16/10] lg:aspect-[16/9] w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-border/70 bg-muted shadow-lg transition-[border-color,transform] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-foreground/30 active:scale-[0.995] focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none cursor-pointer"
              aria-label={`Inspect hero preview: ${service.proof.alt}`}
            >
              <Image
                src={service.proof.image}
                alt={service.proof.alt}
                fill
                priority
                sizes="(min-width: 1440px) 1360px, 96vw"
                className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02] motion-reduce:group-hover:scale-100"
              />
              <span className="pointer-events-none absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-zinc-950/75 px-3.5 py-1.5 font-mono text-xs text-white/90 backdrop-blur-md transition-opacity duration-200 opacity-90 group-hover:opacity-100">
                <Expand className="size-3.5" aria-hidden="true" />
                <span>Inspect</span>
              </span>
            </button>
            <figcaption className="mt-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 text-sm text-muted-foreground">
              <span className="leading-relaxed">{service.heroCaption}</span>
              <span className="font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground/75 shrink-0 tabular-nums">
                Fig. 00 · Lead Preview
              </span>
            </figcaption>
          </figure>

          {/* ================================================================= */}
          {/* WIDE 2-COLUMN EDITORIAL BODY                                      */}
          {/* ================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-[220px_minmax(0,1fr)] xl:grid-cols-[240px_minmax(0,1fr)] gap-10 lg:gap-14 xl:gap-20 items-start">
            {/* Left Sticky Table of Contents Rail (Desktop LG+) */}
            <aside
              aria-label="Table of contents"
              className="hidden lg:block sticky top-28 space-y-8"
            >
              <div className="space-y-4">
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground/75">
                  On this page
                </p>
                <nav className="flex flex-col gap-1">
                  {tocEntries.map((entry, idx) => {
                    const isCurrent = activeSectionId === entry.id;
                    return (
                      <button
                        key={entry.id}
                        type="button"
                        onClick={() => handleJumpToSection(entry.id)}
                        className={cn(
                          "group flex items-baseline gap-2.5 rounded-lg py-2 px-2.5 text-left text-[13px] leading-snug transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none cursor-pointer",
                          isCurrent
                            ? "text-foreground font-semibold bg-muted/60"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                        )}
                      >
                        <span className="font-mono text-[11px] text-muted-foreground/65 tabular-nums shrink-0">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <span className="line-clamp-2">{entry.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              <div className="pt-6 border-t border-border/60 space-y-3">
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Building something in {service.subtitle.toLowerCase()}?
                </p>
                <Link
                  href="/#contact"
                  className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-xs font-medium text-background transition-[opacity,transform] duration-200 hover:opacity-90 active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                >
                  <span>Start a project</span>
                  <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </Link>
              </div>
            </aside>

            {/* Primary Reading & Media Column */}
            <div className="min-w-0 w-full">
              {/* Mobile & Tablet Horizontal Jump Bar */}
              <nav
                aria-label="Jump to section"
                className="lg:hidden mb-10 flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar"
              >
                {tocEntries.map((entry, idx) => {
                  const isCurrent = activeSectionId === entry.id;
                  return (
                    <button
                      key={entry.id}
                      type="button"
                      onClick={() => handleJumpToSection(entry.id)}
                      className={cn(
                        "shrink-0 min-h-[44px] rounded-full border px-4 py-2 text-xs font-medium transition-[color,background-color,border-color] duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none cursor-pointer",
                        isCurrent
                          ? "border-foreground/30 bg-foreground text-background"
                          : "border-border/70 bg-muted/30 text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <span className="font-mono text-[10px] opacity-70 mr-1.5 tabular-nums">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      {entry.label}
                    </button>
                  );
                })}
              </nav>

              {/* Opening Lead Narrative */}
              <p className="text-lg sm:text-xl lg:text-[22px] leading-[1.7] tracking-[0.005em] text-foreground/90 max-w-[70ch] text-pretty mb-12 sm:mb-16">
                {service.description}
              </p>

              {/* Editorial Statement Pull-Quote (Space Grotesk, Hairline Top/Bottom) */}
              <blockquote className="my-12 sm:my-16 border-y border-border/60 py-8 sm:py-12">
                <p className="font-heading text-2xl sm:text-3xl lg:text-[38px] font-semibold leading-[1.2] tracking-tight text-foreground max-w-4xl text-balance">
                  “{service.pullQuote}”
                </p>
              </blockquote>

              {/* Long-Form Editorial Chapters */}
              <div className="space-y-20 sm:space-y-28">
                {service.sections.map((section) => {
                  const inlineFigure =
                    section.figureIndex !== undefined
                      ? service.proof.gallery[section.figureIndex]
                      : undefined;

                  return (
                    <section
                      key={section.id}
                      id={section.id}
                      className="scroll-mt-28 space-y-7"
                    >
                      <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.08] tracking-tight text-foreground max-w-4xl">
                        {section.heading}
                      </h2>

                      <div className="space-y-6 max-w-[72ch]">
                        {section.paragraphs.map((paragraph, pIdx) => (
                          <p
                            key={pIdx}
                            className="text-[17px] sm:text-[18px] lg:text-[19px] leading-[1.78] tracking-[0.008em] text-foreground/80 text-pretty"
                          >
                            {paragraph}
                          </p>
                        ))}
                      </div>

                      {section.bullets && section.bullets.length > 0 && (
                        <ul className="divide-y divide-border/50 border-y border-border/50 my-10">
                          {section.bullets.map((bullet, bIdx) => (
                            <li
                              key={bullet.label}
                              className="py-6 sm:py-7 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 items-baseline"
                            >
                              <div className="md:col-span-4 flex items-baseline gap-3">
                                <span className="font-mono text-xs text-muted-foreground/65 tabular-nums">
                                  {String(bIdx + 1).padStart(2, "0")}
                                </span>
                                <span className="font-heading text-base sm:text-lg font-semibold tracking-tight text-foreground leading-snug">
                                  {bullet.label}
                                </span>
                              </div>
                              <p className="md:col-span-8 text-base sm:text-[17px] leading-[1.7] tracking-[0.005em] text-muted-foreground text-pretty">
                                {bullet.detail}
                              </p>
                            </li>
                          ))}
                        </ul>
                      )}

                      {inlineFigure && section.figureIndex !== undefined && (
                        <figure className="pt-3">
                          <button
                            type="button"
                            onClick={() =>
                              setLightboxIndex(section.figureIndex!)
                            }
                            className="group relative block aspect-[16/10] w-full overflow-hidden rounded-2xl border border-border/60 bg-muted shadow-md transition-[border-color,transform] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-foreground/30 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none cursor-pointer"
                            aria-label={`Inspect figure: ${inlineFigure.alt}`}
                          >
                            <Image
                              src={inlineFigure.src}
                              alt={inlineFigure.alt}
                              fill
                              sizes="(min-width: 1280px) 1080px, 96vw"
                              className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02] motion-reduce:group-hover:scale-100"
                            />
                            <span className="pointer-events-none absolute bottom-3.5 right-3.5 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-zinc-950/75 px-3 py-1 font-mono text-xs text-white/90 backdrop-blur-md opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                              <Expand className="size-3.5" aria-hidden="true" />
                              <span>Expand</span>
                            </span>
                          </button>
                          <figcaption className="mt-3.5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 text-sm text-muted-foreground">
                            <span className="leading-relaxed">
                              {inlineFigure.caption}
                            </span>
                            <span className="font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground/75 shrink-0 tabular-nums">
                              Fig. {String(section.figureIndex + 1).padStart(2, "0")}
                            </span>
                          </figcaption>
                        </figure>
                      )}
                    </section>
                  );
                })}

                {/* =========================================================== */}
                {/* DELIVERABLES                                                */}
                {/* =========================================================== */}
                <section
                  id="deliverables"
                  className="scroll-mt-28 pt-16 border-t border-border/60 space-y-8"
                >
                  <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.08] tracking-tight text-foreground">
                    What you get<span className="text-primary">.</span>
                  </h2>

                  <ul className="divide-y divide-border/50 border-y border-border/50">
                    {service.deliverables.map((item, idx) => (
                      <li
                        key={item}
                        className="flex items-baseline gap-4 py-4 sm:py-5 text-base sm:text-[18px] leading-[1.6] text-foreground/85"
                      >
                        <span className="font-mono text-xs text-muted-foreground/65 tabular-nums shrink-0">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* =========================================================== */}
                {/* ASYMMETRIC VISUAL PROOF GALLERY                             */}
                {/* =========================================================== */}
                <section
                  id="proof-gallery"
                  className="scroll-mt-28 pt-16 border-t border-border/60 space-y-10"
                >
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div className="space-y-3 max-w-2xl">
                      <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.08] tracking-tight text-foreground">
                        Selected artifacts<span className="text-primary">.</span>
                      </h2>
                      <p className="text-base sm:text-lg leading-relaxed text-muted-foreground text-pretty">
                        {service.proof.description}
                      </p>
                    </div>

                    <span className="font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground/75 tabular-nums shrink-0">
                      {service.proof.gallery.length} frames · Click to inspect
                    </span>
                  </div>

                  {/* Alternating 7/5 and 5/7 asymmetric editorial grid */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-10">
                    {service.proof.gallery.map((photo, idx) => {
                      const rowIndex = Math.floor(idx / 2);
                      const isFirstInRow = idx % 2 === 0;
                      const isWide =
                        rowIndex % 2 === 0 ? isFirstInRow : !isFirstInRow;

                      return (
                        <figure
                          key={photo.src}
                          className={cn(
                            "space-y-3",
                            isWide ? "md:col-span-7" : "md:col-span-5"
                          )}
                        >
                          <button
                            type="button"
                            onClick={() => setLightboxIndex(idx)}
                            className={cn(
                              "group relative block w-full overflow-hidden rounded-2xl border border-border/60 bg-muted text-left transition-[border-color,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-foreground/35 active:scale-[0.985] focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none cursor-pointer",
                              isWide
                                ? "aspect-[16/10]"
                                : "aspect-[16/10] md:aspect-[4/3]"
                            )}
                            aria-label={`Inspect artifact ${idx + 1} of ${service.proof.gallery.length}: ${photo.alt}`}
                          >
                            <Image
                              src={photo.src}
                              alt={photo.alt}
                              fill
                              sizes={
                                isWide
                                  ? "(min-width: 768px) 58vw, 100vw"
                                  : "(min-width: 768px) 42vw, 100vw"
                              }
                              className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.03] motion-reduce:group-hover:scale-100"
                            />
                            <span className="pointer-events-none absolute top-3 left-3 rounded-full border border-white/15 bg-zinc-950/70 px-2.5 py-0.5 font-mono text-[11px] text-white/90 backdrop-blur-md tabular-nums">
                              {String(idx + 1).padStart(2, "0")}
                            </span>
                            <span className="pointer-events-none absolute bottom-3 right-3 inline-flex size-9 items-center justify-center rounded-full border border-white/15 bg-zinc-950/70 text-white/90 backdrop-blur-md opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                              <Expand className="size-4" aria-hidden="true" />
                            </span>
                          </button>
                          <figcaption className="text-sm leading-relaxed text-muted-foreground">
                            {photo.caption}
                          </figcaption>
                        </figure>
                      );
                    })}
                  </div>
                </section>

                {/* =========================================================== */}
                {/* RELATED SHIPPED PROJECTS                                    */}
                {/* =========================================================== */}
                {relatedProjects.length > 0 && (
                  <section
                    id="related-work"
                    className="scroll-mt-28 pt-16 border-t border-border/60 space-y-8"
                  >
                    <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.08] tracking-tight text-foreground">
                      Related projects<span className="text-primary">.</span>
                    </h2>

                    <div className="divide-y divide-border/60 border-y border-border/60">
                      {relatedProjects.map((project) => (
                        <a
                          key={project.title}
                          href={project.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-7 py-6 transition-colors duration-200 hover:bg-muted/25 -mx-3 px-3 rounded-xl focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                        >
                          <div className="relative aspect-[16/10] w-full sm:w-44 shrink-0 overflow-hidden rounded-xl border border-border/60 bg-muted">
                            <Image
                              src={project.imageUrl}
                              alt={project.title}
                              fill
                              sizes="(min-width: 640px) 176px, 100vw"
                              className="object-cover transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-105 motion-reduce:group-hover:scale-100"
                            />
                          </div>

                          <div className="flex-1 min-w-0 space-y-1.5">
                            <div className="flex items-center justify-between gap-4">
                              <h3 className="font-heading text-xl sm:text-2xl font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors">
                                {project.title}
                              </h3>
                              <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground group-hover:text-foreground transition-colors shrink-0">
                                <span>{project.ctaLabel}</span>
                                <ArrowUpRight
                                  className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                  aria-hidden="true"
                                />
                              </span>
                            </div>
                            <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground/75">
                              {project.category}
                            </p>
                            <p className="text-sm sm:text-base text-muted-foreground line-clamp-2 leading-relaxed">
                              {project.description}
                            </p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </section>
                )}

                {/* =========================================================== */}
                {/* ASYMMETRIC END-OF-ARTICLE CTA                               */}
                {/* =========================================================== */}
                <section className="pt-16 border-t border-border/60">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end py-4">
                    <div className="lg:col-span-8 space-y-4">
                      <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.06] tracking-tight text-foreground">
                        Need help with {service.title.toLowerCase()}?
                      </h2>
                      <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl text-pretty">
                        Share what you are building, your timeline, and the
                        biggest technical bottleneck right now. I will reply
                        directly with a clear plan.
                      </p>
                    </div>

                    <div className="lg:col-span-4 flex flex-wrap lg:justify-end items-center gap-3">
                      <Link
                        href="/#contact"
                        className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-foreground px-7 py-3 text-sm font-medium text-background transition-[opacity,transform] duration-200 hover:opacity-90 active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                      >
                        <span>Discuss a project</span>
                        <ArrowUpRight className="size-4" aria-hidden="true" />
                      </Link>
                      <Link
                        href="/resume"
                        className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-border/70 bg-background/60 px-6 py-3 text-sm font-medium text-foreground transition-[background-color,transform] duration-200 hover:bg-muted active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                      >
                        <span>View Résumé</span>
                      </Link>
                    </div>
                  </div>
                </section>

                {/* =========================================================== */}
                {/* PREVIOUS / NEXT SERVICE NAVIGATION                          */}
                {/* =========================================================== */}
                <nav
                  aria-label="Adjacent service articles"
                  className="pt-14 border-t border-border/60 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
                >
                  <Link
                    href={`/services/${prevService.slug}`}
                    className="group flex flex-col justify-between gap-3 rounded-2xl border border-border/60 bg-background/60 p-6 sm:p-7 transition-[border-color,background-color,transform] duration-200 hover:border-foreground/30 hover:bg-muted/30 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                  >
                    <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground tabular-nums">
                      <ArrowLeft
                        className="size-3.5 transition-transform duration-200 group-hover:-translate-x-1 motion-reduce:group-hover:translate-x-0"
                        aria-hidden="true"
                      />
                      <span>Previous</span>
                    </span>
                    <span className="font-heading text-xl sm:text-2xl font-semibold tracking-tight text-foreground leading-snug">
                      {prevService.title}
                    </span>
                  </Link>

                  <Link
                    href={`/services/${nextService.slug}`}
                    className="group flex flex-col justify-between gap-3 rounded-2xl border border-border/60 bg-background/60 p-6 sm:p-7 sm:text-right sm:items-end transition-[border-color,background-color,transform] duration-200 hover:border-foreground/30 hover:bg-muted/30 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                  >
                    <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground tabular-nums">
                      <span>Next</span>
                      <ArrowRight
                        className="size-3.5 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="font-heading text-xl sm:text-2xl font-semibold tracking-tight text-foreground leading-snug">
                      {nextService.title}
                    </span>
                  </Link>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* =================================================================== */}
      {/* FULL-SCREEN LIGHTBOX FOR ARTIFACT INSPECTION                        */}
      {/* =================================================================== */}
      {mounted &&
        typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {lightboxIndex !== null && (
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-label="Inspect full-size screenshot"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="fixed inset-0 z-[120] bg-zinc-950/95 backdrop-blur-md flex flex-col items-center justify-between p-4 sm:p-6"
                onClick={closeLightbox}
              >
                {/* Top Bar */}
                <div
                  className="w-full max-w-6xl flex items-center justify-between text-white/80 py-2 select-none"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="font-mono text-xs text-white/75 tabular-nums">
                    {String(lightboxIndex + 1).padStart(2, "0")} /{" "}
                    {String(service.proof.gallery.length).padStart(2, "0")}
                  </span>
                  <button
                    type="button"
                    onClick={closeLightbox}
                    className="flex size-11 sm:size-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-[background-color,transform] duration-150 hover:bg-white/20 active:scale-[0.95] focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none cursor-pointer"
                    aria-label="Close image inspection"
                    title="Close (Esc)"
                  >
                    <X className="size-4" aria-hidden="true" />
                  </button>
                </div>

                {/* Center Image */}
                <div
                  className="relative flex-1 w-full max-w-6xl flex items-center justify-center py-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="relative w-full h-full max-h-[78vh] flex items-center justify-center">
                    <Image
                      src={service.proof.gallery[lightboxIndex].src}
                      alt={service.proof.gallery[lightboxIndex].alt}
                      fill
                      className="object-contain"
                      sizes="100vw"
                      priority
                    />
                  </div>

                  {service.proof.gallery.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={showPrevImage}
                        className="absolute left-2 sm:left-4 flex size-11 items-center justify-center rounded-full border border-white/20 bg-zinc-950/70 text-white backdrop-blur-sm transition-[background-color,transform] duration-150 hover:bg-zinc-900 active:scale-[0.95] focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none cursor-pointer"
                        aria-label="Previous image"
                        title="Previous (←)"
                      >
                        <ChevronLeft className="size-5" aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        onClick={showNextImage}
                        className="absolute right-2 sm:right-4 flex size-11 items-center justify-center rounded-full border border-white/20 bg-zinc-950/70 text-white backdrop-blur-sm transition-[background-color,transform] duration-150 hover:bg-zinc-900 active:scale-[0.95] focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none cursor-pointer"
                        aria-label="Next image"
                        title="Next (→)"
                      >
                        <ChevronRight className="size-5" aria-hidden="true" />
                      </button>
                    </>
                  )}
                </div>

                {/* Bottom Caption */}
                <div
                  className="w-full max-w-2xl text-center py-2 space-y-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  <p className="text-white/95 text-sm font-medium">
                    {service.proof.gallery[lightboxIndex].alt}
                  </p>
                  <p className="text-white/65 text-xs sm:text-sm leading-relaxed">
                    {service.proof.gallery[lightboxIndex].caption}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
}
