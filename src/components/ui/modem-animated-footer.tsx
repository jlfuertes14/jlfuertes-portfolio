"use client";
import React from "react";
import Link from "next/link";
import {
  NotepadTextDashed,
  Twitter,
  Linkedin,
  Github,
  Mail,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FooterLink {
  label: string;
  href: string;
}

interface SocialLink {
  icon: React.ReactNode;
  href: string;
  label: string;
}

interface FooterProps {
  brandName?: string;
  brandDescription?: string;
  socialLinks?: SocialLink[];
  navLinks?: FooterLink[];
  creatorName?: string;
  creatorUrl?: string;
  brandIcon?: React.ReactNode;
  className?: string;
}

export const ModemAnimatedFooter = ({
  brandName = "YourBrand",
  brandDescription = "Your description here",
  socialLinks = [],
  navLinks = [],
  creatorName,
  creatorUrl,
  brandIcon,
  className,
}: FooterProps) => {
  return (
    <section className={cn("relative w-full mt-0 overflow-hidden", className)}>
      <footer className="border-t bg-background mt-20 relative">
        <div className="max-w-7xl flex flex-col justify-between mx-auto min-h-[30rem] sm:min-h-[35rem] md:min-h-[40rem] relative p-4 py-10">
          <div className="flex flex-col mb-12 sm:mb-20 md:mb-0 w-full">
            <div className="w-full flex flex-col items-center">
              <div className="space-y-4 flex flex-col items-center flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-foreground text-4xl font-bold tracking-tighter">
                    {brandName}
                  </span>
                </div>
                <p className="text-muted-foreground font-medium text-center w-full max-w-sm sm:w-96 px-4 sm:px-0">
                  {brandDescription}
                </p>
              </div>

              {socialLinks.length > 0 && (
                <div className="flex mb-8 mt-6 gap-6">
                  {socialLinks.map((link, index) => (
                    <Link
                      key={index}
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-all duration-300"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="w-6 h-6 hover:scale-125 transition-transform duration-300">
                        {link.icon}
                      </div>
                      <span className="sr-only">{link.label}</span>
                    </Link>
                  ))}
                </div>
              )}

              {navLinks.length > 0 && (
                <div className="flex flex-wrap justify-center gap-6 text-sm font-semibold text-muted-foreground max-w-full px-4 uppercase tracking-widest">
                  {navLinks.map((link, index) => (
                    <Link
                      key={index}
                      className="hover:text-foreground transition-colors duration-300"
                      href={link.href}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mt-20 md:mt-24 flex flex-col gap-2 md:gap-1 items-center justify-center md:flex-row md:items-center md:justify-between px-4 md:px-0 border-t border-border/30 pt-8">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              ©{new Date().getFullYear()} {brandName}. All rights reserved.
            </p>
            {creatorName && creatorUrl && (
              <nav className="flex gap-4">
                <Link
                  href={creatorUrl}
                  target="_blank"
                  className="text-sm text-muted-foreground hover:text-primary transition-all duration-300"
                >
                  Crafted by <span className="font-semibold text-foreground">{creatorName}</span>
                </Link>
              </nav>
            )}
          </div>
        </div>

        {/* Large background text */}
        <div 
          className="bg-gradient-to-b from-foreground/10 via-foreground/5 to-transparent bg-clip-text text-transparent leading-none absolute left-1/2 -translate-x-1/2 bottom-40 md:bottom-32 font-black tracking-tighter pointer-events-none select-none text-center px-4 mix-blend-overlay"
          style={{
            fontSize: 'clamp(4rem, 15vw, 12rem)',
            maxWidth: '100vw'
          }}
        >
          {brandName.toUpperCase()}
        </div>

        {/* Bottom logo button */}
        <div className="absolute hover:border-primary duration-500 drop-shadow-[0_0px_30px_rgba(0,0,0,0.5)] dark:drop-shadow-[0_0px_30px_rgba(255,255,255,0.1)] bottom-24 md:bottom-20 backdrop-blur-md rounded-full bg-background/40 left-1/2 border-2 border-border/50 flex items-center justify-center p-4 -translate-x-1/2 z-10 transition-all hover:scale-110">
          <div className="w-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20 bg-gradient-to-br from-primary to-primary/60 rounded-full flex items-center justify-center shadow-xl">
            {brandIcon || (
              <NotepadTextDashed className="w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 text-primary-foreground drop-shadow-lg" />
            )}
          </div>
        </div>

        {/* Bottom line */}
        <div className="absolute bottom-32 sm:bottom-34 backdrop-blur-sm h-[1px] bg-gradient-to-r from-transparent via-border to-transparent w-full left-1/2 -translate-x-1/2 opacity-50"></div>

        {/* Bottom shadow fade */}
        <div className="bg-gradient-to-t from-background via-background/80 blur-[1em] to-background/40 absolute bottom-28 w-full h-24 pointer-events-none"></div>
      </footer>
    </section>
  );
};
