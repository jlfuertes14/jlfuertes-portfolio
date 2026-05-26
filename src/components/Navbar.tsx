"use client";

import React, { useMemo, useRef, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Logo } from "@/components/Logo";
import MobileMenu from "@/components/MobileMenu";
import { navLinks } from "@/lib/site-data";

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
      setScrolled(window.scrollY > 50);
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
    <nav
      ref={navRef}
      data-theme-static
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-border/50 bg-background/72 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 2xl:px-20 py-4 sm:py-5 lg:py-6">
        {/* Left Side: Logo + Nav Links */}
        <div className="flex items-center gap-8 lg:gap-12">
          <Link
            href="/"
            aria-label="John Lester Fuertes - Home"
            className="hover:opacity-90 active:scale-95 transition-transform"
          >
            <Logo />
          </Link>

            {/* Desktop Nav Links */}
            <div className="hidden items-center space-x-6 lg:space-x-8 md:flex">
              {navLinks.map((link) => (
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
                  className={`relative text-[15px] font-medium transition-colors duration-300 pb-1 after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-full after:origin-bottom-left after:bg-primary after:transition-transform after:duration-300 ${
                    isActive(link.href)
                      ? "text-primary after:scale-x-100"
                      : "text-foreground/50 hover:text-primary after:scale-x-0 hover:after:scale-x-100"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
        </div>

        {/* Right Side: Theme Toggle */}
        <div className="hidden md:block">
          <ThemeToggle />
        </div>

        {/* Mobile Nav */}
        <div className="flex items-center space-x-3 md:hidden">
          <ThemeToggle />
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
}
