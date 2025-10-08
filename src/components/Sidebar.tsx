import React, { useState } from "react";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaLinkedin,
  FaGithub,
  FaTelegram,
  FaInstagram,
} from "react-icons/fa";
import { motion } from "framer-motion";

const Sidebar: React.FC = () => {
  const avatar =
    "https://res.cloudinary.com/dkiuz3gfn/image/upload/v1759949739/liben_fupt3c.jpg";

  const [loading, setLoading] = useState(true);

  return (
    <motion.aside
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="sticky top-20"
    >
      <div className="glass rounded-xl p-6 shadow-soft border border-transparent panel-bg">
        <div className="flex flex-col items-center">
          <div className="relative h-32 w-32">
            {/* 🟡 Spinner while image loads */}
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-[#111] rounded-full">
                <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-yellow-400"></div>
              </div>
            )}

            <motion.img
              src={avatar}
              alt="Liben Adugna"
              className={`h-32 w-32 rounded-full object-cover transition-opacity duration-700 ${
                loading ? "opacity-0" : "opacity-100"
              }`}
              onLoad={() => setLoading(false)}
            />

            {/* 🟡 Status dot (yellow) */}
            {!loading && (
              <span className="absolute bottom-2 right-2 h-4 w-4 bg-green-400 rounded-full ring-2 ring-black"></span>
            )}
          </div>

          {/* 🟡 Name and title */}
          <h2 className="mt-4 text-xl font-semibold text-yellow-400">
            Liben Adugna
          </h2>
          <div className="mt-2 inline-block bg-[#222] text-[#ddd] px-3 py-1 rounded-full text-sm">
            Software Developer
          </div>
        </div>

        <hr className="my-6 border-t border-[#222]" />

        {/* 🟡 Contact Info */}
        <div className="space-y-4">
          <Item
            icon={<FaEnvelope />}
            title="Email"
            value="adugnaliben65@gmail.com"
          />
          <Item icon={<FaPhoneAlt />} title="Phone" value="+251 906169046" />
          <Item
            icon={<FaMapMarkerAlt />}
            title="Location"
            value="Adama, Ethiopia"
          />
        </div>

        {/* 🟡 Social Links */}
        <div className="mt-6 flex justify-left gap-6 text-gray-300">
          <a
            aria-label="LinkedIn"
            href="https://www.linkedin.com/in/liben-adugna-6b192a2b9/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-400 transition"
          >
            <FaLinkedin size={25} />
          </a>
          <a
            aria-label="GitHub"
            href="https://github.com/lib1221"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-400 transition"
          >
            <FaGithub size={25} />
          </a>
          <a
            aria-label="Telegram"
            href="https://t.me/liben12"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-400 transition"
          >
            <FaTelegram size={25} />
          </a>
          <a
            aria-label="Instagram"
            href="https://instagram.com/libenadugna"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-400 transition"
          >
            <FaInstagram size={25} />
          </a>
        </div>
      </div>
    </motion.aside>
  );
};

// 🟡 Item component with yellow accent icons
const Item: React.FC<{ icon: React.ReactNode; title: string; value: string }> = ({
  icon,
  title,
  value,
}) => (
  <div className="flex items-center gap-4">
    <div className="p-3 bg-[#171717] rounded-lg text-yellow-400">{icon}</div>
    <div>
      <div className="text-sm text-gray-400">{title}</div>
      <div className="text-sm text-white">{value}</div>
    </div>
  </div>
);

export default Sidebar;
