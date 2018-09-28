const router = require('koa-router')();

router.prefix('/log');

router.get('/', async (ctx, next) => {
    await ctx.render('log', {})
});


module.exports = router;

