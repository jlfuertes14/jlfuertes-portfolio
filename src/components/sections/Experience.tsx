"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type TimelineMilestone =
  | {
    id: number | string;
    period: string;
    role: string;
    organization: string;
    description: string;
    image: string;
    images?: never;
  }
  | {
    id: number | string;
    period: string;
    role: string;
    organization: string;
    description: string;
    images: [string, string];
    image?: never;
  };

// --- MOCK DATA ---
const milestones: TimelineMilestone[] = [
  {
    id: 1,
    period: "July 2026",
    role: "BS Computer Engineering Graduate",
    organization: "Rizal Technological University",
    description: "I took up Computer Engineering in 2022 because I loved computers, but it quickly grew into a passion for the art of building. Tackling complex circuits and low-level architectures led straight to my capstone thesis, 'HatchWatch'—an IoT and AI-powered incubator system for Philippine Mallard Ducks—and solidified my path: creating practical software and intelligent hardware that solve real-world problems.",
    image: "/images/journey/graduation_pic.png"
  },
  {
    id: 2,
    period: "February 2026 - April 2026",
    role: "IT Intern",
    organization: "Q Asia Magazine Inc.",
    description: "Stepping into the research department at Q Asia Magazine opened my eyes to fast-paced corporate workflows. I adapted quickly and leaned into my technical strengths, building the 'QAsia Email Automation Software'—a custom Python and CustomTkinter tool that cut manual contact tracing by over 60% and directly helped our team smash daily quotas.",
    images: ["/images/journey/internship1.png", "/images/journey/internship2.jpeg"]
  },
  {
    id: 3,
    period: "2020 - 2022",
    role: "STEM Research Lead",
    organization: "Buting Senior High School",
    description: "Senior high school was where my obsession with experimentation really took off. As a STEM Research Lead, I coordinated our teams through late-night experiments, diving into feasibility studies on piezoelectric generators and organic materials. Troubleshooting failed trials taught me discipline under pressure, finishing that chapter with Honors and a 94% GPA.",
    image: "/images/journey/buting-senior-high-research.jpeg"
  },
  {
    id: 'scholarship',
    period: "2015 - 2026",
    role: "Pasig City Scholar",
    organization: "City Government of Pasig",
    description: "Being a Pasig City Scholar for 11 consecutive years is something I hold very close to my heart. Keeping it from grade school through university graduation required relentless consistency. It was a constant reminder of the trust placed in me, shaping my work ethic, accountability, and proving that long-term discipline always pays off.",
    image: "/images/journey/Pasig%20City%20Scholarship%20Office.png"
  }
];

// --- NOIR FILM GRAIN COMPONENT ---
const NoiseOverlay = () => (
  <div className="pointer-events-none absolute inset-0 z-50 h-full w-full opacity-[0.04]">
    <svg className="absolute inset-0 h-full w-full">
      <filter id="noiseFilter">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noiseFilter)" />
    </svg>
  </div>
);

// --- MAIN TIMELINE LOGIC ---
function TimelineContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [pathD, setPathD] = useState('');

  // --- DYNAMIC SVG PATH CALCULATION ---
  useEffect(() => {
    if (!containerRef.current) return;

    const calculatePath = () => {
      if (!containerRef.current) return;

      const activeDots = dotRefs.current.filter((dot): dot is HTMLDivElement => dot !== null);
      if (activeDots.length === 0) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const scrollY = window.scrollY;

      const points = activeDots.map((dot) => {
        const rect = dot.getBoundingClientRect();
        return {
          x: rect.left - containerRect.left + rect.width / 2,
          y: rect.top + scrollY - (containerRect.top + scrollY) + rect.height / 2,
        };
      });

      const isMobile = window.innerWidth < 768;
      let d = '';

      if (isMobile) {
        const lineX = points[0].x;
        d = `M ${lineX} 0\n`;
        d += `L ${lineX} ${containerRect.height}\n`;
      } else {
        const startX = containerRect.width / 2;
        d = `M ${startX} 0\n`;

        d += `L ${startX} ${Math.max(0, points[0].y - 200)}\n`;
        d += `C ${startX} ${points[0].y - 50}, ${points[0].x} ${points[0].y - 50}, ${points[0].x} ${points[0].y}\n`;

        for (let i = 0; i < points.length - 1; i++) {
          const p1 = points[i];
          const p2 = points[i + 1];
          d += `C ${p1.x} ${p1.y + 200}, ${p2.x} ${p2.y - 200}, ${p2.x} ${p2.y}\n`;
        }

        const lastP = points[points.length - 1];
        d += `C ${lastP.x} ${lastP.y + 200}, ${startX} ${lastP.y + 200}, ${startX} ${lastP.y + 400}\n`;
        d += `L ${startX} ${containerRect.height}\n`;
      }

      setPathD(d);
    };

    let rafId: number | null = null;
    const debouncedCalculate = () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        calculatePath();
        rafId = null;
      });
    };

    debouncedCalculate();

    window.addEventListener('resize', debouncedCalculate, { passive: true });

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener('resize', debouncedCalculate);
    };
  }, []);

  // --- GSAP ANIMATIONS ---
  useEffect(() => {
    if (!pathD || !pathRef.current) return;

    const ctx = gsap.context(() => {
      const length = pathRef.current!.getTotalLength();
      gsap.set(pathRef.current, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });

      gsap.to(pathRef.current, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top center',
          end: 'bottom 50%',
          scrub: true,
        },
      });

      milestones.forEach((_, index) => {
        const card = cardRefs.current[index];
        const dot = dotRefs.current[index];
        const imgEl = imageRefs.current[index];

        if (card && dot) {
          const isMobile = window.innerWidth < 768;
          const isLeft = index % 2 === 0;
          const cardXOffset = isMobile ? 50 : (isLeft ? -50 : 50);

          // Render description card when SVG touches dot
          gsap.fromTo(
            card,
            { opacity: 0, x: cardXOffset },
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: dot,
                start: 'center center',
                toggleActions: 'play reverse play reverse',
              },
            }
          );

          // Render photo card at the same time
          if (imgEl) {
            gsap.fromTo(
              imgEl,
              { opacity: 0, x: isLeft ? 50 : -50, scale: 0.95 },
              {
                opacity: 1,
                x: 0,
                scale: 1,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: dot,
                  start: 'center center',
                  toggleActions: 'play reverse play reverse',
                },
              }
            );
          }
        }
      });
    });

    return () => ctx.revert();
  }, [pathD]);

  return (
    <section id="experience" className="relative pt-24 pb-12 bg-background text-foreground scroll-mt-24 overflow-x-hidden">
      <NoiseOverlay />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight"
          >
            My Journey
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-foreground/50 text-base sm:text-lg max-w-2xl mx-auto"
          >
            A chronological timeline of my academic background, technical training, and key milestones.
          </motion.p>
        </div>

        <main ref={containerRef} className="relative w-full max-w-6xl mx-auto pb-12">
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <path
              d={pathD}
              fill="none"
              stroke="transparent"
              strokeWidth="15"
              strokeLinecap="butt"
            />
            <path
              ref={pathRef}
              d={pathD}
              fill="none"
              stroke="var(--primary)"
              strokeWidth="15"
              strokeLinecap="butt"
            />
          </svg>

          <div className="relative z-10 w-full flex flex-col gap-[18vh] py-[5vh]">
            {milestones.map((exp, index) => {
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={exp.id}
                  className={`flex w-full md:items-stretch ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} justify-end md:justify-between`}
                >
                  <div
                    ref={(el) => { cardRefs.current[index] = el; }}
                    className={`relative w-[85%] sm:w-[80%] md:w-[45%] bg-card/60 dark:bg-black/40 backdrop-blur-sm border border-border dark:border-neutral-800/50 p-6 sm:p-8 md:p-12 transition-colors duration-300 ease-out hover:border-primary/50 group rounded-[2rem]`}
                  >
                    <div
                      ref={(el) => { dotRefs.current[index] = el; }}
                      className={`absolute top-12 w-3 h-3 opacity-0 pointer-events-none z-20 ${isLeft ? 'md:-right-[6px] -left-6 sm:-left-8 md:-left-[6px]' : '-left-6 sm:-left-8 md:-left-[6px]'
                        }`}
                      aria-hidden="true"
                    />

                    <div className="flex flex-col gap-1.5 sm:gap-2 relative z-10">
                      <span className="font-mono text-xs sm:text-sm text-primary uppercase tracking-widest font-semibold">
                        {exp.period}
                      </span>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-foreground leading-snug mt-0.5 sm:mt-1">
                        {exp.role}
                      </h3>
                      <h4 className="text-xs sm:text-sm text-muted-foreground tracking-[0.1em] font-semibold uppercase mb-3 sm:mb-4">
                        {exp.organization}
                      </h4>
                      <p className="text-sm sm:text-base leading-relaxed text-foreground/85">
                        {exp.description}
                      </p>
                    </div>
                  </div>

                  {/* Image Placeholder */}
                  <div
                    ref={(el) => { imageRefs.current[index] = el; }}
                    className="hidden md:flex w-[45%] relative rounded-[2rem] overflow-hidden items-center justify-center group"
                  >
                    {exp.id === 2 || exp.role.includes('Intern') ? (
                      <div className="absolute inset-0 w-full h-full flex flex-col gap-2 p-2">
                        <div className="relative w-full h-1/2 rounded-3xl overflow-hidden bg-muted">
                          <Image
                            src={exp.images?.[0] || "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=400&auto=format&fit=crop"}
                            alt={`${exp.role} preview 1`}
                            fill
                            sizes="(min-width: 768px) 25vw, 50vw"
                            className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                          />
                        </div>
                        <div className="relative w-full h-1/2 rounded-3xl overflow-hidden bg-muted">
                          <Image
                            src={exp.images?.[1] || "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=400&auto=format&fit=crop"}
                            alt={`${exp.role} preview 2`}
                            fill
                            sizes="(min-width: 768px) 25vw, 50vw"
                            className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02] delay-75"
                          />
                        </div>
                      </div>
                    ) : (
                      <Image
                        src={exp.image || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop"}
                        alt={exp.role}
                        fill
                        sizes="(min-width: 768px) 45vw, 100vw"
                        className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02] bg-muted"
                      />
                    )}

                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </section>
  );
}

// --- APP ENTRY POINT (Handles Dependency Loading) ---
export default function Experience() {
  return <TimelineContent />;
}
