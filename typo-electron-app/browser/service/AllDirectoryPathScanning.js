/**
 * c,d 등 드라이버 정보를 불러오기 위해 모듈 호출 
 */
const exec = require('child_process').exec;

/**
 * 모든 디렉토리 패스를 가져오기 위해 파일 시스템 모듈 호출
 */
const fs = require('fs');

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
     * 유저의 c, d, e... 등 드라이브 정보를 이곳에 넣는다.
     */
    #driveNameList = [];

    /**
     * AllDirectoryPathScaning의 생성자
     */
    constructor(){
        this.length = 0;

    }
    
    scaninngStart(){
        return new Promise( (resolve, rejects) => {
            this.allDriveScaninng().then(driveNameList => {
                Promise.all(
                    driveNameList.map( async (drive) => await this.allDirtoryScaninng(drive)).flatMap(e=>e)
                ).then((e)=>console.log('end???!!!')).catch(err=>console.log(err))
            })
        })
    }

    allDriveScaninng(){
        return new Promise( (resolve, rejects) => {
            exec('wmic logicaldisk get caption', (err, stdout, stderr) => {
                if(err){
                    return rejects(err);
                }
                
                this.#driveNameList = stdout.replaceAll(/[\r \t]|Caption/gi,'')
                    .split('\n')
                    .filter(e=> e !== '')
                    .map( (e, i) => {
                        this.getFileStat(e).then(stat=>this.#userDirtoryMapper[e]=stat);
                        this.#userDirtoryList.push(e);
                        return e;
                    })
                return resolve(this.#driveNameList);
            });
        });
    }

    allDirtoryScaninng(dirPath, isOrigin = true){
        return new Promise( (resolve, rejects) => {
            fs.readdir(dirPath, (err,files)=>{
                //console.log(err);
                //console.log(files);
                if( ! files || files.length == 0 ){
                    //console.log('empty files', files);
                    return;
                }
                else if(err){
                    return rejects(err);
                }
                let promise = files.map( async (e, i) => {
                    let newDirPath = dirPath + this.#PATH_SEPARATOR + e;
                    return await this.getFileStat(newDirPath).then(stats=>{
                        this.#userDirtoryList.push(newDirPath);
                        //console.log(this.#userDirtoryList)
                        this.#userDirtoryMapper[newDirPath] = stats
                        //if(this.#userDirtoryMapper[newDirPath].isDirectory()){
                        this.allDirtoryScaninng(newDirPath, false);
                        //}
                    }).catch(err=>{});
                })
                //resolve(promise);
                Promise.all(promise).then(e=>{
                    resolve();
                }).catch(err=>console.log(err));
                //resolve(promise);
                //console.log(dirPath);
            })
        });
    }

    filesRead(files){

    }

    getFileStat(dirPathName){
        return new Promise( (resolve, rejects) => {
            fs.stat(dirPathName, (error, stats) => {
                if(error){
                    resolve({
                        statsType:'error',
                        no:error.errno,
                        code:error.code,
                        path:dirPathName,
                        errorName:'operation not permitted',
                        isDirectory:()=>false
                    });
                }
                //console.log(stats)
                return resolve(stats);
            })
        });
    }
    get userDirtoryMapper(){
        return this.#userDirtoryMapper;
    }
    get userDirtoryList(){
        return this.#userDirtoryList;
    }
}
const allDirectoryPathScanning = new AllDirectoryPathScanning();
module.exports = allDirectoryPathScanning