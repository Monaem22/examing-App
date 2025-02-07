import asyncHandler from "../middlewares/asyncHandler.js";
import examsDB from "../models/exam.model.js";
import sendResponse from "../utils/response.js";

export const addExam = asyncHandler(async (req, res, next) => {
  const { title, description, grade, duration, totalQuestions, questions } =
    req.body;

  const exam = await examsDB.create({
    title,
    description,
    grade,
    duration,
    totalQuestions,
    questions,
  });

  console.log(exam);

  return sendResponse(res, 201, exam);
});
