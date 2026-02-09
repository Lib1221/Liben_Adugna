import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaQuoteLeft, FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  content: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Product Manager",
    company: "TechStart Inc.",
    image: "https://randomuser.me/api/portraits/women/32.jpg",
    content: "Liben delivered an exceptional mobile app that exceeded our expectations. His attention to detail and understanding of user experience made our product stand out in the market.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "CTO",
    company: "DataFlow Systems",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    content: "Working with Liben on our ML pipeline was a great experience. He brought innovative solutions and delivered on time. His expertise in both development and data science is rare.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Roberts",
    role: "Founder",
    company: "GreenTech Solutions",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    content: "Liben transformed our outdated web platform into a modern, responsive application. His full-stack skills and communication throughout the project were outstanding.",
    rating: 5,
  },
];

const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-10">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-white">
          Client <span className="text-yellow-500">Testimonials</span>
        </h2>
        <div className="flex gap-2">
          <button
            onClick={prevTestimonial}
            className="p-2 bg-dark-300 border border-gray-700 rounded-lg text-gray-400 hover:text-yellow-500 hover:border-yellow-500 transition-all"
            aria-label="Previous testimonial"
          >
            <FaChevronLeft size={16} />
          </button>
          <button
            onClick={nextTestimonial}
            className="p-2 bg-dark-300 border border-gray-700 rounded-lg text-gray-400 hover:text-yellow-500 hover:border-yellow-500 transition-all"
            aria-label="Next testimonial"
          >
            <FaChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="bg-dark-300 border border-gray-800 rounded-2xl p-6 md:p-8"
          >
            {/* Quote icon */}
            <FaQuoteLeft className="text-yellow-500/20 text-4xl mb-4" />

            {/* Content */}
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              "{testimonials[currentIndex].content}"
            </p>

            {/* Rating */}
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={i < testimonials[currentIndex].rating ? "text-yellow-500" : "text-gray-700"}
                  size={16}
                />
              ))}
            </div>

            {/* Author */}
            <div className="flex items-center gap-4">
              <img
                src={testimonials[currentIndex].image}
                alt={testimonials[currentIndex].name}
                loading="lazy"
                className="w-12 h-12 rounded-full object-cover border-2 border-yellow-500"
              />
              <div>
                <h4 className="font-semibold text-white">
                  {testimonials[currentIndex].name}
                </h4>
                <p className="text-sm text-gray-500">
                  {testimonials[currentIndex].role} at {testimonials[currentIndex].company}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex
                ? "bg-yellow-500 w-6"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
