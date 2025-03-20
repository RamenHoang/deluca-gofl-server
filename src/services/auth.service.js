require("dotenv").config();
const bcrypt = require("bcrypt");
const userModel = require("./../models/user.model");
const JWT = require("./../helpers/jwt");
const {
  sendMail,
  sendMailPassword,
  sendMailForgotPassword,
} = require("./../helpers/mail");
const { v4: uuidv4 } = require("uuid");
const axios = require("axios");
const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const randomString = require("randomstring");

const client = new OAuth2(process.env.GOOGLE_CLIENT_ID);

const saltRounds = 10;

//Admin dang nhap
let login = async (dataLogin) => {
  //Check email is exists ?
  let user = await userModel.findByEmail(dataLogin.email);
  if (!user) {
    return { message: "EMAIL_NOT_EXISTS" };
  }

  if (user.role === "user") {
    return { message: "NOT_PERMISSION" };
  }

  //Check password
  let comparePassword = await user.comparePassword(dataLogin.password);
  if (!comparePassword) {
    return { message: "PASSWORD_IS_WRONG" };
  }

  let token = await JWT.generateToken(user._id);

  return { message: "SUCCESS", token: token, userId: user._id };
};

//Dang nhap binh thuong
let userLogin = async (dataLogin) => {
  //Check email is exists ?
  let user = await userModel.findByEmail(dataLogin.email);
  if (!user) {
    return { message: "EMAIL_NOT_EXISTS" };
  }

  //Check password
  let comparePassword = await user.comparePassword(dataLogin.password);
  if (!comparePassword) {
    return { message: "PASSWORD_IS_WRONG" };
  }

  if (user.isActive === false) {
    return { message: "NON_ACTIVE" };
  }

  let token = await JWT.generateToken(user._id);

  return { message: "SUCCESS", token: token, userId: user._id };
};

//Dang nhap bang facebook
let userLoginWithFacebook = async (data) => {
  let urlGraphFacebook = `https://graph.facebook.com/v2.11/${data.userId}/?fields=name,email,picture&access_token=${data.accessToken}`;

  let response = await axios.get(urlGraphFacebook);

  let password = randomString.generate(8);
  let salt = bcrypt.genSaltSync(saltRounds);
  let passwordHash = bcrypt.hashSync(password, salt);

  //Check email exists ?
  let user = await userModel.findByEmail(response.data.email);

  //If email exists
  if (user) {
    let token = await JWT.generateToken(user._id);
    return { message: "SUCCESS", token: token, userId: user._id };
  }

  let dataUser = {
    username: response.data.name,
    email: response.data.email,
    isActive: true,
    password: passwordHash,
    avatar: response.data.picture.data.url,
  };

  let newUser = await userModel.createNewUser(dataUser);
  let token = await JWT.generateToken(newUser._id);

  let send = await sendMailPassword(email, password);

  if (!send) {
    await userModel.deleteUser(newUser._id);
    return { message: "FAILED_SEND_EMAIL" };
  }

  return { message: "SUCCESS", token: token, userId: newUser._id };
};

//Dang nhap bang google
let userLoginWithGoogle = async (data) => {
  try {
    let verify = await client.verifyIdToken({
      idToken: data.tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    let { email, email_verified, name, picture } = verify.payload;

    if (email_verified) {
      let currentUser = await userModel.findByEmail(email);

      if (currentUser) {
        let token = await JWT.generateToken(currentUser._id);
        return { message: "SUCCESS", token: token, userId: currentUser._id };
      }

      // Create a random password and hash it
      let password = randomString.generate(8);
      let salt = bcrypt.genSaltSync(saltRounds);
      let passwordHash = bcrypt.hashSync(password, salt);

      let dataUser = {
        username: name,
        email: email,
        isActive: true,
        password: passwordHash,
        avatar: picture,
      };

      let newUser = await userModel.createNewUser(dataUser);

      let send = await sendMailPassword(email, password);

      if (!send) {
        await userModel.deleteUser(newUser._id);
        return { message: "FAILED_SEND_EMAIL" };
      }

      let token = await JWT.generateToken(newUser._id);
      return {
        message: "SUCCESS_LOGIN_WITH_GOOGLE",
        token: token,
        userId: newUser._id,
      };
    } else {
      return { message: "EMAIL_NOT_VERIFIED" };
    }
  } catch (error) {
    console.error(error);
    return { message: "ERROR", error: error.message };
  }
};

let forgotPassword = async (data) => {
  let user = await userModel.findByEmail(data.email);
  if (!user) {
    return { message: "USER_NOT_FOUND" };
  }

  let newPassword = randomString.generate(8);
  let salt = bcrypt.genSaltSync(saltRounds);
  let hashPassword = bcrypt.hashSync(newPassword, salt);

  let send = sendMailForgotPassword(data.email, newPassword);

  if (!send) {
    return { message: "FAILED_SEND_EMAIL" };
  }

  await userModel.updatePasswordByEmail(data.email, hashPassword);

  return { message: "SUCCESS" };
};

//Nguoi dung dang ki tai khoan
let register = async (dataUser, protocol, host) => {
  //Check email exists ?
  let user = await userModel.findByEmail(dataUser.email);
  if (user) {
    return { message: "EMAIL_EXISTS" };
  }

  let password = dataUser.password;
  let salt = bcrypt.genSaltSync(saltRounds);
  let hashPassword = bcrypt.hashSync(password, salt);

  // //Delete plain password
  delete dataUser.password;

  //Append hashPassword and verifyToken into dataUser
  dataUser = {
    ...dataUser,
    password: hashPassword,
    verifyToken: uuidv4(),
  };

  let newUser = await userModel.createNewUser(dataUser);

  let linkVerify = `${process.env.API_URL}/api/verify/${newUser.verifyToken}`;

  let send = await sendMail(dataUser.email, linkVerify, newUser);

  if (!send) {
    await userModel.deleteUser(newUser._id);
    return { message: "FAILED_SEND_EMAIL" };
  }

  return { message: "SUCCESS" };
};

let verifyEmail = async (token) => {
  await userModel.verify(token);
  return { message: "ACTIVE", data: "Tài khoản đã được kích hoạt" };
};

module.exports = {
  login,
  register,
  userLogin,
  userLoginWithFacebook,
  userLoginWithGoogle,
  forgotPassword,
  verifyEmail,
};
