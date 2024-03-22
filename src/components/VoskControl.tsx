import {useState, useEffect} from "react";
import {IpcRenderer} from "electron";
import MicState from "./MicState.tsx";

const ipcRenderer = (window as any).ipcRenderer as IpcRenderer;

function VoskControl() {
	const [isRunning, setIsRunning] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		ipcRenderer.on("vosk-status", (_event, started) => {
			console.log(
				"Received vosk-status event: ",
				started ? "started" : "stopped",
			);
			setIsRunning(started);
			setIsLoading(false); // Stop loading when status is received
		});

		return () => {
			ipcRenderer.removeAllListeners("vosk-status");
		};
	}, []);

	function startVosk() {
		setIsLoading(true); // Start loading when the button is clicked
		ipcRenderer.send("start-recognition");
	}

	function stopVosk() {
		ipcRenderer.send("stop-recognition");
	}

	return (
		<div>
			<button
				onClick={isRunning ? stopVosk : startVosk}
				disabled={isLoading}
				className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
			>
				{isLoading ? "Loading..." : isRunning ? "Stop Vosk" : "Start Vosk"}
			</button>
			<MicState />
		</div>
	);
}

export default VoskControl;
