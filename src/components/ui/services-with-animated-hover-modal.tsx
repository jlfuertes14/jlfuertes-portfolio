"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import gsap from "gsap";
import { cn } from "@/lib/utils";

export interface ServiceHoverItem {
  title: string;
  subtitle?: string;
  category?: string;
  color?: string;
  src: string;
  alt?: string;
}

export interface ServiceHoverModalProps {
  modal: { active: boolean; index: number };
  items: ServiceHoverItem[];
  className?: string;
}

const scaleAnimation: Variants = {
  initial: { scale: 0, x: "-50%", y: "-50%" },
  enter: {
    scale: 1,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.38, ease: [0.23, 1, 0.32, 1] as const },
  },
  closed: {
    scale: 0,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.3, ease: [0.32, 0, 0.67, 0] as const },
  },
};

function subscribeFinePointer(callback: () => void) {
  const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getFinePointerSnapshot() {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

function getServerFinePointerSnapshot() {
  return false;
}

/**
 * ServiceHoverModal
 * Physics-based floating preview card and magnetic cursor pill following the pointer using GSAP quickTo.
 */
export function ServiceHoverModal({ modal, items, className }: ServiceHoverModalProps) {
  const { active, index } = modal;
  const modalContainer = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);
  const cursorLabel = useRef<HTMLDivElement>(null);
  const canHover = React.useSyncExternalStore(
    subscribeFinePointer,
    getFinePointerSnapshot,
    getServerFinePointerSnapshot
  );

  useEffect(() => {
    if (!canHover) return;

    // Use GSAP quickTo for 60fps GPU-composited coordinate tracking
    const xMoveContainer = gsap.quickTo(modalContainer.current, "left", {
      duration: 0.75,
      ease: "power3.out",
    });
    const yMoveContainer = gsap.quickTo(modalContainer.current, "top", {
      duration: 0.75,
      ease: "power3.out",
    });

    const xMoveCursor = gsap.quickTo(cursor.current, "left", {
      duration: 0.45,
      ease: "power3.out",
    });
    const yMoveCursor = gsap.quickTo(cursor.current, "top", {
      duration: 0.45,
      ease: "power3.out",
    });

    const xMoveCursorLabel = gsap.quickTo(cursorLabel.current, "left", {
      duration: 0.4,
      ease: "power3.out",
    });
    const yMoveCursorLabel = gsap.quickTo(cursorLabel.current, "top", {
      duration: 0.4,
      ease: "power3.out",
    });

    const handleMouseMove = (e: MouseEvent) => {
      // clientX and clientY with position: fixed ensures flawless scroll immunity
      const { clientX, clientY } = e;
      xMoveContainer(clientX);
      yMoveContainer(clientY);
      xMoveCursor(clientX);
      yMoveCursor(clientY);
      xMoveCursorLabel(clientX);
      yMoveCursorLabel(clientY);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [canHover]);

  if (!canHover) return null;

  return (
    <>
      {/* Floating Image Preview Modal */}
      <motion.div
        ref={modalContainer}
        variants={scaleAnimation}
        initial="initial"
        animate={active ? "enter" : "closed"}
        aria-hidden="true"
        className={cn(
          "pointer-events-none fixed z-40 hidden md:flex h-[240px] w-[340px] lg:h-[280px] lg:w-[420px] items-center justify-center overflow-hidden rounded-2xl border border-white/20 bg-card shadow-[0_25px_50px_-12px_rgba(0,0,0,0.35)] dark:border-white/10 dark:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)] will-change-transform",
          className
        )}
      >
        <div
          className="absolute h-full w-full transition-[top] duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
          style={{ top: `${index * -100}%` }}
        >
          {items.map((item, idx) => (
            <div
              key={`${item.title}-${idx}`}
              className="relative flex h-full w-full items-center justify-center overflow-hidden"
              style={{ backgroundColor: item.color || "#0b0f19" }}
            >
              <Image
                src={item.src}
                alt={item.alt || item.title}
                fill
                priority={idx === 0}
                sizes="(min-width: 1024px) 420px, 340px"
                className="object-cover transition-[transform] duration-700 ease-out will-change-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-semibold text-white drop-shadow-md">
                <span className="truncate max-w-[200px]">{item.title}</span>
                {item.subtitle && (
                  <span className="text-white/80 font-mono text-[11px]">{item.subtitle}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Floating Cursor Pill */}
      <motion.div
        ref={cursor}
        variants={scaleAnimation}
        initial="initial"
        animate={active ? "enter" : "closed"}
        aria-hidden="true"
        className="pointer-events-none fixed z-50 hidden md:flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg backdrop-blur-md will-change-transform"
      />

      {/* Cursor Text Label */}
      <motion.div
        ref={cursorLabel}
        variants={scaleAnimation}
        initial="initial"
        animate={active ? "enter" : "closed"}
        aria-hidden="true"
        className="pointer-events-none fixed z-50 hidden md:flex h-16 w-16 items-center justify-center rounded-full bg-transparent font-medium text-xs tracking-wider uppercase text-primary-foreground select-none will-change-transform"
      >
        View
      </motion.div>
    </>
  );
}

export default ServiceHoverModal;
