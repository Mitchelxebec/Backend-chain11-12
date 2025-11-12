const express = require("express");
const router = express.Router();

const {
    login, 
    register,
    verify,
    resendOTP,
    logout,
    resetPassword
} = require("../controllers/auth");

const { validateLoginObj, validateRegisterObj, validateVerificationObj, validateOTPObj,validateLogoutObj, ValidateResetPassword } = require('../validators/auth');


router.post("/login", validateLoginObj, login);
router.post("/register", validateRegisterObj, register);
router.post("/verify", validateVerificationObj, verify);
router.put("/resent-otp", validateOTPObj, resendOTP);
router.post("/logout", validateLogoutObj, logout);
router.put('/forgot-password', ValidateResetPassword, resetPassword);

module.exports = router;
