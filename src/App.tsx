import React from "react";
import SplashCursor from "./components/sections/splashmouse"; // 🟣 Fluid cursor effect
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-[#070707] to-[#0f0f0f] overflow-hidden">
      {/* 🔮 Splash cursor layer */}
      <SplashCursor />

      {/* 🧱 Main layout */}
      <div className="relative z-10 p-8 max-w-7xl mx-auto grid grid-cols-12 gap-8">
        {/* Left sidebar - fixed but slightly inward */}
        <div className="col-span-12 lg:col-span-3">
          <div className="lg:fixed lg:top-30 lg:left-[20%] lg:h-screen lg:w-[20%] p-6">
            <Sidebar />
          </div>
        </div>

        {/* Right main content - more width & centered feel */}
        <div className="col-span-12 lg:col-span-9 lg:ml-[23%]">
          <Main />
        </div>
      </div>

      <Analytics /> 
    </div>
  );
}

export default App;
