import React from "react";
import { m } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
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
 * Three pieces of work on the landing view, because most visitors never click Projects.
 * Order matters: flagship product, the evaluation work that differentiates, one full-stack build.
 */
const picks = [
  "Smart Gebere – AI Agricultural Assistant",
  "Benchmark & Evaluation Design for AI Coding Agents",
  "Full Stack eCommerce Platform",
];

/** Landing-page framing: what it does and the one fact that makes it credible. */
const blurbs: Record<string, string> = {
  "Smart Gebere – AI Agricultural Assistant":
    "Flutter app that diagnoses crop disease on-device for smallholder farmers, built to work when the network does not. Open source, 17 stars.",
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
      <SectionHeader
        eyebrow="01 / Selected work"
        title="Three builds that show the range"
        subtitle="A shipped product, the evaluation work that pays the bills, and a full-stack system. The rest are under Projects."
        aside={
          <button
            onClick={() => {
              trackEvent("selected_work_all");
              setSelected("Portfolio");
            }}
            className="inline-flex items-center gap-1.5 text-sm text-gray-400 transition-colors hover:text-yellow-500"
          >
            All {projects.length} projects
            <ArrowRight size={14} aria-hidden="true" />
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-gray-800 bg-gray-800 md:grid-cols-3">
        {items.map((project, index) => (
          <m.article
            key={project.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
            className="group flex flex-col bg-dark-400 transition-colors hover:bg-dark-300"
          >
            <div className="aspect-[16/9] overflow-hidden bg-dark-200">
              <img
                src={project.image}
                alt=""
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover opacity-80 transition-opacity duration-300 group-hover:opacity-100"
              />
            </div>

            <div className="flex flex-1 flex-col p-5">
              <p className="eyebrow mb-2">{project.category}</p>

              <h3 className="text-[17px] font-semibold leading-snug text-white">
                <a
                  href={projectPath(project)}
                  onClick={(event) => {
                    event.preventDefault();
                    trackEvent("selected_work_details", { project: project.title });
                    navigate(projectPath(project));
                  }}
                  className="transition-colors group-hover:text-yellow-500"
                >
                  {project.title}
                </a>
              </h3>

              <p className="mt-2 flex-1 text-[14px] leading-relaxed text-gray-400">
                {blurbs[project.title] ?? project.description}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-gray-800 pt-4 text-[13px]">
                <a
                  href={projectPath(project)}
                  onClick={(event) => {
                    event.preventDefault();
                    trackEvent("selected_work_details", { project: project.title });
                    navigate(projectPath(project));
                  }}
                  className="inline-flex items-center gap-1 font-medium text-yellow-500 hover:text-yellow-400"
                >
                  Case study
                  <ArrowRight size={13} aria-hidden="true" />
                </a>

                {project.repoLink && (
                  <a
                    href={project.repoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent("selected_work_repo", { project: project.title })}
                    className="inline-flex items-center gap-1.5 text-gray-500 transition-colors hover:text-white"
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
                    onClick={() => trackEvent("selected_work_video", { project: project.title })}
                    className="inline-flex items-center gap-1.5 text-gray-500 transition-colors hover:text-white"
                  >
                    <FaYoutube size={13} aria-hidden="true" />
                    Demo
                    <ArrowUpRight size={11} aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>
          </m.article>
        ))}
      </div>
    </section>
  );
};

export default SelectedWork;
