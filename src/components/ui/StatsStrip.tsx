import React from "react";
import { motion } from "framer-motion";
import type { ImpactMetric } from "../../data/siteContent";

interface StatsStripProps {
  metrics: ImpactMetric[];
}

const StatsStrip: React.FC<StatsStripProps> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-8">
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.label}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 + index * 0.07 }}
          className="modern-card p-4 border border-gray-800/80"
        >
          <p className="text-lg md:text-xl font-bold text-yellow-500">{metric.value}</p>
          <p className="text-xs text-gray-300">{metric.label}</p>
          <p className="text-[11px] text-gray-500 mt-1">{metric.note}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsStrip;
