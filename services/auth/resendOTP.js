const User = require("../../models/User");
const ErrorResponse = require("../../utils/errorResponse");
let referralCodeGenerator = require("referral-code-generator");
const randomize = require('randomatic');
const crypto = require("crypto");
const sendEmail = require("../../utils/sendEmail");

const resendOTP = async (req, res, next) => {

    const user = await User.findOne({email: req.body.email});
    if(!user){
        throw new ErrorResponse(`Email does not exist : ${req.body.email}`, 400);
    }

    const otp = randomize("0", 6);
    
    const converted = crypto.createHash('sha256').update(otp).digest('hex');

   user.verificationCode = converted
   user.verificationExpire = Date.now() + 1000 * 60 * 15, // must be verified within 15 minutes
   await user.save();

    const message = `Welcome to our business.\nPlease verify you email.\nYour One Time Password is: <span>${otp}</span>.`

    await sendEmail({email: user.email, subject: "Registration Verification", text: '', html: message});

    return {
        "data": {otp, converted},
        "metaData": {}
    }
}

module.exports = resendOTP