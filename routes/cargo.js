const Router = require('koa-router');
const route = new Router();
const koaBody = require('koa-body');
var sequelize = require('../models').sequelize; // mysql 시퀄라이저 모델

const {
  cargoVisit,
  cargoRequest,
  franchise,
  registerPromo,
  promo,
  package
} = require('../models');

route.get('/event', async (ctx, next) => {

  var result = await promo.findAll({
    where: {
      site: 'cargo',
      displayYN:'Y'
    }
  })
  ctx.body = result;
});

route.get('/event/:idx', async (ctx, next) => {
  var idx = ctx.params.idx;
  var result = await promo.findOne({
    where: {
      idx: idx,
    }
  })
  ctx.body = result;
});

route.post('/visit', async (ctx, next) => {

  var visitBranch = ctx.request.body.visitBranch;
  var name = ctx.request.body.name;
  var email = ctx.request.body.email;
  var phone = ctx.request.body.phone;
  var visitDate = ctx.request.body.visitDate;
  var visitTime = ctx.request.body.visitTime;
  var checkYN = ctx.request.body.checkYN;

  await cargoVisit.create({
    visitBranch: visitBranch,
    name: name,
    phone: phone,
    visitDate: visitDate,
    visitTime: visitTime,
    checkYN: 'Y',
  })

  ctx.body = { result:'success',code:'200' };


});

route.post('/request', async (ctx, next) => {

  var name = ctx.request.body.name;
  var email = ctx.request.body.email;
  var phone = ctx.request.body.phone;
  var subject = ctx.request.body.subject;
  var route = ctx.request.body.route;
  var checkYN = ctx.request.body.checkYN;

  await cargoRequest.create({
    name: name,
    email: email,
    phone: phone,
    subject: subject,
    route: route,
    checkYN: 'Y',
  })

  ctx.body = { result:'success',code:'200' };


});

route.post('/franchise', async (ctx, next) => {

  var name = ctx.request.body.name;
  var email = ctx.request.body.email;
  var phone = ctx.request.body.phone;
  var description = ctx.request.body.description;
  var route = ctx.request.body.route;
  var kind = ctx.request.body.kind;
  var checkYN = ctx.request.body.checkYN;

  await franchise.create({
    name: name,
    email: email,
    phone: phone,
    description: description,
    route: route,
    kind: 'cargo',
    checkYN: 'Y',
  })

  ctx.body = { result:'success',code:'200' };

});

route.post('/event', async (ctx, next) => {

  var name = ctx.request.body.name;
  var email = ctx.request.body.email;
  var phone = ctx.request.body.phone;
  var promoIdx = ctx.request.body.promoIdx;
  var route = ctx.request.body.route;
  var checkYN = ctx.request.body.checkYN;

  var result = registerPromo.create({
    name: name,
    email: email,
    phone: phone,
    promoIdx: promoIdx,
    route: route,
    checkYN: 'Y',
  })

   ctx.body = { result:'success',code:'200' };

});

route.post('/package', async (ctx, next) => {

  var name = ctx.request.body.name;
  var area = ctx.request.body.area;
  var email = ctx.request.body.email;
  var phone = ctx.request.body.phone;
  var company = ctx.request.body.company;
  var platform = ctx.request.body.platform;
  var checkYN = ctx.request.body.checkYN;

  await package.create({
    name: name,
    area: area,
    email: email,
    phone: phone,
    company: company,
    platform: platform,
    checkYN: 'Y',
  })

  ctx.body = { result:'success',code:'200' };


});



module.exports = route;
