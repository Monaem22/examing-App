const ApiError = require("../utils/apiError.js");
const asyncHandler = require("express-async-handler");

const hasAdminRole = (role) => {
  return role === "admin" || role === "super_admin";
};

const checkAdminRole = asyncHandler(async (req, res, next) => {
  const userRole = req.userRole;

  if (!userRole || !hasAdminRole(userRole)) {
    throw new ApiError(
      "You do not have permission to perform this action",
      403
    );
  }
  next();
});

const hasUserRole = (role) => {
  return role === "user" || role === "super_admin";
};

const checkUserRole = asyncHandler(async (req, res, next) => {
  const userRole = req.userRole;

  if (!userRole || !hasUserRole(userRole)) {
    throw new ApiError(
      "You do not have permission to perform this action",
      403
    );
  }
  next();
});

const hasExamRole = (role) => {
  return role === "user" || role === "super_admin";
};

const checkExamRole = asyncHandler(async (req, res, next) => {
  const userRole = req.userRole;

  if (!userRole || !hasExamRole(userRole)) {
    throw new ApiError(
      "You do not have permission to perform this action",
      403
    );
  }
  next();
});

module.exports = checkAdminRole;
module.exports = checkUserRole;
module.exports = checkExamRole;
