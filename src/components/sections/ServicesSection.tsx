import React from "react";
import { m } from "framer-motion";
import SectionHeader from "../ui/SectionHeader";

/**
 * Four engagements, not six service tiles.
 *
 * A six-card grid of "Web Development / Mobile Development / Backend Development" reads as a
 * freelance rate card. What a hiring manager wants to know is which problems I take on and
 * what arrives at the end, so each entry names the work and its deliverable.
 */
type Engagement = {
  index: string;
  title: string;
  body: string;
  deliverable: string;
};

const engagements: Engagement[] = [
  {
    index: "01",
    title: "AI evaluation and benchmark design",
    body:
      "Software-engineering tasks, rubrics and test harnesses that measure coding agents. I write the environment, the hidden tests and the golden solution, then attack my own task until it can neither be guessed nor gamed. I also review other authors' tasks for ambiguity and solution leakage.",
    deliverable: "Reproducible task suites with grading criteria that survive review.",
  },
  {
    index: "02",
    title: "Applied machine learning",
    body:
      "Segmentation, anomaly detection, NLP matching and forecasting on your data rather than a tutorial dataset. The work is mostly feature engineering and honest evaluation; the model is usually the least interesting decision.",
    deliverable: "A trained model, the evaluation that justifies it, and the pipeline that retrains it.",
  },
  {
    index: "03",
    title: "Backend and API systems",
    body:
      "Django or Node services on PostgreSQL and MongoDB. Authentication, versioned REST contracts, background work, and the boring reliability details that decide whether a mobile client can ship independently.",
    deliverable: "A documented API, a migration path, and tests that fail for the right reasons.",
  },
  {
    index: "04",
    title: "Product front ends",
    body:
      "React and TypeScript on the web, Flutter on mobile. Data-heavy dashboards, admin tooling, and offline-first apps built for networks that drop, because that is the condition most of my users are actually in.",
    deliverable: "A shipped client, with state and offline behaviour designed rather than patched in.",
  },
];

const ServicesSection: React.FC = () => (
  <section>
    <SectionHeader
      eyebrow="04 / Engagements"
      title="What I take on"
      subtitle="Four kinds of work, in the order I am asked for them."
    />

    <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-gray-800 bg-gray-800 md:grid-cols-2">
      {engagements.map((engagement, idx) => (
        <m.article
          key={engagement.title}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
          className="group flex flex-col bg-dark-400 p-6 transition-colors hover:bg-dark-300"
        >
          <p className="tabular eyebrow mb-3 text-yellow-500/70">{engagement.index}</p>
          <h3 className="mb-3 text-[17px] font-semibold text-white">{engagement.title}</h3>
          <p className="mb-5 flex-1 text-[15px] leading-relaxed text-gray-400">{engagement.body}</p>
          <p className="border-t border-gray-800 pt-3 text-[13px] leading-relaxed text-gray-500">
            <span className="text-gray-300">You get: </span>
            {engagement.deliverable}
          </p>
        </m.article>
      ))}
    </div>
  </section>
);

export default ServicesSection;
