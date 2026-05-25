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

  return (
    <footer id="footer" className="relative w-full bg-background pt-12 pb-6 md:pt-16 md:pb-8 border-t border-border/10">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-10">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="text-xl font-bold tracking-tighter inline-block hover:opacity-80 transition-opacity">
              {siteConfig.shortName}.<span className="text-primary">FUERTES</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
              {siteConfig.tagline}
            </p>
          </div>

          {/* Navigation Column */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold tracking-widest text-foreground/40 uppercase">
              Navigation
            </h4>
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 w-fit"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social Column */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold tracking-widest text-foreground/40 uppercase">
              Connect
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
                    className="w-9 h-9 rounded-full bg-muted/30 border border-border/50 flex items-center justify-center text-foreground/70 hover:bg-foreground hover:text-background hover:scale-110 transition-all duration-300"
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
        <div className="pt-6 border-t border-border/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-foreground/50">
          <p>
            © {new Date().getFullYear()} <span className="font-bold text-foreground/80">{siteConfig.name}</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
