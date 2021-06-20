'use strict';
const path = require('path');
const {app, BrowserWindow, Menu} = require('electron');
const {ipcMain} = require('electron');
const ipc = ipcMain;
/// const {autoUpdater} = require('electron-updater');
const {is} = require('electron-util');
const unhandled = require('electron-unhandled');
const debug = require('electron-debug');
const contextMenu = require('electron-context-menu');
const config = require('./config.js');
const menu = require('./menu.js');

const fs = require('fs')
const find = require('find-process');

unhandled();
debug();
contextMenu();

// Note: Must match `build.appId` in package.json
app.setAppUserModelId('com.company.AppName');

// Uncomment this before publishing your first version.
// It's commented out as it throws an error if there are no published versions.
// if (!is.development) {
// 	const FOUR_HOURS = 1000 * 60 * 60 * 4;
// 	setInterval(() => {
// 		autoUpdater.checkForUpdates();
// 	}, FOUR_HOURS);
//
// 	autoUpdater.checkForUpdates();
// }

// Prevent window from being garbage collected
let mainWindow;

const createMainWindow = async () => {
	const win = new BrowserWindow({
		title: app.name,
		show: false,
		width: 1280,
		height: 720,
		minWidth: 720,
		minHeight: 480,
		frame: false,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false
		}
	});
	win.on('ready-to-show', () => {
		win.show();
	});

	win.on('closed', () => {
		// Dereference the window
		// For multiple windows store them in an array
		mainWindow = undefined;
	});

	await win.loadFile(path.join(__dirname, 'index.html'));

	// CLOSE APP
	ipc.on('closeApp', () => {
		console.log('close btn clicked');
		win.close();
	});

	// MINIMIZE APP
	ipc.on('min', () => {
		console.log('minimize btn clicked');
		win.minimize();
	});

	// MAXIMIZE APP
	ipc.on('maximizeRestoreApp', () => {
		if (win.isMaximized()) {
			console.log('restore btn clicked');
			win.restore();
		} else {
			console.log('maximize btn clicked');
			win.maximize();
		}
	});
	return win;
};

// Prevent multiple instances of the app
if (!app.requestSingleInstanceLock()) {
	app.quit();
}

app.on('second-instance', () => {
	if (mainWindow) {
		if (mainWindow.isMinimized()) {
			mainWindow.restore();
		}

		mainWindow.show();
	}
});

app.on('window-all-closed', () => {
	if (!is.macos) {
		app.quit();
	}
});

app.on('activate', async () => {
	if (!mainWindow) {
		mainWindow = await createMainWindow();
	}
});

(async () => {
	await app.whenReady();
	Menu.setApplicationMenu(menu);
	mainWindow = await createMainWindow();

	let processes = await find('name', 'LeagueClientUx.exe');
	if (processes.length === 0) {
		console.log("League is currently not running.")
	} else {
		let process = processes[0];
		let cmd = process.cmd.split('"')[1]
		let cwd = cmd.replace("LeagueClientUx.exe", "");
		let fileData = fs.readFileSync(`${cwd}lockfile`, 'utf8');
		let data = fileData.split(":");
		let processName = data[0]
		let processId = data[1]
		let port = data[2]
		let password = new Buffer(`riot:${data[3]}`).toString('base64')
		let protocol = data[4]
	}
})();
