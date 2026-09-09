import React from "react";
import { FaGithub, FaLinkedin, FaTelegram, FaEnvelope } from "react-icons/fa";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <FaGithub size={18} />, url: "https://github.com/Lib1221", label: "GitHub" },
    { icon: <FaLinkedin size={18} />, url: "https://www.linkedin.com/in/liben-adugna-6b192a2b9/", label: "LinkedIn" },
    { icon: <FaTelegram size={18} />, url: "https://t.me/liben12", label: "Telegram" },
    { icon: <FaEnvelope size={18} />, url: "mailto:libenadugna285@gmail.com", label: "Email" },
  ];

  return (
    <footer className="mt-16 border-t border-gray-800/70 print:hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="modern-card border border-gray-800 p-5 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-white mb-1">
              Liben <span className="text-yellow-500">Adugna</span>
            </h3>
            <p className="text-gray-500 text-sm">
              Software engineer · ML systems · AI benchmark design
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="p-2.5 bg-dark-300 border border-gray-800 rounded-lg text-gray-400 hover:text-yellow-500 hover:border-yellow-500/50 transition-all duration-200 hover:-translate-y-0.5"
              >
                <span aria-hidden="true">{link.icon}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-800 my-6" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>
            © {currentYear} Liben Adugna. All rights reserved.
          </p>
          <p>
            Adama, Ethiopia (UTC+3) · Open to remote roles and EU relocation · Updated Sep 2026
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
