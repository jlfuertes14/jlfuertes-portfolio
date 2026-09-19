"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { InitialLoader } from "./initial-loader";
import { gsap } from "gsap";

export function AppLoader({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const loaderRef = useRef<HTMLDivElement>(null);
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

  // Keep the document pinned while the loader is active
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
      }, 50);
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

  // When InitialLoader finishes its animation, automatically reveal the hero
  const handleLoaderComplete = useCallback(() => {
    if (!loaderRef.current) {
      setIsLoading(false);
      return;
    }

    // Replay hero entrance right as the curtain begins lifting
    window.requestAnimationFrame(() => {
      window.dispatchEvent(new CustomEvent("hero-reanimate"));
    });

    // Lift curtain up with a smooth, luxury ease
    gsap.to(loaderRef.current, {
      yPercent: -100,
      duration: 0.65,
      ease: "power3.inOut",
      onComplete: () => {
        setIsLoading(false);
      },
    });
  }, []);

  return (
    <>
      {/* Portfolio Content rendered underneath */}
      <div className="w-full">
        {children}
      </div>

      {/* Fullscreen Initial Loader Curtain */}
      {isLoading && (
        <div
          ref={loaderRef}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-zinc-100 dark:bg-zinc-900 overscroll-none touch-none will-change-transform"
        >
          <InitialLoader onComplete={handleLoaderComplete} />
        </div>
      )}
    </>
  );
}
