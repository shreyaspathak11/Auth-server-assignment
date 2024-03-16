const express = require('express');                      
const router = express.Router();

const {
    registerUser,
    loginUser,
} = require('../controller/auth.controller');

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
// reset password   // forgot password  // logout   
module.exports = router;