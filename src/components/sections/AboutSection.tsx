import React from "react";
import { m } from "framer-motion";
import SectionHeader from "../ui/SectionHeader";

/**
 * Narrative, capped at a readable measure. The previous version scattered gold and white
 * spans through the prose to mark "important" words; emphasis that lands on every third
 * phrase stops being emphasis.
 */
const AboutSection: React.FC = () => (
  <section>
    <SectionHeader eyebrow="03 / Background" title="How I got here" />

    <m.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-prose space-y-5 text-[15px] leading-[1.75] text-gray-400"
    >
      <p>
        I started where most engineers start: building whatever the client in front of me needed. That
        meant Django back ends and Flutter apps, five or so systems, each one teaching me something the last one
        had let me get away with. The habit that stuck was reading the failure before writing the fix.
      </p>

      <p>
        Machine learning came out of the same work. A client had 450k behavioural records and no idea what was in
        them, so I built the segmentation pipeline. Then transaction anomaly detection over 110k samples, then an
        NLP engine matching resumes to job descriptions. None of it was novel research. All of it had to be right
        on data that nobody had cleaned.
      </p>

      <p>
        Since 2024 most of my time has gone into AI evaluation: authoring the software-engineering tasks, rubrics
        and test harnesses that vendors use to measure frontier models and coding agents, and reviewing other
        authors' tasks for ambiguity and gameable tests. It is the most useful thing I have done for my own
        engineering. You cannot write a task that resists a strong model without being precise about what correct
        actually means.
      </p>

      <p>
        Underneath that: a B.Sc. in Software Engineering from ASTU, 400+ algorithm problems through the A2SV
        program, and a year mentoring 40+ students in ML system design. I care most about debugging, about
        performance you can measure, and about code that is still readable a year later.
      </p>
    </m.div>
  </section>
);

export default AboutSection;
