import React from "react";
import { m } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { FaGithub, FaYoutube } from "react-icons/fa";
import SectionHeader from "../ui/SectionHeader";
import { projects } from "../../data/projects";
import { projectPath } from "../../lib/site";
import { navigate } from "../../lib/useRoute";
import { trackEvent } from "../../utils/analytics";

interface SelectedWorkProps {
  setSelected: (section: string) => void;
}

/**
 * Three pieces of work on the landing tab, because most visitors never click Portfolio.
 * Order matters: flagship product, the evaluation work that differentiates, one full-stack build.
 */
const picks = [
  "Smart Gebere – AI Agricultural Assistant",
  "Benchmark & Evaluation Design for AI Coding Agents",
  "Full Stack eCommerce Platform",
];

const blurbs: Record<string, string> = {
  "Smart Gebere – AI Agricultural Assistant":
    "Flutter app that helps Ethiopian farmers diagnose crop disease on-device, built for low connectivity. Open source, 17 stars.",
  "Benchmark & Evaluation Design for AI Coding Agents":
    "Terminal-Bench 2.0/3.0 and SWE-bench style tasks: Docker environments, hidden tests, golden solutions, stress-tested against frontier models.",
  "Full Stack eCommerce Platform":
    "Django REST on PostgreSQL with Stripe payments and a Flutter client. OAuth2 with refresh tokens, order tracking, admin.",
};

const SelectedWork: React.FC<SelectedWorkProps> = ({ setSelected }) => {
  const items = picks
    .map((title) => projects.find((project) => project.title === title))
    .filter((project): project is NonNullable<typeof project> => Boolean(project));

  return (
    <section>
      <SectionHeader title="Selected" accent="Work" subtitle="Three things that show how I work. The full list is under Portfolio." />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map((project, index) => (
          <m.article
            key={project.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.08 }}
            className="modern-card border border-gray-800 rounded-xl overflow-hidden flex flex-col hover:border-yellow-500/50 transition-colors"
          >
            <div className="h-36 overflow-hidden bg-dark-200">
              <img
                src={project.image}
                alt=""
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 flex flex-col flex-1">
              <p className="text-[11px] uppercase tracking-wider text-yellow-500 mb-1">{project.category}</p>
              <h3 className="text-white font-semibold leading-snug mb-2">
                <a
                  href={projectPath(project)}
                  onClick={(event) => {
                    event.preventDefault();
                    navigate(projectPath(project));
                  }}
                  className="hover:text-yellow-500"
                >
                  {project.title}
                </a>
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed flex-1">{blurbs[project.title] ?? project.description}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {project.repoLink && (
                  <a
                    href={project.repoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent("selected_work_repo", { project: project.title })}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-dark-200 border border-gray-700 rounded-lg text-xs text-gray-300 hover:text-yellow-500 hover:border-yellow-500/50"
                  >
                    <FaGithub size={12} aria-hidden="true" />
                    Code
                  </a>
                )}
                {project.youtubeLink && (
                  <a
                    href={project.youtubeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent("selected_work_video", { project: project.title })}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-dark-200 border border-gray-700 rounded-lg text-xs text-gray-300 hover:text-red-400 hover:border-red-500/50"
                  >
                    <FaYoutube size={12} aria-hidden="true" />
                    Video
                  </a>
                )}
                <a
                  href={projectPath(project)}
                  onClick={(event) => {
                    event.preventDefault();
                    trackEvent("selected_work_details", { project: project.title });
                    navigate(projectPath(project));
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-yellow-500/10 border border-yellow-500/40 rounded-lg text-xs text-yellow-500 hover:bg-yellow-500/20"
                >
                  Case study
                  <ArrowRight size={12} aria-hidden="true" />
                </a>
              </div>
            </div>
          </m.article>
        ))}
      </div>

      <button
        onClick={() => {
          trackEvent("selected_work_all");
          setSelected("Portfolio");
        }}
        className="mt-5 inline-flex items-center gap-2 text-sm text-gray-300 hover:text-yellow-500"
      >
        See all {projects.length} projects
        <ArrowRight size={14} aria-hidden="true" />
      </button>
    </section>
  );
};

export default SelectedWork;
