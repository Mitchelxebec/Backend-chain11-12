const ErrorResponse = require('../../utils/errorResponse');
const Action = require('../../models/Action');

const updateAction = async (req, res, next) => {
  try {
    const { service, name, role } = req.body;
    if(service==' ' || name ==' '|| role ==' '){
        throw new ErrorResponse(`update field is empty`,400)
    }
    const updated = await Action.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!updated) return next(new ErrorResponse("Action not found", 404));

  return updated;

  } catch (error) {
    throw new ErrorResponse(`Server error: ${error.message}`, 500);
  }
};

module.exports = updateAction;
