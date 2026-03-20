import React, { useState } from "react";
import {
  SiFlutter,
  SiFirebase,
  SiTypescript,
  SiReact,
  SiDjango,
  SiPython,
  SiPostman,
  SiPostgresql,
  SiGit,
  SiGithub,
  SiNodedotjs,
  SiTensorflow,
  SiScikitlearn,
  SiPandas,
  SiNumpy,
  SiJupyter,
  SiDocker,
} from "react-icons/si";
import { FaJava, FaDatabase, FaLinux, FaBrain, FaChartLine, FaRobot, FaCogs } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

interface Skill {
  icon: React.ReactNode;
  label: string;
  category: "programming" | "ml" | "mlops" | "datascience" | "tools";
}

const skills: Skill[] = [
  // Programming & Software Engineering
  { icon: <SiPython size={24} />, label: "Python", category: "programming" },
  { icon: <FaJava size={24} />, label: "Java", category: "programming" },
  { icon: <SiTypescript size={24} />, label: "TypeScript", category: "programming" },
  { icon: <SiReact size={24} />, label: "React", category: "programming" },
  { icon: <SiNodedotjs size={24} />, label: "Node.js", category: "programming" },
  { icon: <SiFlutter size={24} />, label: "Flutter", category: "programming" },
  { icon: <FaCogs size={24} />, label: "DSA", category: "programming" },
  
  // Machine Learning & AI
  { icon: <SiScikitlearn size={24} />, label: "Scikit-learn", category: "ml" },
  { icon: <SiTensorflow size={24} />, label: "TensorFlow", category: "ml" },
  { icon: <FaBrain size={24} />, label: "Ensemble Models", category: "ml" },
  { icon: <FaRobot size={24} />, label: "Anomaly Detection", category: "ml" },
  { icon: <FaBrain size={24} />, label: "NLP", category: "ml" },
  { icon: <FaCogs size={24} />, label: "Feature Engineering", category: "ml" },
  { icon: <FaChartLine size={24} />, label: "Model Evaluation", category: "ml" },
  
  // MLOps & Automation
  { icon: <SiDocker size={24} />, label: "Docker", category: "mlops" },
  { icon: <SiDjango size={24} />, label: "Django REST", category: "mlops" },
  { icon: <FaCogs size={24} />, label: "ML Pipelines", category: "mlops" },
  { icon: <FaCogs size={24} />, label: "Automation", category: "mlops" },
  
  // Data Science & Analytics
  { icon: <SiPandas size={24} />, label: "Pandas", category: "datascience" },
  { icon: <SiNumpy size={24} />, label: "NumPy", category: "datascience" },
  { icon: <SiJupyter size={24} />, label: "Jupyter", category: "datascience" },
  { icon: <FaChartLine size={24} />, label: "Visualization", category: "datascience" },
  { icon: <FaChartLine size={24} />, label: "Statistics", category: "datascience" },
  
  // Tools & Platforms
  { icon: <SiGit size={24} />, label: "Git", category: "tools" },
  { icon: <SiGithub size={24} />, label: "GitHub", category: "tools" },
  { icon: <FaDatabase size={24} />, label: "SQL", category: "tools" },
  { icon: <FaLinux size={24} />, label: "Linux", category: "tools" },
  { icon: <SiPostman size={24} />, label: "Postman", category: "tools" },
  { icon: <SiFirebase size={24} />, label: "Firebase", category: "tools" },
];

const categories = [
  { id: "all", label: "All" },
  { id: "programming", label: "Programming" },
  { id: "ml", label: "ML / AI" },
  { id: "mlops", label: "MLOps" },
  { id: "datascience", label: "Data Science" },
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
          Technical <span className="text-yellow-500">Skills</span>
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
