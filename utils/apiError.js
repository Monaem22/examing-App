class ApiError extends Error {
  constructor(msg, code, err = undefined) {
    super(msg ? msg : err ? err.details[0].message : "UNKNOWN");
    this.statusCode = code;
    this.httpText =
      code >= 200 && code < 300
        ? "Success"
        : code >= 400 && code < 500
        ? "Failed"
        : code >= 500
        ? "Error"
        : "Unknown";
    this.error = err;
    this.operational = true;
  }
}

module.exports = ApiError;
