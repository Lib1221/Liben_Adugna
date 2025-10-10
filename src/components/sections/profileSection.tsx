import React, { type JSX } from "react";
import { Briefcase } from "lucide-react";
import {
  SiFlutter,
  SiDart,
  SiFirebase,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiFramer,
  SiDjango,
  SiPostgresql,
  SiDocker,
  SiMongodb,
} from "react-icons/si";
import { motion } from "framer-motion";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  role: string;
  duration: string;
  features?: string[];
  image?: string;
  repoLink?: string;
  liveDemo?: string;
  youtubeLink?: string;
}

const projects: Project[] = [
  {
    title: "Smart Loan Calculator App",
    description:
      "A Flutter-based mobile app that calculates loan payments, generates schedules, and visualizes data.",
    technologies: ["Flutter", "Dart", "Firebase", "GetX"],
    role: "Mobile App Developer",
    duration: "Jun 2025 – Aug 2025",
    features: [
      "Dynamic loan formulas and repayment logic",
      "Firebase integration for saving records",
      "Dark/light modes, print, and reset features",
    ],
    image:
      "https://res.cloudinary.com/prod/image/upload/e_sharpen:150/me/sharpen-portrait.jpg",
    repoLink: "https://github.com/libenadugna/loan-calculator",
    liveDemo: "https://loanapp.web.app",
  },
  {
    title: "Portfolio Website",
    description:
      "A personal portfolio built with React, TypeScript, and Tailwind CSS — showcasing projects, skills, and resume downloads.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    role: "Frontend Developer",
    duration: "2025",
    features: [
      "Responsive, mobile-first design",
      "Dark/light mode toggle",
      "Integrated resume download and GitHub links",
    ],
    image:
      "https://res.cloudinary.com/prod/image/upload/e_sharpen:150/me/sharpen-portrait.jpg",
    repoLink: "https://github.com/libenadugna/portfolio",
    liveDemo: "https://libenadugna.vercel.app",
  },
];

const techIcons: Record<string, JSX.Element> = {
  Flutter: <SiFlutter className="text-blue-400 w-4 h-4" />,
  Dart: <SiDart className="text-blue-600 w-4 h-4" />,
  Firebase: <SiFirebase className="text-yellow-400 w-4 h-4" />,
  React: <SiReact className="text-cyan-400 w-4 h-4" />,
  "TypeScript": <SiTypescript className="text-blue-500 w-4 h-4" />,
  "Tailwind CSS": <SiTailwindcss className="text-teal-400 w-4 h-4" />,
  "Framer Motion": <SiFramer className="text-purple-400 w-4 h-4" />,
  Django: <SiDjango className="text-green-700 w-4 h-4" />,
  PostgreSQL: <SiPostgresql className="text-blue-700 w-4 h-4" />,
  Docker: <SiDocker className="text-blue-500 w-4 h-4" />,
  MongoDB: <SiMongodb className="text-green-600 w-4 h-4" />,
};

const ProjectsSection: React.FC = () => {
  return (
    <div>
            <motion.h1
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl md:text-5xl font-bold text-white"
      >
        Projects
      </motion.h1>
      <div className="h-1 w-20 bg-yellow-400 rounded mt-3 mb-6"></div>

      <div className="border-l-2 mt-12 border-gray-700 pl-6 relative">
        {projects.map((project, index) => (
          <div key={index} className="mb-12 relative">
            {/* Circle marker */}
            <div className="absolute -left-[30px]  w-3 h-3 bg-yellow-400 rounded-full"></div>
            <h4 className="font-bold text-white text-lg">{project.title}</h4>
            <p className="text-yellow-500">{project.role}</p>
            <img
                src={project.image}
                alt={project.title}
                className="w-full max-w-md max-h-48 object-cover rounded-lg mb-4 shadow-lg"
              />

            {/* Project content */}
            


            <p className="text-gray-400 italic mb-2">{project.description}</p>

            {/* Features list */}
            {project.features && (
              <ul className="list-disc list-inside text-gray-400 mb-2 space-y-1">
                {project.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            )}

            {/* Tech stack */}
            <div className="flex flex-wrap gap-2 mb-2">
              {project.technologies.map((tech) => (
                <div
                  key={tech}
                  className="flex items-center gap-1 bg-gray-800 text-yellow-400 px-2 py-1 rounded-full text-xs"
                >
                  {techIcons[tech] || null}
                  <span>{tech}</span>
                </div>
              ))}
            </div>

            {/* Links */}
            <div className="flex gap-4 text-blue-400">
              {project.youtubeLink && (
                <a
                  href={project.youtubeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  YouTube
                </a>
              )}
              {project.repoLink && (
                <a
                  href={project.repoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  GitHub
                </a>
              )}
              {project.liveDemo && (
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Live Demo
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsSection;
