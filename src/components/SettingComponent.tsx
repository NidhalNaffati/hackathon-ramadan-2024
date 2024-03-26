import React, {useState, useEffect} from "react";
import {useTranslation} from "react-i18next";
import {IpcRenderer} from "electron";

const ipcRenderer: IpcRenderer = window.ipcRenderer;

interface Settings {
	language: string;
	theme: string;
	wordSimilarityPercentage: string;
}

const SettingComponent: React.FC = () => {
	const [settings, setSettings] = useState<Settings>({
		language: "",
		theme: "",
		wordSimilarityPercentage: "",
	});
	const {t, i18n} = useTranslation();

	useEffect(() => {
		const fetchSettings = async () => {
			try {
				const response = (await ipcRenderer.invoke("get-settings")) as Settings;
				setSettings(response);

				// set the app language
				i18n.changeLanguage(response.language).then(
					() => console.log("Language changed successfully!"),
					(error) => console.error("Error changing language:", error),
				);
			} catch (error) {
				console.error("Error fetching settings:", error);
			}
		};

		fetchSettings().then(
			() => console.log("Settings fetched successfully!"),
			(error) => console.error("Error fetching settings:", error),
		);
	}, [i18n]);

	const handleChange = (event: React.FormEvent<HTMLFormElement>) => {
		const target = event.target as HTMLInputElement | HTMLSelectElement;
		setSettings({
			...settings,
			[target.name]: target.value as string,
		});
	};

	const handleLanguageChange = (language: string) => {
		i18n.changeLanguage(language).then(
			() => console.log("Language changed successfully!"),
			(error) => console.error("Error changing language:", error),
		);
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
			const defaultSettings = (await ipcRenderer.invoke(
				"get-default-settings",
			)) as Settings;
			setSettings(defaultSettings);
			ipcRenderer.send("save-settings", defaultSettings);
			console.log("Settings restored to defaults successfully!");
		} catch (error) {
			console.error("Error restoring settings:", error);
		}
	};

	return (
		<>
			<div className=" w-[400px] border rounded-md border-white mx-auto m-[1rem] p-[15px]">
				<h2>{t("navigation:settings")}</h2>
				<form onChange={handleChange}>
					<label htmlFor="language">{t("language")}:</label>
					<select
						id="language"
						name="language"
						className="text-black"
						onChange={(e) => handleLanguageChange(e.target.value)}
						defaultValue={settings.language}
					>
						<option value="ar">عربي</option>
						<option value="en">{t("English")}</option>
					</select>
					<br />
					<label htmlFor="theme">{t("Theme")}:</label>
					<select
						id="theme"
						name="theme"
						className="text-black"
						value={settings.theme}
					>
						<option value="dark">{t("Dark")}</option>
						<option value="light">{t("light")}</option>
					</select>
					<br />
					<label htmlFor="wordSimilarityPercentage">
						{t("Word Similarity Percentage")}:
					</label>
					<input
						type="number"
						id="wordSimilarityPercentage"
						name="wordSimilarityPercentage"
						min="0"
						max="100"
						className="text-black"
						value={settings.wordSimilarityPercentage}
					/>
					<br />
				</form>
			</div>
			<div className="flex items-center justify-center">
				<button
					className={
						"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
					}
					onClick={handleSaveSettings}
				>
					Save Settings
				</button>
				<button
					className={
						"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
					}
					onClick={handleRestoreDefaults}
				>
					Restore Defaults
				</button>
			</div>
		</>
	);
};

export default SettingComponent;
