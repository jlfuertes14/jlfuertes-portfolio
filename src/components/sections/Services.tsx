"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  ArrowLeft,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { cn } from "@/lib/utils";
import { ServiceHoverModal } from "@/components/ui/services-with-animated-hover-modal";

interface GalleryImage {
  src: string;
  alt: string;
}

interface ServiceItem {
  title: string;
  subtitle: string;
  shortDesc: string;
  description: string;
  tech: string[];
  color: string;
  proof: {
    description: string;
    image: string;
    alt: string;
    gallery: GalleryImage[];
  };
}

const services: ServiceItem[] = [
  {
    title: "Full-Stack Development",
    subtitle: "Web Applications",
    shortDesc: "Scalable web platforms, microservices, and reactive user interfaces built for speed.",
    description:
      "You don't just need a website — you need a platform that works flawlessly and scales as you grow. I design and build full-stack web applications from the ground up. Whether it's a sleek customer portal, a data-heavy internal dashboard, or a fast-loading e-commerce site, I handle both the backend logic and pixel-perfect frontend. The result? A digital product that looks great, runs fast, and drives your business forward.",
    tech: ["React / Next.js", "TypeScript", "FastAPI / Node.js", "MongoDB / SQL"],
    color: "#0a0f1d",
    proof: {
      description:
        "Real products I've shipped — responsive storefronts, admin dashboards, and API-driven platforms running in production.",
      image: "/images/aniverse-right-image.png",
      alt: "AniVerse desktop application preview",
      gallery: [
        { src: "/images/aniverse-right-image.png", alt: "AniVerse desktop interface" },
        { src: "/images/lumina-admin-dashboard.png", alt: "Lumina Electronics desktop admin dashboard" },
        { src: "/images/chamen-resort-rght-dekstop.png", alt: "Chamen Resort desktop preview" },
        { src: "/images/onyx-right-dekstop-preveiw.png", alt: "Onyx desktop preview" },
        { src: "/images/aniverse.png", alt: "AniVerse product landing page" },
        { src: "/images/chamen-resort.png", alt: "Chamen Resort responsive landing page" },
      ],
    },
  },
  {
    title: "AI Integration",
    subtitle: "AI Powered Solutions",
    shortDesc: "Custom LLM agents, local dataset training, and high-accuracy vision pipelines.",
    description:
      "AI shouldn't just be a buzzword for your business; it needs to deliver real value. I specialize in integrating practical AI solutions tailored specifically to your needs. I handle custom model training using your own datasets, develop conversational chatbots, and build sophisticated LLM agents and intelligent assistants. Instead of generic wrappers, you get purpose-built AI tools that streamline your workflows and actively assist your customers.",
    tech: ["Model Training / Datasets", "Chatbots & LLM Agents", "RAG Pipelines", "Gemini / Groq APIs"],
    color: "#110d22",
    proof: {
      description:
        "Custom-trained vision models, conversational AI assistants, and agent pipelines I've built and deployed.",
      image: "/images/ai_integration/ai1.webp",
      alt: "AI candling analysis interface preview",
      gallery: [
        { src: "/images/ai_integration/ai1.webp", alt: "AI candling analysis dashboard overview" },
        { src: "/images/ai_integration/ai2.jpg", alt: "AI-powered egg viability detection interface" },
        { src: "/images/ai_integration/ai3.jpeg", alt: "Duckling detection model output view" },
        { src: "/images/vitae-dashboard.png", alt: "Vitae AI dashboard" },
        { src: "/images/onyx-right-dekstop-preveiw.png", alt: "Onyx desktop preview" },
        { src: "/images/onyx-preview.png", alt: "Onyx AI design system interface" },
      ],
    },
  },
  {
    title: "IoT & Embedded Hardware",
    subtitle: "Electronics",
    shortDesc: "Microcontroller architecture, PID feedback loops, and live hardware telemetry.",
    description:
      "If you need to bridge the gap between the physical world and digital software, I can build it. I engineer custom IoT systems and embedded hardware solutions that do exactly what you need. From programming microcontrollers and wiring up complex circuits to building the web dashboards that monitor them, I create end-to-end setups. Whether it's live sensor tracking or automated physical controls, I make sure your hardware talks seamlessly to your software.",
    tech: ["ESP32 / Arduino", "C++ / MicroPython", "PID Control Loops", "Sensor Calibration"],
    color: "#161616",
    proof: {
      description:
        "Hands-on builds — ESP32-powered control systems, sensor rigs, and robots I've wired, coded, and tested.",
      image: "/images/embedded_systems/emb6.jpg",
      alt: "Embedded systems robotic platform preview",
      gallery: [
        { src: "/images/embedded_systems/emb6.jpg", alt: "Embedded systems robotic platform overview" },
        { src: "/images/embedded_systems/emb2.jpg", alt: "Embedded systems robot side profile" },
        { src: "/images/embedded_systems/emb1.jpg", alt: "Embedded systems electronics and chassis detail" },
        { src: "/images/embedded_systems/emb4.jpg", alt: "Embedded systems control interface in low light" },
        { src: "/images/embedded_systems/emb5.jpg", alt: "Embedded systems runtime display and controls" },
        { src: "/images/embedded_systems/emb3.jpg", alt: "Embedded systems battery and platform detail" },
      ],
    },
  },
  {
    title: "Automation & Data Analysis",
    subtitle: "Data-Driven Automation",
    shortDesc: "Automated data extractors, ETL pipelines, and executive reporting consoles.",
    description:
      "Stop wasting hours on manual tasks that a script could do in seconds. I help businesses save time and money by building custom automations that handle the heavy lifting. I write scripts to extract data, clean up messy databases, and automate your reporting workflows. More importantly, I turn raw numbers into clear, actionable dashboards so you always know exactly what's driving your business. Less manual entry, more intelligent decisions.",
    tech: ["Python / Pandas", "Data Cleaning / ETL", "Dashboards / Reporting", "Workflow Automation"],
    color: "#0e191b",
    proof: {
      description:
        "Email tools, lead scrapers, and reporting dashboards I've built to cut hours of manual work down to one click.",
      image: "/images/automation_data_analysis/automation3.png",
      alt: "Automation campaign console preview",
      gallery: [
        { src: "/images/automation_data_analysis/automation3.png", alt: "Campaign console for directory unification and email filtering" },
        { src: "/images/automation_data_analysis/data_analysis2.png", alt: "Jupyter notebook chart showing yearly strike data analysis" },
        { src: "/images/automation_data_analysis/data_analysis1.png", alt: "Jupyter notebook data preparation and readable-number transformation" },
        { src: "/images/automation_data_analysis/automation4.png", alt: "Filtered lead management dashboard with tagging and campaign controls" },
        { src: "/images/automation_data_analysis/automation1.png", alt: "Email automation tool with template and recipient management" },
        { src: "/images/automation_data_analysis/automation2.png", alt: "Laptop view of email automation dashboard in use" },
      ],
    },
  },
];

const stackedGalleryPositions = [
  { x: -92, y: 18, rotate: -14, zIndex: 10 },
  { x: 0, y: -14, rotate: -3, zIndex: 20 },
  { x: 94, y: 10, rotate: 12, zIndex: 30 },
];

export default function Services() {
  const lenis = useLenis();

  const [modal, setModal] = useState({ active: false, index: 0 });
  const [activeServiceIndex, setActiveServiceIndex] = useState<number | null>(null);
  const [isGalleryExpanded, setIsGalleryExpanded] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const activeService =
    activeServiceIndex !== null ? services[activeServiceIndex] : null;

  const openGallery = useCallback((serviceIndex: number) => {
    setActiveServiceIndex(serviceIndex);
    setIsGalleryExpanded(false);
    setLightboxIndex(null);
  }, []);

  const closeGallery = useCallback(() => {
    setActiveServiceIndex(null);
    setIsGalleryExpanded(false);
    setLightboxIndex(null);
  }, []);

  const goToPreviousService = useCallback(() => {
    setActiveServiceIndex((prev) =>
      prev !== null ? (prev - 1 + services.length) % services.length : 0
    );
    setIsGalleryExpanded(false);
    setLightboxIndex(null);
  }, []);

  const goToNextService = useCallback(() => {
    setActiveServiceIndex((prev) =>
      prev !== null ? (prev + 1) % services.length : 0
    );
    setIsGalleryExpanded(false);
    setLightboxIndex(null);
  }, []);

  useEffect(() => {
    if (!activeService) return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    lenis?.stop();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (lightboxIndex !== null) {
          setLightboxIndex(null);
        } else if (isGalleryExpanded) {
          setIsGalleryExpanded(false);
        } else {
          closeGallery();
        }
        return;
      }

      if (lightboxIndex !== null && activeService) {
        if (event.key === "ArrowLeft") {
          setLightboxIndex((prev) =>
            prev !== null
              ? (prev - 1 + activeService.proof.gallery.length) %
                activeService.proof.gallery.length
              : null
          );
        } else if (event.key === "ArrowRight") {
          setLightboxIndex((prev) =>
            prev !== null
              ? (prev + 1) % activeService.proof.gallery.length
              : null
          );
        }
      } else if (!isGalleryExpanded && activeServiceIndex !== null) {
        if (event.key === "ArrowLeft") {
          goToPreviousService();
        } else if (event.key === "ArrowRight") {
          goToNextService();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      lenis?.start();
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    activeService,
    closeGallery,
    goToNextService,
    goToPreviousService,
    isGalleryExpanded,
    lenis,
    lightboxIndex,
    activeServiceIndex,
  ]);

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
    <>
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
                Services<span className="text-primary">.</span>
              </h2>
            </div>
            <p className="max-w-md text-base sm:text-lg text-muted-foreground font-normal leading-relaxed text-pretty">
              Modern digital solutions tailored to complex business challenges, delivering high-speed execution, rock-solid stability, and architectural precision.
            </p>
          </div>

          {/* Interactive Dennis Snellenberg-inspired Services List */}
          <div
            role="list"
            className="flex w-full flex-col border-t border-border/80"
          >
            {services.map((service, index) => {
              const formattedIndex = String(index + 1).padStart(2, "0");

              return (
                <button
                  key={service.title}
                  type="button"
                  role="listitem"
                  onClick={(e) => {
                    e.currentTarget.blur();
                    openGallery(index);
                  }}
                  onMouseEnter={() => setModal({ active: true, index })}
                  onMouseLeave={() => setModal({ active: false, index })}
                  className={cn(
                    "group relative flex w-full flex-col md:flex-row items-start md:items-center justify-between",
                    "py-8 sm:py-10 lg:py-12 px-4 sm:px-6 md:px-8 border-b border-border/70 text-left cursor-pointer",
                    "hover:border-transparent active:border-transparent focus:border-transparent",
                    "rounded-2xl md:rounded-3xl overflow-hidden select-none",
                    "outline-none focus:outline-none focus:ring-0 active:outline-none",
                    "focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                  )}
                  aria-label={`Open ${service.title} gallery and case details`}
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
                    <span className="font-mono text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-muted-foreground/60 tabular-nums shrink-0 select-none transition-colors duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:text-white dark:group-hover:text-zinc-950">
                      {formattedIndex}
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
                </button>
              );
            })}
          </div>
        </div>

        {/* Floating Cursor-Following Modal (Dennis Snellenberg Style) */}
        <ServiceHoverModal modal={modal} items={hoverModalItems} />
      </section>

      {/* Still-View Gallery Modal with Stacked Layout & Full Grid */}
      {/* Still-View Gallery Modal with Minimalist Two-Column Layout, Service Switcher & Lightbox */}
      <AnimatePresence>
        {activeService && activeServiceIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[1000] overflow-hidden overscroll-contain bg-black/65 dark:bg-black/80 p-3 sm:p-6 lg:p-8 backdrop-blur-md flex items-center justify-center"
            onClick={closeGallery}
          >
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
              className={cn(
                "mx-auto flex w-full max-w-5xl flex-col rounded-2xl sm:rounded-3xl border border-border/70 dark:border-white/10",
                "bg-background dark:bg-[#0a0a0c] shadow-2xl backdrop-blur-2xl text-foreground overflow-hidden",
                isGalleryExpanded ? "h-[88vh]" : "max-h-[90vh]"
              )}
            >
              {/* Header Bar */}
              <div className="flex items-center justify-between gap-4 px-5 py-3.5 sm:px-8 sm:py-4 border-b border-border/50 select-none">
                <div className="flex items-center gap-3 min-h-9">
                  <AnimatePresence mode="wait">
                    {isGalleryExpanded ? (
                      <motion.button
                        key="back-button"
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -6 }}
                        type="button"
                        onClick={() => setIsGalleryExpanded(false)}
                        className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-muted/20 px-3.5 py-1.5 text-xs sm:text-sm font-medium text-foreground transition-[color,background-color] duration-150 hover:bg-muted/50 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none cursor-pointer"
                      >
                        <ArrowLeft className="size-3.5" />
                        <span>Back to overview</span>
                      </motion.button>
                    ) : (
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground/70">
                          <span>{String(activeServiceIndex + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}</span>
                          <span className="text-border">•</span>
                          <span>{activeService.subtitle}</span>
                        </div>
                        <h3 className="text-base sm:text-lg font-semibold tracking-tight text-foreground">
                          {activeService.title}
                        </h3>
                      </div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="flex items-center gap-1 sm:gap-1.5">
                  {!isGalleryExpanded && (
                    <>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={goToPreviousService}
                          className="flex size-8 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-[color,background-color] duration-150 hover:bg-muted/40 hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none cursor-pointer"
                          aria-label="Previous service"
                          title="Previous service (←)"
                        >
                          <ChevronLeft className="size-4" />
                        </button>
                        <button
                          type="button"
                          onClick={goToNextService}
                          className="flex size-8 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-[color,background-color] duration-150 hover:bg-muted/40 hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none cursor-pointer"
                          aria-label="Next service"
                          title="Next service (→)"
                        >
                          <ChevronRight className="size-4" />
                        </button>
                      </div>
                      <div className="h-4 w-px bg-border/60 mx-1" />
                    </>
                  )}

                  <button
                    type="button"
                    onClick={closeGallery}
                    className="flex size-8 sm:size-9 items-center justify-center rounded-full border border-border/60 bg-muted/20 text-muted-foreground transition-[color,background-color,transform] duration-150 hover:bg-muted hover:text-foreground active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none cursor-pointer"
                    aria-label="Close modal"
                    title="Close (Esc)"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              </div>

              {/* Scrollbar-Free Gallery Content Area */}
              <div
                data-lenis-prevent
                className="flex-1 overflow-y-auto overscroll-contain px-5 py-6 sm:px-8 sm:py-8 hide-scrollbar no-scrollbar"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                <AnimatePresence mode="wait">
                  {!isGalleryExpanded ? (
                    <motion.div
                      key={`gallery-overview-${activeServiceIndex}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center min-h-full"
                    >
                      {/* Left Narrative Column */}
                      <div className="lg:col-span-7 flex flex-col justify-center text-left">
                        <p className="text-base sm:text-lg font-medium text-foreground/90 leading-snug tracking-tight mb-3 text-pretty">
                          {activeService.shortDesc}
                        </p>
                        
                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6 text-pretty">
                          {activeService.description}
                        </p>

                        {/* Capabilities / Tech Stack Tags */}
                        <div className="mb-6">
                          <span className="block font-mono text-[10px] uppercase tracking-wider text-muted-foreground/60 mb-2">
                            Core Stack & Capabilities
                          </span>
                          <div className="flex flex-wrap gap-1.5 sm:gap-2">
                            {activeService.tech.map((item) => (
                              <span
                                key={item}
                                className="inline-flex items-center px-3 py-1 rounded-full border border-border/70 bg-muted/20 dark:bg-white/5 text-[11px] font-mono text-muted-foreground font-medium"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap items-center gap-3 pt-1">
                          <button
                            type="button"
                            onClick={() => setIsGalleryExpanded(true)}
                            className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-2.5 text-xs sm:text-sm font-medium shadow-sm transition-[opacity,transform] duration-200 hover:opacity-90 active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none cursor-pointer"
                          >
                            <span>Explore all {activeService.proof.gallery.length} case images</span>
                            <ArrowUpRight className="size-3.5 sm:size-4" />
                          </button>
                        </div>
                      </div>

                      {/* Right Visual Column: Interactive Deck */}
                      <div className="lg:col-span-5 flex flex-col items-center justify-center pt-2 lg:pt-0">
                        <button
                          type="button"
                          onClick={() => setIsGalleryExpanded(true)}
                          className="group relative flex h-[210px] sm:h-[250px] w-full items-center justify-center cursor-pointer select-none rounded-2xl focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                          aria-label={`View ${activeService.proof.gallery.length} case images for ${activeService.title}`}
                        >
                          {activeService.proof.gallery.slice(0, 3).map((photo, photoIndex) => {
                            const basePos = [
                              { x: -62, y: 12, rotate: -9, zIndex: 10 },
                              { x: 0, y: -10, rotate: -1, zIndex: 20 },
                              { x: 62, y: 8, rotate: 7, zIndex: 30 },
                            ][photoIndex];

                            return (
                              <div
                                key={photo.src}
                                className="absolute h-[155px] w-[125px] sm:h-[200px] sm:w-[160px] overflow-hidden rounded-xl sm:rounded-2xl border border-border/60 dark:border-white/10 bg-muted shadow-xl transition-[transform,box-shadow] duration-300 ease-out group-hover:scale-105 group-hover:shadow-2xl"
                                style={{
                                  zIndex: basePos.zIndex,
                                  transform: `translateX(${basePos.x}px) translateY(${basePos.y}px) rotate(${basePos.rotate}deg)`,
                                }}
                              >
                                <Image
                                  src={photo.src}
                                  alt={photo.alt}
                                  fill
                                  sizes="(min-width: 640px) 160px, 125px"
                                  className="object-cover"
                                />
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-200" />
                              </div>
                            );
                          })}
                        </button>

                        <p className="text-[11px] font-mono text-muted-foreground/70 mt-3 flex items-center gap-1.5 select-none">
                          <span>Click preview to expand gallery</span>
                          <span className="text-border">•</span>
                          <span>{activeService.proof.gallery.length} artifacts</span>
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={`gallery-expanded-${activeServiceIndex}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-6"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/40 pb-4">
                        <p className="text-xs sm:text-sm font-medium text-muted-foreground">
                          {activeService.proof.description}
                        </p>
                        <span className="text-[11px] font-mono text-muted-foreground/70 shrink-0">
                          {activeService.proof.gallery.length} screenshots • Click to inspect full-size
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                        {activeService.proof.gallery.map((photo, i) => (
                          <button
                            key={photo.src}
                            type="button"
                            onClick={() => setLightboxIndex(i)}
                            className="group relative aspect-[16/10] w-full overflow-hidden rounded-xl sm:rounded-2xl border border-border/60 dark:border-white/10 bg-muted text-left transition-[border-color,transform] duration-200 hover:border-foreground/40 hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none cursor-pointer"
                            aria-label={`Inspect screenshot: ${photo.alt}`}
                          >
                            <Image
                              src={photo.src}
                              alt={photo.alt}
                              fill
                              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                              className="object-cover transition-[transform] duration-500 ease-out group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end p-3.5">
                              <p className="text-xs font-medium text-white line-clamp-2">
                                {photo.alt}
                              </p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox for Full-Size Screenshot Inspection */}
      <AnimatePresence>
        {lightboxIndex !== null && activeService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-[1100] bg-black/92 backdrop-blur-md flex flex-col items-center justify-between p-4 sm:p-6"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Top Bar */}
            <div
              className="w-full max-w-5xl flex items-center justify-between text-white/80 py-2 select-none"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="font-mono text-xs text-white/70">
                {lightboxIndex + 1} / {activeService.proof.gallery.length}
              </span>
              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                className="flex size-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20 transition-colors focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none cursor-pointer"
                aria-label="Close image inspection (Esc)"
                title="Close (Esc)"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Center Image */}
            <div
              className="relative flex-1 w-full max-w-5xl flex items-center justify-center py-2"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full max-h-[75vh] flex items-center justify-center">
                <Image
                  src={activeService.proof.gallery[lightboxIndex].src}
                  alt={activeService.proof.gallery[lightboxIndex].alt}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>

              {/* Prev / Next controls */}
              {activeService.proof.gallery.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setLightboxIndex(
                        (lightboxIndex - 1 + activeService.proof.gallery.length) %
                          activeService.proof.gallery.length
                      )
                    }
                    className="absolute left-2 sm:left-4 flex size-10 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-sm hover:bg-black/80 transition-colors focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none cursor-pointer"
                    aria-label="Previous image"
                    title="Previous (←)"
                  >
                    <ChevronLeft className="size-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setLightboxIndex(
                        (lightboxIndex + 1) % activeService.proof.gallery.length
                      )
                    }
                    className="absolute right-2 sm:right-4 flex size-10 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-sm hover:bg-black/80 transition-colors focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none cursor-pointer"
                    aria-label="Next image"
                    title="Next (→)"
                  >
                    <ChevronRight className="size-5" />
                  </button>
                </>
              )}
            </div>

            {/* Bottom Caption */}
            <div
              className="w-full max-w-2xl text-center py-2 text-white/90 text-xs sm:text-sm font-medium"
              onClick={(e) => e.stopPropagation()}
            >
              {activeService.proof.gallery[lightboxIndex].alt}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
