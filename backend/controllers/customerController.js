const db = require('../config/db');

// 全顧客を取得
exports.getAllCustomers = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM customers ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching customers:', err);
    res.status(500).json({ error: 'DB error' });
  }
};

// 新規顧客を追加
exports.createCustomer = async (req, res) => {
  const { name } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO customers (name) VALUES ($1) RETURNING *',
      [name]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating customer:', err);
    res.status(500).json({ error: 'DB error' });
  }
};
