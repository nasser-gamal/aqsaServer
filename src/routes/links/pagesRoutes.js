import express from 'express';
const router = express.Router();

import * as pagesControllers from '../../controllers/links/pagesControllers.js';
import links from '../../links/links.js';
import upload from '../../middlewares/fileUpload.js';
import * as validate from '../../utils/validation.js';
import * as auth from '../../middlewares/auth.js';

router
  .route(links.page.GET_PAGES)
  .get(auth.isAuth, pagesControllers.getAllPages);

router.route(links.page.GET_PAGE).get(auth.isAuth, pagesControllers.getPage);
router
  .route(links.page.CREATE_PAGE)
  .post(
    auth.isAuth,
    upload.single('img'),
    validate.pageValidate,
    validate.validateInputs,
    pagesControllers.createPage
  );

router
  .route(links.page.UPDATE_PAGE)
  .put(
    auth.isAuth,
    upload.single('img'),
    validate.pageValidate,
    validate.validateInputs,
    pagesControllers.updatePage
  );

router
  .route(links.page.DELETE_PAGE)
  .delete(auth.isAuth, pagesControllers.deletePage);

export default router;
