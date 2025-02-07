const asyncHandler = require("./asyncHandler");
const url = asyncHandler(async (req, res, next) => {
  req.URL = req.originalUrl;
  next();
});
module.exports = url;
