import {useEffect, useState} from "react";
import {IpcRenderer} from "electron";
import {
	goToNextParagraphIfTheCurrentOneIsCompleted,
	resetTextStateVariables,
} from "../utils/speech-analyzer-utils";
import ScriptComparison from "./ScriptComparison.tsx";
import Navigation from "./Navigation.tsx";

const ipcRenderer: IpcRenderer = window.ipcRenderer;

function SpeechToTextAnalyzer() {
	const [recognizedText, setRecognizedText] = useState<string>("");
	const [lastRecognizedText, setLastRecognizedText] = useState<string>("");
	const [startingWord, setStartingWord] = useState<string>("");
	const [currentParagraphIndex, setCurrentParagraphIndex] = useState<number>(0);

	const referenceText: string =
		"مرحبًا بالجميع، اليوم أنا متحمس لتقديم النسخة التجريبية من تطبيقي، كما ترون يعمل كمنظم نصوص ذكي. عند قراءة النص، يقوم التطبيق بتحويل كلامي إلى نص ثم يقارنه بالنص المكتوب. كما يتميز التطبيق بالتنقل التلقائي، مما يعني أنه عند انتهائي من قراءة فقرة يتحرك تلقائيًا إلى الفقرة التالية. صممت هذا التطبيق لمنشئي المحتوى للتخلص من الحاجة إلى حفظ النصوص وتوفير بديل ميسور التكلفة للمنظمات التلفزيونية التقليدية. بالإضافة إلى ذلك، فإنه مفيد للطلاب مثلي الذين يحاولون تحسين نطقهم";

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
				<Navigation
					goToPreviousParagraph={goToPreviousParagraph}
					goToNextParagraph={goToNextParagraph}
					reset={handleResetClick}
					isPreviousDisabled={isPreviousDisabled}
					isNextDisabled={isNextDisabled}
				/>
				<h2>
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
