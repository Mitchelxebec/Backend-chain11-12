
const joi = require("joi");
const ErrorResponse = require("../../utils/errorResponse");


const forgotPasswordschema =  joi.object({
    email: joi.string().email().required()
});


const validateforgotpassword = async (req, res, next) => {
    if(!req.body || Object.keys(req.body).length === 0){
        return next(new ErrorResponse(`Request body is empty or does not exist`, 400));
    }
    try{
        const check = await forgotPasswordschema.validateAsync(req.body);
        req.body = check;
        return next();
    }catch(error){
        return next(new ErrorResponse(`forgot password Error: ${error.message}`, 400));
    }
}


module.exports = validateforgotpassword;
