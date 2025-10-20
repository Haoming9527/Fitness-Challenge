const express = require('express');
const router = express.Router(); 

const controller = require('../controllers/challengeController');
//Read list of participants by challenge_Id
router.get('/:user_id', controller.readChallengeRecordByUserId);
//Read list of participants by user_id
router.get('/created/:user_id', controller.readChallengeByUserId);
//Read All Challenge
router.get('/', controller.readAllChallenge);
//Create New Challenge
router.post('/', controller.createNewChallenge);
//Update the Challenge
router.put('/:challenge_id', controller.CheckCreatorId,controller.updateChallengeById);
//Delete the Challenge
router.delete('/:challenge_id', controller.deleteChallengeById);
//Create New completion record
router.post('/:challenge_id', controller.DefineSkillPoints, controller.UpdateSkillPoints, controller.createNewCompletion);

module.exports = router;