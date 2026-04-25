const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "גישה נדחתה, לא סופק טוקן" });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET || 'your_secret_key');

        req.user = verified;
        
        next(); 
    } catch (err) {
        res.status(401).json({ message: "טוקן לא תקין או פג תוקף" });
    }
};

module.exports = auth;