const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');
const log4js = require('../utils/log');
require('dotenv').config();

const dbConfig = {
    host: process.env.TIDB_HOST,
    user: process.env.TIDB_USER,
    password: process.env.TIDB_PASSWORD,
    database: 'testdb',
    port: process.env.TIDB_PORT
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute(
            'SELECT * FROM users WHERE username = ? AND password = ?',
            [username, password]
        );
        await connection.end();

        if (rows.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const user = rows[0];
        const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: '1h' });

        log4js.info(JSON.stringify({
            timestamp: new Date(),
            userId: user.id,
            action: 'login',
            ip: req.ip
        }));

        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
