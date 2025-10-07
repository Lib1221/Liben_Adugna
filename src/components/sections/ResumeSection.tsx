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
      title: "Advanced Django & REST API Development",
      issuer: "Coursera",
      date: "Sep 2024",
      logo: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Coursera_logo.svg",
      description:
        "Built RESTful APIs, managed Django ORM, authentication, and deployed full-stack web apps.",
      skills: ["Django", "REST API", "Python", "PostgreSQL"],
      link: "https://www.coursera.org/account/accomplishments"
    },
    {
      title: "Google Data Analytics Professional Certificate",
      issuer: "Google",
      date: "Jun 2023",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
      description:
        "Gained skills in data cleaning, visualization, and storytelling using real business datasets.",
      skills: ["Data Analysis", "SQL", "Visualization", "Spreadsheets"],
      link: "https://grow.google/certificates/data-analytics/"
    }
  ];
  

  return (
    <section id="resume" className="text-white space-y-10">
      <div className="flex flex-wrap items-center justify-between mb-6 border-b border-gray-700 pb-3">
  <h1 className="text-3xl font-bold text-yellow-400">Resume</h1>

  <a
    href="/Liben_Adugna_Resume.pdf" // ← replace with your actual resume file path
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
