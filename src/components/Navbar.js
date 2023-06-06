import React from "react";

const Navbar = ({ darkMode, toggleDarkMode }) => {
    return (
      <nav
        className={`flex items-center justify-between p-6 border-b ${
          darkMode ? "bg-gray-800 text-gray-300" : "bg-white text-gray-900"
        }`}
      >
        <div>
          <span className={"font-bold text-xl"}>Vision AI</span>
        </div>
        <div>
          <button
            onClick={toggleDarkMode}
            className={"bg-blue-500 text-white px-4 py-2 rounded"}
          >
            {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          </button>
        </div>
      </nav>
    );
  };

export default Navbar;