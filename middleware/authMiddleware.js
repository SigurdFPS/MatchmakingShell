// File: middleware/authMiddleware.js
const supabase = require('../config/db');

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const { data: { user }, error } = await supabase.auth.getUser(token);
        
        if (error || !user) return res.status(401).json({ message: 'Authorization failed' });

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Authorization failed' });
    }
};

module.exports = authMiddleware;
