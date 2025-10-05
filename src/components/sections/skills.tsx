import React from "react";
import { SiFlutter, SiFirebase, SiFigma, SiTypescript, SiReact } from "react-icons/si";
import { motion } from "framer-motion";

const skills = [
  { icon: <SiFlutter />, label: "Flutter", color: "#02569B" },
  { icon: <SiFirebase />, label: "Firebase", color: "#FFCA28" },
  { icon: <SiFigma />, label: "Figma", color: "#F24E1E" },
  { icon: <SiTypescript />, label: "TypeScript", color: "#3178C6" },
  { icon: <SiReact />, label: "React", color: "#61DAFB" },
];

const SkillsSection: React.FC = () => {
  return (
    <section className="mt-12">
      <h4 className="text-2xl md:text-3xl font-bold text-white mb-6">Skills</h4>
      <div className="flex flex-wrap gap-6 justify-center">
        {skills.map((s, idx) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="w-28 h-28 rounded-xl bg-[#1f1f1f] flex flex-col items-center justify-center shadow-lg
                       hover:scale-110 hover:shadow-xl transition-transform duration-300"
          >
            <div className="text-4xl" style={{ color: s.color }}>
              {s.icon}
            </div>
            <div className="text-sm text-gray-300 mt-2">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;
