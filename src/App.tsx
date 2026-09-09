import React, { Suspense, lazy, useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
const AIChatbot = lazy(() => import("./components/AIChatbot"));
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import { Analytics } from "@vercel/analytics/react";
import { LazyMotion, domMax } from "framer-motion";

// Scroll Progress Component
const ScrollProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Coalesce scroll events into one layout read per frame to avoid forced reflows.
    let frame = 0;
    const handleScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercentage = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
        setProgress(scrollPercentage);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div 
      className="scroll-progress"
      style={{ width: `${progress}%` }}
    />
  );
};

function App() {
  return (
    <LazyMotion features={domMax} strict>
    <div className="relative min-h-screen w-full bg-dark-500">
      <div className="print:hidden">
        <ScrollProgress />
      </div>

      {/* Sidebar is a card, the content column sits open on the page. Boxing both produced a
          card-inside-a-card and cost the content its breathing room. */}
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-8 md:py-14">
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-14">
          <div className="w-full flex-shrink-0 lg:w-72 print:hidden">
            <div className="lg:sticky lg:top-10">
              <Sidebar />
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <Main />
          </div>
        </div>
      </div>

      <Footer />
      <div className="print:hidden">
        <ScrollToTop />
        <Suspense fallback={null}>
          <AIChatbot />
        </Suspense>
      </div>

      {/* Analytics */}
      <Analytics />
    </div>
    </LazyMotion>
  );
}

export default App;
