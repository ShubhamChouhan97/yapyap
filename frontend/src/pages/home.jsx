import Tolbar from "../container/Tolbar";
import Slidebar from "../container/Slidebar";
import Chatbox from "../container/Chatbox";
import Defchatbox from "../component/Defchatbox";
import Status from "../container/Status";
import Channels from "../container/Channels";
import Settingcon from "../container/Settingcon";
import Profile from "../container/Profile";
import Community from "../container/Community";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import "./home.css";
const socket = io("https://wback-06q5.onrender.com");
import { ToastContainer, toast } from "react-toastify"; 
import { useNavigate } from "react-router-dom";
import { tokencheck } from "../API/tokencheck";

function Home() {
      const navigate = useNavigate();

    const metaurl = "https://www.meta.ai/";
      const [showProfile, setProfile] = useState(false);
      const [showChannel, setChannel] = useState(false);
      const [showSidebar, setShowSidebar] = useState(true);
      const [showStatus, setShowStatus] = useState(false);
      const [selectedChat, setSelectedChat] = useState(null);
      const [showCommunity, setCommunity] = useState(false);
      const [showSetting, setSetting] = useState(false);
      const [reciverId, setreciverId] = useState(null);

// let cookieInterval;

// function checkAuth() {
//       const token = localStorage.getItem("token");
//       const cookieToken = document.cookie.split("; ").find(row => row.startsWith("auth_token="));
//       return !!token && !!cookieToken;
//     }

      // useEffect(() => {
      //   const handleStorageChange = async () => {
      //     if (!checkAuth()) {
      //        toast.success("Error With Your Account !", { position: "top-center" });
      //           setTimeout(() => {
      //             navigate("/"); // Navigate after 3 seconds
      //           }, 3000);
      //     }
      //   };
      //   window.addEventListener("storage", handleStorageChange);
    
      //   // Periodically check authentication to detect cookie changes
      //  cookieInterval = setInterval(async () => {
      //   const MyId = localStorage.getItem("userId");
      //     let data =  await tokencheck();
      //     if (data.message=="Unauthorized") {
      //       socket.emit("offline",{MyId});
      //       localStorage.clear();
      //       clearInterval(cookieInterval);
      //       toast.success("Error With Your Account !", { position: "top-center" });
      //           setTimeout(() => {
      //             navigate("/"); // Navigate after 3 seconds
      //           }, 3000);
          
      //     }
      //     let auth = checkAuth();
      //     if (!auth) {
      //      socket.emit("offline",{MyId});
      //      localStorage.clear();
      //      clearInterval(cookieInterval);
      //      toast.success("Error With Your Account !", { position: "top-center" });
      //          setTimeout(() => {
      //            navigate("/"); // Navigate after 3 seconds
      //          }, 3000);
      //     }
      //   }, 3000); // Check every 3 seconds
    
      //   return () => {
      //     window.removeEventListener("storage", handleStorageChange);
      //     clearInterval(cookieInterval);
      //   };
      // }, []);

       const handleMetaAI = () => window.open(metaurl, "_blank");
    
      const handleProfile = () => {
        setProfile(true);
        setSetting(false);
        setShowSidebar(false);
        setShowStatus(false);
        setChannel(false);
        setCommunity(false);
        setSelectedChat(null);
      };
    
      const handleSettingClick = () => {
        setProfile(false);
        setSetting(true);
        setShowSidebar(false);
        setShowStatus(false);
        setChannel(false);
        setCommunity(false);
        setSelectedChat(null);
      };
    
      const handleCommunityClick = () => {
        setProfile(false);
        setSetting(false);
        setCommunity(true);
        setChannel(false);
        setShowSidebar(false);
        setShowStatus(false);
        setSelectedChat(null);
      };
    
      const handleChannelClick = () => {
        setProfile(false);
        setSetting(false);
        setChannel(true);
        setCommunity(false);
        setShowSidebar(false);
        setShowStatus(false);
        setSelectedChat(null);
      };
    
      const handleStatusClick = () => {
        setProfile(false);
        setSetting(false);
        setCommunity(false);
        setChannel(false);
        setShowSidebar(false);
        setShowStatus(true);
        setSelectedChat(null);
      };
    
      const handleChatClick = () => {
        setProfile(false);
        setSetting(false);
        setChannel(false);
        setCommunity(false);
        setShowSidebar(true);
        setShowStatus(false);
        setSelectedChat(null);
      };
    
      const handleChatSelection = (chat) => {
        setSelectedChat(chat);
        setreciverId(chat._id);
      };

  return (
    <div className="app">
        <ToastContainer/>
      <div className="app_body">
        <Tolbar
          onStatusClick={handleStatusClick}
          onChatClick={handleChatClick}
          onchannelclick={handleChannelClick}
          oncommunityclick={handleCommunityClick}
          onmetaclick={handleMetaAI}
          onsettingclick={handleSettingClick}
          onProfileClick={handleProfile}
        />
        {showSidebar && <Slidebar onChatSelect={handleChatSelection} />}
        {showStatus && <Status />}
        {showChannel && <Channels />}
        {showCommunity && <Community />}
        {showSetting && <Settingcon />}
        {showProfile && <Profile />}
        {selectedChat ? <Chatbox reciverId={reciverId} selectedChat={selectedChat} /> : <Defchatbox />}
      </div>
    </div>
  );
}

export default Home;
