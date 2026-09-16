"use client";

import React, { useEffect, useRef, useState } from 'react';
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
    description: "I took up Computer Engineering back in 2022 simply because I loved computers, but looking back, it opened up so many doors for me to grow, not just as an engineer, but as a person. There were definitely times when I doubted whether I could keep up with complex circuit design and low-level architectures, but persevering through those challenges made me fall in love with the art of building. It led me straight to my capstone thesis, 'HatchWatch', an IoT and AI-powered incubator system for Philippine Mallard Ducks, and helped me realize my true path: creating practical software and intelligent hardware that solve real-world problems.",
    image: "/images/journey/graduation_pic.png"
  },
  {
    id: 2,
    period: "February 2026 - April 2026",
    role: "IT Intern (Research Department)",
    organization: "Q Asia Magazine Inc.",
    description: "Stepping into the research department at Q Asia Magazine opened my eyes to how fast-paced and demanding corporate workflows really are. It was completely new territory for me, but I adapted quickly and looked for ways to make a tangible difference. Even though it was a marketing-focused environment, I stood out by leaning into my technical strengths. I built the 'QAsia Email Automation Software', a custom Python and CustomTkinter desktop tool that streamlined bulk outreach via SMTP and cut manual contact tracing by over 60%, directly helping the team smash their daily quotas and widen company reach.",
    images: ["/images/journey/internship1.png", "/images/journey/internship2.jpeg"]
  },
  {
    id: 3,
    period: "2020 - 2022",
    role: "STEM Research Lead",
    organization: "Buting Senior High School",
    description: "Senior high school was where my curiosity and obsession with experimentation really took off. Stepping up as a STEM Research Lead, I coordinated our academic teams through late-night trial-and-error experiments, diving into feasibility studies on piezoelectric generators and organic materials. It taught me how to lead others, troubleshoot when experiments inevitably failed, and stay disciplined under pressure. Finishing that chapter with Honors and a 94% GPA gave me the confidence that I had what it takes to pursue engineering in college.",
    image: "/images/journey/buting-senior-high-research.jpeg"
  },
  {
    id: 'scholarship',
    period: "2015 - 2026",
    role: "Pasig City Scholar",
    organization: "City Government of Pasig",
    description: "Being a Pasig City Scholar for 11 consecutive years is something I hold very close to my heart. Earning the scholarship through competitive academic screening was tough, but keeping it year after year from grade school all the way through to university graduation required relentless consistency. Whenever school got overwhelming or self-doubt crept in, this scholarship was a constant reminder of the trust placed in me and why I started. It shaped my work ethic, taught me accountability, and proved to me that staying disciplined over the long run always pays off.",
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

      // Temporarily remove transforms to get accurate layout positions
      const originalTransforms = cardRefs.current.map(card => card ? card.style.transform : '');
      cardRefs.current.forEach(card => {
        if (card) card.style.transform = 'none';
      });
      const originalImgTransforms = imageRefs.current.map(img => img ? img.style.transform : '');
      imageRefs.current.forEach(img => {
        if (img) img.style.transform = 'none';
      });

      // Recalculate container rect after removing transforms in case it affected layout
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

      // Restore transforms
      cardRefs.current.forEach((card, i) => {
        if (card) card.style.transform = originalTransforms[i];
      });
      imageRefs.current.forEach((img, i) => {
        if (img) img.style.transform = originalImgTransforms[i];
      });
    };

    // Use ResizeObserver to trigger calculation as cards render and layout stabilizes
    const observer = new ResizeObserver(() => {
      calculatePath();
    });
    observer.observe(containerRef.current);

    // Initial calculation
    calculatePath();

    window.addEventListener('resize', calculatePath);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', calculatePath);
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

        if (card && dot) {
          gsap.fromTo(
            dot,
            { scale: 0, backgroundColor: '#111', boxShadow: '0 0 0px rgba(255,255,255,0)' },
            {
              scale: 1,
              backgroundColor: 'var(--primary)',
              boxShadow: '0 0 20px var(--primary)',
              duration: 0.4,
              ease: 'back.out(2)',
              scrollTrigger: {
                trigger: dot,
                start: 'center 55%',
                end: 'center 10%',
                toggleActions: 'play reverse play reverse',
              },
            }
          );

          const isMobile = window.innerWidth < 768;
          const isLeft = index % 2 === 0;
          const cardXOffset = isMobile ? 50 : (isLeft ? -50 : 50);

          gsap.fromTo(
            card,
            { opacity: 0, x: cardXOffset },
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 65%',
                end: 'bottom 25%',
                toggleActions: 'play reverse play reverse',
              },
            }
          );

          const imgEl = imageRefs.current[index];
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
                  trigger: card,
                  start: 'top 65%',
                  end: 'bottom 25%',
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
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              ref={pathRef}
              d={pathD}
              fill="none"
              stroke="var(--primary)"
              strokeWidth="5.5"
              strokeLinecap="round"
              style={{ filter: 'drop-shadow(0 0 10px var(--primary))' }}
            />
          </svg>

          <div className="relative z-10 w-full flex flex-col gap-[15vh] py-[5vh]">
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
                      className={`absolute top-12 w-3 h-3 rounded-full z-20 ${isLeft ? 'md:-right-[6px] -left-6 sm:-left-8 md:-left-[6px]' : '-left-6 sm:-left-8 md:-left-[6px]'
                        }`}
                    />

                    <div className="flex flex-col gap-2 relative z-10">
                      <span className="font-mono text-sm text-primary uppercase tracking-widest font-semibold">
                        {exp.period}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground leading-tight mt-2">
                        {exp.role}
                      </h3>
                      <h4 className="text-base text-foreground tracking-[0.1em] font-bold uppercase mb-6">
                        {exp.organization}
                      </h4>
                      <p className="text-base sm:text-lg leading-relaxed text-foreground/90">
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
                          <img
                            src={exp.images?.[0] || "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=400&auto=format&fit=crop"}
                            alt={`${exp.role} preview 1`}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                          />
                        </div>
                        <div className="relative w-full h-1/2 rounded-3xl overflow-hidden bg-muted">
                          <img
                            src={exp.images?.[1] || "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=400&auto=format&fit=crop"}
                            alt={`${exp.role} preview 2`}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02] delay-75"
                          />
                        </div>
                      </div>
                    ) : (
                      <img
                        src={exp.image || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop"}
                        alt={exp.role}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02] bg-muted"
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
