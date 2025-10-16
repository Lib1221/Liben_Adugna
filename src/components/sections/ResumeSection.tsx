import React from "react";
import { BookOpen, Briefcase } from "lucide-react";

const ResumeSection: React.FC = () => {
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
      period: "Feb, 2025 — Present  •  8 mos",
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
      period: "Jun, 2025 — Sep, 2025  •  4 mos",
      location: "Region 14, Addis Ababa, Ethiopia",
      points: [
        "Worked on software development tasks using Flutter and Firebase.",
        "Contributed to UI/UX improvements and code refactoring for mobile app modules.",
        "Collaborated with senior developers to implement REST APIs and real-time data synchronization.",
        "Gained experience in agile development and cross-functional teamwork.",
      ],
    },
    {
      role: "Student Member",
      company: "A2SV | Africa to Silicon Valley",
      period: "Jan, 2025 — Aug, 2025  •  8 mos",
      location: "Adama, Oromia Region, Ethiopia",
      points: [
        "Engaged in advanced problem-solving and algorithmic training sessions.",
        "Developed teamwork and leadership skills through collaborative projects.",
        "Enhanced coding proficiency in data structures, algorithms, and software design.",
      ],
    },
  ];

 const certifications = [
    {
      title: "Programming Fundamentals",
      issuer: "Udacity",
      date: "Jan 2023",
      logo: "https://upload.wikimedia.org/wikipedia/commons/8/8f/Udacity_logo.svg",
      description:
        "Learned core programming concepts, including variables, control structures, data structures, and problem-solving techniques.",
      skills: ["Programming Logic", "Python", "Algorithms"],
      link: "https://www.udacity.com/"
    },
    {
      title: "Data Analysis Fundamentals",
      issuer: "Udacity",
      date: "Mar 2023",
      logo: "https://upload.wikimedia.org/wikipedia/commons/8/8f/Udacity_logo.svg",
      description:
        "Acquired skills in collecting, cleaning, and analyzing data using Python, NumPy, and pandas to extract insights.",
      skills: ["Data Analysis", "Python", "NumPy", "pandas"],
      link: "https://www.udacity.com/"
    },
    {
      title: "Android Developer Fundamentals",
      issuer: "Udacity",
      date: "May 2023",
      logo: "https://upload.wikimedia.org/wikipedia/commons/8/8f/Udacity_logo.svg",
      description:
        "Developed Android applications using Java and Android Studio, focusing on layouts, activities, and UI navigation.",
      skills: ["Android", "Java", "Mobile Development"],
      link: "https://www.udacity.com/"
    },
    {
      title: "Artificial Intelligence Fundamentals",
      issuer: "Udacity",
      date: "Jul 2023",
      logo: "https://upload.wikimedia.org/wikipedia/commons/8/8f/Udacity_logo.svg",
      description:
        "Explored core AI principles such as search algorithms, machine learning, and neural networks with hands-on examples.",
      skills: ["Artificial Intelligence", "Machine Learning", "Python"],
      link: "https://www.udacity.com/"
    },
    {
      title: "AI and Career Empowerment",
      issuer: "University of Maryland – Robert H. Smith School of Business",
      date: "Sep 2023",
      logo: "https://upload.wikimedia.org/wikipedia/commons/1/1d/University_of_Maryland_seal.svg",
      description:
        "Developed AI literacy and professional growth strategies to navigate AI-driven career transformation and innovation.",
      skills: ["AI Literacy", "Career Development", "Leadership"],
      link: "https://www.rhsmith.umd.edu/"
    },
    {
      title: "Communication Skills: Acquire Effective Communication",
      issuer: "Udemy",
      date: "Nov 2023",
      logo: "https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg",
      description:
        "Improved verbal, written, and interpersonal communication skills for professional and team collaboration.",
      skills: ["Communication", "Interpersonal Skills", "Public Speaking"],
      link: "https://www.udemy.com/"
    },
    {
      title: "Professional Diploma in Leadership",
      issuer: "Udemy",
      date: "Jan 2024",
      logo: "https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg",
      description:
        "Enhanced leadership capabilities, emotional intelligence, and team motivation for organizational success.",
      skills: ["Leadership", "Team Management", "Decision Making"],
      link: "https://www.udemy.com/"
    },

    {
      title: "Strategic Thinking for Leaders and Managers",
      issuer: "Udemy",
      date: "Mar 2024",
      logo: "https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg",
      description:
        "Learned strategic planning, problem-solving, and organizational analysis to lead teams effectively.",
      skills: ["Strategic Thinking", "Leadership", "Planning"],
      link: "https://www.udemy.com/"
    },

    {
      title: "Lean Problem Solving: Creative Solutions for Teams and Leaders",
      issuer: "Udemy",
      date: "May 2024",
      logo: "https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg",
      description:
        "Mastered lean problem-solving tools and creative thinking techniques to enhance team performance and innovation.",
      skills: ["Problem Solving", "Lean Thinking", "Creativity"],
      link: "https://www.udemy.com/"
    },

    {
      title: "Dart & Flutter: The Ultimate Mobile App Development Course",
      issuer: "Udemy",
      date: "Oct 2025",
      logo: "https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg",
      description:
        "Learned Flutter app development, Dart programming, state management, and responsive UI design.",
      skills: ["Flutter", "Dart", "UI Design", "Mobile Apps"],
      link: "https://www.udemy.com/certificate/your-link"
    },

    {
      title: "ALX AI Career Essentials",
      issuer: "ALX",
      date: "Dec 2024",
      logo: "https://pbs.twimg.com/profile_images/1717554980876929024/gFAybP0a_400x400.jpg",
      description:
        "Gained foundational understanding of AI tools, prompt engineering, and career readiness for AI-driven industries.",
      skills: ["AI Tools", "Prompt Engineering", "Career Skills"],
      link: "https://intranet.alxswe.com/certificates/nryHeJML8T"
    }
  ];
  
  

  return (
    <section id="resume" className="text-white space-y-10">
      <div className="flex flex-wrap items-center justify-between mb-6 border-b border-gray-700 pb-3">
  <h1 className="text-3xl font-bold text-white-400">Resume</h1>

  <a
    href="https://drive.google.com/file/d/1F9yEcJ-vB10zAFdnSxFIsPLpEFHRuBPc/view?usp=sharing" // ← replace with your actual resume file path
    download
    className="flex items-center gap-2 bg-yellow-400 text-gray-900 font-semibold px-4 py-2 rounded-xl hover:bg-yellow-300 transition-all duration-300 shadow-md"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 16v-8m0 8l-4-4m4 4l4-4m-8 8h8a2 2 0 002-2v-3m-12 0v3a2 2 0 002 2z"
      />
    </svg>
    Download Resume
  </a>
</div>


      {/* Education */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="text-yellow-400" />
          <h3 className="text-2xl font-semibold">Education</h3>
        </div>

        <div className="border-l-2 border-gray-700 pl-6 relative">
          {education.map((edu, index) => (
            <div key={index} className="mb-8">
              <div className="absolute -left-[9px] mt-1 w-3 h-3 bg-yellow-400 rounded-full"></div>
              <h4 className="font-bold text-lg">{edu.title}</h4>
              <p className="text-gray-400">{edu.degree}</p>
              <p className="text-yellow-500 font-medium mt-1">{edu.period}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Briefcase className="text-yellow-400" />
          <h3 className="text-2xl font-semibold">Experience</h3>
        </div>

        <div className="border-l-2 border-gray-700 pl-6 relative">
          {experience.map((exp, index) => (
            <div key={index} className="mb-12">
              <div className="absolute -left-[9px] mt-1 w-3 h-3 bg-yellow-400 rounded-full"></div>
              <h4 className="font-bold text-lg">{exp.role}</h4>
              <p className="text-gray-300">{exp.company}</p>
              <p className="text-yellow-500 font-medium mt-1">{exp.period}</p>
              <p className="italic text-gray-400 mb-3">{exp.location}</p>

              <ul className="list-disc list-inside text-gray-400 space-y-1">
                {exp.points.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>


{/* Certifications */}
<div>
  <div className="flex items-center gap-2 mb-4">
    <BookOpen className="text-yellow-400" />
    <h3 className="text-2xl font-semibold">Certifications</h3>
  </div>

  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
    {certifications.map((cert, index) => (
      <div
        key={index}
        className=" rounded-2xl p-6 shadow-lg border border-gray-700 hover:-translate-y-1 transition-all duration-300 flex flex-col items-start"
      >
        {/* Logo on Top */}
        <img
          src={cert.logo}
          alt={cert.issuer}
          className="w-16 h-16 object-contain rounded-md bg-gray-900 p-2 mb-4"
        />

        {/* Title & Issuer */}
        <h4 className="text-lg font-semibold text-white mb-1">{cert.title}</h4>
        <p className="text-gray-400 text-sm mb-2">{cert.issuer}</p>

        {/* Date */}
        <p className="text-yellow-400 text-sm font-medium mb-3">{cert.date}</p>

        {/* Description */}
        <p className="text-gray-300 text-sm mb-4 leading-relaxed">
          {cert.description}
        </p>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {cert.skills.map((skill, i) => (
            <span
              key={i}
              className="text-xs bg-gray-700 text-yellow-400 px-2 py-1 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* View Certificate Link */}
        {cert.link && (
          <a
            href={cert.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto text-yellow-400 text-sm font-medium hover:underline"
          >
            View Certificate →
          </a>
        )}
      </div>
    ))}
  </div>
</div>



    </section>
  );
};

export default ResumeSection;
