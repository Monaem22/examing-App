const ApiError = require("../utils/apiError");
const asyncHandler = require("./asyncHandler.js");

const hasUserRole = (role) => {
  return role === "user" || role === "super_admin";
};

const checkUserRole = asyncHandler(async (req, res, next) => {
  const userRole = req.userRole;
  console.log(`userRole: ${userRole}`);
  console.log(hasUserRole(userRole));

  if (!userRole || !hasUserRole(userRole)) {
    return next(
      new ApiError("You do not have permission to perform this action", 403)
    );
  }
  next();
});

module.exports = checkUserRole;
