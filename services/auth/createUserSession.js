const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Token = require("../../models/Token");
const ErrorResponse = require("../../utils/errorResponse");

const createUserSession = async (user) => {
  try {
    // 1. Create raw JWT token
    const rawToken = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1d" }
    );

    // 2. Hash token before storing
    const hashedToken = await bcrypt.hash(rawToken, 10);

    // 3. Save hashed token to DB
    try {
      await Token.create({
        userId: user._id,
        hashedToken: hashedToken,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      });
    } catch (err) {
      console.error("Token creation failed:", err);
      throw new ErrorResponse(`Session Creation Error: ${err.message}`, 500);
    }

    // 4. Return raw token to client
    return {
      token: rawToken,
      metaData: {},
    };
  } catch (error) {
    console.error("createUserSession error:", error);
    throw new ErrorResponse(`Session Creation Error: ${error.message}`, 500);
  }
};

module.exports = createUserSession;
