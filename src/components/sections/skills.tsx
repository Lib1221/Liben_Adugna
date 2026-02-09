import React, { useState } from "react";
import {
  SiLaravel,
  SiFlutter,
  SiFirebase,
  SiTypescript,
  SiReact,
  SiDjango,
  SiPython,
  SiPostman,
  SiTailwindcss,
  SiPostgresql,
  SiGit,
  SiGithub,
  SiFramer,
  SiStripe,
  SiNodedotjs,
  SiGetx,
  SiTensorflow,
  SiPytorch,
  SiScikitlearn,
  SiPandas,
  SiNumpy,
  SiJupyter,
  SiOpencv,
  SiDocker,
  SiNextdotjs,
  SiMongodb,
} from "react-icons/si";
import { motion, AnimatePresence } from "framer-motion";

interface Skill {
  icon: React.ReactNode;
  label: string;
  category: "mobile" | "frontend" | "backend" | "ml" | "tools";
}

const skills: Skill[] = [
  // Mobile
  { icon: <SiFlutter size={24} />, label: "Flutter", category: "mobile" },
  { icon: <SiGetx size={24} />, label: "GetX", category: "mobile" },
  { icon: <SiFirebase size={24} />, label: "Firebase", category: "mobile" },
  
  // Frontend
  { icon: <SiReact size={24} />, label: "React", category: "frontend" },
  { icon: <SiNextdotjs size={24} />, label: "Next.js", category: "frontend" },
  { icon: <SiTypescript size={24} />, label: "TypeScript", category: "frontend" },
  { icon: <SiTailwindcss size={24} />, label: "Tailwind", category: "frontend" },
  { icon: <SiFramer size={24} />, label: "Framer", category: "frontend" },
  
  // Backend
  { icon: <SiDjango size={24} />, label: "Django", category: "backend" },
  { icon: <SiLaravel size={24} />, label: "Laravel", category: "backend" },
  { icon: <SiNodedotjs size={24} />, label: "Node.js", category: "backend" },
  { icon: <SiPostgresql size={24} />, label: "PostgreSQL", category: "backend" },
  { icon: <SiMongodb size={24} />, label: "MongoDB", category: "backend" },
  { icon: <SiStripe size={24} />, label: "Stripe", category: "backend" },
  
  // ML/Data Science
  { icon: <SiPython size={24} />, label: "Python", category: "ml" },
  { icon: <SiTensorflow size={24} />, label: "TensorFlow", category: "ml" },
  { icon: <SiPytorch size={24} />, label: "PyTorch", category: "ml" },
  { icon: <SiScikitlearn size={24} />, label: "Scikit-learn", category: "ml" },
  { icon: <SiPandas size={24} />, label: "Pandas", category: "ml" },
  { icon: <SiNumpy size={24} />, label: "NumPy", category: "ml" },
  { icon: <SiJupyter size={24} />, label: "Jupyter", category: "ml" },
  { icon: <SiOpencv size={24} />, label: "OpenCV", category: "ml" },
  
  // Tools
  { icon: <SiGit size={24} />, label: "Git", category: "tools" },
  { icon: <SiGithub size={24} />, label: "GitHub", category: "tools" },
  { icon: <SiDocker size={24} />, label: "Docker", category: "tools" },
  { icon: <SiPostman size={24} />, label: "Postman", category: "tools" },
];

const categories = [
  { id: "all", label: "All" },
  { id: "mobile", label: "Mobile" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "ml", label: "ML / AI" },
  { id: "tools", label: "Tools" },
];

const SkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredSkills = activeCategory === "all" 
    ? skills 
    : skills.filter(s => s.category === activeCategory);

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
          My <span className="text-yellow-500">Skills</span>
        </h2>
        <div className="w-16 h-1 bg-yellow-500 rounded" />
      </motion.div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
              ${activeCategory === cat.id
                ? "bg-yellow-500 text-black"
                : "bg-dark-300 text-gray-400 hover:text-white hover:bg-dark-200 border border-gray-800"
              }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <motion.div 
        className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3"
        layout
      >
        <AnimatePresence mode="popLayout">
          {filteredSkills.map((skill) => (
            <motion.div
              key={skill.label}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center gap-2 p-4 bg-dark-300 border border-gray-800 rounded-xl hover:border-yellow-500/50 hover:bg-dark-200 transition-all duration-200 group"
            >
              <div className="text-gray-400 group-hover:text-yellow-500 transition-colors">
                {skill.icon}
              </div>
              <span className="text-xs text-gray-500 group-hover:text-white transition-colors text-center">
                {skill.label}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default SkillsSection;
