import React from "react";
import { FaMobileAlt, FaLaptopCode, FaPalette, FaServer } from "react-icons/fa";
import { motion } from "framer-motion";

const cards = [
  { icon: <FaMobileAlt />, title: "Mobile Apps", text: "Professional development of applications for Android and iOS.", color: "#4F46E5" }, // Indigo
  { icon: <FaLaptopCode />, title: "Web Development", text: "High-quality development of websites at a professional level.", color: "#10B981" }, // Green
  { icon: <FaPalette />, title: "UI/UX Design", text: "Modern and high-quality UI/UX design.", color: "#F59E0B" }, // Yellow
  { icon: <FaServer />, title: "Backend Development", text: "High-performance backend services designed for scalability.", color: "#EF4444" }, // Red
];

const ServicesSection: React.FC = () => {
  return (
    <section className="mt-12">
      <h4 className="text-3xl md:text-4xl font-bold text-white mb-6">What I'm Doing</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((c, idx) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-6 bg-[#1f1f1f] rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 "
          >
            <div className="flex items-start gap-4">
              <div
                className="text-3xl p-4 rounded-lg"
                style={{ color: c.color, backgroundColor: "#111" }}
              >
                {c.icon}
              </div>
              <div>
                <h3 className="text-white text-xl font-semibold">{c.title}</h3>
                <p className="text-gray-400 mt-2">{c.text}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
