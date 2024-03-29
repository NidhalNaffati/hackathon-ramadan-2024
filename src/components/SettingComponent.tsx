import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const SettingComponent: React.FC = () => {
	const { t, i18n } = useTranslation();

	const storedLanguage = localStorage.getItem("language") || "en";
	const storedTheme = localStorage.getItem("theme") || "light";
	const storedWordSimilarityPercentage =
		parseInt(localStorage.getItem("wordSimilarityPercentage") || "70");

	const [language, setLanguage] = useState(storedLanguage);
	const [theme, setTheme] = useState(storedTheme);
	const [wordSimilarityPercentage, setWordSimilarityPercentage] = useState(
		storedWordSimilarityPercentage,
	);

	const handleLanguageChange = (language: string) => {
		i18n.changeLanguage(language).then(
			() => console.log("Language changed successfully!"),
			(error) => console.error("Error changing language:", error),
		);
		setLanguage(language);
		localStorage.setItem("language", language);
	};

	const handleThemeChange = (theme: string) => {
		console.log("Theme changed to:", theme);
		setTheme(theme);
		localStorage.setItem("theme", theme);
		// apply the theme
		document.documentElement.classList.toggle("dark", theme === "dark");
	};

	const handleWordSimilarityPercentageChange = (percentage: number) => {
		setWordSimilarityPercentage(percentage);
		localStorage.setItem("wordSimilarityPercentage", percentage.toString());
	};

	const handleRestoreDefaults = async () => {
		localStorage.setItem("language", "en");
		localStorage.setItem("theme", "light");
		localStorage.setItem("wordSimilarityPercentage", "70");
		setLanguage("en");
		setTheme("light");
		setWordSimilarityPercentage(70);

		// apply the default language
		i18n.changeLanguage("en").then(
			() => console.log("Language changed successfully!"),
			(error) => console.error("Error changing language:", error),
		);

		// apply the default theme
		document.documentElement.classList.toggle("dark", false);
	};

	return (
		<>
			<div className=" w-[400px] border rounded-md border-white mx-auto m-[1rem] p-[15px]">
				<h2>{t("navigation:settings")}</h2>
				<div>
					<label htmlFor="language">{t("Language")}: </label>
					<select
						id="language"
						value={language}
						onChange={(e) => handleLanguageChange(e.target.value)}
					>
						<option value="en">English</option>
						<option value="ar">Arabic</option>
						{/* Add more language options here */}
					</select>
				</div>
				<div>
					<label htmlFor="theme">{t("Theme")}: </label>
					<select
						id="theme"
						value={theme}
						onChange={(e) => handleThemeChange(e.target.value)}
					>
						<option value="light">Light</option>
						<option value="dark">Dark</option>
						{/* Add more theme options here */}
					</select>
				</div>
				<div>
					<label htmlFor="wordSimilarityPercentage">
						{t("Word Similarity Percentage")}:{" "}
					</label>
					<input
						type="number"
						id="wordSimilarityPercentage"
						value={wordSimilarityPercentage}
						onChange={(e) =>
							handleWordSimilarityPercentageChange(parseInt(e.target.value))
						}
					/>
				</div>
			</div>
			<div className="flex items-center justify-center">
				<button
					className={
						"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
					}
					onClick={handleRestoreDefaults}
				>
					{t("Restore Defaults Settings")}
				</button>
			</div>
		</>
	);
};

export default SettingComponent;
