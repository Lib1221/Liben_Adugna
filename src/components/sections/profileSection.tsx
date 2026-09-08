import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaYoutube, FaExternalLinkAlt, FaLock } from "react-icons/fa";
import { Search } from "lucide-react";
import { projects } from "../../data/projects";
import { techIcons } from "../../data/techIcons";
import type { Project } from "../../data/projects";
import FeaturedProject from "../ui/FeaturedProject";
import ProjectCaseStudyModal from "../ui/ProjectCaseStudyModal";
import SectionHeader from "../ui/SectionHeader";
import { trackEvent } from "../../utils/analytics";
import { rankSearchResults } from "../../utils/search";

const categories = ["All", "AI/ML", "Data Science", "Mobile", "Web", "MLOps"];
const privacyOptions = ["All", "Public", "Private"];
const sortOptions = ["Newest", "Most Complex", "Name"];

const ProfileSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [privacyFilter, setPrivacyFilter] = useState("All");
  const [selectedStack, setSelectedStack] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [caseStudyProject, setCaseStudyProject] = useState<Project | null>(null);

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
      if (privacyFilter === "Public") return !p.isPrivate;
      if (privacyFilter === "Private") return Boolean(p.isPrivate);
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
        title="My"
        accent="Portfolio"
        subtitle="Explore projects by category, stack, visibility, and complexity."
      />

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="modern-card p-4 border border-gray-800 text-center">
          <p className="text-2xl font-bold text-yellow-500">{projects.length}</p>
          <p className="text-xs text-gray-500">Total Projects</p>
        </div>
        <div className="modern-card p-4 border border-gray-800 text-center">
          <p className="text-2xl font-bold text-yellow-500">
            {projects.filter(p => p.category === "AI/ML" || p.category === "Data Science").length}
          </p>
          <p className="text-xs text-gray-500">AI/ML Projects</p>
        </div>
        <div className="modern-card p-4 border border-gray-800 text-center">
          <p className="text-2xl font-bold text-yellow-500">
            {projects.filter(p => p.category === "Mobile").length}
          </p>
          <p className="text-xs text-gray-500">Mobile Apps</p>
        </div>
      </div>

      <FeaturedProject
        project={featuredProject}
        onCaseStudy={() => {
          trackEvent("featured_case_study_open", { project: featuredProject.title });
          setCaseStudyProject(featuredProject);
        }}
      />

      {/* Filters */}
      <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">Categories</p>
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
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div>
          <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">Visibility</p>
          <div className="flex flex-wrap gap-2">
            {privacyOptions.map((option) => (
              <button
                key={option}
                onClick={() => setPrivacyFilter(option)}
                className={`px-3 py-2 rounded-lg text-xs border transition-colors ${
                  privacyFilter === option
                    ? "bg-yellow-500 text-black border-yellow-500"
                    : "bg-dark-300 text-gray-400 border-gray-800 hover:text-white"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">Stack</p>
          <select
            value={selectedStack}
            onChange={(e) => setSelectedStack(e.target.value)}
            className="w-full bg-dark-300 border border-gray-800 rounded-lg px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-yellow-500"
          >
            {stackOptions.map((stack) => (
              <option key={stack} value={stack}>
                {stack}
              </option>
            ))}
          </select>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">Sort By</p>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full bg-dark-300 border border-gray-800 rounded-lg px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-yellow-500"
          >
            {sortOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-8">
        <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">Search</p>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by project title, description, or technology..."
            className="w-full pl-10 pr-4 py-2.5 bg-dark-300 border border-gray-800 rounded-xl text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-yellow-500"
          />
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Showing {filteredProjects.length} project{filteredProjects.length === 1 ? "" : "s"} based on active filters.
        </p>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
                onCaseStudy={() => {
                  trackEvent("project_case_study_open", { project: project.title });
                  setCaseStudyProject(project);
                }}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="modern-card border border-gray-800 p-8 text-center">
          <p className="text-white font-medium mb-2">No project matches the current filters.</p>
          <p className="text-sm text-gray-500">Try resetting filters or using a broader search term.</p>
        </div>
      )}
      <ProjectCaseStudyModal project={caseStudyProject} onClose={() => setCaseStudyProject(null)} />
    </section>
  );
};

const ProjectCard: React.FC<{ project: Project; index: number; onCaseStudy: () => void }> = ({
  project,
  index,
  onCaseStudy,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ delay: index * 0.05 }}
      whileHover={!project.isPrivate ? { y: -4, transition: { duration: 0.2 } } : undefined}
      className={`modern-card border rounded-xl overflow-hidden transition-all duration-300 group
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
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={onCaseStudy}
            className="flex items-center gap-1.5 px-3 py-2 bg-yellow-500/10 border border-yellow-500/40 rounded-lg text-xs text-yellow-500 hover:bg-yellow-500/20 transition-all"
          >
            Case Study
          </button>
          {project.repoLink && (
            <a
              href={project.repoLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("project_repo_click", { project: project.title })}
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
              onClick={() => trackEvent("project_demo_click", { project: project.title })}
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
              onClick={() => trackEvent("project_video_click", { project: project.title })}
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
