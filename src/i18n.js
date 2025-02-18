import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

i18n
	.use(Backend) // Load translations from external files
	.use(LanguageDetector) // Detect user's language
	.use(initReactI18next) // Pass i18n instance to react-i18next
	.init({
		fallbackLng: "en", // Default language
		debug: true,
		interpolation: {
			escapeValue: false, // React already protects from XSS
		},
	});

export default i18n;
