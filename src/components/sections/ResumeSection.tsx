import React from "react";
import { Download, ExternalLink, Printer } from "lucide-react";
import { m } from "framer-motion";
import SectionHeader from "../ui/SectionHeader";
import { trackEvent } from "../../utils/analytics";
import { resume } from "../../data/resume";

/**
 * A CV, laid out like one: period in the left column, the work in the right, separated by
 * rules. The previous version stacked every entry in its own bordered box with a gold icon
 * chip per heading, which made six roles read as six unrelated cards.
 */
const ResumeSection: React.FC = () => {
  const { education, experience, certifications, timelineSummary } = resume;

  // Only credentials with a verifiable link earn a row of their own; the rest are listed
  // compactly rather than padded out to fill a grid.
  const verified = certifications.filter((cert) => cert.link);
  const unverified = certifications.filter((cert) => !cert.link);

  return (
    <section>
      <SectionHeader
        as="h1"
        title="Resume"
        subtitle="Six years across full-stack delivery, machine learning, and AI evaluation. Every line here has a number or an artefact behind it."
        aside={
          <div className="flex flex-wrap gap-2 print:hidden">
            <a
              href="/resume.pdf"
              download
              onClick={() => trackEvent("resume_download")}
              className="inline-flex items-center gap-2 rounded-lg bg-yellow-500 px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-yellow-400"
            >
              <Download size={15} aria-hidden="true" />
              PDF
            </a>
            <button
              type="button"
              onClick={() => {
                trackEvent("resume_print");
                window.print();
              }}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-700 px-4 py-2 text-sm text-gray-300 transition-colors hover:border-gray-600 hover:text-white"
            >
              <Printer size={15} aria-hidden="true" />
              Print
            </button>
          </div>
        }
      />

      <m.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Timeline: four years, one line each. It orients the reader before the detail. */}
        <ol className="mb-14 grid gap-px overflow-hidden rounded-lg border border-gray-800 bg-gray-800 sm:grid-cols-2 lg:grid-cols-4">
          {timelineSummary.map((step) => (
            <li key={step.year} className="bg-dark-400 p-4">
              <p className="tabular eyebrow mb-2 text-yellow-500/80">{step.year}</p>
              <p className="text-[13px] leading-relaxed text-gray-300">{step.title}</p>
            </li>
          ))}
        </ol>

        <Block title="Experience">
          {experience.map((exp) => (
            <Entry key={`${exp.role}-${exp.company}`} meta={exp.period} sub={exp.location}>
              <h4 className="text-[17px] font-semibold text-white">{exp.role}</h4>
              <p className="mt-0.5 text-sm text-yellow-500">{exp.company}</p>
              <ul className="mt-3 space-y-2">
                {exp.points.map((point) => (
                  <li key={point} className="flex gap-3 text-[15px] leading-relaxed text-gray-400">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gray-600" aria-hidden="true" />
                    <span className="max-w-prose">{point}</span>
                  </li>
                ))}
              </ul>
            </Entry>
          ))}
        </Block>

        <Block title="Education">
          {education.map((edu) => (
            <Entry key={edu.title} meta={edu.period}>
              <h4 className="text-[17px] font-semibold text-white">{edu.title}</h4>
              <p className="mt-0.5 text-sm text-yellow-500">{edu.degree}</p>
              {edu.details && <p className="mt-2 max-w-prose text-[15px] leading-relaxed text-gray-400">{edu.details}</p>}
              {edu.links && (
                <div className="mt-3 flex flex-wrap gap-4">
                  {edu.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[13px] text-gray-400 transition-colors hover:text-yellow-500"
                    >
                      <ExternalLink size={12} aria-hidden="true" />
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </Entry>
          ))}
        </Block>

        <Block title="Credentials">
          {verified.map((cert) => (
            <Entry key={cert.title} meta={cert.issuer}>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h4 className="text-[17px] font-semibold text-white">{cert.title}</h4>
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[13px] text-yellow-500 transition-colors hover:text-yellow-400"
                >
                  <ExternalLink size={12} aria-hidden="true" />
                  Verify
                </a>
              </div>
              <p className="mt-2 max-w-prose text-[15px] leading-relaxed text-gray-400">{cert.description}</p>
            </Entry>
          ))}

          {unverified.length > 0 && (
            <Entry meta="Coursework">
              <p className="max-w-prose text-[15px] leading-relaxed text-gray-400">
                {unverified.map((cert) => `${cert.title} (${cert.issuer})`).join(" · ")}
              </p>
            </Entry>
          )}
        </Block>
      </m.div>
    </section>
  );
};

const Block: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="mb-14 last:mb-0">
    <h3 className="eyebrow mb-1 border-b border-gray-800 pb-4">{title}</h3>
    <div className="divide-y divide-gray-800">{children}</div>
  </div>
);

/** Period on the left at small caps, content on the right. Collapses to one column on mobile. */
const Entry: React.FC<{ meta: string; sub?: string; children: React.ReactNode }> = ({ meta, sub, children }) => (
  <div className="grid gap-2 py-6 md:grid-cols-[8.5rem_1fr] md:gap-8">
    <div className="pt-0.5">
      <p className="tabular text-[13px] text-gray-400">{meta}</p>
      {sub && <p className="mt-0.5 text-xs text-gray-500">{sub}</p>}
    </div>
    <div className="min-w-0">{children}</div>
  </div>
);

export default ResumeSection;
