import React from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import { motion } from "framer-motion";

const Sidebar: React.FC = () => {
  const avatar = "https://i.pravatar.cc/300?img=12"; // replace with your avatar
  return (
    <motion.aside
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="sticky top-20"
    >
      <div className="glass rounded-xl p-6 shadow-soft border border-transparent panel-bg">
        <div className="flex flex-col items-center">
          <div className="relative">
            <img src={avatar} alt="avatar" className="h-32 w-32 rounded-full object-cover" />
            <span className="absolute bottom-2 right-2 h-4 w-4 bg-green-400 rounded-full ring-2 ring-black"></span>
          </div>

          <h2 className="mt-4 text-xl font-semibold">Aakash Rajbanshi</h2>
          <div className="mt-2 inline-block bg-[#222] text-[#ddd] px-3 py-1 rounded-full text-sm">Software Developer</div>
        </div>

        <hr className="my-6 border-t border-[#222]" />

        <div className="space-y-4">
          <Item icon={<FaEnvelope />} title="Email" value="aakashrajbanshi58..." />
          <Item icon={<FaPhoneAlt />} title="Phone" value="+977 9812345678" />
          <Item icon={<FaMapMarkerAlt />} title="Location" value="Kathmandu, Nepal" />
        </div>

        <div className="mt-6 flex items-center justify-center gap-4 text-gray-300">
          <a aria-label="LinkedIn" href="#"><FaLinkedin size={20} /></a>
          <a aria-label="GitHub" href="#"><FaGithub size={20} /></a>
          <a aria-label="Twitter" href="#"><FaTwitter size={20} /></a>
        </div>
      </div>
    </motion.aside>
  );
};

const Item: React.FC<{ icon: React.ReactNode; title: string; value: string }> = ({ icon, title, value }) => (
  <div className="flex items-center gap-4">
    <div className="p-3 bg-[#171717] rounded-lg text-accent">
      {icon}
    </div>
    <div>
      <div className="text-sm text-gray-400">{title}</div>
      <div className="text-sm text-white">{value}</div>
    </div>
  </div>
);

export default Sidebar;
