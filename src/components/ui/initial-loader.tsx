"use client";

import React, { useEffect, useRef } from "react";

const LOADER_WORDS = ["LET ME COOK", "NO CAP", "LOCKED IN"];

export const InitialLoader = ({ onComplete }: { onComplete: () => void }) => {
  const loaderTextRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const loaderText = loaderTextRef.current;
    if (!loaderText) return;

    let currentWordIndex = 0;
    let animationTimeout: ReturnType<typeof setTimeout>;
    let wordCycleTimeout: ReturnType<typeof setTimeout>;
    let isMounted = true;

    function animateWord() {
      if (!isMounted) return;

      const word = LOADER_WORDS[currentWordIndex];
      loaderText!.innerHTML = "";

      const chars = word.split("").map((char, index) => {
        const span = document.createElement("span");
        span.className = "char inline-block";
        span.textContent = char;
        if (char === " ") {
          span.style.width = "0.45em";
        }

        const fromX = (Math.random() - 0.5) * 600;
        const fromY = (Math.random() - 0.5) * 600;
        const fromZ = (Math.random() - 0.5) * 600;
        const fromRotX = (Math.random() - 0.5) * 360;
        const fromRotY = (Math.random() - 0.5) * 360;
        span.style.setProperty(
          "--transform-from",
          `translate3d(${fromX}px, ${fromY}px, ${fromZ}px) rotateX(${fromRotX}deg) rotateY(${fromRotY}deg)`
        );

        span.style.animationName = "fly-in";
        span.style.animationDuration = "0.28s";
        span.style.animationTimingFunction = "cubic-bezier(0.16, 1, 0.3, 1)";
        span.style.animationFillMode = "both";
        span.style.animationDelay = `${index * 0.018}s`;
        span.style.animationPlayState = "running";

        loaderText!.appendChild(span);
        return span;
      });

      // Stop at last word and finish
      if (currentWordIndex === LOADER_WORDS.length - 1) {
        setTimeout(() => {
          if (isMounted) {
            onComplete(); // Instant reveal of hero
          }
        }, 400);
        return;
      }

      animationTimeout = setTimeout(() => {
        if (!isMounted) return;
        chars.forEach((span, index) => {
          const toX = (Math.random() - 0.5) * 600;
          const toY = (Math.random() - 0.5) * 600;
          const toZ = (Math.random() - 0.5) * 600;
          const toRotX = (Math.random() - 0.5) * 360;
          const toRotY = (Math.random() - 0.5) * 360;
          span.style.setProperty(
            "--transform-to",
            `translate3d(${toX}px, ${toY}px, ${toZ}px) rotateX(${toRotX}deg) rotateY(${toRotY}deg)`
          );

          span.style.animationName = "fly-out";
          span.style.animationDuration = "0.22s";
          span.style.animationTimingFunction = "cubic-bezier(0.16, 1, 0.3, 1)";
          span.style.animationDelay = `${(chars.length - index) * 0.012}s`;
        });
      }, 420);

      wordCycleTimeout = setTimeout(() => {
        if (!isMounted) return;
        currentWordIndex++;
        animateWord();
      }, 640);
    }

    // Fast initial delay before first word appears
    const initialDelayTimeout = setTimeout(() => {
      animateWord();
    }, 100);

    return () => {
      isMounted = false;
      clearTimeout(initialDelayTimeout);
      clearTimeout(animationTimeout);
      clearTimeout(wordCycleTimeout);
    };
  }, [onComplete]);

  return (
    <div className="relative flex h-full w-full select-none touch-none flex-col items-center justify-center overscroll-none pointer-events-auto">
      <div className="relative flex flex-col items-center justify-center">
        {/* 3D Box Loader */}
        <div className="relative w-16 h-16 mb-4">
          <div className="boxes">
            <div className="box box-1">
              <div className="face face-front bg-primary [filter:brightness(0.9)]" />
              <div className="face face-right bg-primary [filter:brightness(0.72)]" />
              <div className="face face-top bg-primary" />
              <div className="face face-back bg-primary [filter:brightness(0.72)]" />
              <div className="face face-left bg-primary [filter:brightness(0.82)]" />
            </div>
            <div className="box box-2">
              <div className="face face-front bg-primary [filter:brightness(0.9)]" />
              <div className="face face-right bg-primary [filter:brightness(0.72)]" />
              <div className="face face-top bg-primary" />
              <div className="face face-back bg-primary [filter:brightness(0.72)]" />
              <div className="face face-left bg-primary [filter:brightness(0.82)]" />
            </div>
            <div className="box box-3">
              <div className="face face-front bg-primary [filter:brightness(0.9)]" />
              <div className="face face-right bg-primary [filter:brightness(0.72)]" />
              <div className="face face-top bg-primary" />
              <div className="face face-back bg-primary [filter:brightness(0.72)]" />
              <div className="face face-left bg-primary [filter:brightness(0.82)]" />
            </div>
            <div className="box box-4">
              <div className="face face-front bg-primary [filter:brightness(0.9)]" />
              <div className="face face-right bg-primary [filter:brightness(0.72)]" />
              <div className="face face-top bg-primary" />
              <div className="face face-back bg-primary [filter:brightness(0.72)]" />
              <div className="face face-left bg-primary [filter:brightness(0.82)]" />
            </div>
          </div>
        </div>

        {/* Kinetic Typography */}
        <div className="loader-container mt-12 h-20 flex items-center justify-center">
          <h1
            ref={loaderTextRef}
            className="text-4xl sm:text-6xl lg:text-8xl font-extrabold text-primary whitespace-nowrap"
            style={{ perspective: "1000px" }}
          />
        </div>
      </div>
    </div>
  );
};
