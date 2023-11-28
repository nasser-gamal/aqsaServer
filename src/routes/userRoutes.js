const express = require('express');
const router = express.Router();

const {
  createUser,
  getUsers,
  getUser,
  updateUser,
  updatePasswordManual,
  updatePassword,
  updateUserStatus,
  deleteUser,
} = require('../controllers/userControllers.js');
const { protected, allowedTo, checkActive } = require('../middlewares/auth');
const { checkPassword } = require('../middlewares/checkPassword');
const {
  createUserValidate,
  getUserValidate,
  updateUserValidate,
  updateUserStatusValidate,
  deleteUserValidate,
  updatePasswordValidate,
  updatePasswordManualValidate,
} = require('../validator/userValidator');



router.use(protected);
router.use(checkActive);
router.use(allowedTo(['superAdmin']));

router.route('/').get(getUsers).post(createUserValidate, createUser);

router
  .route('/:userId')
  .get(getUserValidate, getUser)
  .put(updateUserValidate, updateUser)
  .delete(checkPassword, deleteUserValidate, deleteUser);

router.put(
  '/update-password/:userId',
  checkPassword,
  updatePasswordValidate,
  updatePassword
);

router.put(
  '/update-password-manual/:userId',
  updateUser,
  updatePasswordManualValidate,
  updatePasswordManual
);

router.put(
  '/update-status/:userId',
  updateUserStatusValidate,
  updateUserStatus
);

module.exports = router;
