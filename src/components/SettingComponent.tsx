import React, {useState, useEffect} from "react";
import {IpcRenderer} from "electron";
import {useTranslation} from "react-i18next";

const ipcRenderer: IpcRenderer = window.ipcRenderer;

interface Settings {
	language: string;
	theme: string;
	wordSimilarityPercentage: string;
}
interface Language {
	nativeName: string;
}

const lngs: {[key: string]: Language} = {
	en: {nativeName: "English"},
	ar: {nativeName: "Arabic"},
};
const SettingComponent: React.FC = () => {
	const [settings, setSettings] = useState<Settings>({
		language: "arabic",
		theme: "dark",
		wordSimilarityPercentage: "85",
	});
	const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
	const [languge, setLanguage] = useState<"ar" | "en">("ar");
	// this i18next useTranslation for changing language from rendered process
	const {t, i18n} = useTranslation();
	useEffect(() => {
		const fetchSettings = async () => {
			try {
				const response = (await ipcRenderer.invoke("get-settings")) as Settings;
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
			if (i18n.resolvedLanguage !== languge) {
				i18n.changeLanguage(languge);
			}
			//Dark mode
			if (isDarkMode) {
				document.documentElement.classList.add("dark");
				localStorage.theme = "dark";
			} else {
				document.documentElement.classList.remove("dark");
				localStorage.theme = "light";
			}

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
			<div className="settings-container w-[400px] border rounded-md border-white mx-auto m-[1rem] p-[15px]">
				<form onChange={handleChange}>
					<div
						className={
							i18n.resolvedLanguage == "ar"
								? "direction mb-[1rem] flex items-center gap-3"
								: "mb-[1rem] flex items-center gap-3"
						}
					>
						<label htmlFor="language" className="w-[140px]">
							{t("language")}:
						</label>
						{/*
							<select
								id="language"
								name="language"
								className="text-black"
								defaultValue={
									i18n.resolvedLanguage == "ar" ? "arabic" : "english"
								}
								onChange={() => {}}
							>
								<option value="ar">Arabic</option>
								<option value="en">English</option>
							</select> */}
						{Object.keys(lngs).map((lng) => (
							<button
								key={lng}
								type="button"
								className={
									languge === lng
										? "hidden"
										: "text-white border border-white rounded-sm px-[5px]"
								}
								onClick={() => {
									setLanguage(languge == "ar" ? "en" : "ar");
								}}
							>
								{lngs[lng].nativeName}
							</button>
						))}
					</div>
					<div
						className={
							i18n.resolvedLanguage == "ar"
								? "direction mb-[1rem] flex items-center gap-3 "
								: "mb-[1rem] flex items-center gap-3"
						}
					>
						<label htmlFor="theme" className="w-[140px]">
							{t("Theme")}:
						</label>
						<select
							id="theme"
							name="theme"
							className="text-black"
							defaultValue={"light"}
							onChange={() => {
								setIsDarkMode(!isDarkMode);
							}}
						>
							<option value="dark">{t("Dark")}</option>
							<option value="light">{t("Light")}</option>
						</select>
					</div>
					<div
						className={
							i18n.resolvedLanguage == "ar"
								? "direction mb-[1rem] flex items-center gap-3 "
								: "mb-[1rem] flex items-center gap-3"
						}
					>
						<label htmlFor="wordSimilarityPercentage" className="w-[140px]">
							{t("Word Similarity Percentage")}:
						</label>
						<input
							type="number"
							id="wordSimilarityPercentage"
							name="wordSimilarityPercentage"
							min="0"
							max="100"
							className="text-black"
							defaultValue={settings.wordSimilarityPercentage}
						/>
					</div>
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
