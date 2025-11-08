const asyncHandler = require("../middlewares/asyncHandler");
const { addAction } = require("../services/section");
const Action = require("../models/Action");
const ErrorResponse = require("../utils/errorResponse");

// POST - Add Action
exports.addAction = asyncHandler(async (req, res, next) => {
  const result = await addAction(req, res, next);
  res.status(200).json({
    success: true,
    message: "Action added successfully",
    data: result
  });
});

// GET - Single Action by ID
exports.getAction = asyncHandler(async (req, res, next) => {
  const action = await Action.findById(req.params.id).populate('role');
  if (!action) return next(new ErrorResponse("Action not found", 404));

  res.status(200).json({
    success: true,
    data: action
  });
});

// GET - All Actions (admin view)
exports.getActions = asyncHandler(async (req, res, next) => {
  const actions = await Action.find().populate('role');
  res.status(200).json({
    success: true,
    count: actions.length,
    data: actions
  });
});

// ✅ NEW: GET - All Actions under a specific Role
exports.getActionsByRole = asyncHandler(async (req, res, next) => {
  const actions = await Action.find({ role: req.params.roleId }).populate('role');
  if (!actions || actions.length === 0)
    return next(new ErrorResponse("No actions found for this role", 404));

  res.status(200).json({
    success: true,
    count: actions.length,
    data: actions
  });
});

// PUT - Update Action
exports.updateAction = asyncHandler(async (req, res, next) => {
  const updated = await Action.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!updated) return next(new ErrorResponse("Action not found", 404));

  res.status(200).json({
    success: true,
    message: "Action updated successfully",
    data: updated
  });
});

// DELETE - Remove Action
exports.deleteAction = asyncHandler(async (req, res, next) => {
  const deleted = await Action.findByIdAndDelete(req.params.id);
  if (!deleted) return next(new ErrorResponse("Action not found", 404));

  res.status(200).json({
    success: true,
    message: "Action deleted successfully"
  });
});
