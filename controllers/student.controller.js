const asyncHandler = require("../middlewares/asyncHandler");
const usersDB = require("../models/user.model");
const ApiError = require("../utils/apiError");
const sendResponse = require("../utils/response");
exports.addStudent = asyncHandler(async (req, res, next) => {
  const { name, gender, grade, studentMobile, parentMobile } = req.body;
  const { user } = req.user;

  if (!user) return next(new ApiError("User not found", 404));

  if (!name || !gender || !grade || !studentMobile || !parentMobile) {
    return next(new ApiError("All fields must me be filled", 403));
  }

  const userDoc = await usersDB.create({
    name,
    gender,
    grade,
    studentMobile,
    parentMobile,
  });

  return sendResponse(res, 201, "User created successfully");
});
