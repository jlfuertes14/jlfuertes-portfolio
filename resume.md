import React, { useState } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Download, ExternalLink, Briefcase, GraduationCap, Award, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

interface Skill {
  name: string;
  level: number;
}

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
}

interface Education {
  degree: string;
  institution: string;
  year: string;
}

interface Project {
  name: string;
  description: string;
  tags: string[];
  link?: string;
}

interface ResumeData {
  name: string;
  title: string;
  avatar: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  skills: Skill[];
  experience: Experience[];
  education: Education[];
  projects: Project[];
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}

const defaultResumeData: ResumeData = {
  name: 'Alex Johnson',
  title: 'Senior Full Stack Developer',
  avatar: 'https://api.dicebear.com/8.x/lorelei-neutral/svg?seed=Alex',
  email: 'alex.johnson@email.com',
  phone: '+1 (555) 123-4567',
  location: 'San Francisco, CA',
  summary: 'Passionate full-stack developer with 8+ years of experience building scalable web applications. Specialized in React, TypeScript, and Node.js. Strong focus on clean code, user experience, and modern development practices.',
  skills: [
    { name: 'React', level: 95 },
    { name: 'TypeScript', level: 90 },
    { name: 'Node.js', level: 85 },
    { name: 'Python', level: 80 },
    { name: 'AWS', level: 75 },
    { name: 'Docker', level: 70 },
  ],
  experience: [
    {
      title: 'Senior Full Stack Developer',
      company: 'Tech Innovations Inc.',
      period: '2020 - Present',
      description: 'Lead development of enterprise-scale applications serving 100K+ users. Architected microservices infrastructure and mentored junior developers.',
    },
    {
      title: 'Full Stack Developer',
      company: 'Digital Solutions Co.',
      period: '2018 - 2020',
      description: 'Developed and maintained multiple client projects using React and Node.js. Improved application performance by 40% through optimization.',
    },
    {
      title: 'Frontend Developer',
      company: 'StartUp Labs',
      period: '2016 - 2018',
      description: 'Built responsive web applications and collaborated with design team to implement pixel-perfect UIs.',
    },
  ],
  education: [
    {
      degree: 'Master of Computer Science',
      institution: 'Stanford University',
      year: '2016',
    },
    {
      degree: 'Bachelor of Software Engineering',
      institution: 'UC Berkeley',
      year: '2014',
    },
  ],
  projects: [
    {
      name: 'E-Commerce Platform',
      description: 'Built a full-featured e-commerce platform with payment integration and real-time inventory management.',
      tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      link: '#',
    },
    {
      name: 'Task Management App',
      description: 'Collaborative task management tool with real-time updates and team collaboration features.',
      tags: ['TypeScript', 'Next.js', 'PostgreSQL'],
      link: '#',
    },
    {
      name: 'Analytics Dashboard',
      description: 'Real-time analytics dashboard for monitoring business metrics and generating insights.',
      tags: ['React', 'D3.js', 'Python', 'FastAPI'],
      link: '#',
    },
  ],
  socialLinks: {
    github: '#',
    linkedin: '#',
    twitter: '#',
  },
};

const ResumePage: React.FC<{ data?: ResumeData }> = ({ data = defaultResumeData }) => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="bg-card rounded-3xl shadow-xl border border-border overflow-hidden mb-8 transition-all duration-500 hover:shadow-2xl">
          <div className="relative h-32 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card"></div>
          </div>
          
          <div className="relative px-8 pb-8 -mt-16">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
              <div className="relative group">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary via-primary/50 to-primary opacity-60 blur-lg group-hover:opacity-80 transition-opacity"></div>
                <img
                  src={data.avatar}
                  alt={data.name}
                  className="relative size-32 rounded-full border-4 border-card shadow-xl object-cover z-10"
                />
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">{data.name}</h1>
                <p className="text-xl text-muted-foreground mb-4">{data.title}</p>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Mail className="size-4" />
                    <span>{data.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="size-4" />
                    <span>{data.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="size-4" />
                    <span>{data.location}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button variant="default" className="gap-2">
                  <Download className="size-4" />
                  Download CV
                </Button>
                <div className="flex gap-2">
                  {data.socialLinks.github && (
                    <Button variant="outline" size="icon" asChild>
                      <a href={data.socialLinks.github} aria-label="GitHub">
                        <Github className="size-4" />
                      </a>
                    </Button>
                  )}
                  {data.socialLinks.linkedin && (
                    <Button variant="outline" size="icon" asChild>
                      <a href={data.socialLinks.linkedin} aria-label="LinkedIn">
                        <Linkedin className="size-4" />
                      </a>
                    </Button>
                  )}
                  {data.socialLinks.twitter && (
                    <Button variant="outline" size="icon" asChild>
                      <a href={data.socialLinks.twitter} aria-label="Twitter">
                        <Twitter className="size-4" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-8">
            {/* Summary */}
            <Card className="p-6 bg-card border-border shadow-lg hover:shadow-xl transition-all duration-500">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Award className="size-6 text-primary" />
                About Me
              </h2>
              <p className="text-muted-foreground leading-relaxed">{data.summary}</p>
            </Card>

            {/* Skills */}
            <Card className="p-6 bg-card border-border shadow-lg hover:shadow-xl transition-all duration-500">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Code className="size-6 text-primary" />
                Skills
              </h2>
              <div className="space-y-4">
                {data.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="group"
                    onMouseEnter={() => setHoveredSkill(skill.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all duration-700 ease-out"
                        style={{
                          width: hoveredSkill === skill.name ? `${skill.level}%` : '0%',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Education */}
            <Card className="p-6 bg-card border-border shadow-lg hover:shadow-xl transition-all duration-500">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <GraduationCap className="size-6 text-primary" />
                Education
              </h2>
              <div className="space-y-4">
                {data.education.map((edu, index) => (
                  <div key={index} className="border-l-2 border-primary pl-4 hover:border-primary/70 transition-colors">
                    <h3 className="font-semibold text-foreground">{edu.degree}</h3>
                    <p className="text-sm text-muted-foreground">{edu.institution}</p>
                    <p className="text-xs text-muted-foreground mt-1">{edu.year}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Experience */}
            <Card className="p-6 bg-card border-border shadow-lg hover:shadow-xl transition-all duration-500">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Briefcase className="size-6 text-primary" />
                Experience
              </h2>
              <div className="space-y-6">
                {data.experience.map((exp, index) => (
                  <div
                    key={index}
                    className="relative pl-8 pb-6 border-l-2 border-border last:pb-0 hover:border-primary transition-colors group"
                  >
                    <div className="absolute left-[-9px] top-0 size-4 rounded-full bg-primary border-4 border-card group-hover:scale-125 transition-transform" />
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                      <h3 className="text-lg font-semibold text-foreground">{exp.title}</h3>
                      <span className="text-sm text-muted-foreground">{exp.period}</span>
                    </div>
                    <p className="text-sm font-medium text-primary mb-2">{exp.company}</p>
                    <p className="text-muted-foreground">{exp.description}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Projects */}
            <Card className="p-6 bg-card border-border shadow-lg hover:shadow-xl transition-all duration-500">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Code className="size-6 text-primary" />
                Featured Projects
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.projects.map((project, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl border border-border bg-muted/50 hover:bg-muted transition-all duration-300 hover:scale-105 hover:shadow-lg group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {project.name}
                      </h3>
                      {project.link && (
                        <a href={project.link} className="text-muted-foreground hover:text-primary transition-colors">
                          <ExternalLink className="size-4" />
                        </a>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ResumePageDemo() {
  return <ResumePage />;
}
