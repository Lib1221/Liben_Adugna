import React, { useState } from "react";
import {
  FaEnvelope,
  FaLinkedin,
  FaGithub,
  FaTelegram,
  FaDownload,
} from "react-icons/fa";
import { SiLeetcode, SiCodeforces } from "react-icons/si";
import { m } from "framer-motion";
import GitHubPulse from "./ui/GitHubPulse";

/**
 * Identity card. Previously it carried a role badge, four role pills, an availability pill and
 * a green dot on the avatar: four separate ways of saying the same two facts. It now says each
 * thing once, and the only coloured element is the availability line.
 */
const Sidebar: React.FC = () => {
  // Cloudinary transform: 224px square, face-cropped, auto format/quality. Matches the preload in index.html.
  const avatar =
    "https://res.cloudinary.com/dkiuz3gfn/image/upload/w_224,h_224,c_fill,g_face,q_auto,f_auto/v1759949739/liben_fupt3c.jpg";

  const [loaded, setLoaded] = useState(false);

  return (
    <m.aside
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="surface overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-center gap-4">
          <div className={`h-16 w-16 shrink-0 overflow-hidden rounded-full ${loaded ? "" : "shimmer"}`}>
            <img
              src={avatar}
              alt="Liben Adugna"
              width={64}
              height={64}
              fetchPriority="high"
              decoding="async"
              className={`h-full w-full object-cover transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
              onLoad={() => setLoaded(true)}
            />
          </div>
          <div className="min-w-0">
            <h2 className="text-[17px] font-semibold text-white">Liben Adugna</h2>
            <p className="mt-0.5 text-[13px] text-gray-400">Software Engineer, ML and evaluation</p>
          </div>
        </div>

        <p className="mt-5 flex items-start gap-2 text-[13px] leading-relaxed text-gray-300">
          <span className="relative mt-1.5 flex h-1.5 w-1.5 shrink-0" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-live opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-live" />
          </span>
          Open to remote roles and EU relocation
        </p>

        <a
          href="/resume.pdf"
          download
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-yellow-500 py-2.5 font-semibold text-black transition-colors hover:bg-yellow-400"
        >
          <FaDownload size={13} aria-hidden="true" />
          Download CV
        </a>
      </div>

      <dl className="divide-y divide-gray-800 border-y border-gray-800 text-[13px]">
        <Row label="Email">
          <a href="mailto:libenadugna285@gmail.com" className="block truncate text-gray-200 hover:text-yellow-500">
            libenadugna285@gmail.com
          </a>
        </Row>
        <Row label="Hours">
          <span className="text-gray-200">Full overlap with Europe</span>
        </Row>
        <Row label="Replies in">
          <span className="text-gray-200">Under 24 hours</span>
        </Row>
      </dl>

      <div className="p-4">
        <GitHubPulse />
        <div className="mt-3 flex flex-wrap gap-1">
          <Social icon={<FaGithub size={16} />} url="https://github.com/Lib1221" label="GitHub" />
          <Social icon={<FaLinkedin size={16} />} url="https://www.linkedin.com/in/liben-adugna-6b192a2b9/" label="LinkedIn" />
          <Social icon={<FaTelegram size={16} />} url="https://t.me/liben12" label="Telegram" />
          <Social icon={<SiLeetcode size={16} />} url="https://leetcode.com/libenadugna" label="LeetCode" />
          <Social icon={<SiCodeforces size={16} />} url="https://codeforces.com/profile/Hehehc" label="Codeforces" />
          <Social icon={<FaEnvelope size={16} />} url="mailto:libenadugna285@gmail.com" label="Email" />
        </div>
      </div>
    </m.aside>
  );
};

const Row: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="flex items-baseline gap-3 px-6 py-3">
    <dt className="w-20 shrink-0 text-gray-500">{label}</dt>
    <dd className="min-w-0 flex-1">{children}</dd>
  </div>
);

const Social: React.FC<{ icon: React.ReactNode; url: string; label: string }> = ({ icon, url, label }) => (
  <a
    href={url}
    target={url.startsWith("mailto:") ? undefined : "_blank"}
    rel="noopener noreferrer"
    aria-label={label}
    title={label}
    className="rounded-md p-2 text-gray-500 transition-colors hover:bg-dark-300 hover:text-yellow-500"
  >
    <span aria-hidden="true">{icon}</span>
  </a>
);

export default Sidebar;
