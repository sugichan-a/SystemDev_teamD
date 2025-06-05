import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.json([{ id: 1, title: '納品書A' }]);
});

router.post('/', (req, res) => {
  res.status(201).json({ message: '納品書を作成しました' });
});

router.put('/:id', (req, res) => {
  res.json({ message: `納品書 ${req.params.id} を更新しました` });
});

export default router;
