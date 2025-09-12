import express from "express";
import db from "../db.js";

const router = express.Router();

// Get all programs
router.get("/", (req, res) => {
  db.query("SELECT * FROM programs", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Add program
router.post("/", (req, res) => {
  const { name } = req.body;
  db.query("INSERT INTO programs (name) VALUES (?)", [name], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Program ditambahkan" });
  });
});

// Update program
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  db.query("UPDATE programs SET name = ? WHERE id = ?", [name, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Program diperbarui" });
  });
});

// Delete program
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM programs WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Program dihapus" });
  });
});

export default router;
