const User = require('../../models/User');
const Role = require('../../models/Role');
const Action = require('../../models/Action');

const ErrorResponse = require('../../utils/errorResponse');

const addActionToUser = async (req, res, next)=>{
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
        if(user.actions && user.actions.includes(actionId)){
            throw new ErrorResponse('User already has this action');
        }
        user.actions = user.actions?[...user.actions, actionId]:[actionId];
        await user.save();
        return{
            message:`Action ${action.name} of Role ${role.name} was added to user ${user.firstname} succesfully`,
            date: user
        };
    }catch (error) {
        throw new ErrorResponse(`Server error: ${error}`, 500);
    }
}
module.exports= addActionToUser;