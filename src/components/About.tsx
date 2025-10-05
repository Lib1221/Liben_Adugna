// src/components/About.tsx
import React from "react";
import { motion } from "framer-motion";

const About: React.FC = () => {
  const highlights = [
    { title: "Experience", desc: "3+ years building mobile & web apps." },
    { title: "Education", desc: "Top-ranked student in Computer Science." },
    { title: "Certificates", desc: "Flutter & Dart Ultimate Course + more." },
  ];

  return (
    <section
      id="about"
      className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-12 px-6 md:px-20 py-20
                 bg-gray-50 dark:bg-black text-gray-900 dark:text-yellow-400"
    >
      {/* Left Image */}
      <motion.div
        className="flex-1 flex justify-center"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <img
          src="https://via.placeholder.com/400"
          alt="About Me"
          className="w-80 h-80 md:w-96 md:h-96 rounded-2xl object-cover shadow-xl
                     hover:scale-105 transition-transform duration-500"
        />
      </motion.div>

      {/* Right Content */}
      <motion.div
        className="flex-1 text-center md:text-left"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-yellow-600 dark:text-yellow-400">
          About Me
        </h2>
        <p className="text-gray-700 dark:text-yellow-300 mb-8 leading-relaxed">
          I'm <span className="font-semibold">Liben Adugna</span>, a passionate developer who
          specializes in building user-friendly, scalable, and innovative applications. I enjoy
          transforming ideas into real-world solutions.
        </p>

        {/* Highlights */}
        <div className="grid md:grid-cols-3 gap-6">
          {highlights.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-xl bg-white dark:bg-black border border-yellow-400 shadow-md
                         hover:shadow-xl transition duration-300"
            >
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-yellow-400">{item.title}</h3>
              <p className="text-sm text-gray-600 dark:text-yellow-300">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default About;
