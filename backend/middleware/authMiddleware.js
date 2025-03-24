// const jwt = require('jsonwebtoken');

// // Authentication Middleware
// const authenticate = (req, res, next) => {
//     const token = req.cookies.token; // Extract token from cookies
//     console.log("auth call at tokken middleware");
//     if (!token) {
//       return res.status(401).json({ message: "Unauthorized" }); // No token found
//     }
  
//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
//       req.user = decoded; // Attach decoded user info to request
//       next(); // Proceed to the next middleware/controller
//     } catch (error) {
//       return res.status(401).json({ message: "Invalid token" }); // Token verification failed
//     }
//   };
  
//   module.exports = authenticate;
const jwt = require('jsonwebtoken');

// Authentication Middleware
const authenticate = (req, res, next) => {
  // Extract token from cookies
  const token = req.cookies.token; 
  const email = req.body.user;
  //console.log("Auth middleware called. Token:", token);
console.log("email",email);
  // Check if token is missing
  if (!token) {
    return res.status(401).json({ message: "Unauthorized - No token found" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    //console.log("DDDD",decoded);
    // Attach decoded user info to reques
    // Proceed to the next middleware/controller
    if(email===decoded.email)
    {
      next();
    }
     
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
};

module.exports = authenticate;
