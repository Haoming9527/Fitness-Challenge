# Fitness Challenge Web App

# Project Overview
This project is a web application for managing fitness challenges. Users can register, log in, create challenges, track progress, review challenge, collect pets and interact with other participants. The backend is built using Node.js, Express, MySQL, JWT authentication, and bcrypt for password security.

# Folder Structures
BED-CA2-P2429030-1B04/
├── public/
│   ├── css/
│   │   ├──color.css
│   │   └──style.css
│   ├── images/
│   │   ├──challenge.png
│   │   ├──logo.jpg
│   │   ├──pet1.png
│   │   ├──pet2.png
│   │   ├──pet3.png
│   │   ├──pet4.png
│   │   ├──pet5.png
│   │   ├──pet6.png
│   │   ├──pet7.png
│   │   ├──pet8.png
│   │   ├──pet9.png
│   │   ├──pet10.png
│   │   ├──pet11.png
│   │   ├──pet12.png
│   │   ├──pet13.png
│   │   ├──pet14.png
│   │   └──pet15.png
│   ├── js/
│   │   ├──CreateChallenge.js
│   │   ├──CreateChallengeRecord.js
│   │   ├──CreateReview.js
│   │   ├──getCurrentURL.js
│   │   ├──getProfile.js
│   │   ├──getSingleUserInfo.js
│   │   ├──loginUser.js
│   │   ├──queryCmds.js
│   │   ├──registerUser.js
│   │   ├──showAllChallenge.js
│   │   ├──showAllChallengeRecord.js
│   │   ├──showAllPet.js
│   │   ├──showAllUser.js
│   │   ├──UpdateChallenge.js
│   │   ├──UpdateReview.js
│   │   ├──UpdateUsername.js
│   │   └──userNavbarToggle.js
│   ├── challengerecord.html
│   ├── completechallenge.html
│   ├── createchallenge.html
│   ├── createReview.html
│   ├── editChallenge.html
│   ├── editReview.html
│   ├── editUsername.html
│   ├── index.html
│   ├── login.html
│   ├── petshop.html
│   ├── profile.html
│   ├── register.html
│   ├── review.html
│   ├── singleUser.html
│   └── users.html
│
├── src/                     
│   ├── configs/   
│   │   ├── createSchema.js           
│   │   └── initTables.js
│   ├── controllers/          
│   │   ├── challengeController.js
│   │   ├── petController.js
│   │   ├──reviewController.js
│   │   └── userController.js
│   ├── middlewares/ 
│   │   ├── bcryptMiddleware.js
│   │   └── jwtMiddleware.js
│   ├── models/            
│   │   ├── challengeModel.js           
│   │   ├── petModel.js
│   │   ├── reviewModel.js        
│   │   └── userModel.js
│   ├── routes/            
│   │   ├── mainRoutes.js   
│   │   ├── challengeRoutes.js          
│   │   ├── petRoutes.js 
│   │   ├── reviewRoutes.js       
│   │   └── userRoutes.js        
│   ├── services/           
│   │   └── db.js           
│   └── app.js              
├── .env                     
├── .gitignore
├── index.js               
├── package-lock.json
├── package.json                             
└── README.md 

# Tech Stack
Frontend: HTML, CSS, JavaScript
Backend: Node.js, Express.js
Database: MySQL
Authentication: JWT (JSON Web Token)
Security: bcrypt for password hashing

# Usage Instructions
Register an account at /register
Log in at /login
Access challenges at /challenges
Update profile information at /profile

# API Documentation
# User Routes
GET /user – Read all users
GET /user/:user_id – Read a user by ID
PUT /user/:user_id – Update a user by ID (checks if username already exists)
DELETE /user/:user_id – Delete a user by ID
# Challenge Routes
GET /challenge/:user_id – Read list of participants by user ID
GET /challenge/created/:user_id – Read list of challenges created by user ID
GET /challenge – Read all challenges
POST /challenge – Create a new challenge
PUT /challenge/:challenge_id – Update a challenge by ID (checks creator ID)
DELETE /challenge/:challenge_id – Delete a challenge by ID
POST /challenge/:challenge_id – Create a new completion record (includes skill points)
# Review Routes
GET /review – Read all reviews
POST /review/:challenge_id – Create a review for a challenge
PUT /review/:id – Update a review by ID
DELETE /review/:id – Delete a review by ID
# Pet Routes
GET /pet – Read all pets
GET /pet/owner/:owner_id – Read all owned pets by owner ID
POST /pet/:pet_id – Create an owned pet (checks if pet exists, deducts skill points)
DELETE /pet/owner/:owner_id/:id – Delete an owned pet by owner ID and pet ID (refunds skill points)

# Features
User authentication (JWT)
Secure password hashing (bcrypt)
CRUD operations for users, challenges, reviews, and pets
Structured MVC architecture
MySQL database integration
# Error Handling
Uses HTTP status codes (e.g., 400 for bad requests, 401 for unauthorized, 500 for server errors)
Descriptive JSON error messages returned
Try-catch blocks and error-handling middleware for better debugging

# Developer
Shen Haoming - Developer

# License
This project is licensed under the MIT License.