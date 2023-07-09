const express = require('express');
const router = express.Router();

const authControllers = require('../../controllers/auth/authControllers.js');
const links = require('../../links/links.js');

const validate = require('../../utils/validation.js');
const auth = require('../../middlewares/auth.js');

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

module.exports = router;
