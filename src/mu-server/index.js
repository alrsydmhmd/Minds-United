// src/mu-server/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/auth.js";
import usersRouter from "./routes/users.js";
import programsRouter from "./routes/programs.js";
import chalk from "chalk";
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
app.use("/api/programs", programsRouter);

app.listen(process.env.PORT, () => {
  console.log(chalk.green.bold("✔ Server running at ") + chalk.cyan(`http://localhost:${process.env.PORT}`));
  console.log(chalk.blue("✔ API ready and waiting for requests"));
  console.log(chalk.yellow("✔ Connected to MySQL Database"));
  console.log(chalk.magenta("✔ Auth endpoints available at ") + chalk.cyan("/api/signin") + " & " + chalk.cyan("/api/register"));
});
