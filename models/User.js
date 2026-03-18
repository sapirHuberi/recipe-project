const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "חובה להזין שם משתמש"],
    },
    password: {
        type: String,
        required: [true, "חובה להזין סיסמה"]
    },
    email: {
        type: String,
        required: [true, "חובה להזין מייל"],
        unique: true
    },
    address: {
        type: String,
        required: [true, "חובה להזין כתובת"]
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
});

module.exports = mongoose.model('User', userSchema);