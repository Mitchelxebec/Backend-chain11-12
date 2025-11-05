const asyncHandler = require("../middlewares/asyncHandler");
const { 
    addRole,
    updateRole,
    deleteRole
} = require("../services/role");

exports.addRole = asyncHandler(async (req, res, next) => {
    const result = await addRole(req, res, next);
    res.status(200).json({
        "success": true,
        "message": "Role added Successful",
        "data": result
    })
});


exports.updateRole = asyncHandler(async (req, res, next) => {
    const result = await updateRole(req, res, next);
    res.status(200).json({
        "success": true,
        "message": "Role updated successful",
        "data": result
    });
});


exports.deleteRole = asyncHandler(async (req, res, next) => {
    const result = await deleteRole(req, res, next);
    res.status(200).json({
        "success": true,
        "message": "Role deleted successful",
        "data": result
    });
});
