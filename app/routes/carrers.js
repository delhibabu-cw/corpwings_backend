const { carrers } = require('../controllers')
const { router } = require('../services/imports')

router.post('/carrers', carrers.createCarrer)
router.get('/auth/carrers/:id?', carrers.getAuthCarrers)
router.get('/carrers/:id?', carrers.getCarrers)
router.put('/carrers/:id', carrers.updateCarrers)
router.delete('/carrers/:id', carrers.deleteCarrers)


module.exports = router