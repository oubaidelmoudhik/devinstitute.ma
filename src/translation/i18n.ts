import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  debug: true,
  fallbackLng: "en",
  resources: {
    en: {
      translation: {
        header: "this is the best header",
      },
    },
    fr: {
      translation: {
        header: "ceci est le meilleur header",
      },
    },
  },
});

export default i18n;
