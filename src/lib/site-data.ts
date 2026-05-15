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
  { label: "Home", href: "/" },
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

export const projects = [
  {
    title: "AniVerse",
    category: "ANIME DISCOVERY ENGINE",
    description: "A high-performance anime discovery platform with real-time streaming data, advanced search capabilities, and a sleek brutalist-inspired UI.",
    techStack: ["Next.js", "FastAPI", "MongoDB", "Tailwind CSS"],
    imageUrl: "/images/aniverse.png",
    previewImage: "/images/aniverse-mobile-preview.png",
    desktopRightImage: "/images/aniverse-right-image.png",
    href: "https://aniverse-rose.vercel.app/",
    themeColor: "330 80% 55%",
  },
  {
    title: "Lumina Electronics",
    category: "E-COMMERCE PLATFORM",
    description: "A comprehensive electronics shop featuring a modern shopping experience, real-time inventory tracking, and secure checkout integration.",
    techStack: ["Vite", "Node.js", "MongoDB", "Express"],
    imageUrl: "/images/lumina-preview.png",
    previewImage: "/images/lumina-mobile-preview.png",
    desktopRightImage: "/images/lumina-admin-dashboard.png",
    href: "https://jlfuertes14.github.io/lumina/",
    themeColor: "142 70% 45%",
  },
  {
    title: "JL Robotics",
    category: "EMBEDDED SYSTEMS",
    description: "A self-balancing robot project exploring PID control algorithms, ESP32 integration, and real-time sensor data processing.",
    techStack: ["ESP32", "C++", "Arduino", "PID Control"],
    imageUrl: "/images/jl-robotics-preview.png",
    previewImage: "/images/jl-robotics-mobile-preview.png",
    desktopRightImage: "/images/jl-robotics-right-desktop-preview.png",
    href: "https://jlfuertes14.github.io/roboportfolio/",
    themeColor: "217 91% 60%",
  },
  {
    title: "Barangay Portal",
    category: "DIGITAL SERVICES",
    description: "A community-focused digital portal designed to streamline barangay services and improve communication between residents and officials.",
    techStack: ["Next.js", "Tailwind CSS", "Vercel", "Framer Motion"],
    imageUrl: "/images/barangay-portal.png",
    previewImage: "/images/barangay-portal-mobile-preview.png",
    desktopRightImage: "/images/barangay-portal-right-dekstop-preveiw.png",
    href: "https://barangay-digital-portal.vercel.app/",
    themeColor: "262 83% 58%",
  },
  {
    title: "Chamen Resort",
    category: "HOSPITALITY WEBSITE",
    description: "A premium resort landing page featuring immersive animations, easy booking flow, and a fully responsive gallery experience.",
    techStack: ["Next.js", "Framer Motion", "Tailwind CSS", "Lucide"],
    imageUrl: "/images/chamen-resort.png",
    previewImage: "/images/chamen-resort-mobile-preview.png",
    desktopRightImage: "/images/chamen-resort-rght-dekstop.png",
    href: "https://hotel-site-nu.vercel.app/",
    themeColor: "36 80% 50%",
  },
];
