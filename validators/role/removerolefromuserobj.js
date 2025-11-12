const joi = require('joi');
const ErrorResponse = require('../../utils/errorResponse');

const removeroleschema =joi.object({
    userId: joi.string().required(),
    roleId: joi.string().required()
});

const validateremoveRoletoUser = async (req, res, next)=>{
   try{
        if(!req.body || Object.keys(req.body).length === 0){
            return next(new ErrorResponse(`Request body is empty`, 400));
        }
        const value = await removeroleschema.validateAsync(req.body);
        req.body = value;
        next();
   }catch(err){
    return next(new ErrorResponse(`something went wrong: ${err}`, 500));
   }
}
module.exports= validateremoveRoletoUser