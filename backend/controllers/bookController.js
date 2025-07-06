const db = require('../config/db');

// 全書籍を取得
exports.getAllBooks = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM books ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching books:', err);
    res.status(500).json({ error: 'DB error' });
  }
};

// 書籍を新規作成
exports.createBook = async (req, res) => {
  const { title, price } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO books (title, price) VALUES ($1, $2) RETURNING *',
      [title, price]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating book:', err);
    res.status(500).json({ error: 'DB error' });
  }
};
