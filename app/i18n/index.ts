import { createContext, useContext } from "react";
import { i18nConfig, Locale } from "./config";

// Import all translation files
import commonEn from "./en/common.json";
import navigationEn from "./en/navigation.json";
import footerEn from "./en/footer.json";
import homeEn from "./en/home.json";
import contactEn from "./en/contact.json";

import commonFr from "./fr/common.json";
import navigationFr from "./fr/navigation.json";
import footerFr from "./fr/footer.json";
import homeFr from "./fr/home.json";
import contactFr from "./fr/contact.json";

// Type definitions

type TranslationData = {
  common: typeof commonEn;
  navigation: typeof navigationEn;
  footer: typeof footerEn;
  home: typeof homeEn;
  contact: typeof contactEn;
};

type TranslationNamespace = keyof TranslationData;

const translations: Record<Locale, TranslationData> = {
  en: {
    common: commonEn,
    navigation: navigationEn,
    footer: footerEn,
    home: homeEn,
    contact: contactEn,
  },
  fr: {
    common: commonFr,
    navigation: navigationFr,
    footer: footerFr,
    home: homeFr,
    contact: contactFr,
  },
};

export interface I18nContextType {
  locale: Locale;
  t: (key: string, namespace?: TranslationNamespace) => string;
  changeLocale: (locale: Locale) => void;
  resetToSystem?: () => void;
}

export const I18nContext = createContext<I18nContextType | null>(null);

export function useTranslation(
  namespaces: TranslationNamespace[] = ["common"]
) {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error("useTranslation must be used within an I18nProvider");
  }

  const t = (key: string, namespace?: TranslationNamespace) => {
    const ns = namespace || namespaces[0] || "common";
    return context.t(key, ns);
  };

  return {
    t,
    locale: context.locale,
    changeLocale: context.changeLocale,
    resetToSystem: context.resetToSystem,
  };
}

export function createTranslationFunction(locale: Locale) {
  return (key: string, namespace: TranslationNamespace = "common"): string => {
    const translation = translations[locale][namespace];
    const value = (translation as any)[key];

    if (value === undefined) {
      // Return visible placeholder for missing translations
      return `MISSING_${key}`;
    }

    return value;
  };
}
