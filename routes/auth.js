const express = require('express');
const router = express.Router();

const {
    login, 
    register,
    verify,
    resendOTP,
    forgotPassword
} = require("../controllers/auth");

const { validateLoginObj, validateRegisterObj, validateVerificationObj, validateOTPObj, ValidateResetPassword } = require('../validators/auth');



router.post('/login', validateLoginObj,  login);
router.post('/register', validateRegisterObj, register);
router.post('/verify', validateVerificationObj, verify);
router.put('/resent-otp', validateOTPObj, resendOTP);
router.put('/forgot-password', ValidateResetPassword, forgotPassword);

module.exports = router;