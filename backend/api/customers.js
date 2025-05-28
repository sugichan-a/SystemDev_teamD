import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.json([{ id: 1, name: '田中太郎' }]);
});

export default router;
