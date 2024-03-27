import {useRef, useState} from "react";
import {useAppDispatch} from "../store/hooks";
import {getUserMessage} from "../store/features/getAigeneratedText";

const TextAiGenerator: React.FC = () => {
	const [isWriteSomthing, setIsWriteSomthing] = useState<boolean>(false);
	const [isNeedSuggestion, setIsNeedSuggestion] = useState<boolean>(false);
	const [defaultInputValue, setDefautlInputValue] = useState<string>("");
	const userMessage = useRef<HTMLInputElement>(null);
	const dispatch = useAppDispatch();
	const suggestions: string[] = [
		"The Magic Garden Adventure",
		"The Curious Case of Charlie and the Lost Kite",
		"The Secret of the Enchanted Forest",
		"Milly and the Mysterious Treasure Map",
	];
	return (
		<>
			<div className="flex flex-col items-center justify-center text-white p-4">
				<div className="">
					{!isNeedSuggestion && (
						<button
							className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-[#333] hover:bg-[#444] text-white mb-[1rem]"
							onClick={() => {
								setIsNeedSuggestion(!isNeedSuggestion);
							}}
						>
							Suggestions?
						</button>
					)}

					{isNeedSuggestion && (
						<div className="grid grid-cols-2 gap-4 mb-8">
							{suggestions.map((value, index) => {
								return (
									<button
										key={index}
										className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-[#333] hover:bg-[#444] text-white"
										onClick={() => {
											setDefautlInputValue(value);
											if (!isWriteSomthing) {
												setIsWriteSomthing(true);
											}
										}}
									>
										{value}
									</button>
								);
							})}
						</div>
					)}
				</div>
				<div className="flex w-full max-w-md items-center border border-gray-600 rounded-full px-4 py-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="text-gray-400 h-6 w-6"
					>
						<path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"></path>
					</svg>
					<input
						placeholder="What you want to read today?"
						className="bg-transparent flex-1 border-none text-white placeholder-gray-400 ml-4 mr-2 py-1 px-2 focus:ring-0 outline-none"
						type="text"
						defaultValue={defaultInputValue}
						onChange={(event) => {
							if (!isWriteSomthing || event.target.value != "") {
								setIsWriteSomthing(true);
							} else if (event.target.value == "") {
								setIsWriteSomthing(false);
							}
						}}
						ref={userMessage}
					/>
					<button
						type={"button"}
						onClick={() => {
							if (!isWriteSomthing) {
								alert(
									"Before you click the button, make sure to write about what you want to read.",
								);
							} else {
								dispatch(getUserMessage(userMessage.current!.value));
							}
						}}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="text-gray-400 h-6 w-6 cursor-pointer"
						>
							<path d="m22 2-7 20-4-9-9-4Z"></path>
							<path d="M22 2 11 13"></path>
						</svg>
					</button>
				</div>
			</div>
		</>
	);
};

export default TextAiGenerator;
