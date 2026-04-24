const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller'); 

router.post('/register', userController.signup);
router.post('/login', userController.login);
router.get('/users', userController.getAllUsers); 
router.delete('/users/:id', userController.deleteUser); 

module.exports = router;