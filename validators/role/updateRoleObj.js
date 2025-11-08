const Joi = require("joi");
const ErrorResponse = require("../../utils/errorResponse");

const updateRoleSchema = Joi.object({
    roleId: Joi.string().required(),
    newName: Joi.string().required()
})

const validateUpdateRole = async (req, res, next) => {
    try{
        if(!req.body || Object.keys(req.body).length === 0){
            return next(new ErrorResponse(`Request body is empty`, 400));
        }
        const value = await updateRoleSchema.validateAsync(req.body);
        req.body = value;
        next();
    }catch(err) {
        return next(new ErrorResponse(`Role Update Error: ${err}`, 500));
    }
}

module.exports = validateUpdateRole;