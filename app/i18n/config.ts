export const i18nConfig = {
  locales: ['en', 'fr'] as const,
  defaultLocale: 'en' as const,
  localeLabels: {
    en: 'English',
    fr: 'Français',
  },
  direction: {
    en: 'ltr' as const,
    fr: 'ltr' as const,
  },
};

export type Locale = typeof i18nConfig.locales[number];
export type DefaultLocale = typeof i18nConfig.defaultLocale;