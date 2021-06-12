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

// set storage user
const storageUser = multer.diskStorage({
  destination: "public/images/user",
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const uploadUser = multer({
  storage: storageUser,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkImages(file, cb);
  },
}).single("image");

// set storage service user
const storageServiceUser = multer.diskStorage({
  destination: "public/images/freelancer",
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const uploadServiceUser = multer({
  storage: storageServiceUser,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkImages(file, cb);
  },
}).single("image");

// user

// Set storage proofpayment
const storageProofPayment = multer.diskStorage({
  destination: "public/images/order/proof_payment",
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

// Set storage work
const storageWork = multer.diskStorage({
  destination: "public/images/order/proof_work",
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const uploadWork = multer({
  storage: storageWork,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkFile(file, cb);
  },
}).single("file");

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

function checkFile(file, cb) {
  // Allowed ext
  const fileTypes = /rar|zip|7z/;
  // Check ext
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimeType = fileTypes.test(file.mimetype);

  if (mimeType && extName) {
    return cb(null, true);
  } else {
    cb("Error: Archive Only !!!");
  }
}
module.exports = { uploadBank, uploadService, uploadUser, uploadServiceUser, uploadProofPayment, uploadWork };
