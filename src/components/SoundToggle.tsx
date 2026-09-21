"use client";

import React, { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Check, Play } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import {
  isSoundEnabled,
  setSoundEnabled,
  getSoundProfile,
  setSoundProfile,
  playMechanicalClick,
  SOUND_PROFILES,
  SoundProfile,
} from "@/lib/sound-effects";

export function SoundToggle() {
  const [enabled, setEnabled] = useState(false);
  const [currentProfile, setCurrentProfile] = useState<SoundProfile>("clack");
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    setEnabled(isSoundEnabled());
    setCurrentProfile(getSoundProfile());

    const handleSoundChange = (e: Event) => {
      const customEvent = e as CustomEvent<boolean>;
      setEnabled(customEvent.detail);
    };

    const handleProfileChange = (e: Event) => {
      const customEvent = e as CustomEvent<SoundProfile>;
      setCurrentProfile(customEvent.detail);
    };

    window.addEventListener("sound-state-change", handleSoundChange);
    window.addEventListener("sound-profile-change", handleProfileChange);

    return () => {
      window.removeEventListener("sound-state-change", handleSoundChange);
      window.removeEventListener("sound-profile-change", handleProfileChange);
    };
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleSelectProfile = (profile: SoundProfile) => {
    if (!enabled) {
      setSoundEnabled(true);
      setEnabled(true);
    }
    setCurrentProfile(profile);
    setSoundProfile(profile);
    // Play preview of the selected mechanical switch
    playMechanicalClick({ profile, volume: 0.28 });
  };

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextState = !enabled;
    setEnabled(nextState);
    setSoundEnabled(nextState);
    if (nextState) {
      playMechanicalClick({ profile: currentProfile, volume: 0.28 });
    }
  };

  if (!mounted) {
    return <div className="h-6 w-6" />;
  }

  return (
    <div ref={containerRef} className="relative flex items-center">
      {/* Bare speaker icon button — NO container box, NO active dot */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="group relative flex cursor-pointer items-center justify-center p-1.5 text-foreground/70 hover:text-foreground transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none rounded-md"
        aria-label={enabled ? "Sound settings: Click sounds active" : "Sound settings: Click sounds muted"}
        aria-haspopup="true"
        aria-expanded={isOpen}
        title={enabled ? "Sound: ON (Click to customize)" : "Sound: MUTED (Click to customize)"}
      >
        {enabled ? (
          <Volume2 className="h-5 w-5 transition-transform duration-200 group-hover:scale-110 text-foreground/80 group-hover:text-foreground" />
        ) : (
          <VolumeX className="h-5 w-5 transition-transform duration-200 group-hover:scale-110 text-muted-foreground/60 group-hover:text-muted-foreground" />
        )}
      </button>

      {/* Dropdown Customizer with 3 Sound Profiles */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -6 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="absolute right-0 top-full mt-2 w-72 sm:w-80 rounded-2xl border border-border/70 bg-background/95 backdrop-blur-2xl p-3 shadow-2xl z-50 select-none"
            role="menu"
            aria-orientation="vertical"
          >
            {/* Header: Title & Mute toggle */}
            <div className="flex items-center justify-between px-2 pb-2.5 mb-2 border-b border-border/50">
              <div className="flex flex-col">
                <span className="text-xs font-semibold tracking-wider uppercase text-foreground">
                  Mechanical Sounds
                </span>
                <span className="text-[11px] text-muted-foreground">
                  Choose your switch profile
                </span>
              </div>

              <button
                onClick={handleToggleMute}
                className={`text-xs px-3 py-1 rounded-full font-medium transition-colors cursor-pointer border ${
                  enabled
                    ? "border-primary/30 bg-primary/10 text-primary hover:bg-primary/20"
                    : "border-primary/50 bg-primary text-primary-foreground hover:bg-primary/90"
                }`}
              >
                {enabled ? "Mute" : "Unmute"}
              </button>
            </div>

            {/* 3 Mechanical Switch Profiles */}
            <div className="space-y-1">
              {SOUND_PROFILES.map((profile) => {
                const isSelected = enabled && currentProfile === profile.id;

                return (
                  <div
                    key={profile.id}
                    onClick={() => handleSelectProfile(profile.id)}
                    className={`group/item flex items-center justify-between gap-3 p-2.5 rounded-xl cursor-pointer transition-all duration-150 ${
                      isSelected
                        ? "bg-primary/10 border border-primary/30 text-foreground"
                        : "hover:bg-muted/50 border border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                    role="menuitem"
                  >
                    <div className="flex flex-col min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-medium ${isSelected ? "text-foreground font-semibold" : ""}`}>
                          {profile.name}
                        </span>
                        <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-muted/80 text-muted-foreground border border-border/40">
                          {profile.tag}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                        {profile.description}
                      </span>
                    </div>

                    {/* Preview / Selected Icon */}
                    <div className="flex items-center gap-1 shrink-0">
                      {isSelected ? (
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                          <Check className="h-3.5 w-3.5" />
                        </span>
                      ) : (
                        <span
                          className="flex h-6 w-6 items-center justify-center rounded-full opacity-0 group-hover/item:opacity-100 hover:bg-muted text-muted-foreground transition-opacity"
                          title="Preview sound"
                        >
                          <Play className="h-3 w-3 fill-current" />
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
