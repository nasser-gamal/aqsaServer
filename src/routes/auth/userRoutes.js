const express = require('express');
const router = express.Router();

const userControllers = require('../../controllers/auth/userControllers.js');
const validate = require('../../utils/validation.js');
const links = require('../../links/links.js');
const auth = require('../../middlewares/auth.js');
const { checkPassword } = require('../../middlewares/checkPassword.js');

router
  .route(links.user.GET_USERS)
  .get(
    auth.isAuth,
    auth.checkUserRole(['superAdmin', 'admin']),
    userControllers.getAllAdmins
  );

router.route(links.user.CREATE_USER).post(
  auth.isAuth,
  auth.checkUserRole(['superAdmin']),
  validate.userValidate,
  validate.validateInputs,
  userControllers.addUser
);

router
  .route(links.user.UPDATE_USER)
  .put(
    auth.isAuth,
    auth.checkUserRole(['superAdmin']),
    validate.updateUserValidate,
    validate.validateInputs,
    userControllers.updateUser
  );
router
  .route(links.user.UPDATE_PASSWORD)
  .put(
    auth.isAuth,
    auth.checkUserRole(['superAdmin']),
    checkPassword,
    validate.passwordValidate,
    validate.validateInputs,
    userControllers.updatePassword
  );
router
  .route(links.user.UPDATE_STATUS)
  .put(
    auth.isAuth,
    auth.checkUserRole(['superAdmin']),
    userControllers.updateUserStatus
  );
router
  .route(links.user.DELETE_USER)
  .delete(
    auth.isAuth,
    auth.checkUserRole(['superAdmin']),
    checkPassword,
    userControllers.deleteUser
  );

  module.exports = router;
