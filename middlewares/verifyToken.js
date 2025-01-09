const jwt = require("jsonwebtoken");
const ApiError = require("../utils/apiError.js");

const verifyToken = async (req, res, next) => {
  let token;
  if (req.headers.cookie) {
    token = req.headers.cookie.split("jwt=")[1];
  }

  if (!token) return next(new ApiError("You are not authenticated", 400));

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
    if (err) return next(new ApiError("Token is not valid", 401));
    req.user = user;
    next();
  });
};

module.exports = verifyToken;
