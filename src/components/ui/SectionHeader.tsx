import React from "react";
import { m } from "framer-motion";

interface SectionHeaderProps {
  /** Small caps label above the heading. Names the section; the heading makes a claim. */
  eyebrow?: string;
  title: string;
  subtitle?: string;
  /** Page-level sections render an h1 so every route has exactly one. */
  as?: "h1" | "h2";
  /** Right-aligned slot for a link or count that belongs to the section. */
  aside?: React.ReactNode;
  /** Set when the surrounding <section> labels itself with aria-labelledby. */
  id?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  subtitle,
  as: Heading = "h2",
  aside,
  id,
}) => (
  <m.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    className="mb-7"
  >
    <div className="flex flex-col gap-3 border-b border-gray-800 pb-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
      <div className="min-w-0">
        {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
        <Heading id={id} className="text-title font-semibold text-white">
          {title}
        </Heading>
      </div>
      {aside && <div className="shrink-0 sm:pb-1">{aside}</div>}
    </div>
    {subtitle && <p className="mt-4 max-w-prose text-[15px] leading-relaxed text-gray-400">{subtitle}</p>}
  </m.div>
);

export default SectionHeader;
