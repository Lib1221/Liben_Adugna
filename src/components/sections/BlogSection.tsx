import React, { useEffect, useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { ExternalLink, X } from "lucide-react";
import SectionHeader from "../ui/SectionHeader";
import { rankSearchResults } from "../../utils/search";
import { posts as blogPosts } from "../../data/posts";
import type { BlogPost } from "../../data/posts";

const BlogSection: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [loadedImages, setLoadedImages] = useState<{ [key: number]: boolean }>({});
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

  const relatedPosts = selectedPost
    ? blogPosts
        .filter((post) => post.title !== selectedPost.title)
        .filter((post) => post.tags.some((tag) => selectedPost.tags.includes(tag)))
        .slice(0, 2)
    : [];

  useEffect(() => {
    if (!selectedPost) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedPost(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedPost]);

  return (
    <section>
      <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-end justify-between mb-6">
        <SectionHeader as="h1" title="Writing" accent="" subtitle="Articles on Flutter, Django and Python, published on Medium." />
        <a
          href="https://medium.com/@adugnaliben65"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-dark-300 border border-gray-700 rounded-xl
            text-sm text-gray-400 hover:text-white hover:border-yellow-500/50 transition-all duration-200"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
          </svg>
          View all on Medium
        </a>
      </m.div>

      <div className="grid md:grid-cols-[1fr_auto] gap-4 mb-6">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by title, summary, or tag..."
          className="w-full px-4 py-2.5 bg-dark-300 border border-gray-700 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500"
        />
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-3 py-2 rounded-lg text-xs border transition-all ${
                activeTag === tag
                  ? "bg-yellow-500 text-black border-yellow-500"
                  : "bg-dark-300 text-gray-400 border-gray-800 hover:text-white"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post, index) => (
            <m.article
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedPost(post)}
              className="bg-dark-300 border border-gray-800 rounded-xl overflow-hidden hover:border-yellow-500/50 transition-all duration-300 cursor-pointer group"
            >
            {/* Image */}
            <div className="relative h-40 overflow-hidden">
              {!loadedImages[index] && (
                <div className="absolute inset-0 bg-dark-200 shimmer" />
              )}
              <img
                src={post.featuredImage}
                alt={post.title}
                loading="lazy"
                className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
                  loadedImages[index] ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setLoadedImages(prev => ({ ...prev, [index]: true }))}
              />
              <div className="absolute top-3 left-3">
                <span className="px-2 py-1 text-xs font-medium bg-yellow-500 text-black rounded">
                  {post.category}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              <p className="text-xs text-gray-500 mb-2">{post.date}</p>
              <h3 className="text-white font-semibold mb-2 group-hover:text-yellow-500 transition-colors line-clamp-2">
                {post.title}
              </h3>
              <p className="text-gray-500 text-sm line-clamp-2">
                {post.summary}
              </p>
            </div>
            </m.article>
          ))}
        </div>
      ) : (
        <div className="modern-card border border-gray-800 p-8 text-center">
          <p className="text-white font-medium mb-2">No blog posts found.</p>
          <p className="text-sm text-gray-500">Adjust your tag or search query to discover posts.</p>
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {selectedPost && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPost(null)}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          >
            <m.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-dark-400 border border-gray-800 rounded-xl w-full max-w-lg overflow-hidden"
            >
              <img
                src={selectedPost.featuredImage}
                alt={selectedPost.title}
                loading="lazy"
                className="w-full h-48 object-cover"
              />
              
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-1 text-xs font-medium bg-yellow-500 text-black rounded">
                    {selectedPost.category}
                  </span>
                  <span className="text-xs text-gray-500">{selectedPost.date}</span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3">
                  {selectedPost.title}
                </h3>
                
                <p className="text-gray-400 mb-4">
                  {selectedPost.summary}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedPost.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-dark-200 border border-gray-700 rounded text-xs text-gray-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {relatedPosts.length > 0 && (
                  <div className="mb-5">
                    <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">Related Posts</p>
                    <div className="flex flex-wrap gap-2">
                      {relatedPosts.map((post) => (
                        <button
                          key={post.title}
                          onClick={() => setSelectedPost(post)}
                          className="text-xs px-2.5 py-1.5 rounded-lg bg-dark-200 border border-gray-700 text-gray-300 hover:text-white hover:border-yellow-500/60 transition-all"
                        >
                          {post.title}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex gap-3">
                  <a
                    href={selectedPost.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-yellow-500 text-black font-semibold rounded-xl hover:bg-yellow-400 transition-colors"
                  >
                    <ExternalLink size={16} />
                    Read on Medium
                  </a>
                  <button
                    onClick={() => setSelectedPost(null)}
                    aria-label="Close"
                    title="Close"
                    className="p-3 bg-dark-300 border border-gray-700 rounded-xl text-gray-400 hover:text-white hover:border-gray-600 transition-all"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default BlogSection;
