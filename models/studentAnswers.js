const mongoose = require("mongoose");

const studentAnswerSchema = new mongoose.Schema(
  {
    studentCode: { type: String, required: true, unique: true, index: true },
    exams: [
      {
        examCode: { type: String, required: true },
        answers: [
          {
            _id: false,
            questionId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "exams_table.questions.subQuestions",
            },
            answer: String,
            result: Boolean,
          },
        ],
        score: { type: Number, default: 0 },
      },
    ],
  },
  { timestamps: true }
);

const StudentAnswers = mongoose.model("student_answers", studentAnswerSchema);
module.exports = StudentAnswers;
