const User = require("../../models/User");
const ErrorResponse = require("../../utils/errorResponse");

const deleteUser = async (req, res, next) => {
    const { userId } = req.body;

    const checkUser = await User.findById(userId);
    if (!checkUser){
        throw new ErrorResponse(`Users not found`, 400);
    }
    await User.findByIdAndDelete({_id: userId});
    const metaData = {}
    const data = {}
    return {
        data,
        metaData
    }
}


module.exports = deleteUser;