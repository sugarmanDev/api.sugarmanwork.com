const Koa = require('koa');
const Router = require('koa-router');
const bodyparser = require('koa-body');
const cors = require('@koa/cors');
const logger = require('koa-logger');

const app = new Koa();
const router = new Router();
const cargoRouter = require('../routes/cargo');
const salkRouter = require('../routes/salk');

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
app.listen(80, () => {
    console.log('heurm server is listening to port 80');
});
