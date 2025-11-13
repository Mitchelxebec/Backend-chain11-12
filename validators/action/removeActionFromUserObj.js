const joi = require('joi');
const ErrorResponse = require('../../utils/errorResponse');

const removeActionschema =joi.object({
    userId: joi.string().required(),
    actionId: joi.string().required()
});

const validateRemoveActiontoUser = async (req, res, next)=>{
   try{
        if(!req.body || Object.keys(req.body).length === 0){
            return next(new ErrorResponse(`Request body is empty`, 400));
        }
        const value = await removeActionschema.validateAsync(req.body);
        req.body = value;
        next();
   }catch(err){
    return next(new ErrorResponse(`something went wrong: ${err}`, 500));
   }
}
module.exports= validateRemoveActiontoUser