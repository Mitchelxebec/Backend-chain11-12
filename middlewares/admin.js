const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("./asyncHandler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Token = require("../models/Token");

exports.protect = asyncHandler(async (req, res, next) => {
  try {
    const headers = req.headers.authorization;
    if (!headers) {
      next(new ErrorResponse(`Provide the bearer token`, 400));
    }
    const token = headers.split(" ")[1];

    var decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");

    const user = await User.findOne({ email: decoded.email });
    if (!user) {
      next(new ErrorResponse(`User not found`, 400));
    }

    // check if the token exist in userToken model
    const userTokens = await Token.find({ userId: user._id });
    let tokenExist = false;
    for (t of userTokens) {
      if (await bcrypt.compare(token, t.hashedToken)) {
        tokenExist = true;
        break;
      }
    }
    if (!tokenExist) {
      next(
        new ErrorResponse("Token invalid or expired. Please log in again", 401)
      );
    }
    return next();
  } catch (error) {
    next(new ErrorResponse(`Authorization error: ${error}`, 400));
  }
});

exports.verified = asyncHandler(async (req, res, next) => {
  const user = req.user;
  if (!user.isVerified || user.isVerified === false) {
    next(new ErrorResponse(`Verify your account`, 400));
  }
  return next();

});

exports.hasRole = (...roles) => asyncHandler(async (req, res, next) => {
    const userRole = req.user.role;
    if (!roles.includes(userRole)) {
        return next(new ErrorResponse(`You do not have permission to perform this action`, 403));
    }
    next();
});

exports.isAdmin = asyncHandler(async (req, res, next) => {
  const userRole = req.user.role;
  if (userRole !== "admin") {
    next(new ErrorResponse(`You are not an admin`, 400));
  }
  return next();
});
