const path = require('path');
const {BrowserWindow} = require('electron');
class MainWindow extends BrowserWindow{
	constructor() {
		//console.log('__project_path in MainWindow :::', __project_path);
		super({
			width : 1200,
			height : 600,
			webPreferences : {
				preload : path.join(__project_path, 'browser/preload/main/mainPreload.js')
			},
			autoHideMenuBar : true
		})
		super.loadFile(path.join(__project_path, 'view/html/mainView.html')).then(e=>{
			console.log(e)
			super.webContents.openDevTools();
		});
	}
}

module.exports = MainWindow