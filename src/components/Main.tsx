import React, { useEffect, useMemo, useState } from "react";
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
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Search } from "lucide-react";
import { commandPaletteItems } from "../data/siteContent";
import { rankSearchResults } from "../utils/search";

const Main: React.FC = () => {
  const [selected, setSelected] = useState(() => {
    if (typeof window === "undefined") return "About";
    const stored = localStorage.getItem("selected-section");
    const validSections = commandPaletteItems.map((item) => item.section);
    return stored && validSections.includes(stored as (typeof validSections)[number]) ? stored : "About";
  });
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [paletteQuery, setPaletteQuery] = useState("");
  const [visitorMode, setVisitorMode] = useState<"recruiter" | "client" | "engineer">(() => {
    if (typeof window === "undefined") return "recruiter";
    const stored = localStorage.getItem("visitor-mode");
    if (stored === "recruiter" || stored === "client" || stored === "engineer") return stored;
    return "recruiter";
  });
  const [activePaletteIndex, setActivePaletteIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setPaletteOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    localStorage.setItem("visitor-mode", visitorMode);
  }, [visitorMode]);

  useEffect(() => {
    localStorage.setItem("selected-section", selected);
  }, [selected]);

  const filteredPaletteItems = useMemo(() => {
    const query = paletteQuery.trim();
    const ranked = rankSearchResults(
      commandPaletteItems.map((item) => ({
        item,
        text: `${item.label} ${item.section}`,
        keywords: item.keywords,
      })),
      query,
    );
    return ranked.map((result) => result.item);
  }, [paletteQuery]);

  useEffect(() => {
    setActivePaletteIndex(0);
  }, [paletteQuery, paletteOpen]);

  useEffect(() => {
    if (!paletteOpen) return;
    const onPaletteKeyDown = (e: KeyboardEvent) => {
      if (filteredPaletteItems.length === 0) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActivePaletteIndex((prev) => (prev + 1) % filteredPaletteItems.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActivePaletteIndex((prev) => (prev - 1 + filteredPaletteItems.length) % filteredPaletteItems.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        const activeItem = filteredPaletteItems[activePaletteIndex];
        if (!activeItem) return;
        setSelected(activeItem.section);
        setPaletteOpen(false);
        setPaletteQuery("");
      }
    };
    window.addEventListener("keydown", onPaletteKeyDown);
    return () => window.removeEventListener("keydown", onPaletteKeyDown);
  }, [paletteOpen, filteredPaletteItems, activePaletteIndex]);

  return (
    <div>
      <div className="mb-4 modern-card border border-gray-800 p-3">
        <p className="text-[11px] uppercase tracking-wider text-gray-500 mb-2">Portfolio View Mode</p>
        <div className="flex flex-wrap gap-2">
          {[
            { id: "recruiter", label: "Recruiter Focus" },
            { id: "client", label: "Client Focus" },
            { id: "engineer", label: "Engineer Focus" },
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => setVisitorMode(mode.id as "recruiter" | "client" | "engineer")}
              className={`px-3 py-1.5 rounded-lg text-xs border transition-all ${
                visitorMode === mode.id
                  ? "bg-yellow-500 text-black border-yellow-500"
                  : "bg-dark-300 text-gray-400 border-gray-800 hover:text-white"
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <button
          onClick={() => setPaletteOpen(true)}
          className="w-full md:w-auto inline-flex items-center gap-2 px-4 py-2 bg-dark-400 border border-gray-800 rounded-xl text-sm text-gray-400 hover:text-white hover:border-gray-600 transition-all"
        >
          <Search size={14} />
          Quick Navigate
          <span className="text-xs text-gray-500 ml-1">Ctrl/Cmd + K</span>
        </button>
      </div>

      {/* Navbar */}
      <Navbar selected={selected} setSelected={setSelected} />

      {/* Main content */}
      <div className="bg-dark-400 border border-gray-800 rounded-2xl p-6 md:p-8">
        <AnimatePresence mode="wait">
          {selected === "About" && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -20 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
            >
              <HeroSection setSelected={setSelected} visitorMode={visitorMode} />
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
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -20 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
            >
              <ResumeSection />
            </motion.div>
          )}

          {selected === "Portfolio" && (
            <motion.div
              key="portfolio"
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -20 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
            >
              <ProfileSection visitorMode={visitorMode} />
            </motion.div>
          )}

          {selected === "Blog" && (
            <motion.div
              key="blog"
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -20 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
            >
              <BlogSection />
            </motion.div>
          )}

          {selected === "Contact" && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -20 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
            >
              <ContactSection />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile spacing for bottom navigation */}
      <div className="h-[calc(env(safe-area-inset-bottom,0px)+92px)] md:h-0" />

      <AnimatePresence>
        {paletteOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPaletteOpen(false)}
            className="fixed inset-0 z-50 bg-black/70 p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-lg mx-auto mt-24 modern-card border border-gray-700 p-4"
            >
              <input
                autoFocus
                value={paletteQuery}
                onChange={(e) => setPaletteQuery(e.target.value)}
                placeholder="Type to navigate..."
                className="w-full px-4 py-3 bg-dark-300 border border-gray-700 rounded-xl text-sm text-white focus:outline-none focus:border-yellow-500 mb-3"
              />
              <div className="space-y-2 max-h-72 overflow-y-auto">
                {filteredPaletteItems.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setSelected(item.section);
                      setPaletteOpen(false);
                      setPaletteQuery("");
                    }}
                    className={`w-full text-left px-3 py-2.5 rounded-lg bg-dark-300 border text-gray-300 transition-all ${
                      activePaletteIndex === index
                        ? "border-yellow-500/60 text-white"
                        : "border-gray-700 hover:border-yellow-500/60 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                {filteredPaletteItems.length === 0 && (
                  <p className="text-sm text-gray-500 px-2 py-3">No result found.</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Main;
