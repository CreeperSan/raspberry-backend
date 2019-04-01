const router = require("koa-router")();
const config = require(process.cwd()+"/config/config");
const utilFile = require(process.cwd()+"/routes/utils/file");
const fs = require("fs");

router.prefix('/file');

function getValue(obj, defaultValue){
    if (undefined === obj || null == obj){
        if (typeof defaultValue === "function"){
            return defaultValue();
        } else{
            return defaultValue;
        }
    } else{
        return obj;
    }
}




router.get("/", async (ctx, next) => {
   await ctx.render('file', {

   })
});

/**
 * 用于获取文件夹下面的所有文件
 * Params :
 *      path 所在路径
 *
 */
router.post("/api/file-list", async (ctx, next) => {
    // 获取参数
    let params = ctx.request.body.params;
    let path = getValue(params.path, config.getDefaultPath);
    // 逻辑
    ctx.body = {
        state : 200,
        files : await utilFile.getDirectoryFileList(path),
        path : path
    };
});


module.exports = router;