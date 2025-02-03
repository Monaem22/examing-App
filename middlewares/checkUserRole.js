const ApiError = require("../utils/apiError");

const hasUserRole = (role) => {
  const allowedRoles = ["admin", "user", "super_admin"];
  return allowedRoles.includes(role);
};

const checkUserRole = (req, res, next) => {
  const userRole = req.userRole;
  console.log(`userRole: ${userRole}`);
  console.log(hasUserRole(userRole));

  if (!userRole || !hasUserRole(userRole)) {
    return next(
      new ApiError("You do not have permission to perform this action", 403)
    );
  }
  next();
};

module.exports = checkUserRole;
