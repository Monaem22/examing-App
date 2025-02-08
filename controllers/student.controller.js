const asyncHandler = require("../middlewares/asyncHandler");
const usersDB = require("../models/user.model");
const ApiError = require("../utils/apiError");
const sendResponse = require("../utils/response");
const crypto = require("crypto");
const { gradeMap, gradeOrder } = require("../utils/gradeMap.js");

exports.addStudent = asyncHandler(async (req, res, next) => {
  const { name, grade, studentMobile, parentMobile } = req.body;
  const userId = req.userId;

  if (!userId) return next(new ApiError("User not found", 404));

  if (!name || !grade || !studentMobile || !parentMobile) {
    return next(new ApiError("All fields must me be filled", 403));
  }

  const studentCode = crypto.randomBytes(4).toString("hex");

  const userDoc = await usersDB.create({
    name,
    grade,
    studentMobile,
    parentMobile,
    studentCode,
  });

  if (!userDoc) {
    return next(new ApiError("An error occurred when creating user", 400));
  }

  return sendResponse(res, 201, "Student created successfully");
});

exports.updateStudent = asyncHandler(async (req, res, next) => {
  const { name, grade, studentMobile, parentMobile } = req.body;
  const { studentId } = req.params;

  if (!req.body) return next(new ApiError("No changes", 400));

  const studentDoc = await usersDB.findByIdAndUpdate(
    studentId,
    {
      name,
      grade,
      studentMobile,
      parentMobile,
    },
    { new: true, runValidators: true }
  );

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
    const students = await usersDB.aggregate([
      {
        $addFields: {
          sortOrder: {
            $indexOfArray: [gradeOrder, "$grade"],
          },
        },
      },
      { $sort: { sortOrder: 1 } },
      {
        $project: {
          _id: 0,
          name: 1,
          studentCode: 1,
          grade: 1,
          studentMobile: 1,
          parentMobile: 1,
        },
      },
    ]);

    const translatedStudents = students.map((student) => ({
      ...student,
      grade: gradeMap[student.grade] || "غير معروف",
    }));

    return sendResponse(res, 200, translatedStudents);
  } catch (err) {
    next(err);
  }
});

exports.getOneStudent = asyncHandler(async (req, res, next) => {
  try {
    const Student = await usersDB.findById(req.params.id);
    return sendResponse(res, 200, Student);
  } catch (err) {
    next(new ApiError("Not Found", 404));
  }
});
