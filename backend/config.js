const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();
const password = process.env.PASSWORD;

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: password,      
    database: 'crud'
});

con.connect((err) => {
    if (!err) console.log('Database Connected...');
});

module.exports = con;     