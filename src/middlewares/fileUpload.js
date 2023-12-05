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


const upload = multer({ storage });

module.exports = upload;
