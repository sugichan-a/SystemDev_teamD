const db = require('../config/db');

// 全納品データを取得（例）
exports.getAllDeliveries = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM deliveries ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching deliveries:', err);
    res.status(500).json({ error: 'DB error' });
  }
};

// 納品ステータスを更新（例）
exports.updateDeliveryStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const result = await db.query(
      'UPDATE deliveries SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating delivery status:', err);
    res.status(500).json({ error: 'DB error' });
  }
};
