const ErrorResponse = require('../../utils/errorResponse');
const Role = require('../../models/Role');


const deleteRole = async (req, res, next) => {

    try {
        const { roleId } = req.body;

        // Check if role exists
        const existingRole = await Role.findById(roleId);
        if (!existingRole){
            throw new ErrorResponse(`Role not found`, 400);
        }

        await Role.findByIdAndDelete({_id: roleId});
        const metaData = {}
        const data = {}

        return {
            data,
            metaData
        }
    } catch (error) {
        console.error('Error deleting role:', error);
        throw new ErrorResponse(`Server error: ${error}`, 500);
    }
};


module.exports = deleteRole;