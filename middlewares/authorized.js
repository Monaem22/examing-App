const asyncHandler = require("./asyncHandler");
const db = require("../models/admin.model");
const apiError = require("../utils/apiError");

const Auth = asyncHandler(async (req, res, next) => {
  const admin = await db.findById(req.userId).select("role");

  if (!admin) return next(new apiError("UnAuthenticated", 401));

  const role = admin.role;

  if (role === "admin" || role === "super_admin") {
    return next();
  }

  const requestedRoute = req.URL.split("/")[2];
  const authorized = role === requestedRoute;

  if (!authorized) {
    return next(new apiError("UnAuthorized", 401));
  }

  next();
});

module.exports = { Auth };
