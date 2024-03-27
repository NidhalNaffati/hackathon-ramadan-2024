import SpeechToTextAnalyzer from "../components/SpeechToTextAnalyzer.tsx";
import TextAiGenerator from "../components/TextAiGenerator.tsx";

export default function Transcription() {
	return (
		<div className="items-center justify-center min-h-screen">
			<TextAiGenerator />
			<div className="mx-auto">
				<SpeechToTextAnalyzer />
			</div>
		</div>
	);
}
