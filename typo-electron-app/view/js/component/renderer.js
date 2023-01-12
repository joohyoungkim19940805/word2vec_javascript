/*


document.getElementById('openFileBtn').onclick = async () => {
	const filePath = await window.myAPI.openFile();
	console.log(filePath);
	document.getElementById('showFilePath').textContent = filePath;
}
*/
window.addEventListener('load', () => {
	//console.log(window.myAPI);
	setTimeout(()=>{
		window.myAPI.scanningUserDirectory().then(e=>alert(e));
	}, 2500)
	window.myAPI.setTitle1('test');	
})
document.getElementById('testBtn').onclick = () => {
	window.myAPI.setTitle1('');
	//console.log(window.myAPI);
	//window.myAPI.scanningUserDirectory().then(e=>console.log(e));
		
}