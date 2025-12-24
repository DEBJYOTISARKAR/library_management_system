const db = require("../config/db");

const Book = {
  add: (data, callback) => {
    const sql = "INSERT INTO books (title, author, quantity) VALUES (?, ?, ?)";
    db.query(sql, data, callback);
  },

  getAll: (callback) => {
    const sql = "SELECT * FROM books ORDER BY id DESC";
    db.query(sql, callback);
  },

  delete: (id, callback) => {
    const sql = "DELETE FROM books WHERE id = ?";
    db.query(sql, [id], callback);
  },
};

module.exports = Book;
