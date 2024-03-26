import { ipcMain } from "electron";
import path from "node:path";
import * as fs from "fs";
import IpcMainEvent = Electron.IpcMainEvent;

const settingsFilePath = path.join(__dirname, "..", "src", "config", "settings.json");

const defaultSettings = {
	"language": "ar",
	"theme": "light",
	"wordSimilarityPercentage": "80",
};

export function initializeSettingsIPC() {
	ipcMain.handle("get-settings", () => {
		return loadSettings();
	});


	ipcMain.on("save-settings", (_event: IpcMainEvent, settings: object) => {
		saveSettings(settings);
	});

	ipcMain.handle("get-default-settings", () => {
		return getDefaultSettings();
	});
}


function loadSettings() {
	try {
		// Check if the settings file exists
		if (!fs.existsSync(settingsFilePath)) {
			// If it doesn't exist, create it with default settings
			fs.writeFileSync(settingsFilePath, JSON.stringify(defaultSettings, null, 4), "utf8");
			console.log("Settings file created with default values.");
			return defaultSettings;
		}

		// Read the file synchronously
		const settingsData = fs.readFileSync(settingsFilePath, "utf8");
		// Parse JSON data
		const settings = JSON.parse(settingsData);
		console.log("Settings loaded:", settings);
		return settings;

	} catch (error) {
		console.error("Error reading settings:", error);
		return getDefaultSettings();
	}
}

function saveSettings(settings: object) {
	try {
		console.log("Saving settings:", settings);
		fs.writeFileSync(settingsFilePath, JSON.stringify(settings, null, 2));
	} catch (error) {
		console.error("Error saving settings:", error);
	}
}

function getDefaultSettings() {
	// write the default settings to the file
	saveSettings(defaultSettings);
	return defaultSettings;
}
