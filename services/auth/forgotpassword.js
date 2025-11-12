const bcrypt = require('bcrypt')
const User = require('../../models/User');
const ErrorResponse = require('../../utils/errorResponse');


 const resetPassword = async (req, res, next)=>{
    try{
    const {email, Password, confirmPassword}= req.body;
    const user = await User.findOne({email});
    if(!user){
        throw new ErrorResponse(`user not found`,400);
    }
    if(Password !== confirmPassword){
        throw new ErrorResponse(`password do not match`,400);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(Password, salt);
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