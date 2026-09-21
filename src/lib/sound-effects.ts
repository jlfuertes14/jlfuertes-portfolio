// src/lib/sound-effects.ts
/**
 * Procedural Mechanical Keyboard Sound Synthesizer (Web Audio API)
 * Synthesizes 3 realistic mechanical switch sound profiles (Thock, Clack, Clicky)
 * with zero external assets, zero latency, and zero bandwidth cost.
 */

export type SoundProfile = "thock" | "clack" | "clicky";

export interface SoundProfileMeta {
  id: SoundProfile;
  name: string;
  tag: string;
  description: string;
}

export const SOUND_PROFILES: SoundProfileMeta[] = [
  {
    id: "thock",
    name: "Creamy Thock",
    tag: "Lubed Linear",
    description: "Deep, muted bass bottom-out",
  },
  {
    id: "clack",
    name: "Tactile Clack",
    tag: "Holy Panda",
    description: "Crisp tactile snap & balanced pop",
  },
  {
    id: "clicky",
    name: "Crispy Clicky",
    tag: "Blue Switch",
    description: "Sharp metallic click & spring leaf",
  },
];

let audioCtx: AudioContext | null = null;
let soundEnabled = false; // Always muted by default
let currentProfile: SoundProfile = "clack";

// Sound effects are ALWAYS muted by default. Only enabled if the user explicitly unmuted.
if (typeof window !== "undefined") {
  try {
    const explicitlyUnmuted = localStorage.getItem("sound-explicitly-unmuted");
    soundEnabled = explicitlyUnmuted === "true";

    const savedProfile = localStorage.getItem("sound-profile") as SoundProfile | null;
    if (savedProfile && (savedProfile === "thock" || savedProfile === "clack" || savedProfile === "clicky")) {
      currentProfile = savedProfile;
    }
  } catch {
    soundEnabled = false;
    currentProfile = "clack";
  }
}

export function isSoundEnabled(): boolean {
  return soundEnabled;
}

export function setSoundEnabled(enabled: boolean): void {
  soundEnabled = enabled;
  if (typeof window !== "undefined") {
    try {
      if (enabled) {
        localStorage.setItem("sound-explicitly-unmuted", "true");
        localStorage.setItem("sound-enabled", "true");
      } else {
        localStorage.removeItem("sound-explicitly-unmuted");
        localStorage.setItem("sound-enabled", "false");
      }
    } catch {
      // Storage unavailable
    }
    window.dispatchEvent(new CustomEvent("sound-state-change", { detail: enabled }));
  }
}

export function getSoundProfile(): SoundProfile {
  return currentProfile;
}

export function setSoundProfile(profile: SoundProfile): void {
  currentProfile = profile;
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("sound-profile", profile);
    } catch {
      // Storage unavailable
    }
    window.dispatchEvent(new CustomEvent("sound-profile-change", { detail: profile }));
  }
}

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  try {
    if (!audioCtx) {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume().catch(() => {});
    }
    return audioCtx;
  } catch {
    return null;
  }
}

/**
 * Unlocks the Web Audio context on the first user interaction.
 */
export function unlockAudioContext(): void {
  const ctx = getAudioContext();
  if (ctx && ctx.state === "suspended") {
    ctx.resume().catch(() => {});
  }
}

export interface SoundOptions {
  volume?: number;
  pitchShift?: number;
  profile?: SoundProfile;
}

/**
 * Plays a procedural mechanical keyboard click based on active or specified profile.
 */
export function playMechanicalClick(options?: SoundOptions): void {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const profile = options?.profile ?? currentProfile;
    const masterVolume = options?.volume ?? 0.32;
    // Organic pitch variation (±3%) so repeated clicks feel physical
    const randomVariation = (Math.random() - 0.5) * 0.06;
    const pitch = (options?.pitchShift ?? 1) * (1 + randomVariation);

    if (profile === "thock") {
      playThockSound(ctx, now, pitch, masterVolume);
    } else if (profile === "clicky") {
      playClickySound(ctx, now, pitch, masterVolume);
    } else {
      playClackSound(ctx, now, pitch, masterVolume);
    }
  } catch {
    // Graceful silence
  }
}

/**
 * Profile 1: Creamy Thock (Deep, muted, lubed linear acoustic)
 * Designed with rich midrange presence so it sounds creamy on laptops as well as headphones.
 */
function playThockSound(ctx: AudioContext, now: number, pitch: number, vol: number) {
  // 1. Damped stem collision transient
  const bufferLen = Math.floor(ctx.sampleRate * 0.01);
  const buffer = ctx.createBuffer(1, bufferLen, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferLen; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.0022));
  }
  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const noiseFilter = ctx.createBiquadFilter();
  noiseFilter.type = "lowpass";
  noiseFilter.frequency.setValueAtTime(1600 * pitch, now);

  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(vol * 0.65, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.015);

  noise.connect(noiseFilter);
  noiseFilter.connect(noiseGain);
  noiseGain.connect(ctx.destination);
  noise.start(now);

  // 2. Thick keycap body bottom-out (360Hz -> 110Hz drop)
  const osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(340 * pitch, now);
  osc.frequency.exponentialRampToValueAtTime(110 * pitch, now + 0.032);

  const thockFilter = ctx.createBiquadFilter();
  thockFilter.type = "lowpass";
  thockFilter.frequency.setValueAtTime(680 * pitch, now);

  const thockGain = ctx.createGain();
  thockGain.gain.setValueAtTime(vol * 1.35, now);
  thockGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.038);

  osc.connect(thockFilter);
  thockFilter.connect(thockGain);
  thockGain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.042);
}

/**
 * Profile 2: Tactile Clack (Holy Panda tactile snap + solid pop)
 */
function playClackSound(ctx: AudioContext, now: number, pitch: number, vol: number) {
  // 1. Tactile snap noise burst
  const bufferLen = Math.floor(ctx.sampleRate * 0.012);
  const buffer = ctx.createBuffer(1, bufferLen, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferLen; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.0022));
  }
  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.setValueAtTime(3200 * pitch, now);
  filter.Q.setValueAtTime(3.0, now);

  const snapGain = ctx.createGain();
  snapGain.gain.setValueAtTime(vol * 0.85, now);
  snapGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.014);

  noise.connect(filter);
  filter.connect(snapGain);
  snapGain.connect(ctx.destination);
  noise.start(now);

  // 2. Mid-frequency pop (480Hz -> 130Hz)
  const osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(460 * pitch, now);
  osc.frequency.exponentialRampToValueAtTime(130 * pitch, now + 0.026);

  const thockFilter = ctx.createBiquadFilter();
  thockFilter.type = "lowpass";
  thockFilter.frequency.setValueAtTime(820 * pitch, now);

  const thockGain = ctx.createGain();
  thockGain.gain.setValueAtTime(vol * 1.1, now);
  thockGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.034);

  osc.connect(thockFilter);
  thockFilter.connect(thockGain);
  thockGain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.038);
}

/**
 * Profile 3: Crispy Clicky (Blue Switch sharp metallic leaf + spring tick)
 */
function playClickySound(ctx: AudioContext, now: number, pitch: number, vol: number) {
  // 1. High-frequency sharp actuation click (4600Hz)
  const bufferLen = Math.floor(ctx.sampleRate * 0.014);
  const buffer = ctx.createBuffer(1, bufferLen, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferLen; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.0018));
  }
  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.setValueAtTime(4600 * pitch, now);
  filter.Q.setValueAtTime(4.2, now);

  const clickGain = ctx.createGain();
  clickGain.gain.setValueAtTime(vol * 0.95, now);
  clickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.015);

  noise.connect(filter);
  filter.connect(clickGain);
  clickGain.connect(ctx.destination);
  noise.start(now);

  // 2. Metallic spring harmonic ping (~1950Hz)
  const springOsc = ctx.createOscillator();
  springOsc.type = "sine";
  springOsc.frequency.setValueAtTime(1950 * pitch, now);
  const springGain = ctx.createGain();
  springGain.gain.setValueAtTime(vol * 0.28, now);
  springGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.02);
  springOsc.connect(springGain);
  springGain.connect(ctx.destination);
  springOsc.start(now);
  springOsc.stop(now + 0.022);

  // 3. Crisp bottom-out pop (500Hz -> 160Hz)
  const osc = ctx.createOscillator();
  osc.type = "triangle";
  osc.frequency.setValueAtTime(500 * pitch, now);
  osc.frequency.exponentialRampToValueAtTime(160 * pitch, now + 0.024);

  const thockFilter = ctx.createBiquadFilter();
  thockFilter.type = "lowpass";
  thockFilter.frequency.setValueAtTime(1050 * pitch, now);

  const thockGain = ctx.createGain();
  thockGain.gain.setValueAtTime(vol * 0.8, now);
  thockGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);

  osc.connect(thockFilter);
  thockFilter.connect(thockGain);
  thockGain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.034);
}

let lastHoverTime = 0;

/**
 * Plays a mechanical tactile hover micro-sound when hovering interactive service tiles.
 * Harmonized with active switch profile and boosted in volume/clarity across laptop & desktop speakers.
 */
export function playHoverSound(options?: SoundOptions): void {
  if (!soundEnabled) return;
  const nowMs = Date.now();
  if (nowMs - lastHoverTime < 45) return;
  lastHoverTime = nowMs;

  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const profile = options?.profile ?? currentProfile;
    // Boosted master volume (0.36 default) for unmistakable tactile presence
    const masterVolume = options?.volume ?? 0.36;
    const randomVariation = (Math.random() - 0.5) * 0.08;
    const pitch = (options?.pitchShift ?? 1) * (1 + randomVariation);

    if (profile === "thock") {
      // Creamy wooden/plastic keycap tap with audible body resonance
      // 1. Muted contact tick
      const bufferLen = Math.floor(ctx.sampleRate * 0.008);
      const buffer = ctx.createBuffer(1, bufferLen, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferLen; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.0016));
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = "lowpass";
      noiseFilter.frequency.setValueAtTime(1400 * pitch, now);
      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(masterVolume * 0.55, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.014);
      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      noise.start(now);

      // 2. Warm body tap (360Hz -> 130Hz)
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(360 * pitch, now);
      osc.frequency.exponentialRampToValueAtTime(130 * pitch, now + 0.026);

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(750 * pitch, now);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(masterVolume * 1.25, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.032);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.036);
    } else if (profile === "clicky") {
      // Crisp metallic spring tick
      const bufferLen = Math.floor(ctx.sampleRate * 0.01);
      const buffer = ctx.createBuffer(1, bufferLen, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferLen; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.0015));
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(4200 * pitch, now);
      filter.Q.setValueAtTime(3.8, now);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(masterVolume * 0.95, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.016);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start(now);

      // Light spring harmonic
      const ping = ctx.createOscillator();
      ping.type = "sine";
      ping.frequency.setValueAtTime(2100 * pitch, now);
      const pingGain = ctx.createGain();
      pingGain.gain.setValueAtTime(masterVolume * 0.3, now);
      pingGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.022);
      ping.connect(pingGain);
      pingGain.connect(ctx.destination);
      ping.start(now);
      ping.stop(now + 0.024);
    } else {
      // Tactile clack: crisp snap + punchy keycap pop
      // 1. High tactile snap
      const bufferLen = Math.floor(ctx.sampleRate * 0.01);
      const buffer = ctx.createBuffer(1, bufferLen, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferLen; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.0018));
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(3000 * pitch, now);
      filter.Q.setValueAtTime(3.0, now);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(masterVolume * 0.95, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.016);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start(now);

      // 2. Punchy bottom pop (460Hz -> 160Hz)
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(460 * pitch, now);
      osc.frequency.exponentialRampToValueAtTime(160 * pitch, now + 0.024);

      const oscFilter = ctx.createBiquadFilter();
      oscFilter.type = "lowpass";
      oscFilter.frequency.setValueAtTime(900 * pitch, now);

      const oscGain = ctx.createGain();
      oscGain.gain.setValueAtTime(masterVolume * 1.0, now);
      oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.028);

      osc.connect(oscFilter);
      oscFilter.connect(oscGain);
      oscGain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.032);
    }
  } catch {
    // Graceful silence
  }
}


