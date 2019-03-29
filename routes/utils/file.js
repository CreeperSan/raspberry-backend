const fs = require('fs');

const FILE_TYPE_ERROR       = 0;
const FILE_TYPE_FILE        = 1;
const FILE_TYPE_DIRECTORY   = 2;

module.exports = {

    getDirectoryFileList : async function(path){
        return new Promise(resolve => {
            fs.access(path, (err) => { // 是否目录存在
                if (err){
                    resolve(null);
                } else{
                    fs.readdir(path, function (err, tmpFiles) { // 读取目录下所有文件
                        if (err){
                            resolve(null);
                        } else{
                            let files = [];
                            tmpFiles.forEach((tmpFile) => { // 遍历所有文件名称
                                try{
                                    let fileStat = fs.statSync(path+"/"+tmpFile);
                                    if (undefined === fileStat || null == fileStat){
                                        throw "文件获取失败，作为位置文件处理"; // TODO : 这里可以用更好的写法，可以避免抛出异常
                                    }
                                    files.push({
                                        name : tmpFile,
                                        type : fileStat.isDirectory() ? FILE_TYPE_DIRECTORY : FILE_TYPE_FILE,
                                        size : fileStat.size, // 字节为单位
                                        modifyTimes : fileStat.mtimeMs, // 上次修改时间
                                    });
                                }catch (err) {
                                    files.push({
                                        name : tmpFile,
                                        type : FILE_TYPE_ERROR
                                    });
                                }
                            });
                            resolve(files);
                        }
                    });
                }
            });
        })
    }

};