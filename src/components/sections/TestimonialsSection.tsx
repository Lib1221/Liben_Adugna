import React from "react";
import { m } from "framer-motion";
import { FaQuoteLeft, FaLinkedin } from "react-icons/fa";
import SectionHeader from "../ui/SectionHeader";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  linkedin?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Elias Yirdaw",
    role: "CEO",
    company: "Faris Technology Private Limited",
    content: "Liben demonstrated exceptional skills during his time at Faris Technology. His work on full-stack development, REST APIs, and mobile applications significantly improved our delivery for clients. He brings a strong foundation in both engineering and problem-solving.",
    linkedin: "https://et.linkedin.com/in/elias-yirdaw-54318217b",
  },
  {
    id: 2,
    name: "Abel Bela",
    role: "AI Systems Lead",
    company: "",
    content: "Working with Liben on AI systems evaluation was a pleasure. His attention to detail in reviewing code and evaluating AI outputs for correctness and consistency greatly contributed to our quality standards. He brings both technical depth and clear communication.",
    linkedin: "",
  },
];

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-6">
      <SectionHeader title="Professional" accent="References" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {testimonials.map((t, idx) => (
          <m.div
            key={t.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.12 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="relative modern-card border border-gray-800 rounded-2xl p-6 flex flex-col gap-4
              hover:border-yellow-500/40 hover:shadow-lg hover:shadow-yellow-500/10 transition-all duration-300"
          >
            {/* Subtle top gradient */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent rounded-t-2xl" />

            {/* Quote icon */}
            <FaQuoteLeft className="text-yellow-500/20 text-3xl" />

            {/* Content */}
            <p className="text-gray-300 text-sm leading-relaxed flex-1">
              "{t.content}"
            </p>

            {/* Divider */}
            <div className="h-px bg-gray-800" />

            {/* Author */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-yellow-500/10 border-2 border-yellow-500/40
                flex items-center justify-center flex-shrink-0">
                <span className="text-yellow-500 font-bold text-base">
                  {t.name.charAt(0)}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white text-sm">{t.name}</span>
                  {t.linkedin && (
                    <a
                      href={t.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                      aria-label="LinkedIn Profile"
                    >
                      <FaLinkedin size={14} />
                    </a>
                  )}
                </div>
                <p className="text-xs text-gray-500 truncate">
                  {t.company ? `${t.role} · ${t.company}` : t.role}
                </p>
              </div>
            </div>
          </m.div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
