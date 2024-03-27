import React, {useState} from "react";
import ScriptComparison from "./ScriptComparison.tsx";
import Navigation from "./Navigation.tsx";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useTranslation} from "react-i18next";
import useTextAnalyzerHooks from "../hooks/useTextAnalyzerHooks.tsx";

function SpeechToTextAnalyzer() {
	const {i18n} = useTranslation();
    
	const referenceText: string =
		"باسم الله والصلاة والسلام على رسول الله. السلام عليكم أعضاء لجنة التحكيم، يسعدنا تقديم نموذج تطبيق تقديري يهدف فريقنا إلى تقديمه \n" +
		"هدف التطبيق الرئيسي هو مراقبة قراءة الطفل وتحديد الكلمات التي يلفظها ومقارنتها مع النص المقدم أمامه \n" +
		"يعتمد التطبيق على الذكاء الاصطناعي لتحديد الأخطاء، كما يتضمن خاصية تتبع الفقرات، حيث ينتقل تلقائيًا إلى الفقرة التالية بعد انتهاء قراءة فقرة محددة ";

	const referenceParagraphs: string[] = referenceText.split("\n");

	const [isReferenceTextReady, setIsReferenceTextReady] =
		useState<boolean>(false);

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

	// Function to handle input change
	const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setReferenceText(event.target.value);
	};

	return (
		<div>
			<div
				className={`flex items-center justify-center m-6 
					${isReferenceTextReady ? "hidden" : "block"} flex flex-col items-center justify-center`}
			>
				<textarea
					value={referenceText}
					onChange={handleInputChange}
					rows={10}
					cols={50}
					placeholder="Enter reference text here"
					className={`outline-none max-w-none text-lg px-8 py-5 caret-yellow-500 prose prose-invert prose-p:my-3 prose-p:leading-relaxed prose-headings:my-4 prose-blockquote:my-4 prose-ul:my-2 prose-li:my-0 prose-code:px-1 prose-code:text-red-500 prose-code:before:content-[''] prose-code:after:content-['']`}
				/>
				<button
					className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2`}
					onClick={() => setIsReferenceTextReady(true)}
				>
					finish
				</button>
			</div>

			<ToastContainer />
			<div
				className={`${
					isReferenceTextReady ? "block" : "hidden"
				} flex flex-col items-center justify-center`}
			>
				<div className={`flex items-center justify-center m-6`}>
					<Navigation
						goToPreviousParagraph={goToPreviousParagraph}
						goToNextParagraph={goToNextParagraph}
						reset={handleResetClick}
						isPreviousDisabled={isPreviousDisabled}
						isNextDisabled={isNextDisabled}
					/>
				</div>

				<div className="mb-8 mx-auto">
					<VoskControl />
				</div>

				<h2
					className={
						i18n.resolvedLanguage == "ar" ? "direction-rtl" : "direction-ltr"
					}
				>
					<ScriptComparison
						recognizedText={recognizedText}
						currentParagraphIndex={currentParagraphIndex}
						referenceParagraphs={referenceParagraphs}
					/>
				</h2>
			</div>
		</div>
	);
}

export default SpeechToTextAnalyzer;
