document.getElementById('btn').onclick = () => {
	console.log(window);
	console.log(window.myAPI);
	window.myAPI.setTitle1(document.getElementById('title').value);	
}

document.getElementById('openFileBtn').onclick = async () => {
	const filePath = await window.myAPI.openFile();
	document.getElementById('showFilePath').textContent = filePath;
}