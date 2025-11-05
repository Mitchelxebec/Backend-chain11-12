const Joi = require("joi");
const ErrorResponse = require("../../utils/errorResponse");

const getRoleSchema = Joi.object({
    roleId: Joi.string().required()
})

const validateGetRole = async (req, res, next) => {
    try{
        if(!req.query || Object.keys(req.query).length === 0){
            return next(new ErrorResponse(`Query params is empty`, 400));
        }
        const value = await getRoleSchema.validateAsync(req.query);
        req.query = value;
        next();
    }catch(err) {
        return next(new ErrorResponse(`Role Addition Error: ${err}`, 500));
    }
}

module.exports = validateGetRole;