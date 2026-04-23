"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GalleryHoverCarousel from "@/components/ui/gallery-hover-carousel";
import { projects } from "@/lib/site-data";

gsap.registerPlugin(ScrollTrigger);

// Map existing project data to the carousel format
const carouselItems = projects.map((project, i) => ({
  id: `project-${i}`,
  title: project.title,
  summary: `${project.location} — ${project.stats}`,
  url: project.href,
  image: project.imageUrl,
}));

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Heading text slides in from the left
        gsap.fromTo(
          ".projects-heading",
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".projects-section",
              start: "top 80%",
            },
          }
        );

        // Nav buttons pop in with elastic bounce
        gsap.fromTo(
          ".projects-nav-btn",
          { opacity: 0, scale: 0, rotate: -45 },
          {
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: ".projects-section",
              start: "top 75%",
            },
          }
        );

        // Each project card staggers in from below with scale
        gsap.fromTo(
          ".project-card-item",
          { opacity: 0, y: 60, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".projects-carousel",
              start: "top 85%",
            },
          }
        );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          ".projects-heading, .projects-nav-btn, .project-card-item",
          { opacity: 1, y: 0, x: 0, scale: 1, rotate: 0 }
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="bg-background"
    >
      <div className="projects-section">
        <GalleryHoverCarousel
          heading="NOTABLE PROJECTS"
          items={carouselItems}
        />
      </div>
    </section>
  );
}

