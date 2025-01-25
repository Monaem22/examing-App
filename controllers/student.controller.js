const asyncHandler = require("../middlewares/asyncHandler");
const usersDB = require("../models/user.model");
const ApiError = require("../utils/apiError");
const sendResponse = require("../utils/response");

exports.addStudent = asyncHandler(async (req, res, next) => {
  const { name, gender, grade, studentMobile, parentMobile } = req.body;
  const userId = req.userId;

  if (!userId) return next(new ApiError("User not found", 404));

  if (!name || !grade || !studentMobile || !parentMobile) {
    return next(new ApiError("All fields must me be filled", 403));
  }

  const userDoc = await usersDB.create({
    name,
    gender,
    grade,
    studentMobile,
    parentMobile,
  });

  if (!userDoc) {
    return next(new ApiError("An error occurred when creating user", 400));
  }

  return sendResponse(res, 201, "Student created successfully");
});

exports.updateStudent = asyncHandler(async (req, res, next) => {
  const { name, gender, grade, studentMobile, parentMobile } = req.body;
  const { studentId } = req.params;

  if (!req.body) return next(new ApiError("No changes", 400));

  const studentDoc = await usersDB.findByIdAndUpdate(studentId, {
    name,
    gender,
    grade,
    studentMobile,
    parentMobile,
  });

  if (!studentDoc) return next(new ApiError("Student not found", 404));

  return sendResponse(res, 200, "Student updated successfully");
});

exports.deleteStudent = asyncHandler(async (req, res, next) => {
  const { studentId } = req.params;

  const student = await usersDB.findByIdAndDelete(studentId);
  if (!student) return next(new ApiError("Student not found", 404));

  return sendResponse(res, 200, "Student deleted successfully");
});

exports.getAllStudents = asyncHandler(async (req, res, next) => {
  try {
    const Students = await db.find();
    return sendResponse(res, 200, Students);
  } catch (err) {
    next(new ApiError("Not Found", 404));
  }
});

exports.getOneStudent = asyncHandler(async (req, res, next) => {
  try {
    const Student = await db.findById(req.params.id);
    return sendResponse(res, 200, Student);
  } catch (err) {
    next(new ApiError("Not Found", 404));
  }
});
