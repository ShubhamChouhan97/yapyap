
const nodemailer = require('nodemailer');
require('dotenv').config();

const verifyaccount = async function ( newUser ,resetLink){
    email=newUser.email;
    namee=newUser.userName;
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
    subject: 'Account Verify Request',
    text: 'Hello,',
    html: `<h1>Hello ${namee},</h1>
      <p>We received a request to Verify your YapYup account. Use the link below for Account Verification :</p>
      <p>Click <a href="${resetLink}">here</a> to Verify.</p>

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

module.exports = { verifyaccount };
