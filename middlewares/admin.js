const moment = require("moment/moment");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("./asyncHandler");
const jwt = require('jsonwebtoken');
const User = require("../models/User");

exports.protect = asyncHandler(async (req, res, next) => {
    try {
        const headers = req.headers.authorization
        if(!headers){
            next(new ErrorResponse(`Provide the bearer token`, 400));
        }
        const token = headers.split(" ")[1];
        var decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');

        
        const user = await User.findOne({email: decoded.email})
        if(!user){
            next(new ErrorResponse(`User not found`, 400));
        }
        req.user = user
        return next();
    }catch(error){
        next(new ErrorResponse(`Authorization error: ${error}`, 400));
    }
})

exports.verified = asyncHandler(async (req, res, next) => {
    const user = req.user
    if(!user.isVerified || user.isVerified === false){
        next(new ErrorResponse(`Verify your account`, 400));
    }
    return next()
});

exports.isAdmin = asyncHandler(async (req, res, next) => {
    const userRole = req.user.role;
    if(userRole !== 'admin'){
        next(new ErrorResponse(`You are not an admin`, 400));
    }
    return next();
})




