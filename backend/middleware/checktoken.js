const jwt = require('jsonwebtoken');

// Authentication Middleware
const checktoken = (req, res, next) => {
  // Extract token from cookies
  const token = req.cookies.token; 

  console.log("Auth middleware called. Token:", token);

  // Check if token is missing
  if (!token) {
    return res.status(401).json({ message: "Unauthorized - No token found" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    //console.log("DDDD",decoded);
    // Attach decoded user info to request

    return res.status(200).json({ message: "authorized" });
    // Proceed to the next middleware/controller
    
  } catch (error) {
   // console.error("Token verification failed:", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = checktoken;
