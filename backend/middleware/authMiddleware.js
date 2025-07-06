const jwt = require('jsonwebtoken');

// ログインしているか確認
exports.authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // "Bearer <token>"

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // payloadを保存
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// 管理者だけアクセス可能
exports.isAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden: Admins only' });
  }
  next();
};
