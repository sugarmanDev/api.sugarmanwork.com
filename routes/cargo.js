const Router = require("koa-router");
const route = new Router();
const koaBody = require("koa-body");
var sequelize = require("../models").sequelize; // mysql 시퀄라이저 모델
const sendEmail = require("../lib/mail.js");
//const sendFcm = require("../lib/sendFcm.js");
const axios = require("axios");

const {
  cargoVisit,
  cargoRequest,
  franchise,
  registerPromo,
  promo,
  branchModel,
  package,
} = require("../models");

async function sendFcm(to, body) {
  const accessToken =
    "AAAAeLGJy7g:APA91bEilvEhIqJRGgzcFGnKqgv4CbiTQGtk76g41I13SoeEBQRyxqXxys73QSkM7ES02p3TqL25zhsyfDrPfSRjpIvSokoDB8Dw58c_CQAcZRjVzjQMwi2ieTS17xECK2YlZrsFGfCf";

  const res = await axios.post(
    `https://fcm.googleapis.com/fcm/send`,
    {
      to: to,
      notification: {
        title: "슈가맨워크/카고 관리자 센터",
        body: body,
      },
    },
    {
      headers: {
        Authorization: `key=${accessToken}`,
        withCredentials: true,
      },
    }
  );

  console.log(res.data);
}

var branchIdx = {
  1: 99,
  2: 100,
  3: 101,
  4: 102,
};

route.get("/event", async (ctx, next) => {
  var result = await promo.findAll({
    where: {
      site: "cargo",
      displayYN: "Y",
    },
  });
  ctx.body = result;
});

route.get("/event/:idx", async (ctx, next) => {
  var idx = ctx.params.idx;
  var result = await promo.findOne({
    where: {
      idx: idx,
    },
  });
  ctx.body = result;
});

route.post("/visit", async (ctx, next) => {
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
    branchIdx: branchIdx[ctx.request.body.branchIdx],
    checkYN: "N",
  });

  const [results, metadata] = await sequelize.query(
    `select branchName, (select token from fcmToken where email = branch.email) token from branch where branchIdx = '${
      branchIdx[ctx.request.body.branchIdx]
    }'`
  );
  sendFcm(
    results[0].token,
    `[슈가맨카고] ${results[0].branchName}에 방문예약이 등록되었습니다.`
  );
  sendEmail(
    "[Cargo] 방문 예약이 등록되었습니다.",
    //JSON.stringify(rows) + '<h2 style="font-weight:400;">이름 : ' +
    '<h2 style="font-weight:400;">이름 : ' +
      name +
      "<br>이메일 : " +
      email +
      "<br>연락처 : " +
      phone +
      "<br>지점 : " +
      visitBranch +
      "<br>원하는 스토리지 사이즈 : " +
      storageSize +
      "<br>방문날짜 : " +
      visitDate +
      "<br>방문시간 : " +
      visitTime +
      '<br><a style="font-size:20px;color:blue;" href="http://test.sugarmanwork.com/admin/cargo/visitList.php">방문예약 바로가기</a></h2>'
  );

  var result = await branchModel.findAll({
    where: {
      branchName: visitBranch,
    },
  });

  /*
	sendEmail(
        "[Cargo] 방문 예약이 등록되었습니다.",
        '<h2 style="font-weight:400;">이름 : ' +
            name +
            "<br>이메일 : " +
            email +
            "<br>연락처 : " +
            phone +
            "<br>지점 : " +
            visitBranch +
            "<br>원하는 스토리지 사이즈 : " +
            storageSize +
            "<br>방문날짜 : " +
            visitDate +
            "<br>방문시간 : " +
            visitTime +
            '<br><a style="font-size:20px;color:blue;" href="http://test.sugarmanwork.com/admin/cargo/visitList.php">방문예약 바로가기</a></h2>',
		result[0].email
    );
	*/

  ctx.body = {
    result: "success",
    code: "200",
  };
});

route.post("/request", async (ctx, next) => {
  var name = ctx.request.body.name;
  var email = ctx.request.body.email;
  var phone = ctx.request.body.phone;
  var subject = ctx.request.body.subject;
  var route = ctx.request.body.route;
  var branch = ctx.request.body.branch;
  var storageSize = ctx.request.body.storageSize;
  var checkYN = ctx.request.body.checkYN;
  var branches = {
    1: "인천 부평점",
    2: "서울 군자점",
    3: "부천 상동점",
    4: "안양 명학점",
    5: "인천 갈산점",
  };

  await cargoRequest.create({
    name: name,
    email: email,
    phone: phone,
    subject: subject,
    route: route,
    branch: branch,
    storageSize: storageSize,
    branchIdx: branchIdx[ctx.request.body.branchIdx],
    checkYN: "N",
  });

  var result = await branchModel.findAll({
    where: {
      branchIdx: branchIdx[branch],
    },
  });

  const [results, metadata] = await sequelize.query(
    `select branchName, (select token from fcmToken where email = branch.email) token from branch where branchIdx = '${branchIdx[branch]}'`
  );
  sendFcm(
    results[0].token,
    `[슈가맨카고] ${results[0].branchName}에 1:1문의가 등록되었습니다.`
  );

  if (ctx.request.body.type == "main") {
    sendEmail(
      "[Cargo] 1:1문의글이 등록되었습니다.",
      '<h2 style="font-weight:400;">이름 : ' +
        name +
        "<br>연락처 : " +
        phone +
        "<br>문의지점 : " +
        branches[branch] +
        "<br>스토리지 사이즈 : " +
        storageSize +
        "<br>문의내용 : " +
        subject +
        "<br>알게 된 경로 : " +
        route +
        '<br><a style="font-size:20px;color:blue;" href="http://test.sugarmanwork.com/admin/cargo/requestList.php">1:1문의 바로가기</a></h2>'
    );

    /*
        sendEmail(
            "[Cargo] 1:1문의글이 등록되었습니다.",
            '<h2 style="font-weight:400;">이름 : ' +
                name +
                "<br>연락처 : " +
                phone +
                "<br>문의지점 : " +
                branches[branch] +
                "<br>스토리지 사이즈 : " +
                storageSize +
                "<br>문의내용 : " +
                subject +
                "<br>알게 된 경로 : " +
                route +
                '<br><a style="font-size:20px;color:blue;" href="http://test.sugarmanwork.com/admin/cargo/requestList.php">1:1문의 바로가기</a></h2>',
			result[0].email
        );
		*/
  } else {
    sendEmail(
      "[Cargo] 1:1문의글이 등록되었습니다.",
      '<h2 style="font-weight:400;">이름 : ' +
        name +
        "<br>연락처 : " +
        phone +
        "<br>문의내용 : " +
        subject +
        "<br>알게 된 경로 : " +
        route +
        '<br><a style="font-size:20px;color:blue;" href="http://test.sugarmanwork.com/admin/cargo/requestList.php">1:1문의 바로가기</a></h2>'
    );

    /*
        sendEmail(
            "[Cargo] 1:1문의글이 등록되었습니다.",
            '<h2 style="font-weight:400;">이름 : ' +
                name +
                "<br>연락처 : " +
                phone +
                "<br>문의내용 : " +
                subject +
                "<br>알게 된 경로 : " +
                route +
                '<br><a style="font-size:20px;color:blue;" href="http://test.sugarmanwork.com/admin/cargo/requestList.php">1:1문의 바로가기</a></h2>',
			result[0].email
        );
		*/
  }

  ctx.body = {
    result: "success",
    code: "200",
  };
});

route.post("/franchise", async (ctx, next) => {
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
    kind: "cargo",
    checkYN: "N",
  });

  sendEmail(
    "[Cargo] 가맹 문의글이 등록되었습니다.",
    '<h2 style="font-weight:400;">이름 : ' +
      name +
      "<br>이메일 : " +
      email +
      "<br>연락처 : " +
      phone +
      "<br>문의내용 : " +
      description +
      '<br><a style="font-size:20px;color:blue;" href="http://test.sugarmanwork.com/admin/cargo/franchiseList.php">가맹문의 바로가기</a></h2>'
  );

  ctx.body = {
    result: "success",
    code: "200",
  };
});

route.post("/event", async (ctx, next) => {
  var name = ctx.request.body.name;
  var email = ctx.request.body.email;
  var phone = ctx.request.body.phone;
  var promoIdx = ctx.request.body.promoIdx;
  var branchIdx = ctx.request.body.branchIdx;
  var route = ctx.request.body.route;
  var checkYN = ctx.request.body.checkYN;

  var result = registerPromo.create({
    name: name,
    email: email,
    phone: phone,
    promoIdx: promoIdx,
    route: route,
    checkYN: "N",
  });

  var branches = {
    100: "인천 부평점",
    101: "서울 군자점",
    102: "부천 상동점",
    103: "안양 명학점",
    104: "인천 갈산점",
  };

  const [results, metadata] = await sequelize.query(
    `select branchName, (select token from fcmToken where email = branch.email) token from branch where branchIdx = '${ctx.request.body.branchIdx}'`
  );
  sendFcm(
    results[0].token,
    `[슈가맨카고] ${ctx.request.body.title}에 새로운 신청자가 있습니다.`
  );
  sendEmail(
    "[Cargo] 이벤트 참여글이 등록되었습니다.",
    '<h2 style="font-weight:400;">이름 : ' +
      name +
      "<br>이메일 : " +
      email +
      "<br>연락처 : " +
      phone +
      "<br>지점 : " +
      branches[branchIdx] +
      "<br>이벤트 종류 : " +
      promoIdx +
      "<br>알게된 경로 : " +
      route +
      '<br><a style="font-size:20px;color:blue;" href="http://test.sugarmanwork.com/admin/cargo/promoList.php">이벤트 바로가기</a></h2>'
  );

  ctx.body = {
    result: "success",
    code: "200",
  };
});

route.post("/package", async (ctx, next) => {
  var name = ctx.request.body.name;
  var area = ctx.request.body.area;
  var email = ctx.request.body.email;
  var phone = ctx.request.body.phone;
  var company = ctx.request.body.company;
  var platform = ctx.request.body.platform;
  var delivery_count = ctx.request.body.delivery_count;
  //  var checkYN = ctx.request.body.checkYN;

  console.log(ctx.request.body);
  console.log(ctx.request.body.area);
  console.log(ctx.request.body.name);
  console.log(ctx.request.body.email);
  console.log(ctx.request.body.phone);
  console.log(ctx.request.body.company);
  console.log(ctx.request.body.platform);
  console.log(ctx.request.body.delivery_count);

  await package.create({
    name: name,
    area: area,
    email: email,
    phone: phone,
    company: company,
    platform: platform,
    delivery_count: delivery_count,
  });

  sendEmail(
    "[Cargo] 택배 문의글이 등록되었습니다.",
    '<h2 style="font-weight:400;">이름 : ' +
      name +
      "<br>이메일 : " +
      email +
      "<br>연락처 : " +
      phone +
      "<br>지역 : " +
      area +
      "<br>회사명 : " +
      company +
      "<br>플랫폼 : " +
      platform +
      "<br>월 택배 건수 : " +
      delivery_count +
      "</h2>"
  );

  ctx.body = {
    result: "success",
    code: "200",
  };
});

module.exports = route;
