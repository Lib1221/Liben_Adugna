import React from "react";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";

function App() {
  return (
    <div className="min-h-screen w-full p-8 bg-gradient-to-br from-[#070707] to-[#0f0f0f]">
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8">
        {/* Left sidebar: sticky card */}
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
