import React from "react";
import { motion } from "framer-motion";

const AboutSection: React.FC = () => {
  return (
    <section className="mb-6">
      {/* Animated Header */}
      <motion.h1
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl md:text-5xl font-bold text-white"
      >
        About Me
      </motion.h1>

      {/* Accent Line */}
      <div className="h-1 w-20 bg-yellow-400 rounded mt-3 mb-6"></div>

      {/* About Text */}
      <p className="text-gray-300 leading-relaxed text-base md:text-lg max-w-3xl">
        A passionate Flutter developer with strong expertise in cross-platform apps, REST APIs, UI/UX,
        widgets, and state management solutions. Proven track record in delivering cutting-edge
        solutions, including API integration, third-party libraries, and performance optimization. Adept at
        debugging to ensure high-quality, responsive apps. An agile collaborator committed to staying current with industry trends.
      </p>

      <p className="mt-4 text-gray-300 text-base md:text-lg max-w-3xl">
        If you're seeking a skilled developer to bring life into your project and exceed expectations,
        I’m here to collaborate and transform your vision into reality.
      </p>
    </section>
  );
};

export default AboutSection;
