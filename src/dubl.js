import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
// import XHR from "i18next-xhr-backend";

import arab from  './locales/ar/translation.json';
import eng from  './locales/en/translation.json';

i18n
//  .use(XHR)
 .use(LanguageDetector).init({
  // we init with resources
  resources: {
    en: {
      translations: eng
    },
    ar: {
      translations: arab
    }
  },
  fallbackLng: "en",
  debug: true,

  // have a common namespace used around the full app
  ns: ["translations"],
  defaultNS: "translations",

  keySeparator: false, // we use content as keys

  interpolation: {
    // escapeValue: false, // not needed for react!!
    formatSeparator: ","
  },

  react: {
    wait: true
  }
  // have a common namespace used around the full app
});

export default i18n;
