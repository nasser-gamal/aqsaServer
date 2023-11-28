const express = require('express');
const router = express.Router();

const {
  addCategory,
  getAllCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categoryControllers');
const { protected, allowedTo, checkActive } = require('../middlewares/auth.js');
const {
  createCategoryValidate,
  updateCategoryValidate,
  deleteCategoryValidate,
  getCategoryValidate,
} = require('../validator/categoryValidator');

router.use(protected);
router.use(checkActive);
router.use(allowedTo(['superAdmin', 'admin']));

router
  .route('/')
  .post(createCategoryValidate, addCategory)
  .get(getAllCategories);

router
  .route('/:categoryId')
  .get(getCategoryValidate, getCategory)
  .put(updateCategoryValidate, updateCategory)
  .delete(deleteCategoryValidate, deleteCategory);
module.exports = router;
