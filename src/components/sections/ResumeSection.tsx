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

  return (
    <section id="resume" className="text-white space-y-10">
      <h2 className="text-3xl font-bold text-yellow-400 mb-4 border-b border-gray-700 pb-3">
        Resume
      </h2>

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
    </section>
  );
};

export default ResumeSection;
