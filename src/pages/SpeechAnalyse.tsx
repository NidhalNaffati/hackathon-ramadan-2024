import {Link} from "react-router-dom";
import {useAppSelector} from "../store/hooks";

function SpeechAnalyse() {
	const message = useAppSelector((state) => state.text.message);
	return (
		<div>
			{message == "" && (
				<div className="flex justify-center">
					<Link
						to={"/Transcription"}
						className="my-[1rem] inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-[#333] hover:bg-[#444] text-white mb-[1rem]"
					>
						To get feedback read something first
					</Link>
				</div>
			)}
			{message != "" && (
				<div>
					<h1>This is your feedback</h1>
					<div>
						<span>Total number of words :</span>
						<span>Title :</span>
						<span>Accuracy:</span>
						<span>Spelling mistakes:</span>
					</div>
				</div>
			)}
		</div>
	);
}

export default SpeechAnalyse;
