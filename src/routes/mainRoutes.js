//////////////////////////////////////////////////////
// REQUIRE MODULES
//////////////////////////////////////////////////////
const express = require('express');
const router = express.Router();

//////////////////////////////////////////////////////
// CREATE ROUTER
//////////////////////////////////////////////////////
const userRoutes = require('./userRoutes');
const challengeRoutes = require('./challengeRoutes');
const reviewRoutes = require('./reviewRoutes');
const petRoutes = require('./petRoutes')
//////////////////////////////////////////////////////
// DEFINE ROUTES
//////////////////////////////////////////////////////
router.use("/user", userRoutes);
router.use("/challenge", challengeRoutes);
router.use("/review", reviewRoutes);
router.use("/pet", petRoutes)

const jwtMiddleware = require('../middlewares/jwtMiddleware');
const bcryptMiddleware = require('../middlewares/bcryptMiddleware');
const userController = require('../controllers/userController');

router.post("/login", userController.login, bcryptMiddleware.comparePassword, jwtMiddleware.generateToken, jwtMiddleware.sendToken);
router.post("/register", userController.checkUsernameOrEmailExist, bcryptMiddleware.hashPassword, userController.register, jwtMiddleware.generateToken, jwtMiddleware.sendToken);


//////////////////////////////////////////////////////
// EXPORT ROUTER
//////////////////////////////////////////////////////
module.exports = router;