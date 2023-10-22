// const multer = require('multer');
// const path = require('path');
// const destination = path.resolve('temp');

const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  allowedFormats: ['jpg', 'png', 'gif', 'pdf'],
  params: {
    folder: 'files',
  },
});

const upload = multer({ storage: storage });

module.exports = upload;

// const storage = multer.diskStorage({
//   destination,

//   filename: (req, file, cb) => {
//     const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1e9);

//     const newName = `${uniquePrefix}_${file.originalname}`;

//     cb(null, newName);
//   },
// });

// const limits = {
//   fieldSizes: 1024 * 1024,
// };

// const fileFilter = (req, file, cb) => {
//   console.log(file);
//   cb(null, true);
// };

// const upload = multer({
//   storage,
//   limits,
//   fileFilter,
// });
