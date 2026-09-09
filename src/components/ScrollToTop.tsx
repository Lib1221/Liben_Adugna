import React, { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.scrollY > 400);

    toggleVisibility();
    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <m.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          onClick={scrollToTop}
          className="surface fixed left-5 z-40 bottom-[calc(env(safe-area-inset-bottom,0px)+84px)] p-2.5 text-gray-500 transition-colors hover:border-gray-600 hover:text-white md:left-6 md:bottom-[calc(env(safe-area-inset-bottom,0px)+24px)]"
          aria-label="Scroll to top"
        >
          <FaArrowUp size={15} aria-hidden="true" />
        </m.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
