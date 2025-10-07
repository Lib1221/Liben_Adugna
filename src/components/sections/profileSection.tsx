import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
interface Project {
  title: string;
  description: string;
  technologies: string[];
  role: string;
  duration: string;
  features: string[];
  image: string;
  repoLink?: string;
  liveDemo?: string;
  category: "Mobile App" | "Web App" | "Web Backend";
}

const projects: Project[] = [
  {
    title: "Smart Loan Calculator App",
    description:
      "A Flutter-based mobile application that calculates loan payments, generates amortization schedules, and visualizes data with charts and themes.",
    technologies: ["Flutter", "Dart", "Firebase", "GetX"],
    role: "Mobile App Developer",
    duration: "Jun 2025 – Aug 2025",
    features: [
      "Implemented dynamic loan formulas and repayment logic.",
      "Integrated Firebase for saving loan records.",
      "Added dark/light modes, print, and reset features.",
    ],
    image: "/images/c1.png",
    repoLink: "https://github.com/libenadugna/loan-calculator",
    liveDemo: "https://loanapp.web.app",
    category: "Mobile App",
  },
  {
    title: "Portfolio Website",
    description:
      "A personal developer portfolio built with React, TypeScript, and Tailwind CSS — showcasing projects, skills, and resume downloads with a modern UI.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    role: "Frontend Developer",
    duration: "2025",
    features: [
      "Responsive, mobile-first design with smooth animations.",
      "Dark/light mode toggle and clean layout.",
      "Integrated resume download and GitHub project links.",
    ],
    image: "/images/portfolio.png",
    repoLink: "https://github.com/libenadugna/portfolio",
    liveDemo: "https://libenadugna.vercel.app",
    category: "Web App",
  },
  {
    title: "RESTful Blog API",
    description:
      "A backend API built with Django REST Framework for managing blog posts, authentication, and user roles with PostgreSQL.",
    technologies: ["Django", "DRF", "PostgreSQL", "Docker"],
    role: "Backend Developer",
    duration: "Jan 2025 – Mar 2025",
    features: [
      "Developed CRUD APIs for posts and comments.",
      "Implemented JWT-based authentication.",
      "Dockerized application for deployment and scalability.",
    ],
    image: "/images/blog-api.png",
    repoLink: "https://github.com/libenadugna/blog-api",
    liveDemo: "https://api-blog-demo.onrender.com",
    category: "Web Backend",
  },
  {
    title: "Social Media App",
    description: "Cross-platform mobile app using Flutter and Firebase.",
    technologies: ["Flutter", "Firebase", "GetX"],
    role: "Mobile App Developer",
    duration: "Mar 2025 – May 2025",
    features: [
      "Real-time messaging and notifications.",
      "User authentication and profile management.",
      "Media upload and news feed implementation.",
    ],
    image: "/images/social-app.png",
    repoLink: "#",
    liveDemo: "#",
    category: "Mobile App",
  },
  {
    title: "E-commerce Platform",
    description: "Fullstack e-commerce website with React, Node.js & MongoDB.",
    technologies: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
    role: "Fullstack Developer",
    duration: "Feb 2025 – Apr 2025",
    features: [
      "Shopping cart, product catalog, and payment integration.",
      "User authentication and admin dashboard.",
      "RESTful API backend with Express.js.",
    ],
    image: "/images/ecommerce.png",
    repoLink: "#",
    liveDemo: "#",
    category: "Web App",
  },
];

const categories = ["All", "Mobile App", "Web App", "Web Backend"] as const;

const PortfolioSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<typeof categories[number]>("All");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  const selectedProject = selectedIndex !== null ? projects[selectedIndex] : null;

  const prevProject = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + projects.length) % projects.length);
  };

  const nextProject = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % projects.length);
  };

  const prevIndex = selectedIndex !== null ? (selectedIndex - 1 + projects.length) % projects.length : 0;
  const nextIndex = selectedIndex !== null ? (selectedIndex + 1) % projects.length : 0;

  return (
    <section className="mt-12 relative z-0">
      <h2 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-6 border-b border-gray-700 pb-3">
        Portfolio
      </h2>

      {/* Category Tabs */}
      <div className="flex gap-4 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`px-4 py-2 rounded-full font-semibold transition-all duration-300
            ${selectedCategory === cat ? "bg-yellow-400 text-black" : "bg-gray-800 text-gray-300 hover:bg-yellow-400 hover:text-black"}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => {
          const globalIndex = projects.indexOf(project);
          return (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="p-4 bg-gray-800 rounded-xl transition-transform hover:-translate-y-1 cursor-pointer flex flex-col"
              onClick={() => setSelectedIndex(globalIndex)}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h4 className="text-white font-semibold text-xl mb-1">{project.title}</h4>
              <p className="text-gray-400 text-sm">{project.description}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Modal with Navigation & Previews */}
      <AnimatePresence>
        {selectedProject !== null && (
          <motion.div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
          >
            <motion.div
              className="bg-gray-900 rounded-2xl w-full max-w-3xl p-6 relative overflow-y-auto max-h-[90vh]"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedIndex(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-yellow-400 text-2xl font-bold"
              >
                &times;
              </button>

              {/* Navigation Arrows */}
              <button
                onClick={prevProject}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-yellow-400 hover:text-yellow-300 text-3xl font-bold"
              >
                &#8249;
              </button>
              <button
                onClick={nextProject}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-yellow-400 hover:text-yellow-300 text-3xl font-bold"
              >
                &#8250;
              </button>

              {/* Small previews */}
              <div className="absolute top-1/2 left-0 w-full flex justify-between px-12 -translate-y-1/2 pointer-events-none">
                <img
                  src={projects[prevIndex].image}
                  alt="Prev"
                  className="w-16 h-16 object-cover rounded-lg opacity-50 pointer-events-none"
                />
                <img
                  src={projects[nextIndex].image}
                  alt="Next"
                  className="w-16 h-16 object-cover rounded-lg opacity-50 pointer-events-none"
                />
              </div>

              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-60 object-cover rounded-lg mb-4"
              />
              <h3 className="text-yellow-400 text-2xl font-bold mb-2">{selectedProject.title}</h3>
              <p className="text-gray-300 mb-2">{selectedProject.description}</p>
              <p className="text-gray-400 text-sm mb-2"><strong>Role:</strong> {selectedProject.role}</p>
              <p className="text-gray-400 text-sm mb-4"><strong>Duration:</strong> {selectedProject.duration}</p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedProject.technologies.map((tech, i) => (
                  <span key={i} className="text-xs bg-gray-700 text-yellow-400 px-2 py-1 rounded-full">
                    {tech}
                  </span>
                ))}
              </div>

              {/* Features */}
              <ul className="list-disc list-inside text-gray-400 mb-4 space-y-1">
                {selectedProject.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>

              {/* Links */}
              <div className="flex gap-4">
                {selectedProject.liveDemo && (
                  <a
                    href={selectedProject.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-yellow-400 font-medium hover:underline"
                  >
                    Live Demo
                  </a>
                )}
                {selectedProject.repoLink && (
                  <a
                    href={selectedProject.repoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-yellow-400 font-medium hover:underline"
                  >
                    Source Code
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PortfolioSection;
