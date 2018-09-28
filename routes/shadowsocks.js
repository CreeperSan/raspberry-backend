const router = require('koa-router')();

router.prefix('/shadowsocks');

router.get('/', async (ctx, next) => {
    await ctx.render('shadowsocks', {})
});


module.exports = router;

