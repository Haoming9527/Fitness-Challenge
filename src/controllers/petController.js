const model = require("../models/petModel.js");
//Read all Pet
module.exports.readAllPet = (req, res, next) =>
    {
        const callback = (error, results, fields) => {
            if (error) {
                console.error("Error readAllPet:", error);
                res.status(500).json(error);
            } 
            else res.status(200).json(results);
        }
    
        model.selectAll(callback);
    }



//Read All Owned Pet by owner_id
module.exports.readAllOwnedPet = (req, res, next) =>
        {
            const data = {
                owner_id: req.params.owner_id
            }
        
            const callback = (error, results, fields) => {
                if (error) {
                    console.error("Error readAllOwnedPet:", error);
                    res.status(500).json(error);
                } else {
                    if(results.length == 0) 
                    {
                        res.status(404).json({
                            message: "OwnedPet not found"
                        });
                    }
                    else res.status(200).json(results);
                }
            }
        
            model.selectOwnedPetByOwnerId(data, callback);
    }
           
//Middleware to fetch the pet detail
module.exports.CheckPetExists = (req, res, next) => {
    const data = {
        pet_id: req.params.pet_id,
        owner_id: req.body.user_id
    };


    model.selectByPetId({ pet_id: data.pet_id }, (selectError, selectPetResults) => {
        if (selectError) {
            console.error("Error fetching pet details:", selectError);
            return res.status(500).json(selectError);
        }

        if (selectPetResults.length === 0) {
            return res.status(404).json({
                message: "Pet not found"
            });
        }

        const existingPet = selectPetResults[0];
        // Attaching pet properties to req
        req.petData = {
            pet_name: existingPet.name,
            rarity: existingPet.rarity,
            skillpoints_cost: existingPet.skillpoints_cost
        };

        next();
    });
};

//Middleware to check if the user have enough skillpoints
module.exports.CheckUserSkillpoints = (req, res, next) => {
    const data = {
        pet_id: req.params.pet_id,
        owner_id: req.body.user_id,
        skillpoints_cost: req.petData.skillpoints_cost
    };

    if (req.body.user_id === undefined) {
        return res.status(400).json({
            message: "Error: user_id is undefined"
        });
    }

    model.selectById({ user_id: data.owner_id }, (selectError, selectUserResults) => {
        if (selectError) {
            console.error("Error fetching user details:", selectError);
            return res.status(500).json(selectError);
        }

        if (selectUserResults.length === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const existingUser = selectUserResults[0];
        if (existingUser.skillpoints < data.skillpoints_cost) {
            return res.status(403).json({
                message: "You do not have enough skillpoints to purchase this pet"
            });
        }

        next();
    });
};



//Middleware to deduct user's skillpoint
module.exports.DeductUserSkillpoints = (req, res, next) => {
    const data = {
        pet_id: req.params.pet_id,
        owner_id: req.body.user_id,
        skillpoints_cost: req.petData.skillpoints_cost
    };

    model.updateskillpointsById({ user_id: data.owner_id, skillpoints: data.skillpoints_cost }, (updateError, updateResults) => {
        if (updateError) {
            console.error("Error updating user skillpoints:", updateError);
            return res.status(500).json(updateError);
        }

        if (updateResults.affectedRows === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        next();
    });
};

// Create Owned Pet 
module.exports.createOwnedPet = (req, res) => {
    const data = {
        pet_id: req.params.pet_id,
        owner_id: req.body.user_id,
        pet_name: req.petData.pet_name,
        rarity: req.petData.rarity
    };

    const callback = (error, results) => {
        if (error) {
            console.error("Error creating owned pet:", error);
            return res.status(500).json(error);
        }

        const newOwnedPetId = results.insertId;
        model.selectOwnedPetById({ id: newOwnedPetId }, (selectError, selectResults) => {
            if (selectError) {
                console.error("Error fetching created owned pet details:", selectError);
                return res.status(500).json(selectError);
            }

            return res.status(201).json(selectResults[0]);
        });
    };

    model.insertOwnedPet(data, callback);
};

//Middleware to fetch the owned pet detail
module.exports.CheckOwnedPetExists = (req, res, next) => {
    const data = {
        id: req.params.id,
        owner_id: req.params.owner_id
    };


    model.selectOwnedPetById({ id: data.id }, (selectError, selectPetResults) => {
        if (selectError) {
            console.error("Error fetching pet details:", selectError);
            return res.status(500).json(selectError);
        }

        if (selectPetResults.length === 0) {
            return res.status(404).json({
                message: "Pet not found"
            });
        }

        const existingOwnedPet = selectPetResults[0];
        // Attaching pet properties to req
        req.petData = {
            pet_id: existingOwnedPet.pet_id
        };

        next();
    });
};

//Middleware to fetch the pet detail
module.exports.CheckOwnedPetDetails = (req, res, next) => {
    const data = {
        pet_id: req.petData.pet_id
    };


    model.selectByPetId({ pet_id: data.pet_id }, (selectError, selectPetResults) => {
        if (selectError) {
            console.error("Error fetching pet details:", selectError);
            return res.status(500).json(selectError);
        }

        if (selectPetResults.length === 0) {
            return res.status(404).json({
                message: "Pet not found"
            });
        }

        const existingPet = selectPetResults[0];
        // Attaching pet properties to req
        req.petData = {
            skillpoints_cost: existingPet.skillpoints_cost
        };

        next();
    });
};
//Middleware to refund user's skillpoint
module.exports.RefundUserSkillpoints = (req, res, next) => {
    const data = {
        pet_id: req.params.pet_id,
        owner_id: req.params.owner_id,
        skillpoints_cost: req.petData.skillpoints_cost
    };

    model.refundskillpointsById({ user_id: data.owner_id, skillpoints: data.skillpoints_cost }, (updateError, updateResults) => {
        if (updateError) {
            console.error("Error updating user skillpoints:", updateError);
            return res.status(500).json(updateError);
        }

        if (updateResults.affectedRows === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        next();
    });
};
//Delete Owned pet by owner_id and id   
module.exports.deleteOwnedPetByOwnerIdandId = (req, res, next) =>
    {
        const data = {
            owner_id: req.params.owner_id,
            id: req.params.id
        }
    
        const callback = (error, results, fields) => {
            if (error) {
                console.error("Error deleteOwnedPetByOwnerIdandPetId:", error);
                res.status(500).json(error);
            } else {
                if(results.affectedRows == 0) 
                {
                    res.status(404).json({
                        message: "Owned Pet not found"
                    });
                }
                else res.status(204).send(); // 204 No Content            
            }
        }
    
        model.deleteById(data, callback);
};