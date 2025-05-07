const { role } = require('../controllers');
const express = require('express');
const router = express.Router(); // NEW instance every time

router.post('/auth/role', role.createRole);
router.get('/role/:id?', role.getRole);
// router.get('/auth/role/:id?', role.getRole);
router.put('/role/:id', role.updateRole);
router.delete('/role/:id', role.deleteRole);

router.get('/auth/role', (req, res) => {
    res.json({ role: 'admin' });
  });

module.exports = router;
