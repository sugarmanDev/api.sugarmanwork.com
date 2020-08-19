const Koa = require('koa');
const Router = require('koa-router');
const bodyparser = require('koa-body');
const cors = require('@koa/cors');
const logger = require('koa-logger');

const app = new Koa();
const router = new Router();
const cargoRouter = require('../routes/cargo');
const salkRouter = require('../routes/salk');

app.use(async (ctx, next) => {
 try {
 await next();
 } catch (err) {
 err.status = err.statusCode || err.status || 500;
 ctx.body = { result:'fail',code:'500', message:'invalid JSON format'};
 // ctx.app.emit('error', err, ctx);
 }
});

app.use(cors());
app.use(logger());

app.use(cors());
app.use(logger());
app.use(bodyparser({
  extendTypes: {
    json: ['application/x-javascript']
  }
}));

router.use('/salk', salkRouter.routes());
router.use('/cargo', cargoRouter.routes());

app.use(router.routes());
app.listen(443, () => {
    console.log('server is listening to port 80');
});
