const Router = require('koa-router');
const route = new Router();
const sendEmail = require('../lib/mail.js');

route.get('/', async (ctx, next) => {
  ctx.body = 'dddddd';
});


route.post('/mail', async (ctx, next) => {

  sendEmail("hello", "hello world")
  ctx.body = 'dddddd';

})


module.exports = route;