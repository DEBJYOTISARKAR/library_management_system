const express = require("express");
const router = express.Router();
const {
  borrowBook,
  returnBook,
  userHistory,
} = require("../controllers/borrowController");

router.post("/issue", borrowBook);
router.post("/return", returnBook);
router.get("/history/:user_id", userHistory);

module.exports = router;
