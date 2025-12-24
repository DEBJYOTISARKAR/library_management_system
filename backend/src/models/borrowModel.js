const db = require("../config/db");

const Borrow = {
  issueBook: (data, callback) => {
    const sql =
      "INSERT INTO borrowed_books (user_id, book_id, issue_date) VALUES (?, ?, CURDATE())";
    db.query(sql, data, callback);
  },

  returnBook: (id, callback) => {
    const sql =
      "UPDATE borrowed_books SET status='returned', return_date=CURDATE() WHERE id=?";
    db.query(sql, [id], callback);
  },

  getUserHistory: (userId, callback) => {
    const sql = `
      SELECT b.id, bo.title, bo.author, b.issue_date, b.return_date, b.status
      FROM borrowed_books b
      JOIN books bo ON b.book_id = bo.id
      WHERE b.user_id = ?`;
    db.query(sql, [userId], callback);
  },
};

module.exports = Borrow;
