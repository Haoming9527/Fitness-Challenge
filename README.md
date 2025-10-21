# Fitness Challenge
#### Video Demo:  https://youtu.be/OVn_msknZ2c
#### Description:
A comprehensive web application for managing fitness challenges built with Node.js, Express, and MySQL. Users can participate in fitness challenges, track progress, collect virtual pets, write reviews, and interact with a community of fitness enthusiasts.

## Features

- **User Authentication**: Secure registration and login with JWT tokens
- **Challenge Management**: Create, update, and participate in fitness challenges
- **Progress Tracking**: Record challenge completions and earn skill points
- **Virtual Pet Collection**: Collect pets using earned skill points
- **Review System**: Write and manage reviews for challenges
- **User Profiles**: View and edit personal profiles and activity
- **Community Features**: Browse users and their achievements

## Tech Stack

### Backend
- **Node.js** with **Express.js**
- **MySQL** database
- **JWT** for authentication
- **bcrypt** for password hashing

### Frontend
- **HTML5**, **CSS3**, **Vanilla JavaScript**
- Responsive design with custom styling

### Development
- **Nodemon** for hot reloading
- **MySQL2** client for database operations

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 14 or higher)
- **npm** (comes with Node.js)
- **MySQL** server (version 8.0 or higher)

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Haoming9527/Fitness-Challenge.git
   cd fitness-challenge
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up the database:**
   - Create a MySQL database named `fitness`
   - Update the `.env` file with your MySQL credentials (see Environment Variables section)

4. **Initialize database tables:**
   ```bash
   npm run init_tables
   ```

5. **Configure environment variables:**
   - Copy the provided `.env` template
   - Set your database credentials and JWT secret

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_DATABASE=fitness
JWT_SECRET_KEY=your-secret-key
JWT_EXPIRES_IN=15m
JWT_ALGORITHM=HS256
```

**Note:** Replace the values with your actual MySQL credentials.

## Usage

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Or start the production server:**
   ```bash
   npm start
   ```

3. **Access the application:**
   Open your browser and navigate to `http://localhost:3000` (or the configured port)

### User Guide

- **Register**: Visit `/register` to create a new account
- **Login**: Visit `/login` to sign in
- **Challenges**: Browse and join fitness challenges at `/challenges`
- **Profile**: Manage your profile and pets at `/profile`
- **Pet Shop**: Collect new pets using skill points at `/petshop`

## API Documentation

The application provides a RESTful API with the following endpoints:

### User Routes
```http
GET  /user/           - Get all users
GET  /user/:user_id   - Get user by ID
PUT  /user/:user_id   - Update user (validates unique username)
DELETE /user/:user_id - Delete user
```

### Challenge Routes
```http
GET  /challenge/user/:user_id     - Get challenges the user is participating in
GET  /challenge/created/:user_id  - Get challenges created by the user
GET  /challenge/                  - Get all challenges
POST /challenge/                  - Create a new challenge
PUT  /challenge/:challenge_id     - Update challenge (requires creator permission)
DELETE /challenge/:challenge_id   - Delete challenge (requires creator permission)
POST /challenge/complete/:challenge_id - Complete a challenge (awards skill points)
```

### Review Routes
```http
GET  /review/           - Get all reviews
POST /review/:challenge_id - Create review for a specific challenge
PUT  /review/:review_id - Update review (requires author permission)
DELETE /review/:review_id - Delete review (requires author permission)
```

### Pet Routes
```http
GET  /pet/                        - Get all available pets
GET  /pet/owner/:owner_id          - Get pets owned by a user
POST /pet/buy/:pet_id              - Purchase a pet (deducts skill points)
DELETE /pet/owner/:owner_id/:pet_id - Sell a pet (refunds skill points)
```

## Project Structure

```
fitness-challenge/
├── public/                    # Static frontend files
│   ├── css/                   # Stylesheets
│   ├── images/                # Image assets
│   ├── js/                    # Client-side JavaScript
│   └── *.html                 # HTML pages
├── src/                       # Backend source code
│   ├── configs/               # Database configuration and setup
│   ├── controllers/           # Route controllers
│   ├── middlewares/           # Express middlewares (auth, security)
│   ├── models/                # Database models
│   ├── routes/                # API route definitions
│   ├── services/              # Database and utility services
│   └── app.js                 # Express application setup
├── .env                       # Environment variables (gitignored)
├── .gitignore                 # Git ignore rules
├── index.js                   # Application entry point
├── package.json               # Dependencies and scripts
└── README.md                  # Project documentation
```

## Error Handling

The application implements comprehensive error handling:
- HTTP status codes (400 Bad Request, 401 Unauthorized, 500 Internal Server Error)
- Descriptive JSON error responses
- Middleware for centralized error management
- Input validation and sanitization

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## Developer

**Shen Haoming** - [GitHub](https://github.com/Haoming9527)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
