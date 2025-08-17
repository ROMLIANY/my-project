const db = require('../utils/db'); // חיבור ל-TiDB
const log4js = require('../utils/log');
const bcrypt = require('bcryptjs'); // <-- החלפה ל-bcryptjs
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
        const user = rows[0];
        if (!user) return res.status(401).json({ message: 'Invalid username or password' });

        const isMatch = await bcrypt.compare(password, user.password); // bcryptjs תומך ב-async בדיוק כמו bcrypt
        if (!isMatch) return res.status(401).json({ message: 'Invalid username or password' });

        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

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
