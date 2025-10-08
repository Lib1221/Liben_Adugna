import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BlogPost {
  title: string;
  summary: string;
  category: string;
  date: string;
  featuredImage: string;
  content: string;
  tags: string[];
  link?: string;
}

const blogPosts: BlogPost[] = [
  {
    title: "Building a Chat App with Flutter & Firebase",
    summary: "Step-by-step guide to building a real-time chat app using Flutter and Firebase.",
    category: "Mobile",
    date: "2025-08-10",
    featuredImage: "https://res.cloudinary.com/prod/image/upload/e_sharpen:150/me/sharpen-portrait.jpg",
    content: "Full content of the blog goes here...",
    tags: ["Flutter", "Firebase", "Mobile"],
    link: "#",
  },
  {
    title: "Optimizing Node.js APIs for High Performance",
    summary: "Tips and techniques to make your Node.js backend faster and more scalable.",
    category: "Backend",
    date: "2025-07-22",
    featuredImage: "https://res.cloudinary.com/prod/image/upload/e_sharpen:150/me/sharpen-portrait.jpg",
    content: "Full content of the blog goes here...",
    tags: ["Node.js", "Performance", "Backend"],
    link: "#",
  },
  {
    title: "Fullstack E-commerce with React & Express",
    summary: "How to build a full-featured e-commerce platform using React, Express, and MongoDB.",
    category: "Fullstack",
    date: "2025-06-15",
    featuredImage: "https://res.cloudinary.com/prod/image/upload/e_sharpen:150/me/sharpen-portrait.jpg",
    content: "Full content of the blog goes here...",
    tags: ["React", "Express", "MongoDB", "Fullstack"],
    link: "#",
  },
  {
    title: "Designing Modern UI/UX for Mobile Apps",
    summary: "Principles and practical tips for creating intuitive, modern UI/UX designs.",
    category: "UI/UX",
    date: "2025-05-30",
    featuredImage: "https://res.cloudinary.com/prod/image/upload/e_sharpen:150/me/sharpen-portrait.jpg",
    content: "Full content of the blog goes here...",
    tags: ["UI/UX", "Design", "Mobile"],
    link: "#",
  },
];

const categories = ["All", "Mobile", "Fullstack", "Backend", "UI/UX"];

const BlogSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const filteredPosts =
    activeCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === activeCategory);

  const selectedPost = selectedIndex !== null ? blogPosts[selectedIndex] : null;

  return (
    <section className="mt-12 relative z-0">
      <h2 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-6 border-b border-gray-700 pb-3">
        Blog
      </h2>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-4 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`px-4 py-2 rounded-full font-semibold transition-all duration-300
              ${activeCategory === cat ? "bg-yellow-400 text-black" : "bg-gray-800 text-gray-300 hover:bg-yellow-400 hover:text-black"}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPosts.map((post, idx) => (
          <motion.div
            key={post.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-gray-800 rounded-xl shadow-lg overflow-hidden cursor-pointer transition-transform hover:-translate-y-1"
            onClick={() => {
              setSelectedIndex(blogPosts.indexOf(post));
              setImageLoaded(false);
            }}
          >
            {/* Image with loading */}
            <div className="relative w-full h-48 bg-gray-700 flex items-center justify-center">
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg
                    className="animate-spin h-8 w-8 text-yellow-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                  </svg>
                </div>
              )}
              <img
                src={post.featuredImage}
                alt={post.title}
                className={`w-full h-full object-cover transition-opacity duration-500 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
                onLoad={() => setImageLoaded(true)}
              />
            </div>

            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-400">{post.date}</span>
                <span className="text-sm text-yellow-400 font-semibold">{post.category}</span>
              </div>
              <h3 className="text-white font-semibold text-xl">{post.title}</h3>
              <p className="text-gray-400 mt-2">{post.summary}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
          >
            <motion.div
              className="bg-gray-900 rounded-2xl w-full max-w-3xl p-6 relative overflow-y-auto max-h-[90vh]"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close */}
              <button
                onClick={() => setSelectedIndex(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-yellow-400 text-2xl font-bold"
              >
                &times;
              </button>

              {/* Image with loading */}
              <div className="relative w-full h-64 bg-gray-800 flex items-center justify-center mb-4">
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                      className="animate-spin h-8 w-8 text-yellow-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                    </svg>
                  </div>
                )}
                <img
                  src={selectedPost.featuredImage}
                  alt={selectedPost.title}
                  className={`w-full h-full object-cover rounded-lg transition-opacity duration-500 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
                  onLoad={() => setImageLoaded(true)}
                />
              </div>

              <h3 className="text-yellow-400 text-2xl font-bold mb-2">{selectedPost.title}</h3>
              <p className="text-gray-400 mb-2">{selectedPost.date} • {selectedPost.category}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedPost.tags.map((tag, i) => (
                  <span key={i} className="text-xs bg-gray-700 text-yellow-400 px-2 py-1 rounded-full">{tag}</span>
                ))}
              </div>
              <p className="text-gray-300 mb-4">{selectedPost.content}</p>

              {/* Share Buttons */}
              <div className="flex gap-4 mt-4">
                <a href={`https://twitter.com/share?text=${selectedPost.title}`} target="_blank" className="text-yellow-400 hover:underline">
                  Twitter
                </a>
                <a href={`https://www.linkedin.com/shareArticle?mini=true&title=${selectedPost.title}`} target="_blank" className="text-yellow-400 hover:underline">
                  LinkedIn
                </a>
                {selectedPost.link && (
                  <a href={selectedPost.link} target="_blank" className="text-yellow-400 hover:underline">
                    Original
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default BlogSection;
