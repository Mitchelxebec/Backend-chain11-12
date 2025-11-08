const Joi = require("joi");
const ErrorResponse = require("../../utils/errorResponse");

const deleteRoleSchema = Joi.object({
    roleId: Joi.string().required()
})

const validateDeleteRole = async (req, res, next) => {
    try{
        if(!req.body || Object.keys(req.body).length === 0){
            return next(new ErrorResponse(`Request body is empty`, 400));
        }
        const value = await deleteRoleSchema.validateAsync(req.body);
        req.body = value;
        next();
    }catch(err) {
        return next(new ErrorResponse(`Role Delete Error: ${err}`, 500));
    }
}

module.exports = validateDeleteRole;