const nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

function sendEmail(title, txt) {
  var transporter = nodemailer.createTransport({
    host: 'smtp.naver.com', //SMTP 서버 주소
    secure: true, //보안 서버 사용 false로 적용시 port 옵션 추가 필요
    auth: {
      user: 'sugarmanwork@naver.com', //메일서버 계정
      pass: 'sugarman2324**' //메일서버 비번
    },
    tls: {
      rejectUnauthorized: false
    },
  });

  var mailOptions = {
    from: 'sugarmanwork@naver.com', //보내는 사람 주소
    to: 'sugarmanwork@gmail.com', //받는 사람 주소
    subject: title, //제목
    html: txt
  };

  //전송 시작!
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      //에러
      console.log('에러남....', error);
    }
    //전송 완료
    console.log("되는건가");
    transporter.close()
  })
}

module.exports = sendEmail;