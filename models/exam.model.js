
const mongoose = require("mongoose");

const exams_Schema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'exam must have title.'],
    },
    description: String,
    group: [String],
    teacher: String,
    grade: String,
    date: String,
    time: String,
    duration: String,
    exam_code: {
        type: String,
        unique: [true,'exam must have unique code.'],
    },
    total_questions: String,

    valid_students: [{
        student_code: String,
    }],

    questions: [{
        question_type: {
            type: String,
            required:  [true,'question must have type.'],
        },
        question: String,
        answer: String,
        options: [String],
        question_image: String,
        question_code: {
            type: String,
            unique: [true,'question must have unique code.'],
        },
    }],

    students_answers: [{
        student_code: String,
        answers: [
            {
                question_code: String,
                answer: String,
            }
        ],
    }],

}, {
    timestamps: { createdAt: 'creationTime', updatedAt: 'lastModified' },
})

exams_Schema.index({ question_code: 1 }, { unique: true }); 
exams_Schema.index({ exam_code: 1 }, { unique: true }); 

const examsDB = mongoose.model("exams_table", exams_Schema);

module.exports = examsDB;