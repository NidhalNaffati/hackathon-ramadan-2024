import React from "react";

interface NavigationProps {
	goToPreviousParagraph: () => void;
	goToNextParagraph: () => void;
	reset: () => void;
	isPreviousDisabled: boolean;
	isNextDisabled: boolean;
}

const Navigation: React.FC<NavigationProps> = ({
	goToPreviousParagraph,
	goToNextParagraph,
	reset,
	isPreviousDisabled,
	isNextDisabled,
}) => {
	return (
		<div>
			<button
				className="bg-gray-500 font-sans text-base px-5 py-2 rounded-md cursor-pointer"
				onClick={goToPreviousParagraph}
				disabled={isPreviousDisabled}
			>
				⬅️
			</button>

			<button
				className="bg-gray-500 font-sans text-base px-5 py-2 rounded-md cursor-pointer mx-2"
				onClick={reset}
			>
				Reset
			</button>

			<button
				className=" bg-gray-500 font-sans text-base px-5 py-2 rounded-md cursor-pointer"
				onClick={goToNextParagraph}
				disabled={isNextDisabled}
			>
				➡️
			</button>
		</div>
	);
};

export default Navigation;
