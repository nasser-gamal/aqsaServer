const express = require('express');
const router = express.Router();

const {
  createRole,
  getRoles,
  getRole,
  updateRole,
  deleteRole,
} = require('../controllers/roleControllers');

const { protected, allowedTo, checkActive } = require('../middlewares/auth');

const {
  createRoleValidator,
  updateRoleValidate,
  deleteRoleValidate,
  getRoleValidate,
} = require('../validator/roleValidator');

router.use(protected);
router.use(checkActive);
router.use(allowedTo(['superAdmin']));

router.route('/').get(getRoles).post(createRoleValidator, createRole);

router
  .route('/:roleId')
  .get(getRoleValidate, getRole)
  .put(updateRoleValidate, updateRole)
  .delete(deleteRoleValidate, deleteRole);

module.exports = router;
