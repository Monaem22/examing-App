const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models/admin.model");
const apiError = require("../utils/apiError");
const sendResponse = require("../utils/response");
const asyncHandler = require("../middlewares/asyncHandler");
let admin;
exports.addAdmin = asyncHandler(async (req, res, next) => {
  try {
    admin = await db.create({
      userName: req.body.userName,
      password: req.body.password,
      role: req.body.role,
    });
  } catch (e) {
    return next(new apiError("This User Already Exist ", 404));
  }
  sendResponse(res, 200, `Admin ${admin.userName} Added successfully`);
});
exports.login = asyncHandler(async (req, res, next) => {
  const { userName, password } = req.body;
  if (!userName || !password) {
    return next(new apiError("All fields are required", 403));
  } else {
    admin = await db.findOne({ userName });
    if (!admin) {
      return next(new apiError("Invalid username or password", 404));
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return next(new apiError("Invalid username or password", 404));
    }
  }
  const token = jwt.sign({ id: admin._id }, process.env.SECRET_KEY_JWT, {
    expiresIn: process.env.EXPIRE_JWT_AUTH,
  });
  const expirationDate = new Date();
  expirationDate.setHours(expirationDate.getHours() + 2);
  res.cookie("accessToken", `${token}`, {
    expires: expirationDate,
    httpOnly: true,
    sameSite: "strict",
  }),
    sendResponse(res, 200, {
      msg: "login successfully",
    });
});
exports.getAll = asyncHandler(async (req, res, next) => {
  const admins = await db.find().select("userName role");
  return sendResponse(res, 200, admins);
});
exports.getOne = asyncHandler(async (req, res, next) => {
  try {
    admin = await db.findById(req.params.id).select("userName  _id role");
  } catch (err) {
    next(new apiError("Not Found", 404));
  }
  return sendResponse(res, 200, admin);
});
exports.update = asyncHandler(async (req, res, next) => {
  let { userName, role, password } = req.body;
  await db.findByIdAndUpdate(
    req.params.id,
    { userName, password, role },
    { new: true, runValidators: true }
  );
  return sendResponse(res, 200, "Updated successfully");
});
exports.delete = asyncHandler(async (req, res, next) => {
  // delete by ID
  if (req.params.id) {
    try {
      await db.findByIdAndDelete(req.params.id);
      return sendResponse(res, 200, "Deleted successfully");
    } catch (err) {
      next(new apiError("Not Found", 404));
    }
  } else {
    // delete by uerName
    const { username } = req.query;
    try {
      await db.findOneAndDelete({ userName: username });
      return sendResponse(res, 200, "Deleted successfully");
    } catch (err) {
      next(new apiError("Not Found", 404));
    }
  }
});
