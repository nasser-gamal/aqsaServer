import express from 'express';
const router = express.Router();

import * as categoryControllers from '../../controllers/category/categoryControllers.js';
import links from '../../links/links.js';
import * as validate from '../../utils/validation.js';
import * as auth from '../../middlewares/auth.js';

router
  .route(links.category.GET_CATEGORYS)
  .get(
    auth.isAuth,
    auth.checkUserRole(['superAdmin', 'admin']),
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

export default router;
