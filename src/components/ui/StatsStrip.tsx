import React from "react";
import { m } from "framer-motion";
import type { ImpactMetric } from "../../data/siteContent";

interface StatsStripProps {
  metrics: ImpactMetric[];
}

/**
 * Numbers as a ruled row rather than four floating cards. Dividers do the grouping,
 * so the figures read as one claim about scale instead of four decorated tiles.
 */
const StatsStrip: React.FC<StatsStripProps> = ({ metrics }) => (
  <m.dl
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.45, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
    className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-gray-800 bg-gray-800 lg:grid-cols-4"
  >
    {metrics.map((metric) => (
      <div key={metric.label} className="bg-dark-400 p-4">
        <dt className="sr-only">{metric.label}</dt>
        <dd>
          <span className="tabular block text-2xl font-semibold text-white">{metric.value}</span>
          <span className="mt-1 block text-[13px] text-gray-300">{metric.label}</span>
          <span className="mt-0.5 block text-xs text-gray-500">{metric.note}</span>
        </dd>
      </div>
    ))}
  </m.dl>
);

export default StatsStrip;
