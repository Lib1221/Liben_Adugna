import React from "react";
import { BookOpen, Briefcase, Award, Download, ExternalLink, Printer } from "lucide-react";
import { m } from "framer-motion";
import SectionHeader from "../ui/SectionHeader";
import { trackEvent } from "../../utils/analytics";
import { resume } from "../../data/resume";

const ResumeSection: React.FC = () => {
  const { education, experience, certifications, timelineSummary } = resume;

  return (
    <section>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <SectionHeader as="h1" title="Resume" accent="" subtitle="Experience, education, and credentials with measurable outcomes." />
        <div className="flex flex-wrap gap-2 print:hidden">
          <a
            href="/resume.pdf"
            download
            onClick={() => trackEvent("resume_download")}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-yellow-500 text-black font-semibold rounded-xl hover:bg-yellow-400 transition-colors"
          >
            <Download size={18} aria-hidden="true" />
            Download CV
          </a>
          <button
            type="button"
            onClick={() => {
              trackEvent("resume_print");
              window.print();
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-dark-300 border border-gray-700 text-gray-200 rounded-xl hover:border-yellow-500 hover:text-yellow-500 transition-colors"
          >
            <Printer size={18} aria-hidden="true" />
            Print
          </button>
        </div>
      </div>

      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="modern-card border border-gray-800 p-4 mb-8"
      >
        <p className="text-xs uppercase tracking-wider text-gray-500 mb-4">Career Timeline</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {timelineSummary.map((step) => (
            <div key={step.year} className="p-3 rounded-xl bg-dark-300 border border-gray-700">
              <p className="text-sm font-bold text-yellow-500">{step.year}</p>
              <p className="text-xs text-gray-300 mt-1">{step.title}</p>
            </div>
          ))}
        </div>
      </m.div>

      {/* Education */}
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-10"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-yellow-500/10 rounded-lg">
            <BookOpen size={20} className="text-yellow-500" />
          </div>
          <h3 className="text-xl font-semibold text-white">Education</h3>
        </div>
        
        {education.map((edu, index) => (
          <div
            key={index}
            className="p-5 bg-dark-300 border border-gray-800 rounded-xl mb-4"
          >
            <h4 className="text-lg font-semibold text-white">{edu.title}</h4>
            <p className="text-yellow-500 text-sm mt-1">{edu.degree}</p>
            <p className="text-gray-500 text-sm mt-1">{edu.period}</p>
            {edu.details && (
              <p className="text-gray-400 text-sm mt-2">{edu.details}</p>
            )}
            {edu.links && (
              <div className="flex gap-3 mt-2">
                {edu.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-yellow-500 hover:text-yellow-400 transition-colors"
                  >
                    <ExternalLink size={12} />
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </m.div>

      {/* Experience */}
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-10"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-yellow-500/10 rounded-lg">
            <Briefcase size={20} className="text-yellow-500" />
          </div>
          <h3 className="text-xl font-semibold text-white">Experience</h3>
        </div>
        
        <div className="space-y-4">
          {experience.map((exp, index) => (
            <div
              key={index}
              className="p-5 bg-dark-300 border border-gray-800 rounded-xl"
            >
              <h4 className="text-lg font-semibold text-white">{exp.role}</h4>
              <p className="text-yellow-500 text-sm">{exp.company}</p>
              <p className="text-gray-500 text-xs mt-1">{exp.period} • {exp.location}</p>
              <ul className="mt-4 space-y-2">
                {exp.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-400 text-sm">
                    <span className="w-1.5 h-1.5 mt-1.5 bg-yellow-500 rounded-full flex-shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </m.div>

      {/* Certifications */}
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-yellow-500/10 rounded-lg">
            <Award size={20} className="text-yellow-500" />
          </div>
          <h3 className="text-xl font-semibold text-white">Certifications</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="p-5 bg-dark-300 border border-gray-800 rounded-xl hover:border-yellow-500/50 transition-colors group"
            >
              <div className="mb-2">
                <h4 className="font-semibold text-white group-hover:text-yellow-500 transition-colors">{cert.title}</h4>
                <p className="text-yellow-500 text-sm">{cert.issuer}</p>
              </div>
              <p className="text-gray-400 text-sm mb-3">{cert.description}</p>
              <div className="flex flex-wrap gap-1 mb-3">
                {cert.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-0.5 bg-dark-200 border border-gray-700 rounded text-xs text-gray-400"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              {cert.link && (
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-yellow-500 hover:text-yellow-400 transition-colors"
                >
                  <ExternalLink size={12} />
                  View Certificate
                </a>
              )}
            </div>
          ))}
        </div>
      </m.div>
    </section>
  );
};

export default ResumeSection;
