import {app, BrowserWindow, ipcMain} from "electron";
import path from "node:path";
import childProcess from "child_process";
import {startVoskProcess, stopVoskProcess} from "../src/utils/vosk-process.ts";

import IpcMainEvent = Electron.IpcMainEvent;
import * as fs from "fs";

process.env.DIST = path.join(__dirname, "../dist");
process.env.VITE_PUBLIC = app.isPackaged
	? process.env.DIST
	: path.join(process.env.DIST, "../public");

let win: BrowserWindow | null = null;
let voskProcess: childProcess.ChildProcess | null = null;

const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];

const settingsFilePath = path.join(__dirname, "..", "src", "config", "settings.json");

const defaultSettings = {
	"language": "arabic",
	"theme": "light",
	"wordSimilarityPercentage": "80",
};

console.log("settingsFilePath:", settingsFilePath);

function createWindow() {
	win = new BrowserWindow({
		width: 900,
		height: 900,
		autoHideMenuBar: true,
		alwaysOnTop: true, // true at the moment for testing
		title: "hackathon-ramadan-2024",
		icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
		webPreferences: {
			preload: path.join(__dirname, "preload.js"),
		},
	});

	// Test active push message to Renderer-process.
	win.webContents.on("did-finish-load", () => {
		win?.webContents.send("main-process-message", new Date().toLocaleString());
	});

	if (VITE_DEV_SERVER_URL) {
		win.loadURL(VITE_DEV_SERVER_URL);
	} else {
		win.loadFile(path.join(process.env.DIST, "index.html"));
	}

	ipcMain.on("start-recognition", () => {
		voskProcess = startVoskProcess(win!);
	});

	ipcMain.on("stop-recognition", () => {
		stopVoskProcess(voskProcess!, win!);
	});


	/// Settings IPC
	ipcMain.handle("get-settings", () => {
		return loadSettings();
	});

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	ipcMain.on('save-settings', (event: IpcMainEvent, settings: object) => {
		saveSettings(settings);
	});

	ipcMain.handle("get-default-settings", () => {
		return getDefaultSettings();
	});


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

}

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
		win = null;

		// Kill the server process when the Electron app is closed
		if (voskProcess) {
			console.log("Killing vosk process...");
			voskProcess.kill();
			voskProcess = null;
		}
	}
});

app.on("activate", () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

app.whenReady().then(createWindow);
