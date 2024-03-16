const authService = require('../services/auth.service');

async function registerUser(req, res) {
    try {
        const { username, email, password } = req.body;

        // Validation logic (example)
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'Please provide username, email and password' });
        }

        const user = await authService.registerUser({ username, email, password });

        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        const userInfo = await authService.loginUser(email, password);

        res.status(200).json(userInfo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    registerUser,
    loginUser,
};
