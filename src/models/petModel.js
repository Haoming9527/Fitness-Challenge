const pool = require('../services/db');

//Select All Pet
module.exports.selectAll = (callback) =>
    {
        const SQLSTATMENT = `
        SELECT * FROM Pet;
        `;
    
    pool.query(SQLSTATMENT, callback);
    }
//Select Pet by pet_id
module.exports.selectByPetId = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Pet
    WHERE pet_id = ?;
    `;
const VALUES = [data.pet_id];

pool.query(SQLSTATMENT, VALUES, callback);
}

//Select Owned Pet by id
module.exports.selectOwnedPetById = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM OwnedPet
    WHERE id = ?;
    `;
const VALUES = [data.id];

pool.query(SQLSTATMENT, VALUES, callback);
    }



//Select All Owned Pet by owner_id
module.exports.selectOwnedPetByOwnerId = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM OwnedPet
    WHERE owner_id = ?;
    `;
const VALUES = [data.owner_id];

pool.query(SQLSTATMENT, VALUES, callback);
}

//Insert New Owned Pet
module.exports.insertOwnedPet = (data, callback) => {
    const SQL_INSERT = `
    INSERT INTO OwnedPet (pet_id, owner_id, pet_name, rarity)
    VALUES (?, ?, ?, ?);
    `;

    const VALUES = [data.pet_id, data.owner_id, data.pet_name, data.rarity];

    pool.query(SQL_INSERT, VALUES, callback);
}
//Delete the OwnedPet
module.exports.deleteById = (data, callback) =>
    {
        const SQLSTATMENT = `
        DELETE FROM OwnedPet 
        WHERE owner_id = ? AND id = ?;
        `;
    const VALUES = [data.owner_id, data.id];
    
    pool.query(SQLSTATMENT, VALUES, callback);
    }
//Update the skillpoints
module.exports.updateskillpointsById = (data, callback) =>
    {
        const SQLSTATMENT = `
        UPDATE User 
        SET skillpoints = skillpoints - ?
        WHERE user_id = ?;
        `;
    const VALUES = [data.skillpoints, data.user_id];
    
    pool.query(SQLSTATMENT, VALUES, callback);   
    }
//Update the skillpoints
module.exports.refundskillpointsById = (data, callback) =>
    {
        const SQLSTATMENT = `
        UPDATE User 
        SET skillpoints = skillpoints + ?
        WHERE user_id = ?;
        `;
    const VALUES = [data.skillpoints, data.user_id];
    
    pool.query(SQLSTATMENT, VALUES, callback);   
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