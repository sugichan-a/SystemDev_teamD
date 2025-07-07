const db = require('../db');

// 顧客ごとの平均リードタイムと売上高
exports.getStats = async (req, res) => {
  try {
    const leadTimeResult = await db.query(`
      SELECT c.name AS customer_name, ROUND(AVG(delivery_date - order_date)) AS avg_lead_time
      FROM orders o
      JOIN customers c ON o.customer_id = c.id
      WHERE o.status = '納品済'
      GROUP BY c.name
    `);

    const salesResult = await db.query(`
      SELECT c.name AS customer_name, SUM(i.price * i.quantity) AS total_sales
      FROM orders o
      JOIN customers c ON o.customer_id = c.id
      JOIN order_items i ON o.id = i.order_id
      WHERE o.status = '納品済'
      GROUP BY c.name
    `);

    res.json({
      avgLeadTimes: leadTimeResult.rows,
      totalSales: salesResult.rows
    });
  } catch (err) {
    console.error('Error fetching stats:', err);
    res.status(500).json({ error: 'DB error' });
  }
};
