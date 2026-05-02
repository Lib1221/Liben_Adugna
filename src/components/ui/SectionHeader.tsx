import React from "react";
import { motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  accent: string;
  subtitle?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, accent, subtitle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="mb-6"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
        {title} <span className="text-yellow-500">{accent}</span>
      </h2>
      {subtitle && <p className="text-sm text-gray-500 mb-3 max-w-2xl">{subtitle}</p>}
      <div className="w-16 h-1 bg-yellow-500 rounded" />
    </motion.div>
  );
};

export default SectionHeader;
