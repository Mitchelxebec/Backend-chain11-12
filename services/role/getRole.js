const ErrorResponse = require('../../utils/errorResponse');
const Role = require('../../models/Role');


const getRole = async (req, res, next) => {
    try {
        const {  roleId } = req.query;

        // Check if role  exists
        const role = await Role.findById(roleId);
        if (!role) {
            throw new ErrorResponse('Role deos not exist', 400);
        }

        return role;

    } catch (error) {
        console.error('Error creating role:', error);
        throw new ErrorResponse(`Server error: ${error}`, 500);
    }
};


module.exports = getRole;