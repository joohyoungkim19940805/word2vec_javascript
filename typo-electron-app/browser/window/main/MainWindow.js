/**
 * path 모듈 불러오기
 */
const path = require('path');

/**
 * 메인 윈도우를 만들기 위해 일렉트론 모듈에서 브라우저 윈도우를 가져온다. 
 */
const {BrowserWindow} = require('electron');

/**
 * 메인화면에서 사용 할 윈도우를 정의한다.
 * @author mozu123
 * @constructor
 * @extends BrowserWindow
 */
class MainWindow extends BrowserWindow{
	/**
	 * 메인 윈도우의 생성자
	 * @author mozu123
	 */
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