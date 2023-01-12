/**
 * c,d 등 드라이버 정보를 불러오기 위해 모듈 호출 
 */
const exec = require('child_process').exec;

/**
 * 모든 디렉토리 패스를 가져오기 위해 파일 시스템 모듈 호출
 */
const fs = require('fs');
const { resourceUsage } = require('process');

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
     */
    #userDirtoryMapper = {};

	/**
	 * 유저 파일이 키값이고 벨류가 디렉토리 path인 맵퍼
	 */
	#userFileMapper = {};

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
    scaninngStart(dir){
		//return dir.flatMap(e=> )
		return this.allDirtoryScaninng(dir).then((promiseList)=>Promise.all(promiseList));
	}
	allDirtoryScaninng(dirPath, pending = [], isDone = false){
		return new Promise( (resolve) => {
			return fs.promises.readdir(dirPath).then(files=>{
				return files.flatMap( async name => {
					let newDirPath = dirPath + this.#PATH_SEPARATOR + name;
					return await this.getFileStat(newDirPath).then(stats => {
						this.#userDirtoryList.push(newDirPath);
						this.#userDirtoryMapper[newDirPath] = stats
						//console.log(this.#userDirtoryMapper[newDirPath]);
						if(stats.isFile()){
							this.#userFileMapper[stats.lastName] = newDirPath;
						}
						return this.allDirtoryScaninng(newDirPath, pending);
					})
				})
			}).then((promiseList)=>{
				return resolve(Promise.all(promiseList.flatMap(e=>e)));
			}).catch(err => {
				//console.error(err)
				resolve([]);
			})
			/*
			fs.promises.readdir(dirPath, (err, files) => {
				if( ! files || files.length == 0 || err){
					return;
                }
				let promiseList = files.map( name => {
					let newDirPath = dirPath + this.#PATH_SEPARATOR + name;
					return this.getFileStat(newDirPath).then(stats => {
						this.#userDirtoryList.push(newDirPath);
						this.#userDirtoryMapper[newDirPath] = stats
						//console.log(this.#userDirtoryMapper[newDirPath]);
						if(stats.isDirectory()){
							this.allDirtoryScaninng(newDirPath, pending).then(e=>{
								pending.push(...e);
							});
						}else if(stats.isFile()){
							this.#userFileMapper[stats.lastName] = newDirPath;
						}
					})
				})
				pending.push(...promiseList);
			}).then(fileNames=>{
				resolve(pending)
			});
			*/
		})
	}

    getFileStat(dirPath){
        return new Promise( (resolve, rejects) => {
            fs.stat(dirPath, (error, stats) => {
				if(dirPath && stats && ! error){
					stats.dirPath = dirPath;
					let pathList = dirPath.split('/');
					stats.lastName = pathList[pathList.length - 1];
					return resolve(stats)
				}else{
					return resolve({
                        statsType:'error',
                        no:error.errno,
                        code:error.code,
                        dirPath:dirPath,
                        errorName:'operation not permitted',
						lastName:'',
                        isDirectory:()=>false,
						isFile:()=>false
                    });
				}
            })
        });
    }

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