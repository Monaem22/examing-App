module.exports = (er, req, res, next) => {
  if (process.env.MODE === "dev") {
    return res.status(er.statusCode || 400).json({
      state: er.httpText || "Error",
      statusCode: er.statusCode || 404,
      message: er.message,
      stack: er.stack,
      all_Error: [er],
    });
  } else {
    res.status(er.statusCode || 400).json({
      state: er.httpText,
      statusCode: er.statusCode || 404,
      message: er.message,
    });
  }
};
