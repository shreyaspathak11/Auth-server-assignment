const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(" ")[1];

        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if (err) {
                return res.status(403).json({ error: "Token is not valid or expired" });
            }
            req.user = user;
            next(); // Proceed to the next middleware or route handler
        });
    } else {
        return res.status(401).json({ error: "You are not authenticated" });
    }
}

module.exports = authMiddleware;
