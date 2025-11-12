const User = require("../../models/User");
const ErrorResponse = require("../../utils/errorResponse");

const logout = async (req, res, next) => {
  try {
    const { _id } = req.body;

    const user = await User.findById(_id);
    if (!user) {
      return next(new ErrorResponse("User not found", 404));
    }

    // Optional: reset verification if needed
    // user.isVerified = false;

    user.lastLogout = Date.now();
    await user.save();

    return {
      message: "User logged out successfully",
    };
  } catch (error) {
    return next(new ErrorResponse(`Logout failed: ${error.message}`, 500));
  }
};

module.exports = logout;
