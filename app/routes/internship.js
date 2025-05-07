const { internship } = require('../controllers');
const express = require('express');
const router = express.Router(); // NEW instance every time

router.post('/internships', internship.createInternship);
router.put('/internships/:internshipId/internship-data', internship.addInternshipData);
router.get('/internships', internship.getInternships);
// Update banner
router.put('/internships/:internshipId', internship.updateInternshipBanner);
// Update a specific internshipData entry
router.put('/internships/:internshipId/internship-data/:dataId', internship.updateInternshipDataItem);
// Delete entire internship (soft delete)
router.delete('/internships/:internshipId', internship.deleteInternship);
// Delete a specific internshipData item
router.delete('/internships/:internshipId/internship-data/:dataId',internship.deleteInternshipDataItem);

module.exports = router;