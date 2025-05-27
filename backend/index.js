const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// ミドルウェア
app.use(express.json());

// ルート
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

// サーバー起動
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});