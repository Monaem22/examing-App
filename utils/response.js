const httpText = require("./httpText");
export const sendResponse = (res, statuscode, data = null) => {
  const type =
    statuscode >= 200 && code < 300
      ? httpText.SUCCESS
      : statuscode >= 400 && code < 500
      ? httpText.FAILED
      : statuscode >= 500
      ? httpText.ERROR
      : "Unknown";
  return res.status(statuscode).json({ type, statuscode, data: data });
};
