const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// 確認用：サーバ起動
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});