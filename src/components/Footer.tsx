import React from "react";
import { FaGithub, FaLinkedin, FaTelegram, FaEnvelope } from "react-icons/fa";
import { availability } from "../data/siteContent";
import { now } from "../data/siteContent";

const socialLinks = [
  { icon: <FaGithub size={16} />, url: "https://github.com/Lib1221", label: "GitHub" },
  { icon: <FaLinkedin size={16} />, url: "https://www.linkedin.com/in/liben-adugna-6b192a2b9/", label: "LinkedIn" },
  { icon: <FaTelegram size={16} />, url: "https://t.me/liben12", label: "Telegram" },
  { icon: <FaEnvelope size={16} />, url: "mailto:libenadugna285@gmail.com", label: "Email" },
];

/** One rule, one row. The footer previously repeated the sidebar as a bordered card. */
const Footer: React.FC = () => (
  <footer className="mt-24 border-t border-gray-800 print:hidden">
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 md:flex-row md:items-center md:justify-between md:px-8">
      <div>
        <p className="text-sm text-gray-300">Liben Adugna</p>
        <p className="mt-1 text-[13px] text-gray-500">
          {availability.location.split(" (")[0]} · {availability.note} · Updated {now.updated}
        </p>
      </div>

      <div className="flex items-center gap-1">
        {socialLinks.map((link) => (
          <a
            key={link.label}
            href={link.url}
            target={link.url.startsWith("mailto:") ? undefined : "_blank"}
            rel="noopener noreferrer"
            aria-label={link.label}
            className="rounded-md p-2 text-gray-500 transition-colors hover:bg-dark-400 hover:text-yellow-500"
          >
            <span aria-hidden="true">{link.icon}</span>
          </a>
        ))}
      </div>
    </div>

    <p className="mx-auto max-w-6xl px-4 pb-8 text-xs text-gray-500 md:px-8">
      © {new Date().getFullYear()} Liben Adugna
    </p>
  </footer>
);

export default Footer;
