"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { InitialLoader } from "./initial-loader";
import { gsap } from "gsap";

const SCRUB_COMPLETE_THRESHOLD = 70;
const CONTENT_REVEAL_THRESHOLD = 62;
const WHEEL_SCRUB_MULTIPLIER = 0.22;
const TOUCH_SCRUB_MULTIPLIER = 0.4;

export function AppLoader({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isReadyToScrub, setIsReadyToScrub] = useState(false);
  const [shouldMountContent, setShouldMountContent] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);
  const contentVisibleRef = useRef(false);
  const unlockTimeoutRef = useRef<number | null>(null);

  const lockPageScroll = () => {
    const html = document.documentElement;
    const body = document.body;

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    html.style.overflow = "hidden";
    html.style.overscrollBehavior = "none";

    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.inset = "0";
    body.style.width = "100%";
    body.style.touchAction = "none";
    body.style.overscrollBehavior = "none";
  };

  const unlockPageScroll = () => {
    const html = document.documentElement;
    const body = document.body;

    html.style.overflow = "";
    html.style.overscrollBehavior = "";

    body.style.overflow = "";
    body.style.position = "";
    body.style.inset = "";
    body.style.width = "";
    body.style.touchAction = "";
    body.style.overscrollBehavior = "";

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  };

  // Keep the document pinned while the loader owns scroll input.
  useEffect(() => {
    if (isLoading) {
      if (unlockTimeoutRef.current !== null) {
        window.clearTimeout(unlockTimeoutRef.current);
        unlockTimeoutRef.current = null;
      }

      lockPageScroll();
    } else {
      unlockTimeoutRef.current = window.setTimeout(() => {
        unlockPageScroll();
        unlockTimeoutRef.current = null;
      }, 180);
    }
  }, [isLoading]);

  useEffect(() => {
    return () => {
      if (unlockTimeoutRef.current !== null) {
        window.clearTimeout(unlockTimeoutRef.current);
      }

      unlockPageScroll();
    };
  }, []);

  const handleLoaderReady = useCallback(() => {
    setIsReadyToScrub(true);
    setShouldMountContent(true);
  }, []);

  useEffect(() => {
    contentVisibleRef.current = isContentVisible;
  }, [isContentVisible]);

  useEffect(() => {
    if (!isReadyToScrub) return;

    let progress = 0;
    let lastY = 0;

    const updateProgress = (delta: number) => {
      progress += delta;
      const clampedProgress = Math.max(0, progress);
      const scrubPercent = Math.min(
        (clampedProgress / SCRUB_COMPLETE_THRESHOLD) * 100,
        100
      );

      // Don't let it scroll down past the original position
      if (progress < 0) progress = 0;

      if (!contentVisibleRef.current && clampedProgress >= CONTENT_REVEAL_THRESHOLD) {
        setIsContentVisible(true);
      }

      // If pulled up completely, finish the loader
      if (clampedProgress >= SCRUB_COMPLETE_THRESHOLD) {
        progress = SCRUB_COMPLETE_THRESHOLD;
        cleanup();

        setIsContentVisible(true);

        // Fade the page in as the curtain clears, then replay the hero entrance on reveal.
        gsap.to(loaderRef.current, {
          yPercent: -100,
          duration: 0.6,
          ease: "power3.out",
          onComplete: () => setIsLoading(false),
        });

        window.requestAnimationFrame(() => {
          window.dispatchEvent(new CustomEvent("hero-reanimate"));
        });

        return;
      }

      // Dynamically scrub the curtain position
      gsap.to(loaderRef.current, {
        yPercent: -scrubPercent,
        duration: 0.5, // slight duration gives it a smooth, heavy feel
        ease: "power2.out",
        overwrite: "auto"
      });
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      // deltaY is positive when scrolling down (pulling curtain up)
      updateProgress(e.deltaY * WHEEL_SCRUB_MULTIPLIER);
    };

    const handleTouchStart = (e: TouchEvent) => {
      lastY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const currentY = e.touches[0].clientY;
      const deltaY = lastY - currentY; // positive when dragging up (scrolling down)
      lastY = currentY;
      updateProgress(deltaY * TOUCH_SCRUB_MULTIPLIER);
    };

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        updateProgress(30); // Jump by 30% on key press
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        updateProgress(-30);
      }
    };

    const cleanup = () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('keydown', handleKeydown);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('keydown', handleKeydown, { passive: false });

    return cleanup;
  }, [isReadyToScrub]);

  return (
    <>
      {shouldMountContent && (
        <div
          className={`transition-opacity duration-200 ${isContentVisible
            ? "visible opacity-100"
            : "pointer-events-none invisible opacity-0"
            }`}
        >
          {children}
        </div>
      )}
      {isLoading && (
        <div
          ref={loaderRef}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-zinc-100 dark:bg-zinc-900 overscroll-none touch-none will-change-transform"
        >
          <InitialLoader onComplete={handleLoaderReady} />
        </div>
      )}
      {!shouldMountContent && !isLoading && children}
    </>
  );
}
