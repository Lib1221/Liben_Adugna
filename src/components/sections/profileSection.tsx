import React, { useState } from "react";
import { motion } from "framer-motion";

interface Project {
  title: string;
  description: string;
  category: "Mobile" | "Fullstack" | "Backend";
  link?: string; // optional link to project/demo
}

const projects: Project[] = [
  {
    title: "Chat App",
    description: "Real-time chat app built with Flutter & Firebase.",
    category: "Mobile",
    link: "#",
  },
  {
    title: "E-commerce Platform",
    description: "Fullstack e-commerce website with React, Node.js & MongoDB.",
    category: "Fullstack",
    link: "#",
  },
  {
    title: "API Server",
    description: "High-performance REST API built with Node.js and Express.",
    category: "Backend",
    link: "#",
  },
  {
    title: "Social Media App",
    description: "Cross-platform mobile app using Flutter and Firebase.",
    category: "Mobile",
    link: "#",
  },
];

const PortfolioSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<"Mobile" | "Fullstack" | "Backend">("Mobile");

  const filteredProjects = projects.filter(p => p.category === activeCategory);

  return (
    <section className="mt-12">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Portfolio</h2>

      {/* Category Tabs */}
      <div className="flex gap-4 mb-6">
        {["Mobile", "Fullstack", "Backend"].map(category => (
          <button
            key={category}
            className={`px-4 py-2 rounded-full font-semibold transition-all duration-300
              ${activeCategory === category ? "bg-yellow-400 text-black" : "bg-gray-800 text-gray-300 hover:bg-yellow-400 hover:text-black"}`}
            onClick={() => setActiveCategory(category as "Mobile" | "Fullstack" | "Backend")}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((project, idx) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-6 bg-[#1f1f1f] rounded-xl shadow-lg hover:shadow-xl transition-transform hover:-translate-y-1"
          >
            <h3 className="text-white font-semibold text-xl">{project.title}</h3>
            <p className="text-gray-400 mt-2">{project.description}</p>
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-yellow-400 hover:underline">
                View Project
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default PortfolioSection;
