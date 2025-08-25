-- יצירת database
CREATE DATABASE IF NOT EXISTS hometest;
USE hometest;

-- טבלת משתמשים
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(200) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- טבלת פוסטים
CREATE TABLE IF NOT EXISTS posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- הכנסת דאטה לדוגמה למשתמשים
INSERT INTO users (username, email, password) VALUES
('rom', 'rom@example.com', '12345'),
('admin', 'admin@example.com', 'adminpass');

-- הכנסת דאטה לדוגמה לפוסטים
INSERT INTO posts (user_id, title, content) VALUES
(1, 'First Post', 'Hello from rom!'),
(2, 'Admin Post', 'This is an admin announcement.');
