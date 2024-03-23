import {useState, useEffect} from "react";
import {IpcRenderer} from "electron";
import MicState from "./MicState.tsx";

const ipcRenderer = (window as any).ipcRenderer as IpcRenderer;

function VoskControl() {
	const [isRunning, setIsRunning] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		ipcRenderer.on("vosk-status", (_event, started) => {
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
		<div className="flex items-center justify-center m-3">
			<button
				onClick={isRunning ? stopVosk : startVosk}
				disabled={isLoading}
				className={`${
					isLoading
						? "bg-gray-300 cursor-not-allowed"
						: isRunning
							? "bg-red-500"
							: "bg-green-500"
				} hover:bg-opacity-80 text-white font-semibold py-2 px-4 border rounded mx-4`}
			>
				{isLoading ? "Loading..." : isRunning ? "Stop Vosk" : "Start Vosk"}
			</button>
			<MicState />
		</div>
	);
}

export default VoskControl;
