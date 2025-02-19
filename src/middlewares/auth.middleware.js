const JWT = require("./../helpers/jwt");
const userModel = require("./../models/user.model");

let isAdmin = async (req, res, next) => {
  let tokenFromClient =
    req.body.token ||
    req.headers["authorization"] ||
    (req.cookies ? req.cookies["Authorization"] : "");

  if (tokenFromClient) {
    try {
      //Verify token
      let decoded = await JWT.verifyToken(tokenFromClient);

      //Get user from token
      let user = await userModel.findUserById(decoded.data);

      if (user.role === "user") {
        return res.status(401).json({ message: "NOT_PERMISSION" });
      }

      req.user = user;
      req.token = tokenFromClient;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};

let isLogin = async (req, res, next) => {
  let tokenFromClient = req.body.token || req.headers["authorization"];

  if (tokenFromClient) {
    try {
      //Verify token
      let decoded = await JWT.verifyToken(tokenFromClient);

      //Get user from token
      let user = await userModel.findUserById(decoded.data);

      req.user = user;
      req.token = tokenFromClient;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } else {
    return res.status(401).json({ message: "No_token" });
  }
};

module.exports = {
  isAdmin,
  isLogin,
};
