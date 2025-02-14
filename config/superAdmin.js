const mongoose = require("mongoose");
const AdminDB = require("../models/admin.model.js");
const asyncHandler = require("express-async-handler");

const superAdmin = asyncHandler(async () => {
  if (mongoose.connection.readyState !== 1) {
    console.error("Mongoose not connected. Please wait...");
    return;
  }
  const userName = "01011638721";
  const password = "MrMahmoud14@##@Ezo";
  const role = "super_admin";
  let existingUser = await AdminDB.findOne({ userName });
  if (existingUser) {
    return console.log({ message: "superAdmin is already existing" });
  }
  await AdminDB.create({ userName, password, role });
  console.log({ message: "superAdmin is created" });
});

module.exports = superAdmin;
