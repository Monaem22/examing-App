const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

admin_schema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: [true, "phone number has been required"],
      minlength: [11, "phone must equal 11"],
      maxlength: [11, "phone must equal 11"],
      unique: [true, "admin phone number must be unique"],
    },
    password: {
      type: String,
      required: [true, "password has been required"],
      minlength: [8, "Password must be at least 8 characters long"],
      maxlength: [20, "Password cannot exceed 20 characters"],
    },
    role: {
      type: [String],
      required: [true, "role cannot be empty"],
      enum: {
        values: [
          "add-user",
          "add-exam",
          "result-users",
          "show-users",
          "add-admin",
        ],
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
  if (!isModified) return next(); //Don't re-hash if not modified + it will save empty or default value
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

module.exports = new mongoose.model("admin", admin_schema);
