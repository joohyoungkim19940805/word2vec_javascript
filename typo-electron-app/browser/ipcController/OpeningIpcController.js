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
			console.log(app.getPath('home').replace(/\\/g, '/'))
			//return allDirectoryPathScanning.allDirtoryScaninng(app.getPath('home').replace(/\\/g,'/'))
			return await allDirectoryPathScanning.allDriveScaninng()
			//return allDirectoryPathScanning.allDirtoryScaninng('C:/')
			.then(()=>{
				console.log('done !!!!! ::: ', allDirectoryPathScanning.userDirtoryList.length);
				

				allDirectoryPathScanning.userDirtoryMapper = Object.entries( allDirectoryPathScanning.userDirtoryMapper );
				allDirectoryPathScanning.userFileExtensionMapper = Object.entries( allDirectoryPathScanning.userFileExtensionMapper );
				/*
				allDirectoryPathScanning.dataWrite(allDirectoryPathScanning.userDirtoryList, 'userDirtoryList')
				.then( () => allDirectoryPathScanning.dataWrite(allDirectoryPathScanning.userDirtoryMapper, 'userDirtoryMapper') )
				.then( () => allDirectoryPathScanning.dataWrite(allDirectoryPathScanning.userFileList, 'userFileMapper') )
				.then( () => allDirectoryPathScanning.dataWrite(allDirectoryPathScanning.userFileExtensionMapper, 'userFileExtensionMapper') )
				.then( () => allDirectoryPathScanning.dataWrite(allDirectoryPathScanning.statsList, 'statsMapper', false) )
				*/
				return allDirectoryPathScanning.userDirtoryList.length;
			});
		})
		
		ipcMain.handle('getUserDirtoryList', () => {
			return allDirectoryPathScanning.userDirtoryList.splice(0,100000);
		})
		ipcMain.handle('getUserDirtoryMapper', ()=> {
			try{
				return allDirectoryPathScanning.userDirtoryMapper.splice(0,100000);
			}finally{
				if(allDirectoryPathScanning.userDirtoryMapper.length == 0){
					allDirectoryPathScanning.userDirtoryMapper = null;
				}
			}
		})
		ipcMain.handle('getUserFileMapper', () => {
			try{
				return allDirectoryPathScanning.userFileList.splice(0,100000);
			}finally{
				if(allDirectoryPathScanning.userFileList.length == 0){
					allDirectoryPathScanning.userFileList = null;
				}
			}
		})
		ipcMain.handle('getUserFileExtensionMapper', () => {
			try{
				return allDirectoryPathScanning.userFileExtensionMapper.splice(0,1);
			}finally{
				if(allDirectoryPathScanning.userFileExtensionMapper.length == 0){
					allDirectoryPathScanning.userFileExtensionMapper = null;
				}
			}
		})
		ipcMain.handle('getStatsMapper', () => {
			try{
				return allDirectoryPathScanning.statsList.splice(0,100000);
			}finally{
				if(allDirectoryPathScanning.statsList.length == 0){
					allDirectoryPathScanning.statsList = null;
				}
			}
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
	testFunWord2Vec(){
		const tf = require('@tensorflow/tfjs');
		const tokens = 'Mary and Samantha arrived at the bus station early but waited until noon for the bus.'.match(/[^\s\.]+/g);
		
		//단어 인코딩... 각 단어를 숫자로 표현하는 것
		const coding = tokens.reduce( (obj, token, index) => {
			if( ! obj.encoding.hasOwnProperty(token) ){
				//pair
				obj.encoding[token] = index;
				//unpair
				obj.decoding[index] = token;
			}
			if(tokens.length - 1 == index){
				obj.count = (index + 1)
			}
			return obj;
		}, { encoding : {}, decoding : {}, count : 0 });

		let vocab_size = coding.count;

		// training data start
		let data = [];
		/**
		 * 왜 3으로 안하지.. 차원 갯수에 대한 명시를 위한 이유?
		 * 벡터가 1이고 윈도우의 크기가 2라서 ???
		 * 3 + 1 인경우 데이터 예시 = Array 3 : ['and', 'Mary'], 4 : ['and', 'Samantha'], 5: ['and', 'arrived'], 6 : ['and', 'at']
		 * 2 + 1 인경우 데이터 예시 = Array 3 : ['and', 'Mary'], 4 : ['and', 'Samantha'], 5: ['and', 'arrived']
		 */
		let windowSize = 2 + 1; 
		for( let i = 0, i_len = tokens.length ; i < i_len ; i += 1 ){
			let token = tokens[i];
			for( let j = i - windowSize, j_len = i + windowSize ; j < j_len ; j += 1 ){
				if( j > -1 && j != i && j < i_len ){
					data.push( [token, tokens[j]] );
				}
			}
		}
		// training data end
		console.log(data);
		//prepare training data
		let x_train_data = [];
		let y_train_data = [];
		data.forEach( ([pair_x, pair_y]) => {
			let x = tf.oneHot(coding.encoding[pair_x], vocab_size);
			let y = tf.oneHot(coding.encoding[pair_y], vocab_size);
			x_train_data.push(x);
    		y_train_data.push(y);
		});

		let x_train = tf.stack(x_train_data);
		let y_train = tf.stack(y_train_data);

		console.log(x_train.shape);
		console.log(y_train.shape);
		
		//vocab_size,vocab_size
		//build_model
		const model = tf.sequential();
		model.add(
			tf.layers.dense({
				units: 2,
				inputShape: vocab_size,
				name:'embedding'
			})
		);
		model.add(
			tf.layers.dense({
				units: vocab_size,
				kernelInitializer: 'varianceScaling',
				activation: 'softmax'
			})
		);
		model.compile({
			optimizer: tf.train.adam(),
			loss: tf.losses.softmaxCrossEntropy,
			metrics: ['accuracy']
		});
		const batchSize = 1024;
		const bufferSize = 10000;
		model.fit(x_train, y_train, {
			batchSize,
			bufferSize,
			shuffle: true,
		});
		console.log('Training complete')
		//model.getLayer('embedding').getWeights[0]
		let layer = model.getLayer('embedding');
		let weights = layer.getWeights();
		console.log('layer>>>>> ', layer);
		console.log('weights>>>>> ', weights);

	}
}
const openingIpcController = new OpeningIpcController();
module.exports = openingIpcController