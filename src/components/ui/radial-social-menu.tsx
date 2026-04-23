"use client";
import React, { useEffect, useState } from "react";
import { Github, Linkedin, Twitter, Mail, Code, Fingerprint, User } from "lucide-react";

export const RadialSocialMenu = () => {
  const icons = [
    { icon: <Github />, href: "https://github.com/jlfuertes14" },
    { icon: <Linkedin />, href: "https://linkedin.com/in/jlfuertes14" },
    { icon: <Twitter />, href: "https://x.com/chiro_yui14" },
    { icon: <Mail />, href: "mailto:johnlester.fuertes@gmail.com" },
    { icon: <Code />, href: "#projects" },
    { icon: <Fingerprint />, href: "#about" },
  ];

  const radius = 140;
  const [angleOffset, setAngleOffset] = useState(0);

  useEffect(() => {
    let animationFrame: number;
    const animate = () => {
      setAngleOffset((prev) => prev + 0.002);
      animationFrame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <div className="relative h-[400px] w-full flex items-center justify-center pointer-events-none">
      {/* Center Icon */}
      <div className="relative z-10 flex items-center justify-center w-28 h-28 rounded-full bg-gradient-to-tr from-primary to-indigo-500 shadow-xl ring-4 ring-primary/30 animate-pulse pointer-events-auto">
        <User className="text-white w-16 h-16" />
      </div>

      {/* Orbit Line */}
      <div
        className="absolute rounded-full border border-dashed border-border/50"
        style={{
          width: `${radius * 2}px`,
          height: `${radius * 2}px`,
          top: `calc(50% - ${radius}px)`,
          left: `calc(50% - ${radius}px)`,
        }}
      />

      {/* Orbiting Icons */}
      {icons.map((item, index) => {
        const angle = (index / icons.length) * 2 * Math.PI + angleOffset;
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);

        return (
          <a
            key={index}
            href={item.href}
            target={item.href.startsWith("http") ? "_blank" : "_self"}
            rel="noopener noreferrer"
            className="absolute flex items-center justify-center w-14 h-14 rounded-full bg-card border border-border shadow-md hover:scale-110 hover:shadow-2xl transition-transform duration-300 pointer-events-auto"
            style={{
              left: `calc(50% - 28px + ${x}px)`,
              top: `calc(50% - 28px + ${y}px)`,
            }}
          >
            {React.cloneElement(item.icon as React.ReactElement<any>, {
              size: 24,
              className: "text-foreground/80 hover:text-primary transition-colors",
            })}
          </a>
        );
      })}
    </div>
  );
};
