const router = require('koa-router')();

router.prefix('/dashboard');

router.get('/', async (ctx, next) => {
    await ctx.render('dashboard', {})
});


module.exports = router;

