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
  <ul className="space-y-2.5">
    {items.map((item) => (
      <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-gray-400">
        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gray-600" aria-hidden="true" />
        <span className="max-w-prose">{item}</span>
      </li>
    ))}
  </ul>
);

/** Case-study sections are separated by a rule and a small-caps label, like the resume. */
const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="mb-10">
    <h2 className="eyebrow mb-4 border-b border-gray-800 pb-3">{title}</h2>
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
        <div className="mb-8 overflow-hidden rounded-xl border border-gray-800 bg-dark-200">
          <img
            src={project.image}
            alt=""
            className="aspect-[21/9] w-full object-cover"
            decoding="async"
          />
        </div>

        <header className="mb-8">
          <p className="eyebrow mb-3 flex items-center gap-2 text-yellow-500/90">
            {project.category}
            {project.isPrivate && (
              <span className="inline-flex items-center gap-1 tracking-normal text-gray-400 normal-case">
                <Lock size={11} aria-hidden="true" /> client work
              </span>
            )}
          </p>
          <h1 className="text-display font-semibold text-white">{project.title}</h1>
          <p className="mt-2 text-sm text-gray-400">
            {project.role} · {project.duration}
          </p>
        </header>

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
              <p className="max-w-prose text-[15px] leading-relaxed text-gray-400">{project.description}</p>
            </Section>

            {project.architecture && (
              <Section title="How it is built">
                <p className="overflow-x-auto rounded-lg border border-gray-800 bg-dark-400 p-4 font-mono text-[13px] leading-relaxed text-gray-300">
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
                    <span key={metric} className="rounded-lg border border-yellow-500/30 bg-yellow-500/[0.07] px-3 py-1.5 text-sm text-yellow-400">
                      {metric}
                    </span>
                  ))}
                </div>
              </Section>
            )}
          </div>

          <aside className="space-y-6">
            <div className="surface p-5">
              <p className="eyebrow mb-3">Stack</p>
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
            <div className="surface p-5">
              <p className="eyebrow mb-3">Role</p>
              <p className="text-sm text-gray-200">{project.role}</p>
              <p className="text-xs text-gray-400 mt-1">{project.duration}</p>
            </div>
            <a
              href="/contact"
              onClick={(event) => go(event, "/contact")}
              className="block rounded-lg bg-yellow-500 px-4 py-2.5 text-center text-sm font-semibold text-black transition-colors hover:bg-yellow-400"
            >
              Discuss a similar project
            </a>
          </aside>
        </div>

        {related.length > 0 && (
          <section className="mt-10 pt-8 border-t border-gray-800">
            <h2 className="eyebrow mb-5 border-b border-gray-800 pb-3">Related work</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {related.map((candidate) => (
                <a
                  key={candidate.title}
                  href={projectPath(candidate)}
                  onClick={(event) => go(event, projectPath(candidate))}
                  className="surface surface-interactive group p-5"
                >
                  <p className="eyebrow mb-2">{candidate.category}</p>
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
