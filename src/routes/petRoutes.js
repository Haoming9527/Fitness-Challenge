const express = require('express');
const router = express.Router(); 

const controller = require('../controllers/petController');
//Read All Pet
router.get('/', controller.readAllPet);
//Read All Owned Pet by owner_id
router.get('/owner/:owner_id', controller.readAllOwnedPet);
//Create Owned Pet
router.post('/:pet_id', controller.CheckPetExists, controller.CheckUserSkillpoints, controller.DeductUserSkillpoints, controller.createOwnedPet);
//Delete Owned pet by owner id and id
router.delete('/owner/:owner_id/:id', controller.CheckOwnedPetExists, controller.CheckOwnedPetDetails, controller.RefundUserSkillpoints, controller.deleteOwnedPetByOwnerIdandId);


module.exports = router;