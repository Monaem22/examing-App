const jwt = require("jsonwebtoken");
const ApiError = require("../utils/apiError.js");
const asyncHandler = require("./asyncHandler");
const dotenv = require("dotenv");
dotenv.config();

const verifyToken = asyncHandler(async (req, res, next) => {
  if (req.cookies["accessToken"]) {
    const Auth = req.cookies["accessToken"];
    jwt.verify(Auth, process.env.SECRET_KEY_JWT, async (err, user) => {
      if (err) return next(new ApiError("Token is not valid or expired ", 401));
      req.userId = user.id;
      req.userRole = user.role;
      return next();
    });
  } else {
    return next(new ApiError("You are not authenticated", 403));
  }
});

module.exports = verifyToken;
