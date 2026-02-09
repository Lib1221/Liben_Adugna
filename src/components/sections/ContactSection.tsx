import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaPaperPlane, FaCheck } from "react-icons/fa";

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "b27b65dd-5c8b-414e-acfe-1d32aa1f1b48",
          ...formData,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <FaEnvelope size={18} />,
      label: "Email",
      value: "adugnaliben65@gmail.com",
      href: "mailto:adugnaliben65@gmail.com",
    },
    {
      icon: <FaPhoneAlt size={18} />,
      label: "Phone",
      value: "+251 906169046",
      href: "tel:+251906169046",
    },
    {
      icon: <FaMapMarkerAlt size={18} />,
      label: "Location",
      value: "Adama, Ethiopia",
      href: null,
    },
  ];

  return (
    <section>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Get in <span className="text-yellow-500">Touch</span>
        </h2>
        <div className="w-16 h-1 bg-yellow-500 rounded" />
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact Info */}
        <motion.div
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
                <p className="text-xs text-gray-500 uppercase tracking-wider">{info.label}</p>
                {info.href ? (
                  <a href={info.href} className="text-white hover:text-yellow-500 transition-colors">
                    {info.value}
                  </a>
                ) : (
                  <p className="text-white">{info.value}</p>
                )}
              </div>
            </div>
          ))}

          {/* Map */}
          <div className="rounded-xl overflow-hidden border border-gray-800">
            <iframe
              title="Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126115.65567394784!2d38.99138715820312!3d8.547159100000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b1f3e12c0a0c1%3A0x49e0e4a5a9c5e0f9!2sAdama%2C%20Ethiopia!5e0!3m2!1sen!2sus!4v1680000000000!5m2!1sen!2sus"
              width="100%"
              height="200"
              style={{ border: 0, filter: "grayscale(1) invert(1)" }}
              allowFullScreen
              loading="lazy"
            />
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="p-6 bg-dark-300 border border-gray-800 rounded-xl space-y-5"
        >
          {/* Success Message */}
          <AnimatePresence>
            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-2 p-4 bg-green-500/10 border border-green-500/30 rounded-xl text-green-400"
              >
                <FaCheck />
                Message sent successfully!
              </motion.div>
            )}
          </AnimatePresence>

          {/* Name */}
          <div>
            <label className="block text-xs text-gray-500 uppercase tracking-wider mb-2">
              Your Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-dark-200 border border-gray-700 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-yellow-500 transition-colors"
              placeholder="John Doe"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs text-gray-500 uppercase tracking-wider mb-2">
              Your Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-dark-200 border border-gray-700 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-yellow-500 transition-colors"
              placeholder="john@example.com"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-xs text-gray-500 uppercase tracking-wider mb-2">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-3 bg-dark-200 border border-gray-700 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-yellow-500 transition-colors resize-none"
              placeholder="Your message..."
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 py-4 bg-yellow-500 text-black font-semibold rounded-xl hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
        </motion.form>
      </div>
    </section>
  );
};

export default ContactSection;
