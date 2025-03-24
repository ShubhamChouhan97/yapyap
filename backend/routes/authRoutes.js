
const express = require('express');
const { register, login, logout, getProtectedData, detail, updatedata,idget,DeleteAccount,forgotpass,verifytoken } = require('../controllers/authController');
const authenticate = require('../middleware/authMiddleware'); // Import authentication middleware
const tokenverify = require('../middleware/tokenverify')
const {resetPassword} = require('../utils/restpassword');
const  checktoken  = require('../middleware/checktoken')//const { console } = require('inspector');
const {activeaccount} = require('../utils/activeaccount');
const router = express.Router();

// router.use((req, res, next) => {
//   const { method, url } = req;
//   const logMessage = `Incoming request: ${method} ${url}`;
//   console.log(logMessage);
//   next();
// });

// // Public Routes
router.get('/checktoken',checktoken)
router.post('/authenticate', tokenverify);
router.post('/register', register);
router.post('/login', login);
router.post('/logout',authenticate,logout);
// router.post('/reset-password',resetPassword);
router.post('/resetpassword', resetPassword);

router.get("/verifyresettoken",verifytoken);
router.post("/activeaccount",activeaccount);
router.post('/forgotpass',forgotpass);
// Protected Routes (Require Authentication)
router.post('/delete',authenticate,DeleteAccount );
router.post('/idget',authenticate,idget)
router.get('/protected', authenticate, getProtectedData);
router.post('/detail', authenticate, detail);  
router.post('/update', authenticate, updatedata); 

module.exports = router;
