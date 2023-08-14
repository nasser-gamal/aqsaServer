const express = require('express');
const router = express.Router();

const duesControllers = require('../../controllers/dues/dues.controllers');
const links = require('../../links/links.js');

const auth = require('../../middlewares/auth.js');
const { checkActive } = require('../../middlewares/checkActive');
const validate = require('../../utils/validation.js');

router
  .route(links.dues.GET_DUES)
  .get(
    auth.isAuth,
    checkActive,
    auth.checkUserRole(['superAdmin', 'admin']),
    duesControllers.findAllDues
  );

router
  .route(links.dues.CREATE_DUE)
  .post(
    auth.isAuth,
    checkActive,
    auth.checkUserRole(['superAdmin', 'admin']),
    validate.treasuryValidate,
    validate.validateInputs,
    duesControllers.createNewDues
  );

router
  .route(links.dues.UPDATE_DUE)
  .put(
    auth.isAuth,
    checkActive,
    auth.checkUserRole(['superAdmin', 'admin']),
    validate.treasuryValidate,
    validate.validateInputs,
    duesControllers.updateDues
  );

router
  .route(links.dues.DELETE_DUE)
  .delete(
    auth.isAuth,
    checkActive,
    auth.checkUserRole(['superAdmin', 'admin']),
    duesControllers.deleteDues
  );

module.exports = router;
