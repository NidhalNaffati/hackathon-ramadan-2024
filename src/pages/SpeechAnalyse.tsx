import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

function SpeechAnalyse() {
	const [isReadText, setIsReadText] = useState<boolean>(false);
	useEffect(() => {}, []);
	return (
		<div>
			{!isReadText && (
				<div className="w-full">
					<Link
						to={"/Transcription"}
						className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-[#333] hover:bg-[#444] text-white mb-[1rem]"
					>
						To get feedback read something first
					</Link>
				</div>
			)}
		</div>
	);
}

export default SpeechAnalyse;
