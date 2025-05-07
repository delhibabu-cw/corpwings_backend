const { upload } = require('../controllers');
const { googleDriveUpload } = require('../controllers');
const express = require('express');
const router = express.Router(); // NEW instance every time

// router.post('/auth/single-upload', upload.singleUpload);
router.post('/auth/single-upload', googleDriveUpload.singleUpload);
router.post('/single-upload', upload.singleUpload);


module.exports = router;
