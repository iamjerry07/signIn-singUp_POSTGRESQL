const db = require('../config/dbConnect');


exports.getUserByPhone= async(mobile) => {
    try{
        const data = await db.query(`SELECT * FROM users where mobile = ?`, [mobile]);
        return data;
    }catch(err){
        throw err;
    }
    
};

exports.createUser= async(data) => {
    try{
        const inserted = await db.query(`INSERT INTO users SET ?`, data);
        console.log(inserted);
        return inserted;
    }catch(err){
        throw err;
    }
    
};

