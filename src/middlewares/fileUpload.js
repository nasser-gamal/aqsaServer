const multer = require('multer');
const { config } = require('../config/config');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let path = config.app.filesPath;
    cb(null, path);
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

// const fileFilter = (req, file, cb) => {
//   if (!file) {
//     return cb(new BadRequestError('اختر الصورة'));
//   }

//   const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
//   if (!allowedMimeTypes.includes(file.mimetype)) {
//     return cb(new BadRequestError('الصورة غير صالحة'));
//   }

//   cb(null, true);
// };

const upload = multer({ storage });

module.exports = upload;
