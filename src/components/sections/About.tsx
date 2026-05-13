"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Code2, Globe, Cpu, Star, GitFork, Users, BookOpen, Calendar, MapPin, GraduationCap, School, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { GitHubCalendar } from "react-github-calendar";
import { skills, siteConfig } from "@/lib/site-data";
import { useTheme } from "next-themes";
import { motion, AnimatePresence, Variants } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  SiHtml5,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiMongodb,
  SiPython,
  SiCplusplus,
  SiEspressif,
  SiFigma,
  SiDotnet,
  SiFastapi,
  SiFlask,
  SiArduino,
  SiMicropython,
} from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, { icon: React.ElementType; color: string }> = {
  "HTML/CSS/JS": { icon: SiHtml5, color: "#E34F26" },
  "React / Next.js": { icon: SiReact, color: "#61DAFB" },
  "TypeScript": { icon: SiTypescript, color: "#3178C6" },
  "Tailwind CSS": { icon: SiTailwindcss, color: "#06B6D4" },
  "Node.js": { icon: SiNodedotjs, color: "#339939" },
  "MongoDB": { icon: SiMongodb, color: "#47A248" },
  "Python": { icon: SiPython, color: "#FFCE3A" },
  "C#": { icon: SiDotnet, color: "#512BD4" },
  "FastAPI": { icon: SiFastapi, color: "#05998B" },
  "Flask": { icon: SiFlask, color: "currentColor" },
  "Arduino": { icon: SiArduino, color: "#00979D" },
  "C++ / Arduino": { icon: SiCplusplus, color: "#00599C" },
  "MicroPython": { icon: SiMicropython, color: "#2B2728" },
  "ESP32": { icon: SiEspressif, color: "#E7352C" },
  "Embedded Systems": { icon: Cpu, color: "#888888" },
  "UI/UX Design": { icon: SiFigma, color: "currentColor" },
};

export default function About() {
  const { theme } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const [githubData, setGithubData] = useState({
    repos: "0",
    followers: "0",
    stars: "0",
    forks: "0",
    commits: "0",
    contributions: "0",
    loading: true
  });

  const galleryImages = [
    {
      url: "/images/profile-pic.png",
      caption: "\"I pride myself on having an 'I'll figure it out' mindset no matter how hard the problem is.\""
    },
    {
      url: "/images/programming.png",
      caption: "Architecting high-performance web applications and hardware logic in VS Code."
    },
    {
      url: "/images/companion_bot.png",
      caption: "Meet my custom-built Desktop Companion Bot V1, a fusion of robotics and interactive design."
    }
  ];

  const [currentIdx, setCurrentIdx] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentIdx((prev) => (prev + 1) % galleryImages.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIdx((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  useGSAP(() => {
    // 1. Title Reveal
    gsap.fromTo(".about-title",
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
        }
      }
    );

    // 2. Image Parallax/Slow Zoom
    gsap.fromTo(".about-image",
      { scale: 1.1, y: 20 },
      {
        scale: 1,
        y: 0,
        scrollTrigger: {
          trigger: imageContainerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1.5,
        }
      }
    );

    // 3. Section Background Subtle Glow
    gsap.to(".about-glow", {
      opacity: 0.6,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }, { scope: sectionRef });

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
          reposData.forEach(repo => {
            totalStars += repo.stargazers_count;
            totalForks += repo.forks_count;
          });
        }

        const commitsRes = await fetch("https://api.github.com/search/commits?q=author:jlfuertes14", {
          headers: { "Accept": "application/vnd.github.cloak-preview" }
        });
        const commitsData = await commitsRes.json();

        const issuesRes = await fetch("https://api.github.com/search/issues?q=author:jlfuertes14");
        const issuesData = await issuesRes.json();

        setGithubData({
          repos: userData.public_repos?.toString() || "0",
          followers: userData.followers?.toString() || "0",
          stars: totalStars.toString(),
          forks: totalForks.toString(),
          commits: commitsData.total_count?.toString() || "0",
          contributions: ((commitsData.total_count || 0) + (issuesData.total_count || 0) + (userData.public_repos || 0)).toString(),
          loading: false
        });
      } catch (error) {
        console.error("Error fetching GitHub stats:", error);
        setGithubData(prev => ({ ...prev, loading: false }));
      }
    };

    fetchStats();
  }, []);

  const statsItems = [
    { label: "Repositories", value: githubData.repos },
    { label: "Total Stars", value: githubData.stars },
    { label: "Total Forks", value: githubData.forks },
    { label: "Commits", value: githubData.commits },
    { label: "Contributions", value: githubData.contributions },
    { label: "Followers", value: githubData.followers },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section id="about" ref={sectionRef} className="py-10 bg-background overflow-hidden relative scroll-mt-24">
      {/* Background Glow */}
      <div className="about-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] pointer-events-none opacity-40" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header: Centered Title */}
        <div ref={titleRef} className="text-center mb-8 overflow-hidden">
          <h1 className="about-title text-5xl md:text-7xl font-bold tracking-tight bg-linear-to-br from-foreground to-foreground/50 bg-clip-text text-transparent inline-block">
            About <span className="text-foreground">Me</span>
          </h1>
        </div>

        {/* Hero Content Grid */}
        <div className="grid gap-12 lg:grid-cols-2 items-stretch mb-16">
          {/* Left Column: Image Gallery Carousel */}
          <motion.div
            ref={imageContainerRef}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="relative h-[450px] lg:h-full min-h-[420px] rounded-3xl overflow-hidden group border border-border/50 bg-muted/20"
          >
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
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                  className="absolute inset-0"
                >
                  <Image
                    src={galleryImages[currentIdx].url}
                    alt={`Gallery ${currentIdx}`}
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Navigation Controls */}
              <div className="absolute inset-0 flex items-center justify-between p-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={prevSlide}
                  className="w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center backdrop-blur-md hover:bg-black/70 transition-all border border-white/10 group/btn"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-6 h-6 transition-transform group-hover/btn:-translate-x-0.5" />
                </button>
                <button
                  onClick={nextSlide}
                  className="w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center backdrop-blur-md hover:bg-black/70 transition-all border border-white/10 group/btn"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-6 h-6 transition-transform group-hover/btn:translate-x-0.5" />
                </button>
              </div>

              {/* Caption Overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 via-black/40 to-transparent p-8 pt-20 z-10 pointer-events-none">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentIdx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-white text-lg font-medium italic leading-relaxed"
                  >
                    {galleryImages[currentIdx].caption}
                  </motion.p>
                </AnimatePresence>

                {/* Dots indicator */}
                <div className="flex gap-1.5 mt-4">
                  {galleryImages.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 rounded-full transition-all duration-300 ${i === currentIdx ? 'w-6 bg-primary' : 'w-2 bg-white/30'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Bio & Details */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col gap-6 lg:pt-4 h-full"
          >
            <div className="space-y-8">
              <motion.div variants={itemVariants}>
                <h3 className="text-2xl md:text-3xl font-bold mb-6 leading-tight">
                  Aspiring Full Stack Developer & AI Engineer
                </h3>
                <div className="space-y-6 text-muted-foreground text-base leading-relaxed flex-grow mb-auto">
                  <p>
                    I’m a <span className="text-foreground font-bold">4th-year Computer Engineering student</span> specializing in that sweet spot where hardware circuits meet clean, scalable web apps. On the software side, I’m all about building intelligent web experiences using <span className="text-foreground font-bold">Gemini and Groq APIs</span> to power chatbots and implementing <span className="text-foreground font-bold">RAG systems</span> to make my projects hit differently. Whether I’m wrangling <span className="text-foreground font-bold">GraphQL</span>, building out <span className="text-foreground font-bold">RESTful APIs</span>, or tinkering with sensors, I focus on making the integration between the physical and digital seamless.
                  </p>
                  <p>
                    My real superpower? <span className="text-foreground font-bold">AI orchestration.</span> I’m a big believer in &quot;<span className="text-foreground font-bold">vibe coding</span>&quot; leveraging AI as a force multiplier to turn my visions into shippable features at light speed. I act as the architect, guiding the AI to build out the vision so I can focus on shipping fast and bridging the gap between software and hardware with robust hardware and even cleaner code.
                  </p>
                </div>
              </motion.div>

              <div className="grid lg:grid-cols-2 gap-6 items-stretch mt-auto">
                {/* Info List Card */}
                <motion.div
                  variants={itemVariants}
                  className="bg-muted/50 dark:bg-white/5 border border-border p-6 rounded-3xl flex flex-col justify-center space-y-6 group hover:border-foreground/20 transition-all duration-300 order-2 lg:order-1"
                >
                  <div className="flex items-center gap-4 text-lg group/item">
                    <div className="w-10 h-10 rounded-2xl bg-muted/50 flex items-center justify-center border border-border group-hover/item:border-foreground/20 transition-colors">
                      <MapPin className="w-5 h-5 text-muted-foreground group-hover/item:text-foreground transition-colors" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Location</p>
                      <p className="font-semibold text-foreground text-base">Taytay, Rizal, Philippines</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-lg group/item">
                    <div className="w-10 h-10 rounded-2xl bg-muted/50 flex items-center justify-center border border-border group-hover/item:border-foreground/20 transition-colors">
                      <GraduationCap className="w-5 h-5 text-muted-foreground group-hover/item:text-foreground transition-colors" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Education</p>
                      <p className="font-semibold text-foreground text-base">BS Computer Engineering</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-lg group/item">
                    <div className="w-10 h-10 rounded-2xl bg-muted/50 flex items-center justify-center border border-border group-hover/item:border-foreground/20 transition-colors">
                      <School className="w-5 h-5 text-muted-foreground group-hover/item:text-foreground transition-colors" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">University</p>
                      <p className="font-semibold text-foreground text-base">Rizal Technological University</p>
                    </div>
                  </div>
                </motion.div>

                {/* GitHub Featured Card */}
                <motion.div
                  variants={itemVariants}
                  className="bg-muted/50 dark:bg-white/5 border border-border p-6 rounded-3xl flex flex-col justify-between group hover:border-foreground/20 transition-all duration-300 order-1 lg:order-2 h-full"
                >
                  <div className="mb-6">
                    <div className="w-10 h-10 bg-foreground rounded-xl flex items-center justify-center mb-6 overflow-hidden">
                      <Github className="w-6 h-6 text-background" />
                    </div>
                    <h4 className="text-xl font-bold leading-tight">
                      Open Source Projects & Technical Contributions
                    </h4>
                  </div>
                  <Button variant="secondary" className="rounded-xl w-fit px-6 hover:bg-foreground hover:text-background transition-all" asChild>
                    <a href="https://github.com/jlfuertes14" target="_blank">
                      Explore GitHub
                      <ExternalLink className="ml-2 w-4 h-4" />
                    </a>
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Specialized Toolset */}
        <div className="py-16 border-t border-border/50">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground mb-12"
          >
            My Tech Stack
          </motion.p>
          <div className="flex flex-wrap justify-center gap-10 md:gap-16">
            {skills.map((skill, idx) => {
              const mapping = iconMap[skill.name] || { icon: Cpu, color: "#888888" };
              const Icon = mapping.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex flex-col items-center gap-3 group"
                >
                  <Icon
                    className="h-10 w-10 md:h-12 md:w-12 transition-all duration-300 group-hover:scale-110 drop-shadow-sm"
                    style={{ color: mapping.color }}
                  />
                  <span className="text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">
                    {skill.name}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* GitHub Stats Section - Maximized Layout */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-3xl bg-muted/50 dark:bg-white/5 border border-border p-8 md:p-12 mb-6"
        >
          <div className="flex flex-col gap-4 text-center md:text-left relative z-10">
            <h2 className="text-3xl font-bold tracking-tight text-foreground/90">GitHub Ecosystem</h2>
            <p className="max-w-screen-sm text-muted-foreground leading-relaxed">
              Real-time metrics from my open-source journey. Authenticated and synchronized with the official GitHub API.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center relative z-10">
            {statsItems.map((item, idx) => (
              <motion.div
                className="flex flex-col gap-1"
                key={idx}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * idx, type: "spring", stiffness: 100 }}
              >
                <p className="text-[10px] font-bold tracking-widest text-muted-foreground/60">{item.label}</p>
                <span className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-foreground">
                  {githubData.loading ? "..." : item.value}
                </span>
              </motion.div>
            ))}
          </div>

          <div className="pointer-events-none absolute inset-0 z-0 opacity-10 dark:opacity-[0.03]">
            <div className="absolute inset-0 bg-[radial-gradient(#000_1px,transparent_1px)] dark:bg-[radial-gradient(#fff_1px,transparent_1px)] bg-size-[20px_20px] mask-[radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
          </div>
        </motion.div>

        {/* GitHub Contribution Calendar - Separate Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative overflow-hidden rounded-3xl bg-background border border-border/50 p-8 md:p-12 flex flex-col items-center"
        >
          <div className="w-full flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-muted-foreground" />
              <h3 className="text-sm font-bold tracking-widest text-muted-foreground">Contribution History</h3>
            </div>
            <div className="text-[10px] font-medium text-muted-foreground/60 bg-muted/50 px-3 py-1 rounded-full border border-border/30">
              Last 12 Months
            </div>
          </div>

          <div className="w-full overflow-x-auto pb-4 flex justify-center">
            <div className="min-w-fit">
              <GitHubCalendar
                username="jlfuertes14"
                fontSize={12}
                blockSize={13}
                blockMargin={5}
                colorScheme={theme === "dark" ? "dark" : "light"}
                theme={{
                  light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
                  dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
                }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
