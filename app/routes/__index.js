// routes/__index.js

const express = require('express');

// Manually import your route files here
const authRoutes = require('./auth');
const userRoutes = require('./user');
const carrerRoutes = require('./carrers'); // example
const internshipRoutes = require('./internship'); // example
const jobApllicationRoutes = require('./jobApplication'); // example
const roleRoutes = require('./role'); // example
const uploadRoutes = require('./upload'); // example
// Add more routes as needed

const router = express.Router();

// Apply routes (without middleware)
router.use('/', authRoutes);
router.use('/', userRoutes);
router.use('/', carrerRoutes);
router.use('/', internshipRoutes);
router.use('/', jobApllicationRoutes);
router.use('/', roleRoutes);
router.use('/', uploadRoutes);

// Add more static routes as needed

module.exports = router;
