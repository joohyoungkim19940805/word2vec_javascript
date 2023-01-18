/**
 * c,d 등 드라이버 정보를 불러오기 위해 모듈 호출 
 */
const exec = require('child_process').exec;

/**
 * 모든 디렉토리 패스를 가져오기 위해 파일 시스템 모듈 호출
 */
const fs = require('fs');

/**
 * path 모듈 호출
 */
const path = require('path');


/**
 * 모든 디렉토리 패스를 스캐닝하는 클래스
 * @author mozu123
 * @constructor
 */
class AllDirectoryPathScanning{
    /**
     * 각 디렉토리 경로 패스의 구분자
     */
    #PATH_SEPARATOR = '/';
    /**
     * 유저의 디렉토리 정보를 이곳에 넣는다.
     */
    #userDirtoryList = [];

    /**
     * 유저의 디렉토리 정보에 대한 맵퍼
     * 키값이 디렉토리이며, 값이 해당 디렉토리에 있는 파일 값들 (List)
     * ex) {dir : [ fileName_1, fileName_2 ]}
     */
    #userDirtoryMapper = {};

	/**
	 * 유저 파일 명이 키값이고 벨류가 디렉토리 path인 맵퍼
     * ex) {fileName : dirPath}
	 */
	#userFileMapper = {};

    /**
     * 파일 확장자 맵퍼
     * 확장자가 키값이고 벨류가 파일 이름 list인 맵퍼
     * ex) {exe : [ fileName_1.exe, fileName_2.exe ]}
     */
    #userFileExtensionMapper = {
        unknown:[]
    };

    #statsMapper = {};

    /**
     * 유저의 c, d, e... 등 드라이브 정보를 이곳에 넣는다.
     */
    #driveNameList = [];

    /**
     * AllDirectoryPathScaning의 생성자
     */
    constructor(){
        this.length = 0;

    }

    /**
     * 재귀호출을 통해 dirPath로부터 출발하여 하위 디렉토리 전부를 탐색하는 함수
     * @param {String} dirPath : 탐색을 시작 할 파일 경로 
     * @param {Array} pending : 재귀 호출시 then을 명확하게 동기화 시키기 위한 플래그 장치
     * @returns 
     */
	allDirtoryScaninng(dirPath, pending = []){
		return new Promise( (resolve) => {
			return fs.promises.readdir(dirPath).then(files=>{
				return files.flatMap( async name => {
					let newDirPath = dirPath + this.#PATH_SEPARATOR + name;
					return await this.getFileStat(newDirPath).then(stats => {
                        let lastName = stats.lastName
						this.#userDirtoryList.push(newDirPath);
						//console.log(stats.lastName);
						if(stats.isFile()){
                            let fileExtension = path.extname(stats.lastName);

                            //파일 멥퍼에 저장
                            this.#userFileMapper[lastName] = newDirPath;

                            //디텍토리 맵퍼에 저장 = {경로:[파일명들]}
                            if(this.#userDirtoryMapper[newDirPath]){
                                this.#userDirtoryMapper[newDirPath].push(lastName);
                            }else{
                                this.#userDirtoryMapper[newDirPath] = [lastName];
                            }

                            //파일 확장자 맵퍼에 저장 = {확장자:[파일명들]}
                            if(this.#isNotIgnoreFile(fileExtension)){
                                this.#statsMapper[lastName] = stats;
                                if(fileExtension === ''){
                                    this.#userFileExtensionMapper.unknown.push(lastName);
                                }else if(this.#userFileExtensionMapper[fileExtension]){
                                    this.#userFileExtensionMapper[fileExtension].push(lastName);
                                }else{
                                    this.#userFileExtensionMapper[fileExtension] = [lastName];
                                }
                            }
                            
                            return resolve();
						}else if(stats.isDirectory() && this.#isNotIgnoreDir(stats)){
                            this.#statsMapper[newDirPath] = stats;
						    return this.allDirtoryScaninng(newDirPath, pending);
                        }else{
                            return resolve();
                        }
					})
				})
			}).then((promiseList)=>{
				return resolve(Promise.all(promiseList.flatMap(e=>e)));
			}).catch(err => {
				//console.error(err)
				resolve();
			})
		})
	}

    /**
     * 
     * @param {fs.Stats} stats 
     * @returns 
     */
    #isNotIgnoreDir(stats){
        return (
            stats.lastName.charAt(0) !== '.' 
            //&& stats.lastName !== 'AppData'
        )
    }

    /**
     * 
     * @param {String} fileExtension 
     */
    #isNotIgnoreFile(fileExtension){
        return (
            fileExtension !== '.policy'
        )
    }

    /**
     * dirPath에 대한 정보를 가져온다. (디렉토리든 파일이든)
     * @param {String} dirPath 
     * @returns {fs.Stats}
     */
    getFileStat(dirPath){
        return new Promise( (resolve, rejects) => {
            fs.stat(dirPath, (error, stats) => {
                let lastName = '';
                if(dirPath){
                    let pathList = dirPath.split('/');
                    lastName = pathList[pathList.length - 1];
                }

				if(stats && ! error){
					stats.dirPath = dirPath;
					stats.lastName = lastName;
					return resolve(stats)
				}else if (error){
					return resolve(
                        new fs.Stats({
                            statsType:'error',
                            no:error.errno,
                            code:error.code,
                            dirPath:dirPath,
                            errorName:'operation not permitted',
                            lastName: lastName,
                            isDirectory:()=>false,
                            isFile:()=>false
                        })
                    );
				}else{
                    return resolve(
                        new fs.Stats({
                            statsType:'unknown',
                            no:error.errno,
                            code:error.code,
                            dirPath:dirPath,
                            errorName:'operation not permitted',
                            lastName:'',
                            isDirectory:()=>false,
                            isFile:()=>false
                        })
                    );
                }
            })
        });
    }

    /**
     * 
     * @returns {Promise<Array>} : c, d, e 등 드라이버 정보를 가져오는 함수
     */
	getAllDriveName(){
        return new Promise( (resolve, rejects) => {
            exec('wmic logicaldisk get caption', (err, stdout, stderr) => {
                if(err){
                    return rejects(err);
                }
                
                this.#driveNameList = stdout.replaceAll(/[\r \t]|Caption/gi,'')
                    .split('\n')
                    .filter(e=> e !== '')
                    .map( (e, i) => {
                        this.getFileStat(e).then(stat=>{
							this.#userDirtoryMapper[e]=stat
						});
                        this.#userDirtoryList.push(e);
                        return e;
                    })
                return resolve(this.#driveNameList);
            });
        });
	}

	filesRead(files){

    }

    get userDirtoryMapper(){
        return this.#userDirtoryMapper;
    }
    get userDirtoryList(){
        return this.#userDirtoryList;
    }
	get userFileMapper(){
		return this.#userFileMapper;
	}
}
const allDirectoryPathScanning = new AllDirectoryPathScanning();
module.exports = allDirectoryPathScanning