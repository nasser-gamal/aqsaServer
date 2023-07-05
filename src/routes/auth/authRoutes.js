import express from 'express';
const router = express.Router();

import * as authControllers from '../../controllers/auth/authControllers.js';
import links from '../../links/links.js';

import * as validate from '../../utils/validation.js';
import * as auth from '../../middlewares/auth.js';

router
  .route(links.auth.LOGIN)
  .post(
    validate.loginValidate,
    validate.validateInputs,
    authControllers.login
  );
router
  .route(links.auth.LOGOUT)
  .post(
    authControllers.logout
  );

export default router;
