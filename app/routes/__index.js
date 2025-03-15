const express = require("express");
const router = express.Router();
const middleware = require("../middlewares");

// Import each route manually
const authRoutes = require("./auth");
const userRoutes = require("./user");
const careersRoutes = require("./carrers");
const jobApplicationRoutes = require("./jobApplication");
const roleRoutes = require("./role");
const uploadRoutes = require("./upload");

// Apply middleware and define routes
router.use("/auth", middleware.checkSetToken(), authRoutes);
router.use("/user", middleware.checkSetToken(), userRoutes);
router.use("/careers", middleware.checkSetToken(), careersRoutes);
router.use("/jobApplication", middleware.checkSetToken(), jobApplicationRoutes);
router.use("/role", middleware.checkSetToken(), roleRoutes);
router.use("/upload", middleware.checkSetToken(), uploadRoutes);

module.exports = router;
