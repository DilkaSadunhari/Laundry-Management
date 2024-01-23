const mysql = require('mysql');

const db = mysql.createConnection({
    user: process.env.USERDB,
    host: process.env.HOST,
    port: process.env.PORTDB,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

module.exports = db;