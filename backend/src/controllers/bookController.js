const Book = require("../models/bookModel");

exports.addBook = (req, res) => {
  const { title, author, quantity } = req.body;

  Book.add([title, author, quantity], (err) => {
    if (err) {
      return res.status(500).json({ message: "Failed to add book" });
    }
    res.json({ message: "Book added successfully" });
  });
};

exports.getBooks = (req, res) => {
  Book.getAll((err, result) => {
    if (err) {
      return res.status(500).json({ message: "Failed to fetch books" });
    }
    res.json(result);
  });
};

exports.deleteBook = (req, res) => {
  const { id } = req.params;

  Book.delete(id, (err) => {
    if (err) {
      return res.status(500).json({ message: "Failed to delete book" });
    }
    res.json({ message: "Book deleted successfully" });
  });
};
