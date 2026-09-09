import React, { useId, useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { FaCheck, FaExclamationTriangle } from "react-icons/fa";
import { CalendarDays, Mail, Send } from "lucide-react";
import SectionHeader from "../ui/SectionHeader";
import { contactConversion, availability } from "../../data/siteContent";
import { trackEvent } from "../../utils/analytics";

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const fieldId = useId();
  const web3FormsAccessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    if (!web3FormsAccessKey) {
      setErrorMessage("The form is not configured on this deployment. Email me directly and it will reach me.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ access_key: web3FormsAccessKey, ...formData }),
      });

      if (response.ok) {
        trackEvent("contact_submit_success");
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setSubmitted(false), 8000);
      } else {
        setErrorMessage("That did not send. Try again, or email me directly.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage("Something went wrong on the way out. Try again, or email me directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section>
      <SectionHeader
        as="h1"
        title="Contact"
        subtitle="Open to ML and AI engineering roles, evaluation work, and full-stack builds. Tell me what you are trying to ship and I will tell you honestly whether I am the right person."
      />

      <div className="grid gap-12 md:grid-cols-[1fr_18rem] md:gap-14">
        {/* Form leads: it is the action the page exists for. */}
        <m.form
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <AnimatePresence>
            {submitted && (
              <m.p
                key="ok"
                role="status"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="flex items-center gap-2 rounded-lg border border-live/30 bg-live/[0.08] p-3 text-sm text-live"
              >
                <FaCheck size={13} aria-hidden="true" />
                Sent. I reply within a day, usually sooner.
              </m.p>
            )}
            {errorMessage && (
              <m.p
                key="err"
                role="alert"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="flex items-start gap-2 rounded-lg border border-red-500/30 bg-red-500/[0.08] p-3 text-sm text-red-400"
              >
                <FaExclamationTriangle size={13} className="mt-0.5 shrink-0" aria-hidden="true" />
                {errorMessage}
              </m.p>
            )}
          </AnimatePresence>

          <Field id={`${fieldId}-name`} label="Name">
            <input
              id={`${fieldId}-name`}
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              autoComplete="name"
              className={inputClass}
            />
          </Field>

          <Field id={`${fieldId}-email`} label="Email">
            <input
              id={`${fieldId}-email`}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
              className={inputClass}
            />
          </Field>

          <Field
            id={`${fieldId}-message`}
            label="Message"
            hint="What are you building, and what is currently in the way?"
          >
            <textarea
              id={`${fieldId}-message`}
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className={`${inputClass} resize-y`}
            />
          </Field>

          <button
            type="submit"
            disabled={isSubmitting}
            onClick={() => trackEvent("contact_submit_attempt")}
            className="inline-flex items-center gap-2 rounded-lg bg-yellow-500 px-5 py-2.5 font-semibold text-black transition-colors hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/25 border-t-black" aria-hidden="true" />
                Sending
              </>
            ) : (
              <>
                <Send size={15} aria-hidden="true" />
                Send message
              </>
            )}
          </button>
        </m.form>

        <m.aside
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-8 text-[14px]"
        >
          <div>
            <p className="eyebrow mb-3">Direct</p>
            <a
              href="mailto:libenadugna285@gmail.com"
              onClick={() => trackEvent("contact_email_click")}
              className="inline-flex items-center gap-2 text-gray-200 transition-colors hover:text-yellow-500"
            >
              <Mail size={15} aria-hidden="true" />
              libenadugna285@gmail.com
            </a>
            <p className="mt-2 text-[13px] text-gray-500">{contactConversion.responseTime}.</p>
            <p className="mt-1 text-[13px] text-gray-500">{availability.location}.</p>
          </div>

          <div>
            <p className="eyebrow mb-3">Rather talk</p>
            <a
              href={contactConversion.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("contact_book_call_click")}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-700 px-4 py-2 text-gray-200 transition-colors hover:border-yellow-500 hover:text-yellow-500"
            >
              <CalendarDays size={15} aria-hidden="true" />
              Book 30 minutes
            </a>
          </div>

          <div>
            <p className="eyebrow mb-3">Work I take on</p>
            <ul className="space-y-2 text-gray-400">
              {contactConversion.acceptedProjects.map((projectType) => (
                <li key={projectType} className="flex gap-2.5">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-yellow-500" aria-hidden="true" />
                  {projectType}
                </li>
              ))}
            </ul>
          </div>
        </m.aside>
      </div>
    </section>
  );
};

const inputClass =
  "w-full rounded-lg border border-gray-800 bg-dark-400 px-3.5 py-2.5 text-[15px] text-white transition-colors focus:border-yellow-500 focus:outline-none";

/** Labels are bound to their control, which the previous version's bare <label> was not. */
const Field: React.FC<{ id: string; label: string; hint?: string; children: React.ReactNode }> = ({
  id,
  label,
  hint,
  children,
}) => (
  <div>
    <label htmlFor={id} className="mb-2 block text-[13px] font-medium text-gray-300">
      {label}
    </label>
    {hint && <p className="mb-2 text-[13px] text-gray-500">{hint}</p>}
    {children}
  </div>
);

export default ContactSection;
