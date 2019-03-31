const FILE_TYPE_ERROR       = 0;
const FILE_TYPE_FILE        = 1;
const FILE_TYPE_DIRECTORY   = 2;

var app = new Vue({
    el : "#file-app",
    data : {
        path : "/Users/creepersan/TestDirectory",
        isShowLoading : false,
        files : []
    },
    methods : {
        /* 一些格式化方法 */
        toFormatTime(time){
            let data = new Date(time);
            return data.getFullYear()+"-"+data.getMonth()+"-"+data.getDay()+" "+data.getHours()+":"+data.getMinutes()+":"+data.getSeconds();
        },
        toFormatFileSize(size){
            if (size < 1024){
                return size+" b"
            } else if (size < 1024 * 1024){
                return (size/1024).toFixed(2)+" kb"
            } else if (size < 1024 * 1024 * 1024){
                return (size/1024/1024).toFixed(2)+" mb"
            } else if (size < 1024 * 1024 * 1024 * 1024){
                return (size/1024/1024/1024).toFixed(2)+" gb"
            } else{
                return (size/1024/1024/1024/1024).toFixed(2)+" tb"
            }
        },
        toFormatFileTypeIconImage(type, fileName){
            switch (type) {
                case FILE_TYPE_ERROR : // 是错误的
                    return "ic_file_error.png";
                case FILE_TYPE_DIRECTORY : // 是文件夹
                    return "ic_file_directory.png";
                default : // 是文件
                    const fileDotIndexPos = fileName.lastIndexOf('.');
                    let filePostfix = fileName;
                    if (fileDotIndexPos >= 0 && fileDotIndexPos < fileName.length){
                        filePostfix = fileName.substring(fileDotIndexPos+1, fileName.length)
                    } else{
                        filePostfix = "";
                    }
                    switch (filePostfix) {
                        case "wav":
                            return "ic_file_music.png";
                        case "mp4":
                            return "ic_file_video.png";
                        case "java":
                            return "ic_file_script.png";
                        case "txt":
                        case "md":
                            return "ic_file_text.png";
                        default :
                            return "ic_file_unknown.png";
                    }
            }
        },
        toFormatFileItem(networkFileResult){
            const self = this;
            if (null == networkFileResult || undefined === networkFileResult){ // 错误
                return {
                    isCheck : false,
                    icon : self.toFormatFileTypeIconImage(networkFileResult.type, networkFileResult.name),
                    name : "【 Error File 】",
                    type : FILE_TYPE_ERROR,
                    modifyTime : "【 Error 】",
                    size : "【 Error 】",
                }
            } else if (FILE_TYPE_ERROR === networkFileResult.type){ // 获取文件信息失败
                return {
                    isCheck : false,
                    icon : self.toFormatFileTypeIconImage(networkFileResult.type, networkFileResult.name),
                    name : networkFileResult.name,
                    type : FILE_TYPE_ERROR,
                    modifyTime : "【 Error 】",
                    size : "【 Error 】",
                }
            }else{ // 一切正常
                return {
                    isCheck : false,
                    icon : self.toFormatFileTypeIconImage(networkFileResult.type, networkFileResult.name),
                    name : networkFileResult.name,
                    type : networkFileResult.type,
                    modifyTime : self.toFormatTime(networkFileResult.modifyTimes),
                    size : self.toFormatFileSize(networkFileResult.size),
                }
            }
        },
        toFormatFileItemList(networkFileResultList){
            let result = [];
            networkFileResultList.forEach((tmpNetworkFileItem) => {
                result.push(this.toFormatFileItem(tmpNetworkFileItem))
            });
            return result;
        },
        toFilePath(file){
            const self = this;
            if (typeof file === "string"){
                return self.path+"/"+file;
            } else {
                return self.path+"/"+file.name;
            }
        },
        /* 下面是点击事件 */
        onFileSelectionClick(index){
            const self = this;
            if (index >= 0 && index < self.files.length){
                // 点击了文件
                const file = self.files[index];
                self.getFolderContent(self.toFilePath(file));
            } else {
                log("【错误】当前没有第"+index+"个文件")
            }
        },
        onJumpClick(){
            const self = this;
            let path = document.getElementById("pathInput").value;
            console.log(path);
            self.getFolderContent(path);
        },
        /* 一些快捷操作 */
        getFolderContent(path=""){
            const self = this;
            self.showLoading(); // 显示加载中
            let requestParam = {};
            if (path !== "" ){
                requestParam.path = path;
            }
            httpPost("/file/api/file-list", requestParam, function (response) {
                self.files = self.toFormatFileItemList(response.data);
                self.showFileList(); // 显示文件列表
            })

        },
        /* 一些界面操作 */
        showLoading(){
            const self = this;
            self.isShowLoading = true;
        },
        showFileList(){
            const self = this;
            self.isShowLoading = false;
        }
    },
    created : function () {
        const self = this;
        self.getFolderContent();
    }
});