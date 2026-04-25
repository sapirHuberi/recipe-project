const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller'); 
const auth = require('../middlewares/auth'); 

// נתיבים פתוחים לכולם
router.post('/signup', userController.signup);
router.post('/login', userController.login);

// נתיבים מוגנים
router.get('/', auth, userController.getAllUsers); 
router.delete('/:id', auth, userController.deleteUser); 

module.exports = router;