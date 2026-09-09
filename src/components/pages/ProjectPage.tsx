import React from "react";
import { m } from "framer-motion";
import { ArrowLeft, ArrowRight, Lock } from "lucide-react";
import { FaGithub, FaYoutube, FaExternalLinkAlt } from "react-icons/fa";
import { projects } from "../../data/projects";
import type { Project } from "../../data/projects";
import { techIcons } from "../../data/techIcons";
import { projectPath } from "../../lib/site";
import { navigate } from "../../lib/useRoute";
import { trackEvent } from "../../utils/analytics";

interface ProjectPageProps {
  project: Project;
}

const Bullets: React.FC<{ items: string[] }> = ({ items }) => (
  <ul className="space-y-2">
    {items.map((item) => (
      <li key={item} className="flex gap-3 text-gray-300 text-sm leading-relaxed">
        <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-2 shrink-0" aria-hidden="true" />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="mb-8">
    <h2 className="text-lg font-semibold text-white mb-3">{title}</h2>
    {children}
  </section>
);

const ProjectPage: React.FC<ProjectPageProps> = ({ project }) => {
  const related = projects
    .filter((candidate) => candidate !== project)
    .filter((candidate) => candidate.category === project.category || candidate.technologies.some((t) => project.technologies.includes(t)))
    .slice(0, 3);

  const go = (event: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    event.preventDefault();
    navigate(path);
  };

  return (
    <article>
      <a
        href="/projects"
        onClick={(event) => go(event, "/projects")}
        className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-yellow-500 mb-6"
      >
        <ArrowLeft size={14} aria-hidden="true" />
        All projects
      </a>

      <m.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <div className="relative rounded-2xl overflow-hidden border border-gray-800 mb-6 bg-dark-200">
          <img src={project.image} alt="" className="w-full h-44 md:h-72 object-cover" decoding="async" />
          <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" aria-hidden="true" />
          <div className="p-5 md:p-6 md:absolute md:bottom-0 md:left-0 md:right-0 bg-dark-300 md:bg-transparent border-t border-gray-800 md:border-0">
            <p className="text-[11px] uppercase tracking-wider text-yellow-500 mb-1 flex items-center gap-2">
              {project.category}
              {project.isPrivate && (
                <span className="inline-flex items-center gap-1 text-gray-300 normal-case tracking-normal">
                  <Lock size={11} aria-hidden="true" /> client work
                </span>
              )}
            </p>
            <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight">{project.title}</h1>
            <p className="text-sm text-gray-300 mt-1">
              {project.role} · {project.duration}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {project.repoLink && (
            <a
              href={project.repoLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("project_repo_click", { project: project.title })}
              className="inline-flex items-center gap-2 px-4 py-2 bg-dark-200 border border-gray-700 rounded-lg text-sm text-gray-200 hover:text-yellow-500 hover:border-yellow-500/50"
            >
              <FaGithub size={14} aria-hidden="true" />
              Source code
            </a>
          )}
          {project.liveDemo && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("project_demo_click", { project: project.title })}
              className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500 text-black font-semibold rounded-lg text-sm hover:bg-yellow-400"
            >
              <FaExternalLinkAlt size={12} aria-hidden="true" />
              Live demo
            </a>
          )}
          {project.youtubeLink && (
            <a
              href={project.youtubeLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("project_video_click", { project: project.title })}
              className="inline-flex items-center gap-2 px-4 py-2 bg-dark-200 border border-gray-700 rounded-lg text-sm text-gray-200 hover:text-red-400 hover:border-red-500/50"
            >
              <FaYoutube size={14} aria-hidden="true" />
              Walkthrough video
            </a>
          )}
          {project.isPrivate && !project.repoLink && (
            <span className="inline-flex items-center px-4 py-2 border border-gray-800 rounded-lg text-sm text-gray-400">
              Code is not public. Happy to walk through the approach on a call.
            </span>
          )}
        </div>

        <div className="grid lg:grid-cols-[1fr_260px] gap-8">
          <div>
            <Section title="Problem">
              <p className="text-gray-300 text-sm leading-relaxed">{project.description}</p>
            </Section>

            {project.architecture && (
              <Section title="How it is built">
                <p className="text-gray-300 text-sm leading-relaxed font-mono bg-dark-300 border border-gray-800 rounded-lg p-3 overflow-x-auto">
                  {project.architecture}
                </p>
              </Section>
            )}

            {project.features && project.features.length > 0 && (
              <Section title="What I built">
                <Bullets items={project.features} />
              </Section>
            )}

            {project.challenges && project.challenges.length > 0 && (
              <Section title="Hard parts">
                <Bullets items={project.challenges} />
              </Section>
            )}

            {project.impactMetrics && project.impactMetrics.length > 0 && (
              <Section title="Result">
                <div className="flex flex-wrap gap-2">
                  {project.impactMetrics.map((metric) => (
                    <span key={metric} className="px-3 py-1.5 text-sm bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-yellow-400">
                      {metric}
                    </span>
                  ))}
                </div>
              </Section>
            )}
          </div>

          <aside className="space-y-6">
            <div className="modern-card border border-gray-800 rounded-xl p-4">
              <p className="text-[11px] uppercase tracking-wider text-gray-400 mb-3">Stack</p>
              <ul className="space-y-2">
                {project.technologies.map((tech) => (
                  <li key={tech} className="flex items-center gap-2 text-sm text-gray-200">
                    <span className="w-4 h-4 inline-flex items-center justify-center" aria-hidden="true">
                      {techIcons[tech] ?? <span className="w-1.5 h-1.5 rounded-full bg-gray-500" />}
                    </span>
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
            <div className="modern-card border border-gray-800 rounded-xl p-4">
              <p className="text-[11px] uppercase tracking-wider text-gray-400 mb-3">Role</p>
              <p className="text-sm text-gray-200">{project.role}</p>
              <p className="text-xs text-gray-400 mt-1">{project.duration}</p>
            </div>
            <a
              href="/contact"
              onClick={(event) => go(event, "/contact")}
              className="block text-center px-4 py-2.5 bg-yellow-500 text-black font-semibold rounded-xl hover:bg-yellow-400 text-sm"
            >
              Discuss a similar project
            </a>
          </aside>
        </div>

        {related.length > 0 && (
          <section className="mt-10 pt-8 border-t border-gray-800">
            <h2 className="text-lg font-semibold text-white mb-4">Related work</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {related.map((candidate) => (
                <a
                  key={candidate.title}
                  href={projectPath(candidate)}
                  onClick={(event) => go(event, projectPath(candidate))}
                  className="modern-card border border-gray-800 rounded-xl p-4 hover:border-yellow-500/50 transition-colors group"
                >
                  <p className="text-[11px] uppercase tracking-wider text-yellow-500 mb-1">{candidate.category}</p>
                  <p className="text-white font-medium leading-snug group-hover:text-yellow-500">{candidate.title}</p>
                  <p className="text-xs text-gray-400 mt-2 line-clamp-2">{candidate.description}</p>
                  <span className="inline-flex items-center gap-1 text-xs text-gray-400 mt-3 group-hover:text-yellow-500">
                    Read more <ArrowRight size={12} aria-hidden="true" />
                  </span>
                </a>
              ))}
            </div>
          </section>
        )}
      </m.div>
    </article>
  );
};

export default ProjectPage;
