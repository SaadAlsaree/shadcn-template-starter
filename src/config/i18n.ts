'use client';

import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

const loadTranslations = async (language: string) => {
  try {
    const module = await import(`@/locales/${language}/translation.json`);
    return module.default;
  } catch (error) {
    console.error(`Failed to load translations for ${language}:`, error);
    return {};
  }
};

const initI18n = async () => {
  const [enTranslations, arTranslations] = await Promise.all([
    loadTranslations('en'),
    loadTranslations('ar')
  ]);

  i18next.use(initReactI18next).init({
    resources: {
      en: {
        translation: enTranslations
      },
      ar: {
        translation: arTranslations
      }
    },
    lng: 'ar',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });
};

initI18n().catch(console.error);

export default i18next;
