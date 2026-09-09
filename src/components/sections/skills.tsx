import React, { useState } from "react";
import { m } from "framer-motion";
import { ChevronDown } from "lucide-react";
import SectionHeader from "../ui/SectionHeader";
import { stackDomains, dailyStack } from "../../data/skills";

/**
 * Stack, presented as five domains rather than a grid of logos.
 *
 * A logo wall answers "which tools has he heard of". The question a reader actually has is
 * "what does he do with them and how do I know", so each domain leads with a sentence of
 * practice and a line of evidence; the tool names sit underneath as supporting detail.
 */
const SkillsSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(stackDomains[0]?.id ?? null);

  return (
    <section>
      <SectionHeader
        eyebrow="05 / Stack"
        title="What I work with, and what I do with it"
        subtitle="Grouped by the problem it solves. Expand a row for the tools underneath."
      />

      <div className="mb-8">
        <p className="eyebrow mb-3">On an ordinary day</p>
        <div className="flex flex-wrap gap-2">
          {dailyStack.map((tool) => (
            <span
              key={tool}
              className="rounded-md border border-yellow-500/30 bg-yellow-500/[0.06] px-2.5 py-1 text-[13px] text-gray-300"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>

      <div className="divide-y divide-gray-800 border-y border-gray-800">
        {stackDomains.map((domain) => {
          const isOpen = openId === domain.id;
          const panelId = `stack-panel-${domain.id}`;

          return (
            <div key={domain.id}>
              <h3>
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : domain.id)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="group flex w-full items-start gap-4 py-5 text-left"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-500" aria-hidden="true" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-[17px] font-semibold text-white transition-colors group-hover:text-yellow-500">
                      {domain.title}
                    </span>
                    <span className="mt-1.5 block max-w-prose text-[15px] leading-relaxed text-gray-400">
                      {domain.practice}
                    </span>
                  </span>
                  <ChevronDown
                    size={18}
                    aria-hidden="true"
                    className={`mt-1 shrink-0 text-gray-500 transition-transform duration-200 group-hover:text-gray-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </h3>

              {isOpen && (
                <m.div
                  id={panelId}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="pb-6 pl-[26px]"
                >
                  <p className="mb-4 border-l-2 border-yellow-500/40 pl-3 text-[13px] leading-relaxed text-gray-300">
                    {domain.evidence}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {domain.tools.map((tool) => (
                      <span
                        key={tool}
                        className="rounded border border-gray-800 bg-dark-300 px-2 py-1 text-xs text-gray-400"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </m.div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SkillsSection;
