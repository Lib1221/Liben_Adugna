import React, { useState } from "react";
import Navbar from "./Navbar";
import AboutSection from "./sections/AboutSection";
import ServicesSection from "./sections/ServicesSection";
import SkillsSection from "./sections/skills";
import ResumeSection from "./sections/ResumeSection";
import ProfileSection from "./sections/profileSection"; // Import the ProfileSection component
import BlogSection from "./sections/BlogSection";
import ContactSection from "./sections/ContactSection";

const Main: React.FC = () => {
  const [selected, setSelected] = useState("About"); // default selection

  return (
    <div className="space-y-8">
      {/* Navbar with selected state */}
      <Navbar selected={selected} setSelected={setSelected} />

      {/* Main content container */}
      <div className="glass rounded-xl p-8 shadow-soft">
        {/* About includes AboutSection, ServicesSection, SkillsSection */}
        {selected === "About" && (
          <>
            <AboutSection />
            <ServicesSection />
            <SkillsSection />
          </>
        )}

        {/* Resume section */}
        {selected === "Resume" && <ResumeSection />}

        {selected === "Portfolio" && <ProfileSection />}
        {selected === "Blog" && <BlogSection />}
        {selected === "Contact" && <ContactSection />}
      </div>
    </div>
  );
};

export default Main;
