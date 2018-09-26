const os = require('os');

const router = require("koa-router")();


router.prefix('/about');

router.get('/', async (ctx, next) => {
    await ctx.render('about',{
        host_name : os.hostname(),
        os_platform : os.platform(),
        os_name : os.type(),
        cpu_module : os.cpus()[0].model,
        cpu_arch : os.arch(),
        node_endianness : os.endianness(),
        user_home_path : os.homedir(),
        tmp_file_path : os.tmpdir()
    })
});


module.exports = router;
