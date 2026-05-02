import React, { useState } from "react";
import {
  SiFlutter,
  SiFirebase,
  SiTypescript,
  SiReact,
  SiDjango,
  SiPython,
  SiPostman,
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
import SectionHeader from "../ui/SectionHeader";

interface Skill {
  icon: React.ElementType;
  label: string;
  category: "programming" | "ml" | "mlops" | "datascience" | "tools";
  color: string;
}

const skills: Skill[] = [
  { icon: SiPython,      label: "Python",           color: "#3776AB", category: "programming" },
  { icon: FaJava,        label: "Java",             color: "#ED8B00", category: "programming" },
  { icon: SiTypescript,  label: "TypeScript",       color: "#3178C6", category: "programming" },
  { icon: SiReact,       label: "React",            color: "#61DAFB", category: "programming" },
  { icon: SiNodedotjs,   label: "Node.js",          color: "#68A063", category: "programming" },
  { icon: SiFlutter,     label: "Flutter",          color: "#02569B", category: "programming" },
  { icon: FaCogs,        label: "DSA",              color: "#9333EA", category: "programming" },

  { icon: SiScikitlearn, label: "Scikit-learn",     color: "#F7931E", category: "ml" },
  { icon: SiTensorflow,  label: "TensorFlow",       color: "#FF6F00", category: "ml" },
  { icon: FaBrain,       label: "Ensemble Models",  color: "#10B981", category: "ml" },
  { icon: FaRobot,       label: "Anomaly Detection",color: "#EF4444", category: "ml" },
  { icon: FaBrain,       label: "NLP",              color: "#8B5CF6", category: "ml" },
  { icon: FaCogs,        label: "Feature Eng.",     color: "#F59E0B", category: "ml" },
  { icon: FaChartLine,   label: "Model Evaluation", color: "#06B6D4", category: "ml" },

  { icon: SiDocker,      label: "Docker",           color: "#2496ED", category: "mlops" },
  { icon: SiDjango,      label: "Django REST",      color: "#44B78B", category: "mlops" },
  { icon: FaCogs,        label: "ML Pipelines",     color: "#22C55E", category: "mlops" },
  { icon: FaCogs,        label: "Automation",       color: "#A855F7", category: "mlops" },

  { icon: SiPandas,      label: "Pandas",           color: "#150458", category: "datascience" },
  { icon: SiNumpy,       label: "NumPy",            color: "#4DABCF", category: "datascience" },
  { icon: SiJupyter,     label: "Jupyter",          color: "#F37626", category: "datascience" },
  { icon: FaChartLine,   label: "Visualization",    color: "#EC4899", category: "datascience" },
  { icon: FaChartLine,   label: "Statistics",       color: "#14B8A6", category: "datascience" },

  { icon: SiGit,         label: "Git",              color: "#F05032", category: "tools" },
  { icon: SiGithub,      label: "GitHub",           color: "#E6EDF3", category: "tools" },
  { icon: FaDatabase,    label: "SQL",              color: "#336791", category: "tools" },
  { icon: FaLinux,       label: "Linux",            color: "#FCC624", category: "tools" },
  { icon: SiPostman,     label: "Postman",          color: "#FF6C37", category: "tools" },
  { icon: SiFirebase,    label: "Firebase",         color: "#FFCA28", category: "tools" },
];

const categories = [
  { id: "all",         label: "All" },
  { id: "programming", label: "Programming" },
  { id: "ml",          label: "ML / AI" },
  { id: "mlops",       label: "MLOps" },
  { id: "datascience", label: "Data Science" },
  { id: "tools",       label: "Tools" },
];

const categoryColors: Record<string, string> = {
  programming: "#3178C6",
  ml:          "#F7931E",
  mlops:       "#22C55E",
  datascience: "#EC4899",
  tools:       "#F05032",
};

const SkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const filteredSkills = activeCategory === "all"
    ? skills
    : skills.filter(s => s.category === activeCategory);

  return (
    <section>
      <SectionHeader title="Technical" accent="Skills" />

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <motion.button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
              ${activeCategory === cat.id
                ? "bg-yellow-500 text-black shadow-lg shadow-yellow-500/30"
                : "bg-dark-300 text-gray-400 hover:text-white hover:bg-dark-200 border border-gray-800 hover:border-gray-600"
              }`}
          >
            {cat.label}
          </motion.button>
        ))}
      </div>

      {/* Skills Grid */}
      <motion.div
        className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3"
        layout
      >
        <AnimatePresence mode="popLayout">
          {filteredSkills.map((skill) => {
            const Icon = skill.icon;
            const isHovered = hoveredSkill === skill.label;
            return (
              <motion.div
                key={skill.label}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                onMouseEnter={() => setHoveredSkill(skill.label)}
                onMouseLeave={() => setHoveredSkill(null)}
                className="relative flex flex-col items-center gap-2 p-4 modern-card border border-gray-800 rounded-xl transition-all duration-300 cursor-default group"
                style={{
                  borderColor: isHovered ? skill.color + "80" : undefined,
                  boxShadow: isHovered ? `0 0 18px ${skill.color}30` : undefined,
                  transform: isHovered ? "translateY(-3px)" : undefined,
                }}
              >
                {/* Glow backdrop */}
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 rounded-xl"
                    style={{ background: `radial-gradient(circle at center, ${skill.color}15 0%, transparent 70%)` }}
                  />
                )}
                <Icon
                  size={24}
                  style={{ color: isHovered ? skill.color : "#9CA3AF", transition: "color 0.2s" }}
                />
                <span
                  className="text-xs text-center leading-tight transition-colors duration-200"
                  style={{ color: isHovered ? "#FFFFFF" : "#6B7280" }}
                >
                  {skill.label}
                </span>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Category legend */}
      {activeCategory === "all" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-gray-800"
        >
          {categories.slice(1).map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-white transition-colors"
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: categoryColors[cat.id] }}
              />
              {cat.label}
            </button>
          ))}
        </motion.div>
      )}
    </section>
  );
};

export default SkillsSection;
