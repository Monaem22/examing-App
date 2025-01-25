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
const error = require("./middlewares/error");
const URL = require("./middlewares/url-origin.js");
const app = express();
dotenv.config();
dbConnection();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());
app.use(helmet());
app.use(URL);
app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);

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
