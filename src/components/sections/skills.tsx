import React from "react";
import {
  SiFlutter,
  SiFirebase,
  SiTypescript,
  SiReact,
  SiDjango,
  SiPython,
  SiPostman,
} from "react-icons/si";
import { motion } from "framer-motion";

const skills = [
  { icon: <SiFlutter />, label: "Flutter", color: "#02569B" },
  { icon: <SiFirebase />, label: "Firebase", color: "#FFCA28" },
  { icon: <SiTypescript />, label: "TypeScript", color: "#3178C6" },
  { icon: <SiReact />, label: "React", color: "#61DAFB" },
  { icon: <SiDjango />, label: "Django", color: "#092E20" },
  { icon: <SiPython />, label: "Python", color: "#3776AB" },
  { icon: <SiPostman />, label: "Postman", color: "#FF6C37" },
];

// Duplicate the array for an infinite loop
const repeatedSkills = [...skills, ...skills];

const SkillsSection: React.FC = () => {
  return (
    <section className="mt-12 overflow-hidden">
      <h4 className="text-2xl md:text-3xl font-bold text-yellow-400 mb-6 text-center">
        Skills
      </h4>

      {/* Infinite scrolling container */}
      <div className="relative w-full overflow-hidden">
        <motion.div
          className="flex gap-8"
          animate={{
            x: ["0%", "-50%"], // move half the length (since we duplicated)
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 25, // slow smooth scroll
              ease: "linear",
            },
          }}
        >
          {repeatedSkills.map((s, idx) => (
            <div
              key={`${s.label}-${idx}`}
              className="w-28 h-28 rounded-xl flex flex-col items-center justify-center 
                         shadow-lg hover:scale-110 hover:shadow-xl transition-transform duration-300"
            >
              <div className="text-4xl" style={{ color: s.color }}>
                {s.icon}
              </div>
              <div className="text-sm text-gray-300 mt-2">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
