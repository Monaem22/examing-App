const asyncHandler = require("express-async-handler");
const db = require("../models/admin.model");
const ApiError = require("../utils/apiError");

const Auth = asyncHandler(async (req, res, next) => {
  const admin = await db.findById(req.userId).select("role");
  if (!admin) throw new ApiError("UnAuthenticated", 401);

  const allowedRoles = ["admin", "exams", "user", "super_admin"];
  const role = admin.role;

  if (!allowedRoles.includes(role)) {
    throw new ApiError("UnAuthorized", 401);
  }

  next();
});

module.exports = { Auth };
