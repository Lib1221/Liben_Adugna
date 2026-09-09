import React, { Suspense, lazy, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Navbar from "./Navbar";
import HeroSection from "./sections/HeroSection";
import SelectedWork from "./sections/SelectedWork";
import NowSection from "./sections/NowSection";
import AboutSection from "./sections/AboutSection";
import ServicesSection from "./sections/ServicesSection";
import SkillsSection from "./sections/skills";
import TestimonialsSection from "./sections/TestimonialsSection";
import { m, AnimatePresence, useReducedMotion } from "framer-motion";
import { Search } from "lucide-react";
import { commandPaletteItems } from "../data/siteContent";
import { pathForSection, pathForRoute, sectionForRoute } from "../lib/site";
import type { Section } from "../lib/site";
import { useRoute, navigate } from "../lib/useRoute";
import { rankSearchResults } from "../utils/search";

// Everything outside the landing view loads on demand, so the first paint pays only for the landing view.
const ResumeSection = lazy(() => import("./sections/ResumeSection"));
const ProfileSection = lazy(() => import("./sections/profileSection"));
const BlogSection = lazy(() => import("./sections/BlogSection"));
const ContactSection = lazy(() => import("./sections/ContactSection"));
const ProjectPage = lazy(() => import("./pages/ProjectPage"));

const RouteFallback: React.FC = () => (
  <div className="py-16 text-center text-sm text-gray-400" role="status" aria-live="polite">
    Loading…
  </div>
);

const NotFound: React.FC<{ path: string }> = ({ path }) => (
  <section className="py-10">
    <p className="eyebrow mb-3 text-yellow-500">404</p>
    <h1 className="mb-3 text-display font-semibold text-white">That page does not exist</h1>
    <p className="text-gray-400 mb-6">
      Nothing lives at <code className="px-1.5 py-0.5 bg-dark-300 rounded text-gray-200">{path}</code>. Try one of these instead.
    </p>
    <div className="flex flex-wrap gap-2">
      {(["About", "Resume", "Portfolio", "Blog", "Contact"] as Section[]).map((section) => (
        <button
          key={section}
          onClick={() => navigate(pathForSection(section))}
          className="rounded-lg border border-gray-700 px-4 py-2 text-sm text-gray-200 transition-colors hover:border-yellow-500 hover:text-yellow-500"
        >
          {section === "Portfolio" ? "Projects" : section === "Blog" ? "Writing" : section}
        </button>
      ))}
    </div>
  </section>
);

const Main: React.FC = () => {
  const route = useRoute();
  const selected = sectionForRoute(route);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [paletteQuery, setPaletteQuery] = useState("");
  const [activePaletteIndex, setActivePaletteIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const contentRef = useRef<HTMLDivElement>(null);
  const routeKey = pathForRoute(route);
  const firstRender = useRef(true);

  const setSelected = useCallback((value: string) => {
    const section = (["About", "Resume", "Portfolio", "Blog", "Contact"] as Section[]).find((s) => s === value) ?? "About";
    navigate(pathForSection(section));
  }, []);

  // After a client-side navigation: scroll up and move focus to the new content for keyboard and screen-reader users.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    window.scrollTo({ top: 0, behavior: shouldReduceMotion ? "auto" : "smooth" });
    // The new view mounts after the exit animation and a possible lazy chunk load, so poll briefly.
    let attempts = 0;
    const timer = window.setInterval(() => {
      attempts += 1;
      const heading = contentRef.current?.querySelector<HTMLElement>(`[data-route="${CSS.escape(routeKey)}"] h1`);
      if (heading) {
        heading.setAttribute("tabindex", "-1");
        heading.focus({ preventScroll: true });
        window.clearInterval(timer);
      } else if (attempts > 20) {
        window.clearInterval(timer);
      }
    }, 100);
    return () => window.clearInterval(timer);
  }, [routeKey, shouldReduceMotion]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((prev) => !prev);
      }
      if (e.key === "Escape") setPaletteOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const filteredPaletteItems = useMemo(() => {
    const query = paletteQuery.trim();
    const ranked = rankSearchResults(
      commandPaletteItems.map((item) => ({ item, text: `${item.label} ${item.section}`, keywords: item.keywords })),
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

  const view = (() => {
    switch (route.kind) {
      case "home":
        return (
          <div className="space-y-16 md:space-y-20">
            <HeroSection setSelected={setSelected} />
            <SelectedWork setSelected={setSelected} />
            <NowSection />
            <AboutSection />
            <ServicesSection />
            <SkillsSection />
            <TestimonialsSection />
          </div>
        );
      case "resume":
        return <ResumeSection />;
      case "projects":
        return <ProfileSection />;
      case "project":
        return <ProjectPage project={route.project} />;
      case "writing":
        return <BlogSection />;
      case "contact":
        return <ContactSection />;
      case "notfound":
        return <NotFound path={route.path} />;
    }
  })();

  return (
    <main id="main-content" ref={contentRef}>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <Navbar selected={selected} setSelected={setSelected} />
        </div>
        <button
          onClick={() => setPaletteOpen(true)}
          className="mt-1 hidden shrink-0 items-center gap-2 rounded-lg border border-gray-800 px-3 py-2 text-[13px] text-gray-500 transition-colors hover:border-gray-700 hover:text-gray-300 md:inline-flex print:hidden"
        >
          <Search size={13} aria-hidden="true" />
          Jump to
          <kbd className="rounded border border-gray-800 bg-dark-300 px-1.5 py-0.5 font-sans text-[11px] text-gray-500">
            ⌘K
          </kbd>
        </button>
      </div>

      <div className="print:border-0 print:p-0">
        <AnimatePresence mode="wait">
          <m.div
            key={routeKey}
            data-route={routeKey}
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -12 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
          >
            <Suspense fallback={<RouteFallback />}>{view}</Suspense>
          </m.div>
        </AnimatePresence>
      </div>

      {/* Mobile spacing for bottom navigation */}
      <div className="h-[calc(env(safe-area-inset-bottom,0px)+92px)] md:h-0 print:hidden" />

      <AnimatePresence>
        {paletteOpen && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPaletteOpen(false)}
            className="fixed inset-0 z-50 bg-black/70 p-4"
          >
            <m.div
              initial={{ opacity: 0, scale: 0.97, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-label="Quick navigate"
              className="surface mx-auto mt-24 max-w-lg p-4"
            >
              <input
                autoFocus
                value={paletteQuery}
                onChange={(e) => setPaletteQuery(e.target.value)}
                placeholder="Type to navigate..."
                aria-label="Search sections"
                className="mb-3 w-full rounded-lg border border-gray-800 bg-dark-300 px-3.5 py-2.5 text-sm text-white transition-colors focus:border-yellow-500 focus:outline-none"
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
                {filteredPaletteItems.length === 0 && <p className="text-sm text-gray-500 px-2 py-3">No result found.</p>}
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default Main;
