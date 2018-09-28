const router = require('koa-router')();

router.prefix('/setting');

router.get('/', async (ctx, next) => {
    await ctx.render('setting', {})
});


module.exports = router;

