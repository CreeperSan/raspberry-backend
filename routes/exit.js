const router = require('koa-router')();

router.prefix('/exit');

router.get('/', async (ctx, next) => {
    await ctx.render('exit', {})
});


module.exports = router;

