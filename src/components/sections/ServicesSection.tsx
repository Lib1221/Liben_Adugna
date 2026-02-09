import React from "react";
import { FaMobileAlt, FaLaptopCode, FaBrain, FaServer, FaRobot, FaCogs } from "react-icons/fa";
import { motion } from "framer-motion";

const services = [
  { 
    icon: <FaMobileAlt size={24} />, 
    title: "Mobile App Development", 
    text: "Production-grade cross-platform apps with Flutter & React Native. Clean architecture and state management.", 
  },
  { 
    icon: <FaLaptopCode size={24} />, 
    title: "Web Development", 
    text: "React & Next.js with SSR, SEO optimization. Dashboards, admin panels, and data-driven UIs.", 
  },
  { 
    icon: <FaServer size={24} />, 
    title: "Backend Development", 
    text: "High-performance backend services with Django, Laravel, and Node.js. RESTful APIs and microservices.", 
  },
  { 
    icon: <FaBrain size={24} />, 
    title: "Data Science & ML", 
    text: "Classical ML, Deep Learning, NLP, computer vision, and predictive systems.", 
  },
  { 
    icon: <FaRobot size={24} />, 
    title: "AI Integration", 
    text: "Integrate intelligent features into products. Model deployment and AI-powered automation.", 
  },
  { 
    icon: <FaCogs size={24} />, 
    title: "Automation", 
    text: "Workflow automation, data pipelines, CI/CD setup, and custom scripts.", 
  },
];

const ServicesSection: React.FC = () => {
  return (
    <section>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
          What I'm <span className="text-yellow-500">Doing</span>
        </h2>
        <div className="w-16 h-1 bg-yellow-500 rounded" />
      </motion.div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service, idx) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-5 bg-dark-300 border border-gray-800 rounded-xl hover:border-yellow-500/50 transition-all duration-300 group"
          >
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className="p-3 bg-yellow-500/10 rounded-lg text-yellow-500 group-hover:bg-yellow-500 group-hover:text-black transition-all duration-300">
                {service.icon}
              </div>
              
              <div className="flex-1">
                <h3 className="text-white font-semibold mb-2 group-hover:text-yellow-500 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {service.text}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
