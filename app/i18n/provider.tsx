"use client";

import { ReactNode, useState, useEffect } from 'react';
import { I18nContext, I18nContextType, createTranslationFunction } from './index';
import { i18nConfig, Locale } from './config';

interface I18nProviderProps {
  children: ReactNode;
  locale?: Locale;
}

export function I18nProvider({ children, initialLocale }: { children: ReactNode; initialLocale?: Locale }) {
  const [locale, setLocale] = useState<Locale>(initialLocale || i18nConfig.defaultLocale);
  const [mounted, setMounted] = useState(false);

  // Function to detect system language preference
  const getSystemLanguage = (): Locale => {
    if (typeof window !== "undefined") {
      const browserLang = navigator.language.split('-')[0];
      return browserLang === 'fr' ? 'fr' : 'en';
    }
    return i18nConfig.defaultLocale;
  };

  useEffect(() => {
    setMounted(true);
    const savedLanguage = localStorage.getItem("language") as Locale;
    const savedOverride = localStorage.getItem("languageOverride") === "true";

    if (savedLanguage && savedOverride) {
      // User has manually set a language
      setLocale(savedLanguage);
    } else {
      // Use system preference as default
      const systemLanguage = getSystemLanguage();
      setLocale(systemLanguage);
    }
  }, []);

  // Listen for system language changes when no user override
  useEffect(() => {
    if (!mounted) return;

    const handleLanguageChange = () => {
      const savedOverride = localStorage.getItem("languageOverride") === "true";
      if (!savedOverride) {
        const systemLanguage = getSystemLanguage();
        setLocale(systemLanguage);
      }
    };

    // Listen for language changes (though browser APIs are limited)
    window.addEventListener('languagechange', handleLanguageChange);
    return () => window.removeEventListener('languagechange', handleLanguageChange);
  }, [mounted]);

  const t = createTranslationFunction(locale);

  const changeLocale = (newLocale: Locale) => {
    setLocale(newLocale);
    localStorage.setItem("language", newLocale);
    localStorage.setItem("languageOverride", "true");
  };

  const resetToSystem = () => {
    const systemLanguage = getSystemLanguage();
    setLocale(systemLanguage);
    localStorage.removeItem("language");
    localStorage.setItem("languageOverride", "false");
  };

  const contextValue: I18nContextType = { locale, t, changeLocale };

  return (
    <I18nContext.Provider value={{ ...contextValue, resetToSystem }}>
      {children}
    </I18nContext.Provider>
  );
}