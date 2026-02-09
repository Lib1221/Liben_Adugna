import React, { useState } from "react";
import Navbar from "./Navbar";
import HeroSection from "./sections/HeroSection";
import AboutSection from "./sections/AboutSection";
import ServicesSection from "./sections/ServicesSection";
import SkillsSection from "./sections/skills";
import TestimonialsSection from "./sections/TestimonialsSection";
import ResumeSection from "./sections/ResumeSection";
import ProfileSection from "./sections/profileSection";
import BlogSection from "./sections/BlogSection";
import ContactSection from "./sections/ContactSection";
import { motion, AnimatePresence } from "framer-motion";

const Main: React.FC = () => {
  const [selected, setSelected] = useState("About");

  return (
    <div>
      {/* Navbar */}
      <Navbar selected={selected} setSelected={setSelected} />

      {/* Main content */}
      <div className="bg-dark-400 border border-gray-800 rounded-2xl p-6 md:p-8">
        <AnimatePresence mode="wait">
          {selected === "About" && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <HeroSection setSelected={setSelected} />
              <div className="h-px bg-gray-800 my-10" />
              <AboutSection />
              <div className="h-px bg-gray-800 my-10" />
              <ServicesSection />
              <div className="h-px bg-gray-800 my-10" />
              <SkillsSection />
              <div className="h-px bg-gray-800 my-10" />
              <TestimonialsSection />
            </motion.div>
          )}

          {selected === "Resume" && (
            <motion.div
              key="resume"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ResumeSection />
            </motion.div>
          )}

          {selected === "Portfolio" && (
            <motion.div
              key="portfolio"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ProfileSection />
            </motion.div>
          )}

          {selected === "Blog" && (
            <motion.div
              key="blog"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <BlogSection />
            </motion.div>
          )}

          {selected === "Contact" && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ContactSection />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile spacing for bottom navigation */}
      <div className="h-24 md:h-0" />
    </div>
  );
};

export default Main;
