import React from "react";

interface NavbarProps {
  selected: string;
  setSelected: (value: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ selected, setSelected }) => {
  const items = ["About", "Resume", "Portfolio", "Blog", "Contact"];

  return (
    <nav className="flex justify-end mb-6">
      <ul className="flex gap-4 items-center">
        {items.map((it) => {
          const isSelected = selected === it;
          return (
            <li
              key={it}
              className={`
                text-sm cursor-pointer px-3 py-1 rounded-full duration-300
                ${isSelected ? "bg-yellow-400 text-black font-semibold" : "text-gray-300 hover:bg-yellow-400 hover:text-black"}
              `}
              onClick={() => setSelected(it)}
            >
              {it}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
