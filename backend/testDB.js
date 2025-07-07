const db = require('./db');

(async () => {
  try {
    const result = await db.query('SELECT NOW()');
    console.log('DB connected! Current time:', result.rows[0].now);
  } catch (err) {
    console.error('DB connection error:', err);
  } finally {
    process.exit();
  }
})();
