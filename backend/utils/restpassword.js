const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const usedTokens = new Set(); 
// const resetPassword = async (req, res) => {
//     const  token  = req.body.token;
//     const  password  = req.body.password;

//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       // console.log(decoded);
//       const id = decoded.id;
//       console.log("id",id);
//       const user = await User.findByPk(id);
//       console.log("user",user);
//       if (!user) return res.status(404).json({ message: 'User not found' });
  
//       // const hashedPassword = await bcrypt.hash(password, 10);
//       // user.password = hashedPassword;
//       // await user.save();
  
//       res.status(200).json({ message: 'Password reset successful!' });
//     } catch (error) {
//      // res.status(400).json({ message: 'Invalid or expired token' });
//     }
//   };

const resetPassword = async (req, res) => {
  const token = req.body.token;
  const password = req.body.password;

  try {
    // Verify the JWT token
    // Verify and Invalidate Token

  if (usedTokens.has(token)) {
     return res.status(400).json({ message: 'Link is already used' });
  }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const id = decoded.id;
    console.log("id",id);
console.log("paas",password);
    // Find the user by ID
   const user = await User.findById(id);
     console.log("user",user);
    // If the user is not found, return a 404 error
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

//    Update the user's password
    user.password = hashedPassword;
    await user.save();
    // Add token to blacklist after use
    usedTokens.add(token);

    // Respond with success message
    res.status(200).json({ message: 'Password reset successful!' });
  } catch (error) {
    // If there's an error with the token or something else
    res.status(400).json({ message: 'Invalid or expired token' });
  }
};

  module.exports = { resetPassword };