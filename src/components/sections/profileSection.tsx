import React, { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { FaGithub, FaYoutube, FaLock } from "react-icons/fa";
import { ArrowRight, ArrowUpRight, Search } from "lucide-react";
import { projects } from "../../data/projects";
import { techIcons } from "../../data/techIcons";
import type { Project } from "../../data/projects";
import FeaturedProject from "../ui/FeaturedProject";
import SectionHeader from "../ui/SectionHeader";
import { trackEvent } from "../../utils/analytics";
import { rankSearchResults } from "../../utils/search";
import { projectPath } from "../../lib/site";
import { navigate } from "../../lib/useRoute";

const categories = ["All", "AI/ML", "Data Science", "Mobile", "Web", "MLOps"];
const privacyOptions = ["All", "Open source", "Client work"];
const sortOptions = ["Newest", "Most Complex", "Name"];

const ProfileSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [privacyFilter, setPrivacyFilter] = useState("All");
  const [selectedStack, setSelectedStack] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");
  const [searchQuery, setSearchQuery] = useState("");

  const stackOptions = [
    "All",
    ...Array.from(new Set(projects.flatMap((project) => project.technologies))).sort(),
  ];

  // Flagship: the public project with code, a demo video and real users.
  const featuredProject =
    projects.find((project) => project.title.startsWith("Smart Gebere")) ?? projects[0];

  const baseFilteredProjects = projects
    .filter((p) => (activeCategory === "All" ? true : p.category === activeCategory))
    .filter((p) => {
      if (privacyFilter === "Open source") return !p.isPrivate;
      if (privacyFilter === "Client work") return Boolean(p.isPrivate);
      return true;
    })
    .filter((p) => (selectedStack === "All" ? true : p.technologies.includes(selectedStack)))
    .sort((a, b) => {
      if (sortBy === "Name") return a.title.localeCompare(b.title);
      if (sortBy === "Most Complex") return (b.features?.length || 0) - (a.features?.length || 0);
      return Number(b.duration) - Number(a.duration);
    });

  const filteredProjects = searchQuery.trim()
    ? rankSearchResults(
        baseFilteredProjects.map((project) => ({
          item: project,
          text: `${project.title} ${project.description} ${project.role} ${project.category}`,
          keywords: [...project.technologies, ...(project.features || [])],
        })),
        searchQuery,
      ).map((result) => result.item)
    : baseFilteredProjects;

  return (
    <section>
      <SectionHeader
        as="h1"
        title="Projects"
        subtitle="Every project has its own page with the problem, the approach, and what it cost. Filter by domain, stack or visibility."
      />

      <FeaturedProject
        project={featuredProject}
        onCaseStudy={() => {
          trackEvent("featured_case_study_open", { project: featuredProject.title });
          navigate(projectPath(featuredProject));
        }}
      />

      {/* Filters: one toolbar rather than four labelled blocks down the page. */}
      <div className="mb-8 flex flex-wrap items-center gap-1 border-b border-gray-800 pb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            aria-pressed={activeCategory === cat}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              activeCategory === cat
                ? "bg-yellow-500 text-black"
                : "text-gray-400 hover:bg-dark-300 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="mb-4 space-y-3">
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" aria-hidden="true" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search projects"
            placeholder="Search title, description or technology"
            className="w-full rounded-lg border border-gray-800 bg-dark-400 py-2 pl-9 pr-4 text-sm text-gray-200 placeholder-gray-500 transition-colors focus:border-yellow-500 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <Select label="Visibility" value={privacyFilter} onChange={setPrivacyFilter} options={privacyOptions} />
          <Select label="Stack" value={selectedStack} onChange={setSelectedStack} options={stackOptions} />
          <Select label="Sort" value={sortBy} onChange={setSortBy} options={sortOptions} />
        </div>
      </div>

      <p className="mb-8 text-[13px] text-gray-500" role="status" aria-live="polite">
        {filteredProjects.length} of {projects.length} project{projects.length === 1 ? "" : "s"}
      </p>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <m.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
                onCaseStudy={() => {
                  trackEvent("project_case_study_open", { project: project.title });
                  navigate(projectPath(project));
                }}
              />
            ))}
          </AnimatePresence>
        </m.div>
      ) : (
        <p className="border-t border-gray-800 py-12 text-center text-sm text-gray-500">
          No project matches those filters. Try a broader search term.
        </p>
      )}
    </section>
  );
};

const Select: React.FC<{
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}> = ({ label, value, onChange, options }) => (
  <label className="flex min-w-0 items-center gap-2 rounded-lg border border-gray-800 bg-dark-400 px-3 py-2 text-sm">
    <span className="shrink-0 whitespace-nowrap text-gray-500">{label}</span>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full min-w-0 flex-1 truncate bg-transparent text-gray-200 focus:outline-none"
    >
      {options.map((option) => (
        <option key={option} value={option} className="bg-dark-300">
          {option}
        </option>
      ))}
    </select>
  </label>
);

const ProjectCard: React.FC<{ project: Project; index: number; onCaseStudy: () => void }> = ({
  project,
  index,
  onCaseStudy,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <m.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      className="surface surface-interactive group overflow-hidden"
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-dark-200 shimmer" />
        )}
        <img
          src={project.image}
          alt=""
          loading="lazy"
          decoding="async"
          className={`h-full w-full object-cover transition-opacity duration-300 ${
            imageLoaded ? "opacity-80 group-hover:opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {project.isPrivate && (
          <span
            className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded border border-gray-700 bg-black/70 px-2 py-1 text-[11px] text-gray-300 backdrop-blur-sm"
            title="Client work: the code is not public, but the approach and stack are described in the case study."
          >
            <FaLock size={9} aria-hidden="true" />
            Client work
          </span>
        )}
      </div>

      <div className="p-5">
        <p className="eyebrow mb-2">{project.category}</p>
        <h3 className="mb-1 text-[17px] font-semibold text-white transition-colors group-hover:text-yellow-500">
          <a
            href={projectPath(project)}
            onClick={(event) => {
              event.preventDefault();
              onCaseStudy();
            }}
          >
            {project.title}
          </a>
        </h3>
        <p className="mb-3 text-[13px] text-gray-500">{project.role}</p>
        <p className="mb-4 line-clamp-2 text-[14px] leading-relaxed text-gray-400">{project.description}</p>

        <ul className="mb-5 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 4).map((tech) => (
            <li
              key={tech}
              className="flex items-center gap-1.5 rounded border border-gray-800 px-2 py-1 text-xs text-gray-500"
            >
              {techIcons[tech] || null}
              {tech}
            </li>
          ))}
          {project.technologies.length > 4 && (
            <li className="rounded border border-gray-800 px-2 py-1 text-xs text-gray-500">
              +{project.technologies.length - 4}
            </li>
          )}
        </ul>

        <div className="flex flex-wrap items-center gap-5 border-t border-gray-800 pt-4 text-[13px]">
          <a
            href={projectPath(project)}
            onClick={(event) => {
              event.preventDefault();
              onCaseStudy();
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
              onClick={() => trackEvent("project_repo_click", { project: project.title })}
              className="inline-flex items-center gap-1.5 text-gray-500 transition-colors hover:text-white"
            >
              <FaGithub size={13} aria-hidden="true" />
              Code
            </a>
          )}
          {project.liveDemo && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("project_demo_click", { project: project.title })}
              className="inline-flex items-center gap-1.5 text-gray-500 transition-colors hover:text-white"
            >
              Live
              <ArrowUpRight size={12} aria-hidden="true" />
            </a>
          )}
          {project.youtubeLink && (
            <a
              href={project.youtubeLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("project_video_click", { project: project.title })}
              className="inline-flex items-center gap-1.5 text-gray-500 transition-colors hover:text-white"
            >
              <FaYoutube size={13} aria-hidden="true" />
              Video
            </a>
          )}
        </div>
      </div>
    </m.div>
  );
};

export default ProfileSection;
