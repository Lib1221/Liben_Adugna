import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MapPin } from "lucide-react";
import StatsStrip from "../ui/StatsStrip";
import { impactMetrics, headline, availability } from "../../data/siteContent";
import { trackEvent } from "../../utils/analytics";

interface HeroSectionProps {
  setSelected: (section: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ setSelected }) => {
  return (
    <section className="py-8 md:py-12">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-gray-500 text-sm mb-2"
      >
        Hello, I'm
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-4xl md:text-5xl font-bold text-white mb-4"
      >
        Liben <span className="text-gradient-accent">Adugna</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-xl md:text-2xl text-white font-semibold leading-snug max-w-2xl mb-5"
      >
        {headline.title}
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-gray-400 text-base leading-relaxed max-w-2xl mb-6"
      >
        {headline.summary}
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="inline-flex items-center gap-2 text-sm text-gray-300 mb-8"
      >
        <MapPin size={14} className="text-yellow-500" aria-hidden="true" />
        {availability.location}. {availability.note}
      </motion.p>

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

        <button
          onClick={() => {
            trackEvent("hero_cta_portfolio");
            setSelected("Portfolio");
          }}
          className="inline-flex items-center gap-2 px-5 py-3 bg-dark-300 border border-gray-700 text-white font-medium rounded-xl hover:border-yellow-500 hover:text-yellow-500 transition-all"
        >
          See my work
        </button>

        <a
          href="https://github.com/Lib1221"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("hero_cta_github")}
          className="inline-flex items-center gap-2 px-5 py-3 bg-dark-300 border border-gray-700 text-white font-medium rounded-xl hover:border-yellow-500 hover:text-yellow-500 transition-all"
        >
          <FaGithub size={18} aria-hidden="true" />
          GitHub
        </a>

        <a
          href="https://www.linkedin.com/in/liben-adugna-6b192a2b9/"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("hero_cta_linkedin")}
          className="inline-flex items-center gap-2 px-5 py-3 bg-dark-300 border border-gray-700 text-white font-medium rounded-xl hover:border-yellow-500 hover:text-yellow-500 transition-all"
        >
          <FaLinkedin size={18} aria-hidden="true" />
          LinkedIn
        </a>
      </motion.div>
      <StatsStrip metrics={impactMetrics} />
    </section>
  );
};

export default HeroSection;
