import express from 'express';
const router = express.Router();

import * as userControllers from '../../controllers/auth/userControllers.js';
import * as validate from '../../utils/validation.js';
import links from '../../links/links.js';
import * as auth from '../../middlewares/auth.js';
import { checkPassword } from '../../middlewares/checkPassword.js';

router
  .route(links.user.GET_USERS)
  .get(
    auth.isAuth,
    auth.checkUserRole(['superAdmin']),
    userControllers.getAllAdmins
  );

router.route(links.user.CREATE_USER).post(
  // auth.isAuth,
  // auth.checkUserRole(['superAdmin']),
  validate.userValidate,
  validate.validateInputs,
  userControllers.addUser
);

router
  .route(links.user.UPDATE_USER)
  .put(
    // auth.isAuth,
    // auth.checkUserRole(['superAdmin']),
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

export default router;
