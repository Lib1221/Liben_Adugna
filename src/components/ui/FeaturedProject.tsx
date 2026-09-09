import React from "react";
import { m } from "framer-motion";
import { FaExternalLinkAlt, FaGithub, FaYoutube } from "react-icons/fa";
import type { Project } from "../../data/projects";

interface FeaturedProjectProps {
  project: Project;
  onCaseStudy: () => void;
}

const FeaturedProject: React.FC<FeaturedProjectProps> = ({ project, onCaseStudy }) => {
  return (
    <m.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="modern-card border border-yellow-500/30 overflow-hidden mb-8"
    >
      <div className="grid md:grid-cols-2 gap-0">
        <div className="relative h-56 md:h-full min-h-56">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>
        <div className="p-6">
          <p className="text-xs uppercase tracking-wider text-yellow-500 mb-2">Featured Work</p>
          <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
          <p className="text-sm text-gray-400 mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-5">
            {project.technologies.slice(0, 5).map((tech) => (
              <span key={tech} className="px-2 py-1 bg-dark-200 text-xs text-gray-300 rounded border border-gray-700">
                {tech}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={onCaseStudy}
              className="px-4 py-2 bg-yellow-500 text-black rounded-lg text-sm font-semibold hover:bg-yellow-400 transition-colors"
            >
              View Case Study
            </button>
            {project.liveDemo && (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-dark-200 text-gray-200 border border-gray-700 rounded-lg text-sm hover:border-yellow-500/60"
              >
                <FaExternalLinkAlt size={11} />
                Demo
              </a>
            )}
            {project.repoLink && (
              <a
                href={project.repoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-dark-200 text-gray-200 border border-gray-700 rounded-lg text-sm hover:border-yellow-500/60"
              >
                <FaGithub size={12} />
                Code
              </a>
            )}
            {project.youtubeLink && (
              <a
                href={project.youtubeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-dark-200 text-gray-200 border border-gray-700 rounded-lg text-sm hover:border-red-500/60"
              >
                <FaYoutube size={12} />
                Video
              </a>
            )}
          </div>
        </div>
      </div>
    </m.div>
  );
};

export default FeaturedProject;
