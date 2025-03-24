const express = require('express');
const { getAllUsers,ofuser,messag } = require('../controllers/chatController'); // Import controller
const authenticate = require('../middleware/authMiddleware'); // Import authentication middleware
const tokenverify = require('../middleware/tokenverify')
const router = express.Router();

// // Middleware to log incoming requests
// router.use((req, res, next) => {
//    // console.log(`Incoming request: ${req.method} ${req.url}`);
//   //  console.log('Request Body:', req.body);
//     next();
// });

// Route to fetch all users using the controller function
router.post('/allusers',authenticate,getAllUsers);
router.post('/ofuser',authenticate,ofuser);
router.post('/messages',messag);
module.exports = router;
