const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const users_Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "student must have Name."],
    },
    grade: {
      type: String,
      enum: [
        "G1",
        "G2",
        "G3",
        "G4",
        "G5",
        "G6",
        "G7",
        "G8",
        "G9",
        "G10",
        "G11",
        "G12",
      ],
    },
    address: String,
    studentMobile: String,
    parentMobile: String,
    group: String,
    // student_code: {
    //   type: String,
    //   unique: [true, "student must have unique code."],
    // },
    gmail_Account: String,
    exams: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "exams_table",
        index: true,
      },
    ],
    //admin
    // email: {
    //   type: String,
    //   unique: [true, "user must have unique email."],
    // },
    password: String,
    // The student cannot own roll at present
    // role: {
    //     type: String,
    //     enum: ['student', 'assistant', 'admin'],
    //     default: 'student'
    // },
  },
  {
    timestamps: { createdAt: "creationTime", updatedAt: "lastModified" },
    versionKey: false,
  }
);

// users_Schema.index({ student_code: 1 }, { unique: true });

users_Schema.pre("save", async function (next) {
  const isModified = this.isModified("password");
  if (!isModified) return next(); //Don't re-hash if not modified + it will save empty or default value
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const usersDB = mongoose.model("users_table", users_Schema);

module.exports = usersDB;
