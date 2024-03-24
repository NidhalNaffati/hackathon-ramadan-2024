import React, { useState, useEffect } from "react";
import { IpcRenderer } from "electron";

const ipcRenderer: IpcRenderer = window.ipcRenderer;

interface Settings {
	language: string;
	theme: string;
	wordSimilarityPercentage: string;
}

const SettingComponent: React.FC = () => {
	const [settings, setSettings] = useState<Settings>({
		language: "arabic",
		theme: "dark",
		wordSimilarityPercentage: "85",
	});

	useEffect(() => {
		const fetchSettings = async () => {
			try {
				const response = await ipcRenderer.invoke("get-settings") as Settings;
				setSettings(response);
			} catch (error) {
				console.error("Error fetching settings:", error);
			}
		};

		fetchSettings().then(
			() => console.log("Settings fetched successfully!"),
			(error) => console.error("Error fetching settings:", error),
		);
	}, []);

	const handleChange = (event: React.FormEvent<HTMLFormElement>) => {
		const target = event.target as HTMLInputElement | HTMLSelectElement;
		setSettings({
			...settings,
			[target.name]: target.value as string,
		});
	};

	const handleSaveSettings = async () => {
		try {
			ipcRenderer.send("save-settings", settings);
			console.log("Settings saved successfully!");
		} catch (error) {
			console.error("Error saving settings:", error);
		}
	};

	const handleRestoreDefaults = async () => {
		try {
			const defaultSettings = await ipcRenderer.invoke("get-default-settings") as Settings;
			setSettings(defaultSettings);
			ipcRenderer.send("save-settings", defaultSettings);
			console.log("Settings restored to defaults successfully!");
		} catch (error) {
			console.error("Error restoring settings:", error);
		}
	};

	return (
		<div className="settings-container">
			<h2>Settings</h2>
			<form onChange={handleChange}>
				<label htmlFor="language">Language:</label>
				<select id="language" name="language" value={settings.language}>
					<option value="arabic">Arabic</option>
					<option value="english">English</option>
				</select>
				<br />
				<label htmlFor="theme">Theme:</label>
				<select id="theme" name="theme" value={settings.theme}>
					<option value="dark">Dark</option>
					<option value="light">Light</option>
				</select>
				<br />
				<label htmlFor="wordSimilarityPercentage">Word Similarity Percentage:</label>
				<input
					type="number"
					id="wordSimilarityPercentage"
					name="wordSimilarityPercentage"
					min="0"
					max="100"
					value={settings.wordSimilarityPercentage}
				/>
				<br />
			</form>
			<button
				className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"}
				onClick={handleSaveSettings}>Save Settings
			</button>
			<button
				className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"}
				onClick={handleRestoreDefaults}>Restore Defaults
			</button>
		</div>
	);
};

export default SettingComponent;
