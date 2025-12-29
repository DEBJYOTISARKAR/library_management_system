const express = require("express");
const router = express.Router();
const {
  borrowBook,
  returnBook,
  userHistory,
} = require("../controllers/borrowController");
const { verifyToken } = require("../middleware/authMiddleware");
router.post("/issue", verifyToken, borrowBook);
router.post("/return", verifyToken, returnBook);
router.get("/history/:user_id", verifyToken, userHistory);

module.exports = router;
