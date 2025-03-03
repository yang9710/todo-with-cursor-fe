import React from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';

const Header = ({ darkMode, toggleDarkMode }) => {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="app-title">优雅待办</h1>
        <button
          onClick={toggleDarkMode}
          className="theme-toggle"
          aria-label={darkMode ? "切换到亮色模式" : "切换到暗色模式"}
        >
          {darkMode ?
            <FiSun className="text-yellow-400 w-5 h-5" /> :
            <FiMoon className="text-gray-700 w-5 h-5" />
          }
        </button>
      </div>
    </header>
  );
};

export default Header;