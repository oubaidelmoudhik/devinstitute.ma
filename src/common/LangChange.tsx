import i18n from "../translation/i18n";

export default function LangChange() {
  const handleChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };
  return (
    <>
      <button onClick={() => handleChangeLanguage("en")}>EN</button>
      <button onClick={() => handleChangeLanguage("fr")}>FR</button>
    </>
  );
}
