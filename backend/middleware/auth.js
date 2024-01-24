const { verify } = require('jsonwebtoken');

const validateToken = (req, res, next) => {
    const accessToken = req.cookies["access-token"];
    if (!accessToken) {
        return res.json({ error: "Access denied .No token provided " });
    }

    try {
        const validToken = verify(accessToken, process.env.JWT_SECRET);
        if (validToken) {
            req.user = validToken;
            return next();
        }

    } catch (err) {
        return res.json({ error: "Invalid token" });
    }
}

module.exports = validateToken;