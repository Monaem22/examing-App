const asyncHandler = require("../middlewares/asyncHandler.js");
const examsDB = require("../models/exam.model.js");
const usersDB = require("../models/user.model.js");
const ApiError = require("../utils/apiError.js");
const sendResponse = require("../utils/response.js");
const crypto = require("crypto");

exports.addExam = asyncHandler(async (req, res, next) => {
  const {
    title,
    description,
    grade,
    date,
    time,
    duration,
    totalQuestions,
    questions,
  } = req.body;

  const validStudents = await usersDB.find({ grade: grade }).select({
    studentCode: 1,
    _id: 0,
  });

  const examCode = crypto.randomBytes(4).toString("hex");
  const exam = await examsDB.create({
    title,
    description,
    grade,
    duration,
    date,
    time,
    totalQuestions,
    questions,
    examCode,
    validStudents,
  });

  if (!exam) return next(new ApiError("An error occurred", 500));

  return sendResponse(res, 201, exam);
});

exports.deleteExam = asyncHandler(async (req, res, next) => {
  const { examId } = req.params;
  const exam = await examsDB.findByIdAndDelete(examId);
  if (!exam) return next(new ApiError("Exam not found", 404));

  return sendResponse(res, 200, "Exam deleted successfully");
});

exports.resetValidStudents = asyncHandler(async (req, res, next) => {
  const { examId } = req.params;
  const exam = await examsDB.findById(examId);
  if (!exam) return next(new ApiError("Exam not found", 404));

  const validStudents = await usersDB.find({ grade: exam.grade }).select({
    studentCode: 1,
    _id: 0,
  });

  exam.validStudents = validStudents;
  await exam.save();

  return sendResponse(res, 200, "success");
});
