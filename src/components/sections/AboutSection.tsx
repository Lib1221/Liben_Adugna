import React from "react";
import { motion } from "framer-motion";

const AboutSection: React.FC = () => {
  return (
    <section>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
          About <span className="text-yellow-500">Me</span>
        </h2>
        <div className="w-16 h-1 bg-yellow-500 rounded" />
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="space-y-4"
      >
        <p className="text-gray-400 leading-relaxed">
          I am a <span className="text-yellow-500 font-medium">Software Engineer</span> with expertise in 
          machine learning systems, code evaluation, and full-stack development. Experienced in validating 
          AI-generated outputs, reviewing system implementations, and building scalable web and mobile applications.
        </p>

        <p className="text-gray-400 leading-relaxed">
          My work spans <span className="text-white font-medium">ML model development</span>, data preprocessing 
          pipelines, and NLP applications. I've processed datasets with 450k+ records for behavioral segmentation, 
          built anomaly detection systems, and designed semantic matching engines.
        </p>

        <p className="text-gray-400 leading-relaxed">
          Strong in <span className="text-white font-medium">debugging, performance optimization</span>, and 
          designing reliable, maintainable software systems. I bring a solid foundation in data structures, 
          algorithms, and system thinking from solving 400+ competitive programming problems.
        </p>
      </motion.div>

      {/* Quote */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-6 p-4 bg-dark-300 border-l-4 border-yellow-500 rounded-r-xl"
      >
        <p className="text-gray-300 italic">
          "Software Engineer specializing in ML systems, code evaluation, and AI-powered solutions 
          — building reliable, scalable systems that solve real-world problems."
        </p>
      </motion.div>
    </section>
  );
};

export default AboutSection;
