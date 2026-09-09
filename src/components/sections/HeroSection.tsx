import React from "react";
import { m } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { ArrowRight, Clock } from "lucide-react";
import StatsStrip from "../ui/StatsStrip";
import { impactMetrics, headline, availability } from "../../data/siteContent";
import { trackEvent } from "../../utils/analytics";

interface HeroSectionProps {
  setSelected: (section: string) => void;
}

/** One shared entrance. Staggering every line individually reads as a template. */
const enter = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
};

const HeroSection: React.FC<HeroSectionProps> = ({ setSelected }) => (
  <section className="pb-10 pt-4 md:pb-14 md:pt-6">
    <m.div {...enter}>
      {/* The name stays inside the h1 so the page still ranks for it, but the claim is what
          the reader sees first. Nobody arrives here needing to be told hello. */}
      <h1>
        <span className="eyebrow mb-4 block">Liben Adugna · Software Engineer</span>
        <span className="block max-w-3xl text-display font-semibold text-white">{headline.title}</span>
      </h1>

      <p className="mt-6 max-w-prose text-[17px] leading-relaxed text-gray-400">{headline.summary}</p>

      <p className="mt-6 inline-flex items-start gap-2 text-sm text-gray-400">
        <Clock size={15} className="mt-0.5 shrink-0 text-yellow-500" aria-hidden="true" />
        <span>
          {availability.hours}. <span className="text-gray-300">{availability.note}</span>
        </span>
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <button
          onClick={() => {
            trackEvent("hero_cta_portfolio");
            setSelected("Portfolio");
          }}
          className="inline-flex items-center gap-2 rounded-lg bg-yellow-500 px-5 py-2.5 font-semibold text-black transition-colors hover:bg-yellow-400"
        >
          See selected work
          <ArrowRight size={16} aria-hidden="true" />
        </button>

        <button
          onClick={() => {
            trackEvent("hero_cta_contact");
            setSelected("Contact");
          }}
          className="inline-flex items-center gap-2 rounded-lg border border-gray-700 px-5 py-2.5 font-medium text-gray-200 transition-colors hover:border-gray-600 hover:text-white"
        >
          Get in touch
        </button>

        {/* Profiles are supporting links, not headline actions, so they sit at text weight. */}
        <span className="ml-1 hidden h-5 w-px bg-gray-800 sm:block" aria-hidden="true" />

        <a
          href="https://github.com/Lib1221"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("hero_cta_github")}
          className="inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-yellow-500"
        >
          <FaGithub size={16} aria-hidden="true" />
          GitHub
        </a>

        <a
          href="https://www.linkedin.com/in/liben-adugna-6b192a2b9/"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("hero_cta_linkedin")}
          className="inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-yellow-500"
        >
          <FaLinkedin size={16} aria-hidden="true" />
          LinkedIn
        </a>
      </div>
    </m.div>

    <StatsStrip metrics={impactMetrics} />
  </section>
);

export default HeroSection;
