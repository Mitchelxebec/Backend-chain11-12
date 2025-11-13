const User = require('../../models/User');
const Role = require('../../models/Role');
const Action = require('../../models/Action');

const ErrorResponse = require('../../utils/errorResponse');

const removeActionfromUser = async (req, res, next)=>{
    try{
        const {userId, actionId}= req.body;
        const user = await User.findById(userId);
        if(!user){
            throw new ErrorResponse('user not found', 400);
        }
        const action = await Action.findById(actionId);
        if(!action){
            throw new ErrorResponse('Action not found',400);
        }
        const role = await Role.findById(action.role);
        if(!role){
            throw new ErrorResponse('Role not found',400);
        }
        if(!user.actions || !user.actions.includes(actionId)){
            throw new ErrorResponse('User does not have this action');
        }

        user.actions = user.actions.filter((id)=>id.toString() !== actionId);
        await user.save();

        return {
            message: `Action ${action.name} of a Role ${role.name} was removed from user ${user.firstname} succesfully`,
            data: user
        };
    }catch (error) {
        console.log(error);
        throw new ErrorResponse(`Server error: ${error}`, 500);
    }
}
module.exports= removeActionfromUser;