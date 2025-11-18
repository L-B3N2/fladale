const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0,
    ssl: {
        rejectUnauthorized: false  // Necessario per Aiven se non usi i certificati
    }
});

// Test connessione
pool.getConnection()
    .then(conn => {
        console.log(`Connesso al DB Aiven su: ${process.env.DB_HOST}`);
        conn.release();
    })
    .catch(err => {
        console.error("ERRORE CONNESSIONE DB:", err);
    });

module.exports = pool;
