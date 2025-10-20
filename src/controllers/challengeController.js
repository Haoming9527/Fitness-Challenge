const model = require("../models/challengeModel.js");
//Read all Challenge
module.exports.readAllChallenge = (req, res, next) =>
    {
        const callback = (error, results, fields) => {
            if (error) {
                console.error("Error readAllChallenge:", error);
                res.status(500).json(error);
            } 
            else res.status(200).json(results);
        }
    
        model.selectAll(callback);
    }

//Create new challenge
module.exports.createNewChallenge = (req, res, next) =>
        {
            if(req.body.user_id === undefined ||req.body.challenge === undefined || req.body.skillpoints === undefined)
            {
                res.status(400).json({
                    message: "Error: challenge, skillpoints or user_id are undefined"
                });
                return;
            }
            req.body.skillpoints = parseInt(req.body.skillpoints);

    // Check if skillpoints is a valid number and greater than 0
    if (isNaN(req.body.skillpoints) || req.body.skillpoints <= 0) {
        return res.status(400).json({
            message: "Error: skillpoints need to be a number greater than 0"
        });
    }
        
            const data = {
                challenge: req.body.challenge,
                creator_id: req.body.user_id,
                skillpoints:req.body.skillpoints
            }
        
            const callback = (error, results, fields) => {
                if (error) {
                    console.error("Error createNewChallenge:", error);
                    res.status(500).json(error);
                }  
                // Get the newly created Challenge's ID
                const newchallengeId = results.insertId;
                // Fetch created Challenge details if create succeeded
                model.selectById({ challenge_id: newchallengeId }, (selectError, selectResults) => {
                if (selectError) {
                    console.error("Error fetching created Challenge details:", selectError);
                    return res.status(500).json(selectError);
                }

                // Send the created Challenge details in the response
                return res.status(201).json(selectResults[0]);
                });
                
            }
        
            model.insertSingle(data, callback);
    }

//Middleware to check the creator id
module.exports.CheckCreatorId = (req, res, next) => {
    const data = {
        challenge_id: req.params.challenge_id,
        creator_id: req.body.user_id,
        challenge: req.body.challenge,
        skillpoints: req.body.skillpoints
    };
// Fetch the current challenge details to verify the creator
model.selectById({ challenge_id: data.challenge_id }, (selectError, selectResults) => {
    if (selectError) {
        console.error("Error fetching challenge details:", selectError);
        return res.status(500).json(selectError);
    }
    
    // Check if the challenge exists
    if (selectResults.length === 0) {
        return res.status(404).json({ message: "Challenge not found" }); 
    }

    const existingChallenge = selectResults[0];
    data.creator_id = parseInt(data.creator_id);
    // Check if the user is authorized to update the challenge
    if (existingChallenge.creator_id !== data.creator_id) {
        return res.status(403).json({
            message: "You are not authorized to update this challenge"
        });
    }
    next();
    });
}

// Update Challenge by challenge_id
module.exports.updateChallengeById = (req, res, next) => {
    if (req.body.user_id === undefined ||req.body.challenge === undefined || req.body.skillpoints === undefined) {
        res.status(400).json({
            message: "Error: challenge, skillpoints or user_id are undefined"
        });
        return;
    }

    const data = {
        challenge_id: req.params.challenge_id,
        creator_id: req.body.user_id,
        challenge: req.body.challenge,
        skillpoints: req.body.skillpoints
    };

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateChallengeById:", error);
            res.status(500).json(error);
        } else {
            if (results.affectedRows === 0) {
                return res.status(404).json({
                    message: "Challenge not found"
                });
            }
                // Fetch updated Challenge details if update succeeded
                model.selectById({ challenge_id: data.challenge_id }, (selectError, selectResults) => {
                    if (selectError) {
                        console.error("Error fetching updated Challenge details:", selectError);
                        return res.status(500).json(selectError);
                    }

                    // Send the updated Challenge details in the response
                    return res.status(200).json(selectResults[0]);
                });
            };
        }
    model.updateById(data, callback);
};

//Delete Challenge by challenge_id   
module.exports.deleteChallengeById = (req, res, next) =>
        {
            const data = {
                challenge_id: req.params.challenge_id
            }
        
            const callback = (error, results, fields) => {
                if (error) {
                    console.error("Error deleteChallengeById:", error);
                    res.status(500).json(error);
                } else {
                    if(results.affectedRows == 0) 
                    {
                        res.status(404).json({
                            message: "Challenge not found"
                        });
                    }
                    else res.status(204).send(); // 204 No Content            
                }
            }
        
            model.deleteById(data, callback);
    };

//Read list of participants by challenge_Id
module.exports.readChallengeRecordByUserId = (req, res, next) =>
    {
        const data = {
            user_id: req.params.user_id
        }
    
        const callback = (error, results, fields) => {
            if (error) {
                console.error("Error readChallengeRecordByUserId:", error);
                res.status(500).json(error);
            } else {
                if(results.length == 0) 
                {
                    res.status(404).json({
                        message: "participants not found"
                    });
                }
                else res.status(200).json(results);
            }
        }
    
        model.selectChallengeRecordByUserId(data, callback);
}

//Read list of challenge by user_id
module.exports.readChallengeByUserId = (req, res, next) =>
    {
        const data = {
            creator_id: req.params.user_id
        }
    
        const callback = (error, results, fields) => {
            if (error) {
                console.error("Error readChallengeRecordByUserId:", error);
                res.status(500).json(error);
            } else {
                if(results.length == 0) 
                {
                    res.status(404).json({
                        message: "participants not found"
                    });
                }
                else res.status(200).json(results);
            }
        }
    
        model.selectChallengeByUserId(data, callback);
}

//Middleware to determine the skillpoints
module.exports.DefineSkillPoints = (req, res, next) => {
        
    const data = {
        challenge_id: req.params.challenge_id,
        user_id: req.body.user_id,
        completed:req.body.completed, 
        notes:req.body.notes
    }
    
    // Fetch the challenge details to get the skill points
    model.selectById({ challenge_id: data.challenge_id }, (selectError, selectResults) => {
        if (selectError) {
            console.error("Error fetching challenge details:", selectError);
            return res.status(500).json(selectError);
        }

        if (selectResults.length === 0) {
            return res.status(404).json({
                message: "Challenge not found",
            });
        }

    const completeChallenge = selectResults[0];
    let award_skillpoints = 5;
    //check if the challenge is completed
    if (data.completed == true) {
        award_skillpoints = completeChallenge.skillpoints;
    } 
    req.award_skillpoints = award_skillpoints;

    next();
    });
}
//Middleware to update the user's skillpoints
module.exports.UpdateSkillPoints = (req, res, next) => {
    const data = {
        user_id: req.body.user_id,
        skillpoints: req.award_skillpoints // Awarded skill points passed from the previous middleware
    };
    model.updateskillpointsById(data, (updateError, updateResults) => {
        if (updateError) {
            console.error("Error updating user skill points:", updateError);
            return res.status(500).json(updateError);
        }

        if (updateResults.affectedRows === 0) {
            return res.status(404).json({ message: "User not found." });
        }
        next();
    });
}
//Create new completion record
module.exports.createNewCompletion = (req, res, next) => {
    
        const data = {
            challenge_id: req.params.challenge_id,
            user_id: req.body.user_id,
            completed:req.body.completed, 
            notes:req.body.notes
        }
        const callback = (error, results, fields) => {
                if (error) {
                    console.error("Error createNewCompletion:", error);
                    res.status(500).json(error);
                }  
                // Get the newly created Completion's ID
                const newcompletionId = results.insertId;
                // Fetch created Completion details if create succeeded
                model.selectcompletionById({ complete_id: newcompletionId }, (selectError, selectResults) => {
                if (selectError) {
                    console.error("Error fetching created Completion details:", selectError);
                    return res.status(500).json(selectError);
                }

                // Send the created Completion details in the response
                return res.status(201).json(selectResults[0]);
                });
                
            }
            model.insertCompletion(data, callback);
}