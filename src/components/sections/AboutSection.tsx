import React from "react";
import { motion } from "framer-motion";
import SectionHeader from "../ui/SectionHeader";

const AboutSection: React.FC = () => {
  return (
    <section>
      <SectionHeader title="About" accent="Me" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="space-y-4"
      >
        <p className="text-gray-400 leading-relaxed">
          I am a <span className="text-yellow-500 font-medium">software engineer</span> from Adama, Ethiopia. I started as a
          full-stack developer shipping Django back ends and Flutter apps for clients, then moved into machine learning:
          a behavioral segmentation pipeline over 450k+ records, transaction anomaly detection over 110k+ records, and an
          NLP engine that matches resumes to job descriptions.
        </p>

        <p className="text-gray-400 leading-relaxed">
          Since 2024 most of my time goes into <span className="text-white font-medium">AI evaluation</span>: authoring
          the software-engineering tasks, rubrics and test harnesses that vendors use to measure frontier models and coding
          agents, and reviewing other people's tasks for ambiguity and gameable tests.
        </p>

        <p className="text-gray-400 leading-relaxed">
          Foundations: B.Sc. Software Engineering (ASTU, 2022), 400+ problems through the A2SV algorithms program, and
          a year mentoring 40+ students in ML system design. I care about
          <span className="text-white font-medium"> debugging, performance, and code that is still readable a year later</span>.
        </p>
      </motion.div>

    </section>
  );
};

export default AboutSection;
