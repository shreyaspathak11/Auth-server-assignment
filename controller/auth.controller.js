const authService = require('../services/auth.service');

async function registerUser(req, res, next) {
    try {
        const { username, email, password } = req.body;

        // Validation logic (example)
        if (!username || !email || !password) {
            const error = new Error('Invalid input');
            error.status = 400; // Bad Request
            throw error;
        }

        const user = await authService.registerUser({ username, email, password });

        res.status(201).json(user);
    } catch (error) {
        next(error); // Pass the error to the next middleware (the error handler)
    }
}

async function loginUser(req, res, next) {
    try {
        const { email, password } = req.body;

        const userInfo = await authService.loginUser(email, password);

        res.status(200).json(userInfo);
    } catch (error) {
        next(error); // Pass the error to the next middleware (the error handler)
    }
}

module.exports = {
    registerUser,
    loginUser,
};
