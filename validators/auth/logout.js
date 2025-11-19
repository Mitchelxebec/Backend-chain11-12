const joi = require("joi");
const ErrorResponse = require("../../utils/errorResponse");

const logoutSchema = joi.object({
  id: joi.string().length(24).hex().required(),
});

const validateLogoutObj = async (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return next(
      new ErrorResponse("Request body is empty or doesn't exist", 400)
    );
  }

  try {
    const validated = await logoutSchema.validateAsync(req.body);
    req.body = validated;
    return next();
  } catch (error) {
    return next(
      new ErrorResponse(`Logout Validation Error: ${error.message}`, 400)
    );
  }
};

module.exports = validateLogoutObj;
