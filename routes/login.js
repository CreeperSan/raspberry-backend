const router = require("koa-router")();

router.prefix('/login');


router.get("/", async (ctx, next) => {
   await ctx.render('login', {

   })
});


module.exports = router;