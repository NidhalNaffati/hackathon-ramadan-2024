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
	const [isWriteMessage, setIsWriteMessage] = useState<boolean>(false);
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
				}
			} catch (error) {
				console.error("Error:", error);
			}
		}
		if (isWriteMessage == true && userChoice == "ai") {
			console.log("request send automatical");

			fetchMessageFromServer(message);
		}
	}, [isWriteMessage, userChoice, message]);
	//useEffect(() => {
	//	if (inputRef.current?.value != "") {
	//		dispatch(getUserMessage(inputRef.current!.value));
	//	}
	// }, [isReferenceTextReady, dispatch]);
	const {t} = useTranslation();
	// get total number of words
	const refernceTextWord = referenceText;
	const textWordNumber: number = refernceTextWord
		.split(/\s+/)
		.filter(Boolean).length;
	dispatch(getTotalNumberWords(textWordNumber));

	let referenceParagraphs: string[] = referenceText.split("\n");
	if (referenceText) {
		referenceParagraphs = referenceText
			.split("\n")
			.filter((item) => item != "");
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
	const handleTextMessage = (isClick: boolean) => {
		setIsWriteMessage(isClick);
	};
	return (
		<div>
			<div className="flex items-center gap-4 justify-center mt-[1rem] mb-[1rem]">
				<button
					className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-[#333] hover:bg-[#444] text-white mb-[1rem]"
					onClick={() => {
						if (userChoice == "ai") {
							setUserChoice("none");
						} else {
							setUserChoice("ai");
						}
					}}
				>
					{t("Ai generated story")}
				</button>
				<button
					className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-[#333] hover:bg-[#444] text-white mb-[1rem]"
					onClick={() => {
						if (userChoice == "user") {
							setUserChoice("none");
						} else {
							setUserChoice("user");
						}
					}}
				>
					{t("Read your own text")}
				</button>
			</div>
			{userChoice == "user" && (
				<div
					className={`flex items-center justify-center m-6 
					${isReferenceTextReady ? "hidden" : "block"} flex flex-col items-center justify-center`}
				>
					<input
						className={
							i18n.resolvedLanguage == "ar"
								? "bg-transparent flex-1 border w-[495px] mb-[1rem] text-white placeholder-gray-400 ml-4 mr-2 py-1 px-2 focus:ring-0 outline-none direction"
								: "bg-transparent flex-1 border w-[495px] mb-[1rem] text-white placeholder-gray-400 ml-4 mr-2 py-1 px-2 focus:ring-0 outline-none"
						}
						type="text"
						placeholder={t("Entre your title here before continue")}
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
						placeholder={t("Enter reference text here")}
						className={
							i18n.resolvedLanguage == "ar"
								? `text-black outline-none max-w-none text-lg px-8 py-5 caret-yellow-500 prose prose-invert prose-p:my-3 prose-p:leading-relaxed prose-headings:my-4 prose-blockquote:my-4 prose-ul:my-2 prose-li:my-0 prose-code:px-1 prose-code:text-red-500 prose-code:before:content-[''] prose-code:after:content-[''] direction`
								: `text-black outline-none max-w-none text-lg px-8 py-5 caret-yellow-500 prose prose-invert prose-p:my-3 prose-p:leading-relaxed prose-headings:my-4 prose-blockquote:my-4 prose-ul:my-2 prose-li:my-0 prose-code:px-1 prose-code:text-red-500 prose-code:before:content-[''] prose-code:after:content-['']`
						}
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
			{userChoice == "ai" && (
				<TextAiGenerator isWriteMessage={handleTextMessage} />
			)}
			<ToastContainer />
			<div
				className={`${
					isReferenceTextReady || isWriteMessage ? "block" : "hidden"
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

				{isWriteMessage && userChoice == "ai" && referenceText == "" && (
					<div className="loader"></div>
				)}

				<h2
					className={
						i18n.resolvedLanguage == "ar"
							? "scriptComparison direction"
							: "scriptComparisons"
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
