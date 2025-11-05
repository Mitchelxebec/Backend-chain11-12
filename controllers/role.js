const asyncHandler = require("../middlewares/asyncHandler");
const { 
    addRole,
    getRole,
    getRoles,
} = require("../services/role");

exports.addRole = asyncHandler(async (req, res, next) => {
    const result = await addRole(req, res, next);
    res.status(200).json({
        "success": true,
        "message": "Role added Successful",
        "data": result
    })
});

exports.getRole = asyncHandler(async (req, res, next) => {
    const result = await getRole(req, res, next);
    res.status(200).json({
        "success": true,
        "message": "Roles",
        "data": result
    })
});

exports.getRoles = asyncHandler(async (req, res, next) => {
    const result = await getRoles(req, res, next);
    res.status(200).json({
        "success": true,
        "message": "Roles",
        "data": result
    })
});
