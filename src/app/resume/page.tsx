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
  Github,
  Globe,
  Terminal,
  Check,
  Copy,
  ArrowUpRight,
  FileText,
} from "lucide-react";

type ResumeRole = "web-developer" | "software-engineer";

interface ResumeProject {
  name: string;
  subtitle: string;
  bullets: string[];
}

interface RoleConfig {
  id: ResumeRole;
  label: string;
  badgeLabel: string;
  title: string;
  shortBio: string;
  pdfPath: string;
  pdfFileName: string;
  leadSummary: React.ReactNode;
  projects: ResumeProject[];
  skills: {
    category: string;
    items: string[];
  }[];
}

const CINCINNATI_HOTEL_PROJECT: ResumeProject = {
  name: "Cincinnati Hotel",
  subtitle: "AI Chat Bot & Hotel Operations Platform",
  bullets: [
    "Built a full-stack AI hotel concierge web app using React, TypeScript, Node.js, and SQLite that answers guest questions across 8+ hotel topics from uploaded PDF brochures, cutting routine front-desk inquiries by 70%.",
    "Automated 3 core hotel workflows using n8n and Mistral AI: brochure PDF extraction, smart chat replies, and staff email alerts summarizing and escalating unanswered guest requests in under 5 seconds.",
    "Developed a live admin dashboard that tracks total chat sessions, topic trends, and unresolved inquiries in real time, allowing staff to update the hotel's knowledge base with a new PDF in 1 click.",
  ],
};

const YOMITE_PROJECT: ResumeProject = {
  name: "Yomite",
  subtitle: "Mobile & Web Manga Reader App",
  bullets: [
    "Developed a mobile and web manga reader app from scratch using React Native, TypeScript, Node.js and Firebase, reaching 120+ downloads across 8 official releases while cutting app install size by 58% for Android users.",
    "Built a unified search and catalog system that combines 25+ active manga sources into one app, using smart caching and batch loading to speed up browsing by 65%.",
    "Created a cloud sync and offline download system alongside an automated update notifier, allowing users to read seamlessly without internet and receive instant alerts for new releases.",
  ],
};

const RESUME_ROLES: Record<ResumeRole, RoleConfig> = {
  "web-developer": {
    id: "web-developer",
    label: "Junior Web Developer",
    badgeLabel: "Web Dev Role",
    title: "Junior Web Developer",
    shortBio:
      "Full-stack web developer building AI-integrated web platforms, scalable APIs, and automated workflows.",
    pdfPath: "/assets/JohnLesterFuertes-WebDeveloper.pdf",
    pdfFileName: "JohnLesterFuertes-WebDeveloper.pdf",
    leadSummary: (
      <>
        <strong className="font-semibold text-foreground">
          Full Stack Web Developer
        </strong>{" "}
        with hands-on experience building{" "}
        <strong className="font-semibold text-foreground">
          AI-integrated applications
        </strong>{" "}
        using Next.js, TypeScript, and Python. Proven track record in automating
        workflows, integrating modern LLM APIs, and leveraging autonomous
        agentic coding tools to rapidly architect scalable backends and
        production-grade web platforms.
      </>
    ),
    projects: [
      {
        name: "AniVerse",
        subtitle: "Anime Discovery and Streaming Platform",
        bullets: [
          "Built and deployed a full-stack anime discovery web app using Next.js, TypeScript, FastAPI (Python), and MongoDB on Vercel.",
          "Aggregated metadata for over 27,000+ anime entries by integrating AniList (GraphQL) and Jikan/MAL APIs, normalising disjointed data sources into a unified, indexed schema to reduce search latency.",
          "Enhanced backend stability by isolating scraping procedures into asynchronous subprocess jobs and implementing custom caching and merge logic to handle external API rate limits seamlessly.",
        ],
      },
      CINCINNATI_HOTEL_PROJECT,
      YOMITE_PROJECT,
    ],
    skills: [
      {
        category: "Languages",
        items: ["TypeScript", "JavaScript", "Python", "HTML/CSS"],
      },
      {
        category: "Frontend",
        items: [
          "React",
          "React Native (Expo)",
          "Next.js (App Router)",
          "Tailwind CSS",
        ],
      },
      {
        category: "Backend & databases",
        items: [
          "PostgreSQL",
          "DuckDB",
          "SQLite",
          "MongoDB",
          "Node.js",
          "Express.js",
          "FastAPI",
          "REST/GraphQL APIs",
        ],
      },
      {
        category: "Developer & AI tools",
        items: [
          "Git/GitHub",
          "Docker",
          "GitHub Actions (CI/CD)",
          "VS Code",
          "Claude Code",
          "Codex",
          "Antigravity",
          "Postman",
          "Vercel",
          "Render",
          "Firebase",
          "Supabase",
          "n8n",
        ],
      },
    ],
  },
  "software-engineer": {
    id: "software-engineer",
    label: "Junior Software Engineer",
    badgeLabel: "Software Eng Role",
    title: "Junior Software Engineer",
    shortBio:
      "Computer Engineering graduate shipping cross-platform mobile apps, web platforms, and practical AI automations.",
    pdfPath: "/assets/JohnLesterFuertes-SoftwareEngineer.pdf",
    pdfFileName: "JohnLesterFuertes-SoftwareEngineer.pdf",
    leadSummary: (
      <>
        <strong className="font-semibold text-foreground">
          Computer Engineering graduate
        </strong>{" "}
        and{" "}
        <strong className="font-semibold text-foreground">
          Full-Stack Developer
        </strong>{" "}
        skilled in building cross-platform mobile apps, web platforms, and
        practical AI automations. Experienced in shipping end-to-end software
        using React, React Native, Next.js, TypeScript, Node.js, Python
        (FastAPI), and n8n to streamline operations and deliver fast,
        user-focused products.
      </>
    ),
    projects: [
      YOMITE_PROJECT,
      {
        name: "LaVida Pharmacy",
        subtitle: "Pharmacy Management System & POS",
        bullets: [
          "Engineered a secure Role-Based Access Control (RBAC) system within a pharmacy desktop application using C#, .NET, and Windows Forms in Visual Studio to strictly partition system privileges between Managers and Pharmacists.",
          "Developed an automated checkout and Point of Sale (POS) engine that mathematically processes prescriptions, applies a 12% Value Added Tax (VAT), and deducts a 20% discount for eligible Senior and PWD customers.",
          "Programmed an inventory monitoring system that aggregates product shelf data, surfaces automated alerts for critical medicine shortages, and tracks expiring products within a 3-month window.",
        ],
      },
      CINCINNATI_HOTEL_PROJECT,
    ],
    skills: [
      {
        category: "Languages",
        items: ["TypeScript", "JavaScript", "Python", "C#", "HTML/CSS"],
      },
      {
        category: "Frontend",
        items: [
          "React",
          "React Native (Expo)",
          "Next.js (App Router)",
          "Tailwind CSS",
          "Windows Forms (.NET)",
          "Tkinter",
        ],
      },
      {
        category: "Backend & databases",
        items: [
          "PostgreSQL",
          "DuckDB",
          "SQLite",
          "MongoDB",
          "Node.js",
          "Express.js",
          "FastAPI",
          "REST/GraphQL APIs",
        ],
      },
      {
        category: "Developer & AI tools",
        items: [
          "Git/GitHub",
          "Docker",
          "GitHub Actions (CI/CD)",
          "VS Code",
          "Claude Code",
          "Codex",
          "Antigravity",
          "Postman",
          "Vercel",
          "Render",
          "Firebase",
          "Supabase",
          "n8n",
        ],
      },
    ],
  },
};

export default function ResumePage() {
  const [activeRole, setActiveRole] = useState<ResumeRole>("software-engineer");
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
    <div className="min-h-[100dvh] bg-background text-foreground selection:bg-primary/30 selection:text-primary">
      {/* Spacer for sticky navbar */}
      <div className="h-20 sm:h-24 md:h-28" />

      <main className="mx-auto w-full max-w-[1160px] px-6 sm:px-8 lg:px-10 py-6 md:py-12">
        {/* ========================================================================= */}
        {/* HEADER SECTION                                                            */}
        {/* ========================================================================= */}
        <section className="pb-12 md:pb-16 border-b border-border/50">
          {/* Role switcher */}
          <div className="flex items-center justify-end pb-5 border-b border-border/50">
            {/* Interactive Role Switcher */}
            <div className="flex items-center p-1 rounded-full bg-muted/60 border border-border/60 backdrop-blur-sm">
              <button
                type="button"
                onClick={() => setActiveRole("web-developer")}
                aria-pressed={activeRole === "web-developer"}
                className={`relative min-h-[36px] px-3.5 py-1.5 text-xs sm:text-[13px] font-medium rounded-full transition-colors duration-200 flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none cursor-pointer ${
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
                className={`relative min-h-[36px] px-3.5 py-1.5 text-xs sm:text-[13px] font-medium rounded-full transition-colors duration-200 flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none cursor-pointer ${
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
                <Terminal
                  className="relative z-10 size-3.5"
                  aria-hidden="true"
                />
                <span className="relative z-10">Software Engineer</span>
              </button>
            </div>
          </div>

          {/* Display Name (Main Site Space Grotesk Typography) */}
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl font-bold leading-[1.04] tracking-tight my-8 md:my-10 text-foreground">
            John Lester C. Fuertes<span className="text-primary">.</span>
          </h1>

          {/* Grid: Role (Left 5 cols) & Contact Facts / CTA (Right 7 cols) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left 5 cols */}
            <div className="md:col-span-5 space-y-5">
              <div className="flex items-center gap-4">
                <div
                  className="size-14 sm:size-16 rounded-full border border-border/80 bg-muted/30 flex items-center justify-center shrink-0 relative overflow-hidden shadow-inner"
                  aria-label="John Lester Fuertes avatar"
                >
                  <Image
                    src="/images/profile-dark.png"
                    alt="John Lester C. Fuertes"
                    width={64}
                    height={64}
                    priority
                    className="size-full object-cover rounded-full opacity-95 hover:opacity-100 transition-opacity"
                  />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-[0.14em] font-mono text-muted-foreground block mb-0.5">
                    Specialization
                  </span>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={roleData.title}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      className="font-heading text-xl sm:text-2xl font-semibold tracking-tight text-foreground leading-tight"
                    >
                      {roleData.title}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-sm text-pretty">
                {roleData.shortBio}
              </p>
            </div>

            {/* Right 7 cols: Contact Facts & Download CV */}
            <div className="md:col-span-7 space-y-6">
              <dl className="divide-y divide-border/50 border-t border-b border-border/50">
                <div className="flex items-center justify-between gap-4 py-2.5 sm:py-3">
                  <dt className="text-[11px] sm:text-xs uppercase tracking-[0.12em] font-mono text-muted-foreground flex items-center gap-2">
                    <Mail
                      className="size-3.5 text-muted-foreground/70"
                      aria-hidden="true"
                    />
                    Email
                  </dt>
                  <dd className="text-xs sm:text-sm font-medium text-foreground flex items-center gap-2 text-right">
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
                      className="inline-flex size-7 items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none cursor-pointer"
                    >
                      {copiedEmail ? (
                        <Check
                          className="size-3.5 text-emerald-500"
                          aria-hidden="true"
                        />
                      ) : (
                        <Copy className="size-3.5" aria-hidden="true" />
                      )}
                    </button>
                  </dd>
                </div>

                <div className="flex items-center justify-between gap-4 py-2.5 sm:py-3">
                  <dt className="text-[11px] sm:text-xs uppercase tracking-[0.12em] font-mono text-muted-foreground flex items-center gap-2">
                    <Phone
                      className="size-3.5 text-muted-foreground/70"
                      aria-hidden="true"
                    />
                    Phone
                  </dt>
                  <dd className="text-xs sm:text-sm font-medium text-foreground text-right font-mono tabular-nums">
                    <a
                      href="tel:09774129580"
                      className="hover:underline hover:text-primary transition-colors"
                    >
                      09774129580
                    </a>
                  </dd>
                </div>

                <div className="flex items-center justify-between gap-4 py-2.5 sm:py-3">
                  <dt className="text-[11px] sm:text-xs uppercase tracking-[0.12em] font-mono text-muted-foreground flex items-center gap-2">
                    <MapPin
                      className="size-3.5 text-muted-foreground/70"
                      aria-hidden="true"
                    />
                    Location
                  </dt>
                  <dd className="text-xs sm:text-sm font-medium text-foreground text-right">
                    Taytay, Rizal, Philippines
                  </dd>
                </div>

                <div className="flex items-center justify-between gap-4 py-2.5 sm:py-3">
                  <dt className="text-[11px] sm:text-xs uppercase tracking-[0.12em] font-mono text-muted-foreground flex items-center gap-2">
                    <Linkedin
                      className="size-3.5 text-muted-foreground/70"
                      aria-hidden="true"
                    />
                    LinkedIn
                  </dt>
                  <dd className="text-xs sm:text-sm font-medium text-foreground text-right">
                    <a
                      href="https://linkedin.com/in/jlfuertes14"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 hover:underline hover:text-primary transition-colors"
                    >
                      <span>linkedin.com/in/jlfuertes14</span>
                      <ArrowUpRight
                        className="size-3.5 opacity-60"
                        aria-hidden="true"
                      />
                    </a>
                  </dd>
                </div>

                <div className="flex items-center justify-between gap-4 py-2.5 sm:py-3">
                  <dt className="text-[11px] sm:text-xs uppercase tracking-[0.12em] font-mono text-muted-foreground flex items-center gap-2">
                    <Github
                      className="size-3.5 text-muted-foreground/70"
                      aria-hidden="true"
                    />
                    GitHub
                  </dt>
                  <dd className="text-xs sm:text-sm font-medium text-foreground text-right">
                    <a
                      href="https://github.com/jlfuertes14"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 hover:underline hover:text-primary transition-colors"
                    >
                      <span>github.com/jlfuertes14</span>
                      <ArrowUpRight
                        className="size-3.5 opacity-60"
                        aria-hidden="true"
                      />
                    </a>
                  </dd>
                </div>

                <div className="flex items-center justify-between gap-4 py-2.5 sm:py-3">
                  <dt className="text-[11px] sm:text-xs uppercase tracking-[0.12em] font-mono text-muted-foreground flex items-center gap-2">
                    <Globe
                      className="size-3.5 text-muted-foreground/70"
                      aria-hidden="true"
                    />
                    Website
                  </dt>
                  <dd className="text-xs sm:text-sm font-medium text-foreground text-right">
                    <a
                      href="https://jlfuertes.dev"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 hover:underline hover:text-primary transition-colors"
                    >
                      <span>jlfuertes.dev</span>
                      <ArrowUpRight
                        className="size-3.5 opacity-60"
                        aria-hidden="true"
                      />
                    </a>
                  </dd>
                </div>
              </dl>

              {/* Dynamic Download CV CTA */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-1">
                <a
                  href={roleData.pdfPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[42px] items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-foreground text-background font-medium text-xs sm:text-sm hover:opacity-90 active:scale-[0.97] transition-[opacity,transform] duration-200 shadow-md group focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                >
                  <span>Download CV</span>
                  <Download
                    className="size-3.5 group-hover:translate-y-0.5 transition-transform"
                    aria-hidden="true"
                  />
                </a>

                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/40 border border-border/50 text-[11px] sm:text-xs font-mono text-muted-foreground">
                  <FileText
                    className="size-3.5 text-primary/70 shrink-0"
                    aria-hidden="true"
                  />
                  <span>{roleData.pdfFileName}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION: PROFESSIONAL SUMMARY                                             */}
        {/* ========================================================================= */}
        <section className="py-11 md:py-16 border-b border-border/50">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-12">
            <h2 className="md:col-span-5 font-heading text-2xl sm:text-[28px] lg:text-[32px] font-bold leading-[1.1] tracking-tight text-foreground">
              Professional summary
            </h2>
            <div className="md:col-span-7">
              <AnimatePresence mode="wait">
                <motion.p
                  key={roleData.id + "-summary"}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.22 }}
                  className="text-base sm:text-lg font-normal leading-[1.65] text-foreground/80 text-pretty max-w-[66ch]"
                >
                  {roleData.leadSummary}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION: EDUCATION                                                        */}
        {/* ========================================================================= */}
        <section className="py-11 md:py-16 border-b border-border/50">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-12">
            <h2 className="md:col-span-5 font-heading text-2xl sm:text-[28px] lg:text-[32px] font-bold leading-[1.1] tracking-tight text-foreground">
              Education
            </h2>
            <div className="md:col-span-7 space-y-8">
              <article className="space-y-1.5">
                <header className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4">
                  <h3 className="font-heading text-xl sm:text-2xl font-semibold tracking-tight leading-snug text-foreground">
                    Rizal Technological University
                  </h3>
                  <time className="text-xs sm:text-[13px] font-mono text-muted-foreground tabular-nums shrink-0">
                    Aug 2022 – July 2026
                  </time>
                </header>
                <p className="text-xs sm:text-sm text-muted-foreground font-medium">
                  Bachelor of Science in Computer Engineering · Maybunga, Pasig
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION: EXPERIENCE                                                       */}
        {/* ========================================================================= */}
        <section className="py-11 md:py-16 border-b border-border/50">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-12">
            <h2 className="md:col-span-5 font-heading text-2xl sm:text-[28px] lg:text-[32px] font-bold leading-[1.1] tracking-tight text-foreground">
              Experience
            </h2>
            <div className="md:col-span-7 space-y-10">
              <article className="space-y-3">
                <header className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4">
                  <h3 className="font-heading text-xl sm:text-2xl font-semibold tracking-tight leading-snug text-foreground">
                    Q Asia Magazine Inc.
                  </h3>
                  <time className="text-xs sm:text-[13px] font-mono text-muted-foreground tabular-nums shrink-0">
                    Feb 2026 – April 2026
                  </time>
                </header>
                <p className="text-xs sm:text-sm text-muted-foreground font-medium">
                  Information Technology Intern · Mandaluyong City
                </p>
                <ul className="space-y-2.5 pt-1.5">
                  <li className="relative pl-5 text-sm sm:text-[15px] text-foreground/80 leading-[1.65] max-w-[66ch] before:content-['–'] before:absolute before:left-0 before:text-muted-foreground/70">
                    Developed an automated email outreach application using
                    Python, CustomTkinter, and FastAPI, streamlining bulk client
                    campaigns and saving 4 hours of manual work per session.
                  </li>
                  <li className="relative pl-5 text-sm sm:text-[15px] text-foreground/80 leading-[1.65] max-w-[66ch] before:content-['–'] before:absolute before:left-0 before:text-muted-foreground/70">
                    Programmed dynamic data parsing engines to handle Excel and
                    CSV recipient databases, automatically generating tailored
                    HTML invitation templates for up to 150 businesses at a
                    time.
                  </li>
                  <li className="relative pl-5 text-sm sm:text-[15px] text-foreground/80 leading-[1.65] max-w-[66ch] before:content-['–'] before:absolute before:left-0 before:text-muted-foreground/70">
                    Integrated security controls and batch throttling to prevent
                    spam flags, alongside an interactive browser-based
                    previewer, successfully increasing overall outreach
                    efficiency by 60%.
                  </li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION: TECHNICAL PROJECTS (ROLE-SPECIFIC)                               */}
        {/* ========================================================================= */}
        <section className="py-11 md:py-16 border-b border-border/50">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-12">
            <div className="md:col-span-5 space-y-2">
              <h2 className="font-heading text-2xl sm:text-[28px] lg:text-[32px] font-bold leading-[1.1] tracking-tight text-foreground">
                Technical projects
              </h2>
              <p className="text-xs text-muted-foreground font-mono">
                Tailored for:{" "}
                <span className="text-foreground font-semibold">
                  {roleData.label}
                </span>
              </p>
            </div>

            <div className="md:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={roleData.id + "-projects"}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.22 }}
                  className="space-y-9"
                >
                  {roleData.projects.map((project, idx) => (
                    <article
                      key={project.name}
                      className={`space-y-2.5 ${
                        idx > 0 ? "pt-8 border-t border-border/40" : ""
                      }`}
                    >
                      <header className="space-y-0.5">
                        <h3 className="font-heading text-xl sm:text-2xl font-semibold tracking-tight leading-snug text-foreground">
                          {project.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-muted-foreground font-medium">
                          {project.subtitle}
                        </p>
                      </header>
                      <ul className="space-y-2.5 pt-1.5">
                        {project.bullets.map((bullet, bIdx) => (
                          <li
                            key={bIdx}
                            className="relative pl-5 text-sm sm:text-[15px] text-foreground/80 leading-[1.65] max-w-[66ch] before:content-['–'] before:absolute before:left-0 before:text-muted-foreground/70"
                          >
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </article>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION: TECHNICAL SKILLS                                                 */}
        {/* ========================================================================= */}
        <section className="py-11 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-12">
            <div className="md:col-span-5 space-y-2">
              <h2 className="font-heading text-2xl sm:text-[28px] lg:text-[32px] font-bold leading-[1.1] tracking-tight text-foreground">
                Technical skills
              </h2>
              <p className="text-xs text-muted-foreground font-mono">
                Tailored for:{" "}
                <span className="text-foreground font-semibold">
                  {roleData.label}
                </span>
              </p>
            </div>

            <div className="md:col-span-7">
              <AnimatePresence mode="wait">
                <motion.dl
                  key={roleData.id + "-skills"}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.22 }}
                  className="divide-y divide-border/50"
                >
                  {roleData.skills.map((skillGroup, idx) => (
                    <div
                      key={skillGroup.category + idx}
                      className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 sm:gap-5 py-4 first:pt-0 last:pb-0"
                    >
                      <dt className="sm:col-span-4 text-[11px] sm:text-xs font-mono uppercase tracking-[0.08em] text-muted-foreground pt-1">
                        {skillGroup.category}
                      </dt>
                      <dd className="sm:col-span-8 flex flex-wrap gap-x-4 gap-y-2 font-heading text-sm sm:text-base font-medium tracking-tight text-foreground/90">
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
                </motion.dl>
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* FOOTER / CALL TO ACTION STRIP                                             */}
        {/* ========================================================================= */}
        <div className="pt-8 mt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <Link
              href="/#contact"
              className="inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
            >
              <span>Get in touch directly</span>
              <ArrowUpRight
                className="size-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                aria-hidden="true"
              />
            </Link>
            <span className="size-1 rounded-full bg-border" />
            <Link
              href="/"
              className="inline-flex min-h-[44px] items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Back to Home
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={roleData.pdfPath}
              download
              className="inline-flex min-h-[44px] items-center gap-2 px-5 py-2.5 rounded-full bg-muted/60 hover:bg-muted active:scale-[0.97] text-xs sm:text-sm font-medium text-foreground transition-[background-color,transform] duration-200 border border-border/60 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
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
