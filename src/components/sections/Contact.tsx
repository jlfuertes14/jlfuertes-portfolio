"use client";

import React, { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Send,
  Loader2,
  Mail,
  MapPin,
  GraduationCap,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  Youtube,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { siteConfig, socialLinks as socialData } from "@/lib/site-data";

gsap.registerPlugin(ScrollTrigger);

/* ─── Icon lookup table ─── */
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Github,
  Linkedin,
  Twitter,
  Mail,
  Instagram,
  Facebook,
  Youtube,
};

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error" | "ratelimited"
  >("idle");
  const [submitTimestamps, setSubmitTimestamps] = useState<number[]>([]);

  const RATE_LIMIT = 3;
  const RATE_WINDOW = 10 * 60 * 1000; // 10 minutes

  const isRateLimited = () => {
    const now = Date.now();
    const recent = submitTimestamps.filter((t) => now - t < RATE_WINDOW);
    return recent.length >= RATE_LIMIT;
  };

  const getRemainingTime = () => {
    if (submitTimestamps.length === 0) return 0;
    const oldest = submitTimestamps.filter(
      (t) => Date.now() - t < RATE_WINDOW
    )[0];
    if (!oldest) return 0;
    const remaining = Math.ceil((RATE_WINDOW - (Date.now() - oldest)) / 60000);
    return remaining;
  };

  /* ─── GSAP scroll-triggered reveals ─── */
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".contact-info",
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".contact-grid",
              start: "top 80%",
            },
          }
        );
        gsap.fromTo(
          ".contact-form",
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".contact-grid",
              start: "top 80%",
            },
          }
        );
        gsap.fromTo(
          ".social-icon",
          { opacity: 0, scale: 0.7 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            stagger: 0.05,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: ".social-row",
              start: "top 90%",
            },
          }
        );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".contact-info, .contact-form, .social-icon", {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
        });
      });
    },
    { scope: sectionRef }
  );

  /* ─── Form submission ─── */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isRateLimited()) {
      setStatus("ratelimited");
      setTimeout(() => setStatus("idle"), 5000);
      return;
    }

    setStatus("sending");

    try {
      const form = new FormData();
      form.append("access_key", "cf9eb1cb-83f8-4a13-aa5d-a7f0aa374cf3");
      form.append("name", formData.name);
      form.append("email", formData.email);
      form.append("message", formData.message);

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: form,
      });
      const data = await res.json();

      if (data.success) {
        setSubmitTimestamps((prev) => [...prev, Date.now()]);
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 4000);
      } else {
        throw new Error(data.message);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="w-full py-24 md:py-32 border-t border-border/20"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <SectionHeading
          title="LET'S"
          highlight="CONNECT"
          subtitle="Have a project in mind? Let's build something amazing together."
        />

        <div className="contact-grid mt-16 md:mt-20 grid gap-16 lg:grid-cols-[1fr_1.5fr]">
          {/* ══════ Left — Contact Info + Social ══════ */}
          <div className="contact-info space-y-10 opacity-0">
            {/* Contact Details */}
            <div className="space-y-6">
              <InfoItem
                icon={<Mail className="h-5 w-5" />}
                label="Email"
                value={siteConfig.email}
                href={`mailto:${siteConfig.email}`}
              />
              <InfoItem
                icon={<MapPin className="h-5 w-5" />}
                label="Location"
                value={siteConfig.location}
              />
              <InfoItem
                icon={<GraduationCap className="h-5 w-5" />}
                label="University"
                value={siteConfig.university}
              />
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-foreground/30 mb-4">
                Follow Me
              </h3>
              <div className="social-row flex flex-wrap gap-3">
                {socialData.map((link) => {
                  const Icon = iconMap[link.icon];
                  if (!Icon) return null;
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-icon flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-card/50 text-foreground/50 opacity-0 transition-all duration-300 hover:border-primary/50 hover:text-primary hover:shadow-[0_0_20px_-5px_oklch(0.75_0.18_160/0.4)] hover:scale-110"
                      aria-label={link.label}
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ══════ Right — Contact Form ══════ */}
          <form
            onSubmit={handleSubmit}
            className="contact-form space-y-5 opacity-0"
          >
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-foreground/40"
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full rounded-xl border border-border bg-card/50 px-4 py-3.5 text-sm text-foreground placeholder:text-foreground/25 outline-none transition-all duration-300 focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                  placeholder="Your name…"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-foreground/40"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  spellCheck={false}
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full rounded-xl border border-border bg-card/50 px-4 py-3.5 text-sm text-foreground placeholder:text-foreground/25 outline-none transition-all duration-300 focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                  placeholder="your@email.com…"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-foreground/40"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={6}
                required
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full resize-none rounded-xl border border-border bg-card/50 px-4 py-3.5 text-sm text-foreground placeholder:text-foreground/25 outline-none transition-all duration-300 focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                placeholder="Tell me about your project or idea…"
              />
            </div>

            {/* Status Messages */}
            {status === "success" && (
              <div className="rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-primary font-medium">
                ✓ Message sent successfully! I&apos;ll get back to you soon.
              </div>
            )}
            {status === "error" && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400 font-medium">
                ✗ Something went wrong. Please try again or email me directly.
              </div>
            )}
            {status === "ratelimited" && (
              <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-400 font-medium">
                ⏳ You&apos;ve sent too many messages. Please try again in ~{getRemainingTime()} minutes.
              </div>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="group inline-flex items-center gap-2.5 rounded-xl bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground uppercase tracking-wider transition-all duration-300 hover:brightness-110 hover:shadow-[0_0_30px_-5px_oklch(0.75_0.18_160/0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "sending" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              )}
              {status === "sending" ? "Sending…" : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ─── Contact Info Row Component ─── */
function InfoItem({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-start gap-4 group">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-card/50 text-foreground/40 transition-all duration-300 group-hover:border-primary/50 group-hover:text-primary">
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/30">
          {label}
        </p>
        <p className="mt-0.5 text-sm font-medium text-foreground/70 group-hover:text-primary transition-colors duration-300">
          {value}
        </p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block">
        {content}
      </a>
    );
  }
  return content;
}
