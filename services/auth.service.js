const User = require('../models/user.model');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

async function registerUser(userData) {
    try {
        const { username, email, password } = userData;

        // Check if user with the given email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ error: 'User with this email already exists' });
        }

        // Encrypt the password
        const encryptedPassword = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY).toString();

        // Create a new user instance
        const newUser = new User({
            username,
            email,
            password: encryptedPassword,
        });

        // Save the new user
        const user = await newUser.save();
        return user;
    } catch (error) {
        throw error;
    }
}

async function loginUser(email, password) {
    try {
        const user = await User.findOne({ email });

        if (!user) {
            res.status(404).json({ error: 'User not found' });
        }

        const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

        if (originalPassword !== password) {
            res.status(401).json({ error: 'Wrong credentials' });
        }

        const accessToken = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.SECRET_KEY,
            { expiresIn: '5d' }
        );

        const { password: _, ...info } = user._doc;

        return { ...info, accessToken };
    } catch (error) {
        throw error;
    }
}

module.exports = {
    registerUser,
    loginUser,
};
