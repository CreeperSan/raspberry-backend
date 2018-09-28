const router = require('koa-router')();

router.prefix('/process');

router.get('/', async (ctx, next) => {
    await ctx.render('process', {})
});


module.exports = router;

