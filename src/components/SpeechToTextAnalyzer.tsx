import {useEffect, useState} from "react";
import {IpcRenderer} from "electron";
import {
	goToNextParagraphIfTheCurrentOneIsCompleted,
	resetTextStateVariables,
} from "../utils/speech-analyzer-utils";
import ScriptComparison from "./ScriptComparison.tsx";
import Navigation from "./Navigation.tsx";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useTranslation} from "react-i18next";

const ipcRenderer: IpcRenderer = window.ipcRenderer;

function SpeechToTextAnalyzer() {
	const [recognizedText, setRecognizedText] = useState<string>("");
	const [lastRecognizedText, setLastRecognizedText] = useState<string>("");
	const [startingWord, setStartingWord] = useState<string>("");
	const [currentParagraphIndex, setCurrentParagraphIndex] = useState<number>(0);
	const {i18n} = useTranslation();
	const referenceText: string =
		"باسم الله والصلاة والسلام على رسول الله. السلام عليكم أعضاء لجنة التحكيم، يسعدنا تقديم نموذج تطبيق تقديري يهدف فريقنا إلى تقديمه \n" +
		"هدف التطبيق الرئيسي هو مراقبة قراءة الطفل وتحديد الكلمات التي يلفظها ومقارنتها مع النص المقدم أمامه \n" +
		"يعتمد التطبيق على الذكاء الاصطناعي لتحديد الأخطاء، كما يتضمن خاصية تتبع الفقرات، حيث ينتقل تلقائيًا إلى الفقرة التالية بعد انتهاء قراءة فقرة محددة ";

	const referenceParagraphs: string[] = referenceText.split("\n");

	// Listen for messages from the main process and update the state when received
	useEffect(() => {
		const handleRecognizedText = (
			_event: Electron.IpcRendererEvent,
			text: string,
		) => {
			let newText: string;

			if (text.startsWith(startingWord)) {
				// Continue reading without interruption
				// Set the recognized text based on the context
				newText = lastRecognizedText
					? recognizedText.replace(lastRecognizedText, text)
					: text;
			} else {
				// There is an interruption
				// Set the recognized text to the last recognized text plus the new text
				newText = recognizedText + " " + text;
			}

			setRecognizedText(newText);
			setLastRecognizedText(text);

			// Go to the next paragraph if the current one is completed
			goToNextParagraphIfTheCurrentOneIsCompleted(
				text,
				currentParagraphIndex,
				referenceParagraphs,
				goToNextParagraph,
			);
		};

		ipcRenderer.on("recognized-text", handleRecognizedText);

		// Remove the listener when the components unmount
		return () => {
			ipcRenderer.removeAllListeners("recognized-text");
		};
	}, [lastRecognizedText, recognizedText, startingWord]);

	// Update the starting word using the lastRecognizedText state
	useEffect(() => {
		setStartingWord(lastRecognizedText.split(" ")[0]);
	}, [lastRecognizedText]);

	function handleResetClick() {
		setCurrentParagraphIndex(0);
		resetTextStateVariables(
			setRecognizedText,
			setLastRecognizedText,
			setStartingWord,
		);
	}

	function goToNextParagraph() {
		// Check if all paragraphs have been read
		if (currentParagraphIndex === referenceParagraphs.length - 1) {
			console.log("All paragraphs have been read.");
			// Trigger alert when all text has been read
			toast.success(
				"Congratulations! You have finished reading all the text.",
				{
					position: "top-center",
					autoClose: 5000, // Close the alert after 5 seconds
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				},
			);
		}

		if (currentParagraphIndex < referenceParagraphs.length - 1) {
			setCurrentParagraphIndex(currentParagraphIndex + 1);
			resetTextStateVariables(
				setRecognizedText,
				setLastRecognizedText,
				setStartingWord,
			);
		}
	}

	function goToPreviousParagraph() {
		if (currentParagraphIndex > 0) {
			setCurrentParagraphIndex(currentParagraphIndex - 1);
			resetTextStateVariables(
				setRecognizedText,
				setLastRecognizedText,
				setStartingWord,
			);
		}
	}

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
