const joi = require('joi');
const ErrorResponse = require('../../utils/errorResponse');

const passwordresetschema = joi.object({
    email : joi.string().required(),
    Password: joi.string().min(6).max(15).required(),
    confirmPassword: joi.string().required()

});

const ValidateResetPassword = async (req, res, next)=>{
   if(!req.body || Object.keys(req.body).length ===0 ){
    return next (new ErrorResponse(`Request body is empty `, 400))
   } 
   try{
    const reset = await passwordresetschema.validateAsync(req.body);
    req.body = reset;
    return next();
   }catch(error){
        return next(new ErrorResponse(`password reset error: ${error.message}`, 400));
    }
}

module.exports = ValidateResetPassword