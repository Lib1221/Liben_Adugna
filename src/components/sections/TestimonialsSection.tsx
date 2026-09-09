import React from "react";
import { m } from "framer-motion";
import { FaLinkedin } from "react-icons/fa";
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
    content:
      "Liben demonstrated exceptional skills during his time at Faris Technology. His work on full-stack development, REST APIs, and mobile applications significantly improved our delivery for clients. He brings a strong foundation in both engineering and problem-solving.",
    linkedin: "https://et.linkedin.com/in/elias-yirdaw-54318217b",
  },
  {
    id: 2,
    name: "Abel Bela",
    role: "AI Systems Lead",
    company: "",
    content:
      "Working with Liben on AI systems evaluation was a pleasure. His attention to detail in reviewing code and evaluating AI outputs for correctness and consistency greatly contributed to our quality standards. He brings both technical depth and clear communication.",
    linkedin: "",
  },
];

/**
 * Pull quotes, not testimonial cards. The initial-in-a-gold-circle avatar is the single most
 * recognisable template component on the web; the quote and the attribution are the content.
 */
const TestimonialsSection: React.FC = () => (
  <section>
    <SectionHeader eyebrow="06 / References" title="People I have worked for" />

    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      {testimonials.map((t, idx) => (
        <m.figure
          key={t.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="m-0 border-l-2 border-yellow-500/40 pl-5"
        >
          <blockquote className="text-[15px] leading-relaxed text-gray-300">{t.content}</blockquote>
          <figcaption className="mt-4 text-[13px]">
            <span className="font-semibold text-white">{t.name}</span>
            {t.linkedin && (
              <a
                href={t.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 inline-flex translate-y-0.5 text-gray-500 transition-colors hover:text-yellow-500"
                aria-label={`${t.name} on LinkedIn`}
              >
                <FaLinkedin size={13} aria-hidden="true" />
              </a>
            )}
            <span className="mt-0.5 block text-gray-500">{t.company ? `${t.role}, ${t.company}` : t.role}</span>
          </figcaption>
        </m.figure>
      ))}
    </div>
  </section>
);

export default TestimonialsSection;
