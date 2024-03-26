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
					homeText:
						"دع طفلك يتدرب على القراءة بقصص ناتجة عن الذكاء الاصطناعي مع تسجيل صوته لتحسين طلاقة لغته.",
					homeHeader: "قم بتعزيز مهارة القراءة لدى طفلك",
					S1Header: "كيف يعمل",
					S1Text: "اتبع هذه الخطوات البسيطة للبدء بالقراءة.",
					step1: "اختر قصة لقراءتها",
					step2: "ابدأ بتسجيل صوتك أثناء القراءة",
					step3: "احصل على تعليقات حول تهجئتك",
					step4: "أنهي جلسة القراءة",
					step5: "احصل على نتيجتك وأحرز تالميزات الرئيسية",
					keyFeatures: "الميزات الرئيسية",
					featuresText:
						"يأتي التطبيق مع مجموعة من الميزات لجعل القراءة ممتعة وجذابة.",
					feature1: "قصص مولدة بواسطة الذكاء الاصطناعي",
					feature2: "تسجيل صوتي",
					feature3: "تتبع التقدم المحرز",
					feature4: "دعم لغات متعددة",
					"Progress tracking": "تتبع التقدم",
					reset: "إعادة المحاولة",
					ON: "إبدأ",
					OFF: "إيقاف",
					"Loading...": "تحميل...",
					"Stop Vosk": "إيقاف البرنامج",
					"Start Vosk": "تشغيل البرنامج",
					Theme: "الوضع",
					Dark: "مظلم",
					light: "مضيئ",
				},
				navigation: {
					home: "الصفحة الرئيسية",
					settings: "الإعدادات",
					transcription: "إبدأ التمرين",
				},
			},
			en: {
				translation: {
					language: "Change language",
					homeHeader: "Enhance your child's reading skills",
					homeText:
						"Let your child practice reading with AI-generated stories and record their voice to improve fluency.",
					S1Header: "How it works",
					S1Text: "Follow these simple steps to start with the reading app.",
					step1: "Choose a story to read",
					step2: "Start Recording your voice while reading",
					step3: "Get instance feedback to your spelling",
					step4: "Finish the reading session",
					step5: "Get your scoore and make progress",
					keyFeatures: "Key Features",
					featuresText:
						"The app comes with a range of features to make reading fun and engaging.",
					feature1: "AI-generated stories",
					feature2: "Voice recording",
					feature3: "Progress tracking",
					feature4: "Support multiple languages",
					"Progress tracking": "Progress tracking",
					reset: "Reset",
					ON: "ON",
					OFF: "OFF",
					"Loading...": "Loading...",
					"Stop Vosk": "Stop Vosk",
					"Start Vosk": "Start Vosk",
					Theme: "Theme",
					Dark: "Dark",
					light: "Light",
					"Word Similarity Percentage": "Word Similarity Percentage",
				},
				navigation: {
					home: "Home",
					settings: "Settings",
					transcription: "Transcription",
				},
			},
		},
	});
