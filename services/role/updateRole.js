const ErrorResponse = require('../../utils/errorResponse');
const Role = require('../../models/Role');


const updateRole = async (req, res, next) => {

    try {
        const { roleId, newName } = req.body;

        // Check if role exists
        const existingRole = await Role.findById(roleId);
        if (!existingRole){
            throw new ErrorResponse(`Role not found`, 400);
        }

        existingRole.name = newName;
        await existingRole.save();
        return existingRole;

    } catch (error) {
        console.error('Error updating role:', error);
        throw new ErrorResponse(`Server error: ${error}`, 500);
    }
};


module.exports = updateRole;