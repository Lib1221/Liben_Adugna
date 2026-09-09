import React from "react";
import {
  User,
  FileText,
  FolderKanban,
  BookOpen,
  Mail,
} from "lucide-react";
import { m } from "framer-motion";
import { pathForSection } from "../lib/site";
import type { Section } from "../lib/site";

interface NavbarProps {
  selected: string;
  setSelected: (value: string) => void;
}

const items: { label: Section; text: string; icon: React.ReactNode }[] = [
  { label: "About", text: "About", icon: <User size={20} aria-hidden="true" /> },
  { label: "Resume", text: "Resume", icon: <FileText size={20} aria-hidden="true" /> },
  { label: "Portfolio", text: "Projects", icon: <FolderKanban size={20} aria-hidden="true" /> },
  { label: "Blog", text: "Writing", icon: <BookOpen size={20} aria-hidden="true" /> },
  { label: "Contact", text: "Contact", icon: <Mail size={20} aria-hidden="true" /> },
];

const Navbar: React.FC<NavbarProps> = ({ selected, setSelected }) => {
  return (
    <>
      {/* Desktop navbar */}
      <nav className="hidden md:block mb-6 print:hidden" aria-label="Sections">
        <div className="modern-card border border-gray-800 rounded-2xl p-2">
          <ul className="flex gap-1">
            {items.map((item) => {
              const isSelected = selected === item.label;
              return (
                <li key={item.label} className="flex-1 relative">
                  {isSelected && (
                    <m.div
                      layoutId="desktop-nav-indicator"
                      className="absolute inset-0 bg-yellow-500 rounded-xl"
                      transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    />
                  )}
                  <a
                    href={pathForSection(item.label)}
                    onClick={(event) => {
                      event.preventDefault();
                      setSelected(item.label);
                    }}
                    aria-current={isSelected ? "page" : undefined}
                    className={`relative z-10 w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-200
                    ${isSelected
                      ? "text-black"
                      : "text-gray-400 hover:text-white hover:bg-dark-300"
                    }`}
                  >
                    {item.icon}
                    <span className="text-sm">{item.text}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Mobile Bottom Navigation - Modern Floating Design */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 px-4 safe-bottom-pad print:hidden">
        {/* Gradient blur background */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-dark-500 via-dark-500/80 to-transparent pointer-events-none" />
        
        <nav aria-label="Sections" className="relative bg-dark-400/95 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden">
          {/* Top accent line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-yellow-500 rounded-b-full" />
          
          <ul className="flex justify-around items-center py-2 px-1">
            {items.map((item) => {
              const isSelected = selected === item.label;
              return (
                <li key={item.label} className="flex-1">
                  <a
                    href={pathForSection(item.label)}
                    onClick={(event) => {
                      event.preventDefault();
                      setSelected(item.label);
                    }}
                    aria-current={isSelected ? "page" : undefined}
                    className="w-full flex flex-col items-center py-2 relative group"
                  >
                    {/* Active indicator */}
                    {isSelected && (
                      <m.div
                        layoutId="mobile-nav-indicator"
                        className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-yellow-500 rounded-full"
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                    
                    {/* Icon container */}
                    <m.div
                      animate={{
                        scale: isSelected ? 1.1 : 1,
                        y: isSelected ? -2 : 0,
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      className={`p-2 rounded-xl transition-colors duration-200 ${
                        isSelected 
                          ? "bg-yellow-500 text-black shadow-lg shadow-yellow-500/30" 
                          : "text-gray-500 group-hover:text-gray-300"
                      }`}
                    >
                      {item.icon}
                    </m.div>
                    
                    {/* Label */}
                    <m.span
                      animate={{
                        opacity: isSelected ? 1 : 0.5,
                        y: isSelected ? 0 : 2,
                      }}
                      className={`text-[10px] mt-1 font-medium transition-colors ${
                        isSelected ? "text-yellow-500" : "text-gray-500"
                      }`}
                    >
                      {item.text}
                    </m.span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
