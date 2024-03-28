import SpeechToTextAnalyzer from "../components/SpeechToTextAnalyzer.tsx";

export default function Transcription() {
	return (
		<div className="items-center justify-center min-h-screen">
			<div className="mx-auto">
				<SpeechToTextAnalyzer />
			</div>
		</div>
	);
}
