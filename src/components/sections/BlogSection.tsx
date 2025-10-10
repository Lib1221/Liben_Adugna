import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    title: "Connecting Flutter Frontend with Django Backend: A Complete Guide",
    summary: "Learn how to integrate your Flutter app with a Django backend for full-stack development.",
    category: "Mobile / Backend",
    date: "Oct 2025",
    featuredImage: "https://res.cloudinary.com/dkiuz3gfn/image/upload/v1759958313/0_lsdQqPVDMNQxIUM__bvi72n.webp",
    link: "https://medium.com/@adugnaliben65/connecting-flutter-frontend-with-django-backend-a-complete-guide-52a75fcc6c94",
    tags: ["Flutter", "Django", "Fullstack"],
  },
  {
    title: "The Unmatched Importance of Python: Unlocking the Power of Modern Programming",
    summary: "Explore why Python remains one of the most powerful and versatile programming languages today.",
    category: "Backend",
    date: "Sep 2025",
    featuredImage: "https://res.cloudinary.com/dkiuz3gfn/image/upload/v1759958499/0_KsGIANg1sUp_OSOQ_jqr764.webp",
    link: "https://medium.com/@adugnaliben65/the-unmatched-importance-of-python-unlocking-the-power-of-modern-programming-6660dc19c46b",
    tags: ["Python", "Programming", "Backend"],
  },
  {
    title: "Optimizing UI Performance in Flutter: Simple Tips for Better Apps",
    summary: "Improve your Flutter app performance with simple UI/UX optimization tips for smoother apps.",
    category: "Mobile / UI",
    date: "Aug 2025",
    featuredImage: "https://res.cloudinary.com/dkiuz3gfn/image/upload/v1759958315/0_Rdbw_vzDDIKKuP1e_opvbpc.webp",
    link: "https://medium.com/@adugnaliben65/optimizing-ui-performance-in-flutter-simple-tips-for-better-apps-a8835ef3677a",
    tags: ["Flutter", "UI", "Performance"],
  },
];

const categories = ["All", "Mobile", "Backend", "UI"];

const BlogSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Use a map to track each card's loaded state separately
  const [loadedImages, setLoadedImages] = useState<{ [key: number]: boolean }>({});
  const [modalImageLoaded, setModalImageLoaded] = useState(false);

  const filteredPosts =
    activeCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category.includes(activeCategory));

  const selectedPost = selectedIndex !== null ? blogPosts[selectedIndex] : null;

  const handleCardClick = (index: number) => {
    setSelectedIndex(index);
    setModalImageLoaded(false); // Reset modal image loader
  };

  const handleCloseModal = () => {
    setSelectedIndex(null);
    setModalImageLoaded(false);
  };

  return (
    <section className="mt-1 relative z-0">
      <motion.h1
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl md:text-5xl font-bold text-white"
      >
        Blog
      </motion.h1>

      {/* Accent Line */}
      <div className="h-1 w-10 bg-yellow-400 rounded mt-3 mb-6"></div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-4 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`px-4 py-2 rounded-full font-semibold transition-all duration-300
              ${activeCategory === cat
                ? "bg-yellow-400 text-black"
                : "bg-gray-800 text-gray-300 hover:bg-yellow-400 hover:text-black"
              }`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredPosts.map((post, idx) => (
          <motion.div
            key={post.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-transform duration-300"
            onClick={() => handleCardClick(blogPosts.indexOf(post))}
          >
            {/* Card Image */}
            <div className="relative w-full h-48 bg-gray-700 flex items-center justify-center">
              {!loadedImages[idx] && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg
                    className="animate-spin h-8 w-8 text-yellow-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"></circle>
                    <path fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" className="opacity-75"></path>
                  </svg>
                </div>
              )}
              <img
                src={post.featuredImage}
                alt={post.title}
                className={`w-full h-full object-cover transition-opacity duration-500 ${
                  loadedImages[idx] ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() =>
                  setLoadedImages((prev) => ({ ...prev, [idx]: true }))
                }
              />
            </div>

            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-400">{post.date}</span>
                <span className="text-sm text-yellow-400 font-semibold">{post.category}</span>
              </div>
              <h3 className="text-white font-bold text-lg">{post.title}</h3>
              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block px-4 py-2 bg-yellow-400 text-black font-semibold rounded-xl hover:bg-yellow-300 transition"
              >
                Read on Medium
              </a>
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
            onClick={handleCloseModal}
          >
            <motion.div
              className="bg-gray-900 rounded-2xl w-full max-w-3xl p-6 relative overflow-y-auto max-h-[90vh]"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 text-gray-400 hover:text-yellow-400 text-2xl font-bold"
              >
                &times;
              </button>

              <div className="relative w-full h-64 bg-gray-800 flex items-center justify-center mb-4">
                {!modalImageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                      className="animate-spin h-8 w-8 text-yellow-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"></circle>
                      <path fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" className="opacity-75"></path>
                    </svg>
                  </div>
                )}
                <img
                  src={selectedPost.featuredImage}
                  alt={selectedPost.title}
                  className={`w-full h-full object-cover rounded-lg transition-opacity duration-500 ${
                    modalImageLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  onLoad={() => setModalImageLoaded(true)}
                />
              </div>

              <h3 className="text-yellow-400 text-2xl font-bold mb-2">{selectedPost.title}</h3>
              <p className="text-gray-400 mb-2">{selectedPost.date} • {selectedPost.category}</p>
              <p className="text-gray-400 mt-2 text-sm">{selectedPost.summary}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedPost.tags.map((tag, i) => (
                  <span key={i} className="text-xs bg-gray-700 text-yellow-400 px-2 py-1 rounded-full">{tag}</span>
                ))}
              </div>
              <a
                href={selectedPost.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 bg-yellow-400 text-black font-semibold rounded-xl hover:bg-yellow-300 transition"
              >
                Read Full on Medium
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default BlogSection;
