import React from "react";
import { m } from "framer-motion";
import { now } from "../../data/siteContent";
import SectionHeader from "../ui/SectionHeader";

/**
 * Dated status. A portfolio showing a recent date reads as alive, so the date is part of the
 * header rather than a footnote, and going stale is visible instead of hidden.
 */
const NowSection: React.FC = () => (
  <section aria-labelledby="now-heading">
    <SectionHeader
      id="now-heading"
      eyebrow="02 / Now"
      title="What I am working on"
      aside={<span className="tabular text-xs text-gray-500">Updated {now.updated}</span>}
    />

    <m.ul
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="divide-y divide-gray-800 border-y border-gray-800"
    >
      {now.items.map((item) => (
        <li key={item} className="flex gap-4 py-4 text-[15px] leading-relaxed text-gray-300">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-500" aria-hidden="true" />
          <span className="max-w-prose">{item}</span>
        </li>
      ))}
    </m.ul>
  </section>
);

export default NowSection;
