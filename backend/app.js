const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ミドルウェア
app.use(cors());
app.use(express.json());

// ルート
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const customerRoutes = require('./routes/customerRoutes');
const deliveryRoutes = require('./routes/deliveryRoutes');
const orderRoutes = require('./routes/orderRoutes');
const statsRoutes = require('./routes/statisRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/deliveries', deliveryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/users', userRoutes);

// 404ハンドリング
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

// エラーハンドリング
app.use((err, req, res, next) => {
  console.error('Internal Server Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// サーバー起動
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:5173', // フロントのURL
  credentials: true
}));
