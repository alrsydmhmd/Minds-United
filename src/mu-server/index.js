import express from "express";
import mysql from "mysql2";
import cors from "cors";
import bcrypt from "bcrypt";

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
      role: user.role,
      username: user.nama,
    });
  });
});

// ======================= GET ALL USERS =======================
app.get("/api/users", (req, res) => {
  const sql = "SELECT id, username, email, role FROM users";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("MySQL Error:", err);
      return res.status(500).json({ message: "Gagal mengambil data user" });
    }
    res.json(results);
  });
});

// ======================= CREATE USER =======================
app.post("/api/users", (req, res) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Data tidak lengkap" });
  }

  const sql = "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)";
  db.query(sql, [username, email, password, role || "user"], (err, result) => {
    if (err) {
      console.error("MySQL Error:", err);
      return res.status(500).json({ message: "Gagal menambahkan user" });
    }
    res.json({ message: "User berhasil ditambahkan", userId: result.insertId });
  });
});

// ======================= UPDATE USER =======================
app.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const { username, email, role } = req.body;

  const sql = "UPDATE users SET username = ?, email = ?, role = ? WHERE id = ?";
  db.query(sql, [username, email, role, id], (err, result) => {
    if (err) {
      console.error("MySQL Error:", err);
      return res.status(500).json({ message: "Gagal update user" });
    }
    res.json({ message: "User berhasil diupdate" });
  });
});

// ======================= DELETE USER =======================
app.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM users WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("MySQL Error:", err);
      return res.status(500).json({ message: "Gagal hapus user" });
    }
    res.json({ message: "User berhasil dihapus" });
  });
});

// ======================= GET ALL PROGRAMS =======================
app.get("/api/programs", (req, res) => {
  const sql = "SELECT id, title, description, icon FROM programs";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("MySQL Error:", err);
      return res.status(500).json({ message: "Gagal mengambil data program" });
    }
    res.json(results);
  });
});

// ======================= CREATE PROGRAM =======================
app.post("/api/programs", (req, res) => {
  const { title, description, icon } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: "Data tidak lengkap" });
  }

  const sql = "INSERT INTO programs (title, description, icon) VALUES (?, ?, ?)";
  db.query(sql, [title, description, icon || "📌"], (err, result) => {
    if (err) {
      console.error("MySQL Error:", err);
      return res.status(500).json({ message: "Gagal menambahkan program" });
    }
    res.json({ message: "Program berhasil ditambahkan", programId: result.insertId });
  });
});


// ======================= RUN SERVER =======================
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
