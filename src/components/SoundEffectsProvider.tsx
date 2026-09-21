"use client";

import React, { useEffect } from "react";
import { playMechanicalClick, isSoundEnabled, unlockAudioContext } from "@/lib/sound-effects";

export function SoundEffectsProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Proactively unlock Web Audio API on the very first user interaction
    const handleFirstGesture = () => {
      unlockAudioContext();
    };

    window.addEventListener("pointerdown", handleFirstGesture, { passive: true, once: true });
    window.addEventListener("keydown", handleFirstGesture, { passive: true, once: true });
    window.addEventListener("touchstart", handleFirstGesture, { passive: true, once: true });

    const handlePointerDown = (e: PointerEvent) => {
      if (!isSoundEnabled()) return;
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest(
        "button, a, [role='button'], input[type='button'], input[type='submit'], summary, [data-sound='click']"
      );

      if (interactive) {
        playMechanicalClick();
      }
    };

    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerdown", handleFirstGesture);
      window.removeEventListener("keydown", handleFirstGesture);
      window.removeEventListener("touchstart", handleFirstGesture);
    };
  }, []);

  return <>{children}</>;
}

