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
class AllDirectoryPathScaning{
    /**
     * 각 디렉토리 경로 패스의 구분자
     */
    #PATH_SEPARATOR = '/';
    /**
     * 유저의 디렉토리 정보를 이곳에 넣는다.
     */
    #USER_DIRTORYS = [];

    /**
     * AllDirectoryPathScaning의 생성자
     */
    constructor(){
        
        this.dirveNameList = [];
        exec('wmic logicaldisk get caption', (err, stdout, stderr) => {
            if(err){
                return;
            }
            this.dirveNameList = stdout.replaceAll(/[\r \t]|Caption/gi,'').split('\n').filter(e=>e!=='');
        });
    }

    searchDirtorys(){

    }
}