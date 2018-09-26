
const router = require('koa-router')();

router.prefix('/file');

router.get('/', async (ctx, next) => {
    await ctx.render('file')
});


module.exports = router;


