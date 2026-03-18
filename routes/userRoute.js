const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { userValidation } = require('../validation/recipeValidator');

router.post('/register', async (req, res) => {
    const { error } = userValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        res.status(201).send(savedUser);
    } catch (err) {
        res.status(500).send("שגיאה ברישום המשתמש: " + err.message);
    }
});

module.exports = router;