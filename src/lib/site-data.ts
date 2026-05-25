// ─────────────────────────────────────────────
// Single source of truth for all portfolio data
// ─────────────────────────────────────────────

export const siteConfig = {
  name: "John Lester C. Fuertes",
  shortName: "JL",
  title: "Computer Engineering Graduate",
  tagline:
    "Computer Engineering graduate building web applications and hardware circuits.",
  location: "Taytay, Rizal, Philippines",
  email: "johnlester.fuertes@gmail.com",
  phone: "09774129580",
  university: "Rizal Technological University",
  degree: "BS Computer Engineering",
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
  { label: "Resume", href: "/resume" },
];

export const socialLinks = [
  { icon: "Github", href: "https://github.com/jlfuertes14", label: "GitHub" },
  { icon: "Linkedin", href: "https://www.linkedin.com/in/jlfuertes14/", label: "LinkedIn" },
  { icon: "Twitter", href: "https://x.com/chiro_yui14", label: "Twitter/X" },
  { icon: "Mail", href: "mailto:johnlester.fuertes@gmail.com", label: "Email" },
  { icon: "Instagram", href: "https://instagram.com/chiro.yui14", label: "Instagram" },
  { icon: "Facebook", href: "https://facebook.com/jl.fuertes14", label: "Facebook" },
  { icon: "Youtube", href: "https://youtube.com/@jl_fuertes14", label: "YouTube" },
];

export const skills = [
  { name: "HTML/CSS/JS", category: "frontend" },
  { name: "React / Next.js", category: "frontend" },
  { name: "TypeScript", category: "frontend" },
  { name: "Tailwind CSS", category: "frontend" },
  { name: "Node.js", category: "backend" },
  { name: "MongoDB", category: "backend" },
  { name: "Python", category: "backend" },
  { name: "C#", category: "backend" },
  { name: "FastAPI", category: "backend" },
  { name: "Flask", category: "backend" },
  { name: "Arduino", category: "hardware" },
  { name: "C++ / Arduino", category: "hardware" },
  { name: "MicroPython", category: "hardware" },
  { name: "ESP32", category: "hardware" },
  { name: "Embedded Systems", category: "hardware" },
  { name: "UI/UX Design", category: "design" },
];

export interface Project {
  title: string;
  category: string;
  description: string;
  techStack: string[];
  imageUrl: string;
  previewImage?: string;
  desktopRightImage?: string;
  desktopLeftImage?: string;
  href: string;
  ctaLabel: string;
  themeColor: string;
}

export const projects: Project[] = [
  {
    title: "AniVerse",
    category: "ANIME DISCOVERY ENGINE",
    description: "A fast anime discovery platform featuring real-time streaming, advanced search, and a sleek brutalist-inspired UI.",
    techStack: ["Next.js", "FastAPI", "MongoDB", "Tailwind CSS"],
    imageUrl: "/images/aniverse.png",
    previewImage: "/images/aniverse-mobile-preview.png",
    desktopRightImage: "/images/aniverse-right-image.png",
    href: "https://aniverse-rose.vercel.app/",
    ctaLabel: "Visit Live Site",
    themeColor: "330 80% 55%",
  },
  {
    title: "Vitae",
    category: "AI RESUME BUILDER",
    description: "An AI resume builder with ATS scoring, job matching, resume imports, cover letter generation, and a dark control-room interface.",
    techStack: ["Next.js", "Supabase", "Prisma", "Groq + OpenRouter"],
    imageUrl: "/images/vitae.png",
    previewImage: "/images/vitae-mobile-preview.png",
    desktopRightImage: "/images/vitae-right-desktop-view.png",
    desktopLeftImage: "/images/vitae-dashboard.png",
    href: "https://vitae-rho.vercel.app/",
    ctaLabel: "Visit Live Site",
    themeColor: "174 70% 45%",
  },
  {
    title: "Onyx",
    category: "AI DESIGN SYSTEM",
    description: "A tool that generates custom design systems for web apps. It turns your vibe prompts into ready-to-use design tokens.",
    techStack: ["Next.js", "Tailwind CSS", "Gemini + Groq", "Framer"],
    imageUrl: "/images/onyx-preview.png",
    previewImage: "/images/onyx-mobile-preview.png",
    desktopRightImage: "/images/onyx-right-dekstop-preveiw.png",
    href: "https://onyx-alpha-murex.vercel.app/",
    ctaLabel: "Visit Live Site",
    themeColor: "262 83% 58%",
  },
  {
    title: "Lumina Electronics",
    category: "E-COMMERCE PLATFORM",
    description: "An electronics shop website with real-time inventory tracking and secure checkout.",
    techStack: ["Vite", "Node.js", "MongoDB", "Express"],
    imageUrl: "/images/lumina-preview.png",
    previewImage: "/images/lumina-mobile-preview.png",
    desktopRightImage: "/images/lumina-admin-dashboard.png",
    href: "https://jlfuertes14.github.io/lumina/",
    ctaLabel: "Visit Live Site",
    themeColor: "142 70% 45%",
  },
  {
    title: "Chamen Resort",
    category: "HOSPITALITY WEBSITE",
    description: "A resort landing page with smooth animations, a simple booking flow, and a responsive gallery.",
    techStack: ["Next.js", "Framer Motion", "Tailwind CSS", "Lucide"],
    imageUrl: "/images/chamen-resort.png",
    previewImage: "/images/chamen-resort-mobile-preview.png",
    desktopRightImage: "/images/chamen-resort-rght-dekstop.png",
    href: "https://hotel-site-nu.vercel.app/",
    ctaLabel: "Visit Live Site",
    themeColor: "36 80% 50%",
  },
  {
    title: "JL Robotics",
    category: "EMBEDDED SYSTEMS",
    description: "A self-balancing robot built using an ESP32, PID control algorithms, and real-time sensor data.",
    techStack: ["ESP32", "C++", "Arduino", "PID Control"],
    imageUrl: "/images/jl-robotics-preview.png",
    previewImage: "/images/jl-robotics-mobile-preview.png",
    desktopRightImage: "/images/jl-robotics-right-desktop-preview.png",
    href: "https://jlfuertes14.github.io/roboportfolio/",
    ctaLabel: "Visit Live Site",
    themeColor: "217 91% 60%",
  },
];
