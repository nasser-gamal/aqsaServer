const express = require('express');
const router = express.Router();

const { protected, allowedTo, checkActive } = require('../middlewares/auth');
const {
  createSegment,
  getSegments,
  getSegment,
  updateSegment,
  deleteSegment,
} = require('../controllers/segmentControllers');
const {
  createSegmentValidate,
  getSegmentValidate,
  updateSegmentValidate,
  deleteSegmentValidate,
} = require('../validator/segmentValidator');

router.use(protected);
router.use(checkActive);

router.get('/', getSegments);

router.use(allowedTo(['superAdmin', 'admin']));

router.post('/', createSegmentValidate, createSegment);
router
  .route('/:segmentId')
  .get(getSegmentValidate, getSegment)
  .put(updateSegmentValidate, updateSegment)
  .delete(deleteSegmentValidate, deleteSegment);

module.exports = router;
