"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Download,
  ArrowLeft,
  ExternalLink,
  GraduationCap,
  Briefcase,
  Trophy,
  Code2,
  Wrench,
  Languages,
  Gamepad2,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 selection:text-primary">
      {/* Spacer for sticky navbar */}
      <div className="h-20" />

      {/* Floating Download PDF button */}
      <div className="fixed top-20 right-6 md:right-12 z-40">
        <a
          href="/assets/resume.pdf"
          download="John_Lester_Fuertes_Resume.pdf"
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 shadow-lg"
        >
          <Download className="h-4 w-4" />
          Download PDF
        </a>
      </div>

      <main className="mx-auto max-w-7xl px-6 py-12 md:px-12 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[320px_1fr]">
          {/* Sidebar */}
          <aside className="space-y-10 lg:sticky lg:top-24 lg:self-start">
            {/* Profile */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center lg:text-left"
            >
              <div className="relative mx-auto h-32 w-32 overflow-hidden rounded-full border-2 border-primary/20 lg:mx-0">
                <Image
                  src="/images/profile-dark.png"
                  alt="John Lester Fuertes"
                  fill
                  className="object-cover"
                />
              </div>
              <h1 className="mt-6 text-2xl font-bold tracking-tight font-heading">
                John Lester C. Fuertes
              </h1>
              <p className="mt-2 text-sm text-foreground/60 font-medium uppercase tracking-wider">
                Computer Engineering Student
              </p>
            </motion.div>

            {/* Contact */}
            <motion.section
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="space-y-4"
            >
              <h2 className="text-xs font-semibold uppercase tracking-widest text-primary font-heading">
                Contact
              </h2>
              <div className="space-y-3">
                <motion.a
                  variants={fadeInUp}
                  href="mailto:johnlester.fuertes@gmail.com"
                  className="flex items-center gap-3 text-sm text-foreground/70 transition-colors hover:text-primary"
                >
                  <Mail className="h-4 w-4 shrink-0" />
                  johnlester.fuertes@gmail.com
                </motion.a>
                <motion.div
                  variants={fadeInUp}
                  className="flex items-center gap-3 text-sm text-foreground/70"
                >
                  <Phone className="h-4 w-4 shrink-0" />
                  09774129580
                </motion.div>
                <motion.div
                  variants={fadeInUp}
                  className="flex items-center gap-3 text-sm text-foreground/70"
                >
                  <MapPin className="h-4 w-4 shrink-0" />
                  Taytay, Rizal, Philippines
                </motion.div>
                <motion.a
                  variants={fadeInUp}
                  href="https://github.com/jlfuertes14"
                  target="_blank"
                  className="flex items-center gap-3 text-sm text-foreground/70 transition-colors hover:text-primary"
                >
                  <Github className="h-4 w-4 shrink-0" />
                  github.com/jlfuertes14
                </motion.a>
              </div>
            </motion.section>

            {/* Skills */}
            <motion.section
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="space-y-4"
            >
              <h2 className="text-xs font-semibold uppercase tracking-widest text-primary font-heading">
                Technical Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {[
                  "HTML/CSS",
                  "JavaScript",
                  "React",
                  "Next.js",
                  "Node.js",
                  "MongoDB",
                  "C++/Arduino",
                  "C#",
                  "Python",
                  "MicroPython",
                  "ESP32",
                  "Embedded Systems",
                ].map((skill) => (
                  <motion.span
                    key={skill}
                    variants={fadeInUp}
                    className="rounded-md border border-border bg-card/50 px-2 py-1 text-xs font-medium text-foreground/70"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.section>

            {/* Tools */}
            <motion.section
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="space-y-4"
            >
              <h2 className="text-xs font-semibold uppercase tracking-widest text-primary font-heading">
                Software & Tools
              </h2>
              <div className="flex flex-wrap gap-2">
                {[
                  "VS Code",
                  "Visual Studio",
                  "Arduino IDE",
                  "Thonny",
                  "KiCAD",
                  "TinkerCAD",
                  "MATLAB",
                  "Git/GitHub",
                ].map((tool) => (
                  <motion.span
                    key={tool}
                    variants={fadeInUp}
                    className="rounded-md border border-border bg-card/50 px-2 py-1 text-xs font-medium text-foreground/70"
                  >
                    {tool}
                  </motion.span>
                ))}
              </div>
            </motion.section>

            {/* Languages */}
            <motion.section
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="space-y-4"
            >
              <h2 className="text-xs font-semibold uppercase tracking-widest text-primary font-heading">
                Languages
              </h2>
              <div className="space-y-2">
                <motion.div variants={fadeInUp} className="flex justify-between text-sm">
                  <span className="text-foreground/70">English</span>
                  <span className="text-foreground/50 italic">Proficient</span>
                </motion.div>
                <motion.div variants={fadeInUp} className="flex justify-between text-sm">
                  <span className="text-foreground/70">Tagalog</span>
                  <span className="text-foreground/50 italic">Proficient</span>
                </motion.div>
              </div>
            </motion.section>
          </aside>

          {/* Main Content */}
          <div className="space-y-16">
            {/* Education */}
            <section className="space-y-8">
              <div className="flex items-center gap-3 border-b border-border pb-4">
                <GraduationCap className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold tracking-tight font-heading">Education</h2>
              </div>
              <div className="space-y-10">
                <TimelineItem
                  title="Bachelor of Science in Computer Engineering"
                  date="Expected Graduation: 2026"
                  location="Rizal Technological University, Maybunga, Pasig"
                  description={
                    <p>
                      <strong className="text-primary/90">Thesis:</strong> Design and Development of an IoT and
                      AI-based Egg Incubator and Hatching System for Philippine Mallard
                      Duck (HatchWatch)
                    </p>
                  }
                />
                <TimelineItem
                  title="Senior High School - STEM Strand"
                  date="2020 - 2022"
                  location="Buting Senior High School, Buting, Pasig"
                  description="Graduated with 94% GPA and Honors."
                />
                <TimelineItem
                  title="Junior High School"
                  date="2016 - 2020"
                  location="Nagpayong High School, Pinabuhatan, Pasig"
                  description="Graduated with Honors."
                />
              </div>
            </section>

            {/* Technical Projects */}
            <section className="space-y-8">
              <div className="flex items-center gap-3 border-b border-border pb-4">
                <Code2 className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold tracking-tight font-heading">
                  Technical Projects
                </h2>
              </div>
              <div className="space-y-10">
                <TimelineItem
                  title="Lumina Electronics E-Commerce Platform"
                  date="Web Development"
                  description={
                    <ul className="list-inside list-disc space-y-2 text-foreground/70">
                      <li>
                        Architected a full-stack e-commerce website using Vite, Vanilla
                        JS, HTML5/CSS3, NodeJS and MongoDB.
                      </li>
                      <li>
                        Designed a custom UI/UX for the product catalog and admin
                        dashboard.
                      </li>
                      <li>Managed version control and deployment through GitHub.</li>
                    </ul>
                  }
                />
                <TimelineItem
                  title="Barangay Digital Portal"
                  date="Web Development"
                  description={
                    <ul className="list-inside list-disc space-y-2 text-foreground/70">
                      <li>
                        Developed a digital management system to streamline barangay
                        services using React/Next.js and Tailwind CSS.
                      </li>
                      <li>Deployed via Vercel for high availability and performance.</li>
                    </ul>
                  }
                />
                <TimelineItem
                  title="Self-Balancing Robot & Desktop Companion"
                  date="Robotics / Embedded Systems"
                  description={
                    <ul className="list-inside list-disc space-y-2 text-foreground/70">
                      <li>
                        Developed a desktop companion using ESP32-S3 and SH1106 OLED
                        display.
                      </li>
                      <li>
                        Built a Self-Balancing Robot using ESP32, MPU6050, and DC
                        motors.
                      </li>
                      <li>Implemented and tuned a PID controller for stabilization.</li>
                    </ul>
                  }
                />
              </div>
            </section>

            {/* Leadership */}
            <section className="space-y-8">
              <div className="flex items-center gap-3 border-b border-border pb-4">
                <Trophy className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold tracking-tight font-heading">
                  Leadership & Activities
                </h2>
              </div>
              <div className="space-y-10">
                <TimelineItem
                  title="Pasig City Scholarship"
                  date="2015 - Present"
                  location="Scholar / Member"
                  description="Selected for a competitive local government scholarship program, maintaining all requirements for over a decade."
                />
                <TimelineItem
                  title="Professional Development Seminars"
                  date="Aug 2025 – Dec 2025"
                  description="Participated in a series of 10 technical seminars covering IoT, API Security, and React Programming."
                />
                <TimelineItem
                  title="STEM Research Lead"
                  date="Buting Senior High School"
                  description={
                    <ul className="list-inside list-disc space-y-2 text-foreground/70">
                      <li>
                        Led feasibility studies on Piezoelectric generators and natural
                        mouth cleaners.
                      </li>
                      <li>Coordinated team experiments resulting in Honors graduation.</li>
                    </ul>
                  }
                />
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

function TimelineItem({
  title,
  date,
  location,
  description,
}: {
  title: string;
  date: string;
  location?: string;
  description: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="relative pl-6 before:absolute before:left-0 before:top-1.5 before:h-2 before:w-2 before:rounded-full before:bg-primary"
    >
      <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
        <h3 className="text-lg font-bold text-foreground font-heading">{title}</h3>
        <span className="text-xs font-semibold uppercase tracking-widest text-primary/80 shrink-0">
          {date}
        </span>
      </div>
      {location && (
        <p className="mt-1 text-sm font-medium text-foreground/50">{location}</p>
      )}
      <div className="mt-4 text-sm leading-relaxed text-foreground/70">
        {description}
      </div>
    </motion.div>
  );
}
