const Role = require("../../models/Role");
const ErrorResponse = require("../../utils/errorResponse");

const getRoles = async (req, res, next) => {
    const { limit = 10, page=1 } = req.query;


    const skip = Number(limit) * (Number(page) - 1);

    const role = await Role.find().skip(skip).limit(Number(limit));
    const countRole = await Role.countDocuments();

    if (!role){
        throw new ErrorResponse(`Roles not found`, 400);
    }
    
    const metaData = {
        totalItems: countRole,
        limit: Number(limit),
        pages: Math.ceil(countRole/limit),
        currentPage: Number(page)
    }

    return {
        data: role,
        metaData
    }
}

module.exports = getRoles;