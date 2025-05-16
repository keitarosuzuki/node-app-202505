const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { Pool } = require("pg");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// 確認用ルート
app.get("/", (req, res) => {
  res.send("APIサーバー稼働中");
});

// タスク一覧取得
app.get("/api/tasks", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM tasks ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("サーバーエラー");
  }
});

// 登録
app.post("/api/tasks", async (req, res) => {
  const { name } = req.body; // フロントから受け取ったタスク名

  if (!name) {
    return res.status(400).json({ error: "タスク名が空です" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO tasks (name) VALUES ($1) RETURNING *",
      [name]
    );

    const countResult = await pool.query("SELECT COUNT(*) FROM tasks");
    const count = parseInt(countResult.rows[0].count, 10);
    res.status(201).json({
      message: `「${result.rows[0].name}」を登録しました（残り${count}件）`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("サーバーエラー");
  }
});

// 更新
app.put("/api/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const { name, is_done } = req.body;

  try {
    const result = await pool.query(
      `UPDATE tasks SET name = COALESCE($1, name), is_done = COALESCE($2, is_done), updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *`,
      [name, is_done, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "タスクが見つかりません" });
    }

    const countResult = await pool.query("SELECT COUNT(*) FROM tasks");
    const count = parseInt(countResult.rows[0].count, 10);
    res.json({
      message: `"${result.rows[0].name}" を更新しました（残り${count}件）`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("サーバーエラー");
  }
});

// 削除
app.delete("/api/tasks/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM tasks WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "タスクが見つかりません" });
    }

    const countResult = await pool.query("SELECT COUNT(*) FROM tasks");
    const count = parseInt(countResult.rows[0].count, 10);
    res.json({
      message: `"${result.rows[0].name}" を削除しました（残り${count}件）`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("サーバーエラー");
  }
});

const PORT = process.env.API_PORT;
app.listen(PORT, () => {
  console.log(`サーバー起動 http://localhost:${PORT}`);
});
