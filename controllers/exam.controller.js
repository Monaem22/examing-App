const asyncHandler = require("../middlewares/asyncHandler.js");
const examsDB = require("../models/exam.model.js");
const sendResponse = require("../utils/response.js");
const crypto = require("crypto");

exports.addExam = asyncHandler(async (req, res, next) => {
  const { title, description, grade, duration, totalQuestions, questions } =
    req.body;

  const examCode = crypto.randomBytes(4).toString("hex");
  const exam = await examsDB.create({
    title,
    description,
    grade,
    duration,
    totalQuestions,
    questions,
    examCode
  });


  return sendResponse(res, 201, exam);
});
