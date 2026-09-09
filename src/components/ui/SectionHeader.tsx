import React from "react";
import { m } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  accent: string;
  subtitle?: string;
  /** Page-level sections render an h1 so every route has exactly one. */
  as?: "h1" | "h2";
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, accent, subtitle, as: Heading = "h2" }) => {
  return (
    <m.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="mb-6"
    >
      <Heading className="text-2xl md:text-3xl font-bold text-white mb-2">
        {title} <span className="text-yellow-500">{accent}</span>
      </Heading>
      {subtitle && <p className="text-sm text-gray-500 mb-3 max-w-2xl">{subtitle}</p>}
      <div className="w-16 h-1 bg-yellow-500 rounded" />
    </m.div>
  );
};

export default SectionHeader;
