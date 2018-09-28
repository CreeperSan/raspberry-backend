const router = require('koa-router')();

router.prefix('/download');

router.get('/', async (ctx, next) => {
    await ctx.render('download', {})
});


module.exports = router;

