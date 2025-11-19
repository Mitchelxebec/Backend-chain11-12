const express = require("express");
const router = express.Router();

const {
    login, 
    register,
    verify,
    resendOTP,
    forgotPassword,
    resetPassword,
    logout
} = require("../controllers/auth");

const { validateLoginObj, validateRegisterObj, validateVerificationObj, validateOTPObj, ValidateResetPassword, validateforgotpassword,  validateLogoutObj} = require('../validators/auth');
    


router.post("/logout", validateLogoutObj, logout);
router.post('/login', validateLoginObj,  login);
router.post('/register', validateRegisterObj, register);
router.post('/verify', validateVerificationObj, verify);
router.put('/resent-otp', validateOTPObj, resendOTP);
router.put('/forgot-password', validateforgotpassword , forgotPassword);
router.put('/reset-password', ValidateResetPassword, resetPassword )

module.exports = router;
