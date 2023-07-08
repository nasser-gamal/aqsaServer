import express from 'express';
const router = express.Router();

import * as segmentControllers from '../../controllers/segment/segmentControllers.js';
import links from '../../links/links.js';
import * as validate from '../../utils/validation.js';
import * as auth from '../../middlewares/auth.js';

router.route(links.segment.GET_SEGMENTS).get(segmentControllers.getAllSegments);

router
  .route(links.segment.GET_SEGMENT)
  .get(
    auth.isAuth,
    auth.checkUserRole(['superAdmin', 'admin']),
    segmentControllers.getSegment
  );

router
  .route(links.segment.CREATE_SEGMENT)
  .post(
    auth.isAuth,
    auth.checkUserRole(['superAdmin', 'admin']),
    validate.segmentValidate,
    validate.validateInputs,
    segmentControllers.addSegment
  );

router
  .route(links.segment.UPDATE_SEGMENT)
  .put(
    auth.isAuth,
    auth.checkUserRole(['superAdmin', 'admin']),
    validate.segmentValidate,
    validate.validateInputs,
    segmentControllers.updateSegment
  );

router
  .route(links.segment.DELETE_SEGMENT)
  .delete(
    auth.isAuth,
    auth.checkUserRole(['superAdmin', 'admin']),
    segmentControllers.deleteSegment
  );

export default router;
