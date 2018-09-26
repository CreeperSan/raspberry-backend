const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');

const router_index = require('./routes/index');
const router_files = require('./routes/file');
const router_users = require('./routes/users');
const router_about = require('./routes/about');


// error handler
onerror(app);


// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}));
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));

app.use(views(__dirname + '/views', {
    extension: 'nunjucks'
}));


// logger
app.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
});


// routes
app.use(router_index.routes(), router_index.allowedMethods());
app.use(router_files.routes(), router_files.allowedMethods());
app.use(router_users.routes(), router_users.allowedMethods());
app.use(router_about.routes(), router_about.allowedMethods());


// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});


module.exports = app;
