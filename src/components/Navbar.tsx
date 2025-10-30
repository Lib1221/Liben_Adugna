import React from "react";
import {
  User,
  FileText,
  FolderKanban,
  BookOpen,
  Mail,
} from "lucide-react"; // ✅ clean icon set

interface NavbarProps {
  selected: string;
  setSelected: (value: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ selected, setSelected }) => {
  const items = [
    { label: "About", icon: <User size={20} /> },
    { label: "Resume", icon: <FileText size={20} /> },
    { label: "Portfolio", icon: <FolderKanban size={20} /> },
    { label: "Blog", icon: <BookOpen size={20} /> },
    { label: "Contact", icon: <Mail size={20} /> },
  ];

  return (
    <>
      {/* Desktop/top navbar */}
      <nav className="hidden md:flex justify-end mb-6">
        <ul className="flex gap-2 lg:gap-4 items-center">
          {items.map((item) => {
            const isSelected = selected === item.label;
            return (
              <li
                key={item.label}
                onClick={() => setSelected(item.label)}
                className={`cursor-pointer flex items-center justify-center px-3 py-2 rounded-full duration-300
                ${
                  isSelected
                    ? "bg-yellow-400 text-black font-semibold"
                    : "text-gray-300 hover:bg-yellow-400 hover:text-black"
                }
              `}
              >
                <span className="hidden sm:inline text-sm">{item.label}</span>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Mobile/bottom navbar */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-50">
        <div className="mx-auto max-w-xl">
          <nav className="m-4 rounded-2xl bg-[#0b0b0b]/80 backdrop-blur border border-[#1f1f1f] shadow-lg">
            <ul className="flex justify-around items-center py-3 text-gray-300">
              {items.map((item) => {
                const isSelected = selected === item.label;
                return (
                  <li key={item.label}>
                    <button
                      type="button"
                      aria-label={item.label}
                      onClick={() => setSelected(item.label)}
                      className={`p-2 rounded-full transition ${
                        isSelected
                          ? "bg-yellow-400 text-black"
                          : "hover:bg-[#1a1a1a] hover:text-yellow-400"
                      }`}
                    >
                      {item.icon}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
