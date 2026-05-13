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
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  Youtube,
  ExternalLink,
} from "lucide-react";
import { siteConfig, socialLinks as socialData } from "@/lib/site-data";
import { Button } from "@/components/ui/button";

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
          ".contact-header",
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".contact-grid",
              start: "top 80%",
            },
          }
        );

        gsap.fromTo(
          ".contact-item",
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".contact-grid",
              start: "top 80%",
            },
          }
        );

        gsap.fromTo(
          ".contact-form-container",
          { opacity: 0, scale: 0.98 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".contact-grid",
              start: "top 75%",
            },
          }
        );
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
      className="pt-48 pb-32 bg-background relative overflow-hidden scroll-mt-24 min-h-screen flex flex-col justify-start"
    >
      {/* Absolute background cover to ensure no peeking */}
      <div className="absolute inset-0 bg-background z-0" />
      {/* Background Glows */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="contact-grid grid gap-16 lg:grid-cols-[1fr_1.5fr] items-start">

          {/* ══════ Left — "Noir Minimalist" Info ══════ */}
          <div className="contact-info-panel space-y-12">
            <div className="contact-header space-y-2">
              <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground">
                Get in <span className="text-foreground/90">touch</span>
              </h2>
            </div>

            <div className="space-y-8">
              <div className="contact-item group">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60 mb-2">
                  Email:
                </p>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-xl md:text-2xl font-medium text-foreground hover:text-primary transition-colors block"
                >
                  {siteConfig.email}
                </a>
              </div>

              <div className="contact-item group">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60 mb-2">
                  Address:
                </p>
                <p className="text-xl md:text-2xl font-medium text-foreground">
                  {siteConfig.location}
                </p>
              </div>

              <div className="contact-item pt-2">
                <Button
                  variant="outline"
                  className="rounded-full px-8 h-12 border-border bg-transparent hover:bg-foreground hover:text-background transition-all duration-300 font-semibold"
                  asChild
                >
                  <a
                    href={socialData.find(s => s.label === "LinkedIn")?.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Let&apos;s connect
                  </a>
                </Button>
              </div>
            </div>

            {/* Follow Us */}
            <div className="pt-6 border-t border-border/10 reveal-item">
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60 mb-4 block">
                Follow Me
              </span>
              <div className="flex flex-wrap gap-4">
                {socialData.map((link) => {
                  const Icon = iconMap[link.icon];
                  if (!Icon) return null;
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-muted/50 border border-border flex items-center justify-center text-foreground hover:bg-foreground hover:text-background transition-all duration-300 hover:scale-110"
                      aria-label={link.label}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ══════ Right — Form ══════ */}
          <div className="contact-form-container lg:pl-10">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-foreground/70 ml-1">
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your full name"
                    className="w-full bg-muted/30 border border-border/50 rounded-2xl px-6 py-4 text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-foreground/30 focus:bg-muted/50 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground/70 ml-1">
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Your email address"
                    className="w-full bg-muted/30 border border-border/50 rounded-2xl px-6 py-4 text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-foreground/30 focus:bg-muted/50 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-foreground/70 ml-1">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Write something..."
                  className="w-full bg-muted/30 border border-border/50 rounded-2xl px-6 py-4 text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-foreground/30 focus:bg-muted/50 transition-all resize-none"
                />
              </div>

              <div className="space-y-6 pt-2">
                {/* Status Messages */}
                {status === "success" && (
                  <div className="rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-primary font-medium">
                    ✓ Message sent successfully! I&apos;ll get back to you soon.
                  </div>
                )}
                {status === "error" && (
                  <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400 font-medium">
                    ✗ Something went wrong. Please try again.
                  </div>
                )}
                {status === "ratelimited" && (
                  <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-400 font-medium">
                    ⏳ Rate limit exceeded. Try again in {getRemainingTime()} minutes.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full bg-foreground text-background font-bold py-5 rounded-2xl transition-all hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2 group"
                >
                  {status === "sending" ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
