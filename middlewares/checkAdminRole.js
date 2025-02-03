const ApiError = require("../utils/apiError");

const hasAdminRole = (role) => {
  return role.includes("admin") || role.includes("super_admin");
};

const checkAdminRole = async (req, res, next) => {
  const role = req.userRole;

  if (!hasAdminRole(role)) {
    return next(
      new ApiError("You do not have permission to perform this action", 403)
    );
  }

  next();
};

module.exports = checkAdminRole;
