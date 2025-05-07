const { user } = require('../controllers');
const express = require('express');
const router = express.Router(); // NEW instance every time

router.post('/auth/user', user.createUser);
router.get('/user/:id?', user.getUser);
router.put('/user/:id', user.updateUser);
router.delete('/user/:id', user.deleteUser);
router.get('/profile', user.getProfile);
router.get('/download-user', user.getUserExcelData);

module.exports = router;