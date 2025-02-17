const mongoose = require("mongoose");

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
        question_title: String,
        subQuestions: [
          {
            _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
            questionText: String,
            correctAnswer: String,
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

const examsDB = mongoose.model("exams_table", exams_Schema);

module.exports = examsDB;
