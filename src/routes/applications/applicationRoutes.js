const express = require('express');
const router = express.Router();

const applicationControllers = require('../../controllers/applications/applicationControllers');
const links = require('../../links/links.js');

const validate = require('../../utils/validation.js');

const { checkActive } = require('../../middlewares/checkActive');
const auth = require('../../middlewares/auth.js');
const upload = require('../../middlewares/fileUpload');

router
  .route(links.application.CREATE_APP)
  .post(
    auth.isAuth,
    checkActive,
    auth.checkUserRole(['superAdmin', 'admin']),
    upload.fields([{ name: 'img' }, { name: 'apk' }]),
    validate.appValidate,
    validate.validateInputs,
    applicationControllers.createApp
  );

router.route(links.application.GET_APPS).get(applicationControllers.getAllApps);

router
  .route(links.application.DOWNLOAD_APP)
  .get(applicationControllers.downloadApp);

module.exports = router;
