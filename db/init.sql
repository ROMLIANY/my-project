CREATE DATABASE IF NOT EXISTS myapp;
USE myapp;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    email VARCHAR(100),
    password VARCHAR(100),
    token VARCHAR(255)
);

INSERT INTO users (name, email, password) VALUES
('Rom Liani', 'rom@example.com', 'password');
