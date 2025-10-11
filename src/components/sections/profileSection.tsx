import React, { useState, type JSX } from "react";
import { motion } from "framer-motion";
import { SiFlutter, SiDart, SiFirebase, SiReact, SiTypescript, SiTailwindcss, SiFramer, SiDjango, SiPostgresql, SiDocker, SiMongodb } from "react-icons/si";

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
  category: "Mobile" | "Backend" | "Web";
}

const projects: Project[] = [
  {
    title: "Smart Gebere",
    description:
      "A smarter way for farmers to cultivate success! With AI-powered crop recommendations, disease detection, and weather forecasting, this app helps farmers grow better crops and plan their days efficiently.",
    technologies: ["Flutter", "Firebase"],
    role: "Mobile App Developer",
    duration: "2025",
    features: [
      "AI-driven crop recommendations using GPS and manual inputs",
      "Disease detection via image recognition with treatment advice",
      "Real-time weather forecasts for efficient planning",
      "Farmer-friendly, intuitive UI design",
    ],
    image: "https://img.youtube.com/vi/C8Kw2S8Khf0/maxresdefault.jpg",
    repoLink: "https://github.com/lib1221/Smart_Gebere",
    youtubeLink: "https://youtu.be/C8Kw2S8Khf0",
    category: "Mobile",
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
    image: "https://res.cloudinary.com/prod/image/upload/e_sharpen:150/me/sharpen-portrait.jpg",
    repoLink: "https://github.com/libenadugna/portfolio",
    liveDemo: "https://libenadugna.vercel.app",
    category: "Web",
  },
  {
    title: "Backend API Service",
    description: "A RESTful API built with Django and PostgreSQL for managing user data and authentication.",
    technologies: ["Django", "PostgreSQL", "Docker"],
    role: "Backend Developer",
    duration: "2025",
    features: ["User authentication", "CRUD endpoints", "Dockerized service"],
    repoLink: "https://github.com/libenadugna/backend-api",
    liveDemo: "",
    category: "Backend",
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
  const [selectedCategory, setSelectedCategory] = useState<"All" | "Mobile" | "Backend" | "Web">("All");

  const filteredProjects =
    selectedCategory === "All" ? projects : projects.filter((p) => p.category === selectedCategory);

  const categories: Array<"All" | "Mobile" | "Backend" | "Web"> = ["All", "Mobile", "Backend", "Web"];

  return (
    <div className="py-8 px-4 max-w-5xl mx-auto text-white">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl md:text-5xl font-bold"
      >
        Projects
      </motion.h1>
      <div className="h-1 w-20 bg-yellow-400 rounded mt-3 mb-6"></div>

      {/* Category Selector */}
      <div className="flex gap-3 flex-wrap mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full font-medium transition-colors ${
              selectedCategory === cat
                ? "bg-yellow-400 text-gray-900"
                : "bg-gray-800 text-yellow-400 hover:bg-yellow-500"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Timeline */}
      <div className="border-l-2 border-gray-700 pl-6 relative">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.2 }}
            className="mb-12 relative"
          >
            <div className="absolute -left-[30px] w-3 h-3 bg-yellow-400 rounded-full"></div>

            <h4 className="font-bold text-white text-lg">{project.title}</h4>
            <p className="text-yellow-500">{project.role}</p>

            {project.image && (
              <img
                src={project.image}
                alt={project.title}
                className="w-full max-w-md max-h-48 object-cover rounded-lg mb-4 shadow-lg"
              />
            )}

            <p className="text-gray-400 italic mb-2">{project.description}</p>

            {project.features && (
              <ul className="list-disc list-inside text-gray-400 mb-2 space-y-1">
                {project.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            )}

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

            <div className="flex gap-4 text-blue-400">
              {project.youtubeLink && (
                <a href={project.youtubeLink} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  YouTube
                </a>
              )}
              {project.repoLink && (
                <a href={project.repoLink} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  GitHub
                </a>
              )}
              {project.liveDemo && (
                <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  Live Demo
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsSection;
