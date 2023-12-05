const { check } = require('express-validator');
const validatorMiddleware = require('../middlewares/validator');
const { BadRequestError } = require('../utils/apiError');

exports.createAppValidate = [
  check('img').custom((value, { req }) => {
    const imgFile = req.files.img;

    if (!imgFile || imgFile.length === 0) {
      throw new BadRequestError('ادخل صورة التطبيق');
    }

    // Check if the uploaded file is an image
    const allowedImageTypes = ['image/jpeg', 'image/png'];
    if (imgFile) {
      const isImage = imgFile.every((file) =>
        allowedImageTypes.includes(file.mimetype)
      );
        if (!isImage) {
          throw new BadRequestError('الرجاء تحميل صورة صحيحة (jpeg أو png)');
        }
    }

    return true;
  }),
  check('name').trim().notEmpty().withMessage('ادخل اسم التطبيق'),
  check('isLink').notEmpty().withMessage('اختر طريقة الوصول للتطبيق'),
  check('link').custom((value, { req }) => {
    if (req.body.isLink == 'true' && !value) {
      throw new BadRequestError('ادخل رابط التطبيق');
    }
    return true;
  }),
  check('apk').custom((value, { req }) => {
    const apkFile = req.files.apk;

    if (req.body.isLink === 'false' && (!apkFile || apkFile.length === 0)) {
      throw new BadRequestError('حمل التطبيق');
    }

    // Check if the uploaded file is an APK
    const allowedApkTypes = ['application/vnd.android.package-archive'];
    const isApk = apkFile.every((file) =>
      allowedApkTypes.includes(file.mimetype)
    );

    if (!isApk) {
      throw new BadRequestError('الرجاء تحميل ملف APK صحيح');
    }

    return true;
  }),
  check('note').trim().optional(),
  validatorMiddleware,
];

exports.updateAppValidate = [
  check('appId').isInt().withMessage('invalid app id'),
  check('name').trim().notEmpty().withMessage('ادخل اسم التطبيق'),
  check('isLink').notEmpty().withMessage('اختر طريقة الوصول للتطبيق'),
  check('link').custom((value, { req }) => {
    if (req.body.isLink == 'true' && !value) {
      throw new BadRequestError('ادخل رابط التطبيق');
    }
    return true;
  }),
  check('apk').custom((value, { req }) => {
    const apkFile = req.files.apk;

    if (req.body.isLink === 'false' && (!apkFile || apkFile.length === 0)) {
      throw new BadRequestError('حمل التطبيق');
    }

    // Check if the uploaded file is an APK
    const allowedApkTypes = ['application/vnd.android.package-archive'];
    if (apkFile) {
      const isApk = apkFile.every((file) =>
        allowedApkTypes.includes(file.mimetype)
      );

      if (!isApk) {
        throw new BadRequestError('الرجاء تحميل ملف APK صحيح');
      }
    }

    return true;
  }),
  check('note').trim().optional(),
  validatorMiddleware,
  validatorMiddleware,
];

exports.getAppValidate = [
  check('appId').isInt().withMessage('invalid app id'),
  validatorMiddleware,
];

exports.deleteAppValidate = [
  check('appId').isInt().withMessage('invalid app id'),
  validatorMiddleware,
];

exports.downloadAppValidate = [
  check('appId').isInt().withMessage('invalid app id'),
  validatorMiddleware,
];
