import React from "react";

interface LanguageToggleProps {
  currentLanguage: string;
  toggleLanguage: () => void;
  userOverride?: boolean;
  resetToSystem?: () => void;
  style?: React.CSSProperties;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({
  currentLanguage,
  toggleLanguage,
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
      id="language-toggle"
      onClick={toggleLanguage}
      onContextMenu={handleContextMenu}
      className={`theme-btn language-btn ${
        userOverride ? "user-override" : "system-following"
      }`}
      style={style}
      title={
        userOverride
          ? `Switch to ${currentLanguage === "en" ? "French" : "English"} (right-click to follow system)`
          : `Following system language (${currentLanguage === "en" ? "English" : "French"})`
      }
    >
      <span className="material-symbols-outlined">
        language
      </span>
      {!userOverride && (
        <span className="system-indicator" title="Following system language">
          <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor">
            <circle cx="4" cy="4" r="3" opacity="0.5"/>
          </svg>
        </span>
      )}
    </button>
  );
};

export default LanguageToggle;
