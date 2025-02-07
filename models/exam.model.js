const mongoose = require("mongoose");

const exams_Schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "exam must have title."],
    },
    description: String,
    group: [String],
    teacher: String,
    grade: String,
    date: String,
    time: String,
    duration: String,
    totalQuestions: String,

    validStudents: [
      {
        studentCode: String,
      },
    ],
    examCode: {
      type: String,
      required: true,
    },

    questions: [
      {
        questionType: {
          type: String,
          required: [true, "question must have type."],
        },
        question: String,
        subQuestions: [
          {
            question: String,
            answer: String,
            options: [String],
          },
        ],
        questionImage: String,
        questionCode: {
          type: String,
          unique: [true, "question must have unique code."],
        },
      },
    ],

    studentsAnswers: [
      {
        studentCode: String,
        answers: [
          {
            questionCode: String,
            answer: String,
          },
        ],
      },
    ],
  },
  {
    timestamps: { createdAt: "creationTime", updatedAt: "lastModified" },
  }
);

exams_Schema.index({ questionCode: 1 }, { unique: true });
exams_Schema.index({ examCode: 1 }, { unique: true });

const examsDB = mongoose.model("exams_table", exams_Schema);

module.exports = examsDB;
