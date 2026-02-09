import React, { useState } from "react";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaLinkedin,
  FaGithub,
  FaTelegram,
  FaInstagram,
  FaDownload,
} from "react-icons/fa";
import { SiLeetcode, SiCodeforces } from "react-icons/si";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

const Sidebar: React.FC = () => {
  const avatar =
    "https://res.cloudinary.com/dkiuz3gfn/image/upload/v1759949739/liben_fupt3c.jpg";

  const [loading, setLoading] = useState(true);

  const roles = [
    "Flutter Developer",
    "ML Engineer",
    "Full Stack Developer",
    "React Developer",
    "Data Scientist",
  ];

  return (
    <motion.aside
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Main Card */}
      <div className="bg-dark-400 border border-gray-800 rounded-2xl overflow-hidden">
        {/* Yellow accent line */}
        <div className="h-1 bg-yellow-500" />

        <div className="p-6">
          {/* Avatar */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-dark-300 rounded-full">
                  <div className="w-8 h-8 border-2 border-yellow-500/30 border-t-yellow-500 rounded-full animate-spin" />
                </div>
              )}
              <img
                src={avatar}
                alt="Liben Adugna"
                className={`w-28 h-28 rounded-full object-cover border-4 border-yellow-500 transition-opacity duration-300 ${loading ? 'opacity-0' : 'opacity-100'}`}
                onLoad={() => setLoading(false)}
              />
              {/* Online status */}
              <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-dark-400" />
            </div>
          </div>

          {/* Name */}
          <h2 className="text-xl font-bold text-center text-white mb-2">
            Liben Adugna
          </h2>

          {/* Role Typewriter */}
          <div className="text-center mb-4">
            <span className="inline-block px-4 py-1.5 bg-dark-300 rounded-full text-sm">
              <span className="text-yellow-500">
                <Typewriter
                  words={roles}
                  loop={true}
                  cursor
                  cursorStyle="|"
                  typeSpeed={60}
                  deleteSpeed={40}
                  delaySpeed={2000}
                />
              </span>
            </span>
          </div>

          {/* Available for Hire Badge */}
          <div className="flex justify-center mb-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-xs font-medium text-green-400">Available for Hire</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            <span className="text-xs px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-500 border border-yellow-500/30">
              Mobile
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-500 border border-yellow-500/30">
              Web
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-500 border border-yellow-500/30">
              ML/AI
            </span>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-800 mb-6" />

          {/* Contact Info */}
          <div className="space-y-3 mb-6">
            <ContactItem 
              icon={<FaEnvelope />} 
              label="Email" 
              value="adugnaliben65@gmail.com" 
            />
            <ContactItem 
              icon={<FaPhoneAlt />} 
              label="Phone" 
              value="+251 906169046" 
            />
            <ContactItem 
              icon={<FaMapMarkerAlt />} 
              label="Location" 
              value="Adama, Ethiopia" 
            />
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-800 mb-6" />

          {/* Social Links */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            <SocialLink icon={<FaLinkedin size={18} />} url="https://www.linkedin.com/in/liben-adugna-6b192a2b9/" />
            <SocialLink icon={<FaGithub size={18} />} url="https://github.com/lib1221" />
            <SocialLink icon={<FaTelegram size={18} />} url="https://t.me/liben12" />
            <SocialLink icon={<FaInstagram size={18} />} url="https://instagram.com/libenadugna" />
            <SocialLink icon={<SiLeetcode size={18} />} url="https://leetcode.com/libenadugna" />
            <SocialLink icon={<SiCodeforces size={18} />} url="https://codeforces.com/profile/Hehehc" />
          </div>

          {/* Download Resume */}
          <a
            href="/resume.pdf"
            download
            className="flex items-center justify-center gap-2 w-full py-3 bg-yellow-500 text-black font-semibold rounded-xl hover:bg-yellow-400 transition-colors"
          >
            <FaDownload size={14} />
            Download Resume
          </a>
        </div>
      </div>

    </motion.aside>
  );
};

const ContactItem: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({
  icon,
  label,
  value,
}) => (
  <div className="flex items-center gap-3 p-3 bg-dark-300 rounded-xl">
    <div className="p-2 bg-yellow-500/10 rounded-lg text-yellow-500">
      {icon}
    </div>
    <div className="min-w-0 flex-1">
      <p className="text-[10px] uppercase tracking-wider text-gray-500">{label}</p>
      <p className="text-sm text-white truncate">{value}</p>
    </div>
  </div>
);

const SocialLink: React.FC<{ icon: React.ReactNode; url: string }> = ({ icon, url }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="p-2.5 bg-dark-300 rounded-xl text-gray-400 hover:text-yellow-500 hover:bg-dark-200 transition-all duration-200"
  >
    {icon}
  </a>
);

export default Sidebar;
