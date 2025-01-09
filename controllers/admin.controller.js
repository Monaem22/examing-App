const asyncHandler = require("../middlewares/asyncHandler");
exports.login = asyncHandler(async (req, res, next) => {
  res.json("Ok");
});
