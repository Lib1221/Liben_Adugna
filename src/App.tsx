import React from "react";
import SplashCursor from "./components/sections/splashmouse"; // 🟣 Fluid cursor effect
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";

function App() {
  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-[#070707] to-[#0f0f0f] overflow-hidden">
      {/* 🔮 Splash cursor layer */}
      <SplashCursor />

      {/* 🧱 Main layout */}
      <div className="relative z-10 p-8 max-w-7xl mx-auto grid grid-cols-12 gap-8">
        {/* Left sidebar */}
        <div className="col-span-12 lg:col-span-4">
          <Sidebar />
        </div>

        {/* Right main content */}
        <div className="col-span-12 lg:col-span-8">
          <Main />
        </div>
      </div>
    </div>
  );
}

export default App;
