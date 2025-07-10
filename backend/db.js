const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
});

pool.on('connect', () => {
  console.log('Connected to PostgreSQL');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle PostgreSQL client', err);
  process.exit(-1);
});

module.exports = pool;

// ======== 接続テスト用スクリプト ========
//(async () => {
//  try {
//    const res = await pool.query('SELECT NOW()');
//    console.log('Test query successful, current time:', res.rows[0].now);
//  } catch (err) {
//    console.error('Test query failed:', err);
//  } finally {
//    await pool.end(); // 接続を閉じる
//  }
//})();
