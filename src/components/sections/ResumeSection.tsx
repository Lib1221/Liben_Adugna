import React from "react";
import { motion } from "framer-motion";

interface TimelineItem {
  title: string;
  subtitle: string;
  duration: string;
  description?: string;
  progress: number; // 0-100
  type: "education" | "experience";
}

const timeline: TimelineItem[] = [
  {
    title: "BSc in Computer Science",
    subtitle: "XYZ University",
    duration: "2018 - 2022",
    description:
      "Specialized in software engineering, mobile app development, and web technologies.",
    progress: 100,
    type: "education",
  },
  {
    title: "High School Diploma",
    subtitle: "ABC High School",
    duration: "2015 - 2018",
    description: "Completed with distinction in Science Stream.",
    progress: 100,
    type: "education",
  },
  {
    title: "Flutter Developer",
    subtitle: "Tech Startup",
    duration: "2023 - Present",
    description:
      "Developed cross-platform apps with Firebase backend and state management using Riverpod.",
    progress: 80,
    type: "experience",
  },
  {
    title: "Frontend Developer Intern",
    subtitle: "Web Solutions Co.",
    duration: "2022 - 2023",
    description: "Built responsive web apps using React and TailwindCSS.",
    progress: 100,
    type: "experience",
  },
];

const TimelineCard: React.FC<{ item: TimelineItem }> = ({ item }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="relative border-l-2 border-yellow-400 pl-6 mb-8 last:mb-0"
  >
    <div className="absolute -left-3 top-0 w-6 h-6 bg-yellow-400 rounded-full border-2 border-gray-900"></div>
    <h3 className="text-white font-semibold text-lg">{item.title}</h3>
    <span className="text-gray-400 text-sm">
      {item.subtitle} | {item.duration}
    </span>
    {item.description && <p className="text-gray-300 mt-2">{item.description}</p>}
    <div className="h-2 bg-gray-700 rounded-full mt-2 w-full">
      <div
        className="h-2 bg-yellow-400 rounded-full"
        style={{ width: `${item.progress}%` }}
      ></div>
    </div>
  </motion.div>
);

const ResumeSection: React.FC = () => {
  return (
    <section className="mt-12 bg-[#1f1f1f] p-8 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">My Resume</h2>

      <div className="space-y-12">
        {/* Education Section */}
        <div>
          <h3 className="text-2xl font-semibold text-yellow-400 mb-6">Education</h3>
          {timeline.filter(item => item.type === "education").map((edu, idx) => (
            <TimelineCard key={idx} item={edu} />
          ))}
        </div>

        {/* Experience Section */}
        <div>
          <h3 className="text-2xl font-semibold text-yellow-400 mb-6">Experience</h3>
          {timeline.filter(item => item.type === "experience").map((exp, idx) => (
            <TimelineCard key={idx} item={exp} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResumeSection;
