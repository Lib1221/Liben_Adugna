import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaYoutube, FaExternalLinkAlt, FaLock } from "react-icons/fa";
import { projects, techIcons } from "../../data/projects";
import type { Project } from "../../data/projects";

const categories = ["All", "AI/ML", "Data Science", "Mobile", "Web", "MLOps"];

const ProfileSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <section>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
          My <span className="text-yellow-500">Portfolio</span>
        </h2>
        <div className="w-16 h-1 bg-yellow-500 rounded" />
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="p-4 bg-dark-300 border border-gray-800 rounded-xl text-center">
          <p className="text-2xl font-bold text-yellow-500">{projects.length}</p>
          <p className="text-xs text-gray-500">Total Projects</p>
        </div>
        <div className="p-4 bg-dark-300 border border-gray-800 rounded-xl text-center">
          <p className="text-2xl font-bold text-yellow-500">
            {projects.filter(p => p.category === "AI/ML" || p.category === "Data Science").length}
          </p>
          <p className="text-xs text-gray-500">AI/ML Projects</p>
        </div>
        <div className="p-4 bg-dark-300 border border-gray-800 rounded-xl text-center">
          <p className="text-2xl font-bold text-yellow-500">
            {projects.filter(p => p.category === "Mobile").length}
          </p>
          <p className="text-xs text-gray-500">Mobile Apps</p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
              ${activeCategory === cat
                ? "bg-yellow-500 text-black"
                : "bg-dark-300 text-gray-400 hover:text-white border border-gray-800"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ delay: index * 0.05 }}
      whileHover={!project.isPrivate ? { y: -4, transition: { duration: 0.2 } } : undefined}
      className={`bg-dark-300 border rounded-xl overflow-hidden transition-all duration-300 group
        ${project.isPrivate
          ? "border-gray-800 opacity-80"
          : "border-gray-800 hover:border-yellow-500/50 hover:shadow-lg hover:shadow-yellow-500/10"
        }`}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-dark-200 shimmer" />
        )}
        <img
          src={project.image || "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=400&fit=crop"}
          alt={project.title}
          loading="lazy"
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Private Badge */}
        {project.isPrivate && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 bg-red-500/20 border border-red-500/40 rounded-full">
            <FaLock size={10} className="text-red-400" />
            <span className="text-xs font-medium text-red-400">Private</span>
          </div>
        )}
        
        {/* Category Badge */}
        <div className="absolute bottom-3 left-3">
          <span className="px-3 py-1 text-xs font-medium bg-yellow-500 text-black rounded-full">
            {project.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className={`text-lg font-semibold text-white mb-1 transition-colors ${!project.isPrivate ? "group-hover:text-yellow-500" : ""}`}>
          {project.title}
        </h3>
        <p className="text-sm text-yellow-500/70 mb-3">{project.role}</p>
        <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="flex items-center gap-1.5 px-2 py-1 bg-dark-200 border border-gray-700 rounded text-xs text-gray-400"
            >
              {techIcons[tech] || null}
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-2 py-1 bg-dark-200 border border-gray-700 rounded text-xs text-gray-500">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        {/* Links */}
        <div className="flex gap-2">
          {project.repoLink && (
            <a
              href={project.repoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 bg-dark-200 border border-gray-700 rounded-lg text-xs text-gray-400 hover:text-yellow-500 hover:border-yellow-500/50 transition-all"
            >
              <FaGithub size={12} />
              Code
            </a>
          )}
          {project.liveDemo && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 bg-yellow-500 rounded-lg text-xs text-black font-medium hover:bg-yellow-400 transition-colors"
            >
              <FaExternalLinkAlt size={10} />
              Demo
            </a>
          )}
          {project.youtubeLink && (
            <a
              href={project.youtubeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 bg-dark-200 border border-gray-700 rounded-lg text-xs text-gray-400 hover:text-red-500 hover:border-red-500/50 transition-all"
            >
              <FaYoutube size={12} />
              Video
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileSection;
