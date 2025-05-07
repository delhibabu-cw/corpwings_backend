const { carrers } = require('../controllers')
const express = require('express');
const router = express.Router(); // NEW instance every time

router.post('/carrers', carrers.createCarrer)
router.get('/auth/carrers/:id?', carrers.getAuthCarrers)
router.get('/carrers/:id?', carrers.getCarrers)
router.put('/carrers/:id', carrers.updateCarrers)
router.delete('/carrers/:id', carrers.deleteCarrers)


module.exports = router