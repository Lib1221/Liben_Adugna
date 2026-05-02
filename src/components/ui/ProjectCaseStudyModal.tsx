import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles } from "lucide-react";
import type { Project } from "../../data/projects";

interface ProjectCaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectCaseStudyModal: React.FC<ProjectCaseStudyModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    if (!project) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 z-50 p-4 overflow-y-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            onClick={(e) => e.stopPropagation()}
            className="max-w-3xl mx-auto mt-10 modern-card border border-gray-700 overflow-hidden"
          >
            <div className="p-5 border-b border-gray-800 flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-wider text-yellow-500 mb-1">Case Study</p>
                <h3 className="text-xl font-bold text-white">{project.title}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  {project.role} · {project.category} · {project.duration}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg border border-gray-700 text-gray-400 hover:text-white hover:border-gray-600"
                aria-label="Close case study"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-5 space-y-6">
              <section>
                <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                  <Sparkles size={15} className="text-yellow-500" />
                  Problem and Context
                </h4>
                <p className="text-sm text-gray-400 leading-relaxed">{project.description}</p>
              </section>

              <section>
                <h4 className="text-white font-semibold mb-2">Architecture and Stack</h4>
                {project.architecture && <p className="text-sm text-gray-400 mb-3">{project.architecture}</p>}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="px-2.5 py-1 text-xs bg-dark-200 border border-gray-700 rounded text-gray-300">
                      {tech}
                    </span>
                  ))}
                </div>
              </section>

              {project.features && project.features.length > 0 && (
                <section>
                  <h4 className="text-white font-semibold mb-2">Implementation Highlights</h4>
                  <ul className="space-y-2">
                    {project.features.map((feature) => (
                      <li key={feature} className="text-sm text-gray-400 flex gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-2 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {project.challenges && project.challenges.length > 0 && (
                <section>
                  <h4 className="text-white font-semibold mb-2">Challenges Solved</h4>
                  <ul className="space-y-2">
                    {project.challenges.map((challenge) => (
                      <li key={challenge} className="text-sm text-gray-400 flex gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-2 shrink-0" />
                        <span>{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {project.impactMetrics && project.impactMetrics.length > 0 && (
                <section>
                  <h4 className="text-white font-semibold mb-2">Impact Metrics</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.impactMetrics.map((metric) => (
                      <span key={metric} className="px-2.5 py-1 text-xs bg-yellow-500/10 border border-yellow-500/30 rounded text-yellow-400">
                        {metric}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              <section className="p-4 rounded-xl border border-yellow-500/25 bg-yellow-500/5">
                <h4 className="text-white font-semibold mb-2">Outcome</h4>
                <p className="text-sm text-gray-300">
                  This project demonstrates delivery across product thinking, implementation quality, and scalability.
                  It is structured to show both technical depth and measurable impact.
                </p>
              </section>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectCaseStudyModal;
