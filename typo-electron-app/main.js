// 일렉트론 모듈 호출
const { app, BrowserWindow } = require('electron');
// path 모듈 호출
const path = require('path');

console.log('BrowserWindow', BrowserWindow);
// 창을 만드는 함수를 정의한다.
const createWindow = () => {
    const win = new BrowserWindow({
        width : 800,
        height : 600,
        webPreferences : {
            preload : path.join(__dirname, 'preload.js')
        }
    })
    console.log('win', win);
    win.loadFile('index.html');
    // Open the DevTools.
    //mainWindow.webContents.openDevTools()
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
console.log('app', app);
console.log('process', process)