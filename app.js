const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const loaderRouter = require('./routes/index');
const errorHandle = require('./middlewares/errorHandle');
const jwt = require('./middlewares/jwt');

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

// app.use(views(__dirname + '/views', {
//   extension: 'pug'
// }))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
});
//cors
jwt.cors(app);
//jwt
jwt.jwtKoa(app);

// routes
loaderRouter(app);


// error-handling
app.use(async (ctx,next) =>{
    await errorHandle.errorHandle(ctx,next)
});
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app;
