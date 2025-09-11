// src/mu-server/routes/users.js
import express from "express";
import db from "../db.js";

const router = express.Router();

// GET semua pengguna
router.get("/", (req, res) => {
  db.query("SELECT id, username, role FROM users", (err, results) => {
    if (err) {
      console.error("❌ Error ambil users:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json(results); // hasil query berupa array
  });
});

// DELETE pengguna by ID
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM users WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error("❌ Error hapus user:", err);
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    // Cek apakah tabel kosong
    db.query("SELECT COUNT(*) as count FROM users", (err, rows) => {
      if (err) {
        console.error("❌ Error cek users:", err);
        return res.status(500).json({ error: err.message });
      }

      if (rows[0].count === 0) {
        // Reset AUTO_INCREMENT kalau tabel kosong
        db.query("ALTER TABLE users AUTO_INCREMENT = 1", (err2) => {
          if (err2) console.error("Error reset auto increment:", err2);
        });
      }

      res.json({ message: "User berhasil dihapus" });
    });
  });
});

export default router;
