import i18next from "i18next";
import {initReactI18next} from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18next
	.use(initReactI18next)
	.use(LanguageDetector)
	.init({
		debug: false,
		fallbackLng: "ar",
		lng: "en",
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
					referenceText: "اكتب النص الخاص بك هنا",
					suggestions: "إقتراحات ؟",
					"What you want to read today?": "مذا تريد أن تقرأ اليوم؟",
					"The Magic Garden Adventure": "المغامرة في حديقة السحر",
					"The Curious Case of Charlie and the Lost Kite":
						"القضية الفضولية لتشارلي والطائرة المفقودة",
					"The Secret of the Enchanted Forest": "سر الغابة الساحرة",
					"Milly and the Mysterious Treasure Map": "ميلي والخريطة الغامضة",
					"Ai generated story": "توليد قصة بواسطة الذكاء الإصطناعي",
					"Read your own text": "إقرأ النص الخاص بك",
					"Entre your title here before continue":
						"أدخل العنوان الخاص بك قبل المتابعة",
					"Enter reference text here": "أدخل النص الخاص بك هنا",
					"Analyse your speech": "نتائج تحليل القراءة الخاصة بك",
					"To get feedback read something first":
						"لتحليل نتائجك قم بالقراءة أولا ",
					Title: "العنوان ",
					"Words Read": "عدد كلمات النص",
					Language: "اللغة",
					"Spelling Mistakes": "أخطاء القراءة",
					"words per minute": "عدد الكلمات في الدقيقة",
					"word minute": "كلمة في الدقيقة",
					Accuracy: "دقة القراءة",
					Transcription: "النص",
					"Save Task": "إحفظ النتائج",
					"Task saved with success!": "تم حفظ النتائج بنجاح",
					"Restore Defaults Settings": "إسترجاع الإعدادات الإفتراضية",
					"Word Similarity Percentage": "نسبة التشابه في الكلمة",
				},
				navigation: {
					home: "الصفحة الرئيسية",
					settings: "الإعدادات",
					transcription: "إبدأ التمرين",
					speechanalyse: "تحليل النتائج",
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
					referenceText: "write your own text here",
					suggestions: "Suggestions?",

					"The Curious Case of Charlie and the Lost Kite":
						"The Curious Case of Charlie and the Lost Kite",
					"The Secret of the Enchanted Forest":
						"The Secret of the Enchanted Forest",
					"Milly and the Mysterious Treasure Map":
						"Milly and the Mysterious Treasure Map",
					"The Magic Garden Adventure": "The Magic Garden Adventure",
					"What you want to read today?": "What you want to read today?",
					"Ai generated story": "Ai generated story",
					"Read your own text": "Read your own text",
					"Entre your title here before continue":
						"Entre your title here before continue",
					"Enter reference text here": "Enter reference text here",
					"Analyze your speech": "Analyze your speech",
					"To get feedback read something first":
						"To get feedback read something first",
					Title: "Title",
					"Words Read": "Words Read",
					Language: "Language",
					"Spelling Mistakes": "Spelling Mistakes",
					"Words per minute": "Words per minute",
					"Word per minute": "Word per minute",
					Accuracy: "Accuracy",
					Transcription: "Transcription",
					"Save Task": "Save Task",
					"Task saved with success!": "Task saved with success!",
					"Restore Defaults Settings": "Restore Defaults Settings",
				},
				navigation: {
					home: "Home",
					settings: "Settings",
					transcription: "Transcription",
					speechanalyse: "Analyse resultes",
				},
			},
		},
	});
