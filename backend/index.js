import express from 'express';
import orders from './api/orders.js';
import deliveries from './api/deliveries.js';
import stats from './api/stats.js';
import customers from './api/customers.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.use('/api/orders', orders);
app.use('/api/deliveries', deliveries);
app.use('/api/stats', stats);
app.use('/api/customers', customers);

app.get('/', (req, res) => {
  res.send('API is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
