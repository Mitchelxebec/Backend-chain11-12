const asyncHandler = require("../middlewares/asyncHandler");

const { 
    login,
    register,
    verify,
    resendOTP,
    resetPassword,
    logout
} = require("../services/auth");

exports.login = asyncHandler(async (req, res, next) => {
  const result = await login(req, res, next);
  res.status(200).json({
    success: true,
    message: "Login Successful",
    data: result,
  });
});

exports.register = asyncHandler(async (req, res, next) => {
  const result = await register(req, res, next);
  res.status(200).json({
    success: true,
    message: "Registration Successful",
    data: result,
  });
});

exports.verify = asyncHandler(async (req, res, next) => {
  const result = await verify(req, res, next);
  res.status(200).json({
    success: true,
    message: "Verification Successful",
    data: result,
  });
});

exports.resendOTP = asyncHandler(async (req, res, next) => {
  const result = await resendOTP(req, res, next);
  res.status(200).json({
    success: true,
    message: "OTP Sent",
    data: result,
  });
});

exports.logout = asyncHandler(async (req, res, next) => {
  const result = await logout(req, res, next);
  res.status(200).json({
    success: true,
    message: result.message,
  });
});

exports.resetPassword = asyncHandler(async (req, res, next) => {
    const result = await resetPassword(req, res, next);
    res.status(200).json({
        "success": true,
        "message": "password set succesfully",
        "data": result
    })
});

