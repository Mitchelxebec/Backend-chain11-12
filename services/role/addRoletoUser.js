const User = require('../../models/User');
const Role = require('../../models/Role');
const ErrorResponse = require('../../utils/errorResponse');

const addRoleToUser = async (req, res, next)=>{
    try{
    const {userID, RoleID}= req.body;
    const user = await User.findById(userID);
    if(!user){
        throw new ErrorResponse('user not found', 400);
    }
    const role = await Role.findById(RoleID);
    if(!role){
        throw new ErrorResponse('Role not found',400);
    }
    if(user.roles && user.roles.includes(RoleID)){
        throw new ErrorResponse('User already has this role');
    }
    user.roles = user.roles?[...user.roles, RoleID]:[RoleID];
    await user.save();
    return{
        message:`Role ${role.name} added to user ${user.firstname} succesfully`
    };
}catch (error) {
        throw new ErrorResponse(`Server error: ${error}`, 500);
    }
}
module.exports= addRoleToUser;