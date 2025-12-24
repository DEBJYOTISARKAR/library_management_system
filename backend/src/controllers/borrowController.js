const Borrow = require("../models/borrowModel");
const db = require("../config/db");

exports.borrowBook = (req, res) => {
  const { user_id, book_id } = req.body;

  db.query(
    "SELECT quantity FROM books WHERE id=?",
    [book_id],
    (err, result) => {
      if (result[0].quantity <= 0) {
        return res.status(400).json({ message: "Book not available" });
      }

      Borrow.issueBook([user_id, book_id], () => {
        db.query("UPDATE books SET quantity = quantity - 1 WHERE id=?", [
          book_id,
        ]);
        res.json({ message: "Book issued successfully" });
      });
    }
  );
};

exports.returnBook = (req, res) => {
  const { id, book_id } = req.body;

  Borrow.returnBook(id, () => {
    db.query("UPDATE books SET quantity = quantity + 1 WHERE id=?", [book_id]);
    res.json({ message: "Book returned successfully" });
  });
};

exports.userHistory = (req, res) => {
  const { user_id } = req.params;

  Borrow.getUserHistory(user_id, (err, result) => {
    res.json(result);
  });
};
