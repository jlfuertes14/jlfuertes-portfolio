"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { siteConfig, navLinks, socialLinks as socialData } from "@/lib/site-data";
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  Instagram,
  Facebook,
  Youtube,
} from "lucide-react";
import { BlockSignature } from "@/components/BlockSignature";

const iconMap: Record<string, React.ElementType> = {
  Github,
  Linkedin,
  Twitter,
  Mail,
  Instagram,
  Facebook,
  Youtube,
};

export default function Footer() {
  const containerRef = useRef<HTMLElement>(null);
  const innerMeasureRef = useRef<HTMLDivElement>(null);
  const [footerHeight, setFooterHeight] = useState<number>(500);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Inverted contrast: dark mode app -> white footer; light mode app -> black footer
  const isDarkMode = mounted ? resolvedTheme === "dark" : true;
  const footerTheme: "light" | "dark" = isDarkMode ? "light" : "dark";

  // Measure dynamic footer height for responsive sizing across mobile/tablet/desktop
  useEffect(() => {
    if (!innerMeasureRef.current) return;
    
    const updateHeight = () => {
      if (innerMeasureRef.current) {
        const measured = Math.ceil(innerMeasureRef.current.offsetHeight);
        if (measured > 0) {
          setFooterHeight(measured);
        }
      }
    };

    updateHeight();

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.height > 0) {
          const measured = Math.ceil(entry.contentRect.height);
          setFooterHeight(measured);
        }
      }
    });

    observer.observe(innerMeasureRef.current);
    window.addEventListener("resize", updateHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateHeight);
    };
  }, [mounted]);

  return (
    <footer
      id="footer"
      ref={containerRef}
      className="relative w-full overflow-hidden z-0"
      style={{
        height: `${footerHeight}px`,
        clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)",
      }}
    >
      <div
        className="fixed bottom-0 left-0 w-full flex flex-col justify-end pointer-events-auto bg-zinc-950 dark:bg-white transition-colors duration-300"
        style={{ height: `${footerHeight}px` }}
      >
        {/* Main Footer Body Container — Black in light mode, White in dark mode */}
        <div
          ref={innerMeasureRef}
          className="w-full bg-zinc-950 dark:bg-white text-zinc-100 dark:text-zinc-900 pt-28 sm:pt-36 md:pt-44 pb-8 sm:pb-12 transition-colors duration-300"
        >
          <div className="container mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-4">
              {/* Brand Column with 3D Model Signature */}
              <div className="md:col-span-2 flex items-start">
                <BlockSignature
                  footerTheme={footerTheme}
                  className="h-[240px] min-h-[240px] w-full max-w-[640px] sm:h-[280px] sm:min-h-[280px] md:h-[320px] md:min-h-[320px]"
                />
              </div>

              {/* Navigation Column */}
              <div className="space-y-4 pt-6 sm:pt-8 md:pt-14">
                <h4 className="text-xs font-bold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">
                  Navigation
                </h4>
                <nav className="flex flex-col gap-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="text-sm text-zinc-400 dark:text-zinc-600 hover:text-white dark:hover:text-black transition-colors duration-200 w-fit"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Social Column */}
              <div className="space-y-4 pt-6 sm:pt-8 md:pt-14">
                <h4 className="text-xs font-bold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">
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
                        className="w-9 h-9 rounded-full bg-white/5 dark:bg-black/5 border border-white/10 dark:border-black/10 flex items-center justify-center text-zinc-300 dark:text-zinc-700 hover:bg-white dark:hover:bg-black hover:text-black dark:hover:text-white hover:scale-110 transition-all duration-200"
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
            <div className="pt-6 border-t border-zinc-800/80 dark:border-zinc-200/80 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-zinc-500 dark:text-zinc-400">
              <p>
                © {new Date().getFullYear()} <span className="font-bold text-zinc-200 dark:text-zinc-900">{siteConfig.name}</span>. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
