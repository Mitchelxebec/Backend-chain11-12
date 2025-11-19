const bcrypt = require('bcrypt')
const User = require('../../models/User');
const ErrorResponse = require('../../utils/errorResponse');
const crypto = require("crypto");

 const resetPassword = async (req, res, next)=>{
    try{
    const {token, password, confirmPassword}= req.body;
     const updatedToken = crypto.createHash('sha256').update(token).digest('hex');
     const user = await User.findOne({
            verificationCode: updatedToken,
            verificationExpire: { $gt: Date.now() }
        })

    if(!user){
        throw new ErrorResponse(`invalid token`,400);
    }
    if(password !== confirmPassword){
        throw new ErrorResponse(`password do not match`,400);
    }
    user.verificationCode = undefined;
    user.verificationExpire = undefined;
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);
    user.password = hashedpassword;
    await user.save();
    return{
        'message': 'password reset succesfully',
       'metadata': {}
    }
 }catch (err){
    throw new ErrorResponse(`Error please try again ${err}`,400)
 }
}
module.exports = resetPassword