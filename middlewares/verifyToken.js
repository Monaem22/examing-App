const jwt = require("jsonwebtoken");
const ApiError = require("../utils/apiError.js");
const asyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
dotenv.config();

exports.verifyToken = asyncHandler(async (req, res, next) => {
  if (req.cookies["accessToken"]) {
    const Auth = req.cookies["accessToken"];
    jwt.verify(Auth, process.env.SECRET_KEY_JWT, async (err, user) => {
      if (err) throw new ApiError("Token is not valid or expired ", 401);
      req.userId = user.id;
      req.userRole = user.role;
      return next();
    });
  } else {
    throw new ApiError("You are not authenticated", 403);
  }
});

exports.verifyTokenExam = asyncHandler(async (req, res, next) => {
  if (req.cookies["data"]) {
    const Auth = req.cookies["data"];
    jwt.verify(Auth, process.env.SECRET_KEY_JWT, async (err, data) => {
      if (err) throw new ApiError("Token is not valid or expired ", 401);
      req.data = data;
      return next();
    });
  } else {
    throw new ApiError("You are not authenticated", 403);
  }
});

// module.exports = verifyToken;
// module.exports = verifyTokenExam;
