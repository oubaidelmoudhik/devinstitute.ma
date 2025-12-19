import React from "react";

interface ThemeToggleProps {
  theme: string;
  toggleTheme: () => void;
  userOverride?: boolean;
  resetToSystem?: () => void;
  style?: React.CSSProperties;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({
  theme,
  toggleTheme,
  userOverride = false,
  resetToSystem,
  style
}) => {
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    if (resetToSystem && userOverride) {
      resetToSystem();
    }
  };

  return (
    <button
      id="theme-toggle"
      onClick={toggleTheme}
      onContextMenu={handleContextMenu}
      className={`theme-btn ${
        theme === "light-mode" ? "" : "light-mode-active"
      } ${userOverride ? "user-override" : "system-following"}`}
      style={style}
      title={
        userOverride
          ? `Switch to ${theme === "light-mode" ? "dark" : "light"} mode (right-click to follow system)`
          : `Following system preference (${theme === "light-mode" ? "light" : "dark"})`
      }
    >
      <span className="material-symbols-outlined">
        {theme === "light-mode" ? "bedtime" : "clear_day"}
      </span>
      {!userOverride && (
        <span className="system-indicator" title="Following system preference">
          <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor">
            <circle cx="4" cy="4" r="3" opacity="0.5"/>
          </svg>
        </span>
      )}
    </button>
  );
};

export default ThemeToggle;
