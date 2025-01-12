const httpText = require("./httpText");
const sendResponse = (res, statuscode, data = null) => {
  const type =
    statuscode >= 200 && statuscode < 300
      ? httpText.SUCCESS
      : statuscode >= 400 && statuscode < 500
      ? httpText.FAILED
      : statuscode >= 500
      ? httpText.ERROR
      : "Unknown";
  return res.status(statuscode).json({ type, statuscode, data: data });
};
module.exports = sendResponse;
