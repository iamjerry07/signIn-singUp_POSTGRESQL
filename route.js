const express = require('express');
const router = express.Router();
const userController = require('./controller/userController')

router.get('/createUser', userController.createUser)           

router.post('/signUp', userController.signUp)

module.exports = router;