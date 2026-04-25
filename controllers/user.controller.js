const User= require('../models/User');
const userValidator = require('../validation/user.validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res,next) => {
    try {
        const { error } = userValidator.signup(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) return res.status(400).json({ message: "משתמש עם המייל הזה כבר קיים" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            ...req.body,
            password: hashedPassword
        });

        await newUser.save();
        
        const userResponse = newUser.toObject();
        delete userResponse.password;
        res.status(201).json(userResponse);

    } catch (err) {
        console.error("--- Error in Signup ---");
        console.error(err); 
        
        res.status(500).json({ 
            error: { 
                message: "שגיאת שרת בעת ההרשמה", 
                details: err.message 
            } 
        });
    }
};
exports.login = async (req, res, next) => {
    try {
        const { error } = userValidator.login(req.body);
        if (error) {
            return res.status(400).json({ error: { message: error.details[0].message } });
        }

        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json({ error: { message: "אימייל או סיסמה שגויים" } });
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: { message: "אימייל או סיסמה שגויים" } });
        }

        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET || 'your_secret_key', // מפתח סודי
            { expiresIn: '1h' } // תוקף הטוקן
        );

        res.status(200).json({
            message: "התחברת בהצלחה",
            token,
            username: user.username
        });

    } catch (err) {
        next(err);
    }
};
exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find().select('-password'); // הסרת שדה הסיסמה מהתוצאה
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }    
};
exports.deleteUser = async (req, res,next) => {
    try {
        const userId = req.params.id;
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ error: { message: "משתמש לא נמצא" } });
        }
        res.status(200).json({ message: "המשתמש נמחק בהצלחה" });
    } catch (err) {
        next(err);
    }
};
