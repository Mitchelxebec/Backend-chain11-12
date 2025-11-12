const User = require('../../models/User');
const Role = require('../../models/Role');
const ErrorResponse = require('../../utils/errorResponse');

const removeRolefromUser = async (req, res, next)=>{
    try{
    const {userId, roleId}= req.body;
    const user = await User.findById(userId);
    if(!user){
        throw new ErrorResponse('user not found', 400);
    }
    const role = await Role.findById(roleId);
    if(!role){
        throw new ErrorResponse('Role not found',400);
    }
    if(!user.roles || !user.roles.includes(roleId)){
        throw new ErrorResponse('User does not have this role');
    }
    user.roles = user.roles.filter((id)=>id.toString() !==roleId);
    await user.save();
    return{
        message:`Role ${role.name} removed from user ${user.firstname} succesfully`
    };
}catch (error) {
        throw new ErrorResponse(`Server error: ${error}`, 500);
    }
}
module.exports= removeRolefromUser;