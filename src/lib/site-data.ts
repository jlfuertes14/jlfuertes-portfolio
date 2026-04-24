// ─────────────────────────────────────────────
// Single source of truth for all portfolio data
// ─────────────────────────────────────────────

export const siteConfig = {
  name: "John Lester C. Fuertes",
  shortName: "JL",
  title: "Computer Engineering Student",
  tagline:
    "Computer Engineering student bridging software and hardware. Building the future through code and circuits.",
  location: "Taytay, Rizal, Philippines",
  email: "johnlester.fuertes@gmail.com",
  phone: "09774129580",
  university: "Rizal Technological University",
  degree: "BS Computer Engineering",
};

export const navLinks = [
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
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
  { name: "C++ / Arduino", category: "hardware" },
  { name: "MicroPython", category: "hardware" },
  { name: "ESP32", category: "hardware" },
  { name: "Embedded Systems", category: "hardware" },
  { name: "UI/UX Design", category: "design" },
];

export const projects = [
  {
    title: "Lumina Electronics",
    location: "E-Commerce",
    flag: "⚡",
    stats: "Vite • Node.js • MongoDB",
    imageUrl: "/images/lumina-preview.png",
    href: "https://jlfuertes14.github.io/lumina/",
    themeColor: "142 70% 45%",
  },
  {
    title: "JL Robotics",
    location: "Self-Balancing Robot",
    flag: "🤖",
    stats: "ESP32 • PID • Electronics",
    imageUrl: "/images/jl-robotics-preview.png",
    href: "https://jlfuertes14.github.io/roboportfolio/",
    themeColor: "217 91% 60%",
  },
  {
    title: "Barangay Portal",
    location: "Digital Services",
    flag: "🏛️",
    stats: "Next.js • Tailwind • Vercel",
    imageUrl: "/images/barangay-portal.png",
    href: "https://barangay-digital-portal.vercel.app/",
    themeColor: "262 83% 58%",
  },
  {
    title: "Chamen Resort",
    location: "Resort Website",
    flag: "🏖️",
    stats: "Next.js • Framer Motion • Tailwind",
    imageUrl: "/images/chamen-resort.png",
    href: "https://hotel-site-nu.vercel.app/",
    themeColor: "36 80% 50%",
  },
  {
    title: "AniVerse",
    location: "Anime Discovery Engine",
    flag: "🌸",
    stats: "Next.js • FastAPI • MongoDB",
    imageUrl: "/images/aniverse-preview.png",
    href: "https://aniverse-rose.vercel.app/",
    themeColor: "330 80% 55%",
  },
];
