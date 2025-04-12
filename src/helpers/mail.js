const dotenv = require("dotenv");
dotenv.config();
const nodemailer = require("nodemailer");
const UserModel = require("../models/user.model");
const ProductModel = require("../models/product.model");
const SizeModel = require("../models/size.model");

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

let sendMailOrder = async (order, orderDetail) => {
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

  const products = [];

  for (let i = 0; i < orderDetail.products.length; i++) {
    const product = orderDetail.products[i];
    const productDetails = await ProductModel.findById(product.product);
    const sizeDetails = await SizeModel.findById(product.size);

    products.push(`${productDetails.p_name} - ${sizeDetails.name} x ${product.quantity}`);
  }

  let address = [
    order.o_shippingHouseNumber,
    order.o_shippingAddress1,
    order.o_shippingAddress2 || '',
    order.o_shippingCity,
    order.o_shippingCountry,
  ].filter(Boolean).join(', ');
  let mailOptions = {
    from: 'DeLuca Golf Shop',
    to: process.env.ADMIN_MAIL || process.env.USER_MAIL,
    subject: `📢 Thông báo: Đơn hàng mới #${order.o_code}`,
    html: `
      <h2>Đơn hàng mới từ khách hàng</h2>
      <p><strong>Mã đơn hàng:</strong> ${order.o_code}</p>
      <p><strong>Người nhận:</strong> ${order.o_firstName} ${order.o_lastName}</p>
      <p><strong>Số điện thoại:</strong> ${order.o_phone}</p>
      <p><strong>Email:</strong> ${order.o_email}</p>
      <p><strong>Địa chỉ:</strong> ${address}</p>
      <p><strong>Phương thức thanh toán:</strong> ${order.o_payment === 'pay-cash' ? 'Thanh toán khi nhận hàng' : 'Thanh toán QR Code'}</p>
      <p><strong>Tổng tiền:</strong> ${order.o_totalPrice.toLocaleString('vi-VN')} đ</p>
      <p><strong>Trạng thái đơn hàng:</strong> ${order.o_status}</p>
      <p><strong>Sản phẩm:</strong></p>
      ${products.map(product => `<p>${product}</p>`).join('\n')}
      <p><strong>Thời gian đặt hàng:</strong> ${new Date(order.createdAt).toLocaleString('vi-VN')}</p>
      <hr>
      <p>Vui lòng kiểm tra hệ thống để xử lý đơn hàng sớm nhất.</p>
    `,
  };

  UserModel.find({ role: 'admin' })
  .then((admins) => {
    admins.forEach(admin => {
      mailOptions.to = admin.email;
      transporter.sendMail(mailOptions);
    });
  });
};

module.exports = {
  sendMail,
  sendMailPassword,
  sendMailForgotPassword,
  sendMailContact,
  sendMailOrder
};
