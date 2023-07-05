import { body, validationResult } from 'express-validator';

// validation for roles
export const roleValidate = [
  body('name').trim().not().isEmpty().withMessage('ادخل اسم الصلاحية'),
  body('nameAr').trim().not().isEmpty().withMessage('ادخل اسم الصلاحية'),
];

// validation for add new user
export const userValidate = [
  body('accountName').trim().not().isEmpty().withMessage('ادخل اسم الحساب'),
  body('userName').trim().not().isEmpty().withMessage('ادخل اسم صاحب الحساب'),
  body('email').custom((value, { req }) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value && !emailRegex.test(value)) {
      throw new Error('بريد الكتروني غير صالح');
    }
    return true;
  }),
  body('phoneNumber')
    .trim()
    .not()
    .isEmpty()
    .withMessage('ادخل رقم الموبايل')
    .isLength({ min: 11, max: 11 })
    .withMessage('يجب أن يحتوي رقم الهاتف على 11 رقماً')
    .matches(/^01/)
    .withMessage('هذا الرقم غير صالح'),
  body('address').trim().not().isEmpty().withMessage('ادخل  العنوان'),
];

// validation for add new Agent
export const agentValidate = [
  body('nationalId')
    .trim()
    .not()
    .isEmpty()
    .withMessage('ادخل  الرقم القومي ')
    .isLength({ min: 14, max: 14 })
    .withMessage('الرقم القومي يجب أن يكون 14 رقم ')
    .isNumeric()
    .withMessage('الرقم القومي غير صالح'),
  body('accountNumber')
    .trim()
    .not()
    .isEmpty()
    .withMessage('ادخل  رقم الحساب ')
    .isNumeric()
    .withMessage('رقم الحساب غير صالح'),
];

export const updateUserValidate = [
  body('accountName').trim().not().isEmpty().withMessage('ادخل اسم الحساب'),
  body('userName').trim().not().isEmpty().withMessage('ادخل اسم صاحب الحساب'),
  body('email').custom((value, { req }) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value && !emailRegex.test(value)) {
      throw new Error('بريد الكتروني غير صالح');
    }
    return true;
  }),
  body('phoneNumber')
    .trim()
    .not()
    .isEmpty()
    .withMessage('ادخل رقم الموبايل')
    .isLength({ min: 11, max: 11 })
    .withMessage('يجب أن يحتوي رقم الهاتف على 11 رقماً')
    .matches(/^01/)
    .withMessage('هذا الرقم غير صالح'),
  body('address').trim().not().isEmpty().withMessage('ادخل  العنوان'),
];

export const loginValidate = [
  body('phoneNumber').trim().not().isEmpty().withMessage('ادخل رقم الهاتف'),
  body('password').trim().not().isEmpty().withMessage('ادخل كلمة المرور'),
];

export const passwordValidate = [
  body('password').trim().not().isEmpty().withMessage('ادخل  كلمة المرور'),
];

export const linkValidate = [
  body('title').trim().not().isEmpty().withMessage('ادخل اسم الصفحة'),
  body('isLink').trim().not().isEmpty().withMessage('حدد دور اللينك'),
  body('pageURL')
    .trim()
    .custom((value, { req }) => {
      if (req.body.isLink == 'true' && !value) {
        throw new Error('ادخل رابط الصفحة');
      }
      return true;
    }),
  body('order').trim().not().isEmpty().withMessage('ادخل ترتيب اللينك'),
  body('imgPath').trim().not().isEmpty().withMessage('ادخل مكان حفظ الصورة'),
];

export const pageValidate = [
  body('title').trim().not().isEmpty().withMessage('ادخل اسم الصفحة'),
  body('pageURL').trim().not().isEmpty().withMessage('ادخل رابط الصفحة'),
  body('order').trim().not().isEmpty().withMessage('ادخل ترتيب الصفحة'),
  body('linkId').trim().not().isEmpty().withMessage('ادخل بند الرابط'),
  body('imgPath').trim().not().isEmpty().withMessage('ادخل مكان حفظ الصورة'),
];

export const bankValidate = [
  body('bankName').trim().not().isEmpty().withMessage('ادخل اسم الحساب'),
];

export const bankAccountValidate = [
  body('accountName').trim().not().isEmpty().withMessage('ادخل اسم الحساب'),
  body('bankId').trim().not().isEmpty().withMessage('ادخل نوع الحساب'),
  body('bankNumber').trim().not().isEmpty().withMessage('ادخل رقم الحساب'),
  body('balance')
    .trim()
    .not()
    .isEmpty()
    .withMessage('ادخل الرصيد الافتتاحي للحساب'),
];

export const depositeValidate = [
  body('bankAccountId').not().isEmpty().withMessage('اختر البنك'),
  body('type').not().isEmpty().withMessage('اختر نوع العملية'),
  body('number')
    .not()
    .isEmpty()
    .withMessage('ادخل الرقم')
    .isNumeric()
    .withMessage('الرقم غير صالح'),
  body('amount')
    .not()
    .isEmpty()
    .withMessage('ادخل التكلفة')
    .isNumeric()
    .withMessage('التكلفة يجب ان تكون رقم'),
  body('providerFees')
    .not()
    .isEmpty()
    .withMessage('ادخل رسوم المزود')
    .isNumeric()
    .withMessage('رسوم المزود يجب ان يكون رقم'),
  body('providerRevenue')
    .not()
    .isEmpty()
    .withMessage('ادخل عائد المزود')
    .isNumeric()
    .withMessage('عائد المزود يجب ان تكون رقم'),
];
export const withDrawValidate = [
  body('bankAccountId').not().isEmpty().withMessage('اختر الحساب'),
  body('type').not().isEmpty().withMessage('اختر نوع العملية'),
  body('number')
    .not()
    .isEmpty()
    .withMessage('ادخل الرقم')
    .isNumeric()
    .withMessage('الرقم غير صالح'),
  body('amount')
    .not()
    .isEmpty()
    .withMessage('ادخل التكلفة')
    .isNumeric()
    .withMessage('التكلفة يجب ان تكون رقم'),
  body('providerFees')
    .not()
    .isEmpty()
    .withMessage('ادخل رسوم المزود')
    .isNumeric()
    .withMessage('رسوم المزود يجب ان يكون رقم'),
  body('providerPercentage')
    .not()
    .isEmpty()
    .withMessage('ادخل عائد المزود')
    .isNumeric()
    .withMessage('عائد المزود يجب ان تكون رقم'),
  body('agentDeduction')
    .not()
    .isEmpty()
    .withMessage('ادخل المخصوم من المركز')
    .isNumeric()
    .withMessage('المخصوم من المركز يجب ان يكون رقم'),
  body('agentRevenue')
    .not()
    .isEmpty()
    .withMessage('ادخل عائد المركز')
    .isNumeric()
    .withMessage('عائد المركز يجب ان تكون رقم'),
];

export const transferValidate = [
  body('senderId').not().isEmpty().withMessage('ادخل الحساب المحول منه'),
  body('recipientId').not().isEmpty().withMessage('ادخل الحساب المحول إليه'),
  body('amountTotal')
    .not()
    .isEmpty()
    .withMessage('ادخل المبلغ المراد تحويله')
    .isNumeric()
    .withMessage('المبلغ يجب أن يكون قيمة'),
];

export const categoryValidate = [
  body('name').not().isEmpty().withMessage('ادخل اسم الخدمة'),
];

export const segmentValidate = [
  body('serviceId').not().isEmpty().withMessage('اختر الخدمة'),
  body('title').not().isEmpty().withMessage('ادخل الشريحة'),
  body('start').not().isEmpty().withMessage('ادخل بداية الشريحة'),
  body('percentage').not().isEmpty().withMessage('ادخل النسبة او العمولة'),
];

export const commissionValidate = [
  body('serviceId').not().isEmpty().withMessage('اختر الخدمة'),
  body('agentId').not().isEmpty().withMessage('اختر الوكيل'),
  body('amountTotal').not().isEmpty().withMessage('ادخل القيمة'),
  body('count').not().isEmpty().withMessage('ادخل عدد العمليات'),
];

export const permissionValidate = [
  body('linkId').not().isEmpty().withMessage('اختر الصلاحيات المتاحة'),
  body('roleId').not().isEmpty().withMessage('اختر الصلاحية'),
];

export const claimsValidate = [
  body('systemMenuId').not().isEmpty().withMessage('اختر'),
  body('claims').custom((value, { req }) => {
    if (value.length < 1) {
      throw new Error('ادخل الصلاحيات المتاحة للصفحة');
    }
    return true;
  }),
];

export function validateInputs(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }
  next();
}
