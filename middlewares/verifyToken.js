const jwt = require("jsonwebtoken");
const ApiError = require("../utils/apiError.js");
const asyncHandler = require("./asyncHandler");
const dotenv = require("dotenv");
const adminDB = require("../models/admin.model.js");
dotenv.config();

const verifyToken = asyncHandler(async (req, res, next) => {
  const superAdmin = await adminDB.findById(process.env.SUPER_ADMIN);
  if (req.cookies["accessToken"]) {
    const Auth = req.cookies["accessToken"];
    jwt.verify(Auth, process.env.SECRET_KEY_JWT, async (err, user) => {
      if (err) return next(new ApiError("Token is not valid or expired ", 401));
      req.userId = user.id;
      req.isSuperAdmin = user.userName === superAdmin.userName;
      return next();
    });
  } else {
    return next(new ApiError("You are not authenticated", 403));
  }
});

module.exports = verifyToken;
