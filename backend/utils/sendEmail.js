
const nodemailer = require('nodemailer');
require('dotenv').config();

const sendResetEmail = async function (email, resetLink,name){
  const transporter = nodemailer.createTransport({
    service: 'gmail',  // Gmail service
    auth: {
      user: process.env.EMAIL_USER,  // Your Gmail address
      pass: process.env.EMAIL_PASS,  // Your Gmail password or app-specific password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,  // Sender's email (should be the same as the 'user' above)
    to: email,
    subject: 'Password Reset Request',
    text: 'Hello,',
    html: `<h1>Hello ${name},</h1>
      <p>We received a request to reset your password for your YapYup account. Use the link below to reset your password:</p>
      <p>Click <a href="${resetLink}">here</a> to reset your password.</p>

      <p>Note: This link is valid for only 1 hour.
      For security reasons, never share this link with anyone.
      <br><br>
      Best Regards,<br>
      YapYup Support Team</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    //console.log('Password reset email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = { sendResetEmail };
