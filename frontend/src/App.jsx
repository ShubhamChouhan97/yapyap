
// // import React, { useState, useEffect } from "react";
// // import "./App.css";
// // import Tolbar from "./container/Tolbar";
// // import Slidebar from "./container/Slidebar";
// // import Chatbox from "./container/Chatbox";
// // import Defchatbox from "./component/Defchatbox";
// // import Status from "./container/Status";
// // import Channels from "./container/Channels";
// // import Settingcon from "./container/Settingcon";
// // import Profile from "./container/Profile";
// // import Login from "./container/Login";
// // import Community from "./container/Community";
// // import { Idget } from "./API/idget"; 
// // import  { tokencheck } from './API/tokencheck';

// // import { io } from "socket.io-client";
// // const socket = io("http://localhost:3000");

// // function App() {
// // let i =0;
// //   const metaurl = "https://www.meta.ai/";
// //   const [isLoggedIn, setIsLoggedIn] = useState(checkAuth());
// //   const [showProfile, setProfile] = useState(false);
// //   const [showChannel, setChannel] = useState(false);
// //   const [showSidebar, setShowSidebar] = useState(true);
// //   const [showStatus, setShowStatus] = useState(false);
// //   const [selectedChat, setSelectedChat] = useState(null);
// //   const [showCommunity, setCommunity] = useState(false);
// //   const [showSetting, setSetting] = useState(false);
// // const [ reciverId, setreciverId] =useState(null);
// //   const [userId, setUserId] = useState(null);
// //   let cookieInterval;
// //    // Fetch current user ID
// //     useEffect(() => {
// //       const fetchData = async () => {
// //         try {
// //           const result = await Idget();
// //           setUserId(result);
// //         } catch (err) {
// //           console.error("Error fetching user ID:", err);
// //         }
// //       };
  
// //       fetchData();
// //     }, []);

// //   // Function to check authentication from localStorage and cookies
// //   function checkAuth() {
// //     const token = localStorage.getItem("token");
// //     const cookieToken = document.cookie.split("; ").find(row => row.startsWith("auth_token="));
// //     return !!token && !!cookieToken;
// //   }

  // useEffect(() => {
  //   const handleStorageChange = async () => {
  //     if (!checkAuth()) {
  //       setIsLoggedIn(false);
  //     }
  //   };
  //   window.addEventListener("storage", handleStorageChange);

  //   // Periodically check authentication to detect cookie changes
  //  cookieInterval = setInterval(async () => {
  //   const MyId = localStorage.getItem("userId");
  //     let data =  await tokencheck();
  //     if (data.message=="Unauthorized") {
  //       socket.emit("offline",{MyId});
  //       setIsLoggedIn(false);
  //       localStorage.clear();
  //       clearInterval(cookieInterval);
  //     }
  //     let auth = checkAuth();
  //     if (!auth) {
  //      socket.emit("offline",{MyId});
  //       setIsLoggedIn(false);
  //       clearInterval(cookieInterval);
  //     }
  //   }, 3000); // Check every 3 seconds

  //   return () => {
  //     window.removeEventListener("storage", handleStorageChange);
  //     clearInterval(cookieInterval);
  //   };
  // }, []);

// //   const handleLogin = (token) => {
// //     localStorage.setItem("token", token); // Save token
// //     document.cookie = "auth_token=" + token + "; path=/; Secure"; // Set authentication cookie
// //     setIsLoggedIn(true);
// //     setProfile(false);
// //     setSetting(false);
// //     setChannel(false);
// //     setCommunity(false);
// //     setShowSidebar(true);
// //     setShowStatus(false);
// //     setSelectedChat(null);
// //   };

// //   const handleLogout = () => {
// //     localStorage.removeItem("token"); // Remove token from storage

// //     // Delete authentication cookie
// //     document.cookie =
// //       "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; Secure";
      
// //     setIsLoggedIn(false); // Force re-render
// //   };

// //   const handleMetaAI = () => window.open(metaurl, "_blank");

// //   const handleProfile = () => {
// //     setProfile(true);
// //     setSetting(false);
// //     setShowSidebar(false);
// //     setShowStatus(false);
// //     setChannel(false);
// //     setCommunity(false);
// //     setSelectedChat(null);
// //   };

// //   const handleSettingClick = () => {
// //     setProfile(false);
// //     setSetting(true);
// //     setShowSidebar(false);
// //     setShowStatus(false);
// //     setChannel(false);
// //     setCommunity(false);
// //     setSelectedChat(null);
// //   };

// //   const handleCommunityClick = () => {
// //     setProfile(false);
// //     setSetting(false);
// //     setCommunity(true);
// //     setChannel(false);
// //     setShowSidebar(false);
// //     setShowStatus(false);
// //     setSelectedChat(null);
// //   };

// //   const handleChannelClick = () => {
// //     setProfile(false);
// //     setSetting(false);
// //     setChannel(true);
// //     setCommunity(false);
// //     setShowSidebar(false);
// //     setShowStatus(false);
// //     setSelectedChat(null);
// //   };

// //   const handleStatusClick = () => {
// //     setProfile(false);
// //     setSetting(false);
// //     setCommunity(false);
// //     setChannel(false);
// //     setShowSidebar(false);
// //     setShowStatus(true);
// //     setSelectedChat(null);
// //   };

// //   const handleChatClick = () => {
// //     setProfile(false);
// //     setSetting(false);
// //     setChannel(false);
// //     setCommunity(false);
// //     setShowSidebar(true);
// //     setShowStatus(false);
// //     setSelectedChat(null);
// //   };

// //   const handleChatSelection = (chat) => {
// //     setSelectedChat(chat);
// //    console.log("chhat:",chat);
// //     let person = chat._id;
// //     setreciverId(person);
// //   };

// //   if (!isLoggedIn) {
     
// //     return <Login onLogin={handleLogin} />;
// //   }
  
// //   return (
    
// //     <div className="app">
// //       <div className="app_body">
     
// //         <Tolbar
// //           onStatusClick={handleStatusClick}
// //           onChatClick={handleChatClick}
// //           onchannelclick={handleChannelClick}
// //           oncommunityclick={handleCommunityClick}
// //           onmetaclick={handleMetaAI}
// //           onsettingclick={handleSettingClick}
// //           onProfileClick={handleProfile}
// //           onLogout={handleLogout}
// //         />
// //         {showSidebar && <Slidebar onChatSelect={handleChatSelection} />}
// //         {showStatus && <Status />}
// //         {showChannel && <Channels />}
// //         {showCommunity && <Community />}
// //         {showSetting && <Settingcon userId={userId} />}
// //         {showProfile && <Profile/>}
// //         {selectedChat ? <Chatbox reciverId={reciverId} selectedChat={selectedChat}/> : <Defchatbox />}
// //       </div>
// //     </div>
// //   );
// // }

// // export default App;

// // march 19
// import React, { useState, useEffect } from "react";
// import "./App.css";
// import Tolbar from "./container/Tolbar";
// import Slidebar from "./container/Slidebar";
// import Chatbox from "./container/Chatbox";
// import Defchatbox from "./component/Defchatbox";
// import Status from "./container/Status";
// import Channels from "./container/Channels";
// import Settingcon from "./container/Settingcon";
// import Profile from "./container/Profile";
// import Community from "./container/Community";
// import Login from "./container/Login";

// import { Idget } from "./API/idget"; 
// import { tokencheck } from './API/tokencheck';
// import { io } from "socket.io-client";

// const socket = io("http://localhost:3000");

// function App() {
//   const metaurl = "https://www.meta.ai/";
//   const [showProfile, setProfile] = useState(false);
//   const [showChannel, setChannel] = useState(false);
//   const [showSidebar, setShowSidebar] = useState(true);
//   const [showStatus, setShowStatus] = useState(false);
//   const [selectedChat, setSelectedChat] = useState(null);
//   const [showCommunity, setCommunity] = useState(false);
//   const [showSetting, setSetting] = useState(false);
//   const [reciverId, setreciverId] = useState(null);
//   const [userId, setUserId] = useState(null);
//   const [isLoggedIn, setIsLoggedIn] = useState(checkAuth());

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const result = await Idget();
//         setUserId(result);
//       } catch (err) {
//         console.error("Error fetching user ID:", err);
//       }
//     };
//     fetchData();
//   }, []);

//   let cookieInterval;
//   // Function to check authentication from localStorage and cookies
//   function checkAuth() {
//     const token = localStorage.getItem("token");
//     const cookieToken = document.cookie.split("; ").find(row => row.startsWith("auth_token="));
//     return !!token && !!cookieToken;
//   }

//   useEffect(() => {
//     const handleStorageChange = async () => {
//       if (!checkAuth()) {
//         setIsLoggedIn(false);
//       }
//     };
//     window.addEventListener("storage", handleStorageChange);

//     // Periodically check authentication to detect cookie changes
//    cookieInterval = setInterval(async () => {
//     const MyId = localStorage.getItem("userId");
//       let data =  await tokencheck();
//       if (data.message=="Unauthorized") {
//         socket.emit("offline",{MyId});
//         setIsLoggedIn(false);
//         localStorage.clear();
//         clearInterval(cookieInterval);
//       }
//       let auth = checkAuth();
//       if (!auth) {
//        socket.emit("offline",{MyId});
//         setIsLoggedIn(false);
//         clearInterval(cookieInterval);
//       }
//     }, 3000); // Check every 3 seconds

//     return () => {
//       window.removeEventListener("storage", handleStorageChange);
//       clearInterval(cookieInterval);
//     };
//   }, []);

//   const handleLogout = () => {
//     console.log("hh")
//     localStorage.removeItem("token"&&"userId"&&"email"); // Remove token from storage

//     // Delete authentication cookie
//     document.cookie =
//       "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; Secure";

//     setIsLoggedIn(false); // Force re-render
//   };

//     const handleLogin = (token) => {
//     localStorage.setItem("token", token); // Save token
//     document.cookie = "token=" + token + "; path=/; Secure"; // Set authentication cookie
//     setIsLoggedIn(true);
//     setProfile(false);
//     setSetting(false);
//     setChannel(false);
//     setCommunity(false);
//     setShowSidebar(true);
//     setShowStatus(false);
//     setSelectedChat(null);
//   };
//    const handleMetaAI = () => window.open(metaurl, "_blank");

//   const handleProfile = () => {
//     setProfile(true);
//     setSetting(false);
//     setShowSidebar(false);
//     setShowStatus(false);
//     setChannel(false);
//     setCommunity(false);
//     setSelectedChat(null);
//   };

//   const handleSettingClick = () => {
//     setProfile(false);
//     setSetting(true);
//     setShowSidebar(false);
//     setShowStatus(false);
//     setChannel(false);
//     setCommunity(false);
//     setSelectedChat(null);
//   };

//   const handleCommunityClick = () => {
//     setProfile(false);
//     setSetting(false);
//     setCommunity(true);
//     setChannel(false);
//     setShowSidebar(false);
//     setShowStatus(false);
//     setSelectedChat(null);
//   };

//   const handleChannelClick = () => {
//     setProfile(false);
//     setSetting(false);
//     setChannel(true);
//     setCommunity(false);
//     setShowSidebar(false);
//     setShowStatus(false);
//     setSelectedChat(null);
//   };

//   const handleStatusClick = () => {
//     setProfile(false);
//     setSetting(false);
//     setCommunity(false);
//     setChannel(false);
//     setShowSidebar(false);
//     setShowStatus(true);
//     setSelectedChat(null);
//   };

//   const handleChatClick = () => {
//     setProfile(false);
//     setSetting(false);
//     setChannel(false);
//     setCommunity(false);
//     setShowSidebar(true);
//     setShowStatus(false);
//     setSelectedChat(null);
//   };

//   const handleChatSelection = (chat) => {
//     setSelectedChat(chat);
//     setreciverId(chat._id);
//   };

//     if (!isLoggedIn) {
//     return <Login onLogin={handleLogin} />;
//   }

//   return (
//     <div className="app">
//       <div className="app_body">
//         <Tolbar
//           onStatusClick={handleStatusClick}
//           onChatClick={handleChatClick}
//           onchannelclick={handleChannelClick}
//           oncommunityclick={handleCommunityClick}
//           onmetaclick={handleMetaAI}
//           onsettingclick={handleSettingClick}
//           onProfileClick={handleProfile}
//            onLogout={handleLogout}
//         />
//         {showSidebar && <Slidebar onChatSelect={handleChatSelection} />}
//         {showStatus && <Status />}
//         {showChannel && <Channels />}
//         {showCommunity && <Community />}
//         {showSetting && <Settingcon userId={userId} />}
//         {showProfile && <Profile />}
//         {selectedChat ? <Chatbox reciverId={reciverId} selectedChat={selectedChat} /> : <Defchatbox />}
//       </div>
//     </div>
//   );
// }

// export default App;

// 20 march 

import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./container/Login";
import Signup from "./container/Signup";
import ResetPassword from "./pages/restpass";
import ProtectedRoute from "./component/ProtectedRoute";
import Home from "./pages/home";  // Main home page or dashboard
import Verifyaccount from './pages/verify';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   setIsLoggedIn(!!token);
  // }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <Routes>
      <Route path="/login" element={<Login onLogin={handleLogin}/>} />
      <Route path="/signup" element={isLoggedIn ? <Navigate to="/" /> : <Signup />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/verify/:token" element={<Verifyaccount/>}/>
      {/* Protected Routes */}
      <Route element={<ProtectedRoute isAuthenticated={isLoggedIn} onLogout={handleLogout} />}>
        <Route path="/" element={<Home />} />
        {/* Add other protected pages inside this */}
      </Route>

      {/* Catch-All Route */}
      <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/login"} />} />
    </Routes>
  );
}

export default App;
