import React from "react";
import { m } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { FaGithub, FaYoutube } from "react-icons/fa";
import type { Project } from "../../data/projects";

interface FeaturedProjectProps {
  project: Project;
  onCaseStudy: () => void;
}

const FeaturedProject: React.FC<FeaturedProjectProps> = ({ project, onCaseStudy }) => (
  <m.article
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    className="surface mb-12 overflow-hidden"
  >
    <div className="grid md:grid-cols-2">
      <div className="relative min-h-56 md:order-last">
        <img src={project.image} alt="" className="h-full w-full object-cover" />
        <div
          className="absolute inset-0 bg-gradient-to-r from-dark-400 via-dark-400/30 to-transparent md:bg-gradient-to-l"
          aria-hidden="true"
        />
      </div>

      <div className="p-6 md:p-8">
        <p className="eyebrow mb-3 text-yellow-500/80">Flagship</p>
        <h3 className="text-title font-semibold text-white">{project.title}</h3>
        <p className="mt-1 text-sm text-gray-500">{project.role}</p>
        <p className="mt-4 max-w-prose text-[15px] leading-relaxed text-gray-400">{project.description}</p>

        <ul className="mt-5 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 6).map((tech) => (
            <li key={tech} className="rounded border border-gray-800 px-2 py-1 text-xs text-gray-400">
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap items-center gap-5 text-sm">
          <button
            onClick={onCaseStudy}
            className="inline-flex items-center gap-1.5 font-semibold text-yellow-500 hover:text-yellow-400"
          >
            Read the case study
            <ArrowRight size={14} aria-hidden="true" />
          </button>

          {project.liveDemo && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-gray-400 transition-colors hover:text-white"
            >
              Live
              <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          )}
          {project.repoLink && (
            <a
              href={project.repoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-gray-400 transition-colors hover:text-white"
            >
              <FaGithub size={13} aria-hidden="true" />
              Code
            </a>
          )}
          {project.youtubeLink && (
            <a
              href={project.youtubeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-gray-400 transition-colors hover:text-white"
            >
              <FaYoutube size={13} aria-hidden="true" />
              Demo
            </a>
          )}
        </div>
      </div>
    </div>
  </m.article>
);

export default FeaturedProject;
