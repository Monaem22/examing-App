const multer = require("multer");

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    const allowedMimetype = [
      "image/jpeg",
      "image/png",
      "application/pdf",
      "image/webp",
    ];
    if (!allowedMimetype.includes(file.mimetype)) {
      return console.error("This extension is forbidden");
    }
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
module.exports = upload;
