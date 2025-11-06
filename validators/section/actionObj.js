const Joi = require("joi");
const ErrorResponse = require("../../utils/errorResponse");

const addActionSchema = Joi.object({
  service: Joi.string().required(),
  name: Joi.string().required(),
  role: Joi.string().required()
});

const validateAddAction = async (req, res, next) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return next(new ErrorResponse("Request body is empty", 400));
    }
    const value = await addActionSchema.validateAsync(req.body);
    req.body = value;
    next();
  } catch (err) {
    return next(new ErrorResponse(`Action Addition Error: ${err}`, 500));
  }
};

module.exports =  validateAddAction ;
