const sendResponse = (res, statuscode, data = null) => {
  const type =
    statuscode >= 200 && statuscode < 300
      ? "Success"
      : statuscode >= 400 && statuscode < 500
      ? "Failed"
      : statuscode >= 500
      ? "Error"
      : "Unknown";
  return res.status(statuscode).json({ type, statuscode, data: data });
};
module.exports = sendResponse;
