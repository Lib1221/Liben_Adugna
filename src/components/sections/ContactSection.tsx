import React, { useState } from "react";
import { motion } from "framer-motion";

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);

  // 🟡 Default location → Adama, Ethiopia
  const adamaMapUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3930.590941058!2d39.2713!3d8.5406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b1f8d8fdf19e3%3A0x7a0dce81f523e80!2sAdama%2C%20Ethiopia!5e0!3m2!1sen!2set!4v1690000000000!5m2!1sen!2set";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section className="mt-1 max-w-3xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl md:text-5xl font-bold text-white"
      >
        Contact Me
      </motion.h1>

      {/* Accent Line */}
      <div className="h-1 w-20 bg-yellow-400 rounded mt-3 mb-6"></div>

      {/* 🗺️ Map Section with Loading State */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative rounded-xl overflow-hidden shadow-lg mb-8"
      >
        {!mapLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#111] text-yellow-400">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-yellow-400 border-solid"></div>
            <span className="ml-3 font-semibold">Loading map...</span>
          </div>
        )}

        <iframe
          title="Adama, Ethiopia"
          src={adamaMapUrl}
          className="w-full h-64 md:h-96"
          loading="lazy"
          onLoad={() => setMapLoaded(true)}
        ></iframe>
      </motion.div>

      {/* ✉️ Contact Form */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        onSubmit={handleSubmit}
        className="bg-[#1f1f1f] rounded-xl p-8 shadow-2xl flex flex-col gap-4"
      >
        {submitted && (
          <div className="text-yellow-400 font-semibold text-center">
            ✅ Thank you! Your message has been sent.
          </div>
        )}

        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:border-yellow-400"
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:border-yellow-400"
        />

        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          rows={6}
          required
          className="w-full p-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:border-yellow-400"
        />

        <button
          type="submit"
          className="mt-4 px-6 py-3 bg-yellow-400 text-black font-semibold rounded-full hover:bg-yellow-300 transition-all"
        >
          Send Message
        </button>
      </motion.form>
    </section>
  );
};

export default ContactSection;
