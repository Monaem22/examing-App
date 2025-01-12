const asyncHandler = require("./asyncHandler");
const db = require("../models/admin.model");
const apiError = require("../utils/apiError");
const Auth = asyncHandler(async (req, res, next) => {
  const admin = await db.findById(req.uerId).select("role");
  admin ? admin : next(new apiError("unAuthenticated", 401));
  const role = [...admin.role];
  authorized = Boolean(
    role.includes(req.originalUrl.split("/")[2].slice(0, 5))
  );
  authorized ? next() : next(new apiError("UnAuthorized", 401));
});
exports.Auth = Auth;
