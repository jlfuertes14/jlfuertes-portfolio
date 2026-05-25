"use client";

import React from "react";
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  Instagram,
  Facebook,
  Youtube,
  ArrowUp,
} from "lucide-react";
import { navLinks, siteConfig, socialLinks as socialData } from "@/lib/site-data";
import Link from "next/link";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Github,
  Linkedin,
  Twitter,
  Mail,
  Instagram,
  Facebook,
  Youtube,
};

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="footer" className="relative w-full bg-background pt-16 pb-8 md:pt-24 md:pb-12 overflow-hidden border-t border-border/10">
      {/* Massive Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="text-[15vw] font-black text-foreground/6 leading-none tracking-tighter uppercase whitespace-nowrap">
          {siteConfig.shortName}.FUERTES
        </span>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-10 md:mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            <Link href="/" className="text-2xl font-bold tracking-tighter">
              {siteConfig.shortName}.<span className="text-primary">FUERTES</span>
            </Link>
            <p className="text-muted-foreground max-w-sm text-base leading-relaxed">
              {siteConfig.tagline}
            </p>
          </div>

          {/* Navigation Column */}
          <div className="space-y-4 md:space-y-6">
            <h4 className="text-sm font-bold tracking-widest text-foreground/40">
              Navigation
            </h4>
            <nav className="flex flex-row flex-wrap gap-x-6 gap-y-2 md:flex-col md:gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="relative text-base text-muted-foreground hover:text-foreground transition-colors duration-300 w-fit pb-1 after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-full after:origin-bottom-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 hover:after:scale-x-100"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social Column */}
          <div className="space-y-4 md:space-y-6">
            <h4 className="text-sm font-bold tracking-widest text-foreground/40">
              Socials
            </h4>
            <div className="flex flex-wrap gap-3">
              {socialData.map((link) => {
                const Icon = iconMap[link.icon];
                if (!Icon) return null;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-muted/30 border border-border/50 flex items-center justify-center text-foreground/70 hover:bg-foreground hover:text-background transition-all duration-300"
                    aria-label={link.label}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 md:pt-10 border-t border-border/10 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
          <div className="text-sm text-foreground/50 font-medium">
            © {new Date().getFullYear()} <span className="text-foreground/80 font-bold">{siteConfig.name}</span>. All rights reserved.
          </div>
          
          <div className="flex items-center gap-10">
          </div>
        </div>
      </div>
    </footer>
  );
}
