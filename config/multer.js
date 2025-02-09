const multer = require("multer");
const ApiError = require("../utils/apiError");

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    const allowedMimetype = [
      "image/jpeg",
      "image/png",
      "application/pdf",
      "image/webp",
    ];

    if (!file) return new ApiError("File is required", 403);

    if (!allowedMimetype.includes(file.mimetype)) {
      return new ApiError("This extension is forbidden", 403);
    }

    if (file.size > 1024 * 5) {
      return new ApiError(
        "You do not have the ability to upload a file whose size exceeds 5 MB",
        403
      );
    }

    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
module.exports = upload;
