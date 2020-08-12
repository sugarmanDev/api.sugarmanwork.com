const Koa = require('koa');
const Router = require('koa-router');
const bodyparser = require('koa-body');
const cors = require('@koa/cors');
const logger = require('koa-logger');

const app = new Koa();
const router = new Router();
const cargoRouter = require('../routes/cargo');

app.use(cors());
app.use(logger());

router.use('/cargo', cargoRouter.routes());
app.use(bodyparser({
  extendTypes: {
    json: ['application/x-javascript']
  }
}));


app.use(router.routes());
app.listen(80, () => {
    console.log('heurm server is listening to port 80');
});
