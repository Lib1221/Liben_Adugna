import React, { useState } from "react";
import { BookOpen, Briefcase, Award, Download, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ResumeSection: React.FC = () => {
  const [expandedExp, setExpandedExp] = useState<number | null>(null);

  const education = [
    {
      title: "Adama Science and Technology University",
      degree: "Bachelor's degree, Computer Software Engineering",
      period: "2023 — 2027",
    },
  ];

  const experience = [
    {
      role: "Member",
      company: "CSEC-ASTU",
      period: "Feb, 2025 — Present",
      location: "Adama, Ethiopia",
      points: [
        "Actively participated in community-based technical discussions and events.",
        "Collaborated with peers to organize workshops and tech awareness programs.",
        "Contributed to the software and research club initiatives within the university.",
      ],
    },
    {
      role: "Intern",
      company: "Faris Technology Private Limited",
      period: "Jun, 2025 — Sep, 2025",
      location: "Addis Ababa, Ethiopia",
      points: [
        "Worked on software development tasks using Flutter and Firebase.",
        "Contributed to UI/UX improvements and code refactoring for mobile app modules.",
        "Collaborated with senior developers to implement REST APIs.",
      ],
    },
    {
      role: "Student Member",
      company: "A2SV | Africa to Silicon Valley",
      period: "Jan, 2025 — Aug, 2025",
      location: "Adama, Ethiopia",
      points: [
        "Engaged in advanced problem-solving and algorithmic training sessions.",
        "Developed teamwork and leadership skills through collaborative projects.",
        "Enhanced coding proficiency in data structures and algorithms.",
      ],
    },
  ];

  const certifications = [
    {
      title: "Programming Fundamentals",
      issuer: "Udacity",
      date: "Jan 2023",
      description: "Learned core programming concepts, including variables, control structures, data structures, and problem-solving techniques.",
      skills: ["Programming Logic", "Python", "Algorithms"],
      link: "https://www.udacity.com/"
    },
    {
      title: "Data Analysis Fundamentals",
      issuer: "Udacity",
      date: "Mar 2023",
      description: "Acquired skills in collecting, cleaning, and analyzing data using Python, NumPy, and pandas to extract insights.",
      skills: ["Data Analysis", "Python", "NumPy", "pandas"],
      link: "https://www.udacity.com/certificate/e/1f7abfaa-309d-11f0-a6fd-832dd500790a"
    },
    {
      title: "Android Developer Fundamentals",
      issuer: "Udacity",
      date: "May 2023",
      description: "Developed Android applications using Java and Android Studio, focusing on layouts, activities, and UI navigation.",
      skills: ["Android", "Java", "Mobile Development"],
      link: "https://www.udacity.com/"
    },
    {
      title: "Artificial Intelligence Fundamentals",
      issuer: "Udacity",
      date: "Jul 2023",
      description: "Explored core AI principles such as search algorithms, machine learning, and neural networks with hands-on examples.",
      skills: ["Artificial Intelligence", "Machine Learning", "Python"],
      link: "https://www.udacity.com/"
    },
    {
      title: "AI and Career Empowerment",
      issuer: "University of Maryland – Robert H. Smith School of Business",
      date: "Sep 2023",
      description: "Developed AI literacy and professional growth strategies to navigate AI-driven career transformation and innovation.",
      skills: ["AI Literacy", "Career Development", "Leadership"],
      link: ""
    },
    {
      title: "Communication Skills: Acquire Effective Communication",
      issuer: "Udemy",
      date: "Nov 2023",
      description: "Improved verbal, written, and interpersonal communication skills for professional and team collaboration.",
      skills: ["Communication", "Interpersonal Skills", "Public Speaking"],
      link: "https://www.udemy.com/"
    },
    {
      title: "Professional Diploma in Leadership",
      issuer: "Udemy",
      date: "Jan 2024",
      description: "Enhanced leadership capabilities, emotional intelligence, and team motivation for organizational success.",
      skills: ["Leadership", "Team Management", "Decision Making"],
      link: "https://www.udemy.com/"
    },
    {
      title: "Strategic Thinking for Leaders and Managers",
      issuer: "Udemy",
      date: "Mar 2024",
      description: "Learned strategic planning, problem-solving, and organizational analysis to lead teams effectively.",
      skills: ["Strategic Thinking", "Leadership", "Planning"],
      link: "https://www.udemy.com/"
    },
    {
      title: "Lean Problem Solving: Creative Solutions for Teams and Leaders",
      issuer: "Udemy",
      date: "May 2024",
      description: "Mastered lean problem-solving tools and creative thinking techniques to enhance team performance and innovation.",
      skills: ["Problem Solving", "Lean Thinking", "Creativity"],
      link: "https://www.udemy.com/"
    },
    {
      title: "Dart & Flutter: The Ultimate Mobile App Development Course",
      issuer: "Udemy",
      date: "Oct 2025",
      description: "Learned Flutter app development, Dart programming, state management, and responsive UI design.",
      skills: ["Flutter", "Dart", "UI Design", "Mobile Apps"],
      link: "https://www.udemy.com/"
    },
    {
      title: "ALX AI Career Essentials",
      issuer: "ALX",
      date: "Dec 2024",
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
        
        {education.map((edu, index) => (
          <div
            key={index}
            className="p-5 bg-dark-300 border border-gray-800 rounded-xl"
          >
            <h4 className="text-lg font-semibold text-white">{edu.title}</h4>
            <p className="text-yellow-500 text-sm mt-1">{edu.degree}</p>
            <p className="text-gray-500 text-sm mt-1">{edu.period}</p>
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
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-semibold text-white group-hover:text-yellow-500 transition-colors">{cert.title}</h4>
                  <p className="text-yellow-500 text-sm">{cert.issuer}</p>
                </div>
                <span className="text-gray-500 text-xs">{cert.date}</span>
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
