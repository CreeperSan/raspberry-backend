const router = require('koa-router')();

const fs = require('fs');
const path = require('path');
const os = require('os');

const ERROR_NOT_FOLDER = 500;

router.prefix('/file');

/**
 *  下面是其他处理函数
 */

function getFileInfo(filePath){
    filePath = path.normalize(filePath);
    let tmpFileData = fs.statSync(filePath);
    let tmp_is_folder = tmpFileData.isDirectory();
    return {
        path : filePath,
        name : path.posix.basename(filePath),
        uid : tmpFileData.uid,  // 用户ID
        dir_name : path.dirname(filePath),
        ext_name : path.extname(filePath),
        is_folder : tmp_is_folder,
        size : tmpFileData.size,
        modify_time : tmpFileData.mtime,
        create_time : tmpFileData.ctime,
    }
}

function getFolderInfo(folderPath){
    folderPath = path.normalize(folderPath);
    let tmpFileData = fs.statSync(folderPath);
    if (tmpFileData.isDirectory()){
        const tmpResultFileArray = [];
        fs.readdirSync(folderPath).forEach((tmpFileName) => {
            tmpResultFileArray.push(getFileInfo(folderPath+'/'+tmpFileName))
        });
        return tmpResultFileArray;
    } else {
        return ERROR_NOT_FOLDER;
    }
}





/**
 *  下面是视图处理函数
 */

router.get('/', async (ctx, next) => {
    await ctx.render('file', {
        files : getFolderInfo(os.homedir())
    })
});

router.post('/', async(ctx, next) => {
    // 获取参数
    const requestParam = ctx.request.body;
    // 获取请求参数
    let tmpPath = requestParam['path'];
    if (!tmpPath){
        tmpPath = os.homedir();
    }else{
        try {
            tmpPath = path.normalize(requestParam['path']);
        } catch (e) {
            tmpPath = os.homedir();
        }
    }
    console.log(tmpPath);
    ctx.body = JSON.stringify({
        files: getFolderInfo(tmpPath),
        path : tmpPath
    })
});


module.exports = router;


