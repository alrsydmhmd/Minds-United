import express from "express";
import mysql from "mysql2";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const app = express();
app.use(cors());
app.use(express.json());

// 🔗 Koneksi database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",        // sesuaikan
  password: "qweasd123", // sesuaikan
  database: "minds_united",
});

// Tes koneksi DB
db.connect((err) => {
  if (err) {
    console.error("❌ DB connection failed:", err);
    return;
  }
  console.log("✅ Connected to MySQL database");
});

// Root route
app.get("/", (req, res) => {
  res.send("Minds United API running...");
});


// ======================= REGISTER =======================
app.post("/api/register", async (req, res) => {
  try {
    const { nama, email, password } = req.body;
    console.log("Data diterima:", req.body);

    if (!nama || !email || !password) {
      return res.status(400).json({ message: "Data tidak lengkap" });
    }
    
    const sql = "INSERT INTO users (nama, email, password) VALUES (?, ?, ?)";

    const hashedPassword = await bcrypt.hash(password, 10);
    db.query(sql, [nama, email, hashedPassword], (err, result) => {
      if (err) {
        console.error("MySQL Error:", err);
        return res.status(500).json({ message: "Gagal mendaftar" });
      }

      res.json({ message: "Registrasi berhasil", userId: result.insertId });
    });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
});

// ======================= LOGIN =======================
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (results.length === 0) return res.status(401).json({ error: "User tidak ditemukan" });

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(401).json({ error: "Password salah" });

    res.json({
      message: "Login berhasil",
      token,
      role: user.role,
      username: user.nama,
    });
  });
});


// ======================= RUN SERVER =======================
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
