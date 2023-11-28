const express = require('express');
const router = express.Router();

const {
  createDues,
  getDues,
  getDue,
  updateDues,
  deleteDues,
} = require('../controllers/duesControllers.js');

const { protected, allowedTo, checkActive } = require('../middlewares/auth.js');
const {
  createDuesValidator,
  getDueValidate,
  updateDuesValidate,
  deleteDueValidate,
} = require('../validator/duesValidator.js');

router.use(protected);
router.use(checkActive);
router.use(allowedTo(['superAdmin', 'admin']));

router.route('/').get(getDues).post(createDuesValidator, createDues);
router
  .route('/:duesId')
  .get(getDueValidate, getDueValidate, getDue)
  .put(updateDuesValidate, updateDuesValidate, updateDues)
  .delete(deleteDueValidate, deleteDueValidate, deleteDues);

module.exports = router;
