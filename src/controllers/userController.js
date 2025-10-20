//////////////////////////////////////////////////////
// REQUIRE MODULES
//////////////////////////////////////////////////////
const model = require("../models/userModel.js");

//////////////////////////////////////////////////////
// GET ALL PLAYERS BY USER
//////////////////////////////////////////////////////
module.exports.readAllUser = (req, res, next) =>
    {
        const callback = (error, results, fields) => {
            if (error) {
                console.error("Error readAllUser:", error);
                res.status(500).json(error);
            } 
            else res.status(200).json(results);
        }
    
        model.selectAll(callback);
    }

//////////////////////////////////////////////////////
// CONTROLLER FOR LOGIN
//////////////////////////////////////////////////////
module.exports.login = (req, res, next) => {
    // Validate input: Check if both username and password are provided
    if (req.body.username == undefined || req.body.password == undefined) {
        return res.status(400).json({ message: "Username and password are required" });
    }
    const data = {
        username: req.body.username,
        password: req.body.password
    }

    model.selectByUsername({ username: data.username}, (error, results, fields) => {
        if (error) {
            console.error("Error Login:", error);
            return res.status(500).json(error); // Add return to stop execution
        }
        if (results.length === 0) {
            return res.status(401).json({ message: "Invalid username or password" }); // Unauthorized
        }
        res.locals.hash = results[0].password;
        res.locals.userId = results[0].user_id;

        next();
    });
}

//////////////////////////////////////////////////////
// CONTROLLER FOR REGISTER
//////////////////////////////////////////////////////
module.exports.register = (req, res, next) => {
    // Validation 
    if (req.body.username == undefined || req.body.email == undefined || res.locals.hash ==undefined) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    const data = {
        username: req.body.username,
        email:req.body.email,
        password: res.locals.hash
    }
    
    model.insertSingle(data, (error, results, fields) => {
        if (error) {
            console.error("Error Register:", error);
            res.status(500).json(error);
        } 
        res.locals.userId = results.insertId;
        next();
    });
}

//////////////////////////////////////////////////////
// MIDDLEWARE FOR CHECK IF USERNAME OR EMAIL EXISTS
//////////////////////////////////////////////////////
module.exports.checkUsernameOrEmailExist = (req, res, next) => {
    // Validation 
    if (req.body.username == undefined || req.body.email == undefined) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    const data = {
        username: req.body.username,
        email:req.body.email
    }

    model.selectByUsernameOrEmail({ username: data.username, email: data.email }, (selectError, selectResults) => {
        if (selectError) {
            console.error("Error checking existing username:", selectError);
            return res.status(500).json(selectError);
        }

        if (selectResults.length > 0) {
            return res.status(409).json({
                message: "Error: Username or Email is already taken",
            });
        }
        next();
    });
};
// Middleware to check if other people has the username already exists
module.exports.checkOtherUsernameExists = (req, res, next) => {
    
    const data = {
        user_id: req.params.user_id,
        username: req.body.username
    }

    model.selectByUsername({ username: data.username }, (selectError, selectResults) => {
        if (selectError) {
            console.error("Error checking existing username:", selectError);
            return res.status(500).json(selectError);
        }

        if (selectResults.length > 0 && selectResults[0].user_id != data.user_id) {
            return res.status(409).json({
                message: "Error: Username is already taken",
            });
        }
        next();
    });
};

// Update user by id
module.exports.updateUserById = (req, res, next) =>
        {
            if(req.body.username == undefined)
            {
                res.status(400).json({
                    message: "Error: username and skillpoints is undefined"
                });
                return;
            }

            const data = {
                user_id: req.params.user_id,
                username: req.body.username
            }
            const callback = (error, results, fields) => {
                if (error) {
                    console.error("Error updateUserById:", error);
                    res.status(500).json(error);
                } else {
                    if(results.affectedRows == 0) 
                    {
                        res.status(404).json({
                            message: "User not found"
                        });
                    }
                    // Fetch updated user details if update succeeded
                    model.selectById({ user_id: data.user_id }, (selectError, selectResults) => {
                    if (selectError) {
                        console.error("Error fetching updated user details:", selectError);
                        return res.status(500).json(selectError);
                    }

                    // Send the updated user details in the response
                    return res.status(200).json(selectResults[0]);
                });
                }
            }
            model.updateById(data, callback);
        
    }
//////////////////////////////////////////////////////
// READ USER BY ID
//////////////////////////////////////////////////////
module.exports.readUserById = (req, res, next) =>
        {
            const data = {
                user_id: req.params.user_id
            }
        
            const callback = (error, results, fields) => {
                if (error) {
                    console.error("Error readUserById:", error);
                    res.status(500).json(error);
                } else {
                    if(results.length == 0) 
                    {
                        res.status(404).json({
                            message: "User not found"
                        });
                    }
                    else res.status(200).json(results[0]);
                }
            }
        
            model.selectById(data, callback);
    }

//////////////////////////////////////////////////////
// DELETE USER BY ID
//////////////////////////////////////////////////////
module.exports.deleteUserById = (req, res, next) =>
        {
            const data = {
                user_id: req.params.user_id
            }
        
            const callback = (error, results, fields) => {
                if (error) {
                    console.error("Error deleteUserById:", error);
                    res.status(500).json(error);
                } else {
                    if(results.affectedRows == 0) 
                    {
                        res.status(404).json({
                            message: "User not found"
                        });
                    }
                    else res.status(204).send(); // 204 No Content            
                }
            }
        
            model.deleteById(data, callback);
    }
