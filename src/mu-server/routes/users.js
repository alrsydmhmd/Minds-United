// src/mu-server/routes/users.js
import express from "express";
import db from "../db.js";

const router = express.Router();

// GET semua pengguna
router.get("/", (req, res) => {
  db.query("SELECT id, username, role, created_at FROM users", (err, results) => {
    if (err) {
      console.error("Error ambil users:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json(results); // hasil query berupa array of users
  });
});

// DELETE pengguna by ID
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM users WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error("Error hapus user:", err);
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    // Cek apakah tabel kosong → reset auto increment
    db.query("SELECT COUNT(*) as count FROM users", (err, rows) => {
      if (err) {
        console.error("Error cek users:", err);
        return res.status(500).json({ error: err.message });
      }

      if (rows[0].count === 0) {
        db.query("ALTER TABLE users AUTO_INCREMENT = 1", (err2) => {
          if (err2) console.error("Error reset auto increment:", err2);
        });
      }

      res.json({ message: "User berhasil dihapus" });
    });
  });
});

// UPDATE pengguna by ID
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { username, role } = req.body;

  if (!username || !role) {
    return res.status(400).json({ message: "Username dan role wajib diisi" });
  }

  db.query(
    "UPDATE users SET username = ?, role = ? WHERE id = ?",
    [username, role, id],
    (err, result) => {
      if (err) {
        console.error("Error update user:", err);
        return res.status(500).json({ error: err.message });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "User tidak ditemukan" });
      }
      res.json({ message: "User berhasil diperbarui" });
    }
  );
});

export default router;
