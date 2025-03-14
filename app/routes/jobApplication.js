const { jobApplication } = require('../controllers');
const { router } = require('../services/imports');

router.post('/auth/jobApply', jobApplication.createJobApplication)
router.get('/jobApply/:id?', jobApplication.getJobApplication)

module.exports = router