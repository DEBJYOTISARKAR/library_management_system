const express = require("express");
const router = express.Router();
const {
  addBook,
  getBooks,
  deleteBook,
} = require("../controllers/bookController");
const { verifyToken } = require("../middleware/authMiddleware");
router.post("/add", verifyToken, addBook);
router.get("/", verifyToken, getBooks);
router.delete("/:id", verifyToken, deleteBook);

module.exports = router;
