const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const dbConnection = require("./config/DB_connection");
const apiError = require("./utils/apiError.js");
const adminRoute = require("./routes/admin.route.js");
const userRoute = require("./routes/user.route.js");
const examRoute = require("./routes/exam.route.js");
const error = require("./middlewares/error");
const app = express();
dotenv.config();
dbConnection();

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());
app.use(helmet());
app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);
app.use("/api/exam", examRoute);

app.all("*", (req, res, next) => {
  return next(new apiError(`cant find this route ${req.originalUrl}`, 404));
});

app.use(error);

app.listen(process.env.PORT || 2000, process.env.HOST, () => {
  console.log(
    `Server is running on port ${process.env.PORT} on http://localhost:${
      process.env.PORT || 2000
    }`
  );
});
