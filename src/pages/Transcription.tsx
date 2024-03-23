import VoskControl from "../components/VoskControl.tsx";
import SpeechToTextAnalyzer from "../components/SpeechToTextAnalyzer.tsx";

export default function Transcription() {
	return (
		<div className="items-center justify-center min-h-screen">
			<div className="mb-8 mx-auto">
				<VoskControl />
			</div>
			<div className="mx-auto">
				<SpeechToTextAnalyzer />
			</div>
		</div>
	);
}
