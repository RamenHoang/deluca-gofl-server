const dotenv = require("dotenv");
dotenv.config();

const nodemailer = require("nodemailer");

let sendMail = (to, linkVerify) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    service: "Gmail",
    auth: {
      user: process.env.USER_MAIL,
      pass: process.env.PASS_MAIL,
    },
  });

  let mailOptions = {
    from: '"Shop DeLuCa 👻" <DeLuCa@gmail.com>',
    to: to,
    subject: "Xác nhận đăng kí tài khoản",
    html: `<p> Bạn đã đăng kí vào hệ thống DeLuCa,
                    vui lòng click vào đường link này để kích hoạt tài khoản: 
                    <a href=${linkVerify} target="_blank" >${linkVerify}</a>
                </p>`,
  };
  return transporter.sendMail(mailOptions);
};

let sendMailPassword = (to, password) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    service: "Gmail",
    auth: {
      user: "vuongho098@gmail.com",
      pass: "0395251176Aa",
    },
  });

  let mailOptions = {
    from: '"Shop DeLuCa 👻" <DeLuCa@gmail.com>',
    to: to,
    subject: "Mật khẩu đăng nhập ứng dụng",
    html: `<p> Cảm ơn bạn đã đăng nhập vào ứng dụng DeLuCa của chúng tôi. Đây là mật khẩu đăng nhập của bạn. 
                    Bạn nên đổi mật khẩu này thành mật khẩu khác của riêng bạn để đảm bảo bí mật: 
                    <b>${password}</b>
                </p>`,
  };

  return transporter.sendMail(mailOptions);
};

let sendMailForgotPassword = (to, password) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    service: "Gmail",
    auth: {
      user: "vuongho098@gmail.com",
      pass: "0395251176Aa",
    },
  });

  let mailOptions = {
    from: '"Shop DeLuCa 👻" <DeLuCa@gmail.com>',
    to: to,
    subject: "Reset Password",
    html: `<p> Đây là mật khẩu mới của bạn. Bạn nên đăng nhập vào hệ thống và thay đổi mật khẩu này: 
                    <b>${password}</b>
                </p>`,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = {
  sendMail,
  sendMailPassword,
  sendMailForgotPassword,
};
