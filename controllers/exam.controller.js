const asyncHandler = require("../middlewares/asyncHandler.js");
const examsDB = require("../models/exam.model.js");
const usersDB = require("../models/user.model.js");
const ApiError = require("../utils/apiError.js");
const sendResponse = require("../utils/response.js");
const crypto = require("crypto");
const Cloudinary = require("../config/cloudinary.js");

exports.addExam = asyncHandler(async (req, res, next) => {
  const {
    title,
    description,
    grade,
    date,
    time,
    duration,
    degree,
    totalQuestions,
    questions,
  } = req.body;

  const dataNow = new Date().toISOString();

  if (date < dataNow) return next(new ApiError("Date is running out", 403));

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
    degree,
    totalQuestions,
    questions,
    examCode,
    validStudents,
  });

  if (!exam) return next(new ApiError("An error occurred", 500));

  return sendResponse(res, 201, exam._id);
});

exports.addImage = asyncHandler(async (req, res, next) => {
  const { examId } = req.params;
  const image = req.file.path;

  const exam = await examsDB.findById(examId);
  if (!exam) return next(new ApiError("Exam not found", 404));

  const results = await Cloudinary.uploader.upload(image, {
    folder: "examApp",
  });
  if (!results)
    return next(
      new ApiError("An error occurred when uploading the image", 502)
    );

  exam.questionImage = { url: results.url, public_id: results.public_id };

  await exam.save();

  return sendResponse(res, 200, "Image added successfully");
});

exports.updateExam = asyncHandler(async (req, res, next) => {
  const { examId } = req.params;
  const {
    title,
    description,
    grade,
    date,
    time,
    duration,
    degree,
    totalQuestions,
    questions,
  } = req.body;

  const dataNow = new Date().toISOString();

  if (date < dataNow) return next(new ApiError("Date is running out", 403));

  const validStudents = await usersDB.find({ grade: grade }).select({
    studentCode: 1,
    _id: 0,
  });

  const updatedExam = await examsDB.findByIdAndUpdate(
    examId,
    {
      title,
      description,
      grade,
      date,
      time,
      duration,
      degree,
      totalQuestions,
      questions,
      validStudents,
    },
    { new: true, runValidators: true }
  );

  if (!updatedExam) {
    return next(new ApiError("Exam not found", 404));
  }

  return sendResponse(res, 200, updatedExam);
});

exports.getAllExam = asyncHandler(async (req, res, next) => {
  console.log("first")
  const exams = await examsDB.find();

  if (!exams || exams.length === 0) {
    return next(new ApiError("No exams found", 404));
  }

  return sendResponse(res, 200, exams);
});

exports.getExam = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const exam = await examsDB.findById(id);

  if (!exam) return next(new ApiError("Exam not found", 404));

  return sendResponse(res, 200, exam);
});

exports.deleteExam = asyncHandler(async (req, res, next) => {
  const { examId } = req.params;
  const exam = await examsDB.findByIdAndDelete(examId);
  if (exam.questionImage) {
    await Cloudinary.uploader.destroy(exam.questionImage.public_id);
  }

  if (!exam) return next(new ApiError("Exam not found", 404));

  return sendResponse(res, 200, "Exam deleted successfully");
});

exports.deleteImage = asyncHandler(async (req, res, next) => {
  const { examId } = req.params;

  const exam = await examsDB.findById(examId);

  if (!exam) return next(new ApiError("Exam not found", 404));

  if (exam.questionImage) {
    await Cloudinary.uploader.destroy(exam.questionImage.public_id);

    exam.questionImage = undefined;

    await exam.save();
  } else {
    return next(new ApiError("This exam has no image", 403));
  }

  return sendResponse(res, 200, "Image deleted successfully");
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
