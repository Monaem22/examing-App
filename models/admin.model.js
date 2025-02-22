const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const admin_schema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "username number has been required"],
      unique: [true, "هذا المستخدم موجود بالفعل"],
    },
    password: {
      type: String,
      required: [true, "password has been required"],
    },
    role: {
      type: String,
      required: [true, "role cannot be empty"],
      enum: {
        values: ["user", "exams", "admin", "super_admin"],
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

const adminDB = mongoose.model("admins", admin_schema);

module.exports = adminDB;
