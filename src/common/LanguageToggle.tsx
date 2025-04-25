import { useTranslation } from "react-i18next";

const LanguageToggle: React.FC = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  const toggleLanguage = () => {
    const nextLang = currentLang === "en" ? "fr" : "en";
    i18n.changeLanguage(nextLang);
  };

  return (
    <button
      id="language-toggle"
      onClick={toggleLanguage}
      className="lang-btn theme-btn"
    >
      <span className="material-symbols-outlined">language</span>
    </button>
  );
};

export default LanguageToggle;
