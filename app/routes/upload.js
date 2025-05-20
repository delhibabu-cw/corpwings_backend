const { upload } = require('../controllers');
const { googleDriveUpload } = require('../controllers');
const { router } = require('../services/imports');

// router.post('/auth/single-upload', upload.singleUpload);
router.post('/auth/single-upload', googleDriveUpload.singleUpload);
router.post('/single-upload', upload.singleUpload);


module.exports = router;
