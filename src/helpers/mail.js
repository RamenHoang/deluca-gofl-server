const dotenv = require("dotenv");
dotenv.config();

const nodemailer = require("nodemailer");

let sendMail = (to, linkVerify, user) => {
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
    from: 'DeLuca Golf Shop',
    to: to,
    subject: "✅ Xác nhận đăng ký tài khoản DeLuca Golf Shop",
    html: `
    <p>Xin chào ${user.username},</p>
    <p>Cảm ơn bạn đã đăng ký tài khoản tại DeLuca Golf Shop – nơi cung cấp trang phục golf cao cấp & phong cách! 🏌️‍♂️</p>
    <p>Để hoàn tất quá trình đăng ký và kích hoạt tài khoản, vui lòng nhấp vào liên kết bên dưới:</p>
    <p><a href=${linkVerify} target="_blank" >🔗 Kích hoạt tài khoản ngay</a></p>
    <p>Nếu bạn không thực hiện đăng ký này, vui lòng bỏ qua email này hoặc liên hệ với chúng tôi qua hotline: 0123-456-789 để được hỗ trợ.</p>
    <p>Chúc bạn có những trải nghiệm mua sắm tuyệt vời cùng DeLuca Golf Shop!</p>
    <p>🏌️‍♂️ DeLuca Golf Shop</p>
    <p>🌍 Website: deluca.vn</p>
    <p>📞 Hotline: 090 329 68 12</p>
    <p>📧 Email: mksvietnam@gmail.com</p>
    `,
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
      user: process.env.USER_MAIL,
      pass: process.env.PASS_MAIL,
    },
  });

  let mailOptions = {
    from: 'DeLuca Golf Shop',
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
      user: process.env.USER_MAIL,
      pass: process.env.PASS_MAIL,
    },
  });

  let mailOptions = {
    from: 'DeLuca Golf Shop',
    to: to,
    subject: "Reset Password",
    html: `<p> Đây là mật khẩu mới của bạn. Bạn nên đăng nhập vào hệ thống và thay đổi mật khẩu này: 
                    <b>${password}</b>
                </p>`,
  };

  return transporter.sendMail(mailOptions);
};

let sendMailContact = (to, data) => {
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
    from: 'DeLuca Golf Shop',
    to: process.env.DESTINATION_CONTACT_MAIL,
    subject: "Liên hệ từ khách hàng",
    html: `<p> Tên: ${data.name} </p>
                <p> Email: ${data.email} </p>
                <p> Nội dung: ${data.message} </p>`,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = {
  sendMail,
  sendMailPassword,
  sendMailForgotPassword,
  sendMailContact
};
