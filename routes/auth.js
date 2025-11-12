const express = require("express");
const router = express.Router();

const {
  login,
  register,
  verify,
  resendOTP,
  logout,
} = require("../controllers/auth");

const {
  validateLoginObj,
  validateRegisterObj,
  validateVerificationObj,
  validateOTPObj,
  validateLogoutObj,
} = require("../validators/auth");

router.post("/login", validateLoginObj, login);
router.post("/register", validateRegisterObj, register);
router.post("/verify", validateVerificationObj, verify);
router.put("/resent-otp", validateOTPObj, resendOTP);
router.post("/logout", validateLogoutObj, logout);

module.exports = router;
