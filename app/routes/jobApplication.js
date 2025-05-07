const { jobApplication } = require('../controllers');
const express = require('express');
const router = express.Router(); // NEW instance every time

router.post('/auth/jobApply', jobApplication.createJobApplication)
router.get('/jobApply/:id?', jobApplication.getJobApplication)
router.delete('/jobApply/:id', jobApplication.deleteJobApplication)

module.exports = router