const httpText = require("./httpText");

class ApiError extends Error {
  constructor(msg, code, err = undefined) {
    super(msg ? msg : err ? err.details[0].message : "UNKNOWN");
    this.statusCode = code;
    this.httpText =
      code >= 200 && code < 300
        ? httpText.SUCCESS
        : code >= 400 && code < 500
        ? httpText.FAILED
        : code >= 500
        ? httpText.ERROR
        : "Unknown";
    this.error = err;
    this.operational = true;
  }
}

module.exports = ApiError;
