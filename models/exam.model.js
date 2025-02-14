const mongoose = require("mongoose");

const exams_Schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "exam must have title."],
    },
    description: String,
    grade: String,
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
        // question_degree: String,
        question_title: String,
        subQuestions: [
          {
            _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
            question: String,
            answer: String,
            options: [String],
          },
        ],
      },
    ],

    // studentsAnswers: [
    //   {
    //     studentCode: String,
    //     answers: [
    //       {
    //         questionId: String,
    //         answer: String,
    //         result: Boolean,
    //       },
    //     ],
    //   },
    // ],
  },
  {
    timestamps: { createdAt: "creationTime", updatedAt: "lastModified" },
  }
);

exams_Schema.index({ examCode: 1 }, { unique: true });

const examsDB = mongoose.model("exams_table", exams_Schema);

module.exports = examsDB;
