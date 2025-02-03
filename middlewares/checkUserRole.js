const ApiError = require("../utils/apiError");

const hasUserRole = (roles) => {
  return roles.includes("user");
};

const checkUserRole = (req, res, next) => {
  const userRoles = req.userRole;

  if (!hasUserRole(userRoles)) {
    return next(
      new ApiError("You do not have permission to perform this action", 403)
    );
  }
  next();
};

module.exports = checkUserRole;
