const userModel = require('../model/userModel');
const jwt = require('jsonwebtoken');
const JWT_HASH = "123abc#ABC56%^&*"


const createUser = async function(req,res){
    return res.send("hello world")
}

 const signUp = async (req, res) => {
    try {
        let data = req.body;
        const userExists = await userModel.getUserByPhone(data.mobile_no);
        if (userExists.length > 0) {
            return res.status(400).json({ 'message': 'Number already exists' });
        } else {
            const salt = await bcrypt.genSalt(10);
            data.password = await bcrypt.hash(data.password, salt);
            delete data.repeat_password;
            const userCreated = await userModel.createUser(data);
            if (userCreated.affectedRows > 0) {
                return res.status(200).json({ 'message': 'User created','user_id':userCreated.insertId});
            } else {
                return res.status(400).json({ 'error': 'Something went wrong' });
            }
        }
    } catch (err) {
        return res.status(500).json({ error: err });
    }
}

const userLogin = async (req, res) => {
    try {
        let data = req.body;
        const userExists = await userModel.getUserByMobile(data.mobile_no);
        if (userExists.length > 0) {
            if (! await bcrypt.compare(data.password, userExists[0].password)) {
                return res.status(400).json({ error: 'Incorrect email or password' });
            }
            const token = jwt.sign({ id: userExists[0].id, mobile_no: userExists[0].mobile_no }, JWT_HASH);
            return res.status(200).json({ 'token': token , "msg" : "USER LOGGED IN"});
        } else {
            return res.status(400).json({ 'error': 'User does not exists' });
        }

    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err });
    }
}


module.exports = {createUser , signUp, userLogin}
