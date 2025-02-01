const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const apiError = require("../utils/apiError");
const sendResponse = require("../utils/response");
const asyncHandler = require("../middlewares/asyncHandler");
const ApiError = require("../utils/apiError");
const adminDB = require("../models/admin.model.js");
let admin;
exports.addAdmin = asyncHandler(async (req, res, next) => {
  try {
    admin = await adminDB.create({
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
    admin = await adminDB.findOne({ userName });
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
  const admins = await adminDB
    .find({ userName: { $ne: "Elshirbini" } })
    .select("userName role");
  return sendResponse(res, 200, admins);
});
exports.getOne = asyncHandler(async (req, res, next) => {
  try {
    admin = await adminDB.findById(req.params.id).select("userName  _id role");
    if (admin.userName === "Elshirbini") {
      return next(new ApiError("You do not have the ability to modify the super admin",403));
    }
  } catch (err) {
    next(new apiError("Not Found", 404));
  }
  return sendResponse(res, 200, admin);
});
exports.update = asyncHandler(async (req, res, next) => {
  let { userName, role, password } = req.body;

  if (userName === "Elshirbini") {
    return next(new ApiError("You do not have the ability to modify the super admin",403));
  }

  await adminDB.findByIdAndUpdate(
    req.params.id,
    { userName , password, role  },
    { new: true, runValidators: true }
  );
  return sendResponse(res, 200, "Updated successfully");
});
exports.delete = asyncHandler(async (req, res, next) => {
  // delete by ID
  if (req.params.id) {
    try {
      const admin = await adminDB.findById(req.params.id).select("userName");

      if (admin.userName === "Elshirbini") {
        return next(new ApiError("You do not have the ability to modify the super admin",403));
      }

      await adminDB.deleteOne({id : req.params.id})

      return sendResponse(res, 200, "Deleted successfully");
    } catch (err) {
      next(new apiError("Not Found", 404));
    }
  } else {
    // delete by uerName
    const { username } = req.query;

    if (username === "Elshirbini") {
      return next(new ApiError("You do not have the ability to modify the super admin",403));
    }
    try {
      await adminDB.findOneAndDelete({ userName: username });
      return sendResponse(res, 200, "Deleted successfully");
    } catch (err) {
      next(new apiError("Not Found", 404));
    }
  }
});
