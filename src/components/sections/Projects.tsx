"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { projects } from "@/lib/site-data";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [selectedViewType, setSelectedViewType] = useState<"mobile" | "desktop">("desktop");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const getProjectViews = (project: typeof projects[0]) => {
    const views = [
      {
        id: "desktop-left",
        label: "Desktop Preview",
        type: "desktop" as const,
        image: project.desktopLeftImage || project.imageUrl,
      },
      {
        id: "mobile",
        label: "Mobile Preview",
        type: "mobile" as const,
        image: project.previewImage || project.imageUrl,
      },
      {
        id: "desktop-right",
        label: "Desktop Alt Preview",
        type: "desktop" as const,
        image: project.desktopRightImage || project.imageUrl,
      },
    ];

    return views.filter((view, index, array) => {
      return array.findIndex((candidate) => candidate.image === view.image && candidate.type === view.type) === index;
    });
  };

  const selectedViews = useMemo(
    () => (selectedProject ? getProjectViews(selectedProject) : []),
    [selectedProject]
  );
  const currentViewIndex = selectedViews.findIndex(
    (view) => view.image === selectedImage && view.type === selectedViewType
  );
  const activeView = currentViewIndex >= 0 ? selectedViews[currentViewIndex] : selectedViews[0];

  const openProjectView = useCallback((
    project: typeof projects[0],
    viewType: "mobile" | "desktop",
    image: string
  ) => {
    setSelectedProject(project);
    setSelectedViewType(viewType);
    setSelectedImage(image);
  }, []);

  const closeProjectView = useCallback(() => {
    setSelectedProject(null);
    setSelectedImage(null);
  }, []);

  const navigatePreview = useCallback((direction: "previous" | "next") => {
    if (!selectedProject || selectedViews.length <= 1) return;

    const safeIndex = currentViewIndex >= 0 ? currentViewIndex : 0;
    const nextIndex =
      direction === "next"
        ? (safeIndex + 1) % selectedViews.length
        : (safeIndex - 1 + selectedViews.length) % selectedViews.length;
    const nextView = selectedViews[nextIndex];

    setSelectedViewType(nextView.type);
    setSelectedImage(nextView.image);
  }, [currentViewIndex, selectedProject, selectedViews]);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedProject]);

  useEffect(() => {
    if (!selectedProject) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeProjectView();
        return;
      }

      if (event.key === "ArrowLeft") {
        navigatePreview("previous");
      }

      if (event.key === "ArrowRight") {
        navigatePreview("next");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeProjectView, navigatePreview, selectedProject]);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray<HTMLElement>(".project-card-mobile").forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 36, opacity: 0, scale: 0.97 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              end: "top 58%",
              scrub: 0.6,
            },
            delay: index * 0.04,
          }
        );

        const visual = card.querySelector(".project-card-visual");
        if (visual) {
          gsap.fromTo(
            visual,
            { y: 18, scale: 1.04 },
            {
              y: -10,
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.1,
              },
            }
          );
        }
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="projects" className="pt-16 pb-32 bg-background relative overflow-hidden scroll-mt-24">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight"
          >
            Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-foreground/50 text-base sm:text-lg max-w-2xl mx-auto"
          >
            Here are some of my recent projects that showcase my skills and expertise.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 md:gap-y-24">
          {projects.map((project, index) => (
            <div key={index} className="relative h-full">
              <motion.div
                onHoverStart={() => setHoveredProject(index)}
                onHoverEnd={() => setHoveredProject(null)}
                className="project-card-mobile group relative h-full bg-card dark:bg-[#0a0a0a] border border-border dark:border-white/5 rounded-[2rem] transition-all duration-500 hover:border-black/20 dark:hover:border-white/20 flex flex-col hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              >
                <div className="relative p-6 sm:p-8 grow flex flex-col">
                  <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-start mb-6">
                    <div className="flex-1 sm:mr-4">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground block mb-2">
                        {project.category}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold text-foreground transition-colors group-hover:text-foreground/80">
                        {project.title}
                      </h3>
                    </div>
                    <div className="shrink-0 w-fit px-4 py-1.5 rounded-full border border-border bg-muted/50 text-[10px] font-bold text-muted-foreground uppercase tracking-wider backdrop-blur-sm group-hover:bg-foreground group-hover:text-background transition-all">
                      <span className="hidden md:inline">Hover to preview</span>
                      <span className="md:hidden">Tap to preview</span>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm leading-relaxed mb-8 line-clamp-3">
                    {project.description}
                  </p>

                  <button
                    type="button"
                    onClick={() => openProjectView(project, "mobile", project.previewImage || project.imageUrl)}
                    className="relative aspect-video w-full rounded-2xl bg-muted dark:bg-white/5 border border-border dark:border-white/5 overflow-hidden mb-4 flex items-center justify-center group-hover:bg-muted/20 transition-all duration-500 text-left"
                  >
                    <div className="project-card-visual relative w-full h-full transition-all duration-500 group-hover:scale-105">
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        className="object-cover opacity-80 group-hover:opacity-100 transition-all duration-500"
                      />
                    </div>
                  </button>

                  <div className="md:hidden mt-auto">
                    <button
                      type="button"
                      onClick={() => openProjectView(project, "mobile", project.previewImage || project.imageUrl)}
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-foreground/80 transition-colors hover:bg-foreground hover:text-background"
                    >
                      Open Preview
                      <ExternalLink className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <AnimatePresence>
                    {hoveredProject === index && (
                      <div className="absolute inset-0 z-100 hidden md:flex items-center justify-center pointer-events-none">
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 rounded-[2rem] z-50 bg-linear-to-b from-background/5 via-transparent to-background/10 dark:from-white/3 dark:via-transparent dark:to-black/20 border border-black/5 dark:border-white/8 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
                        />

                        <div className="relative w-full h-full flex items-center justify-center pointer-events-auto">
                          <motion.div
                            initial={{ x: -80, y: 0, opacity: 0, rotate: -20, scale: 0.7 }}
                            animate={{ x: -140, y: -5, opacity: 1, rotate: -12, scale: 0.98 }}
                            whileHover={{ scale: 1.06, rotate: -6, y: -24, opacity: 1, zIndex: 120 }}
                            transition={{ type: "spring", stiffness: 200, damping: 15 }}
                            onClick={() => openProjectView(project, "desktop", project.desktopLeftImage || project.imageUrl)}
                            className="absolute w-[280px] h-[180px] bg-card border-4 border-black/5 dark:border-white/10 rounded-xl overflow-hidden shadow-2xl z-60 cursor-pointer will-change-transform"
                          >
                            <Image
                              src={project.desktopLeftImage || project.imageUrl}
                              alt="Desktop Preview Left"
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-white/10 dark:bg-black/20 opacity-0 hover:opacity-100 transition-opacity" />
                          </motion.div>

                          <motion.div
                            initial={{ x: 80, y: 0, opacity: 0, rotate: 20, scale: 0.7 }}
                            animate={{ x: 155, y: -5, opacity: 1, rotate: 12, scale: 0.98 }}
                            whileHover={{ scale: 1.06, rotate: 6, y: -24, opacity: 1, zIndex: 120 }}
                            transition={{ type: "spring", stiffness: 200, damping: 15 }}
                            onClick={() => openProjectView(project, "desktop", project.desktopRightImage || project.imageUrl)}
                            className="absolute w-[280px] h-[180px] bg-card border-4 border-black/5 dark:border-white/10 rounded-xl overflow-hidden shadow-2xl z-60 cursor-pointer will-change-transform"
                          >
                            <Image
                              src={project.desktopRightImage || project.imageUrl}
                              alt="Desktop Preview Right"
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-white/10 dark:bg-black/20 opacity-0 hover:opacity-100 transition-opacity" />
                          </motion.div>

                          <motion.div
                            initial={{ y: 150, opacity: 0, scale: 0.6 }}
                            animate={{ y: -60, opacity: 1, scale: 1.31 }}
                            whileHover={{ scale: 1.32, y: -80, zIndex: 130 }}
                            whileTap={{ scale: 1.35 }}
                            transition={{
                              type: "spring",
                              stiffness: 180,
                              damping: 22,
                              mass: 1,
                            }}
                            onClick={() => openProjectView(project, "mobile", project.previewImage || project.imageUrl)}
                            className="relative w-[200px] h-[400px] bg-black border-8 border-[#111] rounded-[3rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.8)] z-110 ring-1 ring-white/10 cursor-pointer active:cursor-grabbing will-change-transform"
                          >
                            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-16 h-5 bg-[#111] rounded-full z-10 border border-white/5" />
                            <div className="relative w-full h-full bg-[#0a0a0a]">
                              <Image
                                src={project.previewImage || project.imageUrl}
                                alt={`${project.title} Mobile`}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                              <div className="bg-white/16 backdrop-blur-md p-2.5 rounded-full border border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.22)]">
                                <ExternalLink className="w-5 h-5 text-white/90" />
                              </div>
                            </div>
                          </motion.div>
                        </div>
                      </div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="p-6 sm:p-8 pt-4 border-t border-border/50 bg-muted/20 dark:bg-black/40 z-120 rounded-b-[2rem]">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60 block mb-4">
                    Tech Stack
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-4 py-1.5 rounded-full bg-slate-200 dark:bg-white/5 border border-black/5 dark:border-white/5 text-[11px] font-semibold text-foreground/60 transition-all hover:bg-primary/10 hover:text-primary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-1000 flex items-center justify-center p-4 sm:p-12 bg-black/60 backdrop-blur-xl"
            onClick={closeProjectView}
          >
            <div className="fixed top-0 left-0 right-0 p-4 sm:p-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between z-1100 pointer-events-none">
              <div className="pointer-events-auto max-w-[min(100%,32rem)]">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground block mb-2 drop-shadow-sm">
                  {selectedProject.category} • {activeView?.label || "Preview"}
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight drop-shadow-sm">
                  {selectedProject.title}
                </h2>
                <p className="mt-3 text-sm text-white/70">
                  {Math.max(currentViewIndex, 0) + 1} / {selectedViews.length}
                </p>
              </div>

              <div className="flex items-center gap-3 sm:gap-6 pointer-events-auto self-end sm:self-auto">
                <a
                  href={selectedProject.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 sm:gap-3 px-4 sm:px-8 py-3 sm:py-4 rounded-full bg-foreground text-background font-bold text-sm sm:text-lg hover:scale-105 active:scale-95 transition-all shadow-[0_20px_40px_rgba(0,0,0,0.3)] group"
                >
                  <span>{selectedProject.ctaLabel}</span>
                  <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>

                <button
                  onClick={closeProjectView}
                  className="w-11 h-11 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/40 border border-white/10 text-white backdrop-blur-xl transition-all group"
                >
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 transition-transform group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <motion.div
              initial={{ scale: 0.9, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 40, opacity: 0 }}
              className="relative w-full h-full flex items-center justify-center pointer-events-none"
              onClick={(e) => e.stopPropagation()}
            >
              {selectedViews.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => navigatePreview("previous")}
                    className="pointer-events-auto absolute left-2 sm:left-8 lg:left-12 top-1/2 z-20 flex h-10 w-10 sm:h-12 sm:w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/30 text-white backdrop-blur-xl transition-all hover:scale-105 hover:bg-black/45"
                    aria-label="Show previous preview"
                  >
                    <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                  </button>
                  <button
                    type="button"
                    onClick={() => navigatePreview("next")}
                    className="pointer-events-auto absolute right-2 sm:right-8 lg:right-12 top-1/2 z-20 flex h-10 w-10 sm:h-12 sm:w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/30 text-white backdrop-blur-xl transition-all hover:scale-105 hover:bg-black/45"
                    aria-label="Show next preview"
                  >
                    <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
                  </button>
                </>
              )}

              <div className="relative pointer-events-auto max-w-full max-h-full flex items-center justify-center">
                {selectedViewType === "mobile" ? (
                  <div className="relative w-[72vw] max-w-[320px] sm:w-[420px] aspect-9/19 bg-black border-10 sm:border-12 border-[#111] rounded-[2.75rem] sm:rounded-[4rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.5)] ring-4 ring-white/5">
                    <div className="absolute top-3 sm:top-4 left-1/2 -translate-x-1/2 w-20 sm:w-24 h-6 sm:h-7 bg-[#111] rounded-full z-10 border border-white/5" />
                    <Image
                      src={selectedImage || selectedProject.imageUrl}
                      alt={selectedProject.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                ) : (
                  <div className="relative w-[90vw] sm:w-[85vw] max-w-[1200px] aspect-video bg-card border-4 border-black/5 dark:border-white/10 rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.5)]">
                    <Image
                      src={selectedImage || selectedProject.imageUrl}
                      alt={selectedProject.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
