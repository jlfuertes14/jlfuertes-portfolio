"use client";

import React, { useMemo, useRef, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Logo } from "@/components/Logo";
import MobileMenu from "@/components/MobileMenu";
import { navLinks } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("/");
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const scrollSectionIds = useMemo(
    () => [
      "hero",
      ...navLinks
        .filter((link) => link.href.startsWith("#"))
        .map((link) => link.href.slice(1)),
    ],
    []
  );

  useEffect(() => {
    let frameId: number | null = null;

    const updateScrolledState = () => {
      frameId = null;
      setScrolled(window.scrollY > 40);
    };

    const handleScroll = () => {
      if (frameId !== null) return;
      frameId = window.requestAnimationFrame(updateScrolledState);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateScrolledState();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    let frameId: number | null = null;

    const updateActiveSection = () => {
      frameId = null;
      const sections = scrollSectionIds
        .map((id) => document.getElementById(id))
        .filter((section): section is HTMLElement => section !== null);

      if (sections.length === 0) {
        setActiveSection("/");
        return;
      }

      const navHeight = navRef.current?.offsetHeight ?? 0;
      const activationLine = window.scrollY + navHeight + window.innerHeight * 0.3;
      const documentBottom = window.scrollY + window.innerHeight;
      const maxScrollTop = document.documentElement.scrollHeight - window.innerHeight;

      if (window.scrollY <= 32) {
        setActiveSection("/");
        return;
      }

      if (documentBottom >= maxScrollTop - 8) {
        const lastSection = sections.at(-1);
        setActiveSection(lastSection?.id === "hero" ? "/" : `#${lastSection?.id}`);
        return;
      }

      let currentSection = sections[0];

      sections.forEach((section) => {
        if (section.offsetTop <= activationLine) {
          currentSection = section;
        }
      });

      setActiveSection(currentSection.id === "hero" ? "/" : `#${currentSection.id}`);
    };

    const handleScroll = () => {
      if (frameId !== null) return;
      frameId = window.requestAnimationFrame(updateActiveSection);
    };

    const handleResize = () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
      frameId = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [pathname, scrollSectionIds]);

  const isActive = (linkHref: string) => {
    if (pathname === "/resume") {
      return linkHref === "/resume";
    }
    if (pathname === "/") {
      if (linkHref === "/") {
        return activeSection === "/" || activeSection === "hero";
      }
      return activeSection === linkHref;
    }
    return false;
  };

  // If on a sub-page (e.g. /resume), prefix hash links with /
  const resolveHref = (href: string) => {
    if (href.startsWith("#") && pathname !== "/") {
      return `/${href}`;
    }
    return href;
  };

  return (
    <header
      ref={navRef}
      data-theme-static
      className="fixed top-3 sm:top-5 inset-x-0 z-50 flex items-center justify-center px-3 sm:px-4 pointer-events-none"
    >
      <nav
        aria-label="Main Navigation"
        className={cn(
          "pointer-events-auto flex items-center justify-between gap-3 sm:gap-4 md:gap-5",
          "rounded-full border px-3 sm:px-4 py-1.5 sm:py-2",
          "backdrop-blur-xl sm:backdrop-blur-2xl transition-[background-color,border-color,box-shadow,transform] duration-300 ease-out",
          scrolled
            ? "bg-background/80 dark:bg-[#0c0c0e]/80 border-border/80 dark:border-white/15 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.15)] dark:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.08)]"
            : "bg-background/60 dark:bg-[#0c0c0e]/60 border-border/50 dark:border-white/10 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.1)] dark:shadow-[0_15px_35px_-10px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)]",
          "w-full max-w-[calc(100vw-1.5rem)] md:w-auto md:max-w-none"
        )}
      >
        {/* Brand Logo */}
        <Link
          href="/"
          aria-label="John Lester Fuertes - Home"
          className="flex items-center shrink-0 pl-1.5 sm:pl-2 scale-90 sm:scale-95 origin-left hover:opacity-90 active:scale-90 transition-[transform,opacity] duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none rounded-lg"
        >
          <Logo />
        </Link>

        {/* Divider between Logo & Links (Desktop) */}
        <div className="hidden md:block h-5 w-px bg-border/60 dark:bg-white/10 shrink-0" aria-hidden="true" />

        {/* Desktop Nav Links (Segmented Pill Layout) */}
        <div className="hidden md:flex items-center gap-1 lg:gap-1.5">
          {navLinks.map((link) => {
            const active = isActive(link.href);

            return (
              <Link
                key={link.label}
                href={resolveHref(link.href)}
                onClick={(e) => {
                  if (link.href.startsWith("#") && pathname === "/") {
                    e.preventDefault();
                    const element = document.getElementById(link.href.substring(1));
                    element?.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className={cn(
                  "relative px-3 sm:px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-[color,background-color] duration-200 select-none",
                  "focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none",
                  active
                    ? "text-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                )}
              >
                {active && (
                  <motion.span
                    layoutId="floating-nav-active-pill"
                    className="absolute inset-0 rounded-full bg-foreground/10 dark:bg-white/10 shadow-xs border border-foreground/5 dark:border-white/10 -z-10"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Divider between Links & Actions (Desktop) */}
        <div className="hidden md:block h-5 w-px bg-border/60 dark:bg-white/10 shrink-0" aria-hidden="true" />

        {/* Right Side: Theme Toggle on Desktop */}
        <div className="hidden md:flex items-center shrink-0 pr-1">
          <ThemeToggle />
        </div>

        {/* Mobile Nav: Theme Toggle + Mobile Menu Trigger */}
        <div className="flex items-center gap-1.5 sm:gap-2 md:hidden shrink-0">
          <ThemeToggle />
          <MobileMenu />
        </div>
      </nav>
    </header>
  );
}
