const pool = require('../services/db');

//Select All FitnessChallenge
module.exports.selectAll = (callback) =>
    {
        const SQLSTATMENT = `
        SELECT * FROM FitnessChallenge;
        `;
    
    pool.query(SQLSTATMENT, callback);
    }
//Select FitnessChallenge by Id
module.exports.selectById = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM FitnessChallenge
    WHERE challenge_id = ?;
    `;
const VALUES = [data.challenge_id];

pool.query(SQLSTATMENT, VALUES, callback);
}

//Insert New FitnessChallenge
module.exports.insertSingle = (data, callback) => {
    const SQL_INSERT = `
    INSERT INTO FitnessChallenge (challenge, creator_id, skillpoints)
    VALUES (?, ?, ?);
    `;

    const VALUES = [data.challenge, data.creator_id, data.skillpoints];

    pool.query(SQL_INSERT, VALUES, callback);
}
//Update the FitnessChallenge
module.exports.updateById = (data, callback) =>
{
    const SQLSTATMENT = `
    UPDATE FitnessChallenge 
    SET challenge = ?, skillpoints = ?
    WHERE challenge_id = ?;
    `;
const VALUES = [data.challenge, data.skillpoints, data.challenge_id];

pool.query(SQLSTATMENT, VALUES, callback);   
}
//Delete the FitnessChallenge
module.exports.deleteById = (data, callback) =>
    {
        const SQLSTATMENT = `
        DELETE FROM FitnessChallenge 
        WHERE challenge_id = ?;
        `;
    const VALUES = [data.challenge_id];
    
    pool.query(SQLSTATMENT, VALUES, callback);
    }

//Select All Participants of FitnessChallenge by Id
module.exports.selectChallengeRecordByUserId = (data, callback) =>
    {
        const SQLSTATMENT = `
        SELECT * FROM UserCompletion
        WHERE user_id = ?;
        `;
    const VALUES = [data.user_id];
    
    pool.query(SQLSTATMENT, VALUES, callback);
    }

//Select All Challenges by user_id
module.exports.selectChallengeByUserId = (data, callback) =>
    {
        const SQLSTATMENT = `
        SELECT * FROM FitnessChallenge
        WHERE creator_id = ?;
        `;
    const VALUES = [data.creator_id];
    
    pool.query(SQLSTATMENT, VALUES, callback);
    }

//Select Completion by Id
module.exports.selectcompletionById = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM UserCompletion
    WHERE complete_id = ?;
    `;
const VALUES = [data.complete_id];

pool.query(SQLSTATMENT, VALUES, callback);
}
//Insert New Completion
module.exports.insertCompletion = (data, callback) => {
    const SQL_INSERT = `
    INSERT INTO UserCompletion (challenge_id, user_id, completed, notes)
    VALUES (?, ?, ?, ?);
    `;

    const VALUES = [data.challenge_id, data.user_id, data.completed, data.notes];

    pool.query(SQL_INSERT, VALUES, callback);
}

//Update the skillpoints
module.exports.updateskillpointsById = (data, callback) =>
    {
        const SQLSTATMENT = `
        UPDATE User 
        SET skillpoints = skillpoints + ?
        WHERE user_id = ?;
        `;
    const VALUES = [data.skillpoints, data.user_id];
    
    pool.query(SQLSTATMENT, VALUES, callback);   
    }