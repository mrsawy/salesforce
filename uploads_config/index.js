const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Specify the directory where files will be saved
  },
  filename: function (req, file, cb) {
    const uniqueFilename = uuidv4();
    const extension = file.mimetype.split("/")[1]; // Extract the file extension from the MIME type
    cb(null, file.originalname + "-" + uniqueFilename + "." + extension); // Use the original file name with the extracted extension
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
