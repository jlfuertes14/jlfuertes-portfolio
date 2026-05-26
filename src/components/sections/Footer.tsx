"use client";

import React from "react";
import {
  ArrowUp,
  Github,
  Linkedin,
  Twitter,
  Mail,
  Instagram,
  Facebook,
  Youtube,
} from "lucide-react";
import { BlockSignature } from "@/components/BlockSignature";
import { navLinks, siteConfig, socialLinks as socialData } from "@/lib/site-data";
import Link from "next/link";
import { cn } from "@/lib/utils";

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
  const footerRef = React.useRef<HTMLElement>(null);
  const [isTopControlVisible, setIsTopControlVisible] = React.useState(false);

  React.useEffect(() => {
    if (!footerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsTopControlVisible(entry.isIntersecting);
      },
      {
        threshold: 0.18,
      }
    );

    observer.observe(footerRef.current);

    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer
      id="footer"
      ref={footerRef}
      className="relative w-full overflow-visible border-t border-border/10 bg-background pt-16 pb-6 md:pt-20 md:pb-8"
    >
      <button
        type="button"
        onClick={scrollToTop}
        className={cn(
          "group absolute left-1/2 top-0 z-20 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full border border-border/70 bg-background text-foreground/70 shadow-[0_16px_36px_rgba(0,0,0,0.14)] transition-all duration-500 ease-out hover:-translate-x-1/2 hover:-translate-y-[58%] hover:border-primary/35 hover:text-foreground active:scale-[0.98]",
          isTopControlVisible
            ? "-translate-y-1/2 opacity-100"
            : "-translate-y-[20%] opacity-0 pointer-events-none"
        )}
        aria-label="Back to top"
      >
        <span
          className={cn(
            "pointer-events-none absolute inset-[-10px] rounded-full border border-border/20 transition-all duration-500",
            isTopControlVisible ? "opacity-60 scale-100" : "opacity-0 scale-90"
          )}
        />
        <span
          className={cn(
            "pointer-events-none absolute inset-[-22px] rounded-full border border-border/10 transition-all duration-500 delay-75",
            isTopControlVisible ? "opacity-40 scale-100" : "opacity-0 scale-90"
          )}
        />
        <span
          className={cn(
            "pointer-events-none absolute inset-[-34px] rounded-full border border-border/5 transition-all duration-500 delay-100",
            isTopControlVisible ? "opacity-30 scale-100" : "opacity-0 scale-90"
          )}
        />
        <span className="pointer-events-none absolute inset-0 rounded-full bg-linear-to-b from-primary/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <ArrowUp className="relative h-4.5 w-4.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
      </button>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-2">
          {/* Brand Column */}
          <div className="md:col-span-2 flex items-start">
            <BlockSignature className="h-[240px] min-h-[240px] w-full max-w-[640px] sm:h-[280px] sm:min-h-[280px] md:h-[320px] md:min-h-[320px]" />
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
        <div className="pt-0 border-t border-border/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-foreground/50">
          <p>
            © {new Date().getFullYear()} <span className="font-bold text-foreground/80">{siteConfig.name}</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
