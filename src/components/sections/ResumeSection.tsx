import React from "react";
import { BookOpen, Briefcase, Award, Download, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import SectionHeader from "../ui/SectionHeader";
import { trackEvent } from "../../utils/analytics";

const ResumeSection: React.FC = () => {
  const education = [
    {
      title: "Adama Science and Technology University",
      degree: "B.Sc. in Software Engineering",
      period: "Graduated 2022",
      details: "Software development, data structures and algorithms, system design, and database systems.",
    },
    {
      title: "Algorithms & Data Structures Training Program",
      degree: "Africa to Silicon Valley (A2SV)",
      period: "Jun 2024 — Jun 2025",
      details: "Solved 400+ problems (DP, graphs, optimization)",
      links: [
        { label: "LeetCode", url: "https://leetcode.com/libenadugna" },
        { label: "Codeforces", url: "https://codeforces.com/profile/Hehehc" },
      ],
    },
  ];

  const experience = [
    {
      role: "Freelance Machine Learning Engineer",
      company: "Remote",
      period: "Jul 2022 — Present",
      location: "Remote",
      points: [
        "Built NLP and analytics models (TF-IDF, clustering, ensemble) on 50,000+ records, improving prediction accuracy by ~18%.",
        "Developed Django REST APIs serving 5,000+ requests/month for scalable ML integration in web and mobile apps.",
        "Deployed full-stack web applications, reducing client data-processing time by ~40% through automation and optimized workflows.",
      ],
    },
    {
      role: "AI Systems Evaluator & Data Architecture Contributor",
      company: "Revelo",
      period: "Mar 2025 — Mar 2026",
      location: "Adama, Ethiopia",
      points: [
        "Evaluated AI outputs on 8 ML models for correctness, consistency, and reliability using structured validation metrics.",
        "Designed behavioral data schemas supporting training and evaluation of 4 AI systems.",
        "Reviewed pull requests and refined evaluation guidelines, improving system code quality and reproducibility.",
      ],
    },
    {
      role: "AI Model Evaluator & Training Specialist",
      company: "Afriwork (Turing)",
      period: "Mar 2024 — May 2025",
      location: "Remote",
      points: [
        "Evaluated model performance on MacroBenchmark tasks for correctness, reasoning quality, and reliability.",
        "Supported models in solving Kaggle-style machine learning problems, guiding approach quality and solution validity.",
        "Configured Databricks workflows for agent-based model training, including dataset preparation and experiment setup.",
        "Monitored agent training runs end-to-end and scored outputs using structured rubric-based evaluations.",
      ],
    },
    {
      role: "Full-Stack Software Engineer",
      company: "Faris Technology Private Limited",
      period: "Aug 2023 — Feb 2025",
      location: "Addis Ababa, Ethiopia",
      points: [
        "Developed full-stack web and Flutter mobile apps for 5+ clients, delivering real-time data updates and responsive interfaces.",
        "Designed and implemented REST APIs for user authentication, database integration, and dynamic workflows.",
        "Conducted debugging, code reviews, and edge-case testing, reducing platform errors by ~25% and improving reliability.",
      ],
    },
    {
      role: "Senior Technical Mentor – Machine Learning",
      company: "CSEC-ASTU",
      period: "Sep 2022 — Jun 2023",
      location: "Adama, Ethiopia",
      points: [
        "Mentored 40+ students in ML system design, evaluation, and deployment.",
        "Supervised 8+ ML projects covering NLP and anomaly detection.",
      ],
    },
  ];

  // Only entries with a verifiable link get a "View Certificate" button.
  const certifications = [
    {
      title: "Data Analysis Fundamentals",
      issuer: "Udacity",
      description: "Collecting, cleaning, and analyzing data with Python, NumPy, and pandas.",
      skills: ["Data Analysis", "Python", "NumPy", "pandas"],
      link: "https://www.udacity.com/certificate/e/1f7abfaa-309d-11f0-a6fd-832dd500790a",
    },
    {
      title: "ALX AI Career Essentials",
      issuer: "ALX",
      description: "AI tooling, prompt engineering, and applied workflows.",
      skills: ["AI Tools", "Prompt Engineering"],
      link: "https://intranet.alxswe.com/certificates/nryHeJML8T",
    },
    {
      title: "Artificial Intelligence Fundamentals",
      issuer: "Udacity",
      description: "Search algorithms, machine learning, and neural networks with hands-on examples.",
      skills: ["Artificial Intelligence", "Machine Learning", "Python"],
      link: "",
    },
    {
      title: "Android Developer Fundamentals",
      issuer: "Udacity",
      description: "Android applications with Java and Android Studio: layouts, activities, and navigation.",
      skills: ["Android", "Java", "Mobile Development"],
      link: "",
    },
    {
      title: "Programming Fundamentals",
      issuer: "Udacity",
      description: "Core programming concepts, data structures, and problem-solving techniques.",
      skills: ["Programming Logic", "Python", "Algorithms"],
      link: "",
    },
    {
      title: "Dart & Flutter: The Ultimate Mobile App Development Course",
      issuer: "Udemy",
      description: "Flutter app development, Dart, state management, and responsive UI design.",
      skills: ["Flutter", "Dart", "UI Design", "Mobile Apps"],
      link: "",
    },
  ];

  const timelineSummary = [
    { year: "2022", title: "B.Sc. Software Engineering (ASTU). Started freelance ML work and mentoring at CSEC-ASTU." },
    { year: "2023", title: "Full-stack engineer at Faris Technology: Django APIs and Flutter apps for 5+ clients." },
    { year: "2024", title: "A2SV algorithms program. AI model evaluation and Databricks training at Afriwork (Turing)." },
    { year: "2025", title: "AI systems evaluation and data architecture at Revelo. Smart Gebere released." },
  ];

  return (
    <section>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <SectionHeader title="My" accent="Resume" subtitle="Experience, education, and credentials with measurable outcomes." />
        <a
          href="/resume.pdf"
          download
          onClick={() => trackEvent("resume_download")}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-yellow-500 text-black font-semibold rounded-xl hover:bg-yellow-400 transition-colors"
        >
          <Download size={18} />
          Download CV
        </a>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="modern-card border border-gray-800 p-4 mb-8"
      >
        <p className="text-xs uppercase tracking-wider text-gray-500 mb-4">Career Timeline</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {timelineSummary.map((step) => (
            <div key={step.year} className="p-3 rounded-xl bg-dark-300 border border-gray-700">
              <p className="text-sm font-bold text-yellow-500">{step.year}</p>
              <p className="text-xs text-gray-300 mt-1">{step.title}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Education */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-10"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-yellow-500/10 rounded-lg">
            <BookOpen size={20} className="text-yellow-500" />
          </div>
          <h3 className="text-xl font-semibold text-white">Education</h3>
        </div>
        
        {education.map((edu, index) => (
          <div
            key={index}
            className="p-5 bg-dark-300 border border-gray-800 rounded-xl mb-4"
          >
            <h4 className="text-lg font-semibold text-white">{edu.title}</h4>
            <p className="text-yellow-500 text-sm mt-1">{edu.degree}</p>
            <p className="text-gray-500 text-sm mt-1">{edu.period}</p>
            {edu.details && (
              <p className="text-gray-400 text-sm mt-2">{edu.details}</p>
            )}
            {"links" in edu && edu.links && (
              <div className="flex gap-3 mt-2">
                {edu.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-yellow-500 hover:text-yellow-400 transition-colors"
                  >
                    <ExternalLink size={12} />
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </motion.div>

      {/* Experience */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-10"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-yellow-500/10 rounded-lg">
            <Briefcase size={20} className="text-yellow-500" />
          </div>
          <h3 className="text-xl font-semibold text-white">Experience</h3>
        </div>
        
        <div className="space-y-4">
          {experience.map((exp, index) => (
            <div
              key={index}
              className="p-5 bg-dark-300 border border-gray-800 rounded-xl"
            >
              <h4 className="text-lg font-semibold text-white">{exp.role}</h4>
              <p className="text-yellow-500 text-sm">{exp.company}</p>
              <p className="text-gray-500 text-xs mt-1">{exp.period} • {exp.location}</p>
              <ul className="mt-4 space-y-2">
                {exp.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-400 text-sm">
                    <span className="w-1.5 h-1.5 mt-1.5 bg-yellow-500 rounded-full flex-shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Certifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-yellow-500/10 rounded-lg">
            <Award size={20} className="text-yellow-500" />
          </div>
          <h3 className="text-xl font-semibold text-white">Certifications</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="p-5 bg-dark-300 border border-gray-800 rounded-xl hover:border-yellow-500/50 transition-colors group"
            >
              <div className="mb-2">
                <h4 className="font-semibold text-white group-hover:text-yellow-500 transition-colors">{cert.title}</h4>
                <p className="text-yellow-500 text-sm">{cert.issuer}</p>
              </div>
              <p className="text-gray-400 text-sm mb-3">{cert.description}</p>
              <div className="flex flex-wrap gap-1 mb-3">
                {cert.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-0.5 bg-dark-200 border border-gray-700 rounded text-xs text-gray-400"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              {cert.link && (
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-yellow-500 hover:text-yellow-400 transition-colors"
                >
                  <ExternalLink size={12} />
                  View Certificate
                </a>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default ResumeSection;
