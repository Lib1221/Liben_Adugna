import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import AIChatbot from "./components/AIChatbot";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import { Analytics } from "@vercel/analytics/react";

// Scroll Progress Component
const ScrollProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPosition = window.scrollY;
      const scrollPercentage = totalHeight > 0 ? (scrollPosition / totalHeight) * 100 : 0;
      setProgress(scrollPercentage);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
    <div className="min-h-screen w-full bg-dark-500">
      {/* Scroll Progress Bar */}
      <ScrollProgress />

      {/* Main layout */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left sidebar */}
          <div className="w-full lg:w-80 flex-shrink-0">
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

      {/* Footer */}
      <Footer />

      {/* Scroll to Top */}
      <ScrollToTop />

      {/* AI Assistant */}
      <AIChatbot />

      {/* Analytics */}
      <Analytics />
    </div>
  );
}

export default App;
