const jwt = require("jsonwebtoken");
const ApiError = require("../utils/apiError.js");
const asyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
dotenv.config();

exports.verifyToken = asyncHandler(async (req, res, next) => {
  if (req.cookies["accessToken"]) {
    const Auth = req.cookies["accessToken"];
    jwt.verify(Auth, process.env.SECRET_KEY_JWT, async (err, user) => {
      if (err) return next(new ApiError("Token is not valid or expired", 401));
      req.userId = user.id;
      req.userRole = user.role;
      return next();
    });
  } else {
    throw new ApiError("You are not authenticated", 403);
  }
});

exports.verifyTokenExam = asyncHandler(async (req, res, next) => {
  if (req.cookies["exam"]) {
    const Auth = req.cookies["exam"];
    jwt.verify(Auth, process.env.SECRET_KEY_JWT, async (err, data) => {
      if (err) return next(new ApiError("Token is not valid or expired", 401));
      req.exam = data;
      return next();
    });
  } else {
    throw new ApiError("You are not authenticated", 403);
  }
});

exports.verifyTokenDegree = asyncHandler(async (req, res, next) => {
  if (req.cookies["degree"]) {
    const Auth = req.cookies["degree"];
    jwt.verify(Auth, process.env.SECRET_KEY_JWT, async (err, data) => {
      if (err) return next(new ApiError("Token is not valid or expired", 401));
      req.degree = data;
      return next();
    });
  } else {
    throw new ApiError("You are not authenticated", 403);
  }
});
