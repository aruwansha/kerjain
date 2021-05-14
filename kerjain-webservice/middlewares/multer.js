const multer = require("multer");
const path = require("path");
// import uuid from "uuid/v4";

// admin

// Set storage bank
const storageBank = multer.diskStorage({
  destination: "public/images/bank",
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const uploadBank = multer({
  storage: storageBank,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkImages(file, cb);
  },
}).single("image");

// freelancer

// Set storage service
const storageService = multer.diskStorage({
  destination: "public/images/service",
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const uploadService = multer({
  storage: storageService,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkImages(file, cb);
  },
}).single("image");


// user

// Set storage proofpayment
const storageProofPayment = multer.diskStorage({
  destination: "public/images/order",
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const uploadProofPayment = multer({
  storage: storageProofPayment,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkImages(file, cb);
  },
}).single("image");

// // Check file Type
function checkImages(file, cb) {
  // Allowed ext
  const fileTypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimeType = fileTypes.test(file.mimetype);

  if (mimeType && extName) {
    return cb(null, true);
  } else {
    cb("Error: Images Only !!!");
  }
}

module.exports = { uploadBank, uploadService, uploadProofPayment };
