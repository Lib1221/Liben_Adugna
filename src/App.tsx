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
    <div className="min-h-screen w-full bg-dark-500 relative">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[520px] h-[520px] rounded-full bg-yellow-500/10 blur-3xl" />
      </div>
      {/* Scroll Progress Bar */}
      <div className="print:hidden"><ScrollProgress /></div>

      {/* Main layout */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left sidebar */}
          <div className="w-full lg:w-80 flex-shrink-0 print:hidden">
            <div className="lg:sticky lg:top-8">
              <Sidebar />
            </div>
          </div>

          {/* Right main content */}
          <div className="flex-1 min-w-0">
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
