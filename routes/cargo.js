const Router = require('koa-router');
const route = new Router();
const koaBody = require('koa-body');
var sequelize = require('../models').sequelize; // mysql 시퀄라이저 모델

const {
  cargoVisit,
  cargoRequest,
  franchise
} = require('../models');


route.post('/visit', async (ctx, next) => {

  var visitBranch = ctx.request.body.visitBranch;
  var name = ctx.request.body.name;
  var email = ctx.request.body.email;
  var phone = ctx.request.body.phone;
  var visitDate = ctx.request.body.visitDate;
  var visitTime = ctx.request.body.visitTime;
  var checkYN = ctx.request.body.checkYN;

  var result = cargoVisit.create({
    visitBranch: visitBranch,
    name: name,
    phone: phone,
    visitDate: visitDate,
    visitTime: visitTime,
    checkYN: checkYN,
  })

});

route.post('/request', async (ctx, next) => {

  var name = ctx.request.body.name;
  var email = ctx.request.body.email;
  var phone = ctx.request.body.phone;
  var subject = ctx.request.body.subject;
  var route = ctx.request.body.route;
  var checkYN = ctx.request.body.checkYN;

  var result = cargoRequest.create({
    name: name,
    email: email,
    phone: phone,
    subject: subject,
    route: route,
    checkYN: checkYN,
  })

});

route.post('/franchise', async (ctx, next) => {

  var name = ctx.request.body.name;
  var email = ctx.request.body.email;
  var phone = ctx.request.body.phone;
  var description = ctx.request.body.description;
  var route = ctx.request.body.route;
  var kind = ctx.request.body.kind;
  var checkYN = ctx.request.body.checkYN;

  var result = franchise.create({
    name: name,
    email: email,
    phone: phone,
    description: description,
    route: route,
    kind: 'cargo',
    checkYN: checkYN,
  })

});



module.exports = route;
