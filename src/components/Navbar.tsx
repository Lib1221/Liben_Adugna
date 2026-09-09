import React from "react";
import { m } from "framer-motion";
import { pathForSection } from "../lib/site";
import type { Section } from "../lib/site";

interface NavbarProps {
  selected: string;
  setSelected: (value: string) => void;
}

const items: { label: Section; text: string }[] = [
  { label: "About", text: "About" },
  { label: "Resume", text: "Resume" },
  { label: "Portfolio", text: "Projects" },
  { label: "Blog", text: "Writing" },
  { label: "Contact", text: "Contact" },
];

/**
 * Desktop: a ruled tab strip with an underline indicator. Mobile: the same labels in a fixed
 * bar. The icons and the spring-scaling pill are gone; five words do not need illustrating,
 * and an indicator that bounces on every route change draws attention to the chrome.
 */
const Navbar: React.FC<NavbarProps> = ({ selected, setSelected }) => (
  <>
    <nav className="mb-8 hidden border-b border-gray-800 md:block print:hidden" aria-label="Sections">
      <ul className="-mb-px flex gap-1">
        {items.map((item) => {
          const isSelected = selected === item.label;
          return (
            <li key={item.label} className="relative">
              <a
                href={pathForSection(item.label)}
                onClick={(event) => {
                  event.preventDefault();
                  setSelected(item.label);
                }}
                aria-current={isSelected ? "page" : undefined}
                className={`block px-4 py-3 text-sm font-medium transition-colors ${
                  isSelected ? "text-white" : "text-gray-500 hover:text-gray-300"
                }`}
              >
                {item.text}
              </a>
              {isSelected && (
                <m.div
                  layoutId="nav-indicator"
                  className="absolute inset-x-0 -bottom-px h-0.5 bg-yellow-500"
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
            </li>
          );
        })}
      </ul>
    </nav>

    <div className="fixed inset-x-0 bottom-0 z-40 safe-bottom-pad px-3 md:hidden print:hidden">
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-dark-500 to-transparent"
        aria-hidden="true"
      />
      <nav
        aria-label="Sections"
        className="relative rounded-xl border border-gray-800 bg-dark-400/95 backdrop-blur-md"
      >
        <ul className="flex items-stretch justify-between">
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
                  className={`relative flex h-12 items-center justify-center px-1 text-xs font-medium transition-colors ${
                    isSelected ? "text-white" : "text-gray-500"
                  }`}
                >
                  {isSelected && (
                    <span
                      className="absolute inset-x-3 top-0 h-0.5 rounded-b bg-yellow-500"
                      aria-hidden="true"
                    />
                  )}
                  {item.text}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  </>
);

export default Navbar;
