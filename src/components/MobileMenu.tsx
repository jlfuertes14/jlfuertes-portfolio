"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { navLinks } from "@/lib/site-data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const resolveHref = (href: string) => {
    if (href.startsWith("#") && pathname !== "/") {
      return `/${href}`;
    }
    return href;
  };

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Animate open on mount
  useEffect(() => {
    if (!isOpen || !overlayRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.fromTo(
        overlayRef.current,
        { clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)" },
        {
          clipPath: "circle(150% at calc(100% - 2.5rem) 2.5rem)",
          duration: 0.6,
          ease: "power3.inOut",
        }
      );
      tl.fromTo(
        ".mobile-nav-link",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.07,
          ease: "power3.out",
        },
        "-=0.2"
      );
      tl.fromTo(
        ".mobile-nav-close",
        { opacity: 0, rotate: -90 },
        { opacity: 1, rotate: 0, duration: 0.3, ease: "back.out(2)" },
        "-=0.4"
      );
    }, overlayRef);

    return () => ctx.revert();
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (isAnimating || !overlayRef.current) return;
    setIsAnimating(true);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsOpen(false);
          setIsAnimating(false);
        },
      });
      tl.to(".mobile-nav-link", {
        opacity: 0,
        y: -20,
        duration: 0.2,
        stagger: 0.03,
        ease: "power2.in",
      });
      tl.to(
        overlayRef.current!,
        {
          clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)",
          duration: 0.45,
          ease: "power3.inOut",
        },
        "-=0.1"
      );
    }, overlayRef);
    // Note: cleanup handled by onComplete
    void ctx;
  }, [isAnimating]);

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => !isAnimating && setIsOpen(true)}
        className="flex flex-col space-y-1.5 p-2 -mr-2"
        aria-label="Open navigation menu"
      >
        <span className="block h-0.5 w-6 bg-foreground transition-colors" />
        <span className="block h-0.5 w-6 bg-foreground transition-colors" />
        <span className="block h-0.5 w-5 bg-foreground transition-colors" />
      </button>

      {/* Full-Screen Overlay — portaled to body to escape navbar stacking context */}
      {isOpen &&
        createPortal(
          <div
            ref={overlayRef}
            className="fixed inset-0 z-9999 flex flex-col bg-background"
            style={{
              clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)",
            }}
          >
            {/* Close Button */}
            <div className="flex justify-end p-6">
              <button
                onClick={handleClose}
                className="mobile-nav-close p-2 text-foreground/60 hover:text-primary transition-colors duration-300"
                aria-label="Close navigation menu"
              >
                <X className="h-7 w-7" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-1 flex-col items-center justify-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={resolveHref(link.href)}
                  onClick={handleClose}
                  className="mobile-nav-link text-4xl font-black uppercase tracking-tighter text-foreground transition-colors duration-300 hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Bottom Accent */}
            <div className="pb-10 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-foreground/20">
                Portfolio 2026
              </p>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
