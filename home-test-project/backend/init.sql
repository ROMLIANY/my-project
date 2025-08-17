CREATE DATABASE IF NOT EXISTS test;
USE test;

-- users table
CREATE TABLE IF NOT EXISTS users (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- tokens table
CREATE TABLE IF NOT EXISTS tokens (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT NOT NULL,
  token VARCHAR(512) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- seed: default user (password: 'password' hashed)
-- We'll insert a placeholder entry; you can run this after starting backend to set real bcrypt hash.
INSERT INTO users (username, password, email) VALUES ('user', '$2b$10$abcdefg1234567890hijklmnopqrstuvwxyz', 'email@example.com')
ON DUPLICATE KEY UPDATE username=username;
