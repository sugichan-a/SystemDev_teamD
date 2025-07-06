const db = require('../db');
const parseCsvFile = require('../utils/csvParser');

// 全顧客取得
exports.getAllCustomers = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM customers ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching customers:', err);
    res.status(500).json({ error: 'DB error' });
  }
};

// 新規顧客追加
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

// CSVアップロードで顧客取り込み
exports.uploadCustomers = async (req, res) => {
  try {
    const filePath = req.file.path;   // multerで保存されたファイルのパス
    const customers = await parseCsvFile(filePath);

    for (const customer of customers) {
      await db.query(
        'INSERT INTO customers (name, email) VALUES ($1, $2)',
        [customer.name, customer.email]
      );
    }

    res.json({ message: 'Customers uploaded successfully', count: customers.length });
  } catch (err) {
    console.error('Error parsing CSV:', err);
    res.status(500).json({ error: 'Failed to upload customers' });
  }
};
