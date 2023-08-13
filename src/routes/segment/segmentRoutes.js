const express = require('express');
const router = express.Router();

const segmentControllers = require('../../controllers/segment/segmentControllers.js');
const links = require('../../links/links.js');
const validate = require('../../utils/validation.js');
const auth = require('../../middlewares/auth.js');
const { checkActive } = require('../../middlewares/checkActive.js');

router
  .route(links.segment.GET_SEGMENTS)
  .get(
    segmentControllers.getAllSegments
  );

router
  .route(links.segment.GET_SEGMENT)
  .get(
    auth.isAuth,
    checkActive,
    auth.checkUserRole(['superAdmin', 'admin']),
    segmentControllers.getSegment
  );

router
  .route(links.segment.CREATE_SEGMENT)
  .post(
    auth.isAuth,
    checkActive,
    auth.checkUserRole(['superAdmin', 'admin']),
    validate.segmentValidate,
    validate.validateInputs,
    segmentControllers.addSegment
  );

router
  .route(links.segment.UPDATE_SEGMENT)
  .put(
    auth.isAuth,
    checkActive,
    auth.checkUserRole(['superAdmin', 'admin']),
    validate.segmentValidate,
    validate.validateInputs,
    segmentControllers.updateSegment
  );

router
  .route(links.segment.DELETE_SEGMENT)
  .delete(
    auth.isAuth,
    checkActive,
    auth.checkUserRole(['superAdmin', 'admin']),
    segmentControllers.deleteSegment
  );

module.exports = router;
