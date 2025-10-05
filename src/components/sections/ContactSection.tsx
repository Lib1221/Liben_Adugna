import React, { useState } from "react";
import { motion } from "framer-motion";

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

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
    <section className="mt-12 max-w-3xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">Contact Me</h2>

      {/* Map on Top */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="rounded-xl overflow-hidden border-2 border-yellow-400 shadow-lg mb-8"
      >
        <iframe
          title="Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.123456789!2d85.3240!3d27.7172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb190c1234567%3A0xabcdef1234567!2sKathmandu!5e0!3m2!1sen!2snp!4v169XXXXXX"
          className="w-full h-64 md:h-96"
          loading="lazy"
        ></iframe>
      </motion.div>

      {/* Contact Form Below */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        onSubmit={handleSubmit}
        className="bg-[#1f1f1f] rounded-xl p-8 shadow-2xl border-2 border-yellow-400 flex flex-col gap-4"
      >
        {submitted && (
          <div className="text-green-400 font-semibold text-center">
            Thank you! Your message has been sent.
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
