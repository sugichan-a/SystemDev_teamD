import express from 'express';
const router = express.Router();

// 一覧
router.get('/', (req, res) => {
  res.json([{ id: 1, title: '受注A' }]);
});

// 作成
router.post('/', (req, res) => {
  res.status(201).json({ message: '注文書を作成しました' });
});

// 編集
router.put('/:id', (req, res) => {
  res.json({ message: `注文書 ${req.params.id} を更新しました` });
});

export default router;
