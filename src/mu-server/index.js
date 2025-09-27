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
    const { username, email, password, role } = req.body;
    console.log("Data diterima:", req.body);

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Data tidak lengkap" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)";
    db.query(sql, [username, email, hashedPassword, role || "user"], (err, result) => {
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
      username: user.username,
    });
  });
});


// ======================= GET ALL USERS =======================
app.get("/api/users", (req, res) => {
  const sql = "SELECT id, username, email, role, created_at FROM users";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("MySQL Error:", err);
      return res.status(500).json({ message: "Gagal mengambil data user" });
    }
    res.json(results);
  });
});


// ======================= CREATE USER =======================
app.post("/api/users", async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Data tidak lengkap" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)";
    db.query(sql, [username, email, hashedPassword, role || "user"], (err, result) => {
      if (err) {
        console.error("MySQL Error:", err);
        return res.status(500).json({ message: "Gagal menambahkan user" });
      }
      res.json({ message: "User berhasil ditambahkan", userId: result.insertId });
    });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
});


// ======================= UPDATE USER =======================
app.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const { username, email, role } = req.body;

  const sql = "UPDATE users SET username = ?, email = ?, role = ? WHERE id = ?";
  db.query(sql, [username, email, role, id], (err) => {
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
  db.query(sql, [id], (err) => {
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
// ======================= UPDATE PROGRAM =======================
app.put("/api/programs/:id", (req, res) => {
  const { id } = req.params;
  const { title, description, icon } = req.body;
  if (!title || !description) {
    return res.status(400).json({ message: "Data tidak lengkap" });
  }
  const sql = "UPDATE programs SET title = ?, description = ?, icon = ? WHERE id = ?";
  db.query(sql, [title, description, icon || "📌", id], (err) => {
    if (err) {
      console.error("MySQL Error:", err);
      return res.status(500).json({ message: "Gagal update program" });
    }
    res.json({ message: "Program berhasil diupdate" });
  }
);
});

// ======================= DELETE PROGRAM ======================= 
app.delete("/api/programs/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM programs WHERE id = ?";  
  db.query(sql, [id], (err) => {
    if (err) {
      console.error("MySQL Error:", err);
      return res.status(500).json({ message: "Gagal hapus program" });
    }
    res.json({ message: "Program berhasil dihapus" });
  });
}
);

// ======================= ARTICLES =======================
const router = express.Router();
app.use(router);  

// GET all articles
router.get("/api/articles", (req, res) => {
  const sql = "SELECT id, title, excerpt, image, DATE_FORMAT(date_published, '%Y-%m-%d') AS date_published, author, slug, created_at, updated_at FROM articles ORDER BY date_published DESC, id DESC";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("MySQL Error (GET /api/articles):", err);
      return res.status(500).json({ message: "Gagal mengambil artikel", error: err.message });
    }
    res.json(results);
  });
});

// GET single article
router.get("/api/articles/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM articles WHERE id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("MySQL Error (GET /api/articles/:id):", err);
      return res.status(500).json({ message: "Gagal mengambil artikel", error: err.message });
    }
    if (results.length === 0) return res.status(404).json({ message: "Artikel tidak ditemukan" });
    res.json(results[0]);
  });
});

// CREATE article
router.post("/api/articles", (req, res) => {
  const { title, excerpt, content, image, date_published, author, slug } = req.body;
  if (!title) return res.status(400).json({ message: "Title wajib diisi" });

  const sql = "INSERT INTO articles (title, excerpt, content, image, date_published, author, slug) VALUES (?, ?, ?, ?, ?, ?, ?)";
  db.query(sql, [title, excerpt || null, content || null, image || null, date_published || null, author || null, slug || null], (err, result) => {
    if (err) {
      console.error("MySQL Error (POST /api/articles):", err);
      return res.status(500).json({ message: "Gagal membuat artikel", error: err.message });
    }
    res.status(201).json({ message: "Artikel berhasil dibuat", articleId: result.insertId });
  });
});

// UPDATE article
router.put("/api/articles/:id", (req, res) => {
  const { id } = req.params;
  const { title, excerpt, content, image, date_published, author, slug } = req.body;
  if (!title) return res.status(400).json({ message: "Title wajib diisi" });

  const sql = "UPDATE articles SET title = ?, excerpt = ?, content = ?, image = ?, date_published = ?, author = ?, slug = ? WHERE id = ?";
  db.query(sql, [title, excerpt || null, content || null, image || null, date_published || null, author || null, slug || null, id], (err) => {
    if (err) {
      console.error("MySQL Error (PUT /api/articles/:id):", err);
      return res.status(500).json({ message: "Gagal update artikel", error: err.message });
    }
    res.json({ message: "Artikel berhasil diupdate" });
  });
});

// DELETE article
router.delete("/api/articles/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM articles WHERE id = ?";
  db.query(sql, [id], (err) => {
    if (err) {
      console.error("MySQL Error (DELETE /api/articles/:id):", err);
      return res.status(500).json({ message: "Gagal hapus artikel", error: err.message });
    }
    res.json({ message: "Artikel berhasil dihapus" });
  });
});

// ======================= RUN SERVER =======================
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
