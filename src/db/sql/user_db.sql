CREATE TABLE IF NOT EXISTS `User` (
CREATE TABLE IF NOT EXISTS `User` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    userId VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    createAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Record (
CREATE TABLE IF NOT EXISTS Record (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT,
    opponentId INT NOT NULL,
    isWin BOOL NOT NULL,
    gamedate DATETIME NOT NULL,
    gamedate DATETIME NOT NULL,
    FOREIGN KEY (userId) REFERENCES `User`(id)
);
