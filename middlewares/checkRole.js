const ApiError = require("../utils/apiError.js");
const asyncHandler = require("express-async-handler");

exports.restrictTo = (...roles) =>
  asyncHandler(async (req, res, next) => {
    const userRole = req.userRole;

    if (!userRole || !roles.includes(userRole)) {
      return next(new ApiError("ليس لديك الإذن للقيام بهذا الإجراء", 403));
    }
    next();
  });
