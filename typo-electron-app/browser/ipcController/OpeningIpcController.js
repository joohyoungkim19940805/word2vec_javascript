const path = require('path');
const fs = require('fs');
const { app, BrowserWindow, ipcMain, shell } = require('electron');
const allDirectoryPathScanning = require(path.join(__project_path, 'browser/service/AllDirectoryPathScanning.js'))

class OpeningIpcController {
	constructor() {
		/**
		 * dialog:IPC 채널 이름 의 접두사는 코드에 영향을 미치지 않습니다. 
		 * 코드 가독성에 도움이 되는 네임스페이스 역할만 합니다.
		 */
		ipcMain.handle(/*dialog:openFile*/'scanningUserDirectory', async (event) => {
			return allDirectoryPathScanning.allDirtoryScaninng(app.getPath('home'))
			.then(()=>{
				console.log('done !!!!! ::: ', allDirectoryPathScanning.userDirtoryList.length);
				return allDirectoryPathScanning.userDirtoryList.length;
			});
		})
		
		ipcMain.handle('getScanningProgress', (event)=>{
			return allDirectoryPathScanning.userDirtoryList.length
		})
		//this.addIpcMainEvents()
	}
	/*
	addIpcMainEvents(){
		
		//ipcMain.on('set-title1', (event, title)=>{
		//	console.log('ipcMain<<',title)
		//	let webContent = event.sender;
		//	let win = BrowserWindow.fromWebContents(webContent);
		//	win.setTitle(title);
		//})
		
	}
	*/
}
const openingIpcController = new OpeningIpcController();
module.exports = openingIpcController