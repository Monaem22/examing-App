const asyncHandler = require("./asyncHandler");
const db = require("../models/admin.model");
const apiError = require("../utils/apiError");


const Auth = asyncHandler(async (req, res, next) => {
  const admin = await db.findById(req.userId).select("role");
  admin ? admin : next(new apiError("unAuthenticated", 401));
  const role = [...admin.role];
  authorized = Boolean(role.includes(req.URL.split("/")[2]));
  if (!authorized) {
    return next(new apiError("UnAuthorized", 401));
  }
  next();
});
exports.Auth = Auth;
