"use client";

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Download, ExternalLink, Briefcase, GraduationCap, Award, Code, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import { siteConfig, skills, projects } from '@/lib/site-data';
import { motion } from 'framer-motion';

const JohnResumeData = {
  name: siteConfig.name,
  title: siteConfig.title,
  avatar: "/images/profile-dark.png",
  email: siteConfig.email,
  phone: siteConfig.phone,
  location: siteConfig.location,
  summary: "Computer Engineering student bridging software and hardware. I pride myself on having an 'I'll figure it out' mindset no matter how hard the problem is. Experienced in full-stack web development, electronics, and embedded systems.",
  skills: [
    { name: 'React / Next.js', level: 90 },
    { name: 'TypeScript', level: 85 },
    { name: 'Node.js', level: 80 },
    { name: 'Python', level: 85 },
    { name: 'C++ / Arduino', level: 90 },
    { name: 'Embedded Systems', level: 85 },
  ],
  experience: [
    {
      title: 'Open Source Projects & Technical Contributions',
      company: 'GitHub Portfolio',
      period: '2022 - Present',
      description: 'Developing and maintaining multiple high-performance web applications and robotics projects. Architecting scalable backends and intuitive user interfaces.',
    },
    {
      title: 'STEM Research Lead',
      company: 'Buting Senior High School',
      period: '2020 - 2022',
      description: 'Led feasibility studies on Piezoelectric generators and natural mouth cleaners. Coordinated team experiments resulting in Honors graduation.',
    },
  ],
  education: [
    {
      degree: 'BS Computer Engineering',
      institution: 'Rizal Technological University',
      year: 'Expected 2026',
    },
    {
      degree: 'STEM Strand (Honors)',
      institution: 'Buting Senior High School',
      year: '2022',
    },
  ],
  projects: projects.slice(0, 3).map(p => ({
    name: p.title,
    description: p.description,
    tags: p.techStack,
    link: p.href
  })),
  socialLinks: {
    github: "https://github.com/jlfuertes14",
    linkedin: "https://www.linkedin.com/in/jlfuertes14/",
    twitter: "https://x.com/chiro_yui14",
  },
};

export default function ResumePage() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const data = JohnResumeData;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 selection:text-primary">
      {/* Navigation Space */}
      <div className="h-24" />
      
      <div className="max-w-6xl mx-auto px-6 py-12 md:px-12">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-3xl shadow-xl border border-border overflow-hidden mb-12 transition-all duration-500 hover:shadow-2xl hover:border-primary/20"
        >
          <div className="relative h-32 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card"></div>
          </div>
          
          <div className="relative px-8 pb-8 -mt-16">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-8">
              <div className="relative group">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary via-primary/50 to-primary opacity-20 blur-xl group-hover:opacity-40 transition-opacity"></div>
                <div className="relative size-32 rounded-full border-4 border-card shadow-xl overflow-hidden z-10 bg-muted">
                  <Image
                    src={data.avatar}
                    alt={data.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-tighter mb-2">{data.name}</h1>
                <p className="text-lg md:text-xl text-primary font-heading font-medium mb-4 uppercase tracking-[0.2em] text-sm opacity-80">{data.title}</p>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm text-muted-foreground font-medium">
                  <div className="flex items-center gap-2 hover:text-foreground transition-colors cursor-default">
                    <Mail className="size-4 text-primary/70" />
                    <span>{data.email}</span>
                  </div>
                  <div className="flex items-center gap-2 hover:text-foreground transition-colors cursor-default">
                    <Phone className="size-4 text-primary/70" />
                    <span>{data.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 hover:text-foreground transition-colors cursor-default">
                    <MapPin className="size-4 text-primary/70" />
                    <span>{data.location}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <Button variant="default" className="gap-2 rounded-xl shadow-lg shadow-primary/20 font-heading" asChild>
                  <a href="/assets/resume.pdf" download="John_Lester_Fuertes_Resume.pdf">
                    <Download className="size-4" />
                    Download CV
                  </a>
                </Button>
                <div className="flex justify-center gap-2">
                  <Button variant="outline" size="icon" className="rounded-xl border-border/50 hover:border-primary/30 transition-all" asChild>
                    <a href={data.socialLinks.github} target="_blank" aria-label="GitHub">
                      <Github className="size-4" />
                    </a>
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-xl border-border/50 hover:border-primary/30 transition-all" asChild>
                    <a href={data.socialLinks.linkedin} target="_blank" aria-label="LinkedIn">
                      <Linkedin className="size-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-10">
            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="p-6 bg-card border-border shadow-lg hover:shadow-xl transition-all duration-500 border-primary/5 hover:border-primary/20">
                <h2 className="text-xl font-heading font-bold text-foreground mb-8 flex items-center gap-3 tracking-tighter">
                  <Code className="size-5 text-primary" />
                  Core Skills
                </h2>
                <div className="space-y-6">
                  {data.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="group"
                      onMouseEnter={() => setHoveredSkill(skill.name)}
                      onMouseLeave={() => setHoveredSkill(null)}
                    >
                      <div className="flex justify-between mb-2 font-heading">
                        <span className="text-xs font-bold uppercase tracking-widest text-foreground/80">{skill.name}</span>
                        <span className="text-xs font-bold text-primary">{skill.level}%</span>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-primary rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Software & Tools */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-6 bg-card border-border shadow-lg hover:shadow-xl transition-all duration-500 border-primary/5 hover:border-primary/20">
                <h2 className="text-xl font-heading font-bold text-foreground mb-6 flex items-center gap-3 tracking-tighter">
                  <Briefcase className="size-5 text-primary" />
                  Software & Tools
                </h2>
                <div className="flex flex-wrap gap-2">
                  {[
                    "VS Code",
                    "Visual Studio",
                    "Arduino IDE",
                    "Thonny",
                    "KiCAD",
                    "TinkerCAD",
                    "MATLAB",
                    "Git/GitHub",
                  ].map((tool) => (
                    <Badge key={tool} variant="secondary" className="bg-muted/50 border-none text-[10px] uppercase tracking-tighter px-3 py-1 font-bold">
                      {tool}
                    </Badge>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Education */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-6 bg-card border-border shadow-lg hover:shadow-xl transition-all duration-500 border-primary/5 hover:border-primary/20">
                <h2 className="text-xl font-heading font-bold text-foreground mb-8 flex items-center gap-3 tracking-tighter">
                  <GraduationCap className="size-5 text-primary" />
                  Education
                </h2>
                <div className="space-y-8">
                  <div className="relative pl-6 before:absolute before:left-0 before:top-1.5 before:h-2 before:w-2 before:rounded-full before:bg-primary group font-sans">
                    <h3 className="font-heading font-bold text-foreground group-hover:text-primary transition-colors tracking-tight text-lg">BS Computer Engineering</h3>
                    <p className="text-sm text-muted-foreground font-medium">Rizal Technological University</p>
                    <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary/60 mt-1">Expected 2026</p>
                    <p className="mt-4 text-xs leading-relaxed text-muted-foreground/80 font-medium italic">
                      Thesis: HatchWatch - IoT and AI-based Egg Incubator system for Philippine Mallard Ducks.
                    </p>
                  </div>
                  <div className="relative pl-6 before:absolute before:left-0 before:top-1.5 before:h-2 before:w-2 before:rounded-full before:bg-primary/50 group">
                    <h3 className="font-heading font-bold text-foreground group-hover:text-primary transition-colors tracking-tight text-lg">STEM Strand (Honors)</h3>
                    <p className="text-sm text-muted-foreground font-medium">Buting Senior High School</p>
                    <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary/60 mt-1">2022</p>
                    <p className="mt-1 text-xs text-muted-foreground/80 font-medium">Graduated with 94% GPA.</p>
                  </div>
                  <div className="relative pl-6 before:absolute before:left-0 before:top-1.5 before:h-2 before:w-2 before:rounded-full before:bg-primary/50 group border-none">
                    <h3 className="font-heading font-bold text-foreground group-hover:text-primary transition-colors tracking-tight text-lg">Junior High School (Honors)</h3>
                    <p className="text-sm text-muted-foreground font-medium">Nagpayong High School</p>
                    <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary/60 mt-1">2020</p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Languages */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="p-6 bg-card border-border shadow-lg hover:shadow-xl transition-all duration-500 border-primary/5 hover:border-primary/20">
                <h2 className="text-xl font-heading font-bold text-foreground mb-6 flex items-center gap-3 tracking-tighter">
                  <Globe className="size-5 text-primary" />
                  Languages
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm font-sans">
                    <span className="font-bold text-foreground/80 uppercase text-[11px] tracking-widest">English</span>
                    <span className="text-[10px] uppercase tracking-widest text-primary font-bold bg-primary/10 px-2 py-0.5 rounded">Proficient</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-sans">
                    <span className="font-bold text-foreground/80 uppercase text-[11px] tracking-widest">Tagalog</span>
                    <span className="text-[10px] uppercase tracking-widest text-primary font-bold bg-primary/10 px-2 py-0.5 rounded">Native</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-10">
            {/* Experience & Leadership */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="p-8 bg-card border-border shadow-lg hover:shadow-xl transition-all duration-500 border-primary/5 hover:border-primary/20">
                <h2 className="text-xl font-heading font-bold text-foreground mb-10 flex items-center gap-3 tracking-tighter">
                  <Award className="size-5 text-primary" />
                  Leadership & Activities
                </h2>
                <div className="space-y-10">
                  <div className="relative pl-8 pb-10 border-l border-border/50 group">
                    <div className="absolute left-[-4.5px] top-0 size-2 rounded-full bg-primary ring-4 ring-background" />
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                      <h3 className="text-xl font-heading font-bold text-foreground group-hover:text-primary transition-colors tracking-tight">Pasig City Scholarship</h3>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground bg-muted px-3 py-1 rounded-md">2015 - Present</span>
                    </div>
                    <p className="text-xs font-bold text-primary/80 mb-4 uppercase tracking-widest">Scholar / Active Member</p>
                    <p className="text-muted-foreground text-sm leading-relaxed font-medium">Maintained academic excellence and active participation in community programs for over a decade.</p>
                  </div>

                  <div className="relative pl-8 pb-10 border-l border-border/50 group">
                    <div className="absolute left-[-4.5px] top-0 size-2 rounded-full bg-primary/50 ring-4 ring-background" />
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                      <h3 className="text-xl font-heading font-bold text-foreground group-hover:text-primary transition-colors tracking-tight">Professional Development Seminars</h3>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground bg-muted px-3 py-1 rounded-md">Aug - Dec 2025</span>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed font-medium">Participated in a comprehensive series of 10 technical seminars covering IoT, API Security, and modern React development.</p>
                  </div>

                  <div className="relative pl-8 border-l border-border/50 last:border-none group">
                    <div className="absolute left-[-4.5px] top-0 size-2 rounded-full bg-primary/50 ring-4 ring-background" />
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                      <h3 className="text-xl font-heading font-bold text-foreground group-hover:text-primary transition-colors tracking-tight">STEM Research Lead</h3>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground bg-muted px-3 py-1 rounded-md">Buting SHS</span>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed font-medium">Led feasibility studies on Piezoelectric generators and coordinated cross-functional team experiments.</p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Projects */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card className="p-8 bg-card border-border shadow-lg hover:shadow-xl transition-all duration-500 border-primary/5 hover:border-primary/20">
                <h2 className="text-xl font-heading font-bold text-foreground mb-10 flex items-center gap-3 tracking-tighter">
                  <Code className="size-5 text-primary" />
                  Featured Works
                </h2>
                <div className="space-y-12">
                  {data.projects.map((project, index) => (
                    <div
                      key={index}
                      className="relative pl-8 pb-12 border-l border-border/50 last:pb-0 last:border-none group"
                    >
                      <div className="absolute left-[-4.5px] top-0 size-2 rounded-full bg-primary/50 ring-4 ring-background group-hover:bg-primary group-hover:scale-125 transition-all" />
                      
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
                        <div className="flex items-center gap-4">
                          <h3 className="text-xl font-heading font-bold text-foreground group-hover:text-primary transition-colors tracking-tight">
                            {project.name}
                          </h3>
                          {project.link && (
                            <a 
                              href={project.link} 
                              target="_blank" 
                              className="text-muted-foreground hover:text-primary transition-colors"
                            >
                              <ExternalLink className="size-4" />
                            </a>
                          )}
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-3xl font-medium">
                        {project.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span 
                            key={tag} 
                            className="text-[10px] font-bold uppercase tracking-tighter px-3 py-1 bg-primary/10 text-primary rounded-md border border-primary/5"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
