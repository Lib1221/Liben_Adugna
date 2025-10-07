import React, { useState } from "react";
import { motion } from "framer-motion";

interface BlogPost {
  title: string;
  summary: string;
  category: string;
  date: string;
  link?: string;
}

const blogPosts: BlogPost[] = [
  {
    title: "Building a Chat App with Flutter & Firebase",
    summary: "Step-by-step guide to building a real-time chat app using Flutter and Firebase.",
    category: "Mobile",
    date: "2025-08-10",
    link: "#",
  },
  {
    title: "Optimizing Node.js APIs for High Performance",
    summary: "Tips and techniques to make your Node.js backend faster and more scalable.",
    category: "Backend",
    date: "2025-07-22",
    link: "#",
  },
  {
    title: "Fullstack E-commerce with React & Express",
    summary: "How to build a full-featured e-commerce platform using React, Express, and MongoDB.",
    category: "Fullstack",
    date: "2025-06-15",
    link: "#",
  },
  {
    title: "Designing Modern UI/UX for Mobile Apps",
    summary: "Principles and practical tips for creating intuitive, modern UI/UX designs.",
    category: "UI/UX",
    date: "2025-05-30",
    link: "#",
  },
];

const categories = ["All", "Mobile", "Fullstack", "Backend", "UI/UX"];

const BlogSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts = activeCategory === "All"
    ? blogPosts
    : blogPosts.filter(post => post.category === activeCategory);

  return (
    <section className="mt-12">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Blog</h2>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        {categories.map(cat => (
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

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPosts.map((post, idx) => (
          <motion.div
            key={post.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-6 bg-[#1f1f1f] rounded-xl shadow-lg hover:shadow-xl transition-transform hover:-translate-y-1"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-400">{post.date}</span>
              <span className="text-sm text-yellow-400 font-semibold">{post.category}</span>
            </div>
            <h3 className="text-white font-semibold text-xl">{post.title}</h3>
            <p className="text-gray-400 mt-2">{post.summary}</p>
            {post.link && (
              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-yellow-400 hover:underline"
              >
                Read More
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default BlogSection;
