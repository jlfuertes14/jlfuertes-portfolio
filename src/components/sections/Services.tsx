"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Layers,
  Sparkles,
  Cpu,
  BarChart3,
  CheckCircle,
  ArrowUpRight,
  ArrowLeft,
  X,
  type LucideIcon,
} from "lucide-react";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useLenis } from "lenis/react";
import { StickyCard } from "@/components/ui/images-scrolling-animation";

interface GalleryImage {
  src: string;
  alt: string;
}

interface ServiceItem {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  hoverBorder: string;
  iconColor: string;
  accentSurface: string;
  accentSoft: string;
  proof: {
    description: string;
    image: string;
    alt: string;
    gallery: GalleryImage[];
  };
}

const services: ServiceItem[] = [
  {
    icon: Layers,
    title: "Full-Stack Development",
    subtitle: "Web Applications",
    description:
      "You don't just need a website you need a platform that works flawlessly and scales as you grow. I design and build full-stack web applications from the ground up. Whether it's a sleek customer portal, a data-heavy internal dashboard, or a fast-loading e-commerce site, I handle both the backend logic and the pixel-perfect frontend. The result? A digital product that looks great, runs fast, and drives your business forward.",
    tech: ["React / Next.js", "TypeScript", "FastAPI / Node.js", "MongoDB / SQL"],
    hoverBorder: "hover:border-black/20 dark:hover:border-white/20",
    iconColor: "text-blue-500",
    accentSurface: "bg-blue-500/10 dark:bg-blue-400/10",
    accentSoft: "group-hover:bg-muted/70 dark:group-hover:bg-white/10 group-hover:text-foreground",
    proof: {
      description:
        "Real products I've shipped responsive storefronts, admin dashboards, and API-driven platforms running in production.",
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
    icon: Sparkles,
    title: "AI Integration",
    subtitle: "Intelligent Workflows",
    description:
      "AI shouldn't just be a buzzword for your business; it needs to deliver real value. I specialize in integrating practical AI solutions tailored specifically to your needs. I handle custom model training using your own datasets, develop conversational chatbots, and build sophisticated LLM agents and intelligent assistants. Instead of generic wrappers, you get purpose-built AI tools that streamline your workflows and actively assist your customers.",
    tech: ["Model Training / Datasets", "Chatbots & LLM Agents", "RAG Pipelines", "Gemini / Groq APIs"],
    hoverBorder: "hover:border-black/20 dark:hover:border-white/20",
    iconColor: "text-purple-500",
    accentSurface: "bg-purple-500/10 dark:bg-purple-400/10",
    accentSoft: "group-hover:bg-muted/70 dark:group-hover:bg-white/10 group-hover:text-foreground",
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
    icon: Cpu,
    title: "IoT & Embedded Hardware",
    subtitle: "Physical Electronics",
    description:
      "If you need to bridge the gap between the physical world and digital software, I can build it. I engineer custom IoT systems and embedded hardware solutions that do exactly what you need. From programming microcontrollers and wiring up complex circuits to building the web dashboards that monitor them, I create end-to-end setups. Whether it's live sensor tracking or automated physical controls, I make sure your hardware talks seamlessly to your software.",
    tech: ["ESP32 / Arduino", "C++ / MicroPython", "PID Control Loops", "Sensor Calibration"],
    hoverBorder: "hover:border-black/20 dark:hover:border-white/20",
    iconColor: "text-emerald-500",
    accentSurface: "bg-emerald-500/10 dark:bg-emerald-400/10",
    accentSoft: "group-hover:bg-muted/70 dark:group-hover:bg-white/10 group-hover:text-foreground",
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
    icon: BarChart3,
    title: "Automation & Data Analysis",
    subtitle: "Process Intelligence",
    description:
      "Stop wasting hours on manual tasks that a script could do in seconds. I help businesses save time and money by building custom automations that handle the heavy lifting. I write scripts to extract data, clean up messy databases, and automate your reporting workflows. More importantly, I turn raw numbers into clear, actionable dashboards so you always know exactly what's driving your business. Less manual entry, more intelligent decisions.",
    tech: ["Python / Pandas", "Data Cleaning / ETL", "Dashboards / Reporting", "Workflow Automation"],
    hoverBorder: "hover:border-black/20 dark:hover:border-white/20",
    iconColor: "text-amber-500",
    accentSurface: "bg-amber-500/10 dark:bg-amber-400/10",
    accentSoft: "group-hover:bg-muted/70 dark:group-hover:bg-white/10 group-hover:text-foreground",
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
  const containerRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [activeServiceIndex, setActiveServiceIndex] = useState<number | null>(null);
  const [isGalleryExpanded, setIsGalleryExpanded] = useState(false);

  const activeService =
    activeServiceIndex !== null ? services[activeServiceIndex] : null;

  const openGallery = useCallback((serviceIndex: number) => {
    setActiveServiceIndex(serviceIndex);
    setIsGalleryExpanded(false);
  }, []);

  const closeGallery = useCallback(() => {
    setActiveServiceIndex(null);
    setIsGalleryExpanded(false);
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
        closeGallery();
        return;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      lenis?.start();
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeService, closeGallery, lenis]);

  return (
    <>
      <section
        id="services"
        className="pt-24 bg-background relative scroll-mt-24"
      >
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10 mb-4 sm:mb-10">
          <div className="text-center mb-4 sm:mb-16 md:mb-24">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 tracking-tight"
            >
              My Services
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-foreground/50 text-base sm:text-lg max-w-2xl mx-auto"
            >
              Core focus areas and specialized capabilities I offer to help bring your ideas to life.
            </motion.p>
          </div>
        </div>

        <div
          ref={containerRef}
          className="relative flex w-full flex-col items-center justify-start pb-[25vh] sm:pb-[40vh]"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            const targetScale = Math.max(
              0.85,
              1 - (services.length - index - 1) * 0.05
            );

            return (
              <StickyCard
                key={service.title}
                i={index}
                progress={scrollYProgress}
                range={[index * 0.3, 1]}
                targetScale={targetScale}
                className={`group p-4 sm:p-8 md:p-16 bg-card dark:bg-[#0a0a0a] border border-border dark:border-white/5 transition-all duration-300 ease-out ${service.hoverBorder} hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]`}
              >
                <div className="grid gap-4 sm:gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:gap-10">
                  <div className="flex h-full flex-col justify-between gap-4 sm:gap-10">
                    <div className="space-y-3 sm:space-y-8 max-w-3xl">
                      <div className="flex items-center gap-3 sm:gap-6">
                        <div
                          className={`p-3 sm:p-5 rounded-2xl sm:rounded-3xl border border-border dark:border-white/10 transition-transform duration-300 ease-out group-hover:scale-[1.02] shadow-xl ${service.iconColor} ${service.accentSurface}`}
                        >
                          <Icon className="w-5 h-5 sm:w-8 sm:h-8" />
                        </div>
                        <div>
                          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/80 block mb-1">
                            {service.subtitle}
                          </span>
                          <h3 className="text-xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground transition-colors group-hover:text-foreground/90">
                            {service.title}
                          </h3>
                        </div>
                      </div>

                      <div className="space-y-2 sm:space-y-4">
                        <p className="text-xs sm:text-lg md:text-xl leading-snug sm:leading-relaxed text-muted-foreground">
                          {service.description}
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 sm:pt-8 border-t border-border/30 dark:border-white/10 space-y-2 sm:space-y-4">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 block">
                        Core Technologies
                      </span>
                      <div className="flex flex-wrap gap-1.5 sm:gap-3">
                        {service.tech.map((tech) => (
                          <span
                            key={tech}
                            className={`inline-flex items-center gap-1 sm:gap-2 px-2 py-0.5 sm:px-4 sm:py-2 rounded-full bg-muted/40 dark:bg-white/5 border border-border dark:border-white/10 text-[11px] sm:text-sm font-bold text-foreground/80 tracking-tight transition-all duration-200 ease-out ${service.accentSoft}`}
                          >
                            <CheckCircle
                              className={`w-2.5 h-2.5 sm:w-4 sm:h-4 opacity-80 ${service.iconColor}`}
                            />
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="relative h-full min-h-[140px] sm:min-h-[320px] lg:min-h-[420px]">
                    <div className="flex h-full flex-col rounded-[1.25rem] sm:rounded-[2rem] border border-border dark:border-white/5 bg-muted/35 dark:bg-white/[0.03] p-0 sm:p-5 shadow-[0_20px_60px_rgba(15,23,42,0.12)] transition-colors duration-300 ease-out overflow-hidden relative">
                      {/* Desktop Header */}
                      <div className="hidden sm:flex mb-4 items-start justify-between gap-4">
                        <div>
                          <p className="text-xl font-semibold tracking-tight text-foreground">
                            Gallery
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => openGallery(index)}
                          className={`flex size-11 shrink-0 items-center justify-center rounded-full border border-border dark:border-white/10 bg-background dark:bg-black/30 text-foreground/70 transition-all duration-300 ease-out hover:-translate-y-1 hover:translate-x-1 active:scale-[0.97] ${service.accentSoft}`}
                          aria-label={`Open ${service.title} gallery`}
                        >
                          <ArrowUpRight className="w-4 h-4" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => openGallery(index)}
                        className="relative min-h-[140px] sm:min-h-[260px] flex-1 overflow-hidden sm:rounded-[1.5rem] border-0 sm:border border-border bg-muted text-left dark:border-white/5 dark:bg-white/[0.03] w-full group active:scale-[0.98] transition-transform duration-300 ease-out"
                        aria-label={`Open ${service.title} gallery from preview image`}
                      >
                        <Image
                          src={service.proof.image}
                          alt={service.proof.alt}
                          fill
                          sizes="(min-width: 1024px) 34vw, (min-width: 640px) 70vw, 92vw"
                          className="object-cover object-center transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent dark:from-black/90 dark:via-black/20" />

                        {/* Mobile Overlay Header */}
                        <div className="absolute inset-x-0 bottom-0 p-3 flex sm:hidden items-center justify-between z-10">
                          <p className="text-xs font-bold tracking-tight text-foreground drop-shadow-lg">
                            View Gallery
                          </p>
                          <div className={`flex size-11 shrink-0 items-center justify-center rounded-full bg-background/50 border border-border/50 backdrop-blur-md text-foreground transition-all duration-300 ease-out group-active:scale-[0.97]`}>
                            <ArrowUpRight className="w-4 h-4" />
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </StickyCard>
            );
          })}
        </div>
      </section>

      <AnimatePresence>
        {activeService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] overflow-hidden overscroll-none bg-black/50 p-4 backdrop-blur-sm sm:p-6 lg:p-10"
            onClick={closeGallery}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
              className="mx-auto flex h-full w-full max-w-6xl flex-col"
            >
              <div className="flex items-center justify-between gap-4 px-2 py-2 sm:px-3 sm:py-3">
                <div className="flex min-h-10 items-center">
                  <AnimatePresence>
                    {isGalleryExpanded && (
                      <motion.button
                        key="back-button"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        type="button"
                        onClick={() => setIsGalleryExpanded(false)}
                        className="flex items-center gap-2 text-sm font-medium text-white/70 transition-colors hover:text-white"
                      >
                        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/25 text-white backdrop-blur-md">
                          <ArrowLeft className="h-4 w-4" />
                        </span>
                        Go back
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>

                <button
                  type="button"
                  onClick={closeGallery}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/25 text-white backdrop-blur-md transition-all hover:bg-black/40"
                  aria-label="Close service gallery"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div
                data-lenis-prevent
                className="flex-1 overflow-y-auto overscroll-contain px-2 pb-2 sm:px-3 sm:pb-3"
              >
                <AnimatePresence mode="wait">
                  {!isGalleryExpanded ? (
                    <motion.div
                      key="gallery-stack"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -16 }}
                      transition={{ duration: 0.24 }}
                      className="flex min-h-full flex-col items-center justify-start pt-10 sm:pt-12"
                    >
                      <div className="relative mb-8 flex h-[420px] w-full items-center justify-center">
                        {activeService.proof.gallery.slice(0, 3).map((photo, photoIndex) => {
                          const position = stackedGalleryPositions[photoIndex];

                          return (
                            <motion.button
                              key={photo.src}
                              type="button"
                              initial={{ opacity: 0, scale: 0.92 }}
                              animate={{
                                opacity: 1,
                                scale: 1,
                                x: position.x,
                                y: position.y,
                                rotate: position.rotate,
                              }}
                              whileHover={{
                                scale: 1.04,
                                y: position.y - 16,
                                rotate: position.rotate * 0.75,
                              }}
                              transition={{ type: "spring", stiffness: 220, damping: 22 }}
                              onClick={() => setIsGalleryExpanded(true)}
                              className="absolute h-[220px] w-[168px] overflow-hidden rounded-[2rem] bg-muted shadow-[0_26px_70px_rgba(0,0,0,0.16)] sm:h-[270px] sm:w-[210px] lg:h-[320px] lg:w-[245px]"
                              style={{ zIndex: position.zIndex }}
                            >
                              <Image
                                src={photo.src}
                                alt={photo.alt}
                                fill
                                sizes="(min-width: 1024px) 245px, (min-width: 640px) 210px, 168px"
                                className="object-cover"
                              />
                            </motion.button>
                          );
                        })}
                      </div>

                      <div className="flex justify-center">
                        <button
                          type="button"
                          onClick={() => setIsGalleryExpanded(true)}
                          className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-all hover:scale-[1.02]"
                        >
                          Explore gallery
                          <ArrowUpRight className="h-4 w-4" />
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="gallery-expanded"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -16 }}
                      transition={{ duration: 0.24 }}
                      className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-6"
                    >
                      {activeService.proof.gallery.map((photo) => (
                        <motion.div
                          key={photo.src}
                          layout
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.2 }}
                          className="relative aspect-square overflow-hidden rounded-[1.5rem] bg-muted shadow-lg md:rounded-[2rem]"
                        >
                          <Image
                            src={photo.src}
                            alt={photo.alt}
                            fill
                            sizes="(min-width: 1024px) 33vw, 50vw"
                            className="object-cover"
                          />
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
