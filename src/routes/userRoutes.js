const express = require('express');
const router = express.Router(); 

const controller = require('../controllers/userController');
//Read All User
router.get('/', controller.readAllUser);
//Read User by Id
router.get('/:user_id', controller.readUserById);
//Update the user
router.put('/:user_id', controller.checkOtherUsernameExists, controller.updateUserById);
//Delete the user
router.delete('/:user_id', controller.deleteUserById);

module.exports = router;