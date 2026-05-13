"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Logo } from "@/components/Logo";
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
      <div className="flex items-center justify-between px-8 sm:px-12 md:px-48 py-6">
        {/* Left Side: Logo + Nav Links */}
        <div className="flex items-center gap-16">
          <Link
            href="/"
            className="transition-opacity hover:opacity-90 active:scale-95 transition-transform"
          >
            <Logo />
          </Link>

            {/* Desktop Nav Links */}
            <div className="hidden items-center space-x-10 md:flex">
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
                  className="text-[15px] font-medium text-foreground/50 transition-colors duration-300 hover:text-primary"
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
