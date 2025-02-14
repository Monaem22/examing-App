const jwt = require("jsonwebtoken");
const ApiError = require("../utils/apiError.js");
const asyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
dotenv.config();

const verifyToken = asyncHandler(async (req, res, next) => {
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

module.exports = verifyToken;
