const path = require('path');
const fs = require('fs');
const { app, BrowserWindow, ipcMain, shell } = require('electron');
const allDirectoryPathScanning = require(path.join(__project_path, 'browser/service/AllDirectoryPathScanning.js'))

class MainIpcController {
	constructor() {
		this.addIpcMainEvents()
	}

	addIpcMainEvents(){
		ipcMain.on('set-title1', (event, title)=>{
			console.log('ipcMain<<',title)
			let webContent = event.sender;
			let win = BrowserWindow.fromWebContents(webContent);
			win.setTitle(title);
		})
		/**
		 * dialog:IPC 채널 이름 의 접두사는 코드에 영향을 미치지 않습니다. 
		 * 코드 가독성에 도움이 되는 네임스페이스 역할만 합니다.
		 */
		ipcMain.handle('dialog:openFile', async () => {
			//const { canceled, filePaths } = await dialog.showOpenDialog({properties:['openDirectory','openFile']});
			//console.log(filePaths);
			//if( canceled ){
			//	return
			//} else {
				//shell.openPath('C:/dev/sts-4.6.1.RELEASE/SpringToolSuite4.exe')
				//return fs.readdirSync(app.getPath('downloads'))
			//}
			console.log(allDirectoryPathScanning.userDirtoryList)
			console.log(allDirectoryPathScanning.userDirtoryMapper['G:/FOUND.000'])
			
			//console.log(allDirectoryPathScanning.userDirtoryMapper)
			return allDirectoryPathScanning.userDirtoryMapper['G:/FOUND.000'];
		})
	}
}
const mainIpcController = new MainIpcController();
module.exports = mainIpcController