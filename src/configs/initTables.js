const pool = require("../services/db");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const callback = (error, results, fields) => {
  if (error) {
    console.error("Error creating tables:", error);
  } else {
    console.log("Tables created successfully");
  }
  process.exit();
}

bcrypt.hash('1234', saltRounds, (error, hash) => {
  if (error) {
    console.error("Error hashing password:", error);
  } else {
    console.log("Hashed password:", hash);
const SQLSTATEMENT = `
DROP TABLE IF EXISTS User;

DROP TABLE IF EXISTS FitnessChallenge;

DROP TABLE IF EXISTS UserCompletion;

DROP TABLE IF EXISTS Pet;

DROP TABLE IF EXISTS OwnedPet;

DROP TABLE IF EXISTS Reviews;

CREATE TABLE User (
user_id INT AUTO_INCREMENT PRIMARY KEY,
username TEXT NOT NULL,
email TEXT NOT NULL,
password TEXT NOT NULL,
skillpoints INT NOT NULL,
created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
last_login_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE FitnessChallenge (
challenge_id INT AUTO_INCREMENT PRIMARY KEY,
creator_id INT NOT NULL,
challenge TEXT NOT NULL,
skillpoints INT NOT NULL
);
CREATE TABLE UserCompletion (
complete_id INT AUTO_INCREMENT PRIMARY KEY,
challenge_id INT NOT NULL,
user_id INT NOT NULL,
completed BOOL NOT NULL,
creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
notes TEXT
);
CREATE TABLE Pet (
  pet_id INT AUTO_INCREMENT PRIMARY KEY,
  name TEXT NOT NULL,
  rarity TEXT NOT NULL,
  skillpoints_cost INT NOT NULL
);
CREATE TABLE OwnedPet (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pet_id INT NOT NULL,
  owner_id INT NOT NULL,
  pet_name TEXT NOT NULL,
  rarity TEXT NOT NULL
);
CREATE TABLE Reviews (
  id INT PRIMARY KEY AUTO_INCREMENT,
  review_amt INT NOT NULL,
  user_id INT NOT NULL,
  challenge_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO User (username, email, password, skillpoints) VALUES
      ('DIT student', '123@gmail.com', '${hash}', 0),
      ('DAAA student', 'abc@gmail.com', '${hash}', 0),
      ('DCDF student', 'example@gmail.com', '${hash}', 0);

INSERT INTO FitnessChallenge (creator_id, challenge, skillpoints) VALUES
(1, 'Complete 2.4km within 15 minutes', 50),
(1, 'Cycle around the island for at least 50km', 100),
(2, 'Complete a full marathon (42.2km)', 200),
(2, 'Hold a plank for 5 minutes', 50),
(2, 'Perform 100 push-ups in one session', 75);

INSERT INTO Pet (name, rarity, skillpoints_cost) VALUES
('Dog', 'Common', 10),
('Cat', 'Common', 10),
('Camel', 'Uncommon', 20),
('Dolphin', 'Rare', 30),
('Swordfish', 'Ultra-Rare', 50),
('Rooster', 'Ultra-Rare', 50),
('Crow', 'Legendary', 100),
('Owl', 'Legendary', 100),
('Giraffe', 'Legendary', 100),
('Turtle', 'Legendary', 100),
('Kangaroo', 'Legendary', 100),
('Parrot', 'Legendary', 100),
('Hedgehog', 'Legendary', 100),
('T-Rex', 'Legendary', 100),
('Shadow Dragon', 'Legendary', 100);

INSERT INTO Reviews (review_amt, user_id, challenge_id) VALUES
  (5, 2, 1),
  (4, 2, 2),  
  (3, 3, 3);
`;


    pool.query(SQLSTATEMENT, callback);
  }
});