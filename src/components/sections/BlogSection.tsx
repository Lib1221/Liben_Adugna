import React, { useState } from "react";
import { m } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SectionHeader from "../ui/SectionHeader";
import { rankSearchResults } from "../../utils/search";
import { posts as blogPosts } from "../../data/posts";

/**
 * Articles as a ruled list that links straight to Medium.
 *
 * The previous version was a card grid where clicking a card opened a modal showing the same
 * title and summary plus a "Read on Medium" button: an interstitial between the reader and
 * the thing they asked for. The card is now the link.
 */
const BlogSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTag, setActiveTag] = useState("All");

  const allTags = ["All", ...Array.from(new Set(blogPosts.flatMap((post) => post.tags))).sort()];
  const taggedPosts = blogPosts.filter((post) => activeTag === "All" || post.tags.includes(activeTag));
  const filteredPosts = searchTerm.trim()
    ? rankSearchResults(
        taggedPosts.map((post) => ({
          item: post,
          text: `${post.title} ${post.summary} ${post.category}`,
          keywords: post.tags,
        })),
        searchTerm,
      ).map((result) => result.item)
    : taggedPosts;

  return (
    <section>
      <SectionHeader
        as="h1"
        title="Writing"
        subtitle="Long-form notes on Flutter, Django and Python, published on Medium. Each one comes out of something I had to work out on a real build."
        aside={
          <a
            href="https://medium.com/@adugnaliben65"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-gray-400 transition-colors hover:text-yellow-500"
          >
            All on Medium
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        }
      />

      <div className="mb-2 flex flex-wrap items-center gap-3">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search articles"
          placeholder="Search articles"
          className="min-w-0 flex-1 rounded-lg border border-gray-800 bg-dark-400 px-3 py-2 text-sm text-gray-200 placeholder-gray-500 transition-colors focus:border-yellow-500 focus:outline-none"
        />
        <div className="flex flex-wrap gap-1">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              aria-pressed={activeTag === tag}
              className={`rounded-md px-2.5 py-1.5 text-[13px] transition-colors ${
                activeTag === tag ? "bg-yellow-500 text-black" : "text-gray-400 hover:bg-dark-300 hover:text-white"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {filteredPosts.length > 0 ? (
        <ol className="divide-y divide-gray-800 border-t border-gray-800">
          {filteredPosts.map((post, index) => (
            <m.li
              key={post.link}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid gap-3 py-6 md:grid-cols-[7rem_1fr_auto] md:items-baseline md:gap-8"
              >
                <span className="tabular text-[13px] text-gray-500">{post.date}</span>

                <span className="min-w-0">
                  <span className="block text-[17px] font-semibold text-white transition-colors group-hover:text-yellow-500">
                    {post.title}
                  </span>
                  <span className="mt-1.5 block max-w-prose text-[15px] leading-relaxed text-gray-400">
                    {post.summary}
                  </span>
                  <span className="mt-3 flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                      <span key={tag} className="rounded border border-gray-800 px-2 py-0.5 text-xs text-gray-500">
                        {tag}
                      </span>
                    ))}
                  </span>
                </span>

                <ArrowUpRight
                  size={18}
                  aria-hidden="true"
                  className="hidden text-gray-600 transition-colors group-hover:text-yellow-500 md:block"
                />
              </a>
            </m.li>
          ))}
        </ol>
      ) : (
        <p className="border-t border-gray-800 py-10 text-center text-sm text-gray-500">
          Nothing matches that tag or search term.
        </p>
      )}
    </section>
  );
};

export default BlogSection;
