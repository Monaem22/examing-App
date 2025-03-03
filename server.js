const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const dbConnection = require("./config/DB_connection");
const apiError = require("./utils/apiError.js");
const adminRoute = require("./routes/admin.route.js");
const userRoute = require("./routes/user.route.js");
const examRoute = require("./routes/exam.route.js");
const error = require("./middlewares/error");
const path = require("path");
const app = express();
dotenv.config();
dbConnection();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://mahmoud-ebrahim-elazony.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "Set-Cookie"],
    credentials: true,
  })
);

app.use(mongoSanitize());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());
app.use(helmet());

// app.use(express.static("dist"));
app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);
app.use("/api/exam", examRoute);

// app.all("*", (req, res, next) => {
//   return next(new apiError(`cant find this route ${req.originalUrl}`, 404));
// });

// app.get("/*", (req, res) => {
//   const pathF = path.join(__dirname, "dist", "index.html");
//   res.sendFile(pathF); // Or 'build'
// });

app.use(error);

app.listen(process.env.PORT || 2000, () => {
  console.log(
    `Server is running on port ${process.env.PORT} on http://localhost:${
      process.env.PORT || 2000
    }`
  );
});
