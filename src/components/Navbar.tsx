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
    <nav className="flex justify-end mb-6">
      <ul className="flex gap-2 sm:gap-4 items-center">
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
              {/* 📱 Show icon on small screens, 🖥️ text on larger */}
              <span className="sm:hidden">{item.icon}</span>
              <span className="hidden sm:inline text-sm">{item.label}</span>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
