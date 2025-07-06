import express, { json } from 'express';
import cors from 'cors';
require('dotenv').config();

const app = express();

// ミドルウェア
app.use(cors());
app.use(json());

// ルート
import authRoutes from './routes/authRoutes';
import bookRoutes from './routes/bookRoutes';
import customerRoutes from './routes/customerRoutes';
import deliveryRoutes from './routes/deliveryRoutes';
import orderRoutes from './routes/orderRoutes';
import statsRoutes from './routes/statsRoutes';
import userRoutes from './routes/userRoutes';

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
