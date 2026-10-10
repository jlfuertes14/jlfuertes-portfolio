import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";

const Projects = dynamic(() => import("@/components/sections/Projects"));
const Services = dynamic(() => import("@/components/sections/Services"));
const About = dynamic(() => import("@/components/sections/About"));
const Experience = dynamic(() => import("@/components/sections/Experience"));
const Contact = dynamic(() => import("@/components/sections/Contact"));
const Footer = dynamic(() => import("@/components/sections/Footer"));

export default function Home() {
  return (
    <>
      <main className="relative z-10 bg-background min-h-screen">
        <Hero />
        <Projects />
        <Services />
        <About />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
