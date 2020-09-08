const Router = require('koa-router');
const route = new Router();
var sequelize = require('../models').sequelize; // mysql 시퀄라이저 모델
const sendEmail = require('../lib/mail.js');

const {
  sugarmanGo
} = require('../models');

route.post('/request', async (ctx, next) => {

  var name = ctx.request.body.name;
  var area = ctx.request.body.area;
  var email = ctx.request.body.email;
  var phone = ctx.request.body.phone;
  var company = ctx.request.body.company;
  var platform = ctx.request.body.platform;
  var delivery_count = ctx.request.body.delivery_count;
  var service = ctx.request.body.service;

  console.log(ctx.request.body);

  await sugarmanGo.create({
    name: name,
    area: area,
    email: email,
    phone: phone,
    company: company,
    platform: platform,
    delivery_count: delivery_count,
    service: service
  })

  sendEmail("[슈가맨고] 견적 문의글이 등록되었습니다.",
    '<h2 style="font-weight:400;">이름 : ' + name +
    '<br>회사명 : ' + company +
    '<br>이메일 : ' + email +
    '<br>연락처 : ' + phone +
    '<br>지역 : ' + area +
    '<br>플랫폼 : ' + platform +
    '</h2>');

  ctx.body = {
    result: 'success',
    code: '200'
  };

});

module.exports = route;