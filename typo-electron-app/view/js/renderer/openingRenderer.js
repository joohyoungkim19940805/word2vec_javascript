
/*
document.getElementById('openFileBtn').onclick = async () => {
	const filePath = await window.myAPI.openFile();
	console.log(filePath);
	document.getElementById('showFilePath').textContent = filePath;
}
*/
const openingRenderer = new class openingRenderer{
	#container = document.getElementById('container');
	#lodingBarWrapper = this.#container.querySelector('.loding_bar_wrapper');
	
	#statusWrapper = this.#lodingBarWrapper.querySelector('.status_wrapper');
	#statusText = this.#statusWrapper.querySelector('.status_text');
	
	#lodingBar = this.#lodingBarWrapper.querySelector('.loding_bar');
	#lodingProgress = this.#lodingBar.querySelector('.progress');

	constructor(){
		
		window.addEventListener('load', () => {
			// 디벨로퍼보다 빨리 실행되어 디버깅이 안되기 때문에 지연을 넣는다.
			setTimeout(()=>{
				let step_1__interval = this.step_1__scanningProgress()
				window.myAPI.scanningUserDirectory().then(len => {
					clearInterval(step_1__interval);
					step_1__interval = null;
					this.#statusText.textContent = `${len} 건 스캔 완료`
					//document.querySelector('a#move_page_test').click();
				});
			}, 1500)	
		});

	}

	step_1__scanningProgress(){
		return setInterval(()=>{
			window.myAPI.getScanningProgress().then(len=>{
				this.#statusText.textContent = `${len} 건 스캔 진행 중`
			})
		},50);
	}

}();
