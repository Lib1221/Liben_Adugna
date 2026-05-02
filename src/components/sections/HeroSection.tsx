import React from "react";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import StatsStrip from "../ui/StatsStrip";
import { impactMetrics } from "../../data/siteContent";
import { trackEvent } from "../../utils/analytics";

interface HeroSectionProps {
  setSelected: (section: string) => void;
  visitorMode: "recruiter" | "client" | "engineer";
}

const HeroSection: React.FC<HeroSectionProps> = ({ setSelected, visitorMode }) => {
  const roles = [
    "ML Engineer",
    "AI Systems Reviewer",
    "Full Stack Developer",
    "Code Evaluator",
    "Data Scientist",
  ];
  const modeCopy = {
    recruiter:
      "Focused on measurable outcomes, reliability, and clean delivery across ML and full-stack systems.",
    client:
      "Focused on business value, product quality, and delivering production-ready systems from idea to deployment.",
    engineer:
      "Focused on architecture, performance, and maintainable implementation details across the full stack.",
  };

  return (
    <section className="py-8 md:py-12">
      {/* Greeting */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-gray-500 text-sm mb-2"
      >
        Hello, I'm
      </motion.p>

      {/* Name */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-4xl md:text-5xl font-bold text-white mb-4"
      >
        Liben <span className="text-gradient-accent">Adugna</span>
      </motion.h1>

      {/* Role */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-xl md:text-2xl mb-6"
      >
        <span className="text-gray-400">I'm a </span>
        <span className="text-yellow-500 font-semibold">
          <Typewriter
            words={roles}
            loop={true}
            cursor
            cursorStyle="|"
            typeSpeed={60}
            deleteSpeed={40}
            delaySpeed={2000}
          />
        </span>
      </motion.div>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-gray-400 text-base leading-relaxed max-w-2xl mb-8"
      >
        Software Engineer with expertise in machine learning systems, code evaluation, and full-stack 
        development. Experienced in validating AI-generated outputs, reviewing system implementations, 
        and building scalable web and mobile applications. Strong in debugging, performance optimization, 
        and designing reliable, maintainable software systems.
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="text-sm text-yellow-500/90 max-w-2xl mb-8"
      >
        {modeCopy[visitorMode]}
      </motion.p>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex flex-wrap gap-3"
      >
        <button
          onClick={() => {
            trackEvent("hero_cta_contact");
            setSelected("Contact");
          }}
          className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-500 text-black font-semibold rounded-xl hover:bg-yellow-400 transition-colors"
        >
          Get in Touch
        </button>
        
        <a
          href="https://github.com/lib1221"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("hero_cta_github")}
          className="inline-flex items-center gap-2 px-5 py-3 bg-dark-300 border border-gray-700 text-white font-medium rounded-xl hover:border-yellow-500 hover:text-yellow-500 transition-all"
        >
          <FaGithub size={18} />
          GitHub
        </a>

        <a
          href="https://www.linkedin.com/in/liben-adugna-6b192a2b9/"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("hero_cta_linkedin")}
          className="inline-flex items-center gap-2 px-5 py-3 bg-dark-300 border border-gray-700 text-white font-medium rounded-xl hover:border-yellow-500 hover:text-yellow-500 transition-all"
        >
          <FaLinkedin size={18} />
          LinkedIn
        </a>
      </motion.div>
      <StatsStrip metrics={impactMetrics} />
    </section>
  );
};

export default HeroSection;
