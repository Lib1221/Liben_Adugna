import React from "react";
import { FaMobileAlt, FaLaptopCode, FaBrain, FaServer, FaRobot, FaCogs } from "react-icons/fa";
import { motion } from "framer-motion";
import SectionHeader from "../ui/SectionHeader";

const services = [
  {
    icon: FaMobileAlt,
    title: "Mobile App Development",
    text: "Production-grade cross-platform apps with Flutter. Clean architecture, state management, and offline-first design.",
    color: "#02569B",
    gradient: "from-blue-500/10 to-blue-600/5",
  },
  {
    icon: FaLaptopCode,
    title: "Web Development",
    text: "React and TypeScript front ends on Django or Node back ends. Dashboards, admin panels and data-heavy UIs.",
    color: "#61DAFB",
    gradient: "from-cyan-400/10 to-cyan-500/5",
  },
  {
    icon: FaServer,
    title: "Backend Development",
    text: "Django and Node.js services on PostgreSQL or MongoDB. REST APIs serving 5,000+ requests/month.",
    color: "#44B78B",
    gradient: "from-emerald-500/10 to-emerald-600/5",
  },
  {
    icon: FaBrain,
    title: "Data Science & ML",
    text: "Classical ML, NLP, anomaly detection, and clustering. Processed 450k+ records with measurable accuracy improvements.",
    color: "#F7931E",
    gradient: "from-orange-400/10 to-orange-500/5",
  },
  {
    icon: FaRobot,
    title: "AI Evaluation and Benchmark Design",
    text: "Author software-engineering tasks, rubrics and test harnesses that measure AI coding agents. Tasks that cannot be gamed, tests that prove correctness.",
    color: "#8B5CF6",
    gradient: "from-violet-500/10 to-violet-600/5",
  },
  {
    icon: FaCogs,
    title: "MLOps & Automation",
    text: "Automated ML pipelines, workflow automation, data preprocessing, and CI/CD setup for scalable ML deployments.",
    color: "#22C55E",
    gradient: "from-green-500/10 to-green-600/5",
  },
];

const ServicesSection: React.FC = () => {
  return (
    <section>
      <SectionHeader title="What I" accent="Do" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service, idx) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`relative p-5 modern-card border border-gray-800 rounded-xl overflow-hidden
                hover:border-transparent transition-all duration-300 group cursor-default`}
              style={{ "--hover-color": service.color } as React.CSSProperties}
            >
              {/* Gradient bg on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />
              {/* Glowing border */}
              <div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ boxShadow: `inset 0 0 0 1px ${service.color}60` }}
              />

              <div className="relative flex items-start gap-4">
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.4 }}
                  className="p-3 rounded-lg transition-all duration-300"
                  style={{ backgroundColor: service.color + "20" }}
                >
                  <Icon
                    size={22}
                    style={{ color: service.color }}
                    className="transition-colors duration-300"
                  />
                </motion.div>

                <div className="flex-1">
                  <h3
                    className="text-white font-semibold mb-2 transition-colors duration-200 group-hover:text-white"
                    style={{}}
                  >
                    {service.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-400 transition-colors duration-200">
                    {service.text}
                  </p>
                </div>
              </div>

              {/* Bottom accent line */}
              <div
                className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded-b-xl"
                style={{ backgroundColor: service.color }}
              />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default ServicesSection;
