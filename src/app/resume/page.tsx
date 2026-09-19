"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Globe,
  Terminal,
  Check,
  Copy,
  ArrowUpRight,
  FileText,
} from "lucide-react";

type ResumeRole = "web-developer" | "software-engineer";

interface RoleConfig {
  id: ResumeRole;
  label: string;
  badgeLabel: string;
  title: string;
  pdfPath: string;
  pdfFileName: string;
  leadSummary: React.ReactNode;
  skills: {
    category: string;
    items: string[];
  }[];
}

const RESUME_ROLES: Record<ResumeRole, RoleConfig> = {
  "web-developer": {
    id: "web-developer",
    label: "Junior Web Developer",
    badgeLabel: "Web Dev Role",
    title: "Junior Web Developer",
    pdfPath: "/assets/JohnLesterFuertes-WebDeveloper.pdf",
    pdfFileName: "JohnLesterFuertes-WebDeveloper.pdf",
    leadSummary: (
      <>
        <b className="font-semibold text-foreground">Full Stack Web Developer</b> with hands-on
        experience building <b className="font-semibold text-foreground">AI-integrated applications</b> using
        Next.js, TypeScript, and Python. Proven track record in automating workflows, integrating modern
        LLM APIs, and leveraging autonomous agentic coding tools to rapidly architect scalable backends and
        production-grade web platforms.
      </>
    ),
    skills: [
      {
        category: "Frontend web development",
        items: [
          "TypeScript",
          "JavaScript",
          "Next.js (App Router)",
          "React",
          "Tailwind CSS",
          "HTML5/CSS3",
        ],
      },
      {
        category: "Backend & APIs",
        items: [
          "Python",
          "FastAPI",
          "Node.js",
          "Express.js",
          "Prisma ORM",
          "RESTful APIs",
          "GraphQL",
          "RBAC",
        ],
      },
      {
        category: "Databases",
        items: [
          "PostgreSQL",
          "MongoDB",
          "Supabase",
          "DuckDB",
          "SQLite",
          "MySQL",
        ],
      },
      {
        category: "Tools & deployment",
        items: [
          "Git/GitHub",
          "Vercel",
          "Docker",
          "GitHub Actions",
          "VS Code",
          "Postman",
        ],
      },
    ],
  },
  "software-engineer": {
    id: "software-engineer",
    label: "Junior Software Engineer",
    badgeLabel: "Software Eng Role",
    title: "Junior Software Engineer",
    pdfPath: "/assets/JohnLesterFuertes-SoftwareEngineer.pdf",
    pdfFileName: "JohnLesterFuertes-SoftwareEngineer.pdf",
    leadSummary: (
      <>
        <b className="font-semibold text-foreground">Junior Software Engineer</b> with a strong{" "}
        <b className="font-semibold text-foreground">Computer Engineering foundation</b>, system-level
        problem solving, and hands-on full-stack development experience. Proven track record in architecting
        high-efficiency APIs, relational database schemas, and AI-integrated systems using Python,
        TypeScript, and C++, with a passion for robust software architecture and automated workflows.
      </>
    ),
    skills: [
      {
        category: "Core systems & languages",
        items: [
          "TypeScript",
          "Python",
          "C / C++",
          "JavaScript",
          "SQL",
          "Bash / Shell",
          "Embedded Systems",
        ],
      },
      {
        category: "Backend & microservices",
        items: [
          "FastAPI",
          "Node.js",
          "Next.js (App Router)",
          "Express.js",
          "RESTful APIs",
          "GraphQL",
          "RBAC",
        ],
      },
      {
        category: "Databases & data modeling",
        items: [
          "PostgreSQL",
          "MongoDB",
          "Supabase",
          "DuckDB",
          "Prisma ORM",
          "SQLite",
          "MySQL",
        ],
      },
      {
        category: "DevOps & developer tooling",
        items: [
          "Git/GitHub",
          "Docker",
          "GitHub Actions",
          "Vercel",
          "Linux",
          "VS Code",
          "Postman",
        ],
      },
    ],
  },
};

export default function ResumePage() {
  const [activeRole, setActiveRole] = useState<ResumeRole>("web-developer");
  const [copiedEmail, setCopiedEmail] = useState(false);

  const roleData = RESUME_ROLES[activeRole];

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("johnlester.fuertes@gmail.com");
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary transition-colors duration-300">
      {/* Spacer for sticky navbar */}
      <div className="h-20 sm:h-24 md:h-28" />

      <main className="max-w-[1200px] mx-auto px-6 sm:px-8 md:px-10 lg:px-12 py-8 md:py-16">
        {/* ========================================================================= */}
        {/* HEADER SECTION (Inspired by Draft Dark Hero & Editorial Persona)         */}
        {/* ========================================================================= */}
        <section className="pb-16 md:pb-24 border-b border-border/40">
          {/* Top meta strip */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-border/40">
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase tracking-[0.2em] font-mono text-muted-foreground">
                Résumé
              </span>
              <span className="size-1 rounded-full bg-muted-foreground/40" />
              <span className="text-xs text-muted-foreground font-mono">
                {roleData.badgeLabel}
              </span>
            </div>

            {/* INTERACTIVE ROLE SWITCHER BUTTONS */}
            <div className="flex items-center p-1 rounded-full bg-muted/60 border border-border/60 backdrop-blur-sm">
              <button
                type="button"
                onClick={() => setActiveRole("web-developer")}
                aria-pressed={activeRole === "web-developer"}
                className={`relative px-4 py-1.5 text-xs sm:text-sm font-medium rounded-full transition-colors duration-200 flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none ${
                  activeRole === "web-developer"
                    ? "text-primary-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {activeRole === "web-developer" && (
                  <motion.span
                    layoutId="activeResumePill"
                    className="absolute inset-0 rounded-full bg-foreground shadow-sm"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  />
                )}
                <Globe className="relative z-10 size-3.5" aria-hidden="true" />
                <span className="relative z-10">Web Developer</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveRole("software-engineer")}
                aria-pressed={activeRole === "software-engineer"}
                className={`relative px-4 py-1.5 text-xs sm:text-sm font-medium rounded-full transition-colors duration-200 flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none ${
                  activeRole === "software-engineer"
                    ? "text-primary-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {activeRole === "software-engineer" && (
                  <motion.span
                    layoutId="activeResumePill"
                    className="absolute inset-0 rounded-full bg-foreground shadow-sm"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  />
                )}
                <Terminal className="relative z-10 size-3.5" aria-hidden="true" />
                <span className="relative z-10">Software Engineer</span>
              </button>
            </div>
          </div>

          {/* Editorial Display Name */}
          <h1 className="font-serif text-[42px] sm:text-[64px] md:text-[88px] lg:text-[104px] font-normal leading-[0.98] tracking-[-0.03em] my-10 md:my-14 text-foreground">
            John Lester C. Fuertes
          </h1>

          {/* Grid: Monogram/Role (Left 5 cols) & Facts/CTA (Right 7 cols) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left 5 cols */}
            <div className="md:col-span-5 space-y-6">
              <div className="flex items-center gap-5">
                <div
                  className="size-16 sm:size-20 rounded-full border border-border/80 bg-muted/30 flex items-center justify-center font-serif text-2xl sm:text-3xl text-foreground select-none relative overflow-hidden shadow-inner"
                  aria-label="John Lester Fuertes Avatar initials"
                >
                  <Image
                    src="/images/profile-dark.png"
                    alt="John Lester C. Fuertes"
                    width={80}
                    height={80}
                    priority
                    className="size-full object-cover rounded-full opacity-90 hover:opacity-100 transition-opacity"
                  />
                  <span className="sr-only">JF</span>
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-widest font-mono text-muted-foreground block mb-1">
                    Specialization
                  </span>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={roleData.title}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      className="font-serif text-2xl sm:text-3xl text-foreground/80 leading-tight"
                    >
                      {roleData.title}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-sm">
                Computer Engineering graduate specializing in production web platforms, automated
                pipelines, and AI microservices.
              </p>
            </div>

            {/* Right 7 cols: Contact Facts & Download CV */}
            <div className="md:col-span-7 space-y-8">
              <dl className="divide-y divide-border/50 border-t border-b border-border/50">
                <div className="flex items-center justify-between gap-4 py-3.5 group">
                  <dt className="text-xs uppercase tracking-wider font-mono text-muted-foreground flex items-center gap-2">
                    <Mail className="size-3.5 text-muted-foreground/70" aria-hidden="true" />
                    Email
                  </dt>
                  <dd className="text-sm sm:text-base font-medium text-foreground flex items-center gap-2 text-right">
                    <a
                      href="mailto:johnlester.fuertes@gmail.com"
                      className="hover:underline hover:text-primary transition-colors"
                    >
                      johnlester.fuertes@gmail.com
                    </a>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      aria-label="Copy email address"
                      className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                    >
                      {copiedEmail ? (
                        <Check className="size-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="size-3.5" />
                      )}
                    </button>
                  </dd>
                </div>

                <div className="flex items-center justify-between gap-4 py-3.5">
                  <dt className="text-xs uppercase tracking-wider font-mono text-muted-foreground flex items-center gap-2">
                    <Phone className="size-3.5 text-muted-foreground/70" aria-hidden="true" />
                    Phone
                  </dt>
                  <dd className="text-sm sm:text-base font-medium text-foreground text-right font-mono">
                    <a
                      href="tel:09774129580"
                      className="hover:underline hover:text-primary transition-colors"
                    >
                      09774129580
                    </a>
                  </dd>
                </div>

                <div className="flex items-center justify-between gap-4 py-3.5">
                  <dt className="text-xs uppercase tracking-wider font-mono text-muted-foreground flex items-center gap-2">
                    <MapPin className="size-3.5 text-muted-foreground/70" aria-hidden="true" />
                    Location
                  </dt>
                  <dd className="text-sm sm:text-base font-medium text-foreground text-right">
                    Taytay, Rizal, Philippines
                  </dd>
                </div>

                <div className="flex items-center justify-between gap-4 py-3.5">
                  <dt className="text-xs uppercase tracking-wider font-mono text-muted-foreground flex items-center gap-2">
                    <Linkedin className="size-3.5 text-muted-foreground/70" aria-hidden="true" />
                    LinkedIn
                  </dt>
                  <dd className="text-sm sm:text-base font-medium text-foreground text-right">
                    <a
                      href="https://linkedin.com/in/jlfuertes14"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 hover:underline hover:text-primary transition-colors"
                    >
                      <span>linkedin.com/in/jlfuertes14</span>
                      <ArrowUpRight className="size-3.5 opacity-60" aria-hidden="true" />
                    </a>
                  </dd>
                </div>

                <div className="flex items-center justify-between gap-4 py-3.5">
                  <dt className="text-xs uppercase tracking-wider font-mono text-muted-foreground flex items-center gap-2">
                    <Globe className="size-3.5 text-muted-foreground/70" aria-hidden="true" />
                    Website
                  </dt>
                  <dd className="text-sm sm:text-base font-medium text-foreground text-right">
                    <a
                      href="https://jlfuertes.dev"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 hover:underline hover:text-primary transition-colors"
                    >
                      <span>jlfuertes.dev</span>
                      <ArrowUpRight className="size-3.5 opacity-60" aria-hidden="true" />
                    </a>
                  </dd>
                </div>
              </dl>

              {/* Dynamic Download CV CTA */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
                <a
                  href={roleData.pdfPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-foreground text-background font-medium text-sm hover:opacity-90 transition-all duration-200 shadow-md group focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                >
                  <span>Download CV</span>
                  <Download className="size-4 group-hover:translate-y-0.5 transition-transform" aria-hidden="true" />
                </a>

                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-muted/40 border border-border/40 text-xs font-mono text-muted-foreground">
                  <FileText className="size-3.5 text-primary/70" aria-hidden="true" />
                  <span>{roleData.pdfFileName}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION: PROFESSIONAL SUMMARY                                            */}
        {/* ========================================================================= */}
        <section className="py-16 md:py-24 border-b border-border/40">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
            <h2 className="md:col-span-5 font-serif text-[30px] sm:text-[34px] md:text-[40px] font-normal leading-[1.1] tracking-[-0.01em] text-foreground">
              Professional summary
            </h2>
            <div className="md:col-span-7">
              <AnimatePresence mode="wait">
                <motion.p
                  key={roleData.id + "-summary"}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="font-serif text-[20px] sm:text-[23px] md:text-[26px] font-normal leading-[1.45] text-foreground/75"
                >
                  {roleData.leadSummary}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION: EXPERIENCE                                                      */}
        {/* ========================================================================= */}
        <section className="py-16 md:py-24 border-b border-border/40">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
            <h2 className="md:col-span-5 font-serif text-[30px] sm:text-[34px] md:text-[40px] font-normal leading-[1.1] tracking-[-0.01em] text-foreground">
              Experience
            </h2>
            <div className="md:col-span-7 space-y-12">
              {/* Item: Q Asia Magazine Inc. */}
              <article className="space-y-4">
                <header className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4">
                  <h3 className="font-serif text-[26px] sm:text-[30px] md:text-[34px] font-normal leading-[1.15] text-foreground">
                    Q Asia Magazine Inc.
                  </h3>
                  <time className="text-xs sm:text-sm font-mono text-muted-foreground shrink-0">
                    Feb 2026 – April 2026
                  </time>
                </header>
                <p className="text-xs sm:text-sm text-muted-foreground/80 font-medium">
                  Information Technology Intern · Mandaluyong City
                </p>
                <ul className="space-y-3 pt-2">
                  <li className="relative pl-6 text-sm sm:text-[15px] text-foreground/75 leading-relaxed max-w-[62ch] before:content-['–'] before:absolute before:left-0 before:text-muted-foreground/60">
                    Developed an automated email outreach application using Python, CustomTkinter, and
                    FastAPI, streamlining bulk client campaigns and saving 4 hours of manual work per
                    session.
                  </li>
                  <li className="relative pl-6 text-sm sm:text-[15px] text-foreground/75 leading-relaxed max-w-[62ch] before:content-['–'] before:absolute before:left-0 before:text-muted-foreground/60">
                    Programmed dynamic data parsing engines to handle Excel and CSV recipient databases,
                    automatically generating tailored HTML invitation templates for up to 150 businesses at
                    a time.
                  </li>
                  <li className="relative pl-6 text-sm sm:text-[15px] text-foreground/75 leading-relaxed max-w-[62ch] before:content-['–'] before:absolute before:left-0 before:text-muted-foreground/60">
                    Integrated security controls and batch throttling to prevent spam flags, alongside an
                    interactive browser-based previewer, successfully increasing overall outreach efficiency
                    by 60%.
                  </li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION: TECHNICAL PROJECTS                                              */}
        {/* ========================================================================= */}
        <section className="py-16 md:py-24 border-b border-border/40">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
            <h2 className="md:col-span-5 font-serif text-[30px] sm:text-[34px] md:text-[40px] font-normal leading-[1.1] tracking-[-0.01em] text-foreground">
              Technical projects
            </h2>
            <div className="md:col-span-7 space-y-12">
              {/* Project 1: AniVerse */}
              <article className="space-y-4">
                <header className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4">
                  <h3 className="font-serif text-[26px] sm:text-[30px] md:text-[32px] font-normal leading-[1.15] text-foreground">
                    AniVerse
                  </h3>
                </header>
                <p className="text-xs sm:text-sm text-muted-foreground/80 font-medium">
                  Anime Discovery and Streaming Platform
                </p>
                <ul className="space-y-3 pt-2">
                  <li className="relative pl-6 text-sm sm:text-[15px] text-foreground/75 leading-relaxed max-w-[62ch] before:content-['–'] before:absolute before:left-0 before:text-muted-foreground/60">
                    Built and deployed a full-stack anime discovery web app using Next.js, TypeScript,
                    FastAPI (Python), and MongoDB on Vercel.
                  </li>
                  <li className="relative pl-6 text-sm sm:text-[15px] text-foreground/75 leading-relaxed max-w-[62ch] before:content-['–'] before:absolute before:left-0 before:text-muted-foreground/60">
                    Aggregated metadata for over 27,000+ anime entries by integrating AniList (GraphQL) and
                    Jikan/MAL APIs, normalising disjointed data sources into a unified, indexed schema to
                    reduce search latency.
                  </li>
                  <li className="relative pl-6 text-sm sm:text-[15px] text-foreground/75 leading-relaxed max-w-[62ch] before:content-['–'] before:absolute before:left-0 before:text-muted-foreground/60">
                    Enhanced backend stability by isolating scraping procedures into asynchronous subprocess
                    jobs and implementing custom caching and merge logic to handle external API rate limits
                    seamlessly.
                  </li>
                </ul>
              </article>

              {/* Project 2: Vitae */}
              <article className="space-y-4 pt-8 border-t border-border/30">
                <header className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4">
                  <h3 className="font-serif text-[26px] sm:text-[30px] md:text-[32px] font-normal leading-[1.15] text-foreground">
                    Vitae
                  </h3>
                </header>
                <p className="text-xs sm:text-sm text-muted-foreground/80 font-medium">
                  AI Resume Builder
                </p>
                <ul className="space-y-3 pt-2">
                  <li className="relative pl-6 text-sm sm:text-[15px] text-foreground/75 leading-relaxed max-w-[62ch] before:content-['–'] before:absolute before:left-0 before:text-muted-foreground/60">
                    Developed a production-grade resume builder using Next.js (App Router), TypeScript, and
                    Prisma ORM, implementing Supabase authentication and real-time auto-save versioning on a
                    PostgreSQL database.
                  </li>
                  <li className="relative pl-6 text-sm sm:text-[15px] text-foreground/75 leading-relaxed max-w-[62ch] before:content-['–'] before:absolute before:left-0 before:text-muted-foreground/60">
                    Shipped 4 distinct AI features (rewrite, ATS scoring, job-match, cover letters) using a
                    dual-provider architecture (Groq + OpenRouter) to ensure 100% uptime and reliability
                    during LLM API outages.
                  </li>
                  <li className="relative pl-6 text-sm sm:text-[15px] text-foreground/75 leading-relaxed max-w-[62ch] before:content-['–'] before:absolute before:left-0 before:text-muted-foreground/60">
                    Secured application endpoints by engineering Upstash token-bucket rate limiting, input
                    sanitization pipelines, and strict authorization guardrails against prompt-injection
                    vulnerabilities.
                  </li>
                </ul>
              </article>

              {/* Project 3: GhostProject */}
              <article className="space-y-4 pt-8 border-t border-border/30">
                <header className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4">
                  <h3 className="font-serif text-[26px] sm:text-[30px] md:text-[32px] font-normal leading-[1.15] text-foreground">
                    GhostProject
                  </h3>
                </header>
                <p className="text-xs sm:text-sm text-muted-foreground/80 font-medium">
                  ML Flood Infrastructure Planning Platform
                </p>
                <ul className="space-y-3 pt-2">
                  <li className="relative pl-6 text-sm sm:text-[15px] text-foreground/75 leading-relaxed max-w-[62ch] before:content-['–'] before:absolute before:left-0 before:text-muted-foreground/60">
                    Developed a responsive full-stack web application using Next.js (App Router) and
                    TypeScript, leveraging React Server Components (RSC) to optimize data fetching for
                    downstream ML model predictions.
                  </li>
                  <li className="relative pl-6 text-sm sm:text-[15px] text-foreground/75 leading-relaxed max-w-[62ch] before:content-['–'] before:absolute before:left-0 before:text-muted-foreground/60">
                    Built an interactive geospatial dashboard utilizing React-Leaflet and Tailwind CSS to
                    seamlessly cluster, color-code, and render 9,855 nationwide data points flagged by an
                    XGBoost risk classification engine.
                  </li>
                  <li className="relative pl-6 text-sm sm:text-[15px] text-foreground/75 leading-relaxed max-w-[62ch] before:content-['–'] before:absolute before:left-0 before:text-muted-foreground/60">
                    Integrated asynchronous REST APIs using FastAPI and Python 3.11 to link the user
                    interface with an in-memory DuckDB database, achieving sub-second model inference
                    responses for predictive budget queries.
                  </li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION: EDUCATION                                                       */}
        {/* ========================================================================= */}
        <section className="py-16 md:py-24 border-b border-border/40">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
            <h2 className="md:col-span-5 font-serif text-[30px] sm:text-[34px] md:text-[40px] font-normal leading-[1.1] tracking-[-0.01em] text-foreground">
              Education
            </h2>
            <div className="md:col-span-7 space-y-10">
              {/* College */}
              <article className="space-y-3">
                <header className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4">
                  <h3 className="font-serif text-[26px] sm:text-[30px] md:text-[32px] font-normal leading-[1.15] text-foreground">
                    Rizal Technological University
                  </h3>
                  <time className="text-xs sm:text-sm font-mono text-muted-foreground shrink-0">
                    Aug 2022 – July 2026
                  </time>
                </header>
                <p className="text-xs sm:text-sm text-muted-foreground/80 font-medium">
                  Bachelor of Science in Computer Engineering · Maybunga, Pasig
                </p>
                <p className="text-xs sm:text-sm text-foreground/70 italic max-w-[58ch]">
                  Capstone Thesis: HatchWatch — IoT &amp; AI-based Egg Incubator system for Philippine
                  Mallard Ducks.
                </p>
              </article>

              {/* High School */}
              <article className="space-y-3 pt-8 border-t border-border/30">
                <header className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4">
                  <h3 className="font-serif text-[24px] sm:text-[26px] md:text-[28px] font-normal leading-[1.15] text-foreground">
                    Buting Senior High School
                  </h3>
                  <time className="text-xs sm:text-sm font-mono text-muted-foreground shrink-0">
                    2020 – 2022
                  </time>
                </header>
                <p className="text-xs sm:text-sm text-muted-foreground/80 font-medium">
                  STEM Strand (Honors) · Pasig City
                </p>
                <p className="text-xs sm:text-sm text-foreground/70 max-w-[58ch]">
                  Graduated with 94% GPA with Honors. STEM Research Lead on Piezoelectric energy generation.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION: TECHNICAL SKILLS                                                */}
        {/* ========================================================================= */}
        <section className="py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
            <div className="md:col-span-5 space-y-4">
              <h2 className="font-serif text-[30px] sm:text-[34px] md:text-[40px] font-normal leading-[1.1] tracking-[-0.01em] text-foreground">
                Technical skills
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground font-mono">
                Dynamically adapted for:{" "}
                <span className="text-foreground font-semibold underline underline-offset-4">
                  {roleData.label}
                </span>
              </p>
            </div>

            <dl className="md:col-span-7 divide-y divide-border/40">
              {roleData.skills.map((skillGroup, idx) => (
                <div
                  key={skillGroup.category + idx}
                  className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-6 py-6 first:pt-0 last:pb-0"
                >
                  <dt className="sm:col-span-4 text-xs sm:text-sm font-mono text-muted-foreground/80 pt-1">
                    {skillGroup.category}
                  </dt>
                  <dd className="sm:col-span-8 flex flex-wrap gap-x-5 gap-y-2 font-serif text-[20px] sm:text-[22px] md:text-[24px] text-foreground/90">
                    {skillGroup.items.map((item, itemIdx) => (
                      <span
                        key={item + itemIdx}
                        className="hover:text-primary transition-colors cursor-default"
                      >
                        {item}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* FOOTER / CALL TO ACTION STRIP                                             */}
        {/* ========================================================================= */}
        <div className="pt-12 mt-12 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
            >
              <span>Get in touch directly</span>
              <ArrowUpRight className="size-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
            <span className="size-1 rounded-full bg-border" />
            <Link
              href="/"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Back to Home
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={roleData.pdfPath}
              download
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-muted/60 hover:bg-muted text-xs sm:text-sm font-medium text-foreground transition-colors border border-border/60"
            >
              <Download className="size-3.5" aria-hidden="true" />
              <span>Download {roleData.badgeLabel}</span>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
