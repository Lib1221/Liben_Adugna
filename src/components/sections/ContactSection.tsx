import React, { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { FaEnvelope, FaPaperPlane, FaCheck, FaExclamationTriangle } from "react-icons/fa";
import { CalendarDays } from "lucide-react";
import SectionHeader from "../ui/SectionHeader";
import { contactConversion } from "../../data/siteContent";
import { trackEvent } from "../../utils/analytics";

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const web3FormsAccessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    if (!web3FormsAccessKey) {
      setErrorMessage("Contact form is not configured yet. Please email directly.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: web3FormsAccessKey,
          ...formData,
        }),
      });

      if (response.ok) {
        trackEvent("contact_submit_success");
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setErrorMessage("Failed to send message. Please try again or email directly.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage("Something went wrong while sending. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <FaEnvelope size={18} />,
      label: "Email",
      value: "libenadugna285@gmail.com",
      href: "mailto:libenadugna285@gmail.com",
    },
  ];

  return (
    <section>
      <SectionHeader
        as="h1"
        title="Get in"
        accent="Touch"
        subtitle="Open to ML/AI, full-stack, and product engineering collaborations."
      />

      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="modern-card border border-gray-800 p-5 mb-8"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-sm text-white font-semibold">Project Collaboration</p>
            <p className="text-xs text-gray-400 mt-1">{contactConversion.responseTime}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {contactConversion.acceptedProjects.map((projectType) => (
                <span key={projectType} className="px-2.5 py-1 text-xs rounded-full bg-dark-300 border border-gray-700 text-gray-300">
                  {projectType}
                </span>
              ))}
            </div>
          </div>
          <a
            href={contactConversion.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("contact_book_call_click")}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-yellow-500 text-black font-semibold rounded-xl hover:bg-yellow-400 transition-colors"
          >
            <CalendarDays size={16} />
            Book a Call
          </a>
        </div>
      </m.div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact Info */}
        <m.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          {contactInfo.map((info, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 bg-dark-300 border border-gray-800 rounded-xl"
            >
              <div className="p-3 bg-yellow-500/10 rounded-lg text-yellow-500">
                {info.icon}
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">
                  {info.label}
                </p>
                <a
                  href={info.href}
                  onClick={() => trackEvent("contact_email_click")}
                  className="text-white hover:text-yellow-500 transition-colors"
                >
                  {info.value}
                </a>
              </div>
            </div>
          ))}
        </m.div>

        {/* Contact Form */}
        <m.form
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="p-6 bg-dark-300 border border-gray-800 rounded-xl space-y-5"
        >
          {/* Success Message */}
          <AnimatePresence>
            {submitted && (
              <m.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-2 p-4 bg-green-500/10 border border-green-500/30 rounded-xl text-green-400"
              >
                <FaCheck />
                Message sent successfully!
              </m.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {errorMessage && (
              <m.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400"
              >
                <FaExclamationTriangle />
                {errorMessage}
              </m.div>
            )}
          </AnimatePresence>

          {/* Name */}
          <div>
            <label className="block text-xs text-gray-500 mb-2">Your Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-dark-200 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-yellow-500"
              placeholder="John Doe"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs text-gray-500 mb-2">Your Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-dark-200 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-yellow-500"
              placeholder="john@example.com"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-xs text-gray-500 mb-2">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-3 bg-dark-200 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-yellow-500 resize-none"
              placeholder="Your message..."
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            onClick={() => trackEvent("contact_submit_attempt")}
            className="w-full flex items-center justify-center gap-2 py-4 bg-yellow-500 text-black font-semibold rounded-xl hover:bg-yellow-400 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <FaPaperPlane />
                Send Message
              </>
            )}
          </button>
        </m.form>
      </div>
    </section>
  );
};

export default ContactSection;
