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
          I am a <span className="text-yellow-500 font-medium">versatile software engineer</span> providing 
          end-to-end digital solutions, with a strong focus on mobile application development (primarily Flutter), 
          modern web development (React & Next.js), and data science & machine learning.
        </p>

        <p className="text-gray-400 leading-relaxed">
          I specialize in building <span className="text-white font-medium">scalable, production-ready systems</span> — 
          from intuitive UI/UX design to robust backend logic and intelligent data-driven features. My experience 
          spans classical machine learning models, deep learning architectures, and real-world problem solving.
        </p>

        <p className="text-gray-400 leading-relaxed">
          I bring a strong foundation in algorithms, system thinking, and problem-solving, enabling me to design 
          solutions that are not only functional but efficient, maintainable, and impactful.
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
          "Multi-disciplinary engineer combining Flutter, modern web technologies, and machine learning 
          to build intelligent, real-world products."
        </p>
      </motion.div>
    </section>
  );
};

export default AboutSection;
