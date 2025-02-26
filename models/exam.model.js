const mongoose = require("mongoose");
const studentAnswers = require("./studentAnswers.js");

const exams_Schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "exam must have title."],
    },
    description: String,
    grade: {
      type: String,
      enum: ["G4", "G5", "G6", "G7", "G8", "G9", "G10", "G11", "G12"],
    },
    date: String,
    time: String,
    duration: String,
    totalQuestions: Number,
    degree: Number,
    validStudents: [
      {
        studentCode: String,
        _id: false,
      },
    ],
    examCode: {
      type: String,
      required: true,
    },
    questionImage: {
      url: String,
      public_id: String,
    },
    questions: [
      {
        question_title: {
          type: String,
          required : [true , "لا يمكن اضافه او تعديل امتحان به خانات فارغه"]
        },
        subQuestions: [
          {
            _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
            questionText: {
              type: String,
              required : [true , "لا يمكن اضافه او تعديل امتحان به خانات فارغه"]
            },
            correctAnswer: {
              type: String,
              required : [true , "لا يمكن اضافه او تعديل امتحان به خانات فارغه"]
            },
            options: [String],
          },
        ],
      },
    ],
  },
  {
    timestamps: { createdAt: "creationTime", updatedAt: "lastModified" },
  }
);

exams_Schema.index({ examCode: 1 }, { unique: true });

exams_Schema.pre("findOneAndDelete", async function (next) {
  const exam = await this.model.findOne(this.getFilter());
  if (exam) {
    await studentAnswers.findOneAndUpdate(
      { "exams.examCode": exam.examCode },
      { $pull: { exams: { examCode: exam.examCode } } },
      { new: true }
    );
  }
  next();
});

const examsDB = mongoose.model("exams_table", exams_Schema);

module.exports = examsDB;
