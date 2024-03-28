import React, {useState, useEffect, useRef} from "react";
import ScriptComparison from "./ScriptComparison.tsx";
import Navigation from "./Navigation.tsx";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useTranslation} from "react-i18next";
import useTextAnalyzerHooks from "../hooks/useTextAnalyzerHooks.tsx";
import VoskControl from "./VoskControl.tsx";
import {useAppDispatch, useAppSelector} from "../store/hooks.ts";
import TextAiGenerator from "./TextAiGenerator.tsx";
import {
	getTotalNumberWords,
	getUserMessage,
} from "../store/features/getAigeneratedText.tsx";
function SpeechToTextAnalyzer() {
	const message = useAppSelector((state) => state.text.message);
	const dispatch = useAppDispatch();
	const {i18n} = useTranslation();
	const [referenceText, setReferenceText] = useState<string>("");

	const [isReferenceTextReady, setIsReferenceTextReady] =
		useState<boolean>(false);
	const [userChoice, setUserChoice] = useState<"ai" | "user" | "none">("none");
	const [isEntreTitle, setIsEnterTitle] = useState<boolean>(true);
	const inputRef = useRef<HTMLInputElement>(null);
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
					console.log(data.content[0].text);
					console.log("message uploaded");
				}
			} catch (error) {
				console.error("Error:", error);
			}
		}
		if (message != "" && userChoice == "ai") {
			fetchMessageFromServer(message);
		}
	}, [message, userChoice]);
	// get total number of words
	const refernceTextWord = referenceText;
	const textWordNumber: number = refernceTextWord
		.split(/\s+/)
		.filter(Boolean).length;
	dispatch(getTotalNumberWords(textWordNumber));
	const referenceParagraphs: string[] = referenceText.split("\n");
	if (referenceParagraphs[0] != "") {
		const referenceParagraphs: string[] = referenceText
			.split("\n")
			.filter((item) => item != "");
		console.log(referenceParagraphs);
	}
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
			<div className="flex items-center gap-4 justify-center mt-[1rem] mb-[1rem]">
				<button
					className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-[#333] hover:bg-[#444] text-white mb-[1rem]"
					onClick={() => {
						setUserChoice("ai");
						setIsReferenceTextReady(!isReferenceTextReady);
					}}
				>
					Ai generated story
				</button>
				<button
					className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-[#333] hover:bg-[#444] text-white mb-[1rem]"
					onClick={() => {
						setUserChoice("user");
						setIsReferenceTextReady(!isReferenceTextReady);
					}}
				>
					Read your own text
				</button>
			</div>
			{userChoice == "user" && (
				<div
					className={`flex items-center justify-center m-6 
					${isReferenceTextReady ? "hidden" : "block"} flex flex-col items-center justify-center`}
				>
					<input
						className="bg-transparent flex-1 border w-[495px] mb-[1rem] text-white placeholder-gray-400 ml-4 mr-2 py-1 px-2 focus:ring-0 outline-none"
						type="text"
						placeholder="Entre your title here before continue"
						defaultValue={""}
						onChange={() => {
							if (isEntreTitle) {
								setIsEnterTitle(false);
							}
						}}
						ref={inputRef}
					/>
					<textarea
						value={referenceText}
						onChange={handleInputChange}
						rows={10}
						cols={50}
						disabled={isEntreTitle}
						placeholder="Enter reference text here"
						className={`text-black outline-none max-w-none text-lg px-8 py-5 caret-yellow-500 prose prose-invert prose-p:my-3 prose-p:leading-relaxed prose-headings:my-4 prose-blockquote:my-4 prose-ul:my-2 prose-li:my-0 prose-code:px-1 prose-code:text-red-500 prose-code:before:content-[''] prose-code:after:content-['']`}
					/>
					<button
						className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2`}
						onClick={() => {
							setIsReferenceTextReady(true);
							dispatch(getUserMessage(inputRef.current!.value));
						}}
					>
						finish
					</button>
				</div>
			)}
			{userChoice == "ai" && <TextAiGenerator />}
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
						i18n.resolvedLanguage == "ar"
							? "scriptComparison direction-rtl"
							: "scriptComparisons direction-ltr"
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
