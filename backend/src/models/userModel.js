const db = require("../config/db");

const User = {
  create: (data, callback) => {
    const sql =
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
    db.query(sql, data, callback);
  },

  findByEmail: (email, callback) => {
    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [email], callback);
  },
};

module.exports = User;
