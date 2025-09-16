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
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Semua field wajib diisi" });
    }

    // Cek apakah email sudah terdaftar
    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
      if (err) return res.status(500).json({ error: "Database error" });
      if (results.length > 0) {
        return res.status(400).json({ message: "Email sudah terdaftar" });
      }

      // Hash password sebelum simpan
      const hashedPassword = await bcrypt.hash(password, 10);

      // Simpan user baru
      db.query(
        "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)",
        [username, email, hashedPassword, "admin"], // default role: admin
        (err, result) => {
          if (err) return res.status(500).json({ error: "Gagal menyimpan user" });

          res.status(201).json({ message: "Registrasi berhasil" });
        }
      );
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
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

    // Buat JWT token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      "minds_secret_key",
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login berhasil",
      token,
      role: user.role,
      username: user.username,
    });
  });
});


// ======================= RUN SERVER =======================
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
