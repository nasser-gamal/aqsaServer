import multer from 'multer';
import BadRequestError from '../utils/badRequestError.js';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let path = 'uploads';
    if (req.body.imgPath == 'icons') {
      path += '/icons';
    } else {
      path += '/invoices';
    }
    cb(null, path);
  },

  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (!file) {
    return cb(new BadRequestError('اختر الصورة'));
  }

  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(new BadRequestError('الصورة غير صالحة'));
  }

  cb(null, true);
};

const upload = multer({ storage, fileFilter });

export default upload;
