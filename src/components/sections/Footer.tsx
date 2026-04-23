"use client";

import React from "react";
import { ModemAnimatedFooter } from "@/components/ui/modem-animated-footer";
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  Instagram,
  Facebook,
  Youtube,
} from "lucide-react";
import { navLinks, siteConfig } from "@/lib/site-data";

const footerSocialLinks = [
  { icon: <Twitter />, href: "https://x.com/chiro_yui14", label: "Twitter" },
  {
    icon: <Linkedin />,
    href: "https://linkedin.com/in/jlfuertes14",
    label: "LinkedIn",
  },
  {
    icon: <Github />,
    href: "https://github.com/jlfuertes14",
    label: "GitHub",
  },
  {
    icon: <Mail />,
    href: `mailto:${siteConfig.email}`,
    label: "Email",
  },
  {
    icon: <Instagram />,
    href: "https://instagram.com/chiro.yui14",
    label: "Instagram",
  },
  {
    icon: <Facebook />,
    href: "https://facebook.com/jl.fuertes14",
    label: "Facebook",
  },
  {
    icon: <Youtube />,
    href: "https://youtube.com/@fuertesjohnlesterc",
    label: "YouTube",
  },
];

export default function Footer() {
  return (
    <ModemAnimatedFooter
      brandName="JL.FUERTES"
      brandDescription={siteConfig.tagline}
      socialLinks={footerSocialLinks}
      creatorName="John Lester"
      creatorUrl="/"
      className="bg-background"
    />
  );
}
