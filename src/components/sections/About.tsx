"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ArrowUpRight, ChevronLeft, ChevronRight, Cpu } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence, useReducedMotion, useInView, animate, type Variants } from "framer-motion";
import { SiEspressif } from "react-icons/si";
import { playHoverSound } from "@/lib/sound-effects";

const GitHubCalendar = dynamic(
  () => import("react-github-calendar").then((mod) => mod.GitHubCalendar),
  { ssr: false }
);

function formatContributionDate(dateStr: string): string {
  try {
    const [yearStr, monthStr, dayStr] = dateStr.split("-");
    const year = parseInt(yearStr, 10);
    const month = parseInt(monthStr, 10) - 1;
    const day = parseInt(dayStr, 10);
    const date = new Date(year, month, day);

    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

type SkillIcon =
  | { kind: "image"; src: string; invertInDark?: boolean; rounded?: boolean }
  | { kind: "icon"; icon: React.ElementType; color?: string; invertInDark?: boolean };

const iconMap: Record<string, SkillIcon> = {
  "HTML5": {
    kind: "image",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  },
  "React": {
    kind: "image",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  "Next.js": {
    kind: "image",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    invertInDark: true,
  },
  "TypeScript": {
    kind: "image",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
  "Tailwind CSS": {
    kind: "image",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  },
  "Node.js": {
    kind: "image",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  "FastAPI": {
    kind: "image",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
  },
  "Flask": {
    kind: "image",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg",
    invertInDark: true,
  },
  "MongoDB": {
    kind: "image",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  },
  "Python": {
    kind: "image",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  "C#": {
    kind: "image",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
  },
  "C++": {
    kind: "image",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
  },
  "Arduino": {
    kind: "image",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg",
  },
  "ESP32": {
    kind: "icon",
    icon: SiEspressif,
    color: "#E7352C",
  },
  "Embedded Systems": {
    kind: "icon",
    icon: Cpu,
    color: "#888888",
  },
  "Figma": {
    kind: "image",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
  },
  "Google Stitch": {
    kind: "image",
    src: "/images/stitch.png",
    rounded: true,
  },
};

interface TechGroup {
  category: string;
  skills: string[];
}

const techStack: TechGroup[] = [
  {
    category: "Frontend",
    skills: ["HTML5", "React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    category: "Backend & data",
    skills: ["Node.js", "FastAPI", "Flask", "MongoDB"],
  },
  {
    category: "Languages",
    skills: ["Python", "C#", "C++"],
  },
  {
    category: "Hardware",
    skills: ["Arduino", "ESP32", "Embedded Systems"],
  },
  {
    category: "Design",
    skills: ["Figma", "Google Stitch"],
  },
];

const galleryImages = [
  {
    url: "/images/programming.png",
    caption: "Architecting high-performance web applications and hardware logic in VS Code.",
  },
  {
    url: "/images/profile-pic.png",
    caption: "I pride myself on having an 'I'll figure it out' mindset no matter how hard the problem is.",
  },
  {
    url: "/images/companion_bot.png",
    caption: "Meet my custom-built Desktop Companion Bot V1, a fusion of robotics and interactive design.",
  },
];

interface AnimatedCounterProps {
  value: string | number;
  loading: boolean;
  isActive: boolean;
  delay?: number;
}

function AnimatedCounter({ value, loading, isActive, delay = 0 }: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState<number | string>(0);
  const shouldReduceMotion = useReducedMotion();
  const currentValRef = useRef(0);

  const numValue = typeof value === "number" ? value : parseInt(value.replace(/[^0-9]/g, ""), 10);
  const isNumeric = !isNaN(numValue);

  useEffect(() => {
    if (loading) {
      setDisplayValue("…");
      return;
    }

    if (!isNumeric) {
      setDisplayValue(value);
      return;
    }

    if (shouldReduceMotion) {
      setDisplayValue(isActive ? numValue.toLocaleString() : "0");
      currentValRef.current = isActive ? numValue : 0;
      return;
    }

    let timeoutId: NodeJS.Timeout | null = null;
    let controls: { stop: () => void } | null = null;

    if (isActive) {
      // Scroll down: count UP from current value to numValue
      timeoutId = setTimeout(() => {
        controls = animate(currentValRef.current, numValue, {
          duration: Math.min(1.8, Math.max(0.9, 0.4 + Math.log10(Math.max(numValue, 1)) * 0.45)),
          ease: [0.16, 1, 0.3, 1], // Emil / Vercel luxury deceleration curve
          onUpdate: (latest) => {
            currentValRef.current = latest;
            setDisplayValue(Math.round(latest).toLocaleString());
          },
        });
      }, delay * 1000);
    } else {
      // Scroll up: count DOWN smoothly to 0
      controls = animate(currentValRef.current, 0, {
        duration: 0.55,
        ease: [0.32, 0, 0.67, 0], // Smooth acceleration back to 0
        onUpdate: (latest) => {
          currentValRef.current = latest;
          setDisplayValue(Math.round(latest).toLocaleString());
        },
      });
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (controls) controls.stop();
    };
  }, [isActive, loading, numValue, isNumeric, value, shouldReduceMotion, delay]);

  return (
    <span className="tabular-nums">
      {loading ? "…" : displayValue}
    </span>
  );
}

export default function About() {
  const { theme } = useTheme();
  const shouldReduceMotion = useReducedMotion();
  const calendarScrollRef = useRef<HTMLDivElement>(null);

  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeRows, setActiveRows] = useState<boolean[]>([false, false, false, false, false]);

  const metricsRef = useRef<HTMLDivElement>(null);
  const [isMetricsActive, setIsMetricsActive] = useState(false);

  // GitHub contribution hover tooltip state
  const [hoveredBlock, setHoveredBlock] = useState<{
    activity: { date: string; count: number; level: number };
    rect: {
      top: number;
      bottom: number;
      left: number;
      right: number;
      width: number;
      height: number;
    };
  } | null>(null);

  // Dismiss calendar tooltip on window scroll or resize to prevent floating desync
  useEffect(() => {
    const handleDismiss = () => setHoveredBlock(null);
    window.addEventListener("scroll", handleDismiss, { passive: true });
    window.addEventListener("resize", handleDismiss, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleDismiss);
      window.removeEventListener("resize", handleDismiss);
    };
  }, []);

  // Track each category and metrics viewport alignment so animations are strictly scroll-based
  useEffect(() => {
    let ticking = false;

    const checkRowsInView = () => {
      const vh = window.innerHeight || 800;
      // Trigger when the category row reaches the lower-middle focal reading zone (58% of viewport)
      const triggerLine = vh * 0.58;
      const exitHysteresis = 35; // 35px buffer prevents boundary jitter

      setActiveRows((prev) => {
        let changed = false;
        const next = prev.map((currentActive, idx) => {
          const el = rowRefs.current[idx];
          if (!el) return currentActive;
          const rect = el.getBoundingClientRect();

          let isActive = currentActive;
          if (rect.top <= triggerLine) {
            isActive = true;
          } else if (rect.top > triggerLine + exitHysteresis) {
            isActive = false;
          }

          if (isActive !== currentActive) {
            changed = true;
          }
          return isActive;
        });

        return changed ? next : prev;
      });

      // Track GitHub metrics viewport alignment:
      // When scrolling down, counts up when top reaches 65% of viewport
      // When scrolling up, counts down to 0 when it drops below 65% + hysteresis
      if (metricsRef.current) {
        const mRect = metricsRef.current.getBoundingClientRect();
        const metricsTriggerLine = vh * 0.65;
        setIsMetricsActive((prev) => {
          if (mRect.top <= metricsTriggerLine) {
            return true;
          } else if (mRect.top > metricsTriggerLine + exitHysteresis) {
            return false;
          }
          return prev;
        });
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(checkRowsInView);
        ticking = true;
      }
    };

    checkRowsInView();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const stackLogoVariants: Variants = {
    hidden: (custom: any) => ({
      opacity: 0,
      y: shouldReduceMotion ? 0 : -42,
      rotate: shouldReduceMotion ? 0 : -360,
      scale: shouldReduceMotion ? 1 : 0.7,
      transition: {
        delay: custom?.exitDelay ?? 0,
        duration: 0.25,
        ease: [0.32, 0, 0.67, 0],
      },
    }),
    visible: (custom: any) => ({
      opacity: 1,
      y: 0,
      rotate: 0,
      scale: 1,
      transition: shouldReduceMotion
        ? { duration: 0.3, delay: custom?.enterDelay ?? 0 }
        : {
            delay: custom?.enterDelay ?? 0,
            type: "spring",
            stiffness: 150,
            damping: 9,
            mass: 1.0,
          },
    }),
  };

  const stackNameVariants: Variants = {
    hidden: (custom: any) => ({
      opacity: 0,
      x: shouldReduceMotion ? 0 : -8,
      scale: shouldReduceMotion ? 1 : 0.92,
      transition: {
        delay: custom?.exitDelay ?? 0,
        duration: 0.16,
        ease: "easeIn",
      },
    }),
    visible: (custom: any) => ({
      opacity: 1,
      x: 0,
      scale: 1,
      transition: shouldReduceMotion
        ? { duration: 0.2, delay: custom?.enterDelay ?? 0 }
        : {
            delay: custom?.enterDelay ?? 0,
            type: "spring",
            stiffness: 280,
            damping: 16,
            mass: 0.75,
          },
    }),
  };

  const [currentIdx, setCurrentIdx] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isGalleryPaused, setIsGalleryPaused] = useState(false);
  const [isCompactCalendar, setIsCompactCalendar] = useState(false);

  const [githubData, setGithubData] = useState({
    repos: "35",
    followers: "3",
    stars: "1",
    forks: "1",
    commits: "670",
    contributions: "707",
    loading: true,
  });

  // Slide navigation
  const nextSlide = () => {
    setDirection(1);
    setCurrentIdx((prev) => (prev + 1) % galleryImages.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIdx((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  // Carousel autoplay
  useEffect(() => {
    if (isGalleryPaused) return;

    const intervalId = window.setInterval(() => {
      setDirection(1);
      setCurrentIdx((prev) => (prev + 1) % galleryImages.length);
    }, 4500);

    return () => window.clearInterval(intervalId);
  }, [isGalleryPaused]);

  // Responsive calendar sizing
  useEffect(() => {
    const updateCalendarMode = () => {
      setIsCompactCalendar(window.innerWidth < 768);
    };

    updateCalendarMode();
    window.addEventListener("resize", updateCalendarMode);
    return () => window.removeEventListener("resize", updateCalendarMode);
  }, []);

  // Center or scroll calendar into view
  useEffect(() => {
    const container = calendarScrollRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver(() => {
      container.scrollLeft = container.scrollWidth;
    });

    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, []);

  // Live GitHub stats fetcher
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const userRes = await fetch("https://api.github.com/users/jlfuertes14");
        const userData = await userRes.json();

        const reposRes = await fetch("https://api.github.com/users/jlfuertes14/repos?per_page=100");
        const reposData = await reposRes.json();

        let totalStars = 0;
        let totalForks = 0;

        if (Array.isArray(reposData)) {
          reposData.forEach((repo) => {
            totalStars += repo.stargazers_count;
            totalForks += repo.forks_count;
          });
        }

        const commitsRes = await fetch("https://api.github.com/search/commits?q=author:jlfuertes14", {
          headers: { Accept: "application/vnd.github.cloak-preview" },
        });
        const commitsData = await commitsRes.json();

        const issuesRes = await fetch("https://api.github.com/search/issues?q=author:jlfuertes14");
        const issuesData = await issuesRes.json();

        setGithubData({
          repos: userData.public_repos?.toString() || "35",
          followers: userData.followers?.toString() || "3",
          stars: totalStars.toString() || "1",
          forks: totalForks.toString() || "1",
          commits: commitsData.total_count?.toString() || "670",
          contributions:
            ((commitsData.total_count || 0) + (issuesData.total_count || 0) + (userData.public_repos || 0)).toString() || "707",
          loading: false,
        });
      } catch {
        setGithubData({
          repos: "35",
          followers: "3",
          stars: "1",
          forks: "1",
          commits: "670",
          contributions: "707",
          loading: false,
        });
      }
    };

    fetchStats();
  }, []);

  const statsItems = [
    { label: "Repositories", value: githubData.repos },
    { label: "Total stars", value: githubData.stars },
    { label: "Total forks", value: githubData.forks },
    { label: "Commits", value: githubData.commits },
    { label: "Contributions", value: githubData.contributions },
    { label: "Followers", value: githubData.followers },
  ];

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  return (
    <section
      id="about"
      className="relative py-20 sm:py-28 lg:py-36 bg-background text-foreground scroll-mt-24 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">


        {/* Big Editorial Headline */}
        <div className="mb-14 sm:mb-20 lg:mb-28 max-w-5xl">
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight text-foreground leading-[1.02] text-balance">
            Aspiring full stack developer{" "}
            <span className="text-muted-foreground/60 font-light">&amp;</span> AI
            engineer<span className="text-primary">.</span>
          </h2>
        </div>

        {/* Main Grid: Frame on Left, Narrative & Facts on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: 4/5 Aspect Ratio Editorial Visual Frame */}
          <div className="lg:col-span-5 w-full">
            <figure
              className="relative aspect-[4/5] w-full max-w-md lg:max-w-none mx-auto overflow-hidden rounded-2xl border border-border/70 dark:border-white/15 bg-muted/40 shadow-xl group select-none"
              onMouseEnter={() => setIsGalleryPaused(true)}
              onMouseLeave={() => setIsGalleryPaused(false)}
              aria-label="Gallery showcasing engineering and robotics workspace"
            >
              {/* Carousel Slides */}
              <div className="relative w-full h-full overflow-hidden">
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                  <motion.div
                    key={currentIdx}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
                      opacity: { duration: 0.3, ease: "easeOut" },
                    }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={galleryImages[currentIdx].url}
                      alt={galleryImages[currentIdx].caption}
                      fill
                      sizes="(min-width: 1024px) 40vw, (min-width: 640px) 70vw, 100vw"
                      className="object-cover"
                      priority={currentIdx === 0}
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Ambient Code Lines Overlay Aesthetic */}
                <div
                  className="pointer-events-none absolute inset-6 top-6 h-28 grid gap-2 z-10 opacity-30 group-hover:opacity-15 transition-opacity duration-300"
                  aria-hidden="true"
                >
                  <span className="block h-1 w-[55%] rounded-full bg-white/40" />
                  <span className="block h-1 w-[80%] rounded-full bg-white/30" />
                  <span className="block h-1 w-[38%] rounded-full bg-white/60" />
                  <span className="block h-1 w-[68%] rounded-full bg-white/30" />
                </div>

                {/* Vignette Gradient Overlay */}
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent z-10"
                  aria-hidden="true"
                />

                {/* Prev / Next Controls */}
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-between p-3 sm:p-4 z-20 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
                  <button
                    type="button"
                    onClick={prevSlide}
                    className="flex size-9 sm:size-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md border border-white/20 transition-[background-color,transform] duration-200 hover:bg-black/80 active:scale-95 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none cursor-pointer"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft className="size-4 sm:size-5" />
                  </button>
                  <button
                    type="button"
                    onClick={nextSlide}
                    className="flex size-9 sm:size-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md border border-white/20 transition-[background-color,transform] duration-200 hover:bg-black/80 active:scale-95 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none cursor-pointer"
                    aria-label="Next photo"
                  >
                    <ChevronRight className="size-4 sm:size-5" />
                  </button>
                </div>

                {/* Figcaption & Slide Indicators */}
                <figcaption className="absolute inset-x-5 bottom-5 sm:inset-x-7 sm:bottom-6 z-20 text-white">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={currentIdx}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}
                      className="text-xs sm:text-sm md:text-base font-normal italic leading-relaxed text-pretty text-white/95"
                    >
                      {galleryImages[currentIdx].caption}
                    </motion.p>
                  </AnimatePresence>

                  {/* Indicator Dots */}
                  <div className="flex items-center gap-1.5 mt-3 sm:mt-4">
                    {galleryImages.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => {
                          setDirection(i > currentIdx ? 1 : -1);
                          setCurrentIdx(i);
                        }}
                        className={`h-1 rounded-full transition-all duration-300 ${
                          i === currentIdx ? "w-6 bg-white" : "w-2 bg-white/40"
                        }`}
                        aria-label={`Go to slide ${i + 1}`}
                      />
                    ))}
                  </div>
                </figcaption>
              </div>
            </figure>
          </div>

          {/* Right Column: Narrative Copy & Facts */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="space-y-6">
              {/* Lead Paragraph */}
              <p className="text-lg sm:text-xl md:text-2xl font-normal leading-relaxed text-muted-foreground text-pretty">
                I’m a{" "}
                <strong className="font-semibold text-foreground">
                  Computer Engineering graduate
                </strong>{" "}
                who builds web apps and hardware circuits. I work with{" "}
                <strong className="font-semibold text-foreground">
                  Gemini and Groq APIs
                </strong>{" "}
                to create chatbots, using{" "}
                <strong className="font-semibold text-foreground">RAG</strong> to
                keep them fast and contextual. Whether I’m designing{" "}
                <strong className="font-semibold text-foreground">GraphQL</strong>{" "}
                schemas, building{" "}
                <strong className="font-semibold text-foreground">REST APIs</strong>,
                or tinkering with sensors, I love connecting the physical world to
                the web.
              </p>

              {/* Second Paragraph */}
              <p className="text-sm sm:text-base leading-relaxed text-muted-foreground max-w-2xl text-pretty">
                I use modern AI tools to speed up my workflow. By combining good
                architecture with AI coding assistants, I can focus on building{" "}
                <strong className="font-medium text-foreground">
                  solid hardware
                </strong>{" "}
                and{" "}
                <strong className="font-medium text-foreground">
                  maintainable code
                </strong>
                .
              </p>
            </div>

            {/* Facts Definition List */}
            <dl className="mt-10 mb-8 border-b border-border/60">
              <div className="flex items-baseline justify-between gap-4 py-3.5 border-t border-border/60">
                <dt className="font-mono text-xs uppercase tracking-wider text-muted-foreground/70">
                  Location
                </dt>
                <dd className="text-sm sm:text-base font-medium text-foreground text-right">
                  Taytay, Rizal, Philippines
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 py-3.5 border-t border-border/60">
                <dt className="font-mono text-xs uppercase tracking-wider text-muted-foreground/70">
                  Education
                </dt>
                <dd className="text-sm sm:text-base font-medium text-foreground text-right">
                  BS Computer Engineering
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 py-3.5 border-t border-border/60">
                <dt className="font-mono text-xs uppercase tracking-wider text-muted-foreground/70">
                  University
                </dt>
                <dd className="text-sm sm:text-base font-medium text-foreground text-right">
                  Rizal Technological University
                </dd>
              </div>
            </dl>

            {/* GitHub Callout Action */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
              <span className="text-xs sm:text-sm text-muted-foreground max-w-[28ch] leading-relaxed">
                Open source projects &amp; technical contributions
              </span>
              <a
                href="https://github.com/jlfuertes14"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-foreground text-background px-6 py-3 text-xs sm:text-sm font-medium transition-[opacity,transform] duration-200 hover:opacity-90 active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none w-fit shrink-0 cursor-pointer"
              >
                <span>Explore GitHub</span>
                <ArrowUpRight className="size-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Tech Stack Section */}
        <div className="mt-28 sm:mt-36 pt-16 border-t border-border/60">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            <div className="lg:col-span-5">
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                Tech stack<span className="text-primary">.</span>
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Core technologies, languages, and hardware frameworks.
              </p>
            </div>

            <dl className="lg:col-span-7 flex flex-col border-b border-border/60">
              {techStack.map((group, groupIndex) => {
                const isGroupActive = activeRows[groupIndex];
                return (
                  <div
                    key={group.category}
                    ref={(el) => {
                      rowRefs.current[groupIndex] = el;
                    }}
                    className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-3 sm:gap-6 py-6 sm:py-8 border-t border-border/60 items-baseline"
                  >
                    <dt className="font-mono text-xs uppercase tracking-wider text-muted-foreground/70 pt-1">
                      {group.category}
                    </dt>
                    <dd className="flex flex-wrap gap-x-6 sm:gap-x-8 gap-y-3 sm:gap-y-4 text-xl sm:text-2xl md:text-3xl font-medium tracking-tight text-foreground/90">
                      {group.skills.map((skill, skillIndex) => {
                        const icon = iconMap[skill];
                        const logoEnterDelay = skillIndex * 0.18;
                        const nameEnterDelay = logoEnterDelay + 0.14;
                        const reverseIndex = group.skills.length - 1 - skillIndex;
                        const nameExitDelay = reverseIndex * 0.04;
                        const logoExitDelay = nameExitDelay + 0.04;

                        return (
                          <span
                            key={skill}
                            className="inline-flex items-center gap-2.5 transition-colors duration-200 hover:text-primary cursor-default group/skill"
                          >
                            {icon && (
                              <motion.span
                                initial="hidden"
                                animate={isGroupActive ? "visible" : "hidden"}
                                custom={{
                                  enterDelay: logoEnterDelay,
                                  exitDelay: logoExitDelay,
                                }}
                                variants={stackLogoVariants}
                                className="shrink-0 flex items-center justify-center"
                              >
                                <span className="relative size-6 sm:size-7 md:size-8 shrink-0 flex items-center justify-center transition-transform duration-200 group-hover/skill:scale-110">
                                  {icon.kind === "image" ? (
                                    <Image
                                      src={icon.src}
                                      alt={skill}
                                      width={32}
                                      height={32}
                                      className={`size-full object-contain ${
                                        icon.rounded ? "rounded-md" : ""
                                      } ${
                                        icon.invertInDark
                                          ? "dark:invert dark:brightness-100"
                                          : ""
                                      }`}
                                    />
                                  ) : (
                                    <icon.icon
                                      className={`size-full object-contain ${
                                        icon.invertInDark
                                          ? "text-[#2b2728] dark:text-white"
                                          : ""
                                      }`}
                                      style={
                                        icon.invertInDark
                                          ? undefined
                                          : { color: icon.color }
                                      }
                                    />
                                  )}
                                </span>
                              </motion.span>
                            )}
                            <motion.span
                              initial="hidden"
                              animate={isGroupActive ? "visible" : "hidden"}
                              custom={{
                                enterDelay: nameEnterDelay,
                                exitDelay: nameExitDelay,
                              }}
                              variants={stackNameVariants}
                              className="inline-block"
                            >
                              {skill}
                            </motion.span>
                          </span>
                        );
                      })}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </div>
        </div>

        {/* GitHub Ecosystem Section */}
        <div className="mt-28 sm:mt-36 pt-16 border-t border-border/60">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start mb-16">
            <div className="lg:col-span-5">
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                GitHub ecosystem<span className="text-primary">.</span>
              </h3>
              <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-sm text-pretty">
                Live metrics from my open-source work, synced with the official
                GitHub API.
              </p>
            </div>

            {/* 6 Stats Grid */}
            <div
              ref={metricsRef}
              className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-8 border-t border-border/60 pt-6"
            >
              {statsItems.map((item, index) => (
                <div
                  key={item.label}
                  className="flex flex-col gap-1.5 pb-6 border-b border-border/60"
                >
                  <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground/70">
                    {item.label}
                  </span>
                  <strong className="text-4xl sm:text-5xl lg:text-6xl font-bold font-mono tracking-tight text-foreground tabular-nums">
                    <AnimatedCounter
                      value={item.value}
                      loading={githubData.loading}
                      isActive={isMetricsActive}
                      delay={index * 0.08}
                    />
                  </strong>
                </div>
              ))}
            </div>
          </div>

          {/* Contribution Activity Heatmap */}
          <div className="pt-8 sm:pt-10 border-t border-border/60 relative">
            {/* SVG Gradients for Hovered Calendar Block Sheen */}
            <svg
              width="0"
              height="0"
              className="absolute -z-50 pointer-events-none opacity-0"
              aria-hidden="true"
            >
              <defs>
                {/* Dark mode active green hovered glossy gradient */}
                <linearGradient id="github-calendar-hover-gradient-dark" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#86efac" />
                  <stop offset="35%" stopColor="#39d353" />
                  <stop offset="100%" stopColor="#0e4429" />
                </linearGradient>

                {/* Dark mode empty day hovered gradient */}
                <linearGradient id="github-calendar-hover-empty-dark" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#38414e" />
                  <stop offset="100%" stopColor="#161b22" />
                </linearGradient>

                {/* Light mode active green hovered glossy gradient */}
                <linearGradient id="github-calendar-hover-gradient-light" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#bbf7d0" />
                  <stop offset="35%" stopColor="#40c463" />
                  <stop offset="100%" stopColor="#216e39" />
                </linearGradient>

                {/* Light mode empty day hovered gradient */}
                <linearGradient id="github-calendar-hover-empty-light" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#d1d5db" />
                </linearGradient>
              </defs>
            </svg>

            {/* Horizontal Scrollable Calendar with Zero Scrollbar */}
            <div
              ref={calendarScrollRef}
              onScroll={() => setHoveredBlock(null)}
              className="w-full overflow-x-auto hide-scrollbar no-scrollbar py-2 sm:py-4"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <div className="min-w-fit flex justify-center text-muted-foreground">
                <GitHubCalendar
                  username="jlfuertes14"
                  fontSize={isCompactCalendar ? 11 : 14}
                  blockSize={isCompactCalendar ? 11 : 16}
                  blockMargin={isCompactCalendar ? 3.5 : 4.5}
                  blockRadius={3}
                  colorScheme={theme === "dark" ? "dark" : "light"}
                  theme={{
                    dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
                    light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
                  }}
                  renderBlock={(block, activity) => {
                    const isHovered = hoveredBlock?.activity.date === activity.date;

                    return React.cloneElement(block as React.ReactElement<React.SVGProps<SVGRectElement>>, {
                      className: `github-calendar-cell ${isHovered ? "is-hovered" : ""}`,
                      style: {
                        ...((block as React.ReactElement<{ style?: React.CSSProperties }>).props?.style),
                        rx: 3,
                        ry: 3,
                        cursor: "pointer",
                      },
                      onMouseEnter: (e: React.MouseEvent<SVGRectElement>) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        setHoveredBlock({
                          activity,
                          rect: {
                            top: rect.top,
                            bottom: rect.bottom,
                            left: rect.left,
                            right: rect.right,
                            width: rect.width,
                            height: rect.height,
                          },
                        });
                        playHoverSound({ volume: 0.16 });
                      },
                      onMouseLeave: () => {
                        setHoveredBlock((curr) => (curr?.activity.date === activity.date ? null : curr));
                      },
                      onTouchStart: (e: React.TouchEvent<SVGRectElement>) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        setHoveredBlock({
                          activity,
                          rect: {
                            top: rect.top,
                            bottom: rect.bottom,
                            left: rect.left,
                            right: rect.right,
                            width: rect.width,
                            height: rect.height,
                          },
                        });
                        playHoverSound({ volume: 0.16 });
                      },
                    });
                  }}
                />
              </div>
            </div>

            {/* Floating Custom Monospace Contribution Tooltip Badge */}
            <AnimatePresence>
              {hoveredBlock && (
                <motion.div
                  key={hoveredBlock.activity.date}
                  initial={{ opacity: 0, y: 3, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 2, scale: 0.98 }}
                  transition={{ duration: 0.1, ease: [0.23, 1, 0.32, 1] }}
                  style={{
                    position: "fixed",
                    top: hoveredBlock.rect.top < 65 ? hoveredBlock.rect.bottom + 8 : hoveredBlock.rect.top - 8,
                    left: typeof window !== "undefined"
                      ? Math.max(160, Math.min(window.innerWidth - 160, hoveredBlock.rect.left + hoveredBlock.rect.width / 2))
                      : hoveredBlock.rect.left + hoveredBlock.rect.width / 2,
                    transform: hoveredBlock.rect.top < 65 ? "translate(-50%, 0)" : "translate(-50%, -100%)",
                    zIndex: 99999,
                    pointerEvents: "none",
                  }}
                  className="pointer-events-none select-none rounded-lg border border-white/20 bg-[#090a0f]/95 px-3.5 py-1.5 shadow-2xl shadow-black/80 backdrop-blur-md"
                >
                  <div className="flex items-center gap-1.5 font-mono text-[12px] sm:text-[13px] leading-snug whitespace-nowrap text-zinc-100">
                    <span className="font-bold text-white">
                      {hoveredBlock.activity.count === 0
                        ? "No contributions"
                        : `${hoveredBlock.activity.count} contribution${hoveredBlock.activity.count === 1 ? "" : "s"}`}
                    </span>
                    <span className="font-normal text-zinc-300">
                      on {formatContributionDate(hoveredBlock.activity.date)}
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

