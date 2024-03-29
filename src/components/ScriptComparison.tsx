import React from "react";
import {isWordSimilar} from "../utils/word-similarity.ts";
import {useAppDispatch, useAppSelector} from "../store/hooks.ts";
import {
	getAccuracy,
	getAllElementForAnalyse,
} from "../store/features/getAigeneratedText.tsx";

interface ComparisonProps {
	currentParagraphIndex: number;
	referenceParagraphs: string[];
	recognizedText: string;
}
interface CalculateAccuracy {
	trueWord: number;
	falseWord: number;
}
interface ElementTraitement {
	className: string;
	value: string;
}
const ScriptComparison: React.FC<ComparisonProps> = ({
	currentParagraphIndex,
	referenceParagraphs,
	recognizedText,
}) => {
	const dispatch = useAppDispatch();
	const isReadyToDispatch = useAppSelector((state) => state.text.isReady);
	// const totalWords = useAppSelector((state)=> state.text.totalWords);
	const referenceParagraph = referenceParagraphs[currentParagraphIndex];
	const referenceWords = referenceParagraph.split(" ");
	const recognizedWords = recognizedText.split(" ");
	const calcAccuracy: CalculateAccuracy = {trueWord: 0, falseWord: 0};
	const ElementAfterTraitement: ElementTraitement[] = [];

	const returnedObj = referenceWords.map((referenceWord, i) => {
		const userWord = recognizedWords[i];

		const wordSimilarityPercentage =
			localStorage.getItem("wordSimilarityPercentage") || "70";
		const isWordSpelledCorrectly = isWordSimilar(
			userWord,
			referenceWord,
			parseInt(wordSimilarityPercentage),
		);

		console.log("wordSimilarityPercentage: ", isWordSpelledCorrectly);

		// Make element for analyes feedback
		if (isWordSpelledCorrectly) {
			calcAccuracy.trueWord += 1;
		} else {
			calcAccuracy.falseWord += 1;
		}
		ElementAfterTraitement.push({
			className: `text-2xl transition-colors ${
				isWordSpelledCorrectly ? "text-green-500" : "text-red-500"
			} ${i === recognizedWords.length - 1 ? "underline" : ""} `,
			value: referenceWord,
		});
		return (
			<span
				key={i}
				className={`text-2xl transition-colors mr-[0.5rem] ${
					isWordSpelledCorrectly ? "text-green-500" : "text-red-500"
				} ${i === recognizedWords.length - 1 ? "underline" : ""}`}
			>
				{referenceWord}
			</span>
		);
	});
	if (isReadyToDispatch) {
		console.log("Dispatch change");
		dispatch(getAccuracy(calcAccuracy));
		dispatch(getAllElementForAnalyse(ElementAfterTraitement));
	}
	return <>{returnedObj}</>;
};

export default ScriptComparison;
