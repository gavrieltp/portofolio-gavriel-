const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'portofolio_db'
});

db.connect((err) => {
  if (err) {
    console.error('Gagal terhubung ke database:', err.message);
    return;
  }
  console.log('Database berhasil terhubung');
});

module.exports = db;