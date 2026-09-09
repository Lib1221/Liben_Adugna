import React from "react";
import { m } from "framer-motion";
import { now } from "../../data/siteContent";

/** A dated "what I'm doing now" block. A portfolio that shows a recent date reads as alive. */
const NowSection: React.FC = () => (
  <section aria-labelledby="now-heading">
    <div className="flex items-baseline justify-between gap-4 mb-4">
      <h2 id="now-heading" className="text-2xl md:text-3xl font-bold text-white">
        Right <span className="text-yellow-500">now</span>
      </h2>
      <p className="text-xs text-gray-400">Updated {now.updated}</p>
    </div>
    <m.ul
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="grid sm:grid-cols-2 gap-3"
    >
      {now.items.map((item) => (
        <li key={item} className="flex gap-3 p-4 modern-card border border-gray-800 rounded-xl text-sm text-gray-300 leading-relaxed">
          <span className="relative flex h-2 w-2 mt-1.5 shrink-0" aria-hidden="true">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-500 opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500" />
          </span>
          {item}
        </li>
      ))}
    </m.ul>
  </section>
);

export default NowSection;
