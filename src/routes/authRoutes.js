const express = require('express');
const router = express.Router();

const { protected } = require('../middlewares/auth.js');
const { login, logout } = require('../controllers/authControllers.js');
const { loginValidate } = require('../utils/validation.js');

router.post('/login', loginValidate, login);
router.post('/logout', protected, logout);

module.exports = router;
