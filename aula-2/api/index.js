const express = require("express");
const { Pool } = require("pg");

const app = express();
app.use(express.json());

// Variáveis via env (produção-friendly)
const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || 5432),
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASS || "postgres",
  database: process.env.DB_NAME || "appdb",
});

app.get("/health", (req, res) => res.json({ ok: true }));

app.get("/db", async (req, res) => {
  const r = await pool.query("SELECT NOW() as now");
  res.json(r.rows[0]);
});

app.post("/notes", async (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: "title é obrigatório" });

  await pool.query(
    "CREATE TABLE IF NOT EXISTS notes (id SERIAL PRIMARY KEY, title TEXT NOT NULL)"
  );

  const r = await pool.query("INSERT INTO notes(title) VALUES($1) RETURNING *", [title]);
  res.status(201).json(r.rows[0]);
});

app.get("/notes", async (req, res) => {
  await pool.query(
    "CREATE TABLE IF NOT EXISTS notes (id SERIAL PRIMARY KEY, title TEXT NOT NULL)"
  );
  const r = await pool.query("SELECT * FROM notes ORDER BY id DESC");
  res.json(r.rows);
});

app.listen(3000, () => console.log("API on :3000"));
