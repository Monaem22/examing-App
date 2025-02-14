const asyncHandler = require("express-async-handler");
const examsDB = require("../models/exam.model.js");
const usersDB = require("../models/user.model.js");
const ApiError = require("../utils/apiError.js");
const sendResponse = require("../utils/response.js");
const crypto = require("crypto");
const Cloudinary = require("../config/cloudinary.js");

exports.addExam = asyncHandler(async (req, res, next) => {
  const { title, description, grade, date, time, duration, questions } =
    req.body;

  const dataNow = new Date().toISOString();

  if (date < dataNow) throw new ApiError("Date is running out", 403);

  const validStudents = await usersDB.find({ grade: grade }).select({
    studentCode: 1,
    _id: 0,
  });

  const totalQuestions = questions.reduce(
    (acc, q) => acc + q.subQuestions.length,
    0
  );

  const examCode = crypto.randomBytes(4).toString("hex");
  const exam = await examsDB.create({
    title,
    description,
    grade,
    duration,
    date,
    time,
    questions,
    examCode,
    validStudents,
    totalQuestions,
    degree: totalQuestions,
  });

  if (!exam) throw new ApiError("An error occurred", 500);

  return sendResponse(res, 201, exam._id);
});

exports.addImage = asyncHandler(async (req, res, next) => {
  const { examId } = req.params;
  const image = req.file.path;

  const exam = await examsDB.findById(examId);
  if (!exam) throw new ApiError("Exam not found", 404);

  const results = await Cloudinary.uploader.upload(image, {
    folder: "examApp",
  });
  if (!results) {
    throw new ApiError("An error occurred when uploading the image", 502);
  }

  exam.questionImage = { url: results.url, public_id: results.public_id };

  await exam.save();

  return sendResponse(res, 200, "Image added successfully");
});

exports.updateExam = asyncHandler(async (req, res, next) => {
  const { examId } = req.params;
  const { title, description, grade, date, time, duration, questions } =
    req.body;

  const dataNow = new Date().toISOString();

  if (date < dataNow) throw new ApiError("Date is running out", 403);

  const validStudents = await usersDB.find({ grade: grade }).select({
    studentCode: 1,
    _id: 0,
  });

  const totalQuestions = questions.reduce(
    (acc, q) => acc + q.subQuestions.length,
    0
  );

  const updatedExam = await examsDB.findByIdAndUpdate(
    examId,
    {
      title,
      description,
      grade,
      date,
      time,
      duration,
      totalQuestions,
      degree: totalQuestions,
      questions,
      validStudents,
    },
    { new: true, runValidators: true }
  );

  if (!updatedExam) throw new ApiError("Exam not found", 404);

  return sendResponse(res, 200, updatedExam);
});

exports.getAllExam = asyncHandler(async (req, res, next) => {
  const exams = await examsDB.find();

  if (!exams || exams.length === 0) {
    throw new ApiError("No exams found", 404);
  }

  return sendResponse(res, 200, exams);
});

exports.getExam = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const exam = await examsDB.findById(id);

  if (!exam) throw new ApiError("Exam not found", 404);

  return sendResponse(res, 200, exam);
});

exports.deleteExam = asyncHandler(async (req, res, next) => {
  const { examId } = req.params;
  const exam = await examsDB.findByIdAndDelete(examId);
  if (exam.questionImage) {
    await Cloudinary.uploader.destroy(exam.questionImage.public_id);
  }

  if (!exam) throw new ApiError("Exam not found", 404);

  return sendResponse(res, 200, "Exam deleted successfully");
});

exports.deleteImage = asyncHandler(async (req, res, next) => {
  const { examId } = req.params;

  const exam = await examsDB.findById(examId);

  if (!exam) throw new ApiError("Exam not found", 404);

  if (exam.questionImage) {
    await Cloudinary.uploader.destroy(exam.questionImage.public_id);

    exam.questionImage = undefined;

    await exam.save();
  } else {
    throw new ApiError("This exam has no image", 403);
  }

  return sendResponse(res, 200, "Image deleted successfully");
});

exports.resetValidStudents = asyncHandler(async (req, res, next) => {
  const { examId } = req.params;
  const exam = await examsDB.findById(examId);
  if (!exam) throw new ApiError("Exam not found", 404);

  const validStudents = await usersDB.find({ grade: exam.grade }).select({
    studentCode: 1,
    _id: 0,
  });

  exam.validStudents = validStudents;
  await exam.save();

  return sendResponse(res, 200, "success");
});

exports.loginToExam = asyncHandler(async (req, res, next) => {
  const { studentCode, examCode } = req.body;
  const student = await usersDB.findOne({ studentCode: studentCode });
  if (!student) throw new ApiError("Student not found", 404);

  const exam = await examsDB.findOne({
    $and: [{ examCode: examCode }, { validStudents: { studentCode } }],
  });

  if (!exam) {
    throw new ApiError("Exam not found or you can't enter this exam", 404);
  }

  const examDateTime = new Date(`${exam.date}T${exam.time}:00Z`);

  const dateNow = new Date();
  dateNow.setHours(dateNow.getHours() + 2);
  if (examDateTime > dateNow) {
    throw new ApiError(`The data of exam  : ${exam.date} ${exam.time}`, 403);
  }

  let duration = exam.duration;
  if (duration.includes("H")) {
    duration = Number(duration.split("H")[0]);
    examDateTime.setHours(examDateTime.getHours() + duration);
  } else if (duration.includes("M")) {
    duration = Number(duration.split("M")[0]);
    examDateTime.setMinutes(examDateTime.getMinutes() + duration);
  }

  if (examDateTime < dateNow) {
    throw new ApiError("The exam is over", 403);
  }

  const remainingTime = examDateTime - dateNow; // time + duration - date.now

  const hours = Math.floor(remainingTime / (1000 * 60 * 60));
  const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

  return sendResponse(res, 200, {
    remainingTime: {
      hours,
      minutes,
      seconds,
    },
    examCode,
    studentCode,
  });
});

exports.submit_exam = asyncHandler(async (req, res, next) => {
  const { studentCode, examCode } = req.query;
  const { answers } = req.body;

  const student = await usersDB.findOne({
    // $and: [
      // { 
        studentCode: studentCode ,
        exams: { $elemMatch: { examCode: examCode , isSubmitted: false} }
      // },
    //   {exams: { $elemMatch: { examCode: examCode } }},
    // ]
  });
  // if (student.exams.includes(examCode)) {
  //   throw new ApiError("You don't have the ability to resubmit", 403);
  // }

  if (!student) throw new ApiError("Student not found or You don't have the ability to resubmit", 404);

  const exam = await examsDB.findOne({
    $and: [{ examCode: examCode }, { validStudents: { studentCode } }],
  });
  if (!exam) {
    throw new ApiError("Exam not found or you can't enter this exam", 404);
  }

  // let score = 0;
  // const correctedAnswers = answers.map((ans) => {
  //   const subQuestion = exam.questions
  //     .flatMap((q) => q.subQuestions)
  //     .find((q) => q._id.toString() === ans.questionId);

  //   const isCorrect = subQuestion && subQuestion.answer === ans.answer;     // if frontend send me with every subQuestion  id   , we will use this method
  //   if (isCorrect) score += 1;
  //   return { ...ans, result: isCorrect };
  // });

  const allSubQuestions = exam.questions.flatMap((q) => q.subQuestions);

  if (answers.length !== allSubQuestions.length) {
    throw new ApiError("Number of answers does not match exam questions", 403);
  }

  let score = 0;
  const correctedAnswers = answers.map((ans, index) => {
    const subQuestion = allSubQuestions[index];
    const isCorrect = subQuestion.answer === ans;
    if (isCorrect) score += 1;
    return {
      questionId: subQuestion._id,
      answer: ans,
      result: isCorrect,
    };
  });

  const submission = await StudentAnswers.create({
    studentCode,
    exams: [
      {
        examCode,
        answers: correctedAnswers,
        score,
      },
    ],
  });

  return sendResponse(res, 200, submission);
});
