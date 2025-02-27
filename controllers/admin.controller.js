const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const apiError = require("../utils/apiError");
const sendResponse = require("../utils/response");
const ApiError = require("../utils/apiError");
const adminDB = require("../models/admin.model.js");
const dotenv = require("dotenv");
dotenv.config();

exports.addAdmin = asyncHandler(async (req, res, next) => {
  const { userName, password, role } = req.body;
  const admin = await adminDB.create({
    userName,
    password,
    role,
  });
  sendResponse(res, 200, `Admin ${admin.userName} Added successfully`);
});
exports.login = asyncHandler(async (req, res, next) => {
  const { userName, password } = req.body;

  const admin = await adminDB.findOne({ userName });
  if (!admin) {
    throw new apiError("هذا المسئول غير موجود", 404);
  }
  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    throw new apiError("كلمه السر خاطئه", 404);
  }

  const token = jwt.sign(
    { id: admin._id, role: admin.role },
    process.env.SECRET_KEY_JWT,
    {
      expiresIn: process.env.EXPIRE_JWT_AUTH,
    }
  );
  const expirationDate = new Date();
  expirationDate.setHours(expirationDate.getHours() + 2);
  res.cookie("accessToken", `${token}`, {
    expires: expirationDate,
    httpOnly: true,
    secure: process.env.MODE === "prod",
    sameSite: "strict",
  }),
    sendResponse(res, 200, {
      msg: "login successfully",
      admin: true,
      role: admin.role,
      superAdmin: admin.role === "super_admin",
      tokenExpiry: process.env.EXPIRE_JWT_AUTH,
    });
});
exports.getAll = asyncHandler(async (req, res, next) => {
  let query = {};
  const adminRole = req.userRole;

  if (adminRole !== "super_admin") {
    query = { role: { $ne: "super_admin" } };
  }

  const admins = await adminDB.find(query).select("userName role");

  if (!admins || admins.length === 0) {
    throw new ApiError("لا يوجد مسئولين", 403);
  }

  return sendResponse(res, 200, admins);
});
exports.update = asyncHandler(async (req, res, next) => {
  const adminRole = req.userRole;
  let { userName, role } = req.body;

  const superAdmin = await adminDB
    .findOne({ role: "super_admin" })
    .select("userName role");

  if (
    adminRole !== "super_admin" &&
    req.params.id === superAdmin._id.toString()
  ) {
    throw new ApiError("ليس لديك القدره علي تعديل المسئول الفائق", 403);
  }

  if (adminRole === "super_admin" && role !== "super_admin") {
    throw new ApiError("لا يمكنك تغير دورك", 403);
  }

  const admin = await adminDB.findByIdAndUpdate(
    req.params.id,
    {
      userName,
      role,
    },
    { new: true, runValidators: true }
  );
  if (!admin) throw new ApiError("هذا المسئول غير موجود", 404);

  return sendResponse(res, 200, "Updated successfully");
});
exports.delete = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const superAdmin = await adminDB
    .findOne({ role: "super_admin" })
    .select("role");

  if (id === superAdmin._id.toString()) {
    throw new ApiError("ليس لديك القدره علي تعديل المسئول الفائق", 403);
  }

  await adminDB.findByIdAndDelete(id);

  return sendResponse(res, 200, "Deleted successfully");
});
