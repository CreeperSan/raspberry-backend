const router = require('koa-router')();
const fs = require('fs');
const app = require('../app')

/** 一些类 */
class Files{
    /**
     * path : 路径
     * isExist : 是否存在
     */

    constructor(path){
        this.path = path;
        try{
            this.stat = fs.statSync(path);
            this.isExist = true;
        }catch(e){
            this.stat = [];
            this.isExist = false;
        }
    }

    isFile(){
        return this.stat.isFile();
    }
    isFolder(){
        return this.stat.isDirectory();
    }
    subFiles(){
        let tmpFileList = [];
        if(this.isFolder()){
            let tmpFileNames = fs.readdirSync(this.path);
            for(let pos in tmpFileNames){
                tmpFileList.push(new Files(this.path+tmpFileNames[pos]));
            }
        }
        return tmpFileList;
    }
    subFileNames(){
        if(this.isFolder()){
            return fs.readdirSync(this.path);
        }
        return '';
    }
    getSize(unit='b'){
        let tmpSize = this.stat.size;
        switch(unit){
            case 'pb' : { tmpSize /= 1024; }
            case 'tb' : { tmpSize /= 1024; }
            case 'gb' : { tmpSize /= 1024; }
            case 'mb' : { tmpSize /= 1024; }
            case 'kb' : { tmpSize /= 1024; }
            case 'b' : { break; }
            default : { throw RangeError('Unknown size unit') }
        }
        return tmpSize;
    }
    getLastViewTime(){
        return this.stat.atimeMs;
    }
    getLastModifyTime(){
        return this.stat.mtimeMs;
    }
    getLastStateTime(){
        return this.stat.ctimeMs;
    }
    getCreateTime(){
        return this.stat.birthtimeMs;
    }
    chmod(mode){
        return fs.chmodSync(this.path, mode);
    }
    chown(uid, gid){
        return fs.chownSync(this.path, uid, gid);
    }


}

/** 方法定义 */
function getFileFromPath(path){
    return new Files(path)
}

/** 请求方法 */

router.get('/file', async(ctx, next) => {
    ctx.body = getFileFromPath('/').subFiles();
})


module.exports = router