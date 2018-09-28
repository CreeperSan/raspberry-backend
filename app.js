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
const router_dashboard = require('./routes/dashboard');
const router_database = require('./routes/database');
const router_download = require('./routes/download');
const router_exit = require('./routes/exit');
const router_log = require('./routes/log');
const router_process = require('./routes/process');
const router_setting = require('./routes/setting');
const router_shadowsocks = require('./routes/shadowsocks');


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
app.use(router_dashboard.routes(), router_dashboard.allowedMethods());
app.use(router_database.routes(), router_database.allowedMethods());
app.use(router_download.routes(), router_download.allowedMethods());
app.use(router_exit.routes(), router_exit.allowedMethods());
app.use(router_log.routes(), router_log.allowedMethods());
app.use(router_process.routes(), router_process.allowedMethods());
app.use(router_setting.routes(), router_setting.allowedMethods());
app.use(router_shadowsocks.routes(), router_shadowsocks.allowedMethods());


// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});


module.exports = app;
