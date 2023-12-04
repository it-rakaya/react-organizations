import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ar from "./langs/ar/translation.json";
import en from "./langs/en/translation.json";
import Backend from "i18next-xhr-backend";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
    en: { translation: en },
    ar: { translation: ar }
};

i18n
  .use(LanguageDetector)
  .use(Backend)
  .use(initReactI18next)
  .init({
    load: "languageOnly", // will prevent backend from loading en-US for example
    
    backend: {
      // loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
    resources,
    detection: {
      order: ["localStorage", "htmlTag", "cookie", "path"],
      caches: ["localStorage"], // cache user language on
    },
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },

    initImmediate: false,
  });
export default i18n;
