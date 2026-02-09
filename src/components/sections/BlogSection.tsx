import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X } from "lucide-react";

interface BlogPost {
  title: string;
  summary: string;
  category: string;
  date: string;
  featuredImage: string;
  link: string;
  tags: string[];
}

const blogPosts: BlogPost[] = [
  {
    title: "Connecting Flutter Frontend with Django Backend",
    summary: "Learn how to integrate your Flutter app with a Django backend for full-stack development.",
    category: "Mobile",
    date: "Oct 2025",
    featuredImage: "https://res.cloudinary.com/dkiuz3gfn/image/upload/v1759958313/0_lsdQqPVDMNQxIUM__bvi72n.webp",
    link: "https://medium.com/@adugnaliben65/connecting-flutter-frontend-with-django-backend-a-complete-guide-52a75fcc6c94",
    tags: ["Flutter", "Django", "Fullstack"],
  },
  {
    title: "The Unmatched Importance of Python",
    summary: "Explore why Python remains one of the most powerful and versatile programming languages today.",
    category: "Backend",
    date: "Sep 2025",
    featuredImage: "https://res.cloudinary.com/dkiuz3gfn/image/upload/v1759958499/0_KsGIANg1sUp_OSOQ_jqr764.webp",
    link: "https://medium.com/@adugnaliben65/the-unmatched-importance-of-python-unlocking-the-power-of-modern-programming-6660dc19c46b",
    tags: ["Python", "Programming"],
  },
  {
    title: "Optimizing UI Performance in Flutter",
    summary: "Improve your Flutter app performance with simple UI/UX optimization tips.",
    category: "Mobile",
    date: "Aug 2025",
    featuredImage: "https://res.cloudinary.com/dkiuz3gfn/image/upload/v1759958315/0_Rdbw_vzDDIKKuP1e_opvbpc.webp",
    link: "https://medium.com/@adugnaliben65/optimizing-ui-performance-in-flutter-simple-tips-for-better-apps-a8835ef3677a",
    tags: ["Flutter", "Performance"],
  },
];

const BlogSection: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [loadedImages, setLoadedImages] = useState<{ [key: number]: boolean }>({});

  return (
    <section>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
          My <span className="text-yellow-500">Blog</span>
        </h2>
        <div className="w-16 h-1 bg-yellow-500 rounded" />
      </motion.div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post, index) => (
          <motion.article
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
          </motion.article>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPost(null)}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          >
            <motion.div
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
                    className="p-3 bg-dark-300 border border-gray-700 rounded-xl text-gray-400 hover:text-white hover:border-gray-600 transition-all"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default BlogSection;
