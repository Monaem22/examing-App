const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const ApiError = require("../utils/apiError");

admin_schema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "username number has been required"],
      unique: [true, "admin username number must be unique"],
    },
    password: {
      type: String,
      required: [true, "password has been required"],
      // minlength: [8, "Password must be at least 8 characters long"],
      // maxlength: [20, "Password cannot exceed 20 characters"],
    },
    role: {
      type: [String],
      required: [true, "role cannot be empty"],
      enum: {
        values: ["users", "exams", "admin"],
        message: "'{VALUE}' is not a valid role.",
      },
    },
  },
  {
    timestamps: { createdAt: "creationTime", updatedAt: "lastModified" },
    versionKey: false,
  }
);

admin_schema.pre("save", async function (next) {
  const isModified = this.isModified("password");
  if (!isModified) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});
admin_schema.pre("findOneAndUpdate", async function (next) {
  if (!this.getUpdate().password) return next();
  (this.getUpdate().password = await bcrypt.hash(
    this.getUpdate().password,
    12
  )),
    next();
});
module.exports = mongoose.model("admins", admin_schema);
