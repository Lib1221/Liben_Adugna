import React, { useState } from "react";
import { BookOpen, Briefcase, Award, Download, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ResumeSection: React.FC = () => {
  const [expandedExp, setExpandedExp] = useState<number | null>(null);

  const education = [
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
    {
      title: "Adama Science and Technology University",
      degree: "B.Sc. in Software Engineering",
      period: "Sep 2018 — Jun 2022",
      details: "Comprehensive program covering software development, data structures, algorithms, system design, and database systems.",
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

  const certifications = [
    {
      title: "Programming Fundamentals",
      issuer: "Udacity",
      description: "Learned core programming concepts, including variables, control structures, data structures, and problem-solving techniques.",
      skills: ["Programming Logic", "Python", "Algorithms"],
      link: "https://www.udacity.com/"
    },
    {
      title: "Data Analysis Fundamentals",
      issuer: "Udacity",
      description: "Acquired skills in collecting, cleaning, and analyzing data using Python, NumPy, and pandas to extract insights.",
      skills: ["Data Analysis", "Python", "NumPy", "pandas"],
      link: "https://www.udacity.com/certificate/e/1f7abfaa-309d-11f0-a6fd-832dd500790a"
    },
    {
      title: "Android Developer Fundamentals",
      issuer: "Udacity",
      description: "Developed Android applications using Java and Android Studio, focusing on layouts, activities, and UI navigation.",
      skills: ["Android", "Java", "Mobile Development"],
      link: "https://www.udacity.com/"
    },
    {
      title: "Artificial Intelligence Fundamentals",
      issuer: "Udacity",
      description: "Explored core AI principles such as search algorithms, machine learning, and neural networks with hands-on examples.",
      skills: ["Artificial Intelligence", "Machine Learning", "Python"],
      link: "https://www.udacity.com/"
    },
    {
      title: "AI and Career Empowerment",
      issuer: "University of Maryland – Robert H. Smith School of Business",
      description: "Developed AI literacy and professional growth strategies to navigate AI-driven career transformation and innovation.",
      skills: ["AI Literacy", "Career Development", "Leadership"],
      link: ""
    },
    {
      title: "Communication Skills: Acquire Effective Communication",
      issuer: "Udemy",
      description: "Improved verbal, written, and interpersonal communication skills for professional and team collaboration.",
      skills: ["Communication", "Interpersonal Skills", "Public Speaking"],
      link: "https://www.udemy.com/"
    },
    {
      title: "Professional Diploma in Leadership",
      issuer: "Udemy",
      description: "Enhanced leadership capabilities, emotional intelligence, and team motivation for organizational success.",
      skills: ["Leadership", "Team Management", "Decision Making"],
      link: "https://www.udemy.com/"
    },
    {
      title: "Strategic Thinking for Leaders and Managers",
      issuer: "Udemy",
      description: "Learned strategic planning, problem-solving, and organizational analysis to lead teams effectively.",
      skills: ["Strategic Thinking", "Leadership", "Planning"],
      link: "https://www.udemy.com/"
    },
    {
      title: "Lean Problem Solving: Creative Solutions for Teams and Leaders",
      issuer: "Udemy",
      description: "Mastered lean problem-solving tools and creative thinking techniques to enhance team performance and innovation.",
      skills: ["Problem Solving", "Lean Thinking", "Creativity"],
      link: "https://www.udemy.com/"
    },
    {
      title: "Dart & Flutter: The Ultimate Mobile App Development Course",
      issuer: "Udemy",
      description: "Learned Flutter app development, Dart programming, state management, and responsive UI design.",
      skills: ["Flutter", "Dart", "UI Design", "Mobile Apps"],
      link: "https://www.udemy.com/"
    },
    {
      title: "ALX AI Career Essentials",
      issuer: "ALX",
      description: "Gained foundational understanding of AI tools, prompt engineering, and career readiness for AI-driven industries.",
      skills: ["AI Tools", "Prompt Engineering", "Career Skills"],
      link: "https://intranet.alxswe.com/certificates/nryHeJML8T"
    },
  ];

  return (
    <section>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
      >
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            My <span className="text-yellow-500">Resume</span>
          </h2>
          <div className="w-16 h-1 bg-yellow-500 rounded" />
        </div>
        <a
          href="/resume.pdf"
          download
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-yellow-500 text-black font-semibold rounded-xl hover:bg-yellow-400 transition-colors"
        >
          <Download size={18} />
          Download CV
        </a>
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
        
        {education.map((edu: any, index) => (
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
            {edu.links && (
              <div className="flex gap-3 mt-2">
                {edu.links.map((link: any) => (
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
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-semibold text-white">{exp.role}</h4>
                  <p className="text-yellow-500 text-sm">{exp.company}</p>
                  <p className="text-gray-500 text-xs mt-1">{exp.period} • {exp.location}</p>
                </div>
                <button
                  onClick={() => setExpandedExp(expandedExp === index ? null : index)}
                  className="p-2 text-gray-500 hover:text-yellow-500 transition-colors"
                >
                  {expandedExp === index ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
              </div>
              
              <AnimatePresence>
                {expandedExp === index && (
                  <motion.ul
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mt-4 space-y-2 overflow-hidden"
                  >
                    {exp.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-400 text-sm">
                        <span className="w-1.5 h-1.5 mt-1.5 bg-yellow-500 rounded-full flex-shrink-0" />
                        {point}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
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
