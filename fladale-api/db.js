// fladale-api/db.js
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
        rejectUnauthorized: false   // per Aiven ok
    }
});

// Funzione helper: stessa interfaccia che avevi con mariadb
async function query(sql, params) {
    const [rows] = await pool.query(sql, params);
    return rows; // così db.query restituisce direttamente le righe
}

async function getConnection() {
    const conn = await pool.getConnection();

    return {
        query: async (sql, params = []) => {
            const [rows] = await conn.query(sql, params);
            return rows;
        },
        release: () => conn.release()
    };
}

module.exports = { query, getConnection };