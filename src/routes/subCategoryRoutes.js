const express = require('express');
const router = express.Router();

const {
  createSubCategory,
  getSubCategories,
  getSubCategory,
  updateSubCategory,
  deleteSubCategory,
  aggregations,
} = require('../controllers/subCategoryControllers');
const {
  createSubCategoryValidate,
  getSubCategoryValidate,
  updateSubCategoryValidate,
  deleteSubCategoryValidate,
} = require('../validator/subCategoryValidator');

const { protected, allowedTo, checkActive } = require('../middlewares/auth');

router.use(protected);
router.use(checkActive);
router.use(allowedTo(['superAdmin', 'admin']));

router
  .route('/')
  .post(createSubCategoryValidate, createSubCategory)
  .get(getSubCategories);


router
  .route('/:subCategoryId')
  .get(getSubCategoryValidate, getSubCategory)
  .put(updateSubCategoryValidate, updateSubCategory)
  .delete(deleteSubCategoryValidate, deleteSubCategory);
module.exports = router;
