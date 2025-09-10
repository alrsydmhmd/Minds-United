// src/mu-server/routes/users.js
import express from "express";
import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// Koneksi MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// ✅ GET semua users
router.get("/", (req, res) => {
  db.query("SELECT id, username, role FROM users", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// ✅ GET user by ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.query(
    "SELECT id, username, role FROM users WHERE id = ?",
    [id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0)
        return res.status(404).json({ message: "User not found" });
      res.json(results[0]);
    }
  );
});

// ✅ UPDATE user
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { username, role } = req.body;

  db.query(
    "UPDATE users SET username = ?, role = ? WHERE id = ?",
    [username, role, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "User updated successfully" });
    }
  );
});

// ✅ DELETE user
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM users WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "User deleted successfully" });
  });
});

export default router;
