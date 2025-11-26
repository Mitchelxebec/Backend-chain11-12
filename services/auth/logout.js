const User = require("../../models/User");
const Token = require("../../models/Token");
const ErrorResponse = require("../../utils/errorResponse");

const logout = async (req, res, next) => {
  try {
    // ✅ Get user ID from req.user
    const userId = req.user._id;

    // 1. Find the user
    const user = await User.findById(userId);
    if (!user) {
      throw new ErrorResponse("User not found", 404);
    }

    // 2. Delete ALL tokens for this user
    await Token.deleteMany({ userId: userId });

    // Optional: reset verification if needed
    // user.isVerified = false;

    // 3. Update lastLogout timestamp
    user.lastLogout = Date.now();
    await user.save();

    // 4. Return response
    return {
      message: "User logged out from all devices successfully",
      lastLogout: user.lastLogout,
    };
  } catch (error) {
    return next(new ErrorResponse(`Logout failed: ${error.message}`, 500));
  }
};

module.exports = logout;
