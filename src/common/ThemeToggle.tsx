import React from "react";

interface ThemeToggleProps {
  theme: string;
  toggleTheme: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, toggleTheme }) => {
  return (
    <button
      id="theme-toggle"
      onClick={toggleTheme}
      className={`theme-btn ${
        theme === "light-mode" ? "" : "light-mode-active"
      }`}
    >
      <span className="material-symbols-outlined">
        {theme === "light-mode" ? "bedtime" : "clear_day"}
      </span>
    </button>
  );
};

export default ThemeToggle;
