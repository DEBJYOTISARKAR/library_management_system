const express = require("express");
const router = express.Router();
const {
  addBook,
  getBooks,
  deleteBook,
} = require("../controllers/bookController");

router.post("/add", addBook);
router.get("/", getBooks);
router.delete("/:id", deleteBook);

module.exports = router;
