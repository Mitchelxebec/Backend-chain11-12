const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_SERVER,
    port: Number(process.env.MAIL_PORT),
    secure: process.env.MAIL_SECURE === 'true',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const message = {
    from: `Developer <akpe@venireapp.com>`,
    to: options.email,
    subject: options.subject,
    html: options.html,
    text: options.text,
  };
console.log("🧠 Received options:", options);

  const info = await transporter.sendMail(message);

  console.log("Message sent: %s", info.messageId);
};


module.exports = sendEmail;
