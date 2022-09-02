const multer = require("multer");
const storage = require("../utils/multerStorage");

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      cb(null, true);
    } else {
      cb("File should be a xlsx", false);
    }
  },
});

module.exports = upload;
