const Router = require('koa-router');
const route = new Router();
const koaBody = require('koa-body');
var sequelize = require('../models').sequelize; // mysql 시퀄라이저 모델
const sendEmail = require('../lib/mail.js');

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
      displayYN: 'Y'
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
  var branch_desktop = ctx.request.body.branch_desktop;
  var storageSize = ctx.request.body.storageSize;
  var visitDate = ctx.request.body.visitDate;
  var visitTime = ctx.request.body.visitTime;
  var checkYN = ctx.request.body.checkYN;

  console.log(ctx.request.body);

  await cargoVisit.create({
    visitBranch: visitBranch,
    name: name,
    phone: phone,
    storageSize: storageSize,
    branch_desktop: branch_desktop,
    visitDate: visitDate,
    visitTime: visitTime,
    checkYN: 'N',
  })


  sendEmail("[Cargo] 방문 예약이 등록되었습니다.",
    '<h2 style="font-weight:400;">이름 : ' + name +
    '<br>이메일 : ' + email +
    '<br>연락처 : ' + phone +
    '<br>지점 : ' + visitBranch +
    '<br>원하는 스토리지 사이즈 : ' + storageSize +
    '<br>방문날짜 : ' + visitDate +
    '<br>방문시간 : ' + visitTime +
    '</h2>');


  ctx.body = {
    result: 'success',
    code: '200'
  };


});

route.post('/request', async (ctx, next) => {

  var name = ctx.request.body.name;
  var email = ctx.request.body.email;
  var phone = ctx.request.body.phone;
  var subject = ctx.request.body.subject;
  var route = ctx.request.body.route;
  var branch = ctx.request.body.branch;
  var storageSize = ctx.request.body.storageSize;
  var checkYN = ctx.request.body.checkYN;

  await cargoRequest.create({
    name: name,
    email: email,
    phone: phone,
    subject: subject,
    route: route,
    branch: branch,
    storageSize: storageSize,
    checkYN: 'N',
  })

  
  if(ctx.request.body.type == 'main'){
	sendEmail("[Cargo] 1:1문의글이 등록되었습니다.",
    '<h2 style="font-weight:400;">이름 : ' + name +
    '<br>연락처 : ' + phone +
	'<br>문의지점 : ' + branch +
	'<br>스토리지 사이즈 : ' + storageSize +
    '<br>문의내용 : ' + subject +
	'<br>알게 된 경로 : ' + route +
    '</h2>');
  }else{
	sendEmail("[Cargo] 1:1문의글이 등록되었습니다.",
    '<h2 style="font-weight:400;">이름 : ' + name +
    '<br>연락처 : ' + phone +
    '<br>문의내용 : ' + subject +
	'<br>알게 된 경로 : ' + route +
    '</h2>');
  }
  


  ctx.body = {
    result: 'success',
    code: '200'
  };


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
    checkYN: 'N',
  })

  sendEmail("[Cargo] 가맹 문의글이 등록되었습니다.",
    '<h2 style="font-weight:400;">이름 : ' + name +
    '<br>이메일 : ' + email +
    '<br>연락처 : ' + phone +
    '<br>문의내용 : ' + description +
    '</h2>');

  ctx.body = {
    result: 'success',
    code: '200'
  };

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
    checkYN: 'N',
  })


    sendEmail("[Cargo] 이벤트 참여글이 등록되었습니다.",
      '<h2 style="font-weight:400;">이름 : ' + name +
      '<br>이메일 : ' + email +
      '<br>연락처 : ' + phone +
      '<br>이벤트 종류 : ' + promoIdx +
      '<br>알게된 경로 : ' + route +
      '</h2>');

  ctx.body = {
    result: 'success',
    code: '200'
  };

});

route.post('/package', async (ctx, next) => {

  var name = ctx.request.body.name;
  var area = ctx.request.body.area;
  var email = ctx.request.body.email;
  var phone = ctx.request.body.phone;
  var company = ctx.request.body.company;
  var platform = ctx.request.body.platform;
  var delivery_count = ctx.request.body.delivery_count;
  //  var checkYN = ctx.request.body.checkYN;

  console.log(ctx.request.body)
  console.log(ctx.request.body.area)
  console.log(ctx.request.body.name)
  console.log(ctx.request.body.email)
  console.log(ctx.request.body.phone)
  console.log(ctx.request.body.company)
  console.log(ctx.request.body.platform)
  console.log(ctx.request.body.delivery_count)


  await package.create({
    name: name,
    area: area,
    email: email,
    phone: phone,
    company: company,
    platform: platform,
    delivery_count: delivery_count,
  })


  sendEmail("[Cargo] 택배 문의글이 등록되었습니다.",
    '<h2 style="font-weight:400;">이름 : ' + name +
    '<br>이메일 : ' + email +
    '<br>연락처 : ' + phone +
    '<br>지역 : ' + area +
    '<br>회사명 : ' + company +
    '<br>플랫폼 : ' + platform +
    '<br>월 택배 건수 : ' + delivery_count +
    '</h2>');


  ctx.body = {
    result: 'success',
    code: '200'
  };


});



module.exports = route;
