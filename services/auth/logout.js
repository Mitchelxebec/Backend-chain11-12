const User = require("../../models/User");
const Token = require("../../models/Token");
const ErrorResponse = require("../../utils/errorResponse");

const logout = async (req, res, next) => {
  try {
    const { id } = req.body;

    // 1. Find the user
    const user = await User.findById(id);
    if (!user) {
      throw new ErrorResponse("User not found", 404);
    }

    // 2. Delete ALL tokens for this user
    await Token.deleteMany({ userId: id });

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
