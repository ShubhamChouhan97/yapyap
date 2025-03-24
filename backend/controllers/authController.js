const User = require("../models/User");
const mongoose = require('mongoose');
const Message = require("../models/Messages"); // Ensure correct path
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config(); // Ensure environment variables are loaded
const generateToken = require("./tokenController");
const { verifyaccount } = require('../utils/verifyaccount.js')
const { sendResetEmail } = require('../utils/sendEmail.js');
// const { error } = require("console");
// register route
exports.register = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
      return res.status(400).json({ message: "Username, email, and password are required" });
    }

     const existingUser = await User.findOne({ email }).lean();
    // if (existingUser) {
    //    existingUser.accountstatus =  "active";
    //   return res.status(400).json({ message: "User already exists or activated" });
    // }

    if (existingUser) {
      if (existingUser.accountstatus === "inactive") {
     
        const token = generateToken(existingUser);
        const resetLink = `${process.env.CLIENT_URL}/verify/${token}`;
        try{
          await verifyaccount(existingUser,resetLink);
        }catch(err){
          console.log(err);
        }
        return res.status(200).json({ message: "Acctivation Link share Succefully " });
      }
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUsers = await User.find().select("_id contacts").lean();

    const newUser = new User({
      accountstatus:"inactive",
      userName,
      email,
      password: hashedPassword,
      contacts: [],
    });

    await newUser.save(); // Save the new user first to get the _id

    // Create contact objects with the correct room IDs for the new user and update existing users
    let bulkUpdates = [];

    for (const existingUser of existingUsers) {
   // Generate a unique room ID for this pair

      // Add this contact to the new user's contacts list
      newUser.contacts.push({
        contactpersonid: existingUser._id,
        unreadCount: 0,
        lastChatTime: Date.now(),
        lastMessage: "Start chat",
      });

      // Update the existing user's contacts list with the new user
      bulkUpdates.push({
        updateOne: {
          filter: { _id: existingUser._id },
          update: {
            $push: {
              contacts: {
                contactpersonid: newUser._id,
                unreadCount: 0,
                lastChatTime: Date.now(),
                lastMessage: "Start chat",
              },
            },
          },
        },
      });
    }

    // Save the updated newUser contacts
    await newUser.save();
     
    // Perform bulk update to add new user to existing users' contact lists
    if (bulkUpdates.length > 0) {
      await User.bulkWrite(bulkUpdates);
    }
    const token = generateToken(newUser);

    const resetLink = `${process.env.CLIENT_URL}/verify/${token}`;
    try{
      await verifyaccount(newUser,resetLink);
    }catch(err){
      console.log(err);
    }

    res.status(201).json({ message: "User registered successfully,Check you Mail for Account Activate", userId: newUser._id });
  } catch (error) {
    console.error("❌ Register Error:", error);
    res.status(500).json({ message: "Error registering user", error: error.message });
  }
};


// Login User
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    if(user.accountstatus == "inactive")
    {
      return res.status(400).json({ message: "Account Not found or Not Acctivate Activate Through Mail Recived !" });
    }
     //console.log(user)
   

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 3600000,
    });

    // Convert Mongoose document to a plain object and exclude the password
    const userObject = user.toObject();
    delete userObject.password;
   

    res.json({ message: "Logged in successfully", token, user: userObject });
  } catch (error) {
    console.error("❌ Login Error:", error);
    res.status(500).json({ message: "Error logging in" });
  }
};

// Logout User
exports.logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
};

// Authentication Middleware
const authenticate = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// Protected Route Example
exports.getProtectedData = [authenticate, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
}];

// details


exports.detail = async (req, res) => {
    try {
        // Extract token from cookies
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        // Decode the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded || !decoded.email) {
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }

        const email = decoded.email;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Convert user to object and remove sensitive fields
        const userObject = user.toObject();
        delete userObject.password;
        delete userObject._id;

        res.json(userObject);
    } catch (error) {
        console.error("Error in detail function:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
// idget 
exports.idget = async (req, res) => {
  try {
    // Extract token from cookies
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
      }
      // Decode the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!decoded || !decoded.email) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }
        const email = decoded.email;
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(404).json({ message: "User not found" });
          }
          
          res.json(user._id);
          // res.json(userObject);
          } catch (error) {
            console.error("Error in idget function:", error);
            return res.status(500).json({ message: "Internal server error" });
            }
            
            
          };

// update 

exports.updatedata = async (req, res) => {
  try {
      const { email, userName, about, dp } = req.body;

      if (!email) {
          return res.status(400).json({ success: false, message: "Email is required!" });
      }

      // Find user by email and update fields dynamically
      const updatedUser = await User.findOneAndUpdate(
          { email },
          { $set: { userName, about, dp } },
          { new: true, runValidators: true }
      );

      if (!updatedUser) {
          return res.status(404).json({ success: false, message: "User not found!" });
      }

      res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
      console.error("Error updating user data:", error);
      res.status(500).json({ success: false, message: "Server error!" });
  }
};

// Server-side: Express route to handle account deletion
// Server-side: Express route to handle account deletion
exports.DeleteAccount = async (req, res) => {
  const userId = req.body.id;
  const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
      }
      // Decode the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!decoded || !decoded.email) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }

  // Check if the userId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  // console.log("User ID:", userId);

  try {
    // Attempt to delete the user by ID using the async/await pattern
   // const data = await User.findByIdAndDelete(userId);
     const userdelete = await User.findById(userId);
    
   
    // Check if the user was found and deleted
    if (!userdelete) {
      return res.status(404).json({ message: "User not found" });
    }
    userdelete.accountstatus = "inactive";
    userdelete.save();
    // Successfully deleted the user
    res.json({ message: "Account deleted successfully" });
  } catch (err) {
    // Catch any errors that occur during the operation
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// forgot pass 
exports.forgotpass = async (req, res) => {
  const email = req.body.email;
 //console.log("ssssss",email);
try {
  const user = await User.findOne({ email });
  //console.log("user",user);
  if (!user) return res.status(404).json({ message: 'User not found' });

   const name = user.userName;
  const token = generateToken(user);
  //console.log("gen",token);
  const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`;
//console.log("restet",resetLink);
try{
  await sendResetEmail(email, resetLink,name);
}catch(err){
  console.log(err);
}
 
  res.status(200).json({ message: 'Password reset email sent!' });
} catch (error) {
  res.status(500).json({ message: 'Server error' });
}
}

// verify token for forgat password

exports.verifytoken = async (req, res) => {
 const { token } = req.query;
   // console.log("tokjen",token);
   try {
     // Verify the token using the JWT_SECRET
     const decoded = jwt.verify(token, process.env.JWT_SECRET);
     // If the token is valid and has not expired, send a success message
     res.status(200).json({ message: 'Link Verified' });
 
   } catch (error) {
    // Check if the error is due to token expiration
     if (error.name === 'TokenExpiredError') {
       return res.status(400).json({ message: "Link has expired" });
     } 
     // General error handler for other JWT-related issues
     return res.status(400).json({ message: "Invalid Link" });
   }
}