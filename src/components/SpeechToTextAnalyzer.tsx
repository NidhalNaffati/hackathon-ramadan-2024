import ScriptComparison from "./ScriptComparison.tsx";
import Navigation from "./Navigation.tsx";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useTranslation} from "react-i18next";
import useTextAnalyzerHooks from "../hooks/useTextAnalyzerHooks.tsx";
import {useAppSelector} from "../store/hooks.ts";
import {useEffect} from "react";
// const API_KEY = ""
function SpeechToTextAnalyzer() {
	const {i18n} = useTranslation();
	const message = useAppSelector((state) => state.text.message);
	/* The problem i don't know how to setup there api so i used a normal fetch request and i don't want to use claude because have a long responce more than 1 minute 
	so if you know how to setup openai do it .
	this is from openai platform : 
	Remember that your API key is a secret! Do not share it with others or expose it in any client-side code (browsers, apps). Production requests must be routed through your own backend server where your API key can be securely loaded from an environment variable or key management service.


	async function fetchMessageFromServer(message: string) {
		const option: RequestInit = {
			method: "POST",
			headers: {
				"x-api-key": `${API_KEY}`,
				"Content-Type": "application/json", // assuming your content type is JSON
				"anthropic-version": "2023-06-01",
			},
			mode: "no-cors",
			body: JSON.stringify({
				model: "claude-3-opus-20240229",
				max_tokens: 1024,
				messages: [
					{
						role: "user",
						content: message,
					},
				],
			}),
		};

		try {
			const response = await fetch(
				"https://api.anthropic.com/v1/messages",
				option,
			);
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			// Handle successful response
			const responseData = await response.json();
			console.log(responseData); // or do something with the response data
		} catch (error) {
			console.error("Error:", error);
		}
	}
   */
	useEffect(() => {
		// fetchMessageFromServer(message);
	}, [message]);
	const referenceText: string =
		"باسم الله والصلاة والسلام على رسول الله. السلام عليكم أعضاء لجنة التحكيم، يسعدنا تقديم نموذج تطبيق تقديري يهدف فريقنا إلى تقديمه \n" +
		"هدف التطبيق الرئيسي هو مراقبة قراءة الطفل وتحديد الكلمات التي يلفظها ومقارنتها مع النص المقدم أمامه \n" +
		"يعتمد التطبيق على الذكاء الاصطناعي لتحديد الأخطاء، كما يتضمن خاصية تتبع الفقرات، حيث ينتقل تلقائيًا إلى الفقرة التالية بعد انتهاء قراءة فقرة محددة ";

	const referenceParagraphs: string[] = referenceText.split("\n");

	const {
		recognizedText,
		currentParagraphIndex,
		handleResetClick,
		goToNextParagraph,
		goToPreviousParagraph,
	} = useTextAnalyzerHooks(referenceParagraphs);

	const isNextDisabled =
		currentParagraphIndex === referenceParagraphs.length - 1;
	const isPreviousDisabled = currentParagraphIndex === 0;

	return (
		<>
			<div>
				<ToastContainer />
				<div className={`flex items-center justify-center m-6`}>
					<Navigation
						goToPreviousParagraph={goToPreviousParagraph}
						goToNextParagraph={goToNextParagraph}
						reset={handleResetClick}
						isPreviousDisabled={isPreviousDisabled}
						isNextDisabled={isNextDisabled}
					/>
				</div>
				<h2 className={i18n.resolvedLanguage == "ar" ? "direction p-2" : "p-2"}>
					<ScriptComparison
						recognizedText={recognizedText}
						currentParagraphIndex={currentParagraphIndex}
						referenceParagraphs={referenceParagraphs}
					/>
				</h2>
			</div>
		</>
	);
}

export default SpeechToTextAnalyzer;
