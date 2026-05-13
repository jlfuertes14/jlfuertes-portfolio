"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { projects } from "@/lib/site-data";
import { ExternalLink } from "lucide-react";

export default function Projects() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [selectedViewType, setSelectedViewType] = useState<"mobile" | "desktop">("desktop");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Lock scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setSelectedImage(null); // Clear image when closing
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedProject]);

  return (
    <section id="projects" className="pt-16 pb-32 bg-background relative overflow-hidden scroll-mt-24">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-bold mb-6 tracking-tight"
          >
            Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-foreground/50 text-lg max-w-2xl mx-auto"
          >
            Here are some of my recent projects that showcase my skills and expertise.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-24">
          {projects.map((project, index) => (
            <div key={index} className="relative h-full">
              <motion.div
                onHoverStart={() => setHoveredProject(index)}
                onHoverEnd={() => setHoveredProject(null)}
                className="group relative h-full bg-card dark:bg-[#0a0a0a] border border-border dark:border-white/5 rounded-[2rem] transition-all duration-500 hover:border-black/20 dark:hover:border-white/20 flex flex-col hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              >
                {/* Top/Middle Section (Interactive Preview Area) */}
                <div className="relative p-8 grow flex flex-col">
                  {/* Top Info */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex-1 mr-4">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground block mb-2">
                        {project.category}
                      </span>
                      <h3 className="text-2xl font-bold text-foreground transition-colors group-hover:text-foreground/80">
                        {project.title}
                      </h3>
                    </div>
                    <div className="shrink-0 px-4 py-1.5 rounded-full border border-border bg-muted/50 text-[10px] font-bold text-muted-foreground uppercase tracking-wider backdrop-blur-sm group-hover:bg-foreground group-hover:text-background transition-all">
                      Hover to preview
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed mb-8 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Central Visual Placeholder */}
                  <div className="relative aspect-video w-full rounded-2xl bg-muted dark:bg-white/5 border border-border dark:border-white/5 overflow-hidden mb-4 flex items-center justify-center group-hover:bg-muted/20 transition-all duration-500">
                    <div className="relative w-full h-full transition-all duration-500 group-hover:scale-105">
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        className="object-cover opacity-80 group-hover:opacity-100 transition-all duration-500"
                      />
                    </div>
                  </div>

                  {/* Multi-Device Preview Overlay - Interactive Versions */}
                  <AnimatePresence>
                    {hoveredProject === index && (
                      <div className="absolute inset-0 z-100 flex items-center justify-center pointer-events-none">
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 bg-white/90 dark:bg-black/90 backdrop-blur-xl rounded-[2rem] z-50 will-change-[opacity,backdrop-filter]"
                        />
                        
                        <div className="relative w-full h-full flex items-center justify-center pointer-events-auto">
                          {/* Desktop Previews (Side Screens) */}
                          <motion.div 
                            initial={{ x: -80, y: 0, opacity: 0, rotate: -20, scale: 0.7 }}
                            animate={{ x: -130, y: -20, opacity: 0.6, rotate: -10, scale: 1 }}
                            whileHover={{ scale: 1.1, rotate: -5, y: -40, opacity: 1, zIndex: 120 }}
                            transition={{ type: "spring", stiffness: 200, damping: 15 }}
                            onClick={() => {
                              setSelectedViewType("desktop");
                              setSelectedProject(project);
                              setSelectedImage(project.imageUrl);
                            }}
                            className="absolute w-[280px] h-[180px] bg-card border-4 border-black/5 dark:border-white/10 rounded-xl overflow-hidden shadow-2xl z-60 cursor-pointer will-change-transform"
                          >
                            <Image
                              src={project.imageUrl}
                              alt="Desktop Preview Left"
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-white/10 dark:bg-black/20 opacity-0 hover:opacity-100 transition-opacity" />
                          </motion.div>

                          <motion.div
                            initial={{ x: 80, y: 0, opacity: 0, rotate: 20, scale: 0.7 }}
                            animate={{ x: 130, y: -20, opacity: 0.6, rotate: 10, scale: 1 }}
                            whileHover={{ scale: 1.1, rotate: 5, y: -40, opacity: 1, zIndex: 120 }}
                            transition={{ type: "spring", stiffness: 200, damping: 15 }}
                            onClick={() => {
                              setSelectedViewType("desktop");
                              setSelectedProject(project);
                              setSelectedImage(project.desktopRightImage || project.imageUrl);
                            }}
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

                          {/* Center Mobile Screen */}
                          <motion.div
                            initial={{ y: 150, opacity: 0, scale: 0.6 }}
                            animate={{ y: -60, opacity: 1, scale: 1.42 }}
                            whileHover={{ scale: 1.5, y: -80, zIndex: 130 }}
                            whileTap={{ scale: 1.35 }}
                            transition={{
                              type: "spring",
                              stiffness: 180,
                              damping: 22,
                              mass: 1
                            }}
                            onClick={() => {
                              setSelectedViewType("mobile");
                              setSelectedProject(project);
                              setSelectedImage(project.previewImage || project.imageUrl);
                            }}
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
                            <div className="absolute inset-0 bg-black/40 dark:bg-white/10 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                              <div className="bg-white/20 backdrop-blur-md p-3 rounded-full">
                                <ExternalLink className="w-6 h-6 text-white" />
                              </div>
                            </div>
                          </motion.div>
                        </div>
                      </div>
                    )}
                  </AnimatePresence>

                </div>

                {/* Tech Stack Footer (Stay sharp and visible) */}
                <div className="p-8 pt-4 border-t border-border/50 bg-muted/20 dark:bg-black/40 z-120 rounded-b-[2rem]">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60 block mb-4">
                    Tech Stack
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech, i) => (
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
      
      {/* Project Image Modal - Immersive Showroom */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-1000 flex items-center justify-center p-4 sm:p-12 bg-black/60 backdrop-blur-xl"
            onClick={() => setSelectedProject(null)}
          >
            {/* Navigation Overlay (Close & Visit) */}
            <div className="fixed top-0 left-0 right-0 p-8 flex items-center justify-between z-1100 pointer-events-none">
              <div className="pointer-events-auto">
                {selectedViewType === "desktop" && (
                  <>
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground block mb-2 drop-shadow-sm">
                      {selectedProject.category} • Desktop Preview
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight drop-shadow-sm">
                      {selectedProject.title}
                    </h2>
                  </>
                )}
              </div>
              
              <div className="flex items-center gap-6 pointer-events-auto">
                <a
                  href={selectedProject.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-8 py-4 rounded-full bg-foreground text-background font-bold text-lg hover:scale-105 active:scale-95 transition-all shadow-[0_20px_40px_rgba(0,0,0,0.3)] group"
                >
                  <span>Visit Live Site</span>
                  <ExternalLink className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="w-14 h-14 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/40 border border-white/10 text-white backdrop-blur-xl transition-all group"
                >
                  <svg className="w-8 h-8 transition-transform group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              <div className="relative pointer-events-auto max-w-full max-h-full flex items-center justify-center">
                {selectedViewType === "mobile" ? (
                  /* High-Fidelity Phone Frame */
                  <div className="relative w-[320px] sm:w-[420px] aspect-9/19 bg-black border-12 border-[#111] rounded-[4rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.5)] ring-4 ring-white/5">
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-7 bg-[#111] rounded-full z-10 border border-white/5" />
                    <Image
                      src={selectedImage || selectedProject.imageUrl}
                      alt={selectedProject.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                ) : (
                  /* Floating Desktop Preview - Fixed Sizing */
                  <div className="relative w-[85vw] max-w-[1200px] aspect-video bg-card border-4 border-black/5 dark:border-white/10 rounded-[2rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.5)]">
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
