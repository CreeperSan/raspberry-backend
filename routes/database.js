const router = require('koa-router')();

router.prefix('/database');

router.get('/', async (ctx, next) => {
    await ctx.render('database', {})
});


module.exports = router;

