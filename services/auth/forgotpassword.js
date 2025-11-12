const User = require("../../models/User");
const ErrorResponse = require("../../utils/errorResponse");
const randomize = require('randomatic');
const crypto = require("crypto");
const sendEmail = require("../../utils/sendEmail");

const forgotpassword = async (req, res, next) => {

    const user = await User.findOne({email: req.body.email});
    if(!user){
        throw new ErrorResponse(`Email does not exist : ${req.body.email}`, 400);
    }

    const Otp = randomize("0", 6);
    
    const converted = crypto.createHash('sha256').update(Otp).digest('hex');

   user.verificationCode = converted
   user.verificationExpire = Date.now() + 1000 * 60 * 15, // must be verified within 15 minutes
   await user.save();

   

    const subject= '🔒 Reset Your  Password'
    const message= `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; background-color: #0f172a; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #1e293b 0%, #334155 100%); border-radius: 16px; overflow: hidden; }
          .header { background: linear-gradient(135deg, #ef4444 0%, #f97316 100%); padding: 40px 20px; text-align: center; }
          .header h1 { color: white; margin: 0; font-size: 32px; }
          .content { padding: 40px 30px; color: #e2e8f0; }
          .otp-box { background: #1e293b; border: 2px solid #ef4444; border-radius: 12px; padding: 30px; text-align: center; margin: 30px 0; }
          .otp { font-size: 48px; font-weight: bold; color: #ef4444; letter-spacing: 8px; }
          .warning { background: #7f1d1d; border-left: 4px solid #ef4444; padding: 15px; margin: 20px 0; border-radius: 4px; }
          .footer { padding: 20px; text-align: center; color: #64748b; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔒 Password Reset</h1>
          </div>
          <div class="content">
            <h2 style="color: #f1f5f9;">Hello, ${user.firstname}</h2>
            <p>We received a request to reset your  password.</p>
            
            <div class="otp-box">
              <p style="margin: 0 0 10px 0; color: #94a3b8;">Your password reset code:</p>
              <div class="otp">${Otp}</div>
              <p style="margin: 10px 0 0 0; color: #64748b; font-size: 14px;">This code expires in 10 minutes</p>
            </div>

            <p>Enter this code on the password reset page to create a new password.</p>
            
            <div class="warning">
              <p style="margin: 0; color: #fecaca; font-size: 14px;">
                ⚠️ If you didn't request this password reset, please ignore this email and ensure your account is secure.
              </p>
            </div>
          </div>
          <div class="footer">
            <p>© 2025 . All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `
    console.log("📨 Sending email to:", user.email);
console.log("📨 Options:", {
  email: user.email,
  subject,
  html: message
});
    await sendEmail({email:user.email, subject:subject, text: message, html: message});

    return {
        "data": {Otp, converted},
        "metaData": {}
    }
}

module.exports = forgotpassword