const express = require('express');
const router = express.Router();

const {
  createApp,
  getApps,
  getApp,
  updateApp,
  deleteApp,
  downloadApp,
} = require('../controllers/applicationControllers');

const { protected, allowedTo, checkActive } = require('../middlewares/auth');
const upload = require('../middlewares/fileUpload');
const {
  createAppValidate,
  getAppValidate,
  updateAppValidate,
  deleteAppValidate,
} = require('../validator/appValidator');

router.get('/', getApps);
router.post('/download/:appId', downloadApp);

router.use(protected);
router.use(checkActive);
router.use(allowedTo(['superAdmin', 'admin']));

router.post(
  '/',
  upload.fields([{ name: 'img' }, { name: 'apk' }]),
  createAppValidate,
  createApp
);

router
  .route('/:appId')
  .get(getAppValidate, getApp)
  .put(
    upload.fields([{ name: 'img' }, { name: 'apk' }]),
    updateAppValidate,
    updateApp
  )
  .delete(deleteAppValidate, deleteApp);

module.exports = router;
