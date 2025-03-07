const asyncHandler = require("express-async-handler");
const examsDB = require("../models/exam.model.js");
const usersDB = require("../models/user.model.js");
const ApiError = require("../utils/apiError.js");
const sendResponse = require("../utils/response.js");
const crypto = require("crypto");
const Cloudinary = require("../config/cloudinary.js");
const StudentAnswers = require("../models/studentAnswers.js");
const { gradeMap, gradeOrder } = require("../utils/gradeMap.js");
const jwt = require("jsonwebtoken");

exports.addExam = asyncHandler(async (req, res, next) => {
  const { title, description, grade, date, time, duration, questions } =
    req.body;

  const dateNow = new Date();
  dateNow.setHours(dateNow.getHours() + 2);

  const examDateTime = new Date(`${date}T${time}:00Z`);

  if (examDateTime < dateNow) {
    throw new ApiError("هذا الوقت من الماضي اجعله في المستقبل ", 403);
  }

  const validStudents = await usersDB.find({ grade: grade }).select({
    studentCode: 1,
    _id: 0,
  });

  const totalQuestions =
    questions && Array.isArray(questions)
      ? questions.reduce(
          (acc, q) => acc + (q.subQuestions ? q.subQuestions.length : 0),
          0
        )
      : 0;

  const examCode = crypto.randomBytes(4).toString("hex");
  const exam = await examsDB.create({
    title,
    description,
    grade,
    duration: duration.toUpperCase(),
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
  const { title, description, date, time, duration, questions } = req.body;

  const dateNow = new Date();

  dateNow.setHours(dateNow.getHours() + 2);

  const exam = await examsDB.findById(examId);
  if (!exam) throw new ApiError("هذا الامتحان غير موجود", 404);

  if (new Date(`${exam.date}T${exam.time}:00Z`) < dateNow) {
    throw new ApiError("لا يمكنك تعديل الامتحان بعد بدايته", 401);
  }

  const examDateTime = new Date(`${date}T${time}:00Z`);

  if (examDateTime < dateNow) {
    throw new ApiError("هذا الوقت من الماضي اجعله في المستقبل ", 403);
  }

  const validStudents = await usersDB.find({ grade: exam.grade }).select({
    studentCode: 1,
    _id: 0,
  });

  const totalQuestions =
    questions && Array.isArray(questions)
      ? questions.reduce(
          (acc, q) => acc + (q.subQuestions ? q.subQuestions.length : 0),
          0
        )
      : 0;

  exam.title = title;
  exam.description = description;
  exam.date = date;
  exam.time = time;
  exam.duration = duration.toUpperCase();
  exam.totalQuestions = totalQuestions;
  exam.degree = totalQuestions;
  exam.questions = questions;
  exam.validStudents = validStudents;

  await exam.save();

  return sendResponse(res, 200, exam);
});

exports.getAllExam = asyncHandler(async (req, res, next) => {
  const exams = await examsDB.aggregate([
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
        examCode: 1,
        title: 1,
        grade: 1,
        date: 1,
        time: 1,
        duration: 1,
        totalQuestions: 1,
      },
    },
  ]);

  if (!exams || exams.length === 0) {
    throw new ApiError("لا يوجد امتحانات", 404);
  }

  const translatedExams = exams.map((exam) => ({
    ...exam,
    grade: gradeMap[exam.grade],
  }));

  return sendResponse(res, 200, translatedExams);
});

exports.getExam = asyncHandler(async (req, res, next) => {
  const { examId } = req.params;
  const exam = await examsDB.findById(examId);

  if (!exam) throw new ApiError("هذا الامتحان غير موجود", 404);

  return sendResponse(res, 200, exam);
});

exports.deleteExam = asyncHandler(async (req, res, next) => {
  const { examId } = req.params;
  const exam = await examsDB.findByIdAndDelete(examId);

  if (!exam) throw new ApiError("هذا الامتحان غير موجود", 404);

  if (exam.questionImage.public_id) {
    await Cloudinary.uploader.destroy(exam.questionImage.public_id);
  }

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
  if (!exam) throw new ApiError("هذا الامتحان غير موجود", 404);

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
  if (!student) throw new ApiError("هذا الطالب غير موجود", 404);

  const exam = await examsDB.findOne({
    $and: [{ examCode: examCode }, { validStudents: { studentCode } }],
  });

  if (!exam) {
    throw new ApiError(
      "هذا الامتحان غير موجود او ليس مسموح لك بأن تدخل هذا الامتحان",
      404
    );
  }

  const isSubmitted = await StudentAnswers.findOne({
    studentCode,
    exams: { $elemMatch: { examCode: examCode } },
  });
  if (isSubmitted) {
    throw new ApiError("ليس لديك القدره لإعاده الامتحان مره اخري", 403);
  }

  const examDateTime = new Date(`${exam.date}T${exam.time}:00Z`);

  const dateNow = new Date();
  dateNow.setHours(dateNow.getHours() + 2);
  if (examDateTime > dateNow) {
    throw new ApiError(`${exam.date} ${exam.time} : معاد الامتحان`, 403);
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
    throw new ApiError("انتهي الامتحان", 403);
  }

  const token = jwt.sign(
    { examCode: examCode, studentCode: studentCode },
    process.env.SECRET_KEY_JWT,
    { expiresIn: exam.duration.toLowerCase() }
  );

  res.cookie("exam", token, {
    expires: examDateTime,
    httpOnly: true,
    secure: process.env.MODE === "prod",
    sameSite: "strict",
  });

  return sendResponse(res, 200, {
    message: "Login successfully",
    examCode: examCode,
    studentCode: studentCode,
  });
});

exports.loginToDegrees = asyncHandler(async (req, res, next) => {
  const { studentCode } = req.body;

  const student = await usersDB.findOne({ studentCode: studentCode });
  if (!student) throw new ApiError("هذا الطالب غير موجود", 404);

  const token = jwt.sign(
    { studentCode: studentCode },
    process.env.SECRET_KEY_JWT,
    { expiresIn: process.env.EXPIRE_JWT_AUTH }
  );

  const expires = new Date();
  expires.setHours(expires.getHours() + 2);

  res.cookie("degree", token, {
    expires,
    httpOnly: true,
    secure: process.env.MODE === "prod",
    sameSite: "strict",
  });

  return sendResponse(res, 200, {
    message: "Login successfully",
    studentCode,
  });
});

exports.takeExam = asyncHandler(async (req, res, next) => {
  const { studentCode, examCode } = req.exam;

  const student = await usersDB.findOne({ studentCode: studentCode });
  if (!student) throw new ApiError("هذا الطالب غير موجود", 404);

  const exam = await examsDB
    .findOne({
      $and: [{ examCode: examCode }, { validStudents: { studentCode } }],
    })
    .select("-questions.subQuestions.correctAnswer -validStudents");

  if (!exam) {
    throw new ApiError(
      "هذا الامتحان غير موجود او ليس مسموح لك بأن تدخل هذا الامتحان",
      404
    );
  }

  const examDateTime = new Date(`${exam.date}T${exam.time}:00Z`);

  const dateNow = new Date();
  dateNow.setHours(dateNow.getHours() + 2);
  if (examDateTime > dateNow) {
    throw new ApiError(`${exam.date} ${exam.time} : معاد الامتحان`, 403);
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
    throw new ApiError("انتهي الامتحان", 403);
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
    exam,
    examCode,
    studentCode,
  });
});

exports.submit_exam = asyncHandler(async (req, res, next) => {
  const { studentCode, examCode } = req.query;
  const { answers } = req.body;
  const studentCode2 = req.exam.studentCode;
  const examCode2 = req.exam.examCode;

  if (studentCode2 !== studentCode || examCode2 !== examCode) {
    throw new ApiError(
      "كود الامتحان والطالب ليسا نفس كود الامتحان والطالب الذي تم التسجيل بهم",
      401
    );
  }

  const isSubmitted = await StudentAnswers.findOne({
    studentCode,
    exams: { $elemMatch: { examCode: examCode } },
  });
  if (isSubmitted) {
    throw new ApiError("ليس لديك القدره لإعاده الامتحان مره اخري", 403);
  }

  const student = await usersDB.findOne({ studentCode: studentCode });
  if (!student) throw new ApiError("هذا الطالب غير موجود", 404);

  const exam = await examsDB.findOne({
    $and: [{ examCode: examCode }, { validStudents: { studentCode } }],
  });
  if (!exam) {
    throw new ApiError(
      "هذا الامتحان غير موجود او ليس مسموح لك بأن تدخل هذا الامتحان",
      404
    );
  }

  let score = 0;
  const correctedAnswers = answers.map((ans) => {
    const subQuestion = exam.questions
      .flatMap((q) => q.subQuestions)
      .find((q) => q._id.toString() === ans.questionId);

    const isCorrect = subQuestion && subQuestion.correctAnswer === ans.answer;
    if (isCorrect) score += 1;
    return { ...ans, result: isCorrect };
  });

  let submission = await StudentAnswers.findOne({ studentCode });
  if (submission) {
    submission.exams.push({
      examCode,
      answers: correctedAnswers,
      score,
    });
    await submission.save();
  } else {
    submission = await StudentAnswers.create({
      studentCode,
      exams: [
        {
          examCode,
          answers: correctedAnswers,
          score,
        },
      ],
    });
  }

  res.clearCookie("exam")

  return sendResponse(res, 200, submission);
});

exports.studentScores = asyncHandler(async (req, res, next) => {
  const { studentCode } = req.params;
  const student_code = req.degree?.studentCode;
  const userRole = req.userRole;

  if (!userRole) {
    if (studentCode !== student_code) {
      throw new ApiError(
        "StudentCode not the same of StudentCode that logged",
        "كود الطالب ليس نفس كود الطالب الذي تم التسجيل به",
        403
      );
    }
  }

  const studentDegrees = await StudentAnswers.findOne({ studentCode }).select(
    "exams.examCode exams.score -_id"
  );
  if (
    !studentDegrees ||
    !studentDegrees.exams ||
    studentDegrees.exams.length === 0
  )
    throw new ApiError("لا يوجد امتحانات لهذا الطالب", 404);

  const scores = await Promise.all(
    studentDegrees.exams
      .map(async (e) => {
        const exam = await examsDB.findOne({ examCode: e.examCode });
        if (!exam) return null;

        return {
          examCode: exam.examCode,
          studentCode: studentCode,
          examTitle: exam?.title || "Unknown Exam",
          date: exam?.date || "Unknown Date",
          time: exam?.time || "Unknown Time",
          degree: exam.degree,
          score: e.score,
        };
      })
      .filter(Boolean)
  );

  if (scores.includes(null)) {
    throw new ApiError("لا يوجد نتائج لهذا الطالب", 404);
  }

  return sendResponse(res, 200, { scores });
});

exports.getExamDetails = asyncHandler(async (req, res, next) => {
  const { studentCode, examCode } = req.params;

  const studentDegrees = await StudentAnswers.findOne({ studentCode });
  if (!studentDegrees)
    throw new ApiError("لا يوجد هذا الطالب في قائمه النتائج", 404);

  const examSubmission = studentDegrees.exams.find(
    (exam) => exam.examCode === examCode
  );
  if (!examSubmission) {
    throw new ApiError("لا يوجد نتائج لهذا الطالب", 404);
  }

  const exam = await examsDB
    .findOne({ examCode })
    .select("-validStudents -_id");
  if (!exam) throw new ApiError("هذا الامتحان غير موجود", 404);

  const detailedAnswers = exam.questions.flatMap((question) =>
    question.subQuestions.map((subQ) => {
      const studentAnswerObj = examSubmission.answers.find(
        (ans) => ans.questionId.toString() === subQ._id.toString()
      );

      return {
        questionId: subQ._id,
        questionText: subQ.questionText,
        correctAnswer: subQ.correctAnswer,
        studentAnswer: studentAnswerObj?.answer || "لم يجب الطالب",
        isCorrect: studentAnswerObj?.result || false,
      };
    })
  );

  return sendResponse(res, 200, {
    exam,
    detailedAnswers,
    score: examSubmission.score,
  });
});
