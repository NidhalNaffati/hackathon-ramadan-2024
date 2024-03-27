import React, {useState, useEffect} from "react";
import ScriptComparison from "./ScriptComparison.tsx";
import Navigation from "./Navigation.tsx";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useTranslation} from "react-i18next";
import useTextAnalyzerHooks from "../hooks/useTextAnalyzerHooks.tsx";
import VoskControl from "./VoskControl.tsx";
import {useAppSelector} from "../store/hooks.ts";

function SpeechToTextAnalyzer() {
	const message = useAppSelector((state) => state.text.message);

	const {i18n} = useTranslation();
	const [referenceText, setReferenceText] = useState<string>("");

	const [isReferenceTextReady, setIsReferenceTextReady] =
		useState<boolean>(false);

	useEffect(() => {
		async function fetchMessageFromServer(message: string) {
			try {
				const response = await fetch("http://localhost:3000/api/v1/messages", {
					method: "POST", // or 'GET', 'PUT', etc.
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({message: message}), // Send userStory in the request body
				});
				if (response.ok) {
					const data = await response.json();
					setIsReferenceTextReady(true);
					setReferenceText(data.content[0].text);
					console.log("message uploaded");
				}
			} catch (error) {
				console.error("Error:", error);
			}
		}
		if (message != "") {
			fetchMessageFromServer(message);
		}
	}, [message]);

	const referenceParagraphs: string[] = referenceText.split("\n");
	console.log(referenceParagraphs);
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
