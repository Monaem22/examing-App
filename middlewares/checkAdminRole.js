const ApiError = require("../utils/apiError");
const asyncHandler = require("./asyncHandler.js");
const hasAdminRole = (role) => {
  return role === "admin" || role === "super_admin";
};

const checkAdminRole = asyncHandler(async (req, res, next) => {
  const role = req.userRole;

  if (!role || !hasAdminRole(role)) {
    return next(
      new ApiError("You do not have permission to perform this action", 403)
    );
  }

  next();
});

module.exports = checkAdminRole;
