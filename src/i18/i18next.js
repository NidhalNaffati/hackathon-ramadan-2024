import i18next from "i18next";
import {initReactI18next} from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18next
	.use(initReactI18next)
	.use(LanguageDetector)
	.init({
		debug: false,
		fallbackLng: "ar",
		lng: "ar",
		resources: {
			ar: {
				translation: {
					language: "تغيير اللغة",
				},
				navigation: {
					home: "الصفحة الرئيسية",
					settings: "الإعدادات",
					transcription: "إبدأ التمرين",
				},
			},
			en: {
				translation: {
					language: "change language",
				},
				navigation: {
					home: "Home",
					settings: "settings",
					transcription: "Transcription",
				},
			},
		},
	});
