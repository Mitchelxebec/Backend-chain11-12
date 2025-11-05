const ErrorResponse = require('../../utils/errorResponse');
const Role = require('../../models/Role');


const addRole = async (req, res, next) => {
    try {
        const { name } = req.body;

        // Check if role already exists
        const existingRole = await Role.findOne({ name });
        if (existingRole) {
            throw new ErrorResponse('Role already exists', 400);
        }

        // Create and save new role
        const newRole = new Role({ name });
        const savedRole = await newRole.save();

        return savedRole;
    } catch (error) {
        console.error('Error creating role:', error);
        throw new ErrorResponse(`Server error: ${error}`, 500);
    }
};


module.exports = addRole;