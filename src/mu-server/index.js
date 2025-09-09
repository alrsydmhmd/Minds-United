import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// Simpan user sementara di memory (kalau mau, nanti bisa pindah ke database)
let users = [];

// Middleware untuk verifikasi JWT
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token diperlukan" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: "Token tidak valid" });
  }
}

// Register endpoint
app.post("/register", async (req, res) => {
  const { username, password, role, adminToken } = req.body;

  // Cegah duplikat username
  if (users.find((u) => u.username === username)) {
    return res.status(400).json({ message: "Username sudah digunakan" });
  }

  // Validasi role admin pakai token khusus
  if (role === "admin" && adminToken !== process.env.ADMIN_TOKEN) {
    return res.status(403).json({ message: "Token admin salah!" });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword, role });

  res.json({ message: "Registrasi berhasil!" });
});

// Login endpoint
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username);
  if (!user) return res.status(400).json({ message: "User tidak ditemukan" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: "Password salah" });

  // Buat token JWT
  const token = jwt.sign(
    { username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ message: "Login berhasil", role: user.role, token });
});

// Endpoint khusus admin
app.get("/admin", authMiddleware, (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Akses ditolak" });
  }
  res.json({ message: "Halo Admin!" });
});

// Endpoint khusus user
app.get("/user", authMiddleware, (req, res) => {
  if (req.user.role !== "user") {
    return res.status(403).json({ message: "Akses ditolak" });
  }
  res.json({ message: "Halo User!" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
