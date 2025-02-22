const asyncHandler = require("express-async-handler");
const usersDB = require("../models/user.model");
const ApiError = require("../utils/apiError");
const sendResponse = require("../utils/response");
const crypto = require("crypto");
const { gradeMap, gradeOrder } = require("../utils/gradeMap.js");

exports.addStudent = asyncHandler(async (req, res, next) => {
  const { name, grade, studentMobile, parentMobile } = req.body;

  const studentCode = crypto.randomBytes(4).toString("hex");

  const userDoc = await usersDB.create({
    name,
    grade,
    studentMobile,
    parentMobile,
    studentCode,
  });

  if (!userDoc) {
    throw new ApiError("An error occurred when creating user", 400);
  }

  return sendResponse(res, 201, "Student created successfully");
});

exports.updateStudent = asyncHandler(async (req, res, next) => {
  const { name, grade, studentMobile, parentMobile } = req.body;
  const { studentId } = req.params;

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

  if (!studentDoc) throw new ApiError("هذا الطالب غير موجود", 404);

  return sendResponse(res, 200, "Student updated successfully");
});

exports.deleteStudent = asyncHandler(async (req, res, next) => {
  const { studentId } = req.params;

  const student = await usersDB.findByIdAndDelete(studentId);
  if (!student) throw new ApiError("هذا طالب غير موجود", 404);

  return sendResponse(res, 200, "Student deleted successfully");
});

exports.getAllStudents = asyncHandler(async (req, res, next) => {
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
        _id: 1,
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
    grade: gradeMap[student.grade],
  }));

  return sendResponse(res, 200, translatedStudents);
});

exports.getOneStudent = asyncHandler(async (req, res, next) => {
  const student = await usersDB.findById(req.params.id);
  if (!student) throw new ApiError("هذا الطالب غير موجود", 404);
  return sendResponse(res, 200, student);
});
