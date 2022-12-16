// 일렉트론 모듈 호출
const { app, BrowserWindow, ipcMain, dialog, shell } = require('electron');
// path 모듈 호출
const path = require('path');

//console.log('BrowserWindow', BrowserWindow);
// 창을 만드는 함수를 정의한다.
const createWindow = () => {
	const win = new BrowserWindow({
		width : 800,
		height : 600,
		webPreferences : {
			preload : path.join(__dirname, 'preload.js')
		},
		autoHideMenuBar : true,
		title : 'Hello Rad'
	})

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
		const { canceled, filePaths } = await dialog.showOpenDialog({properties:['openDirectory','openFile']});
		console.log(filePaths);
		if( canceled ){
			return
		} else {
			return filePaths[0]
		}
	})

	//console.log('win', win);
	win.loadFile('index.html');
	// Open the DevTools.
	win.webContents.openDevTools()
}

// app이 실행 될 때 프로미스를 반환할 때 창을 만든다.
app.whenReady().then(()=>{
	createWindow()

	//앱이 활성화 되었을 때의 이벤트를 정의한다.
	//mac os 의 경우 창이 열려있지 않아도 백그라운드에서 계속 실행 상태이다.
	app.on('activate', ()=>{
	// 가용 가능한 창이 없을 경우..
		if(BrowserWindow.getAllWindows().length === 0){
			// 창을 띄운다.
			createWindow();
		}
	});
});

// 창을 종료하였을 때의 이벤트를 정의한다.
// 윈도우 및 리눅스의 경우 창을 종료할 시 응용 프로그램이 완전히 종료되어야 한다.
app.on('window-all-closed', ()=>{
	//mac os가 아닌 경우... ! darwin
	if(process.platform !== 'darwin'){
		// 이 응용 프로그램을 종료시킨다.
		app.quit();
	}
});
//console.log('process', process)
console.log('hoem ::: ', app.getPath('home'))
//console.log('hoem showItemInFolder ::: ', shell.showItemInFolder(app.getPath('home')))

console.log('appData ::: ', app.getPath('appData'))
//console.log('appData showItemInFolder ::: ', shell.showItemInFolder(app.getPath('appData')))

console.log('userData ::: ', app.getPath('userData'))
//console.log('userData showItemInFolder ::: ', shell.showItemInFolder(app.getPath('userData')))

console.log('sessionData ::: ', app.getPath('sessionData'))
console.log('exe ::: ', app.getPath('exe'))
console.log('module ::: ', app.getPath('module'))

console.log('desktop ::: ', app.getPath('desktop'))
//console.log('desktop showItemInFolder ::: ', shell.showItemInFolder(app.getPath('desktop')))

console.log('documents ::: ', app.getPath('documents'))
//console.log('documents showItemInFolder ::: ', shell.showItemInFolder(app.getPath('documents')))

console.log('downloads ::: ', app.getPath('downloads'))
//console.log('downloads showItemInFolder ::: ', shell.showItemInFolder(app.getPath('downloads')))

console.log('music ::: ', app.getPath('music'))
//console.log('music showItemInFolder ::: ', shell.showItemInFolder(app.getPath('music')))

console.log('pictures ::: ', app.getPath('pictures'))
//console.log('music pictures ::: ', shell.showItemInFolder(app.getPath('pictures')))

console.log('videos ::: ', app.getPath('videos'))
//console.log('videos pictures ::: ', shell.showItemInFolder(app.getPath('videos')))

console.log('recent ::: ', app.getPath('recent'))
//console.log('recent pictures ::: ', shell.showItemInFolder(app.getPath('recent')))

console.log('logs ::: ', app.getPath('logs'))
//console.log('crashDumps ::: ', app.getPath('crashDumps'))


//console.log('recent pictures ::: ', shell.showItemInFolder('C:/dev/sts-4.6.1.RELEASE'))
//console.log('recent pictures ::: ', shell.showItemInFolder('C:/dev/sts-4.6.1.RELEASE/test'))
//console.log('recent pictures ::: ', shell.openPath('C:/dev/sts-4.6.1.RELEASE/SpringToolSuite4.exe'))

const fs = require('fs');

/*
// Callback
fs.readdir(app.getPath('downloads'), (err, files) => {
    console.log(files);
})
// Sync
fs.readdirSync(app.getPath('downloads'))
*/

const roots = fs.readdirSync('/')
/*
roots.then((error, result)=>{
	console.log(result);
})
*/

console.log(roots);

