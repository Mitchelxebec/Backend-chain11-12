const ErrorResponse = require('../../utils/errorResponse');
const Action = require('../../models/Action');

const addAction = async (req, res, next) => {
  try {
    const { service, name, role } = req.body;

    // Check if action already exists
    const existingAction = await Action.findOne({ name });
    if (existingAction) {
      throw new ErrorResponse('Action already exists', 400);
    }

    const newAction = new Action({ service, name, role });
    const savedAction = await newAction.save();

    return savedAction;
  } catch (error) {
    console.error('Error creating action:', error);
    throw new ErrorResponse(`Server error: ${error.message}`, 500);
  }
};

module.exports = addAction;
