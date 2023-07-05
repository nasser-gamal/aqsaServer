import express from 'express';
const router = express.Router();

import * as systemMenuControllers from '../../controllers/links/systemMenuControllers.js';
import links from '../../links/links.js';
import upload from '../../middlewares/fileUpload.js';
import * as validate from '../../utils/validation.js';
import * as auth from '../../middlewares/auth.js';

router
  .route(links.link.GET_LINKS)
  .get(auth.isAuth, systemMenuControllers.getAllLinks);

router
  .route(links.link.GET_LINK)
  .get(auth.isAuth, systemMenuControllers.getLink);
router
  .route(links.link.CREATE_LINK)
  .post(
    auth.isAuth,
    upload.single('img'),
    validate.linkValidate,
    validate.validateInputs,
    systemMenuControllers.createLink
  );

router
  .route(links.link.UPDATE_LINK)
  .put(
    auth.isAuth,
    upload.single('img'),
    validate.linkValidate,
    validate.validateInputs,
    systemMenuControllers.updateLink
  );

router
  .route(links.link.DELETE_LINK)
  .delete(auth.isAuth, systemMenuControllers.deleteLink);

export default router;
