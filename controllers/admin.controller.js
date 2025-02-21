const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const apiError = require("../utils/apiError");
const sendResponse = require("../utils/response");
const ApiError = require("../utils/apiError");
const adminDB = require("../models/admin.model.js");
const dotenv = require("dotenv");
dotenv.config();

let admin;
exports.addAdmin = asyncHandler(async (req, res, next) => {
  const { userName, password, role } = req.body;
  admin = await adminDB.create({
    userName,
    password,
    role,
  });
  sendResponse(res, 200, `Admin ${admin.userName} Added successfully`);
});
exports.login = asyncHandler(async (req, res, next) => {
  const { userName, password } = req.body;
  if (!userName || !password) {
    throw new apiError("All fields are required", 403);
  } else {
    admin = await adminDB.findOne({ userName });
    if (!admin) {
      throw new apiError("Invalid username", 404);
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      throw new apiError("Invalid password", 404);
    }
  }
  const token = jwt.sign(
    { id: admin._id, userName: admin.userName, role: admin.role },
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
    sameSite: "strict",
  }),
    sendResponse(res, 200, {
      msg: "login successfully",
      admin: true,
      role: admin.role,
      superAdmin: admin.role === "super_admin",
    });
});
exports.getAll = asyncHandler(async (req, res, next) => {
  let query = {};
  const adminRole = req.userRole;

  if (adminRole !== "super_admin") {
    query = { role: { $ne: "super_admin" } };
  }

  const admins = await adminDB.find(query).select("userName role");

  return sendResponse(res, 200, admins);
});
exports.update = asyncHandler(async (req, res, next) => {
  const adminRole = req.userRole;
  let { userName, role, password } = req.body;

  const superAdmin = await adminDB
    .findOne({ role: "super_admin" })
    .select("userName role");

  if (
    adminRole !== "super_admin" &&
    req.params.id === superAdmin._id.toString()
  ) {
    throw new ApiError(
      "You do not have the ability to modify the super admin",
      403
    );
  }

  const admin = await adminDB.findByIdAndUpdate(
    req.params.id,
    { userName, password, role },
    { new: true, runValidators: true }
  );
  if (!admin) throw new ApiError("Admin not found", 404);

  return sendResponse(res, 200, "Updated successfully");
});
exports.delete = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const superAdmin = await adminDB
    .findOne({ role: "super_admin" })
    .select("role");

  if (id === superAdmin._id.toString()) {
    throw new ApiError(
      "You do not have the ability to delete the super admin",
      403
    );
  }

  await adminDB.findByIdAndDelete(id);

  return sendResponse(res, 200, "Deleted successfully");
});
