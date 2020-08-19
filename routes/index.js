const Router = require('koa-router');
const route = new Router();


route.get('/', async (ctx, next) => {

  ctx.body = 'ssssss';
});


module.exports = route;