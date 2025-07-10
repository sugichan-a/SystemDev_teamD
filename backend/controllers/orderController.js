// controllers/orderController.js
const db = require('../db');

exports.getAllOrders = async (req, res) => {
  try {
   const result = await db.query(`
  SELECT 
    o.id,
    o.customer_id,
    c.name AS customer_name,
    o.order_date,
    o.delivery_date,
    o.status,
    COALESCE(SUM(oi.price * oi.quantity), 0) AS total_price
  FROM public.orders o
  JOIN public.customers c ON o.customer_id = c.id
  LEFT JOIN public.order_items oi ON o.id = oi.order_id
  GROUP BY o.id, o.customer_id, c.name, o.order_date, o.delivery_date, o.status
  ORDER BY o.order_date DESC
`);
    res.json(result.rows);
  } catch (err) {
    console.error('DB error in getAllOrders:', err);
    res.status(500).json({ error: 'DB error' });
  }
};

exports.createOrder = async (req, res) => {
  res.send('createOrder not implemented yet');
};
