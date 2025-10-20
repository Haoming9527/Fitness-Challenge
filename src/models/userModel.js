const pool = require('../services/db');

//Select All User
module.exports.selectAll = (callback) =>
    {
        const SQLSTATMENT = `
        SELECT * FROM User;
        `;
    
    pool.query(SQLSTATMENT, callback);
    }
//Select User by Id
module.exports.selectById = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM User
    WHERE user_id = ?;
    `;
const VALUES = [data.user_id];

pool.query(SQLSTATMENT, VALUES, callback);
}

//Select User by Username
module.exports.selectByUsername = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM User
    WHERE username = ?;
    `;
const VALUES = [data.username];
    
pool.query(SQLSTATMENT, VALUES, callback);
}
//////////////////////////////////////////////////////
// SELECT USER BY USERNAME OR EMAIL
//////////////////////////////////////////////////////
module.exports.selectByUsernameOrEmail = (data, callback) =>
    {
        const SQLSTATMENT = `
        SELECT * FROM User
        WHERE username = ? OR email = ?;
        `;
    const VALUES = [data.username, data.email];
    
    pool.query(SQLSTATMENT, VALUES, callback);
    }

//Insert New User
module.exports.insertSingle = (data, callback) =>
{
    const SQL_INSERT = `
    INSERT INTO User (username, email, password, skillpoints)
    VALUES (?, ?, ?, 0);
    `;

const VALUES = [data.username, data.email, data.password];

pool.query(SQL_INSERT, VALUES, callback); 
}
//Update the User
module.exports.updateById = (data, callback) =>
    {
        const SQLSTATMENT = `
        UPDATE User 
        SET username = ?
        WHERE user_id = ?;
        `;
    const VALUES = [data.username, data.user_id];
    
    pool.query(SQLSTATMENT, VALUES, callback);   
    }
//Delete the User
module.exports.deleteById = (data, callback) =>
    {
        const SQLSTATMENT = `
        DELETE FROM User 
        WHERE user_id = ?;
        `;
    const VALUES = [data.user_id];
    
    pool.query(SQLSTATMENT, VALUES, callback);
    }