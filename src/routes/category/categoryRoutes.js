const express = require('express');
const router = express.Router();

const categoryControllers = require('../../controllers/category/categoryControllers.js');
const links = require('../../links/links.js');
const validate = require('../../utils/validation.js');
const auth = require('../../middlewares/auth.js');

router
  .route(links.category.GET_CATEGORYS)
  .get(
    // auth.isAuth,
    // auth.checkUserRole(['superAdmin', 'admin']),
    categoryControllers.getAllCategorys
  );

router
  .route(links.category.GET_CATEGORY)
  .get(
    auth.isAuth,
    auth.checkUserRole(['superAdmin', 'admin']),
    categoryControllers.getCategory
  );

router
  .route(links.category.CREATE_CATEGORY)
  .post(
    auth.isAuth,
    auth.checkUserRole(['superAdmin', 'admin']),
    validate.categoryValidate,
    validate.validateInputs,
    categoryControllers.addCategory
  );

router
  .route(links.category.UPDATE_CATEGORY)
  .put(
    auth.isAuth,
    auth.checkUserRole(['superAdmin', 'admin']),
    validate.categoryValidate,
    validate.validateInputs,
    categoryControllers.updateCategory
  );

router
  .route(links.category.DELETE_CATEGORY)
  .delete(
    auth.isAuth,
    auth.checkUserRole(['superAdmin', 'admin']),
    categoryControllers.deleteCategory
  );

module.exports = router;
