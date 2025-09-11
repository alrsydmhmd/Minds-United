// src/mu-server/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/auth.js";
import usersRouter from "./routes/users.js";
import "./db.js"; // koneksi DB

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// API Root
app.get("/", (req, res) => {
  res.send("🚀 Minds United API Running");
});

// Routes
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running at http://localhost:${process.env.PORT}`);
});
