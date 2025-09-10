// src/mu-server/index.js
import express from "express";
import mysql from "mysql2";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import usersRouter from "./routes/users.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/users", usersRouter);

// Koneksi MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect(err => {
  if (err) {
    console.error("❌ Database connection failed:", err);
    process.exit(1);
  }
  console.log("✅ Connected to MySQL");
});

// API Root
app.get("/", (req, res) => {
  res.send("Auth API Running");
});

// REGISTER
app.post("/api/register", async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // Validasi input
    if (!username || !password) {
      return res.status(400).json({ message: "Username dan password wajib diisi" });
    }

    // Cek username sudah ada
    db.query("SELECT * FROM users WHERE username = ?", [username], async (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length > 0) return res.status(400).json({ message: "Username sudah terdaftar" });

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Simpan ke DB
      db.query(
        "INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
        [username, hashedPassword, role || "user"],
        (err) => {
          if (err) return res.status(500).json({ error: err.message });
          res.json({ message: "Registrasi berhasil" });
        }
      );
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// LOGIN
app.post("/api/signin", (req, res) => {
  const { username, password } = req.body;

  db.query("SELECT * FROM users WHERE username = ?", [username], async (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(401).json({ message: "Username tidak ditemukan" });

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Password salah" });

    // Buat token JWT
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Login sukses", token, role: user.role });
  });
});

// Jalankan server
app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running at http://localhost:${process.env.PORT}`);
});
