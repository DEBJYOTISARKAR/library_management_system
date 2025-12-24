const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes");
const bookRoutes = require("./bookRoutes");
const borrowRoutes = require("./borrowRoutes");

// Route grouping
router.use("/auth", authRoutes);
router.use("/books", bookRoutes);
router.use("/borrow", borrowRoutes);

module.exports = router;
