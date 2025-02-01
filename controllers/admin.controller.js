const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const apiError = require("../utils/apiError");
const sendResponse = require("../utils/response");
const asyncHandler = require("../middlewares/asyncHandler");
const ApiError = require("../utils/apiError");
const adminDB = require("../models/admin.model.js");
const dotenv = require("dotenv");
dotenv.config();

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
  const token = jwt.sign(
    { id: admin._id, userName: admin.userName },
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
      superAdmin: admin._id.toString() === process.env.SUPER_ADMIN,
    });
});
exports.getAll = asyncHandler(async (req, res, next) => {
  let query = {};

  if (!req.isSuperAdmin) {
    query = { _id: { $ne: process.env.SUPER_ADMIN } };
  }

  const admins = await adminDB.find(query).select("userName role");

  return sendResponse(res, 200, admins);
});
exports.getOne = asyncHandler(async (req, res, next) => {
  try {
    if (!req.isSuperAdmin && req.params.id === process.env.SUPER_ADMIN) {
      return next(
        new ApiError(
          "You do not have the ability to modify the super admin",
          403
        )
      );
    }
    const admin = await adminDB.findById(req.params.id).select("userName _id role");

    return sendResponse(res, 200, admin);
  } catch (err) {
    return next(new ApiError("Not Found", 404));
  }
});
exports.update = asyncHandler(async (req, res, next) => {
  let { userName, role, password } = req.body;

  if (!req.isSuperAdmin && req.params.id === process.env.SUPER_ADMIN) {
    return next(
      new ApiError("You do not have the ability to modify the super admin", 403)
    );
  }

  await adminDB.findByIdAndUpdate(
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
      if (!req.isSuperAdmin && req.params.id === process.env.SUPER_ADMIN) {
        return next(
          new ApiError(
            "You do not have the ability to delete the super admin",
            403
          )
        );
      }

      await adminDB.findByIdAndDelete(req.params.id);

      return sendResponse(res, 200, "Deleted successfully");
    } catch (err) {
      next(new apiError("Not Found", 404));
    }
  } else {
    // delete by uerName
    const { username } = req.query;
    const superAdmin = await adminDB.findOne({
      _id: process.env.SUPER_ADMIN,
      userName: username,
    });

    if (!req.isSuperAdmin && superAdmin) {
      return next(
        new ApiError(
          "You do not have the ability to delete the super admin",
          403
        )
      );
    }
    try {
      await adminDB.findOneAndDelete({ userName: username });
      return sendResponse(res, 200, "Deleted successfully");
    } catch (err) {
      next(new apiError("Not Found", 404));
    }
  }
});
