const db = require('../db');

// 全ユーザーを取得（例: 管理者・店舗ユーザー）
exports.getAllUsers = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM users ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'DB error' });
  }
};

// 新規ユーザーを作成
exports.createUser = async (req, res) => {
  const { username, password, role } = req.body; // role = 'admin' | 'store'
  try {
    const result = await db.query(
      'INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING *',
      [username, password, role]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ error: 'DB error' });
  }
};
