const db = require('../config/db');

// 全注文を取得
exports.getAllOrders = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT o.id, c.name AS customer_name, o.order_date, o.delivery_date, o.status
      FROM orders o
      JOIN customers c ON o.customer_id = c.id
      ORDER BY o.id DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ error: 'DB error' });
  }
};

// 新規注文を作成
exports.createOrder = async (req, res) => {
  // req.body = { customer_id, order_date, delivery_date, status, items: [{ price, quantity }, ...] }
  // 実装例は後で詳しく作成可能
  res.send('createOrder not implemented yet');
};
