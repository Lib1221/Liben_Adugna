import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaQuoteLeft, FaChevronLeft, FaChevronRight, FaStar, FaLinkedin } from "react-icons/fa";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  linkedin?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Elias Yirdaw",
    role: "CEO",
    company: "Faris Technology Private Limited",
    content: "Liben demonstrated exceptional skills during his time at Faris Technology. His work on full-stack development, REST APIs, and mobile applications significantly improved our delivery for clients. He brings a strong foundation in both engineering and problem-solving.",
    rating: 5,
    linkedin: "https://et.linkedin.com/in/elias-yirdaw-54318217b",
  },
  {
    id: 2,
    name: "Frederic Monnier",
    role: "AI Systems Lead",
    company: "Revelo",
    content: "Working with Liben on AI systems evaluation was a pleasure. His attention to detail in reviewing code and evaluating AI outputs for correctness and consistency greatly contributed to our quality standards. He brings both technical depth and clear communication.",
    rating: 5,
    linkedin: "https://www.linkedin.com/in/fredericmonnier34090/",
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
          Professional <span className="text-yellow-500">References</span>
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
              <div className="w-12 h-12 rounded-full bg-yellow-500/10 border-2 border-yellow-500 flex items-center justify-center flex-shrink-0">
                <span className="text-yellow-500 font-bold text-lg">
                  {testimonials[currentIndex].name.charAt(0)}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-white">
                    {testimonials[currentIndex].name}
                  </h4>
                  {testimonials[currentIndex].linkedin && (
                    <a
                      href={testimonials[currentIndex].linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                      aria-label="LinkedIn Profile"
                    >
                      <FaLinkedin size={16} />
                    </a>
                  )}
                </div>
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
