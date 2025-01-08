const httpText = require("./httpText");

module.exports = (er, req, res, next) => {
  if (process.env.MODE === "dev") {
    return res.status(er.statusCode || 500).json({
      state: er.httpText || httpText.ERROR,
      statusCode: er.statusCode || 500,
      message: er.message,
      stack: er.stack,
      all_Error: [er],
    });
  } else {
    res.status(er.statusCode).json({
      state: er.httpText,
      statusCode: er.statusCode,
      message: er.message,
    });
  }
};
