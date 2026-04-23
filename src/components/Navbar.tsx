"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";
import MobileMenu from "@/components/MobileMenu";
import { navLinks, siteConfig } from "@/lib/site-data";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // If on a sub-page (e.g. /resume), prefix hash links with /
  const resolveHref = (href: string) => {
    if (href.startsWith("#") && pathname !== "/") {
      return `/${href}`;
    }
    return href;
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl shadow-sm border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 sm:px-8 md:px-12 py-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold tracking-wider text-foreground hover:text-primary transition-colors duration-300"
        >
          {siteConfig.shortName}
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center space-x-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={resolveHref(link.href)}
              className="text-sm font-medium tracking-widest text-foreground/60 transition-colors duration-300 hover:text-primary uppercase"
            >
              {link.label}
            </Link>
          ))}
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
