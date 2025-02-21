const ApiError = require("../utils/apiError.js");
const asyncHandler = require("express-async-handler");

exports.restrictTo = (...roles) =>
  asyncHandler(async (req, res, next) => {
    const userRole = req.userRole;

    if (!userRole || !roles.includes(userRole)) {
      return next(
        new ApiError("You do not have permission to perform this action", 403)
      );
    }
    next();
  });
