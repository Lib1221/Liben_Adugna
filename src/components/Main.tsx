import React, { useCallback, useEffect, useMemo, useState } from "react";
import Navbar from "./Navbar";
import HeroSection from "./sections/HeroSection";
import AboutSection from "./sections/AboutSection";
import SelectedWork from "./sections/SelectedWork";
import ServicesSection from "./sections/ServicesSection";
import SkillsSection from "./sections/skills";
import TestimonialsSection from "./sections/TestimonialsSection";
import ResumeSection from "./sections/ResumeSection";
import ProfileSection from "./sections/profileSection";
import BlogSection from "./sections/BlogSection";
import ContactSection from "./sections/ContactSection";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Search } from "lucide-react";
import { commandPaletteItems, sections } from "../data/siteContent";
import type { Section } from "../data/siteContent";
import { rankSearchResults } from "../utils/search";

const findSection = (hash: string): Section | undefined => {
  const key = hash.replace(/^#\/?/, "").toLowerCase();
  return sections.find((section) => section.toLowerCase() === key);
};

const sectionFromHash = (hash: string): Section => findSection(hash) ?? "About";

const Main: React.FC = () => {
  // Section is driven by the URL hash (#resume, #portfolio, ...) so every tab is linkable
  // and the back button works. Nothing is persisted across visits.
  const [selected, setSelectedState] = useState<Section>(() => sectionFromHash(window.location.hash));
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [paletteQuery, setPaletteQuery] = useState("");
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

  const setSelected = useCallback((value: string) => {
    const next = sectionFromHash(`#${value}`);
    if (next === "About") {
      history.replaceState(null, "", window.location.pathname);
    } else {
      window.location.hash = next.toLowerCase();
    }
    setSelectedState(next);
    window.scrollTo({ top: 0, behavior: shouldReduceMotion ? "auto" : "smooth" });
  }, [shouldReduceMotion]);

  useEffect(() => {
    const onHashChange = () => {
      const { hash } = window.location;
      // Ignore in-page anchors such as #main-content (skip link).
      if (hash && !findSection(hash)) return;
      setSelectedState(sectionFromHash(hash));
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

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
  }, [paletteOpen, filteredPaletteItems, activePaletteIndex, setSelected]);

  return (
    <div id="main-content">
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
              <HeroSection setSelected={setSelected} />
              <div className="h-px bg-gray-800 my-10" />
              <SelectedWork setSelected={setSelected} />
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
              <ProfileSection />
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
