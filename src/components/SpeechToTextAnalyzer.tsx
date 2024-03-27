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
