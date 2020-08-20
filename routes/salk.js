const Router = require('koa-router');
const route = new Router();
var sequelize = require('../models').sequelize; // mysql 시퀄라이저 모델
const sendEmail = require('../lib/mail.js');

const {
  salk
} = require('../models');

route.post('/about', async (ctx, next) => {

  var type = ctx.request.body.type;
  var name = ctx.request.body.name;
  var email = ctx.request.body.email;
  var company = ctx.request.body.company;
  var area = ctx.request.body.area;
  var phone = ctx.request.body.phone;
  var question = ctx.request.body.question;

  await salk.create({
    type: 'salk',
    name: name,
    email: email,
    company: company,
    area: area,
    phone: phone,
    question: question,
  })

  sendEmail("[salk] salk 문의글이 등록되었습니다.",
    '<h2 style="font-weight:400;">이름 : ' + name +
    '<br>회사명 : ' + company +
    '<br>이메일 : ' + email +
    '<br>연락처 : ' + phone +
    '<br>희망지역 : ' + area +
    '<br>문의 내용 : ' + question +
    '</h2>');

  ctx.body = {
    result: 'success',
    code: '200'
  };


});

route.post('/owner', async (ctx, next) => {

  var type = ctx.request.body.type;
  var name = ctx.request.body.name;
  var email = ctx.request.body.email;
  var company = ctx.request.body.company;
  var area = ctx.request.body.area;
  var phone = ctx.request.body.phone;
  var question = ctx.request.body.question;

  await salk.create({
    type: '건물주',
    name: name,
    email: email,
    company: company,
    area: area,
    phone: phone,
    question: question
  })

  sendEmail("[salk] 건물주 문의글이 등록되었습니다.",
    '<h2 style="font-weight:400;">이름 : ' + name +
    '<br>회사명 : ' + company +
    '<br>이메일 : ' + email +
    '<br>연락처 : ' + phone +
    '<br>희망지역 : ' + area +
    '<br>문의 내용 : ' + question +
    '</h2>');

  ctx.body = {
    result: 'success',
    code: '200'
  };

});

route.post('/realtor', async (ctx, next) => {

  var type = ctx.request.body.type;
  var name = ctx.request.body.name;
  var email = ctx.request.body.email;
  var company = ctx.request.body.company;
  var area = ctx.request.body.area;
  var phone = ctx.request.body.phone;
  var question = ctx.request.body.question;

  await salk.create({
    type: '중개인',
    name: name,
    email: email,
    company: company,
    area: area,
    phone: phone,
    question: question
  })

  sendEmail("[salk] 중개인 문의글이 등록되었습니다.",
    '<h2 style="font-weight:400;">이름 : ' + name +
    '<br>회사명 : ' + company +
    '<br>이메일 : ' + email +
    '<br>연락처 : ' + phone +
    '<br>희망지역 : ' + area +
    '<br>문의 내용 : ' + question +
    '</h2>');

  ctx.body = {
    result: 'success',
    code: '200'
  };

});

route.post('/qna', async (ctx, next) => {

  var type = ctx.request.body.type;
  var name = ctx.request.body.name;
  var email = ctx.request.body.email;
  var company = ctx.request.body.company;
  var area = ctx.request.body.area;
  var phone = ctx.request.body.phone;
  var question = ctx.request.body.question;

  await salk.create({
    type: 'qna',
    name: name,
    email: email,
    company: company,
    area: area,
    phone: phone,
    question: question
  })

  sendEmail("[salk] 1:1문의 글이 등록되었습니다.",
    '<h2 style="font-weight:400;">이름 : ' + name +
    '<br>회사명 : ' + company +
    '<br>이메일 : ' + email +
    '<br>연락처 : ' + phone +
    '<br>희망지역 : ' + area +
    '<br>문의 내용 : ' + question +
    '</h2>');

  ctx.body = {
    result: 'success',
    code: '200'
  };

});

module.exports = route;